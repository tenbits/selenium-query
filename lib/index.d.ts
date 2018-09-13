// Generated by dts-bundle v0.7.3
// Dependencies for this module:
//   ../atma-utils

declare module 'selenium-query' {
    import { SQuery } from 'selenium-query/SQuery';
    export = SQuery;
}

declare module 'selenium-query/SQuery' {
    import { class_Dfr } from 'atma-utils';
    import { IBuildConfig } from 'selenium-query/static/build';
    import { IDriver } from 'selenium-query/IDriver';
    export interface IArray {
        length: number;
        [index: number]: any;
    }
    export class SQuery extends class_Dfr implements IArray {
        [index: number]: any;
        length: number;
        constructor(mix?: any);
        hasClass(name: string): PromiseLike<boolean>;
        addClass(name: string): SQuery;
        removeClass(name: string): SQuery;
        toggleClass(name: string): SQuery;
        add(mix: any): any;
        eq(index: any): SQuery;
        slice(start?: number, end?: any): SQuery;
        each(fn: any): SQuery;
        map(fn: any): SQuery;
        toArray(): class_Dfr;
        text(): PromiseLike<string>;
        text(str: string): SQuery;
        html(): PromiseLike<string>;
        html(str: string): SQuery;
        append(html: string): SQuery;
        prepend(html: string): SQuery;
        before(html: string): SQuery;
        after(html: string): SQuery;
        css(cssObj: {
            [key: string]: any;
        }): SQuery;
        css(key: string, val: any): SQuery;
        css(key: string): PromiseLike<any>;
        height(): PromiseLike<number>;
        height(val: any): SQuery;
        innerHeight(): PromiseLike<number>;
        width(): PromiseLike<number>;
        width(val: any): SQuery;
        innerWidth(): PromiseLike<number>;
        offset(): Promise<{
            top: number;
            left: number;
        }>;
        position(): Promise<{
            top: number;
            left: number;
        }>;
        scrollTop(...args: any[]): class_Dfr;
        scrollLeft(...args: any[]): class_Dfr;
        eval(mix: Function | string, ...args: any[]): class_Dfr;
        click(): SQuery;
        trigger(type: any, ...args: any[]): SQuery;
        select(...args: any[]): SQuery;
        focus(): SQuery;
        blur(): SQuery;
        sendKeys(mix: any): SQuery;
        type(str: any): SQuery;
        press(str: any): SQuery;
        remove(): SQuery;
        attr(mix: any, val?: any): class_Dfr;
        val(val?: any): class_Dfr;
        data(key: any, val?: any): class_Dfr;
        prop(key: any, val?: any): class_Dfr;
        find(sel: any): SQuery;
        filter(sel: any): SQuery;
        parent(): SQuery;
        closest(sel: any): SQuery;
        children(sel: any): SQuery;
        next(sel: any): SQuery;
        static build(config: IBuildConfig): IDriver;
        static load(url: string, config: IBuildConfig): SQuery;
        static setDriver(driver: IDriver): void;
        static getDriver(): IDriver;
    }
}

declare module 'selenium-query/static/build' {
    import { IDriver } from "selenium-query/IDriver";
    import { SQuery } from 'selenium-query/SQuery';
    export interface IBuildConfig {
        name: string;
        args?: string[];
        binaryPath?: string;
        applyOptions?(builder: any, options: any): any;
        setOptions?(builder: any, options: any): any;
        setArguments?(options: any): any;
        setBinaryPath?(options: any): any;
        setLogging?(options: any): any;
        [key: string]: any;
    }
    export const BuildStatics: {
        build(config: IBuildConfig): IDriver;
        load(url: string, config: IBuildConfig): SQuery;
    };
}

declare module 'selenium-query/IDriver' {
    export interface IDriver extends PromiseLike<IDriver> {
        executeScript<T>(script: string, ...var_args: any[]): Promise<T>;
        get(url: string): IDriver;
    }
    export interface IElement {
        getDriver(): IDriver;
        sendKeys(str: string): any;
        click(): Promise<void>;
    }
}

