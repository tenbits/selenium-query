import { IBuildConfig, ISettings, ILoadConfig } from "./IConfig";
import { IDriver } from "./IDriver";
import { IQuery } from "./IQuery";

export interface IQueryStatics {
    fromHtml(html: string): IQuery<any>
    build(config: IBuildConfig, setts?: ISettings): any;
	load(url: string, config: ILoadConfig, setts?: ISettings): IQuery<any>;
	unlockDriver (mix);
	fetch <T> (url: string, config: ILoadConfig, setts?: ISettings): Promise<T>;

	[key: string]: any
}