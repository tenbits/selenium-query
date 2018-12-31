import { IQuery } from "../common/IQuery";

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
	method?
	query?: {[name: string] : string }
    payload?
	cookies?
	cache?: {
		folder?: string
		maxAge?: number
    }
    cacheQueryIgnore?: string[]
	

	/** Webdriver will load this url, or requested url, to set the cookies first */
	cookieOrigin?: string

	[key: string]: any
}

export interface ILoadConfig extends IBuildConfig {
	
}

export interface ISettings {
	pool?: boolean | number
	query?: IQuery<any>
	// fetch options
	opts?: any
}