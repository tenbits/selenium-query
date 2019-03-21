import { IQueryStatics } from '../common/IQueryStatics';
import { IBuildConfig, ISettings } from "../common/IConfig";
import { IDriver } from '../common/IDriver';
import { CherrioQuery } from './CherrioQuery';
import { NetworkDriver } from '../fetch/NetworkDriver';
import { IQuery } from '../common/IQuery';
import { CheerioUtils } from './CheerioUtils';

export interface ICheerioBuildConfig extends IBuildConfig {
	html: string
}

export const CheerioDriver: IQueryStatics = {
	build(config: ICheerioBuildConfig): IQuery<CheerioElement> {
		let html = config.html;
		let el: any = CheerioUtils.fromHtml(html);		
        let query = new CherrioQuery(el);
        query.ctx.source = html;
		return query;
	},
	load(url: string, config: ICheerioBuildConfig): IQuery<CheerioElement> {
		let query = CherrioQuery.newAsync();
		
		NetworkDriver
			.load(url, config)
			.then(
				resp => {
					let $el = CheerioUtils.fromHtml(resp.body.toString());
					query.add($el);
					query.resolve(query);
				}, 
				error => query.reject(error)
			);

		return query;
	},
	fetch(url: string, config: IBuildConfig, setts?: ISettings) {
		return this.load(url, config, setts);
	},
	setDriver(driver: IDriver) {
		throw new Error('Cheerio does not support driver');
	},
	getDriver(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		throw new Error('Cheerio does not support driver');
	},
	unlockDriver(mix) {
        throw new Error('Cheerio does not support driver');
	}
};

