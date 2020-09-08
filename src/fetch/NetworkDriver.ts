import * as fetch from 'node-fetch'
import * as https from 'https'
import * as http from 'http'

import { ILoadConfig } from "../common/IConfig";
import { cookieContainer, CookieContainer } from '../common/CookieContainer'
import { cache } from './Cache'
import { is_rawObject } from 'atma-utils';
import { Body } from './Body';
import { NetworkSpan, NetworkTracer } from './NetworkTracer';
import { serializeCachableUrl, serializeUrl } from '../utils/url';


const DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        //'Referer': 'https://www.google.de/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
}
const agents = {
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true }),
};
const tracer = new NetworkTracer();

export const NetworkDriver = {
    isCached(url: string, config: ILoadConfig = {}): boolean {
        url = serializeCachableUrl(url, config);
        return cache.has(url, config);
    },
    isCachedAsync(url: string, config: ILoadConfig = {}): Promise<boolean> {
        url = serializeCachableUrl(url, config);
        return cache.hasAsync(url, config);
    },
    clearCookies() {
        cookieContainer.clearCookies()
    },
    clearCached(url: string, config: ILoadConfig = {}) {
        url = serializeCachableUrl(url, config);
        cache.remove(url, config);
    },
    load(url: string, config: ILoadConfig = {}): Promise<NetworkResponse> {
        let worker = new RequestWorker(url, config);

        return worker.load();
    },
    getCookies(url?: string) {
        return cookieContainer.getCookies(url);
    },
    setCookies: <typeof cookieContainer.addCookies><any>((...args) => {
        cookieContainer.addCookies.apply(cookieContainer, args);
    }),
    tracer: tracer
}


export interface NetworkResponse {
    status: number
    message?: string

    headers: { [name: string]: string }
    url: string
    body: any
}


interface FetchOptions {
    follow?: number
    headers?: { [name: string]: string }
    method?
    body?
    agent?
    onRedirect?: Function
    redirect?: 'manual' | 'follow'
}

function readAllHeaders(headers) {
    let obj = {};
    for (let entry of headers.entries()) {
        let [key, value] = entry;
        obj[key] = value;
    }
    return obj;
}


class RequestWorker {
    private options: FetchOptions;
    private cookieContainer: CookieContainer
    private retryCount: number;
    private retryTimeout: number;
    private redirectCount: number;
    private doNotThrow: boolean;

    public redirectIndex = 0;
    public retryIndex = 0;

    /** Current URL (handles redirects) */
    private location: string;
    private span: NetworkSpan;

    constructor(private url: string, private config: ILoadConfig = {}) {
        const headers = Object.assign(
            {},
            DefaultOptions.headers,
            Headers.get(config.headers)
        );
        this.options = {
            headers: headers,
            method: config.method,
            body: config.body,
            follow: config.follow,
            onRedirect(data) {
                if (data.prev.startsWith('http:') && data.url.includes('https:')) {
                    data.opts.agent = agents.https;
                }
            }
        };
        this.cookieContainer = config.cookieContainer || cookieContainer;
        this.retryCount = 'retryCount' in config ? config.retryCount : 3;
        this.retryTimeout = 'retryTimeout' in config ? config.retryTimeout : 1000;
        this.doNotThrow = config.doNotThrow;


        if (this.options.headers['Cookie']) {
            this.cookieContainer.addCookies(url, this.options.headers['Cookie']);
        }
        if (config.cookies) {
            this.cookieContainer.addCookies(url, config.cookies);
        }
        if (config.cookiesDefault) {
            this.cookieContainer.addCookies(url, config.cookiesDefault, { extend: true });
        }

        let cookies = this.cookieContainer.getCookies(url);
        if (cookies) {
            this.options.headers['Cookie'] = cookies;
        }
        url = serializeUrl(url, config);

        if (config.agent) {
            this.options.agent = config.agent;
        } else {
            if (url.startsWith('http:')) {
                this.options.agent = agents.http;
            }
            if (url.startsWith('https:')) {
                this.options.agent = agents.https;
            }
        }
        if (config.httpsProxy) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const HttpsProxyAgent = require('https-proxy-agent');
            this.options.agent = new HttpsProxyAgent(config.httpsProxy)
        }
        if (config.ignoreSSLErrors) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        if (config.body != null && is_rawObject(config.body)) {
            Body.handleAsRawObject(this.options);
        }
        if (this.options.headers['Referer'] == null) {
            this.options.headers['Referer'] = url;
        }
        this.redirectCount = this.options.follow == null ? 10 : this.options.follow;
        this.options.redirect = 'manual';
        this.location = url;
    }


    async load(): Promise<NetworkResponse> {
        this.span = tracer.createSpan({
            url: this.location,
            headers: this.options.headers,
            method: this.options.method,
            body: this.options.body
        });

        let cached = await this._fromCache();
        if (cached) {
            this.span.complete(cached);
            return cached;
        }
        return await this._fetch(this.location);
    }


    private async _fromCache(): Promise<NetworkResponse> {
        try {
            let cached: Partial<NetworkResponse> = await <any>cache.get(this.url, this.config);
            if (cached) {
                return {
                    status: cached.status,
                    url: cached.url,
                    headers: cached.headers,
                    body: cached.body
                };
            }
        } catch (error) {
            // Not cached
        }

        return null;
    }
    private async _handleResponse(res) {
        let errored = res.status >= 400;
        if (errored && --this.retryCount > 0) {
            switch (res.status) {
                case 404:
                case 401:
                case 403:
                    break;
                default: {
                    console.log(`Retry ${this.retryCount} for [${this.options.method}] ${this.location} as got ${res.status}`);
                    await wait(this.retryTimeout);
                    return this._fetch(this.location);
                }
            }
        }
        let setCookie = res.headers.get('set-cookie');
        if (setCookie) {
            this.cookieContainer.addCookies(this.location, setCookie);
        }
        if (res.status === 301 || res.status === 302) {
            let cookies = this.cookieContainer.getCookies(this.location);
            if (cookies) {
                this.options.headers['Cookie'] = cookies;
            }
            var location = res.headers.get('location');
            if (!location) {
                throw new Error('Location not present');
            }
            if (++this.redirectIndex < this.redirectCount) {
                this.options.method = 'GET';
                this.options.body = null;
                if (this.options.headers) {
                    delete this.options.headers['Content-Type'];
                    delete this.options.headers['content-type'];
                    delete this.options.headers['Content-Length'];
                    delete this.options.headers['content-length'];
                }
                this.location = location;
                return this._fetch(location);
            }
        }
        return await this._handleCompletion(res);
    }
    private async _handleCompletion(res) {
        let errored = res.status >= 400;
        let typeEnum = 'buffer';
        let contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('json')) {
            typeEnum = 'json';
        }
        if (contentType && contentType.includes('text')) {
            typeEnum = 'text';
        }
        let body: any = null;
        switch (typeEnum) {
            case 'text':
                body = await res.textConverted();
                break;
            case 'json':
                let str = await res.textConverted();
                try {
                    body = JSON.parse(str);
                } catch (error) {
                    throw new Error(`Invalid json response for ${res.url}: ${str}`);
                }
                break;
            case 'buffer':
                let arr = await res.arrayBuffer();
                body = Buffer.from(arr);
                break;
        }

        let resp: NetworkResponse = {
            status: res.status,
            headers: readAllHeaders(res.headers),
            url: res.url,
            body
        };
        this.span.complete(resp);

        if (errored) {
            if (this.doNotThrow === true) {
                return resp;
            }
            let error: Error & any = new Error(`Request for ${res.url} failed with ${res.status}`);
            error.status = res.status;
            error.body = res.body;
            error.headers = res.headers;
            throw error;
        }

        cache.save(this.location, this.config, resp);
        return resp;
    }

    private async _fetch(url: string): Promise<NetworkResponse> {
        let res = await fetch(url, this.options);
        return this._handleResponse(res);
    }
}


function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
}

namespace Headers {

    export function get(headers: any | string) {
        if (headers == null) {
            return {};
        }
        if (typeof headers === 'string') {
            let hash = Object.create(null);
            headers
                .split('\n')
                .map(x => x.trim())
                .filter(Boolean)
                .forEach(line => {
                    let semi = line.indexOf(':');
                    if (semi === -1) {
                        throw new Error(`Invalid header delimter. ":" expected. ${line} in ${headers}`);
                    }
                    let key = line.substring(0, semi).trim();
                    let val = line.substring(semi + 1).trim();
                    hash[key] = val;
                });
            return hash;
        }
        return headers;
    }
}
