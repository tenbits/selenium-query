import { loadUrl } from './utils/driver'
import { driverPool } from './DriverPool'
import { is_ArrayLike } from "atma-utils";
import { IBuildConfig, ISettings, ILoadConfig } from "../common/IConfig";
import { WebdriverQuery } from "./WebdriverQuery";
import { IQueryStatics } from "../common/IQueryStatics"
import { SelectorsEx } from '../common/SelectorsEx';
import { scripts_fetchAsync } from './scripts/http/fetch';
import { WebdriverFormData } from './WebdriverFormData';
import { FormDataBase } from '../common/FormDataBase';
import alot from 'alot';
import { $headers } from '../utils/$headers';
import { Capabilities, type WebDriver, type ProxyConfig } from 'selenium-webdriver';


declare var process: any;

export interface IWebdriverBuildConfig extends IBuildConfig {
    name?: 'Chrome' | 'Firefox' | 'Edge' | string
    driver?: WebDriver
}

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
        driver: WebDriver
    }> {
        let wrapper = await driverPool.getWithDomain(config?.baseUrl ?? url, config, setts);
        if (config?.includeCookies === false) {
            await wrapper.driver.manage().deleteAllCookies();
        }

        let hasSQuery = setts?.query != null;
        let httpsProxy = config?.httpsProxy;
        if (httpsProxy) {
            // Obsolete: chrome must be launched with PROXY settings
            let capsDriver = await wrapper.driver.getCapabilities();
            let capsProxy = new Capabilities();
            let url = typeof httpsProxy === 'string'
                ? httpsProxy
                : httpsProxy.url;

            let proxy = <ProxyConfig> {
                proxyType: 'manual',
                httpProxy: url,
                sslProxy: url,

            };

            let caps = capsProxy.setProxy(proxy)
            capsDriver.merge(caps);

            if (typeof httpsProxy !== 'string' && httpsProxy.username) {
                let { username, password } = httpsProxy
                let pss = `${username}:${password}`;
                let auth = Buffer.from(pss).toString('base64');
                let header = 'Proxy-Authorization';

                if (config.headers == null) {
                    config.headers = {
                        [header]: auth
                    };
                } else if (typeof config.headers === 'string') {
                    config.headers += `\n${header}: ${auth}`
                } else {
                    config.headers[header] = auth;
                }
            }
        }

        type TResult = {
            status: number
            headers: { [lowerCased: string]: string },
            data: T
            name?: 'Error' | null
            message?: string
            driver: WebDriver
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
        if (typeof fetchOpts.headers === 'string') {
            fetchOpts.headers = $headers.resolve(fetchOpts.headers);
        }

        let result: TResult = await wrapper
            .driver
            .executeAsyncScript(scripts_fetchAsync, url, fetchOpts);

        if (result == null) {
            throw new Error(`Response from the script is undefined`);
        }
        result = {
            ...result,
            driver: wrapper.driver
        };

        let isError = result.name === 'Error';
        if (isError) {
            if (hasSQuery === false) {
                driverPool.unlockDriver(wrapper);
            }
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
        if (hasSQuery === false) {
            // unlock only if we requests from pool, if passed externally leave the state as is
            driverPool.unlockDriver(wrapper);
        }
        return result;
    },
    pseudo: SelectorsEx.pseudoFns
};

function object_clean(fetchOpts: any): any {
    throw new Error('Function not implemented.');
}

