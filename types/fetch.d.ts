declare module "fetch" {

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
        maxRedirects: number
        disableRedirects
        headers: {[name: string] : string }
        maxResponseLength 
        method
        payload
        cookies: string[]
        cookieJar: FetchCookieJar
        outputEncoding 
        disableDecoding 
        overrideCharset 
        asyncDnsLoookup 
        timeout
    }
    
    var fetch: {
        fetchUrl (url: string, opts: FetchOptions, cb: (error: Error, meta: FetchResponseMeta, body) => void);
        CookieJar: new () => FetchCookieJar
    }

    export = fetch;
}