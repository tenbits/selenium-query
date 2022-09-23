import { class_EventEmitter } from 'atma-utils';
import { WebDriver } from 'selenium-webdriver';
import { CDPConnection } from './CDPConnection';

interface IBrowserNetworkMonitorEvents {
    requestWillBeSent (req: INetworkMonitorRequest)
    loadingFinished (req: INetworkMonitorRequest)
    responseReceived (req: INetworkMonitorRequest)
}

export class BrowserNetworkMonitor extends class_EventEmitter<IBrowserNetworkMonitorEvents> {

    static async start(driver: WebDriver & { createCDPConnection?, _wsConnection?: WebSocket }): Promise<BrowserNetworkMonitor> {
        const connection = await driver.createCDPConnection('page');
        await connection.execute('Network.enable', {}, null);

        await connection.execute('Network.setCacheDisabled', {
            cacheDisabled: true,
        }, null);

        return new BrowserNetworkMonitor(driver, driver._wsConnection);
    }

    private cdp = new CDPConnection(this.wsConnection, this.driver.sessionId);
    private requests: INetworkMonitorRequest[] = []
    private requestsHash: Record<string, INetworkMonitorRequest> = {}

    constructor(private driver, private wsConnection) {
        super();

        wsConnection.on('message', message => {
            this.onMessage(JSON.parse(message));
        });
    }

    getRequests (regexp?: RegExp): INetworkMonitorRequest[]
    getRequests (filter?: (req: INetworkMonitorRequest['request']) => boolean): INetworkMonitorRequest[]
    getRequests (mix?: RegExp | ((req: INetworkMonitorRequest['request']) => boolean)): INetworkMonitorRequest[] {
        if (mix == null) {
            return this.requests;
        }
        if (mix instanceof RegExp) {
            let rgx = mix;
            return this.requests.filter(req => rgx.test(req.request.url));
        }
        return this.requests.filter(req => mix(req.request));
    }

    async getResponseBody (req: INetworkMonitorRequest) {
        let { base64Encoded, body } = await this.cdp.execute('Network.getResponseBody', {
            requestId: req.requestId,
        });
        return { base64Encoded, body };
    }
    async getRequestBody (req: INetworkMonitorRequest) {
        let { postData } = await this.cdp.execute('Network.getRequestPostData', {
            requestId: req.requestId,
        });
        return { body: postData };
    }

    private async onMessage(message:
        INetworkRequestWillBeSent |
        INetworkRequestWillBeSentExtraInfo |
        INetworkResponseReceivedExtraInfo |
        INetworkResponseReceived |
        INetworkLoadingFinished
    ) {
        if (message.method === 'Network.requestWillBeSent') {
            let request = <INetworkMonitorRequest>{
                requestId: message.params.requestId,
                request: {
                    url: message.params.request.url,
                    method: message.params.request.method,
                    headers: message.params.request.headers,
                    date: Date.now()
                },
                response: {

                }
            };
            this.requests.push(request);
            this.requestsHash[request.requestId] = request;
            this.emit('requestWillBeSent', request);
            return;
        }

        if (message.method === 'Network.responseReceived') {
            let request = this.requestsHash[message.params.requestId];
            if (request == null) {
                return;
            }
            request.response = {
                status: message.params.response.status,
                headers: message.params.response.headers,
                date: Date.now()
            };
            this.emit('responseReceived', request);
            return;
        }
        if (message.method === 'Network.loadingFinished') {
            let request = this.requestsHash[message.params.requestId];
            if (request == null) {
                return;
            }
            this.emit('loadingFinished', request);
            return;
        }
    }
}
export interface INetworkMonitorRequest {
    requestId: string
    request: {
        url: string
        method: string
        headers: Record<string, string>
        date: number
    }
    response: {
        status: number
        headers: Record<string, string>
        date: number
    }
}


interface INetworkRequestWillBeSent {
    method: 'Network.requestWillBeSent'
    params: {
        requestId: string
        loaderId: string
        documentURL: string
        request: {
            url: string
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
            headers: Record<string, string>
            mixedContentType: 'none' | string
            initialPriority: 'VeryHigh' | string
            referrerPolicy: 'strict-origin-when-cross-origin' | string
            isSameSite: boolean
        },
        timestamp: number
        wallTime: number
        initiator: {
            type: 'other' | 'parser'
            url: string
            lineNumber: number
            columnNumber: number
        }
        redirectHasExtraInfo: boolean
        type: 'Document' | 'Script' | string
        frameId: string
        hasUserGesture: boolean
    }
    sessionId: string
}

interface INetworkRequestWillBeSentExtraInfo {
    method: 'Network.requestWillBeSentExtraInfo'
    params: {
        requestId: string
        associatedCookies: string[]

        headers: Record<string, string>
        connectTiming: { requestTime: number }
    }
    sessionId: string
}

interface INetworkResponseReceivedExtraInfo {
    method: 'Network.responseReceivedExtraInfo'
    params: {
        requestId: string
        blockedCookies: string[],
        headers: Record<string, string>
        resourceIPAddressSpace: 'Unknown' | string
        statusCode: 200 | number
    }
    sessionId: string
}
interface INetworkLoadingFinished {
    method: 'Network.loadingFinished',
    params: {
        requestId: string
        encodedDataLength: number
    }
}

interface INetworkResponseReceived {
    method: 'Network.responseReceived',
    params: {
        requestId: string
        loaderId: string
        timestamp: number
        type: 'Document' | string
        response: {
            url: string
            status: 200 | number
            statusText: string
            headers: Record<string, string>
            mimeType: 'text/html' | string
            connectionReused: boolean
            connectionId: number
            remoteIPAddress: string | '127.0.0.1'
            remotePort: number
            fromDiskCache: boolean
            fromServiceWorker: boolean
            fromPrefetchCache: boolean
            encodedDataLength: number
            timing: any
            responseTime: number
            protocol: 'h2' | string
            securityState: 'secure' | string
            securityDetails: any
        }
        hasExtraInfo: boolean
        frameId: string
    }
    sessionId: string
}
