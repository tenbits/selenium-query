import * as fetch from 'node-fetch'
import * as https from 'https'
import * as http from 'http'

import { ILoadConfig } from "../common/IConfig";
import { cookieContainer } from '../common/CookieContainer'
import { cache } from './Cache'


const DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.google.de/',        
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
}
const agents = {
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true }),
};

export const NetworkDriver  = {
    isCached (url: string, config: ILoadConfig = {}): boolean {        
        url = serializeUrl(url, config);
        return cache.has(url, config);
    },
    isCachedAsync (url: string, config: ILoadConfig = {}): Promise<boolean> {        
        url = serializeUrl(url, config);
        return cache.hasAsync(url, config);
    },
    clearCookies () {
        cookieContainer.clearCookies()
    },
    clearCached (url: string, config: ILoadConfig = {}) {
        url = serializeUrl(url, config);
        cache.remove(url, config);
    },
    load (url: string, config: ILoadConfig = {}): Promise<NetworkResponse> {
        let options: FetchOptions = {
            headers: Object.assign({}, DefaultOptions.headers, config.headers || {}),
            method: config.method,
            body: config.body,
            onRedirect (data) {
                if (data.prev.startsWith('http:') && data.url.includes('https:')) {
                    data.opts.agent = agents.https;
                }
            }
        };
        let $cookieContainer = config.cookieContainer || cookieContainer;
        let retryCount = 'retryCount' in config ? config.retryCount : 3;
        let retryTimeout = 'retryTimeout' in config ? config.retryTimeout : 1000;

        if (config.cookies) {
            $cookieContainer.addCookies(config.cookies);
        }
        if (options.headers['Cookie']) {
            $cookieContainer.addCookies(options.headers['Cookie']);
        }

        let cookies = $cookieContainer.getCookies(url);
        if (cookies) {
            options.headers['Cookie'] = cookies;
        }
        url = serializeUrl(url, config);

        if (url.startsWith('http:')) {
            options.agent = agents.http;
        }
        if (url.startsWith('https:')) {
            options.agent = agents.https;
        }

        return new Promise(async (resolve, reject) => {
            
            let cached: Partial<NetworkResponse> = await <any> cache.get(url, config);
            if (cached) {
                resolve({
                    status: cached.status,
                    url: cached.url,
                    headers: cached.headers,
                    body: cached.body
                });
                return
            }

            let redirectCount = 0;
            let redirectMax = options.follow == null ? 10 : options.follow;
            options.redirect = 'manual';

            doFetch (url, options);

            function doFetch (url, options) {
                fetch(url, options)
                    .then(async (res) => {
                        let errored = res.status >= 400;
                        if (errored && --retryCount > 0) {
                            switch (res.status) {
                                case 404:
                                case 401:
                                case 403:
                                    break;
                                default: {
                                    console.log(`Retry ${retryCount} for ${url} as got ${res.status}`)
                                    setTimeout(doFetch, retryTimeout);                                
                                    return;
                                }
                            }                                                        
                        }
                        let setCookie = res.headers.get('set-cookie');
                        if (setCookie) {
                            $cookieContainer.addCookies(url, setCookie);
                        }

                        if (res.status === 301 || res.status === 302) {
                            let cookies = $cookieContainer.getCookies(url);
                            if (cookies) {
                                options.headers['Cookie'] = cookies;
                            }
                            var location = res.headers.get('location');
                            if (!location) {
                                throw new Error('Location not present');
                            }
                            if (++redirectCount < redirectMax) {
                                options.method = 'GET';
                                options.body = null;
                                if (options.headers) {
                                    delete options.headers['Content-Type'];
                                    delete options.headers['content-type'];
                                    delete options.headers['Content-Length'];
                                    delete options.headers['content-length'];
                                }
                                doFetch(location, options);
                                return;
                            }
                        }
                        
                        try {
                            await onComplete(res);                    
                        } catch (error) {
                            reject(error);
                        }
                    })
                    .catch(reject)
            }
            async function onComplete (res) {
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
                        body = await res.text();
                        break;
                    case 'json':
                        body = await res.json();
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
                if (errored) {
                    resp.message = `Request failed ${res.status} for ${res.url}`;
                    reject(resp);
                    return;
                }

                cache.save(url, config, resp);

                resolve(resp);
            }
        })
        
    }
}

export interface NetworkResponse {
    status: number
    message?: string

    headers: {[name: string] : string }
    url: string    
    body: any
}


interface FetchOptions {
    follow?: number
    headers?: {[name: string] : string }
    method?
    body?  
    agent?
    onRedirect?: Function
    redirect?: 'manual' | 'follow'
}


function serializeUrl (url: string, config: ILoadConfig = {}) {    
    if (config.query) {
        let q = '';
        for (let key in config.query) {
            let  p = `${key}=${ encodeURIComponent(config.query[key]) }`;
            
            q += (q ? '&' : '') + p;
        }
        url += (url.includes('?') ? '&' : '?') + q;
    }
    return url;
}
function readAllHeaders (headers) {
    let obj = {};
    for (let entry of headers.entries()) {
        let [key, value] = entry;
        obj[key] = value;
    }
    return obj;
}