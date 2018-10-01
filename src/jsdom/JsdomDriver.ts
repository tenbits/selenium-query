import { IQueryStatics } from '../common/IQueryStatics';
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { IDriver } from '../common/IDriver';
import { JsdomQuery } from './JsdomQuery';
import { Network } from './Network';
import { JSDOM } from 'jsdom'
import { IQuery } from '../common/IQuery';

export interface IJsdomBuildConfig extends IBuildConfig {
	html: string,
	fragment: boolean
}

export const JsdomDriver: IQueryStatics = {
	build(config: IJsdomBuildConfig, setts?: ISettings): IQuery<Element> {
		let html = config.html;
		let jsdom = new JSDOM(html);
		let el: any = jsdom.window.document;
		let isDocument = true;
		if (/^\s*<(?!(!?DOCTYPE|html))/i.test(html)) {
			isDocument = false;
		}
		if (config.fragment === true) {
			isDocument = false;
		}

		if (isDocument === false) {
			el = Array.from(el.body.children);
		}

		let query = new JsdomQuery(el);
		return query;
	},
	load(url: string, config: IBuildConfig, setts?: ISettings): IQuery<Element> {
		let query = JsdomQuery.newAsync();
		
		Network
			.fetch(url, setts && setts.opts)
			.then(
				resp => {
					let jsdom = new JSDOM(resp.body.toString());
					query.add(jsdom.window.document);
					
					query.resolve(query);
				}, 
				error => query.reject(error)
			);

		return query;
	},
	fetch(url: string, config: IBuildConfig, setts?: ISettings) {
		return this.load(url, config, setts);
	},
	setDriver(driver: IDriver) {
		throw new Error('JSDOM does not support driver');
	},
	getDriver(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		throw new Error('JSDOM does not support driver');
	},
	unlockDriver(mix) {

	}
};

