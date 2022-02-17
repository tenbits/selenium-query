import { WebdriverQuery } from '../webdriver/WebdriverQuery';
import { IBuildConfig, ISettings, ILoadConfig } from "./IConfig";
import { IQuery } from "./IQuery";
import { IPseudoSelectorFn, SelectorsEx } from './SelectorsEx';

export interface IQueryStatics<TQuery extends IQuery<any>> {
    fromHtml(html: string): TQuery
    build(config: IBuildConfig, setts?: ISettings): TQuery;
    load(url: string, config: ILoadConfig, setts?: ISettings): TQuery;
    unlockDriver (mix);
    fetch <T = any | WebdriverQuery> (url: string, config?: ILoadConfig & { baseUrl?: string}, setts?: ISettings): Promise<{
        status: number
        headers: { [lowerCased: string]: string },
        data: T
    }>;

    pseudo: typeof SelectorsEx.pseudoFns
    [key: string]: any
}
