import { IQuery } from "../common/IQuery";
import { CookieContainer } from './CookieContainer';

export interface IBuildConfig {
	name?: string
	args?: string[]
	binaryPath?: string

	applyOptions? (builder, options)

	setOptions? (builder, options)

	setArguments? (options: any)
	setBinaryPath? (options: any)
	setLogging? (options: any) 

	/* HTTP, webdriver supports only cookies */
	headers?: {[name: string] : string }
	method?: 'post' | 'get' | 'delete' | 'patch' | 'head' | string
	query?: {[name: string] : string }
    body?: string | Buffer
	cookies?: {[name: string] : string } | string[] | string
	cache?: boolean | {
		folder?: string
        maxAge?: number
        compress?: boolean
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
}

export interface ISettings {
	pool?: boolean | number
	query?: IQuery<any>
	// fetch options
	opts?: any
}