import { IDriver, IElement } from "../IDriver";
import { ThenableSQuery, SQueryBase } from '../SQuery'
import { loadUrl } from '../utils/driver'
import { driverPool } from '../class/DriverPool'
import { SQuery } from "../SQueryLibrary";
import { class_Dfr } from "atma-utils";

declare var process: any;
declare var scripts_fetchAsync: any;

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
	query?: SQuery
	// fetch options
	opts?: any
}

export const BuildStatics = {
	build(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {

		return driverPool
			.get(null, config, setts)
			.then(wrapper => wrapper.driver);		
	},

	load(url: string, config: ILoadConfig, setts?: ISettings) {
		if (url[0] === '/') {
			url = 'file://' + process.cwd() + url;
		}
		let query = new ThenableSQuery();
		
		driverPool
			.get(url, config, setts)
			.then(wrapper => {
				
				loadUrl(wrapper.driver, url, config).then(driver => {
					query.add(driver);
					query.resolve(query);
				})
			}, error => query.reject(error));

		return query;
	},
	unlockDriver (mix) {
		driverPool.unlockDriver(mix);
	},

	fetch <T> (url: string, config: ILoadConfig, setts?: ISettings): Promise<T> {
		let dfr = new class_Dfr;
		driverPool
			.getWithDomain(url, config, setts)
			.then(wrapper => {
				wrapper
					.driver
					.executeAsyncScript(scripts_fetchAsync, url, setts && setts.opts && JSON.stringify(setts.opts) || null)
					.then((result: any) => {

						let error = result && result.name === 'Error';						
						if (error) {
							dfr.reject(error);
							return;
						}
						if ('findElements' in result) {
							dfr.resolve(new SQueryBase(result));
							return;
						}
						dfr.resolve(result);
					}, error => console.error(error, '<'));
				}
			);

		return <Promise<T>> <any> dfr;
	}
};

