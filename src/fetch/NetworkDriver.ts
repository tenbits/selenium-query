import { IQueryStatics } from '../common/IQueryStatics';
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { cache } from './Cache'
import * as fetch from 'fetch'
import { cookieContainer } from '../common/CookieContainer'
import { DefaultConfig } from '../webdriver/SeleniumDriver';

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


export const NetworkDriver  = {
    isCached (url: string, config: ILoadConfig = {}): boolean {        
        url = serializeUrl(url, config);
        return cache.get(url, config) != null;
    },
    load (url: string, config: ILoadConfig = {}): Promise<NetworkResponse> {
        let options:FetchOptions = {
            headers: Object.assign({}, DefaultOptions.headers, config.headers || {}),
            method: config.method,
            payload: config.payload,
            cookies: config.cookies
        };

        if (options.cookies) {
            cookieContainer.addCookies(options.cookies);
        }
        if (options.headers['Cookies']) {
            cookieContainer.addCookies(options.headers['Cookies']);
        }

        options.cookies = cookieContainer
            .getCookies(url)
            .split(';');

        url = serializeUrl(url, config);        
        return new Promise((resolve, reject) => {
            
            let cached: Partial<NetworkResponse> = cache.get(url, config);
            if (cached) {
                resolve({
                    status: cached.status,
                    url: cached.url,
                    headers: cached.headers,
                    body: cached.body,
                    cookieJar: null
                });
                return
            }

            fetch.fetchUrl(url, options, function (error, meta: FetchResponseMeta, body: Buffer) {
                if (error) {
                    reject(error);
                    return;
                }
                if (meta.status >= 400) {
                    reject(new Error(`Request failed ${meta.status}`));
                    return;
                }
                
                let resp: NetworkResponse = {
                    status: meta.status,
                    headers: meta.responseHeaders,
                    url: meta.finalUrl,
                    cookieJar: meta.cookieJar,
                    body: body.toString()
                };

                let type = resp.headers['content-type'];
                if (type && type.includes('json')) {
                    resp.body = JSON.parse(resp.body);
                }
                cache.save(url, config, {
                    status: resp.status,
                    headers: resp.headers,
                    url: resp.url,
                    body: resp.body
                });

                resolve(resp);
            })
        })
        
    }
}

export interface NetworkResponse {
    status: number
    headers: {[name: string] : string }
    url: string
    cookieJar: FetchCookieJar
    body: any
}

interface FetchCookieJar {
    setCookie(line: string)
}

interface FetchResponseMeta {
    status: number
    responseHeaders: {[name: string] : string }
    finalUrl: string
    redirectCount: number
    cookieJar: FetchCookieJar
}

interface FetchOptions {
    maxRedirects?: number
    disableRedirects?
    headers?: {[name: string] : string }
    maxResponseLength?
    method?
    payload?
    cookies?: string[]
    cookieJar?: FetchCookieJar
    outputEncoding?
    disableDecoding?
    overrideCharset? 
    asyncDnsLoookup? 
    timeout?
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