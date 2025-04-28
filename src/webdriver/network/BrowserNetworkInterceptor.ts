
export class BrowserNetworkInterceptor {

    static async start(driver): Promise<BrowserNetworkInterceptor> {

        const connection = await driver.createCDPConnection('page');
        await connection.execute('Fetch.enable', {}, null)
        await connection.execute('Network.setCacheDisabled', {
            cacheDisabled: true,
        }, null);

        return new BrowserNetworkInterceptor(connection._wsConnection);
    }

    constructor(public wsConnection) {
        wsConnection.on('message', message => {
            this.onMessage(JSON.parse(message));
        });
    }

    interceptions: {
        urlMatch: RegExp

        response: {
            status?: number
            headers?: Record<string, string>
            body: string | any
        }
    }[] = []

    register(params: { match: RegExp, response: BrowserNetworkInterceptor['interceptions'][0]['response'] }) {
        this.interceptions.push({
            urlMatch: params.match,
            response: params.response
        });
    }

    private async onMessage(message: IFetchRequestPaused) {
        if (message.method === 'Fetch.requestPaused') {
            let requestPausedParams = message.params;
            let url = message.params.request.url;

            let intercepted = this.interceptions.find(x => x.urlMatch.test(url));
            if (intercepted) {
                if (intercepted.response) {
                    this.wsConnection.execute('Fetch.fulfillRequest', {
                        requestId: requestPausedParams.requestId,
                        responseCode: intercepted.response.status ?? 200,
                        responseHeaders: intercepted.response.headers,
                        body: Buffer.from(intercepted.response.body, 'utf8').toString('base64'),
                    });
                    return;
                }
                throw new Error(`Modify sent data not supported yet`);
                // this.wsConnection.execute('Fetch.continueRequest', {
                //     requestId: requestPausedParams.requestId,
                //     url: message.params.request.url,
                //     method: message.params.request.method,
                //     headers: httpResponse.headers,
                //     postData: httpResponse.body,
                // })
                return;
            }

            this.wsConnection.execute('Fetch.continueRequest', {
                requestId: message.params.requestId
            });
        }
    }
}


interface IFetchRequestPaused {
    method: 'Fetch.requestPaused'
    params: {
        requestId
        request: {
            url
            method:  string
            headers: Record<string, string>
            initialPriority: 'VeryHigh' | string
            referrerPolicy: 'strict-origin-when-cross-origin' | string
        }
    }
}

interface IFetchContinueRequest {
    method: 'Fetch.continueRequest'
    params: { requestId }
}

