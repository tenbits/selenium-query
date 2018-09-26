import { obj_extend } from "atma-utils";
import { Builder } from 'selenium-webdriver'
import { IDriver } from "../IDriver";
import { ThenableSQuery } from '../SQuery'
import { refs } from "../global"
import { loadUrl, setCookies } from '../utils/driver'
import { driverPool, DriverWrapper } from '../class/DriverPool'
import { SQuery } from "../SQueryLibrary";

declare var require: any;
declare var process: any;

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
	pool?: boolean
	query?: SQuery
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
			});

		return query;
	},

	releaseDriver (mix: SQuery | IDriver) {
		if (mix instanceof SQuery) {
			driverPool.releaseDriver(<IDriver><any>mix[0]);
			return;
		}
		driverPool.releaseDriver(mix);
	}
};



const DefaultConfig: IBuildConfig = {
	name: 'Chrome',
	args: ['no-sandbox'],
	binaryPath: null,

	applyOptions(builder, options) {
		var fn = `set${this.name}Options`;
		if (typeof builder[fn] !== 'function') {
			throw Error(`Default function not found, please override 'applyOptions(builder, options)' to set it yourself. Was looking for : ${fn}`);
		}
		builder[fn](options);
	},

	setOptions(builder, options) {

	},

	setArguments(options) {
		options.addArguments(this.args);
	},
	setBinaryPath(options) {
		var fn = `set${this.name}BinaryPath`;
		if (typeof options[fn] !== 'function') {
			throw Error(`Default function not found, please override 'setBinaryPath' to set it yourself. Was looking for: ${fn}`);
		}

		if (this.binaryPath) {
			options[fn](this.binaryPath);
		}
	},
	setLogging(options) {
		options.setLoggingPrefs({

		});
	}
};

if (typeof process.env.BROWSER_PATH !== 'undefined') {
	DefaultConfig.binaryPath = process.env.BROWSER_PATH;
}
