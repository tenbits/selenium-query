import { IDriver, IThenableDriver } from "../IDriver";
import { IBuildConfig, ILoadConfig, ISettings } from "../static/build";
import { class_Dfr } from "atma-utils";
import { buildDriver } from "./SeleniumDriver";
import { setCookies } from "../utils/driver";
import { SQuery } from "../SQuery";
import { singleton } from '../utils/deco'

let POOL_DEFAULT = 5;
let POOL_CUSTOM: number;

export class DriverPool {
	
    
    singleton: DriverWrapper
    singletonPromise: Promise<DriverWrapper>

    pool: DriverWrapper[] = [];
    queue: {url: string, config: ILoadConfig, dfr: class_Dfr}[] = []

    cookies: { [domain: string]: any }

    async get (url: string = null, config: ILoadConfig, setts: ISettings): Promise<DriverWrapper> {        
        if (setts) {
            let driver = this.extractDriver(setts.query);
            if (driver) {
                if (this.singleton && this.singleton.driver === driver) {
                    this.singleton.busy = true;
                    return this.singleton;
                }
                let wrapper = this.pool.find(x => x.driver === driver);
                if (wrapper == null) {
                    wrapper = new DriverWrapper();
                    wrapper.driver = driver;
                    wrapper.busy = true;
                    wrapper.requestedAt = new Date();

                    this.pool.push(wrapper);
                }
                return wrapper;
            }
            if (setts.pool) {
                return await this.requestDriver(url, config);
            }
        }
        return await this.getGlobal(url, config);
    }

    async getWithDomain (url: string = null, config: ILoadConfig, setts: ISettings): Promise<DriverWrapper> {
        let wrapper = await this.get(url, config, setts);
        let match = /[^/]\/[^/]/.exec(url);
        let domain = match == null ? url : url.substring(0, match.index + 1);
        
        let currentUrl = await wrapper.driver.getCurrentUrl();
        if (!currentUrl || !currentUrl.includes(domain.replace(/https?:\/\//, ''))) {
            await wrapper.driver.get(domain);
        }
        return wrapper;
    }

    async unlockDriver(mix: IDriver | DriverWrapper | SQuery) {
        
        let driver = this.extractDriver(mix)
        let wrapper = this.pool.find(x => x.driver === driver);
        if (wrapper == null) {
            console.warn('Unlocking: Wrapper not found');
            return;
        }

        wrapper.busy = false;

        // Tick next awaiter
        let dfrData = this.queue.shift();
        if (dfrData) {
            wrapper.busy = true;
            await wrapper.ensureCookies(dfrData.url, this.cookies, dfrData.config);
            dfrData.dfr.resolve(wrapper);
        }
    }

    @singleton
    private async getGlobal(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {
        this.memCookies(url, config);
        
        let singleton = new DriverWrapper();

        await singleton.build(config);
        await singleton.ensureCookies(url, this.cookies, config);
        return (this.singleton = singleton);
    }

    private async requestDriver(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {
        
        this.memCookies(url, config);

        let free = this.pool.find(x => x.busy !== true);
        if (free) {
            free.busy = true;
            await free.ensureCookies(url, this.cookies, config);
            return free;
        }

        if (this.pool.length < getPoolCount()) {
            let wrapper = new DriverWrapper();
            wrapper.busy = true;
            wrapper.requestedAt = new Date;
            this.pool.push(wrapper);
            
            await wrapper.build(config);
            await wrapper.ensureCookies(url, this.cookies, config);
            return wrapper;
        }

        let dfr = new class_Dfr();
        this.queue.push({url, config, dfr})
        return dfr;
    }

    private memCookies (url: string, config: ILoadConfig) {
        if (config && config.cookies) {
            let domain = config.cookieOrigin;
            if (domain == null) {
                domain = url;
                if (domain == null) {
                    return;
                }
                let match = /[^/]\/[^/]/.exec(url);
                if (match) {
                    domain = url.substring(0, match.index + 1);
                }
            }
            this.cookies[domain] = config.cookies;
        }
    }

    setGlobal(driver: IDriver): any {
        this.singleton = new DriverWrapper();
        this.singleton.busy = false;
        this.singleton.driver = driver;
	}
    

    private extractDriver(mix: IDriver | SQuery | DriverWrapper): IDriver {
        if (mix == null) {
            return null;
        }
        if ('length' in mix) {
            let el = mix[0];
            if (el == null) {
                return null;
            }
            if ('get' in el && 'manage' in el) {
                // is driver itself
                return el;
            }
            if ('getDriver' in el) {
                return el.getDriver();
            }            
            return null;
        }
        if ('get' in mix && 'manage' in mix) {
            return mix;
        }
        if ('driver' in mix && 'busy' in mix) {
            return mix.driver;
        }
        return null;
    }
}

export class DriverWrapper {

    requestedAt: Date
    busy = false
    driver: IDriver
    cookies: { [key: string]: any }

    async build (config: IBuildConfig) {
        this.driver = await buildDriver(config);        
    }

    async ensureCookies (url: string, cookies, config: ILoadConfig) {
        config = Object.assign({}, config);
        
        for (let domain in cookies) {
            if (domain in this.cookies) {
                continue;
            }
            this.cookies[domain] = cookies[domain]
            config.cookies = this.cookies[domain] as any;

            await setCookies(this.driver, domain, config);
        }
    }
}

function getPoolCount () {
    return POOL_CUSTOM == null ? POOL_DEFAULT : POOL_CUSTOM;
}

export const driverPool = new DriverPool();