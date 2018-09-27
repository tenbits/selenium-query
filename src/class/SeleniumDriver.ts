import { IBuildConfig } from "../static/build";
import { IDriver, IThenableDriver } from "../IDriver";
import { obj_extend } from "atma-utils";
import { Builder } from 'selenium-webdriver'

export function buildDriver (config: IBuildConfig): IThenableDriver {
    config = obj_extend(Object.create(DefaultConfig), config);

    let browser = require('selenium-webdriver/' + config.name.toLowerCase());
    let options = new browser.Options;

    config.setBinaryPath(options);
    config.setArguments(options);
    config.setLogging(options);

    let builder = new Builder().forBrowser(config.name.toLowerCase());
    config.setOptions(builder, options);
    config.applyOptions(builder, options);
    return (<any>builder.build());
}



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