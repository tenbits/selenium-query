import { IQuery, IQueryConditionFn } from '../common/IQuery'
import { IBuildConfig, ISettings } from '../common/IConfig'
import { IDriver } from '../common/IDriver'
import { Deferred } from '../types/Deferred'
import { dfr_resolve } from '../utils/dfr';
import { NetworkDriver } from '../fetch/NetworkDriver';
import { CheerioUtils } from './CheerioUtils';
import cheerio from 'cheerio'

export class CherrioQuery extends IQuery<CheerioElement> {
    waitForElement(selector: string, mix?: { visible?: boolean; check?: IQueryConditionFn<CheerioElement>; } | IQueryConditionFn<CheerioElement>): IQuery<CheerioElement, any> {
        throw new Error('Method not implemented.');
    }

    protected _onFn(node: CheerioElement, type: string, cb: Function): Promise<any> {
        throw new Error('Method not implemented.');
    }
    protected _onOnceFn(node: CheerioElement, type: string, cb: Function): Promise<any> {
        throw new Error('Method not implemented.');
    }
    protected _offFn(node: CheerioElement, type: string, cb: Function): Promise<any> {
        throw new Error('Method not implemented.');
    }


    hasClassFn (node: CheerioElement, name: string): Deferred<boolean> {
        return dfr_resolve(cheerio(node).hasClass(name));
    }
    addClassFn (node: CheerioElement, name: string): Deferred<void> {
        cheerio(node).addClass(name);
        return dfr_resolve();
    }
    removeClassFn(node: CheerioElement, name: string): Deferred<void> {
        cheerio(node).removeClass(name);
        return dfr_resolve();
    }
    toggleClassFn(node: CheerioElement, name: string): Deferred<void> {
        cheerio(node).toggleClass(name);
        return dfr_resolve();
    }

    textGetFn (node: CheerioElement): Deferred<string>  {
        // Cheerio returns empty string on `text` for script elements
        const method = node.tagName === 'script' ? 'html' : 'text';
        return dfr_resolve(cheerio(node)[method]());
    }
    textSetFn (node: CheerioElement, text: string): Deferred<void>  {
        cheerio(node).text(text);
        return dfr_resolve();
    }
    htmlOuterGetFn (node: CheerioElement): Deferred<string>  {

        return dfr_resolve(cheerio.html(node));
    }
    htmlGetFn (node: CheerioElement): Deferred<string>  {
        return dfr_resolve(CheerioUtils.fromNode(node).html());
    }
    htmlSetFn (node: CheerioElement, text: string): Deferred<void>  {
        cheerio(node).html(text);
        return dfr_resolve();
    }
    appendFn (node: CheerioElement, html: string): Deferred<void> {
        cheerio(node).append(html);
        return dfr_resolve();
    }
    prependFn (node: CheerioElement, html: string): Deferred<void> {
        cheerio(node).prepend(html);
        return dfr_resolve();
    }
    beforeFn (node: CheerioElement, html: string): Deferred<void> {
        cheerio(node).insertBefore(html);
        return dfr_resolve();
    }
    afterFn (node: CheerioElement, html: string): Deferred<void> {
        cheerio(node).insertAfter(html);
        return dfr_resolve();
    }
    cssGet (node: CheerioElement, prop: string): Promise<any> {
        return dfr_resolve(cheerio(node).css(prop));
    }
    cssSet (node: CheerioElement, css: { [key: string]: any }): Deferred<void> {
        cheerio(node).css(css);
        return dfr_resolve();
    }

    async heightGetFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    async widthGetFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    innerHeightFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    innerWidthFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    getBoundingClientRect (node: CheerioElement): Promise<{top: number, left: number, width: number, height: number}> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    async getPosition (node: CheerioElement): Promise<{top: number, left: number}> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }

    scrollTopGetFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollTopSetFn (node: CheerioElement, scroll: number): Deferred<void> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollLeftGetFn (node: CheerioElement): Promise<number> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }

    scrollLeftSetFn (node: CheerioElement, scroll: number): Deferred<void> {
        throw new Error('Cheerio driver does not support dimensions feature');
    }

    evalFn(node: CheerioElement, mix: Function | string, ...args): Promise<any> {
        throw new Error('Eval is not supported with Cheerio Driver');
    }

    //#region Events
    clickFn(node: CheerioElement): Promise<void> {
        throw new Error('Cheerio driver does not support manipulation feature');
    }
    triggerFn(node: CheerioElement, type: string, ...args): Promise<void> {
        throw new Error('Cheerio driver does not support manipulation feature');
    }

    selectFn(node: CheerioElement, ...args): Promise<any> {
        throw new Error('Cheerio driver does not support manipulation feature');
    }

    focusFn(node: CheerioElement): Promise<void> {
        throw new Error('FOCUS is not supported in Cheerio');
    }
    blurFn(node: CheerioElement): Promise<void> {
        throw new Error('BLUR is not supported in Cheerio');
    }
    sendKeysFn(node: CheerioElement, mix): Promise<void> {
        throw new Error('SEND_KEYS is not supported in Cheerio');
    }

    typeFn(node: CheerioElement, str: string): Promise<void> {
        throw new Error('TYPE is not supported in Cheerio');
    }
    pressFn (node: CheerioElement, str:string): Promise<void> {
        throw new Error('PRESS is not supported in Cheerio');
    }
    //#endregion
    //#region Manipulate
    removeFn (node: CheerioElement): Promise<void> {
        cheerio(node).remove();
        return dfr_resolve();
    }
    //#endregion
    //#region Properties
    attrGetFn (node: CheerioElement, prop: string): Promise<any> {
        return dfr_resolve(cheerio(node).attr(prop));
    }
    attrSetFn (node: CheerioElement, attr: { [key: string]: any }): Deferred<void> {
        for (let key in attr) {
            cheerio(node).attr(key, attr[key]);
        }
        return dfr_resolve();
    }
    valGetFn (node: CheerioElement): Promise<any> {
        return dfr_resolve(cheerio(node).val());
    }
    valSetFn (node: CheerioElement, value: any): Deferred<void> {
        cheerio(node).val(value);
        return dfr_resolve();
    }
    dataGetFn (node: CheerioElement, key: string): Promise<any> {
        return dfr_resolve(cheerio(node).data(key));
    }
    dataSetFn (node: CheerioElement, data: object): Deferred<void> {
        for (let key in data) {
            cheerio(node).data(key, data[key]);
        }
        return dfr_resolve();
    }
    protected propGetFn(node: CheerioElement, key: string): Promise<any> {
        return dfr_resolve(cheerio(node).prop(key));
    }
    protected propSetFn(node: CheerioElement, data: object): Deferred<void> {
        for (let key in data) {
            cheerio(node).prop(key, data[key]);
        }
        return dfr_resolve();
    }
    //#endregion

    findFn (node: CheerioElement, selector: string): Deferred<CheerioElement[]> {
        let arr = cheerio(node).find(selector).toArray();
        return dfr_resolve(arr);
    }

    matchesFn (node: CheerioElement, selector: string): Deferred<boolean> {
        return dfr_resolve(cheerio(node).is(selector));
    }

    parentFn (node: CheerioElement): Promise<CheerioElement> {
        let el = cheerio(node).parent().get(0);
        return dfr_resolve(el);
    }
    closestFn (node: CheerioElement, sel: string): Promise<CheerioElement> {
        let el = cheerio(node).closest(sel).get(0);
        return dfr_resolve(el);
    }
    childrenFn (node: CheerioElement, sel?: string): Promise<CheerioElement[]> {
        let arr = cheerio(node).children(sel).toArray();
        return dfr_resolve(arr);
    }
    nextFn (node: CheerioElement, sel?: string): Promise<CheerioElement> {
        let next = cheerio(node).next(sel).get(0);
        return dfr_resolve(next);
    }

    protected getField<T>(node: CheerioElement, field: string): Deferred<T> {
        return node[field];
    }

    protected setField(node: CheerioElement, obj: any): Deferred<void>;
    protected setField(node: CheerioElement, field: string, val: any): Deferred<void>;
    protected setField(node: CheerioElement, mix, val?): Deferred<void> {
        if (arguments.length === 2) {
            for (let key in mix) {
                node[key] = mix[key];
            }
            return dfr_resolve();
        }
        node[mix] = val;
        return dfr_resolve();
    }
    protected callField<T>(node: CheerioElement, field: string, ...args): Deferred<T> {
        return dfr_resolve(node[field](...args));
    }

    static newAsync (mix?, parent?: IQuery<CheerioElement>) {
        let query = new CherrioQuery(mix);
        query.ctx.owner = parent;
        (query as any).then = query.ctx.thener;
        return query;
    }


    //#region driver utils
    unlock () {

    }
    //#endregion driver utils

    static build(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
        throw new Error('No build for JSDom is required. Use direkt load');
    }
    static load(url: string, config: IBuildConfig, setts?: ISettings) {
        let query = CherrioQuery.newAsync();
        NetworkDriver.load(url, setts?.opts).then(resp => {
            let html = resp.body.toString();
            let $ = CheerioUtils.fromHtml(html);
            query.ctx.source = html;
            query.add($);
            query.resolve(query);
        })
        return query;
    }
    static fetch(url: string, config?: IBuildConfig, setts?: ISettings) {
        return this.load(url, config, setts);
    }
    static setDriver (driver: IDriver ) {
        throw new Error('JSDOM does not support driver');
    }
    static getDriver (config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
        throw new Error('JSDOM does not support driver');
    }
    static unlockDriver (mix) {

    }

}

function toCamelCase(property): string {
    return property.replace(/\-(\w)/g, (full, char: string) => {
        return char.toUpperCase();
    })
}
