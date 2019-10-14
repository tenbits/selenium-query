import { IQueryStatics } from '../common/IQueryStatics';
import { IBuildConfig, ISettings } from "../common/IConfig";
import { IDriver, IDriverManager } from '../common/IDriver';
import { CherrioQuery } from './CherrioQuery';
import { NetworkDriver } from '../fetch/NetworkDriver';
import { IQuery } from '../common/IQuery';
import { CheerioUtils } from './CheerioUtils';
import { SelectorsEx } from '../common/SelectorsEx';

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
    load(url: string, config: ICheerioBuildConfig): IQuery<CheerioElement> {
        driver = new CheerioDriverInner(config);

        return driver.get(url) as any as IQuery<CheerioElement>;
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

    executeScript<T>(script: string, ...var_args: any[]): Promise<T> {
        throw new Error('Method not implemented.');
    }
    executeAsyncScript<T>(script: string, ...var_args: any[]): Promise<T> {
        throw new Error('Method not implemented.');
    }
    get(url: string): Promise<any> {
        let query = CherrioQuery.newAsync();

        NetworkDriver
            .load(url, this.config)
            .then(
                resp => {
                    this.url = resp.url;
                    this.headers = resp.headers;
                    this.status = resp.status;

                    let html = resp.body.toString();
                    let $el = CheerioUtils.fromHtml(html);
                    query.add($el);
                    query.resolve(query);
                },
                error => {
                    query.reject(error)
                }
            );

        return query as any as Promise<any>;
    }
    manage(): IDriverManager {
        throw new Error('Method not implemented.');
    }
    async getCurrentUrl(): Promise<string> {
        return this.url;
    }
    async getPageSource(): Promise<string> {
        return this.html;
    }
}