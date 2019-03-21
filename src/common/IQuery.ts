import { 
	async_each, 
	async_getValueOf, 
	async_next, 
	async_waterfall, 
	async_map, 
	async_aggr, 
	async_traverse, 
	async_filter } from '../utils/async'

import { class_Dfr, is_ArrayLike } from 'atma-utils';
import { dfr_run } from '../utils/dfr';
import { each } from '../utils/arr';


import { Deferred } from '../types/Deferred';


export class IQueryCtx {
	owner: IQuery<any>
    self: IQuery<any>
    source: any
	thener: (resolve, reject) => IQuery<any>
	Ctor: new (mix?) => IQuery<any>
	
	newSync (arr?: any, parent?: IQuery<any>) {
		let query = new this.Ctor(arr);
		query.ctx.owner = parent;
		return query;
	}
	newAsync (arr?: any, parent?: IQuery<any>) {
		let query = new this.Ctor(arr);
		query.ctx.owner = parent;
		query.then = query.ctx.thener;
		return query;
	}
}

export abstract class IQuery<TElement> extends class_Dfr implements PromiseLike<any> {
	[index: number]: TElement;
	length: number = 0
	
	ctx: IQueryCtx
	
	constructor (mix?) {
        super();

		this.ctx = new IQueryCtx;
		this.ctx.self = this;
		this.ctx.thener = this.then;
		this.ctx.Ctor = <any> this.constructor;

        this.ensureSync();
		this.add(mix);

		if (mix != null) {
			this.resolve(this);
		}
    }
    
    ensureSync(): IQuery<TElement> {
		this.then = null;
		return this;
    }
    ensureAsync(): IQuery<TElement> {
		if (this.then != null) {
			return this;
		}
		return this.ctx.newAsync(this, this);
	}	
	resolve (...args) {
		if (args.length !== 0) {
			let x = args[0];
			if (x.then != null && x instanceof IQuery) {
				let q = new x.ctx.Ctor(x);
				args[0] = q;
			}
		}			
		return super.resolve(...args);
	}


	//#region CssClass
	hasClass(name: string): PromiseLike<boolean> {
		return Arr.mapFirst(this, node => this.hasClassFn(node, name));
    }
    protected abstract hasClassFn (node: TElement, name: string): Deferred<boolean>;

	addClass(name: string) {
        return Arr.mutate(this, node => this.addClassFn(node, name));		
	}
    protected abstract addClassFn (node: TElement, name: string): Deferred<void>;

    removeClass(name: string):IQuery<TElement> {
        return Arr.mutate(this, node => this.removeClassFn(node, name));
    }
    protected abstract removeClassFn(node: TElement, name: string): Deferred<void>;

	toggleClass(name: string): IQuery<TElement>{
		return Arr.mutate(this, node => this.toggleClassFn(node, name));
    }
    protected abstract toggleClassFn(node: TElement, name: string): Deferred<void>;
	//#endregion CssClass

	//#region Collection
	add(mix) {
		if (mix == null) {
			return this;
		}
		if (is_ArrayLike(mix) === true) {
			return each(mix, this.add, this);
		}
		this[this.length++] = mix;
		return this;
	}
	eq(index) {
		return async_next(this, ($, source) => {
			if (index < source.length) {
				$.add(source[index]);
			}
		});
	}
	slice(start:number = 0, end?: number) {
		return async_next(this, ($, source) => {
			var i = start;
			if (end > source.length) {
				end = source.length;
			}
			if (i < end) {
				for (; i < end; i++) {
					$.add(source[i]);
				}
			}
		});
	}
	each(fn) {
		return async_next(this, ($, source) => {
			return async_waterfall(source, (node, i) => {
				$.add(node);
				return fn(node, i);
			})
		});
	}
	map(fn) {
		return async_map(this, fn);
	}
	toArray() {
		return dfr_run(resolve => {
			this.ensureAsync().done($ => {
				var arr = Array.prototype.slice.call($);
				resolve(arr);
			});
		})
	}
	//#endregion Collection

	//#region Content
	text(): PromiseLike<string>;
	text(str: string): IQuery<TElement>;
	text(str?: string) {
		if (typeof str === 'undefined') {
			return async_aggr('', this, (accum, node) => {
				return this.textGetFn(node).then(val => accum + val)
			}) as PromiseLike<string>;
		}
		return <IQuery<TElement>><any>async_each(this, ($, node) => {
            return this
                .textSetFn(node, str)
                .done(() => $.add(node));
		});
    }
    protected abstract textGetFn (node: TElement): Deferred<string>;
    protected abstract textSetFn (node: TElement, text: string): Deferred<void>;

	html(): PromiseLike<string>;
	html(str: string): IQuery<TElement>;
	html(str?: string) {
		if (typeof str === 'undefined') {
			return async_aggr('', this, (accum, node) => {
				return this.htmlGetFn(node).then(val => accum + val)
			}) as PromiseLike<string>;
		}
		return <IQuery<TElement>><any>async_each(this, ($, node) => {
            return this
                .htmlSetFn(node, str)
				.done(() => $.add(node));
		});
    }
    protected abstract htmlGetFn (node: TElement): Deferred<string>;
    protected abstract htmlSetFn (node: TElement, text: string): Deferred<void>;

	append(html: string): IQuery<TElement>{
		return Arr.mutate(this, node => {
			return this.appendFn(node, html)
		});
    }
    protected abstract appendFn (node: TElement, html: string): Deferred<void>;

	prepend(html: string) {
        return Arr.mutate(this, node => this.prependFn(node, html));
    }
    protected abstract prependFn (node: TElement, html: string): Deferred<void>;

	before(html: string) {
        return Arr.mutate(this, node => this.beforeFn(node, html));
    }
    protected abstract beforeFn (node: TElement, html: string): Deferred<void>;

	after(html: string) {
		return Arr.mutate(this, node => this.afterFn(node, html));
    }
    protected abstract afterFn (node: TElement, html: string): Deferred<void>;
	//#endregion Content

	//#region Css
	css(cssObj: { [key: string]: any }): IQuery<TElement>;
	css(key: string, val: any): IQuery<TElement>;
	css(key: string): Promise<any>;
	css(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.cssGet(node, mix));		
        }
        let css = arguments.length === 1 ? mix : { [mix]: val };
        return Arr.mutate(this, node => this.cssSet(node, css));
    }
    protected abstract cssGet (node: TElement, prop: string): Promise<any>
    protected abstract cssSet (node: TElement, css: { [key: string]: any }): Deferred<void>

	height(): Promise<number>;
	height(val): IQuery<TElement>;
	height(val?) {
		if (val == null) {
            return Arr.mapFirst(this, node => this.heightGetFn(node));
		}
		return this.css('height', val);
    }
    protected abstract heightGetFn (node: TElement): Promise<number>
    
	innerHeight(): PromiseLike<number> {
        return Arr.mapFirst(this, node => this.innerHeightFn(node));
    }
    protected abstract innerHeightFn (node: TElement): Promise<number>

	width(): Promise<number>;
	width(val): IQuery<TElement>
	width(val = null) {
        if (val == null) {
            return Arr.mapFirst(this, node => this.widthGetFn(node));
		}
        return this.css('width', val);		
    }
    protected abstract widthGetFn (node: TElement): Promise<number>

	innerWidth(): PromiseLike<number> {
        return Arr.mapFirst(this, node => this.innerWidthFn(node));		
    }
    protected abstract innerWidthFn (node: TElement): Promise<number>

	offset(): Promise<{ top: number, left: number }> {
		return Arr.mapFirst(this, node => this.getBoundingClientRect(node));
    }
    protected abstract getBoundingClientRect (node: TElement): Promise<{top: number, left: number, width: number, height: number}>
    
	position(): Promise<{ top: number, left: number }> {
        return Arr.mapFirst(this, node => this.getPosition(node));		
    }
    protected abstract getPosition (node: TElement): Promise<{top: number, left: number}>;
    
    scrollTop():Promise<number>;
    scrollTop(scroll: number): IQuery<TElement>;
    scrollTop(mix?: number) {
        
        if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.scrollTopGetFn(node));
        }
        return Arr.mutate(this, node => this.scrollTopSetFn(node, mix));
    }
    protected abstract scrollTopGetFn (node: TElement): Promise<number>;
    protected abstract scrollTopSetFn (node: TElement, scroll: number): Deferred<void>;

	scrollLeft():Promise<number>;
    scrollLeft(scroll: number): IQuery<TElement>;
    scrollLeft(mix?: number) {
        if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.scrollLeftGetFn(node));
        }
        return Arr.mutate(this, node => this.scrollLeftSetFn(node, mix));		
    }
    protected abstract scrollLeftGetFn (node: TElement): Promise<number>;
    protected abstract scrollLeftSetFn (node: TElement, scroll: number): Deferred<void>;

	//#endregion

	//#region driver
	eval(mix: Function | string, ...args): Promise<any> {
        return Arr.mapFirst(this, node => this.evalFn(node, mix, ...args));
    }
    protected abstract evalFn (node: TElement, mix: Function | string, ...args): Promise<any>
	//#endregion

	//#region Events
	click(): IQuery<TElement>{
        return Arr.mutate(this, node => this.clickFn(node));
    }
    protected abstract clickFn(node: TElement): Promise<void>

	trigger(type, ...args): IQuery<TElement>{
        return Arr.mutate(this, node => this.triggerFn(node, type, ...args));
    }
    protected abstract triggerFn(node: TElement, type: string, ...args): Promise<void>

	select(...args): IQuery<TElement>{        
        return Arr.mutate(this, node => this.selectFn(node, ...args));		
    }
    protected abstract selectFn(node: TElement, ...args): Promise<void>

	focus(): IQuery<TElement>{
        return Arr.mutate(this, node => this.focusFn(node));
    }
    protected abstract focusFn(node: TElement): Promise<void>
    
    blur(): IQuery<TElement>{
		return Arr.mutate(this, node => this.blurFn(node));
    }
    protected abstract blurFn(node: TElement): Promise<void>

	sendKeys(mix): IQuery<TElement>{
        return Arr.mutate(this, node => this.sendKeysFn(node, mix));
    }
    protected abstract sendKeysFn(node: TElement, mix): Promise<void>

	type(str): IQuery<TElement>{
		return Arr.mutate(this, node => this.typeFn(node, str));
    }
    protected abstract typeFn(node: TElement, str: string): Promise<void>

	press(str): IQuery<TElement>{
        return Arr.mutate(this, node => this.pressFn(node, str));
    }
    protected abstract pressFn(node: TElement, str: string): Promise<void>

	//#endregion
	//#region Manipulate
	remove(): IQuery<TElement>{
        return Arr.mutate(this, node => this.removeFn(node));
    }
    protected abstract removeFn(node: TElement): Promise<void>
    
	//#endregion
	//#region Properties
	attr(name: string): Promise<any>
    attr(vals: { [key: string] : any }): IQuery<TElement>
    attr(key: string, val: any): IQuery<TElement>
	attr(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return Arr.mapFirst(this, node => this.attrGetFn(node, mix));
        }

        let attr = arguments.length === 2 ? {[mix]: val} : mix;
        return Arr.mutate(this, node => this.attrSetFn(node, attr))
    }
    protected abstract attrGetFn (node: TElement, prop: string): Promise<any>
    protected abstract attrSetFn (node: TElement, attr: { [key: string]: any }): Deferred<void>

    
	val(): PromiseLike<any>
	val(val: any): IQuery<TElement>
	val(val?) {
		if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.valGetFn(node))			
		}
		return Arr.mutate(this, node => this.valSetFn(node, val));
    }
    protected abstract valGetFn (node: TElement): Promise<any>
    protected abstract valSetFn (node: TElement, value: any): Deferred<void>

	data(key: string): PromiseLike<any>;
    data(key: string, val: any): IQuery<TElement>
    data(dataObj: { [key: string]: any }): IQuery<TElement>
	data(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return Arr.mapFirst(this, node => this.dataGetFn(node, mix));
        }
        let data = arguments.length === 2 ? { [mix]: val } : mix;
		return Arr.mutate(this, node => this.dataSetFn(node, data));
    }
    protected abstract dataGetFn (node: TElement, key: string): Promise<any>
    protected abstract dataSetFn (node: TElement, data: object): Deferred<void>


	prop(key: string): PromiseLike<any>;
    prop(key: string, val: any): IQuery<TElement>	
    prop(obj: { [key: string]: any }): IQuery<TElement>	
	prop(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.getField(node, mix));			
        }
        
        let obj = arguments.length === 2 ? { [mix]: val } : mix;
        return Arr.mutate(this, node => this.setField(node, obj));
    }
    protected abstract propGetFn (node: TElement, key: string): Promise<any>
    protected abstract propSetFn (node: TElement, data: object): Deferred<void>


	//#endregion
	//#region Traverse
	find(sel: string): IQuery<TElement>{
		return async_traverse(this, (node: TElement) => this.findFn(node, sel));
    }
    protected abstract findFn (node: TElement, selector: string): Deferred<TElement[]>

	filter(fn: (node: TElement) => boolean | Promise<boolean>): IQuery<TElement>;
	filter(sel: string): IQuery<TElement>;
	filter(mix): IQuery<TElement>{
		if (typeof mix === 'string') {
            let selector = mix;
            return async_filter(this, $single => this.matchesFn($single[0], selector));
        }
        let fn = mix;
		return async_filter(this, fn);
    }
    protected abstract matchesFn (node: TElement, selector: string): Promise<boolean>;

	parent(): IQuery<TElement>{
		return async_traverse(this, node => {
			return this.parentFn(node);
		});
    }
    protected abstract parentFn (node: TElement): Promise<TElement>;

	closest(sel: string): IQuery<TElement>{
		return async_traverse(this, node => {
			return this.closestFn(node, sel);
		});
    }
    protected abstract closestFn (node: TElement, sel: string): Promise<TElement>;

	children(sel?: string): IQuery<TElement>{
		return async_traverse(this, node => {
			return this.childrenFn(node, sel);
		});
    }
    protected abstract childrenFn (node: TElement, sel?: string): Promise<TElement[]>;

	next(sel: string): IQuery<TElement>{
		return async_traverse(this, node => {
			return this.nextFn(node, sel);
		});
    }
    protected abstract nextFn (node: TElement, sel?: string): Promise<TElement>;
    //#endregion
    
    protected abstract getField<T>(node: TElement, field: string): Deferred<T>;
    protected abstract setField(node: TElement, obj: any): Deferred<void>;
    protected abstract setField(node: TElement, field: string, val: any): Deferred<void>;
    protected abstract callField<T>(node: TElement, field: string, ...args): Deferred<T>;

}

namespace Arr {
    export function mutate <TElement> (self: IQuery<TElement>, mutator: (node: TElement) => Promise<void>): IQuery<any> {
        return <IQuery<any>> <any> async_each(self, ($, node) => {
            $.add(node);
			return mutator(node);
		});
    }
    export function mapFirst<TResult, TElement>(self: IQuery<TElement>, map: (node: TElement) => Promise<TResult>): Promise<TResult> {
        return async_getValueOf(0, self, map);
    }
}
