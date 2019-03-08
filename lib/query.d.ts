// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../../atma-utils

declare module 'selenium-query' {
    import { WebdriverQuery } from 'selenium-query/webdriver/WebdriverQuery';
    class SQuery extends WebdriverQuery {
        static default: typeof SQuery;
    }
    export = SQuery;
}

declare module 'selenium-query/webdriver/WebdriverQuery' {
    import { IElement, IDriver, IDriverManager } from 'selenium-query/common/IDriver';
    import { Deferred } from 'selenium-query/types/Deferred';
    import { IQuery } from 'selenium-query/common/IQuery';
    import { IBuildConfig, ISettings } from 'selenium-query/common/IConfig';
    export class WebdriverQuery extends IQuery<IElement> {
        hasClassFn(node: IElement, name: string): Deferred<boolean>;
        addClassFn(node: IElement, name: string): Deferred<void>;
        removeClassFn(node: IElement, name: string): Deferred<void>;
        toggleClassFn(node: IElement, name: string): Deferred<void>;
        textGetFn(node: IElement): Deferred<string>;
        textSetFn(node: IElement, text: string): Deferred<void>;
        htmlGetFn(node: IElement): Deferred<string>;
        htmlSetFn(node: IElement, text: string): Deferred<void>;
        appendFn(node: IElement, html: string): Deferred<void>;
        prependFn(node: IElement, html: string): Deferred<void>;
        beforeFn(node: IElement, html: string): Deferred<void>;
        afterFn(node: IElement, html: string): Deferred<void>;
        cssGet(node: IElement, prop: string): Promise<any>;
        cssSet(node: IElement, css: {
            [key: string]: any;
        }): Deferred<void>;
        heightGetFn(node: IElement): Promise<number>;
        widthGetFn(node: IElement): Promise<number>;
        innerHeightFn(node: IElement): Promise<number>;
        innerWidthFn(node: IElement): Promise<number>;
        getBoundingClientRect(node: IElement): Promise<{
            top: number;
            left: number;
            width: number;
            height: number;
        }>;
        getPosition(node: IElement): Promise<{
            top: number;
            left: number;
        }>;
        scrollTopGetFn(node: IElement): Promise<number>;
        scrollTopSetFn(node: IElement, scroll: number): Deferred<void>;
        scrollLeftGetFn(node: IElement): Promise<number>;
        scrollLeftSetFn(node: IElement, scroll: number): Deferred<void>;
        evalFn(node: IElement, mix: Function | string, ...args: any[]): Promise<any>;
        clickFn(node: IElement): Promise<void>;
        triggerFn(node: IElement, type: string, ...args: any[]): Promise<void>;
        selectFn(node: IElement, ...args: any[]): Promise<any>;
        focusFn(node: IElement): Promise<void>;
        blurFn(node: IElement): Promise<void>;
        sendKeysFn(node: IElement, mix: any): Promise<void>;
        typeFn(node: IElement, str: string): Promise<void>;
        pressFn(node: IElement, str: string): Promise<void>;
        removeFn(node: IElement): Promise<void>;
        attrGetFn(node: IElement, prop: string): Promise<any>;
        attrSetFn(node: IElement, attr: {
            [key: string]: any;
        }): Deferred<void>;
        valGetFn(node: IElement): Promise<any>;
        valSetFn(node: IElement, value: any): Deferred<void>;
        dataGetFn(node: IElement, key: string): Promise<any>;
        dataSetFn(node: IElement, data: object): Deferred<void>;
        protected propGetFn(node: IElement, key: string): Promise<any>;
        protected propSetFn(node: IElement, data: object): Deferred<void>;
        findFn(node: IElement, selector: string): Deferred<IElement[]>;
        matchesFn(node: IElement, selector: string): Promise<boolean>;
        parentFn(node: IElement): Deferred<IElement>;
        closestFn(node: IElement, sel: string): Promise<IElement>;
        childrenFn(node: IElement, sel?: string): Promise<IElement[]>;
        nextFn(node: IElement, sel?: string): Promise<IElement>;
        protected getField<T>(node: IElement, field: string): Deferred<T>;
        protected setField(node: IElement, obj: any): Deferred<void>;
        protected setField(node: IElement, field: string, val: any): Deferred<void>;
        protected callField<T>(node: IElement, field: string, ...args: any[]): Deferred<T>;
        manage(): IDriverManager;
        waitForPageLoad(): IQuery<any>;
        waitForElement(selector: string): IQuery<any>;
        unlock(): void;
        static build(config: IBuildConfig, setts?: ISettings): Promise<IDriver>;
        static load(url: string, config?: IBuildConfig, setts?: ISettings): IQuery<any>;
        static fetch(url: string, config?: IBuildConfig, setts?: ISettings): Promise<{}>;
        static setDriver(driver: IDriver): void;
        static getDriver(config: IBuildConfig, setts?: ISettings): Promise<IDriver>;
        static unlockDriver(mix: any): void;
        static newAsync(mix?: any, parent?: IQuery<IElement>): WebdriverQuery;
        static cheerio: import("../src/common/IQueryStatics").IQueryStatics;
        static jsdom: import("../src/common/IQueryStatics").IQueryStatics;
        static network: {
            isCached(url: string, config?: import("../src/common/IConfig").ILoadConfig): boolean;
            isCachedAsync(url: string, config?: import("../src/common/IConfig").ILoadConfig): Promise<boolean>;
            clearCookies(): void;
            load(url: string, config?: import("../src/common/IConfig").ILoadConfig): Promise<import("../src/fetch/NetworkDriver").NetworkResponse>;
        };
    }
}

declare module 'selenium-query/common/IDriver' {
    export interface IDriver {
        executeScript<T>(script: string, ...var_args: any[]): Promise<T>;
        executeAsyncScript<T>(script: string, ...var_args: any[]): Promise<T>;
        get(url: string): Promise<any>;
        getCurrentUrl(): Promise<string>;
        manage(): IDriverManager;
    }
    export interface IDriverManager {
        addCookie(cookie: any): Promise<void>;
    }
    export interface IThenableDriver extends Promise<any>, IDriver {
    }
    export interface IElement {
        getDriver(): IDriver;
        sendKeys(str: string): any;
        click(): Promise<void>;
        getCssValue(name: string): Promise<any>;
        getAttribute(name: string): Promise<any>;
        findElements({ css: string }: {
            css: any;
        }): any;
    }
}

declare module 'selenium-query/types/Deferred' {
    export interface Deferred<T> extends Promise<T> {
        done(cb: (x: T) => void | any): this;
        fail(cb: (error: Error) => void | any): this;
    }
}

declare module 'selenium-query/common/IQuery' {
    import { class_Dfr } from 'atma-utils';
    import { Deferred } from 'selenium-query/types/Deferred';
    export class IQueryCtx {
        owner: IQuery<any>;
        self: IQuery<any>;
        thener: (resolve: any, reject: any) => IQuery<any>;
        Ctor: new (mix?: any) => IQuery<any>;
        newSync(arr?: any, parent?: IQuery<any>): IQuery<any>;
        newAsync(arr?: any, parent?: IQuery<any>): IQuery<any>;
    }
    export abstract class IQuery<TElement> extends class_Dfr implements PromiseLike<any> {
        [index: number]: TElement;
        length: number;
        ctx: IQueryCtx;
        constructor(mix?: any);
        ensureSync(): IQuery<TElement>;
        ensureAsync(): IQuery<TElement>;
        resolve(...args: any[]): this;
        hasClass(name: string): PromiseLike<boolean>;
        protected abstract hasClassFn(node: TElement, name: string): Deferred<boolean>;
        addClass(name: string): any;
        protected abstract addClassFn(node: TElement, name: string): Deferred<void>;
        removeClass(name: string): IQuery<TElement>;
        protected abstract removeClassFn(node: TElement, name: string): Deferred<void>;
        toggleClass(name: string): IQuery<TElement>;
        protected abstract toggleClassFn(node: TElement, name: string): Deferred<void>;
        add(mix: any): any;
        eq(index: any): IQuery<any>;
        slice(start?: number, end?: number): IQuery<any>;
        each(fn: any): IQuery<any>;
        map(fn: any): any;
        toArray(): Deferred<{}>;
        text(): PromiseLike<string>;
        text(str: string): IQuery<TElement>;
        protected abstract textGetFn(node: TElement): Deferred<string>;
        protected abstract textSetFn(node: TElement, text: string): Deferred<void>;
        html(): PromiseLike<string>;
        html(str: string): IQuery<TElement>;
        protected abstract htmlGetFn(node: TElement): Deferred<string>;
        protected abstract htmlSetFn(node: TElement, text: string): Deferred<void>;
        append(html: string): IQuery<TElement>;
        protected abstract appendFn(node: TElement, html: string): Deferred<void>;
        prepend(html: string): any;
        protected abstract prependFn(node: TElement, html: string): Deferred<void>;
        before(html: string): any;
        protected abstract beforeFn(node: TElement, html: string): Deferred<void>;
        after(html: string): any;
        protected abstract afterFn(node: TElement, html: string): Deferred<void>;
        css(cssObj: {
            [key: string]: any;
        }): IQuery<TElement>;
        css(key: string, val: any): IQuery<TElement>;
        css(key: string): Promise<any>;
        protected abstract cssGet(node: TElement, prop: string): Promise<any>;
        protected abstract cssSet(node: TElement, css: {
            [key: string]: any;
        }): Deferred<void>;
        height(): Promise<number>;
        height(val: any): IQuery<TElement>;
        protected abstract heightGetFn(node: TElement): Promise<number>;
        innerHeight(): PromiseLike<number>;
        protected abstract innerHeightFn(node: TElement): Promise<number>;
        width(): Promise<number>;
        width(val: any): IQuery<TElement>;
        protected abstract widthGetFn(node: TElement): Promise<number>;
        innerWidth(): PromiseLike<number>;
        protected abstract innerWidthFn(node: TElement): Promise<number>;
        offset(): Promise<{
            top: number;
            left: number;
        }>;
        protected abstract getBoundingClientRect(node: TElement): Promise<{
            top: number;
            left: number;
            width: number;
            height: number;
        }>;
        position(): Promise<{
            top: number;
            left: number;
        }>;
        protected abstract getPosition(node: TElement): Promise<{
            top: number;
            left: number;
        }>;
        scrollTop(): Promise<number>;
        scrollTop(scroll: number): IQuery<TElement>;
        protected abstract scrollTopGetFn(node: TElement): Promise<number>;
        protected abstract scrollTopSetFn(node: TElement, scroll: number): Deferred<void>;
        scrollLeft(): Promise<number>;
        scrollLeft(scroll: number): IQuery<TElement>;
        protected abstract scrollLeftGetFn(node: TElement): Promise<number>;
        protected abstract scrollLeftSetFn(node: TElement, scroll: number): Deferred<void>;
        eval(mix: Function | string, ...args: any[]): Promise<any>;
        protected abstract evalFn(node: TElement, mix: Function | string, ...args: any[]): Promise<any>;
        click(): IQuery<TElement>;
        protected abstract clickFn(node: TElement): Promise<void>;
        trigger(type: any, ...args: any[]): IQuery<TElement>;
        protected abstract triggerFn(node: TElement, type: string, ...args: any[]): Promise<void>;
        select(...args: any[]): IQuery<TElement>;
        protected abstract selectFn(node: TElement, ...args: any[]): Promise<void>;
        focus(): IQuery<TElement>;
        protected abstract focusFn(node: TElement): Promise<void>;
        blur(): IQuery<TElement>;
        protected abstract blurFn(node: TElement): Promise<void>;
        sendKeys(mix: any): IQuery<TElement>;
        protected abstract sendKeysFn(node: TElement, mix: any): Promise<void>;
        type(str: any): IQuery<TElement>;
        protected abstract typeFn(node: TElement, str: string): Promise<void>;
        press(str: any): IQuery<TElement>;
        protected abstract pressFn(node: TElement, str: string): Promise<void>;
        remove(): IQuery<TElement>;
        protected abstract removeFn(node: TElement): Promise<void>;
        attr(name: string): Promise<any>;
        attr(vals: {
            [key: string]: any;
        }): IQuery<TElement>;
        attr(key: string, val: any): IQuery<TElement>;
        protected abstract attrGetFn(node: TElement, prop: string): Promise<any>;
        protected abstract attrSetFn(node: TElement, attr: {
            [key: string]: any;
        }): Deferred<void>;
        val(): PromiseLike<any>;
        val(val: any): IQuery<TElement>;
        protected abstract valGetFn(node: TElement): Promise<any>;
        protected abstract valSetFn(node: TElement, value: any): Deferred<void>;
        data(key: string): PromiseLike<any>;
        data(key: string, val: any): IQuery<TElement>;
        data(dataObj: {
            [key: string]: any;
        }): IQuery<TElement>;
        protected abstract dataGetFn(node: TElement, key: string): Promise<any>;
        protected abstract dataSetFn(node: TElement, data: object): Deferred<void>;
        prop(key: string): PromiseLike<any>;
        prop(key: string, val: any): IQuery<TElement>;
        prop(obj: {
            [key: string]: any;
        }): IQuery<TElement>;
        protected abstract propGetFn(node: TElement, key: string): Promise<any>;
        protected abstract propSetFn(node: TElement, data: object): Deferred<void>;
        find(sel: string): IQuery<TElement>;
        protected abstract findFn(node: TElement, selector: string): Deferred<TElement[]>;
        filter(fn: (node: TElement) => boolean | Promise<boolean>): IQuery<TElement>;
        filter(sel: string): IQuery<TElement>;
        protected abstract matchesFn(node: TElement, selector: string): Promise<boolean>;
        parent(): IQuery<TElement>;
        protected abstract parentFn(node: TElement): Promise<TElement>;
        closest(sel: string): IQuery<TElement>;
        protected abstract closestFn(node: TElement, sel: string): Promise<TElement>;
        children(sel?: string): IQuery<TElement>;
        protected abstract childrenFn(node: TElement, sel?: string): Promise<TElement[]>;
        next(sel: string): IQuery<TElement>;
        protected abstract nextFn(node: TElement, sel?: string): Promise<TElement>;
        protected abstract getField<T>(node: TElement, field: string): Deferred<T>;
        protected abstract setField(node: TElement, obj: any): Deferred<void>;
        protected abstract setField(node: TElement, field: string, val: any): Deferred<void>;
        protected abstract callField<T>(node: TElement, field: string, ...args: any[]): Deferred<T>;
    }
}

declare module 'selenium-query/common/IConfig' {
    import { IQuery } from "selenium-query/common/IQuery";
    export interface IBuildConfig {
        name?: string;
        args?: string[];
        binaryPath?: string;
        applyOptions?(builder: any, options: any): any;
        setOptions?(builder: any, options: any): any;
        setArguments?(options: any): any;
        setBinaryPath?(options: any): any;
        setLogging?(options: any): any;
        headers?: {
            [name: string]: string;
        };
        method?: 'post' | 'get' | 'delete' | 'patch' | 'head' | string;
        query?: {
            [name: string]: string;
        };
        body?: string | Buffer;
        cookies?: {
            [name: string]: string;
        } | string[] | string;
        cache?: boolean | {
            folder?: string;
            maxAge?: number;
            compress?: boolean;
        };
        cacheQueryIgnore?: string[];
        /** Webdriver will load this url, or requested url, to set the cookies first */
        cookieOrigin?: string;
        [key: string]: any;
    }
    export interface ILoadConfig extends IBuildConfig {
        retryCount?: number;
        retryTimeout?: number;
    }
    export interface ISettings {
        pool?: boolean | number;
        query?: IQuery<any>;
        opts?: any;
    }
}

