import { IDriver } from "../common/IDriver";
import { loadUrl } from './utils/driver'
import { driverPool } from './DriverPool'
import { class_Dfr, is_ArrayLike } from "atma-utils";
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { WebdriverQuery } from "./WebdriverQuery";
import { IQueryStatics } from "../common/IQueryStatics"
import { SelectorsEx } from '../common/SelectorsEx';
import { scripts_fetchAsync } from './scripts/http/fetch';

declare var process: any;

export const Webdriver: IQueryStatics = {
    fromHtml (html, config?: ILoadConfig) {
        return Webdriver.load(`data:text/html;charset=utf-8,${html}`, config);
    },
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

    fetch <T = any | WebdriverQuery> (url: string, config: ILoadConfig & { baseUrl?: string }, setts?: ISettings): Promise<{
        status: number
        headers: { [lowerCased: string]: string },
        data: T
    }> {
        let dfr = new class_Dfr;
        driverPool
            .getWithDomain(config?.baseUrl ?? url, config, setts)
            .then(wrapper => {
                wrapper
                    .driver
                    .executeAsyncScript(scripts_fetchAsync, url, setts && setts.opts && JSON.stringify(setts.opts) || null)
                    .then((result: {
                        status: number
                        headers: { [lowerCased: string]: string },
                        data: T
                        name?: 'Error' | null
                        message?: string
                    }) => {
                        if (result == null) {
                            dfr.reject(new Error(`Response from the script is undefined`));
                        }

                        let isError = result.name === 'Error';
                        if (isError) {
                            driverPool.unlockDriver(wrapper);
                            dfr.reject(result);
                            return;
                        }

                        let data = result.data;
                        if (data != null && typeof data === 'object') {
                            if ('findElements' in data || (is_ArrayLike(data) && data.length !== 0 && 'findElements' in data[0])) {
                                // Consumer is responsible to unlock later the driver
                                let $ = new WebdriverQuery(data);
                                dfr.resolve({
                                    ...result,
                                    data: $
                                });
                                return;
                            }
                        }
                        driverPool.unlockDriver(wrapper);
                        dfr.resolve(result);
                    }, error => {
                        dfr.reject(error);
                    });
                }
            );

        return dfr as any;
    },
    pseudo: SelectorsEx.pseudoFns
};

