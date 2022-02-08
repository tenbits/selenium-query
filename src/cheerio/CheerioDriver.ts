import { IQueryStatics } from '../common/IQueryStatics';
import { IBuildConfig, ISettings } from "../common/IConfig";
import { IDriver, IDriverManager } from '../common/IDriver';
import { CherrioQuery } from './CherrioQuery';
import { NetworkDriver } from '../fetch/NetworkDriver';
import { IQuery } from '../common/IQuery';
import { CheerioUtils } from './CheerioUtils';
import { SelectorsEx } from '../common/SelectorsEx';
import {
    FileDetector,
    Session,
    Capabilities,
    Actions,
    WebElementPromise,
    Locator,
    WebElement,
    Navigation,
    TargetLocator
} from 'selenium-webdriver';
import { Command, Executor } from 'selenium-webdriver/lib/command';

export interface ICheerioBuildConfig extends IBuildConfig {
    html: string
}

let driver: CheerioDriverInner;

export const CheerioDriver: IQueryStatics = {
    fromHtml(html: string) {
        return CheerioDriver.build({ html });
    },
    build(config: ICheerioBuildConfig): IQuery<CheerioElement> {
        let html = config.html;

        driver = new CheerioDriverInner(config);
        driver.html = html;
        let el: any = CheerioUtils.fromHtml(html);
        let query = new CherrioQuery(el);
        query.ctx.source = html;
        return query;
    },
    load(url: string, config: ICheerioBuildConfig): CherrioQuery {
        driver = new CheerioDriverInner(config);

        return driver.getAsQuery(url) as any as CherrioQuery;
    },
    fetch(url: string, config: IBuildConfig, setts?: ISettings) {
        return this.load(url, config, setts);
    },
    setDriver(driver: IDriver) {
        throw new Error('Cheerio does not support driver');
    },
    getDriver(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
        return Promise.resolve(driver);
    },
    unlockDriver(mix) {
        driver = null;
    },
    pseudo: SelectorsEx.pseudoFns
};

class CheerioDriverInner implements IDriver {
    public url: string
    public status: number

    public headers: { [name: string]: string }

    public html: string

    constructor(public config: ICheerioBuildConfig) {

    }

    async get(url: string): Promise<void> {
        let query = CherrioQuery.newAsync();

        let resp = await NetworkDriver.load(url, this.config);
        let html = resp.body.toString();
        let $el = CheerioUtils.fromHtml(html);

        this.url = resp.url;
        this.headers = resp.headers;
        this.status = resp.status;
        this.html = html;

        query.ctx.source = html;
        query.ctx.url = url;
        query.ctx.status = resp.status;
        query.ctx.headers = resp.headers;
        query.add($el);
        query.resolve(query);
    }

    async getCurrentUrl(): Promise<string> {
        return this.url;
    }
    async getPageSource(): Promise<string> {
        return this.html;
    }

    async getAsQuery(url: string): Promise<CherrioQuery> {
        await this.get(url);
        let query = CherrioQuery.newAsync();

        let $el = CheerioUtils.fromHtml(this.html);

        query.ctx.source = this.html;
        query.ctx.url = url;
        query.ctx.status = this.status;
        query.ctx.headers = this.headers;
        query.add($el);
        query.resolve(query);
        return query as any as Promise<CherrioQuery>;
    }

    // NOT IMPLEMENTED
    manage() {
        throw new Error('Method not implemented.');
        return null;
    }
    execute<T>(command: Command, description?: string): Promise<T> {
        throw new Error('Method not implemented.');
    }
    setFileDetector(detector: FileDetector): void {
        throw new Error('Method not implemented.');
    }
    getExecutor(): Executor {
        throw new Error('Method not implemented.');
    }
    getSession(): Promise<Session> {
        throw new Error('Method not implemented.');
    }
    getCapabilities(): Promise<Capabilities> {
        throw new Error('Method not implemented.');
    }
    quit(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    actions(options?: { async: boolean; bridge: boolean; } | { async: boolean; } | { bridge: boolean; }): Actions {
        throw new Error('Method not implemented.');
    }
    wait(...args) {
        throw new Error('Method not implemented.');
        return null;
    }
    sleep(ms: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getWindowHandle(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    getAllWindowHandles(): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    close(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getTitle(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    findElement(locator: Locator): WebElementPromise {
        throw new Error('Method not implemented.');
    }
    findElements(locator: Locator): Promise<WebElement[]> {
        throw new Error('Method not implemented.');
    }
    takeScreenshot(): Promise<string> {
        throw new Error('Method not implemented.');
    }
    navigate(): Navigation {
        throw new Error('Method not implemented.');
    }
    switchTo(): TargetLocator {
        throw new Error('Method not implemented.');
    }
    executeScript<T>(script: string, ...var_args: any[]): Promise<T> {
        throw new Error('Method not implemented.');
    }
    executeAsyncScript<T>(script: string, ...var_args: any[]): Promise<T> {
        throw new Error('Method not implemented.');
    }

}
