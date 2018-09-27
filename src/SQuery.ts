import { async_each, async_getValueOf, async_next, async_waterfall, async_map, async_aggr, async_mutate, async_traverse, async_toThenable, async_filter } from './utils/async'
import { node_eval } from './utils/node';
import { class_Dfr, is_Array, class_create, obj_extendMany, is_ArrayLike } from 'atma-utils';
import { dfr_run } from './utils/dfr';
import { each } from './utils/arr';
import { refs } from './global';
import { BuildStatics, IBuildConfig, ISettings } from './static/build';
import { IDriver, IElement } from './IDriver';
import { Classify, FnPrototypeAlias } from './utils/classify';
import { driverPool } from './class/DriverPool';

declare var scripts_nodeClassHas: any;
declare var scripts_nodeClassAdd: any;
declare var scripts_nodeClassRemove: any;
declare var scripts_nodeClassToggle: any;
declare var scripts_nodeProperty: any;
declare var scripts_nodeFunctionCall: any;

declare var scripts_nodeCss: any;
declare var scripts_nodeProperty: any;
declare var scripts_nodeFunctionCall: any;

declare var scripts_nodeTrigger: any;
declare var scripts_nodeSelectOption: any;
declare var scripts_nodeSelectTextRange: any;
declare var scripts_nodeFunctionCall: any;

declare var scripts_nodeRemove: any
declare var scripts_nodeAttribute: any;
declare var scripts_nodeProperty: any;
declare var scripts_nodeDataset: any;

declare var scripts_nodeMatchesSelector: any;
declare var scripts_nodeParent: any;
declare var scripts_nodeClosest: any;
declare var scripts_nodeChildren: any;
declare var scripts_nodeNext: any;


export interface IArray {
	length: number
	[index: number]: any
}

export class SQueryBase implements IArray {
	[index: number]: IElement;
	length = 0

	constructor (mix?) {
		this.add(mix);
	}


	//#region CssClass
	hasClass(name: string): PromiseLike<boolean> {
		return <PromiseLike<boolean>>async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeClassHas, name);
		});
	}
	addClass(name: string) {
		return CssClass.mutate(this, name, scripts_nodeClassAdd);
	}
	removeClass(name: string) {
		return CssClass.mutate(this, name, scripts_nodeClassRemove);
	}
	toggleClass(name: string) {
		return CssClass.mutate(this, name, scripts_nodeClassToggle);
	}
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
	slice(start = 0, end = null) {
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
			async_toThenable(this).done($ => {
				var arr = Array.prototype.slice.call($);
				resolve(arr);
			});
		})
	}
	//#endregion Collection

	//#region Content
	text(): PromiseLike<string>;
	text(str: string): SQuery;
	text(str?: string) {
		if (typeof str === 'undefined') {
			return async_aggr('', this, (accum, node) => {
				return node_eval(node, scripts_nodeProperty, 'textContent').then(val => accum + val)
			}) as PromiseLike<string>;
		}
		return <SQuery><any>async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeProperty, 'textContent', str)
				.done(() => $.add(node));
		});
	}
	html(): PromiseLike<string>;
	html(str: string): SQuery;
	html(str?: string) {
		if (typeof str === 'undefined') {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, 'innerHTML')
			}) as PromiseLike<string>;
		}
		return <SQuery><any>async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeProperty, 'textContent', str)
				.done(() => $.add(node));
		});
	}
	append(html: string) {
		return Content.inserter(this, html, 'beforeend')
	}
	prepend(html: string) {
		return Content.inserter(this, html, 'afterbegin')
	}
	before(html: string) {
		return Content.inserter(this, html, 'beforebegin')
	}
	after(html: string) {
		return Content.inserter(this, html, 'afterend')
	}
	//#endregion Content

	//#region Css
	css(cssObj: { [key: string]: any }): ThenableSQuery;
	css(key: string, val: any): ThenableSQuery;
	css(key: string): Promise<any>;
	css(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return async_getValueOf(0, this, node => {
				return node.getCssValue(mix);
			}) as PromiseLike<any>;
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeCss, mix, val);
		});
	}
	height(): Promise<number>;
	height(val): ThenableSQuery;
	height(val?) {
		if (val == null) {
			return async_getValueOf(0, this, node => {
				return node.getSize().then(x => x.height);
			});
		}
		return this.css('height', val);
	}
	innerHeight(): PromiseLike<number> {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetHeight');
		});
	}
	width(): Promise<number>;
	width(val): ThenableSQuery
	width(val = null) {
		if (val == null) {
			return async_getValueOf(0, this, node => {
				return node.getSize().then(x => x.width);
			});
		}
		return this.css('width', val);
	}
	innerWidth(): PromiseLike<number> {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetWidth');
		});
	}
	offset(): Promise<{ top: number, left: number }> {
		return <Promise<{ top: number, left: number }>> <any> async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect')
				.then(x => ({ top: x.top, left: x.left }));
		}) ;
	}
	position(): Promise<{ top: number, left: number }> {
		return <Promise<{ top: number, left: number }>> <any> async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'offsetTop')
				.then(top => {
					return node_eval(node, scripts_nodeProperty, 'offsetLeft')
						.then(left => {
							return { top, left }
						});
				});
		});
	}
	scrollTop(...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'scrollTop', ...args);
		});
	}
	scrollLeft(...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, scripts_nodeProperty, 'scrollLeft', ...args);
		});
	}
	//#endregion

	//#region driver
	eval(mix: Function | string, ...args) {
		return async_getValueOf(0, this, node => {
			return node_eval(node, mix, ...args);
		});
	}
	//#endregion

	//#region Events
	click() {
		return async_each(this, ($, node) => {
			return node.click().then(() => {
				$.add(node);
			});
		});
	}
	trigger(type, ...args) {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeTrigger, type, ...args)
				.done(() => $.add(node));
		});
	}
	select(...args) {

		return async_mutate(this, (node, $) => {
			return node.getTagName().then(name => {
				var fn = name === 'select' ?
					scripts_nodeSelectOption :
					scripts_nodeSelectTextRange;

				return node_eval(node, fn, ...args);
			});
		});
	}

	focus() {
		return Events.callFn(this, 'focus');
	}
	blur() {
		return Events.callFn(this, 'blur');
	}
	sendKeys(mix) {
		return async_each(this, ($, node) => {
			return node.sendKeys(mix).then(() => {
				$.add(node);
			});
		});
	}
	type(str) {
		var arr = Events.toSequance(str),
			fn = Events.getSequenceFunction(arr);
		return async_each(this, ($, node) => {
			return fn(node).then(() => {
				$.add(node);
			});
		});
	}
	press(str) {
		var key = Events.toCombination(str);
		return async_each(this, ($, node) => {
			return node.sendKeys(key).then(() => {
				$.add(node);
			});
		});
	}
	//#endregion
	//#region Manipulate
	remove() {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeRemove)
				.done(() => $.add(node));
		});
	}
	//#endregion
	//#region Properties
	attr(name: string): Promise<any>
	attr(vals: { [key: string] : any }): ThenableSQuery
	attr(mix, val?) {
		if (arguments.length === 1 && typeof mix === 'string') {
			return async_getValueOf(0, this, node => {
				return node.getAttribute(mix);
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeAttribute, mix, val);
		});
	}
	val(): PromiseLike<any>
	val(val: any): ThenableSQuery
	val(val?) {
		if (arguments.length === 0) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, 'value')
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeProperty, 'value', val);
		});
	}
	data(key: string): PromiseLike<any>;
	data(key: string, val: any): ThenableSQuery
	data(key, val?) {
		if (arguments.length === 1) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeDataset, key)
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeDataset, key, val);
		});
	}
	prop(key: string): PromiseLike<any>;
	prop(key: string, val: any): ThenableSQuery	
	prop(key, val = null) {
		if (arguments.length === 1) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeProperty, key)
			});
		}
		return async_mutate(this, node => {
			return node_eval(node, scripts_nodeProperty, key, val);
		});
	}
	//#endregion
	//#region Traverse
	find(sel: string): ThenableSQuery {
		return async_traverse(this, (node: IElement) => {
			return node.findElements({ css: sel });
		});
	}
	filter(fn: (node) => boolean | Promise<boolean>): ThenableSQuery;
	filter(sel: string): ThenableSQuery;
	filter(mix): ThenableSQuery {
		if (typeof mix === 'string') {
			let sel = mix;
			return async_traverse(this, node => {
				return dfr_run(resolve => {
					node_eval(node, scripts_nodeMatchesSelector, sel).done(match => {
						if (match) {
							resolve(node);
							return;
						}
						resolve();
					});
				});
			});
		}
		return async_filter(this, mix);
	}
	parent(): ThenableSQuery {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeParent);
		});
	}
	closest(sel: string): ThenableSQuery {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeClosest, sel);
		});
	}
	children(sel: string): ThenableSQuery {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeChildren, sel);
		});
	}
	next(sel: string): ThenableSQuery {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeNext, sel);
		});
	}
	//#endregion

	//#region driver utils
	unlock () {
		BuildStatics.unlockDriver(this);
	}
	//#endregion driver utils

	static build(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		return BuildStatics.build(config, setts);
	}
	static load(url: string, config: IBuildConfig, setts?: ISettings) {
		return BuildStatics.load(url, config, setts);
	}
	static fetch(url: string, config: IBuildConfig, setts?: ISettings) {
		return BuildStatics.fetch(url, config, setts);
	}
	static setDriver (driver: IDriver ) {
		driverPool.setGlobal(driver);
	}
	static getDriver (config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		return <Promise<IDriver>> <any> driverPool.get('', config, setts);
	}
	static unlockDriver (mix) {
		BuildStatics.unlockDriver(mix);
	}
}

namespace CssClass {
	export function mutate(self: SQuery, name: string, mutator: Function) {
		return async_each(self, ($, node) => {
			return node_eval(node, mutator, name).done(() => $.add(node));
		});
	}
}
namespace Content {

	export function inserter(self: SQuery, html: string, position: string) {
		return async_each(self, ($, node) => {
			return node_eval(node, scripts_nodeFunctionCall, 'insertAdjacentHTML', position, html)
				.done(() => $.add(node));
		});
	}
}

namespace Events {

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

	export function callFn(self: SQuery, name: string) {
		return async_each(this, ($, node) => {
			return node_eval(node, scripts_nodeFunctionCall, name)
				.done(() => $.add(node));
		});
	}

	export function toSequance(str) {
		var delimiter = '_%%%%%%_';
		str = str.replace(/\{([\w_]+)\}/g, function (full, name) {
			var key = (aliases[name] || name).toUpperCase();
			if (key in Key === false) {
				return full;
			}
			return delimiter + key + delimiter;
		});
		var parts = str.split(delimiter),
			i = 1,
			imax = parts.length;

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
	function isSpecial(name) {
		var key = (aliases[name] || name).toUpperCase();
		return key in Key;
	}
	export function getSequenceFunction(arr) {
		return function (node) {
			var dfrs = arr.map(str => node.sendKeys(str));
			return dfrs[dfrs.length - 1];
		};
	}

}

@Classify
@FnPrototypeAlias
export class SQuery extends SQueryBase {

}

@Classify
@FnPrototypeAlias
export class ThenableSQuery extends class_create(class_Dfr, SQueryBase, {}) {
	
	constructor (...args) {		
		super(...args);
		if (this.length > 0) {
			this.resolve(this);
		}
	}

	resolve (...args) {
		if (args.length !== 0) {
			if (args[0] instanceof ThenableSQuery) {
				args[0] = ThenableSQuery.toSync(args[0]);
			}
		}			
		return super.resolve(...args);
	}

	static toSync (x: ThenableSQuery) {
		return new SQueryBase(x);
	}
	static toAsync (x: SQuery) {
		return new ThenableSQuery(x);
	}
}

new ThenableSQuery();