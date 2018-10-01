import { IDriver } from "../common/IDriver";
import { loadUrl } from './utils/driver'
import { driverPool } from './DriverPool'
import { class_Dfr, is_ArrayLike } from "atma-utils";
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { WebdriverQuery } from "./WebdriverQuery";
import { IQueryStatics } from "../common/IQueryStatics"

declare var process: any;
declare var scripts_fetchAsync: any;


export const Webdriver: IQueryStatics = {
	build(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {

		return driverPool
			.get(null, config, setts)
			.then(wrapper => wrapper.driver);		
	},

	load(url: string, config: ILoadConfig, setts?: ISettings) {
		if (url[0] === '/') {
			url = 'file://' + process.cwd() + url;
		}
        let query = WebdriverQuery.newAsync();
        
		
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

						let isError = result && result.name === 'Error';						
						if (isError) {
							driverPool.unlockDriver(wrapper);
							dfr.reject(new Error(result.message));
							return;
						}
						if ('findElements' in result || (is_ArrayLike(result) && result.length !== 0 && 'findElements' in result[0])) {
							// Consumer is responsible to unlock later the driver
							dfr.resolve(new WebdriverQuery(result));
							return;
						}


						driverPool.unlockDriver(wrapper);
						dfr.resolve(result);
					}, error => {
						dfr.reject(error);
					});
				}
			);

		return <Promise<T>> <any> dfr;
	}
};

