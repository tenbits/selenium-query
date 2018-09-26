import { IDriver } from "../IDriver";
import { IBuildConfig, ILoadConfig, ISettings } from "../static/build";
import { obj_extend, class_Dfr } from "atma-utils";
import { buildDriver } from "./SeleniumDriver";
import { setCookies } from "../utils/driver";
import { SQuery } from "../SQuery";


const COUNT = 40;

export class DriverPool {
    
    singleton: DriverWrapper
    pool: DriverWrapper[] = [];
    queue: {url: string, config: ILoadConfig, dfr: class_Dfr}[] = []

    cookies: { [domain: string]: any }

    async get (url: string = null, config: ILoadConfig, setts: ISettings) {
        if (setts) {
            let driver = this.extractDriver(setts.query);
            if (driver) {
                if (this.singleton && this.singleton.driver === driver) {
                    this.singleton.busy = true;
                    return this.singleton;
                }
                let wrapper = this.pool.find(x => x.driver === driver);
                if (wrapper == null) {
                    wrapper = new DriverWrapper(config);
                    wrapper.driver = driver;
                    wrapper.busy = true;
                    wrapper.requestedAt = new Date();

                    this.pool.push(wrapper);
                }
                return wrapper;
            }
        }
        if (setts && setts.pool) {
            return this.requestDriver(url, config);
        }
        return this.getGlobal(url, config);
    }

    async releaseDriver(mix: IDriver | DriverWrapper) {
        let wrapper = this.pool.find(x => x === mix || x.driver === mix);
        if (wrapper == null) {
            throw Error('Wrapper not found');
        }

        wrapper.busy = false;

        let dfrData = this.queue.shift();
        if (dfrData) {
            wrapper.busy = true;
            await wrapper.ensureCookies(dfrData.url, this.cookies, dfrData.config);
            dfrData.dfr.resolve(wrapper);
        }
    }

    private async getGlobal(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {
        this.memCookies(url, config);

        if (this.singleton == null) {
            this.singleton = new DriverWrapper(config);            
        }
        await this.singleton.ensureCookies(url, this.cookies, config);
        return this.singleton;
    }

    private async requestDriver(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {
        
        this.memCookies(url, config);

        if (this.pool.length < COUNT) {
            let wrapper = new DriverWrapper(config);

            wrapper.busy = true;
            wrapper.requestedAt = new Date;
            this.pool.push(wrapper);
            
            await wrapper.ensureCookies(url, this.cookies, config);
            return wrapper;
        }

        let free = this.pool.find(x => x.busy !== true);
        if (free) {
            free.busy = true;
            await free.ensureCookies(url, this.cookies, config);
            return free;
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

    

    private extractDriver(mix: IDriver | SQuery): IDriver {
        if (mix == null) {
            return null;
        }
        if ('length' in mix) {
            let el = mix[0];
            if (el == null) {
                return null;
            }
            if ('getDriver' in el) {
                return el.getDriver();
            }
            if ('get' in el && 'manage' in el) {
                // is driver itself
                return el;
            }
            return null;
        }
        if ('get' in mix && 'manage' in mix) {
            return mix;
        }
        return null;
    }
}

export class DriverWrapper {

    requestedAt: Date
    busy = false
    driver: IDriver

    cookies: { [key: string]: any }

    constructor(config: IBuildConfig) {
        this.driver = buildDriver(config);
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


export const driverPool = new DriverPool();