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
    load (url: string, config: ILoadConfig = {}): Promise<NetworkResponse> {
        let options:FetchOptions = {
            headers: Object.assign({}, DefaultOptions.headers, config.headers || {}),
            method: config.method,
            body: config.body,
            onRedirect (data) {
                if (data.prev.startsWith('http:') && data.url.includes('https:')) {
                    data.opts.agent = agents.https;
                }
            }
        };

        let retryCount = 'retryCount' in config ? config.retryCount : 3;
        let retryTimeout = 'retryTimeout' in config ? config.retryTimeout : 1000;

        if (config.cookies) {
            cookieContainer.addCookies(config.cookies);
        }
        if (options.headers['Cookie']) {
            cookieContainer.addCookies(options.headers['Cookie']);
        }

        let cookies = cookieContainer.getCookies(url);
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

            doFetch ();

            function doFetch () {
                console.log('FETCH', url);
                fetch(url, options)
                    .then(async (res) => {
                        if (res.status >= 400) {
                            if (res.status !== 404 && --retryCount > 0) {
                                console.log(`Retry ${retryCount} for ${url} as got ${res.status}`)
                                setTimeout(doFetch, retryTimeout);
                                return;
                            }
                            reject(new Error(`Request failed ${res.status} for ${url}`));
                            return;
                        }

                        let setCookie = res.headers.get('set-cookie');
                        if (setCookie) {
                            cookieContainer.addCookies(url, setCookie);
                        }
                        
                        let typeEnum = 'text';
                        let contentType = res.headers.get('content-type');
                        if (contentType && contentType.includes('json')) {
                            typeEnum = 'json';
                        }
                        if (contentType && contentType.includes('octet')) {
                            typeEnum = 'buffer';
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
                                body = await res.arrayBuffer();
                                break;
                        }

                        let resp: NetworkResponse = {
                            status: res.status,
                            headers: readAllHeaders(res.headers),
                            url: res.url,
                            body
                        };
        
                        cache.save(url, config, {
                            status: resp.status,
                            headers: resp.headers,
                            url: resp.url,
                            body: resp.body
                        });
        
                        resolve(resp);
                    })
                    .catch(reject)
            }

            
        })
        
    }
}

export interface NetworkResponse {
    status: number
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