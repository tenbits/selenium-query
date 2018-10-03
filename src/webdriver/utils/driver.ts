import { IDriver, IElement } from '../../common/IDriver'
import { ILoadConfig } from '../../common/IConfig'
import { dfr_run } from '../../utils/dfr'
import { _when, async_toThenable, async_waterfall, async_waterfallFn, async_all } from '../../utils/async'
import { IQuery } from '../../common/IQuery'
import { driverPool } from '../DriverPool'
import { WebdriverQuery } from '../WebdriverQuery';
import { class_Dfr } from 'atma-utils';

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
            let parts = single.split('=').map(x => x.trim());
            return { name: parts[0], value: parts[1] }
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

export function waitForElement (query: IQuery<IElement>, selector: string): IQuery<IElement> {
    let driver = driverPool.extractDriver(query as any);
    let set = WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return;
    }

    waitForTrue(() => {
        return query.find(selector).then(x => x.length !== 0);
    }, 10_000).then(
        () => {
            query.find(selector).then(x => set.resolve(x), err => set.reject(err));
        },
        (err) => set.reject(err)
    );
    return query;

}

export function waitForPageLoad (query: IQuery<IElement>): IQuery<IElement> {
    let driver = driverPool.extractDriver(query as any);
    let set = WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return;
    }

    let delay = WaitForPageLoad.delay();
    let q = async_toThenable(query);

    async_all([q, delay]).then(([query]) => {
        let awaiters = [
            () => WaitForPageLoad.documentIsReady(driver, 5000),
        ];
        if (query.length > 0 && query[0] !== driver) {
            /* If element is passed, listen also for the element to be destroyed on page unload */
            let el = query[0];
            awaiters.unshift(
                () => WaitForPageLoad.elementLeavesDom(driver, el, 5000)
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

    export function documentIsReady (driver: IDriver, timeout: number) {
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
                    return state === 'complete'
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

function waitForTrue(check: () => Promise<boolean>, timeout: number) {
    let dfr = new class_Dfr;
    let time = Date.now();
    function tick () {
        check().then(function (state) {
            if (state === true) {
                dfr.resolve();
                return;
            }

            if (Date.now() - time > timeout) {
                dfr.reject(new Error('Timeout error'));
                return;
            }
            setTimeout(check, 400);
        }, error => dfr.reject(error))
    }
    
    tick();
    return dfr;
}