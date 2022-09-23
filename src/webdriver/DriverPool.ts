import { IDriver } from "../common/IDriver";
import { IBuildConfig, ILoadConfig, ISettings } from "../common/IConfig";
import { class_Dfr } from "atma-utils";
import { buildDriver } from "./SeleniumDriver";
import { ensureCookies } from "./utils/driver";
import { IQuery } from "../common/IQuery";
import { cookieContainer } from '../common/CookieContainer'
import { WebdriverQuery } from "./WebdriverQuery";
import { $domains } from '../utils/$domains';
import { singleton } from '../utils/deco';

let POOL_DEFAULT = 5;
let POOL_CUSTOM: number;

export class DriverPool {


    private singleton: DriverWrapper
    private pool: DriverWrapper[] = [];
    private queue: {url: string, config: ILoadConfig, dfr: class_Dfr}[] = []

    async get (url: string = null, config: ILoadConfig, setts: ISettings): Promise<DriverWrapper> {
        let driver = config.driver ?? (setts?.query ? DriverExtractor.extractDriver(setts.query) : null);
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
        if (setts?.pool) {
            if (typeof setts.pool === 'number') {
                POOL_CUSTOM = Math.max(setts.pool, this.pool.length);
            }
            return await this.requestDriver(url, config);
        }
        return await this.getGlobal(url, config);
    }

    async getWithDomain (url: string = null, config: ILoadConfig, setts: ISettings): Promise<DriverWrapper> {
        let wrapper = await this.get(url, config, setts);
        let domain = $domains.fromUrl(url);

        let currentUrl = await wrapper.driver.getCurrentUrl();
        if ($domains.equal(domain, currentUrl) === false) {
            // Load page in DOMAIN context
            await wrapper.driver.get(domain);
        }
        return wrapper;
    }

    async unlockDriver(mix: IQuery<any> | IDriver | DriverWrapper) {

        let driver = DriverExtractor.extractDriver(mix);
        if (driver == null || this.pool.length === 0) {
            return;
        }
        let wrapper = this.pool.find(x => x.driver === driver);
        if (wrapper == null) {
            console.warn('SeleniumQuery. Unlock driver. Wrapper not found');
            return;
        }

        wrapper.busy = false;

        // Tick next awaiter
        let dfrData = this.queue.shift();
        if (dfrData) {
            wrapper.busy = true;
            await wrapper.ensureCookies(dfrData.url, dfrData.config);
            dfrData.dfr.resolve(wrapper);
        }
    }

    @singleton
    private async getGlobal(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {
        this.memCookies(url, config);

        let singleton = new DriverWrapper();

        await singleton.build(config);
        await singleton.ensureCookies(url, config);
        return (this.singleton = singleton);
    }

    public extractDriver(query: WebdriverQuery) {
        return DriverExtractor.extractDriver(query);
    }

    private async requestDriver(url: string = null, config: ILoadConfig):Promise<DriverWrapper> {

        this.memCookies(url, config);

        let free = this.pool.find(x => x.busy !== true);
        if (free) {
            free.busy = true;
            await free.ensureCookies(url, config);
            return free;
        }

        if (this.pool.length < getPoolCount()) {
            let wrapper = new DriverWrapper();
            wrapper.busy = true;
            wrapper.requestedAt = new Date;
            this.pool.push(wrapper);

            await wrapper.build(config);
            await wrapper.ensureCookies(url, config);
            return wrapper;
        }

        let dfr = new class_Dfr();
        this.queue.push({url, config, dfr})
        return dfr;
    }

    private memCookies (url: string, config: ILoadConfig) {
        if (config?.cookies) {
            cookieContainer.addCookies(url, config.cookies as any);
        }
    }

    setGlobal(driver: IDriver): any {
        this.singleton = new DriverWrapper();
        this.singleton.busy = false;
        this.singleton.driver = driver;
	}


}

export class DriverWrapper {

    requestedAt: Date
    busy = false
    driver: IDriver
    cookies: string

    async build (config: IBuildConfig) {
        this.driver = await buildDriver(config);
    }

    async ensureCookies (url: string, config: ILoadConfig) {

        let cookies = cookieContainer.getCookies(url);
        if (!cookies || cookies === this.cookies) {
            return;
        }

        this.cookies = cookies;
        await ensureCookies(this.driver, url, cookies, config);
    }
}

function getPoolCount () {
    return POOL_CUSTOM == null ? POOL_DEFAULT : POOL_CUSTOM;
}

export const driverPool = new DriverPool();


namespace DriverExtractor {

    function isElement (mix) {
        return mix != null && 'getDriver' in mix;
    }
    function isDriver (mix) {
        return mix != null && 'get' in mix && 'manage' in mix;
    }
    function fromQuery(mix) {
        let el = mix[0];
        if (isDriver(el)) {
            // is driver itself
            return el;
        }
        if (isElement(el)) {
            return el.getDriver();
        }
        return null;
    }
    function fromOwner(mix: IQuery<any>) {
        let owner = mix.ctx && mix.ctx.owner;
        let stack = [];
        while(owner != null) {
            let driver = fromQuery(owner);
            if (driver) {
                return driver;
            }
            stack.push(owner);
            owner = owner.ctx && owner.ctx.owner;
            if (stack.indexOf(owner) !== -1) {
                return null;
            }
        }
    }
    function fromWrapper (mix) {
        if (isDriver(mix)) {
            return mix;
        }
        if ('driver' in mix && 'busy' in mix) {
            return mix.driver;
        }
        return null;
    }


    export  function extractDriver(mix: IDriver | IQuery<any> | DriverWrapper): IDriver {
        if (mix == null) {
            return null;
        }
        var driver = fromQuery(mix);
        if (driver) {
            return driver;
        }
        var driver = fromOwner(<any> mix);
        if (driver) {
            return driver;
        }
        var driver = fromWrapper(mix);
        if (driver) {
            return driver;
        }

        return null;
    }
}
