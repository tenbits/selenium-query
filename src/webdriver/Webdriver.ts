import { IDriver } from "../common/IDriver";
import { loadUrl } from './utils/driver'
import { driverPool } from './DriverPool'
import { class_Dfr, is_ArrayLike } from "atma-utils";
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { WebdriverQuery } from "./WebdriverQuery";
import { IQueryStatics } from "../common/IQueryStatics"
import { SelectorsEx } from '../common/SelectorsEx';
import { scripts_fetchAsync } from './scripts/http/fetch';
import { WebdriverFormData } from './WebdriverFormData';
import { FormDataBase } from '../common/FormDataBase';
import alot = require('alot');

declare var process: any;

export const Webdriver: IQueryStatics<WebdriverQuery> = {
    fromHtml(html, config?: ILoadConfig) {
        return Webdriver.load(`data:text/html;charset=utf-8,${html}`, config);
    },
    build(config: IBuildConfig, setts?: ISettings): WebdriverQuery {

        let query = WebdriverQuery.newAsync();

        driverPool
            .get(null, config, setts)
            .then(wrapper => {
                query.add(wrapper.driver);
                query.resolve(query);
            }, error => {
                query.reject(error);
            });

        return query;
    },

    load(url: string, config: ILoadConfig, setts?: ISettings): WebdriverQuery {
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
    unlockDriver(mix) {
        driverPool.unlockDriver(mix);
    },

    async fetch<T = any | WebdriverQuery>(url: string, config: ILoadConfig & { baseUrl?: string }, setts?: ISettings): Promise<{
        status: number
        headers: { [lowerCased: string]: string },
        data: T
    }> {
        let wrapper = await driverPool.getWithDomain(config?.baseUrl ?? url, config, setts)

        // let p = new Promise(resolve => setTimeout(resolve, 5000));
        // await p;

        type TResult = {
            status: number
            headers: { [lowerCased: string]: string },
            data: T
            name?: 'Error' | null
            message?: string
        };

        if (config.body instanceof FormDataBase) {
            let $ = new WebdriverQuery(wrapper.driver);
            let formData = await WebdriverFormData.create($);

            await alot(config.body.entries()).forEachAsync(async ([key, value]) => {
                await formData.append(key, value);
            }).toArrayAsync({ threads: 1 });

            config.body = formData.form;
        }

        let fetchOpts = {
            ...(setts?.opts ?? {}),
            body: setts?.opts?.body ?? config.body,
            headers: setts?.opts?.headers ?? config.headers,
            method: setts?.opts?.method ?? config.method,
        };
        let result: TResult = await wrapper
            .driver
            .executeAsyncScript(scripts_fetchAsync, url, fetchOpts);

        if (result == null) {
            throw new Error(`Response from the script is undefined`);
        }

        let isError = result.name === 'Error';
        if (isError) {
            driverPool.unlockDriver(wrapper);
            throw result;
        }

        let data = result.data;
        if (data != null && typeof data === 'object') {
            if ('findElements' in data || (is_ArrayLike(data) && data.length !== 0 && 'findElements' in data[0])) {
                // Consumer is responsible to unlock later the driver
                let $ = new WebdriverQuery(data);
                return {
                    ...result,
                    data: $ as any
                };
            }
        }
        driverPool.unlockDriver(wrapper);
        return result;
    },
    pseudo: SelectorsEx.pseudoFns
};

function object_clean(fetchOpts: any): any {
    throw new Error('Function not implemented.');
}

