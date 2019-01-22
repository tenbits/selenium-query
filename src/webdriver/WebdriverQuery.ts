import { node_eval } from './utils/node'
import { refs } from '../global'
import { IElement, IDriver, IDriverManager } from '../common/IDriver'
import { Deferred } from '../types/Deferred'
import { IQuery } from '../common/IQuery'
import { Webdriver } from './Webdriver'
import { IBuildConfig, ISettings } from '../common/IConfig'
import { driverPool } from './DriverPool'
import { JsdomDriver } from '../jsdom/JsdomDriver'
import { CheerioDriver } from '../cheerio/CheerioDriver'
import { NetworkDriver } from '../fetch/NetworkDriver'
import { waitForPageLoad, waitForElement } from './utils/driver';
import { DefaultConfig } from './SeleniumDriver';

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


export class WebdriverQuery extends IQuery<IElement> {
   

    hasClassFn (node: IElement, name: string): Deferred<boolean> {
        return <any> node_eval(node, scripts_nodeClassHas, name);
    }
    addClassFn (node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassAdd, name);
    }
    removeClassFn(node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassRemove, name);
    }
    toggleClassFn(node: IElement, name: string): Deferred<void> {
        return <any> node_eval(node, scripts_nodeClassToggle, name);        
    }


    textGetFn (node: IElement): Deferred<string>  {
        return this.getField(node, 'textContent');
    }
    textSetFn (node: IElement, text: string): Deferred<void>  {
        return this.setField(node, 'textContent', text);
    }
    htmlGetFn (node: IElement): Deferred<string>  {
        return this.getField(node, 'innerHTML');
    }
    htmlSetFn (node: IElement, text: string): Deferred<void>  {
        return this.setField(node, 'innerHTML', text);
    }
    appendFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node,
            'insertAdjacentHTML', 
            'beforeend', 
            html
        );
    }
    prependFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node, 
            'insertAdjacentHTML', 
            'afterbegin', 
            html
        );
    }
    beforeFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node, 
            'insertAdjacentHTML', 
            'beforebegin', 
            html
        );
    }
    afterFn (node: IElement, html: string): Deferred<void> {
        return this.callField(
            node, 
            'insertAdjacentHTML', 
            'afterend', 
            html
        );
    }
    cssGet (node: IElement, prop: string): Promise<any> {
        return node.getCssValue(prop);
    }
    cssSet (node: IElement, css: { [key: string]: any }): Deferred<void> {
        return <any>  node_eval(node, scripts_nodeCss, css);
    }

    async heightGetFn (node: IElement): Promise<number> {
        return (await this.getBoundingClientRect(node)).height;
    }
    async widthGetFn (node: IElement): Promise<number> {
        return (await this.getBoundingClientRect(node)).width;
    }
    innerHeightFn (node: IElement): Promise<number> {
        return this.getField(node, 'offsetHeight');
    }
    innerWidthFn (node: IElement): Promise<number> {
        return  this.getField(node, 'offsetWidth');
    }
    getBoundingClientRect (node: IElement): Promise<{top: number, left: number, width: number, height: number}> {
        return <any> node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
    }
    async getPosition (node: IElement): Promise<{top: number, left: number}> {
        let dfrTop =  this.getField<number>(node, 'offsetTop');
        let dfrLeft = this.getField<number>(node, 'offsetLeft');

        let [ top, left ] = await Promise.all([dfrTop, dfrLeft]);
        return { top, left };
    }

    scrollTopGetFn (node: IElement): Promise<number> {
        return this.getField(node, 'scrollTop');
    }    
    scrollTopSetFn (node: IElement, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollTop', scroll);
    }
    scrollLeftGetFn (node: IElement): Promise<number> {
        return this.getField(node, 'scrollLeft');
    }
    
    scrollLeftSetFn (node: IElement, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollLeft', scroll);
    }
    
    evalFn(node: IElement, mix: Function | string, ...args): Promise<any> {
		return <any> node_eval(node, mix, ...args);
    }
    
    //#region Events
	clickFn(node: IElement): Promise<void> {
		return node.click();
	}
	triggerFn(node: IElement, type: string, ...args): Promise<void> {
		return <any> node_eval(node, scripts_nodeTrigger, type, ...args);
    }
    
	selectFn(node: IElement, ...args): Promise<any> {
        return this.getField(node, 'tagName').then(name => {
            var fn = name === 'SELECT' ?
                scripts_nodeSelectOption :
                scripts_nodeSelectTextRange;

            return node_eval(node, fn, ...args);
        });
	}

	focusFn(node: IElement): Promise<void> {
		return this.callField(node, 'focus');
	}
	blurFn(node: IElement): Promise<void> {
		return this.callField(node, 'blur');
	}
	sendKeysFn(node: IElement, mix): Promise<void> {	
        return node.sendKeys(mix);
    }
    
	typeFn(node: IElement, str: string): Promise<void> {
		var arr = Events.toSequance(str),
			fn = Events.getSequenceFunction(arr);
		return fn(node);
	}
	pressFn (node: IElement, str:string): Promise<void> {
		var key = Events.toCombination(str);
		return node.sendKeys(key);
	}
    //#endregion
    //#region Manipulate
	removeFn (node: IElement): Promise<void> {
		return <any> node_eval(node, scripts_nodeRemove);
	}
    //#endregion
    //#region Properties
    attrGetFn (node: IElement, prop: string): Promise<any> {
        return node.getAttribute(prop);
    }
    attrSetFn (node: IElement, attr: { [key: string]: any }): Deferred<void> {
        return <any> node_eval(node, scripts_nodeAttribute, attr);
    }

    valGetFn (node: IElement): Promise<any> {
        return this.getField(node, 'value')
    }
    valSetFn (node: IElement, value: any): Deferred<void> {
        return this.setField(node, 'value', value);
    }
    dataGetFn (node: IElement, key: string): Promise<any> {
        return <any> node_eval(node, scripts_nodeDataset, key);
    }
    dataSetFn (node: IElement, data: object): Deferred<void> {
        return <any> node_eval(node, scripts_nodeDataset, data);
    }
    protected propGetFn(node: IElement, key: string): Promise<any> {
        return <any> node_eval(node, scripts_nodeProperty, key);
    }
    protected propSetFn(node: IElement, data: object): Deferred<void> {
        return <any> node_eval(node, scripts_nodeProperty, data);
    }
    //#endregion

    findFn (node: IElement, selector: string): Deferred<IElement[]> {
        return node.findElements({ css: selector });
    }

    matchesFn (node: IElement, selector: string): Promise<boolean> {
        return <any> node_eval(node, scripts_nodeMatchesSelector, selector);
    }

    parentFn (node: IElement): Deferred<IElement> {
        return <any> node_eval(node, scripts_nodeParent);
    }
    closestFn (node: IElement, sel: string): Promise<IElement> {
        return <any> node_eval(node, scripts_nodeClosest, sel);
    }
    childrenFn (node: IElement, sel?: string): Promise<IElement[]> {
        return <any> node_eval(node, scripts_nodeChildren, sel);
    }
    nextFn (node: IElement, sel?: string): Promise<IElement> {
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

    
    //#region driver utils
    manage (): IDriverManager {
        let driver = driverPool.extractDriver(this);
        if (driver == null) {
            console.log(this);
            throw new Error(`Driver not found in set`)
        }
        return driver.manage();
    }
    waitForPageLoad (): IQuery<any> {
        return waitForPageLoad(this);
    }
    waitForElement (selector: string): IQuery<any> {
        return waitForElement(this, selector);
    }
	unlock () {
		Webdriver.unlockDriver(this);
	}
	//#endregion driver utils

	static build(config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		
		return Webdriver.build(config, setts);
	}
	static load(url: string, config: IBuildConfig = DefaultConfig, setts?: ISettings) {
        switch (config.name.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver.load(url, config, setts);
            case 'cheerio':
                return CheerioDriver.load(url, config, setts);
            default:
                return Webdriver.load(url, config, setts);
        }        
	}
	static fetch(url: string, config: IBuildConfig = DefaultConfig, setts?: ISettings) {
        switch (config.name.toLowerCase()) {
            case 'jsdom':
                return  JsdomDriver.fetch(url, config, setts);
            case 'cheerio':
                return  CheerioDriver.fetch(url, config, setts);
            default:
                return Webdriver.fetch(url, config, setts);
        }
	}
	static setDriver (driver: IDriver ) {
		driverPool.setGlobal(driver);
	}
	static getDriver (config: IBuildConfig, setts?: ISettings): Promise<IDriver> {
		return <Promise<IDriver>> <any> driverPool.get('', config, setts);
	}
	static unlockDriver (mix) {
		Webdriver.unlockDriver(mix);
    }
    
    static newAsync (mix?, parent?: IQuery<IElement>) {
        let query = new WebdriverQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    }

    static cheerio = CheerioDriver
    static jsdom = JsdomDriver
    static network = NetworkDriver
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
