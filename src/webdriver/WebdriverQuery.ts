import { node_eval, node_getDriver } from './utils/node'
import { refs } from '../global'
import { IElement, IDriver, IDriverManager } from '../common/IDriver'
import { Deferred } from '../types/Deferred'
import { IQuery, IQueryConditionFn, IQueryWaitOptions } from '../common/IQuery'
import { IWebdriverBuildConfig, Webdriver } from './Webdriver'
import { IBuildConfig, ILoadConfig, ISettings } from '../common/IConfig'
import { driverPool } from './DriverPool'
import { IJsdomBuildConfig, JsdomDriver } from '../jsdom/JsdomDriver'
import { CheerioDriver, ICheerioBuildConfig } from '../cheerio/CheerioDriver'
import { NetworkDriver } from '../fetch/NetworkDriver'
import { waitForPageLoad, waitForElement, driver_evalAsync } from './utils/driver';
import { DefaultConfig } from './SeleniumDriver';
import { WebdriverEventsPoll } from './WebdriverEventsPoll';
import { SelectorsEx } from '../common/SelectorsEx'
import { scripts_nodeCss } from './scripts/css/nodeCss'
import { scripts_nodeProperty } from './scripts/nodeProperty'
import { scripts_nodeDataset } from './scripts/nodeDataset'
import { WebdriverFormData } from './WebdriverFormData'
import { FormDataBase } from '../common/FormDataBase'
import { type WebElement } from 'selenium-webdriver'
import { JsdomQuery } from '../jsdom/JsdomQuery'
import { CherrioQuery } from '../cheerio/CherrioQuery'

declare var scripts_nodeClassHas: any;
declare var scripts_nodeClassAdd: any;
declare var scripts_nodeClassRemove: any;
declare var scripts_nodeClassToggle: any;
declare var scripts_nodeFunctionCall: any;


declare var scripts_nodeFunctionCall: any;

declare var scripts_nodeTrigger: any;
declare var scripts_nodeSelectOption: any;
declare var scripts_nodeSelectTextRange: any;
declare var scripts_nodeFunctionCall: any;

declare var scripts_nodeRemove: any
declare var scripts_nodeAttribute: any;


declare var scripts_nodeMatchesSelector: any;
declare var scripts_nodeParent: any;
declare var scripts_nodeClosest: any;
declare var scripts_nodeChildren: any;
declare var scripts_nodeNext: any;

declare var scripts_waitForResourceCallback: any;

export type WebdriverQuerySync = Omit<WebdriverQuery, 'then' | 'resolve' | 'reject' | 'done' | 'fail'>;

export class WebdriverQuery extends IQuery<IElement, WebdriverQuery & { then: never}> {


    protected hasClassFn (node: IElement, name: string): Deferred<boolean> {
        return <any> node_eval(node, scripts_nodeClassHas, name);
    }
    protected addClassFn (node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassAdd, name);
    }
    protected removeClassFn(node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassRemove, name);
    }
    protected toggleClassFn(node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassToggle, name);
    }


    protected textGetFn (node: IElement): Deferred<string>  {
        return this.getField(node, 'textContent');
    }
    protected textSetFn (node: IElement, text: string): Deferred<void>  {
        return this.setField(node, 'textContent', text);
    }
    protected htmlOuterGetFn (node: IElement): Deferred<string>  {
        let driver = node_getDriver(node);
        if (driver === <any> node) {
            return driver.getPageSource() as any;
        }
        return this.getField(node, 'outerHTML');
    }
    protected htmlGetFn (node: IElement): Deferred<string>  {
        let driver = node_getDriver(node);
        if (driver === <any> node) {
            return driver.getPageSource() as any;
        }
        return this.getField(node, 'innerHTML');
    }
    protected htmlSetFn (node: IElement, text: string): Deferred<void>  {
        return this.setField(node, 'innerHTML', text);
    }
    protected appendFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node,
            'insertAdjacentHTML',
            'beforeend',
            html
        );
    }
    // protected async appendToFn (selector: string, node: IElement) {
    //     let $parent = await this.find(selector);
    //     let parent: IElement = $parent[0];
    //     if (parent != null) {
    //         await this.callField(
    //             parent,
    //             'appendChild',
    //             node
    //         );
    //     }
    // }
    protected prependFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node,
            'insertAdjacentHTML',
            'afterbegin',
            html
        );
    }
    protected beforeFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node,
            'insertAdjacentHTML',
            'beforebegin',
            html
        );
    }
    protected afterFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node,
            'insertAdjacentHTML',
            'afterend',
            html
        );
    }
    protected cssGet (node: IElement, prop: string): Promise<any> {
        return new Promise((resolve, reject) => {
            node.getCssValue(prop).then(resolve, reject);
        });
    }
    protected cssSet (node: IElement, css: { [key: string]: any }): Deferred<void> {
        return <any>  node_eval(node, scripts_nodeCss, css);
    }

    protected async heightGetFn (node: IElement): Promise<number> {
        return (await this.getBoundingClientRect(node)).height;
    }
    protected async widthGetFn (node: IElement): Promise<number> {
        return (await this.getBoundingClientRect(node)).width;
    }
    protected innerHeightFn (node: IElement): Promise<number> {
        return this.getField(node, 'offsetHeight');
    }
    protected innerWidthFn (node: IElement): Promise<number> {
        return  this.getField(node, 'offsetWidth');
    }
    protected getBoundingClientRect (node: IElement): Promise<{top: number, left: number, width: number, height: number}> {
        return <any> node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
    }
    protected async getPosition (node: IElement): Promise<{top: number, left: number}> {
        let dfrTop =  this.getField<number>(node, 'offsetTop');
        let dfrLeft = this.getField<number>(node, 'offsetLeft');

        let [ top, left ] = await Promise.all([dfrTop, dfrLeft]);
        return { top, left };
    }

    protected scrollTopGetFn (node: IElement): Promise<number> {
        return this.getField(node, 'scrollTop');
    }
    protected scrollTopSetFn (node: IElement, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollTop', scroll);
    }
    protected scrollLeftGetFn (node: IElement): Promise<number> {
        return this.getField(node, 'scrollLeft');
    }

    protected scrollLeftSetFn (node: IElement, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollLeft', scroll);
    }

    protected evalFn(node: IElement, mix: Function | string, ...args): Promise<any> {
        return <any> node_eval(node, mix, ...args);
    }

    //#region Events
    protected clickFn(node: IElement): Promise<void> {
        return node.click();
    }
    protected triggerFn(node: IElement, type: string, ...args): Promise<void> {
        return <any> node_eval(node, scripts_nodeTrigger, type, ...args);
    }

    protected selectFn(node: IElement, ...args): Promise<any> {
        return this.getField(node, 'tagName').then(name => {
            var fn = name === 'SELECT' ?
                scripts_nodeSelectOption :
                scripts_nodeSelectTextRange;

            return node_eval(node, fn, ...args);
        });
    }

    protected focusFn(node: IElement): Promise<void> {
        return this.callField(node, 'focus');
    }
    protected blurFn(node: IElement): Promise<void> {
        return this.callField(node, 'blur');
    }
    protected sendKeysFn(node: IElement, mix): Promise<void> {
        return node.sendKeys(mix);
    }

    protected typeFn(node: IElement, str: string): Promise<void> {
        var arr = Events.toSequance(str),
            fn = Events.getSequenceFunction(arr);
        return fn(node);
    }
    protected pressFn (node: IElement, str:string): Promise<void> {
        var key = Events.toCombination(str);
        return node.sendKeys(key);
    }
    //#endregion
    //#region Manipulate
    protected removeFn (node: IElement): Promise<void> {
        return <any> node_eval(node, scripts_nodeRemove);
    }
    //#endregion
    //#region Properties
    protected attrGetFn (node: IElement, prop: string): Promise<any> {
        return new Promise((resolve, reject) => {
            node.getAttribute(prop).then(resolve, reject);
        });
    }
    protected attrSetFn (node: IElement, attr: { [key: string]: any }): Deferred<void> {
        return <any> node_eval(node, scripts_nodeAttribute, attr);
    }

    protected valGetFn (node: IElement): Promise<any> {
        return this.getField(node, 'value')
    }
    protected valSetFn (node: IElement, value: any): Deferred<void> {
        return this.setField(node, 'value', value);
    }
    protected dataGetFn (node: IElement, key: string): Promise<any> {
        return <any> node_eval(node, scripts_nodeDataset, key);
    }
    protected dataSetFn (node: IElement, data: object): Deferred<void> {
        return <any> node_eval(node, scripts_nodeDataset, data);
    }
    protected propGetFn(node: IElement, key: string): Promise<any> {
        return <any> node_eval(node, scripts_nodeProperty, key);
    }
    protected propSetFn(node: IElement, data: object): Deferred<void> {
        return <any> node_eval(node, scripts_nodeProperty, data);
    }
    //#endregion

    protected findFn (node: IElement, selector: string): Deferred<IElement[]> {
        return new Promise((resolve, reject) => {
            node.findElements({ css: selector }).then(resolve, reject);
        }) as Deferred<IElement[]>;
    }

    protected matchesFn (node: IElement, selector: string): Promise<boolean> {
        return <any> node_eval(node, scripts_nodeMatchesSelector, selector);
    }

    protected parentFn (node: IElement): Deferred<IElement> {
        return <any> node_eval(node, scripts_nodeParent);
    }
    protected closestFn (node: IElement, sel: string): Promise<IElement> {
        return <any> node_eval(node, scripts_nodeClosest, sel);
    }
    protected childrenFn (node: IElement, sel?: string): Promise<IElement[]> {
        return <any> node_eval(node, scripts_nodeChildren, sel);
    }
    protected nextFn (node: IElement, sel?: string): Promise<IElement> {
        return <any> node_eval(node, scripts_nodeNext, sel);
    }

    protected getField<T>(node: IElement, field: string): Deferred<T> {
        return <any> node_eval(node, scripts_nodeProperty, field);
    }

    protected setField(node: IElement, obj: any): Deferred<void>;
    protected setField(node: IElement, field: string, val: any): Deferred<void>;
    protected setField(node: IElement, mix, val?): Deferred<void> {
        if (arguments.length === 2) {
            return <any> node_eval(node, scripts_nodeProperty, mix);
        }
        if (arguments.length === 3) {
            return <any> node_eval(node, scripts_nodeProperty, mix, val);
        }
        return null;
    }
    protected callField<T>(node: IElement, field: string, ...args): Deferred<T> {
        return <any> node_eval(
            node,
            scripts_nodeFunctionCall,
            field,
            ...args
        );
    }

    protected _onFn(node: IElement, type: string, cb: Function): Promise<any> {
        return WebdriverEventsPoll.addEventListener(node, type, cb);
    }
    protected _offFn(node: IElement, type: string, cb?: Function): Promise<any> {
        return WebdriverEventsPoll.removeEventListener(node, type, cb);
    }
    protected _onOnceFn(node: IElement, type: string, cb: Function): Promise<any> {
        const fn = async function (event) {
            await WebdriverEventsPoll.removeEventListener(node, type, fn);
            cb(event);
        };
        return WebdriverEventsPoll.addEventListener(node, type, fn);
    }

    //#region driver utils
    manage (): IDriverManager {
        let driver = driverPool.extractDriver(this);
        if (driver == null) {
            console.log(this);
            throw new Error(`Driver not found in set`)
        }
        return driver.manage();
    }
    waitForPageLoad (urlPattern?: string | RegExp): IQuery<any> {
        return waitForPageLoad(this, void 0, urlPattern);
    }
    waitForPageReady (urlPattern?: string | RegExp): IQuery<any> {
        return waitForPageLoad(this, 'interactive', urlPattern);
    }
    waitForElement (selector: string, opts?: IQueryWaitOptions<WebElement>): IQuery<IElement>
    waitForElement (selector: string, check?: IQueryConditionFn<WebElement>): IQuery<IElement>
    waitForElement (selector: string, mix?: IQueryWaitOptions<WebElement> | IQueryConditionFn<WebElement>): IQuery<IElement> {
        if (typeof mix === 'function') {
            mix = { check: mix };
        }
        return waitForElement(this, selector, mix);
    }
    waitForNoElement (selector: string, opts?: IQueryWaitOptions<WebElement>): IQuery<IElement>
    waitForNoElement (selector: string, check?: IQueryConditionFn<WebElement>): IQuery<IElement>
    waitForNoElement (selector: string, mix?: IQueryWaitOptions<WebElement> | IQueryConditionFn<WebElement>): IQuery<IElement> {
        if (typeof mix === 'function') {
            mix = { check: mix };
        }
        return waitForElement(this, selector, {
            ...(mix ?? {}),
            hidden: true,
        });
    }
    waitForResource (selector: string): IQuery<IElement>  {
        return driver_evalAsync(this, scripts_waitForResourceCallback, selector);
    }
    unlock () {
        Webdriver.unlockDriver(this);
    }
    getDriver () {
        return driverPool.extractDriver(this);
    }
    async createFormData (): Promise<WebdriverFormData> {
        return WebdriverFormData.create(this);
    }
    //#endregion driver utils

    static FormData = FormDataBase

    static build(config: IBuildConfig, setts?: ISettings): IQuery<any> {
        return Webdriver.build(config, setts);
    }
    static load(url: string, config: IJsdomBuildConfig, setts?: ISettings): JsdomQuery
    static load(url: string, config: ICheerioBuildConfig, setts?: ISettings): CherrioQuery
    static load(url: string, config?: IWebdriverBuildConfig, setts?: ISettings): WebdriverQuery
    static load(url: string, config: IBuildConfig = DefaultConfig, setts?: ISettings): IQuery<any, any> {
        if (config.name === 'jsdom') {
            return JsdomDriver.load(url, config, setts);
        }
        if (config.name === 'cheerio') {
            return CheerioDriver.load(url, config, setts);
        }
        return Webdriver.load(url, config, setts);
    }

    static fetch<T = any | WebdriverQuery>(url: string, config: ILoadConfig & { baseUrl?: string } = DefaultConfig, setts?: ISettings): Promise<{
        status: number
        headers: { [lowerCased: string]: string },
        data: T
    }> {
        switch (config.name?.toLowerCase()) {
            case 'jsdom':
                return  JsdomDriver.fetch(url, config, setts);
            case 'cheerio':
                return  CheerioDriver.fetch(url, config, setts);
            default:
                return Webdriver.fetch<T>(url, config, setts);
        }
    }
    static setDriver (driver: IDriver ) {
        driverPool.setGlobal(driver);
    }
    static async getDriver (config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
        let wrapper = await driverPool.get('', config, setts);
        return wrapper.driver;
    }
    static unlockDriver (mix) {
        Webdriver.unlockDriver(mix);
    }

    static newAsync (mix?, parent?: IQuery<IElement>) {
        let query = new WebdriverQuery(mix);
        query.ctx.owner = parent;
        (query as any).then = query.ctx.thener;
        return query;
    }

    static cheerio = CheerioDriver
    static jsdom = JsdomDriver
    static network = NetworkDriver

    static pseudo = SelectorsEx.pseudoFns
}



namespace Events {

    // https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html

    const Key = refs.Key;
    const aliases = {
        'ctrl': 'control',
        'backspace': 'back_space',
        'esc': 'escape',
        'left': 'arrow_left',
        'right': 'arrow_right',
        'up': 'arrow_up',
        'down': 'arrow_down',
    };

    export function toSequance(str) {
        var delimiter = '_%%%%%%_';
        str = str.replace(/\{([\w_]+)\}/g, function (full, name) {
            var key = (aliases[name] || name).toUpperCase();
            if (key in Key === false) {
                return full;
            }
            return delimiter + key + delimiter;
        });
        var parts = str.split(delimiter);

        return parts.map((str, i) => {
            if (i % 2 === 0) {
                return str;
            }
            return Key[str];
        });
    }
    export function toCombination(str) {
        var keys = str.split('+');
        keys.forEach((x, i) => {
            if (x === '') {
                keys[i] = '+';
                return;
            }
            if (isSpecial(x)) {
                keys[i] = getSpecial(x);
                return;
            }
        });
        if (keys.length === 0) {
            return keys[0];
        }
        return Key.chord(...keys);
    };

    function getSpecial(name) {
        var key = (aliases[name] || name).toUpperCase();
        return Key[key];
    }
    function isSpecial(name: string) {
        var key = (aliases[name] || name).toUpperCase();
        return key in Key;
    }
    export function getSequenceFunction(arr: string[]) {
        return async function (node) {
            for (let str of arr) {
                await node.sendKeys(str)
            }
        };
    }

}
