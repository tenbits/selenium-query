import { IQuery } from "../common/IQuery";

export interface IBuildConfig {
	name: string
	args?: string[]
	binaryPath?: string

	applyOptions? (builder, options)

	setOptions? (builder, options)

	setArguments? (options: any)
	setBinaryPath? (options: any)
	setLogging? (options: any) 

	[key: string]: any
}

export interface ILoadConfig extends IBuildConfig {
	cookies?: string | {name, value, path?: string, domain?: string, secure?: boolean, httpOnly?: boolean, expiry?: number}[]
	/* default is the domain of proveded url */
	cookieOrigin?: string
}

export interface ISettings {
	pool?: boolean | number
	query?: IQuery<any>
	// fetch options
	opts?: any
}