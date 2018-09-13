import { obj_extend } from "atma-utils";
import { Builder } from 'selenium-webdriver'
import { IDriver } from "../IDriver";
import { SQuery } from '../SQuery'

declare var require: any;
declare var process: any;

let driver: IDriver;

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

export const BuildStatics = {
	build(config: IBuildConfig): IDriver {

		config = obj_extend(Object.create(DefaultConfig), config);

		var browser = require('selenium-webdriver/' + config.name.toLowerCase());
		var options = new browser.Options;

		config.setBinaryPath(options);
		config.setArguments(options);
		config.setLogging(options);

		var builder = new Builder().forBrowser(config.name.toLowerCase());
		config.setOptions(builder, options);
		config.applyOptions(builder, options);
		return (<any>builder.build()) as IDriver;
	},

	load(url: string, config: IBuildConfig) {
		if (url[0] === '/') {
			url = 'file://' + process.cwd() + url;
		}

		if (driver == null) {
			driver = BuildStatics.build(config);
		}

		var query = new SQuery();
		driver
			.get(url)
			.then(() => {
				query.add(driver);
				query.resolve(query);
			}, (error) => {
				if (error.code !== 100) {
					query.reject(error);
					return;
				}
				driver = BuildStatics.build(config);
				driver
					.get(url)
					.then(() => {
						query.add(driver);
						query.resolve(query);
					}, error => query.reject(error));
			});

		return query;
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
