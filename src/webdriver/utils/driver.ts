import { IDriver, IElement } from '../../common/IDriver'
import { ILoadConfig } from '../../common/IConfig'
import { dfr_run } from '../../utils/dfr'
import { _when, async_toThenable, async_waterfallFn, async_all } from '../../utils/async'
import { IQuery, IQueryWaitOptions } from '../../common/IQuery'
import { driverPool } from '../DriverPool'
import { WebdriverQuery } from '../WebdriverQuery';
import { class_Dfr } from 'atma-utils';
import { node_toScript } from './node'
import { type WebElement } from 'selenium-webdriver'
import { $promise } from '../../utils/$promise'

export function loadUrl (driver: IDriver, url: string, config: ILoadConfig): Promise<IDriver> {
    return driver
        .get(url)
        .then(() => driver, (error) => {
            return error;
            // if (error.code !== 100) {
            //     return error;
            // }
            // return BuildStatics
            //     .build(config)
            //     .then(driver => {
            //         return driver
            //             .get(url)
            //             .then(() => driver);
            //     });
        });
}

export function ensureCookies(driver: IDriver, url: string, cookies: string, config: ILoadConfig): Promise<undefined> {
    return <Promise<undefined>> <any> dfr_run((resolve, reject) => {

        if (!cookies) {
            resolve();
            return;
        }

        let arr: any[] = cookies.split(';').map(x => x.trim()).map(single => {
            let i = single.indexOf('=');
            let name = single.substring(0, i).trim();
            let value = single.substring(i + 1).trim();
            return { name, value };
        });;

        let origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }

        loadUrl(driver, origin, config).then(driver => {

            let dfrs = arr.map(cookie => driver.manage().addCookie(cookie));

            _when(dfrs, () => {
                resolve();
            })
        })
    });
}

export function driver_evalAsync (el: IElement | IDriver | WebdriverQuery | any, mix: string | Function, ...args: any[]): IQuery<IElement> {
    let set = WebdriverQuery.newAsync(void 0, el);
    let script = node_toScript(mix);
    let driver = driverPool.extractDriver(el as any);
    if (driver == null) {
        set.reject(new Error('Driver is not resolved.'));
        return set;
    }
    driver
        .executeAsyncScript(script, ...args)
        .then((result) => {
            set.resolve(Promise.resolve(result));
        }, error => {
            console.error('Unexpected browser error', error);
            set.reject(error);
        });
    return set;
}

export function waitForElement (query: IQuery<IElement>, selector: string, opts?: IQueryWaitOptions<WebElement>): IQuery<IElement> {
    let driver = driverPool.extractDriver(query as any);
    let set = WebdriverQuery.newAsync(void 0, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return;
    }

    waitForTrue(async () => {
        let $: IQuery<WebElement> = await query.find(selector);
        if ($.length === 0) {
            if (opts?.hidden === true) {
                // waiting for no-element
                return true;
            }
            return false;
        }
        if (opts?.visible === true) {
            let el = $.get(0);
            let isVisible = await el.isDisplayed();
            if (isVisible === false) {
                return false;
            }
        }
        if (opts?.hidden === true) {
            // all elements should be hidden
            for (let i = 0; i < $.length; i++) {
                let el = $.get(i);
                let isVisible = await el.isDisplayed();
                if (isVisible) {
                    return false;
                }
            }
        }
        if (opts?.check) {
            let result = await opts.check($);
            if (result === false) {
                return false;
            }
        }
        return true;
    }, { timeout: opts?.timeout, interval: opts?.interval }).then(
        () => {
            query.find(selector).then(
                x => {
                    set.resolve(x)
                },
                err => {
                    set.reject(err)
                },
            );
        },
        (err) => {
            set.reject(err);
        }
    );
    return set;
}

export function waitForPageLoad (query: IQuery<IElement>, waitForState: 'complete' | 'interactive' = 'complete', urlPattern?: string | RegExp): IQuery<IElement> {
    let driver = driverPool.extractDriver(query as any);
    let set = WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return set;
    }

    let delay = WaitForPageLoad.delay();
    let q = async_toThenable(query);

    async_all([q, delay]).then(([query]) => {
        let awaiters = [];

        if (urlPattern != null) {
            awaiters.push(() => WaitForPageLoad.documentUrl(driver, 10_000, urlPattern));
        }

        awaiters.push(() => WaitForPageLoad.documentState(driver, 10_000, waitForState));
        if (query.length > 0 && query[0] !== driver) {
            /* If element is passed, listen also for the element to be destroyed on page unload */
            let el = query[0];
            awaiters.unshift(
                () => WaitForPageLoad.elementLeavesDom(driver, el, 8_000)
            );
        }
        async_waterfallFn(...awaiters).then(() => {
            set.add(driver);
            set.resolve(set);
        }, error => set.reject(error));
    });

    return set;
}

namespace WaitForPageLoad {

    export function delay () {
        let dfr = new class_Dfr;
        setTimeout(() => dfr.resolve(), 100);
        return dfr;
    }
    export function documentUrl(driver: IDriver, timeout: number, awaitUrl: string | RegExp) {
        let dfr = new class_Dfr;
        waitForTrue(isUrl, timeout).then(() => {
            dfr.resolve();
        }, error => {
            dfr.reject(new Error(`${awaitUrl} not seen. timeouted`));
        });
        return dfr;
        function isUrl () {
            return driver
                .getCurrentUrl()
                .then(url => {
                    if (typeof awaitUrl === 'string') {
                        return awaitUrl.replace(/[^\w]/g, '') === url.replace(/[^\w]/g, '');
                    }

                    return awaitUrl.test?.(url) ?? false
                });
        }
    }

    export function documentState(driver: IDriver, timeout: number, waitForState: 'complete' | 'interactive' = 'complete') {
        let dfr = new class_Dfr;
        waitForTrue(isReady, timeout).then(() => {
            dfr.resolve();
        }, error => {
            dfr.reject(new Error(`ReadyState timeout`));
        });
        return dfr;
        function isReady () {
            return driver
                .executeScript('return document.readyState')
                .then(state => {
                    if (waitForState === 'interactive') {
                        return state === 'interactive' || state === 'complete';
                    }
                    return state === waitForState
                });
        }
    }
    export function elementLeavesDom (driver: IDriver, el, timeout: number) {

        let dfr = new class_Dfr;
        waitForTrue(isStale, timeout).then(x => {
            dfr.resolve();
        }, error => {
            dfr.reject(new Error(`The old element is still in dom after ${timeout}ms. Reload is not triggered`));
        });
        return dfr;

        function isStale () {
            return <any> dfr_run((resolve, reject) => {

                el.getTagName().then(x => {
                    resolve(false);
                }, x => {
                    // waiting for StaleElementReferenceError
                    resolve(true)
                });
            })
        }
    }
}

type TWaitForOptions = {
    timeout?: number
    interval?: number
}

function waitForTrue(check: () => Promise<boolean>, timeout: number)
function waitForTrue(check: () => Promise<boolean>, opts: TWaitForOptions)
async function waitForTrue(check: () => Promise<boolean>, mix: number | { timeout?: number, interval?: number }) {
    let time = Date.now();
    let interval = 400;
    let timeout = 10_000;
    if (typeof mix === 'number') {
        timeout = mix;
    } else {
        timeout = mix?.timeout ?? timeout;
        interval = mix?.interval ?? interval;
    }

    async function tick () {
        let result = await check();
        if (result === true) {
            return;
        }
        if (Date.now() - time > timeout) {
            throw new Error('Timeout error');
        }

        await $promise.wait(interval);
        await tick();
    }
    await tick();
}
