import type { WebDriver } from 'selenium-webdriver';
import { IQuery } from "../common/IQuery";
import { CookieContainer } from './CookieContainer';

export interface IBuildConfig {
    //name?: 'jsdom' | 'cheerio' | 'webdriver'
    args?: string[]
    binaryPath?: string

    applyOptions? (builder, options)

    setOptions? (builder, options)

    setArguments? (options: any)
    setBinaryPath? (options: any)
    setLogging? (options: any)

    /** Configurate driver before page is loaded. You can set e.g. the chrome dev tools commands: https://chromedevtools.github.io/devtools-protocol/ */
    setDriverConfiguration? (driver: WebDriver): Promise<any>

    /* HTTP, webdriver supports only cookies */
    headers?: {[name: string] : string } | string
    method?: 'post' | 'get' | 'delete' | 'patch' | 'head' | string
    query?: {[name: string] : string }
    body?: string | Buffer | any
    cookies?: {[name: string] : string } | string[] | string
    cookiesDefault?: {[name: string] : string } | string[] | string
    cache?: boolean | {
        folder?: string
        maxAge?: number | string
        compress?: boolean
        //-ensureCacheAllowed? (resp): boolean
    }
    cacheQueryIgnore?: string[]


    /** Webdriver will load this url, or requested url, to set the cookies first */
    cookieOrigin?: string
    cookieContainer?: CookieContainer

    [key: string]: any
}

export interface ILoadConfig extends IBuildConfig {
    retryCount?: number
    retryTimeout?: number
    follow?: number
    httpsProxy?: string | {
        url: string
        username?: string
        password?: string
    }
    ignoreSSLErrors?: boolean

    /** optional timeout in ms */
    timeoutMs?: number

    doNotThrow?: boolean
    /** default: true */
    includeDefaultHeaders?: boolean

    /** default: true */
    includeCookies?: boolean
}

export interface ISettings {
    pool?: boolean | number
    query?: IQuery<any>
    // fetch options
    opts?: {
        deserialize?: boolean
        [key: string]: any
    }
}
