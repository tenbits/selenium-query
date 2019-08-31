import { IQuery } from '../common/IQuery'
import { IBuildConfig, ISettings } from '../common/IConfig'
import { IDriver } from '../common/IDriver'
import { Deferred } from '../types/Deferred'
import { JSDOM } from 'jsdom';
import { dfr_resolve } from '../utils/dfr';
import { NetworkDriver } from '../fetch/NetworkDriver'


export class JsdomQuery extends IQuery<Element> {
   

    hasClassFn (node: Element, name: string): Deferred<boolean> {
        return dfr_resolve(node.classList.contains(name));
    }
    addClassFn (node: Element, name: string): Deferred<void> {
        node.classList.add(name);
        return dfr_resolve();
    }
    removeClassFn(node: Element, name: string): Deferred<void> {
        node.classList.remove(name);
        return dfr_resolve();
    }
    toggleClassFn(node: Element, name: string): Deferred<void> {
        node.classList.toggle(name);
        return dfr_resolve();
    }


    textGetFn (node: Element): Deferred<string>  {
        return dfr_resolve(node.textContent);
    }
    textSetFn (node: Element, text: string): Deferred<void>  {
        node.textContent = text;
        return dfr_resolve();
    }
    htmlOuterGetFn (node: Element): Deferred<string>  {
        return dfr_resolve(node.outerHTML);
    }
    htmlGetFn (node: Element): Deferred<string>  {
        return dfr_resolve(node.innerHTML);
    }
    htmlSetFn (node: Element, text: string): Deferred<void>  {
        node.innerHTML = text;
        return dfr_resolve();
    }
    appendFn (node: Element, html: string): Deferred<void> {
        node.insertAdjacentHTML('beforeend', html);
        return dfr_resolve();        
    }
    prependFn (node: Element, html: string): Deferred<void> {
        node.insertAdjacentHTML('afterbegin', html);
        return dfr_resolve();                
    }
    beforeFn (node: Element, html: string): Deferred<void> {
        node.insertAdjacentHTML('beforebegin', html);
        return dfr_resolve();                
    }
    afterFn (node: Element, html: string): Deferred<void> {
        node.insertAdjacentHTML('afterend', html);
        return dfr_resolve();        
    }
    cssGet (node: HTMLElement, prop: string): Promise<any> {
        return dfr_resolve(node.style[toCamelCase(prop)]);
    }
    cssSet (node: HTMLElement, css: { [key: string]: any }): Deferred<void> {
        for (let key in css) {
            node.style[toCamelCase(key)] = css[key];
        }
        return dfr_resolve();
    }

    async heightGetFn (node: HTMLElement): Promise<number> {        
        return (await this.getBoundingClientRect(node)).height;
    }
    async widthGetFn (node: HTMLElement): Promise<number> {
        return (await this.getBoundingClientRect(node)).width;
    }
    innerHeightFn (node: Element): Promise<number> {
        return this.getField(node, 'offsetHeight');
    }
    innerWidthFn (node: Element): Promise<number> {
        return  this.getField(node, 'offsetWidth');
    }
    getBoundingClientRect (node: HTMLElement): Promise<{top: number, left: number, width: number, height: number}> {
        return dfr_resolve(node.getBoundingClientRect());
    }
    async getPosition (node: Element): Promise<{top: number, left: number}> {
        let dfrTop =  this.getField<number>(node, 'offsetTop');
        let dfrLeft = this.getField<number>(node, 'offsetLeft');

        let [ top, left ] = await Promise.all([dfrTop, dfrLeft]);
        return { top, left };
    }

    scrollTopGetFn (node: Element): Promise<number> {
        return this.getField(node, 'scrollTop');
    }    
    scrollTopSetFn (node: Element, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollTop', scroll);
    }
    scrollLeftGetFn (node: Element): Promise<number> {
        return this.getField(node, 'scrollLeft');
    }
    
    scrollLeftSetFn (node: Element, scroll: number): Deferred<void> {
        return this.setField(node, 'scrollLeft', scroll);
    }
    
    evalFn(node: Element, mix: Function | string, ...args): Promise<any> {
        throw new Error('Eval is not supported in JSDOM');
    }
    
    //#region Events
	clickFn(node: HTMLElement): Promise<void> {
        node.click();
        return dfr_resolve();
	}
	triggerFn(node: HTMLElement, type: string, ...args): Promise<void> {
        throw new Error('Trigger is not supported in JSDOM');
    }
    
	selectFn(node: Element, ...args): Promise<any> {
        throw new Error('Select is not supported in JSDOM');
	}

	focusFn(node: Element): Promise<void> {
		throw new Error('FOCUS is not supported in JSDOM');
	}
	blurFn(node: Element): Promise<void> {
		throw new Error('BLUR is not supported in JSDOM');
	}
	sendKeysFn(node: Element, mix): Promise<void> {	
        throw new Error('SEND_KEYS is not supported in JSDOM');
    }
    
	typeFn(node: Element, str: string): Promise<void> {
		throw new Error('TYPE is not supported in JSDOM');
	}
	pressFn (node: Element, str:string): Promise<void> {
		throw new Error('PRESS is not supported in JSDOM');
	}
    //#endregion
    //#region Manipulate
	removeFn (node: HTMLElement): Promise<void> {
        node.parentElement.removeChild(node);
        return dfr_resolve();
	}
    //#endregion
    //#region Properties
    attrGetFn (node: HTMLElement, prop: string): Promise<any> {
        return dfr_resolve(node.getAttribute(prop));
    }
    attrSetFn (node: Element, attr: { [key: string]: any }): Deferred<void> {
        for (let key in attr) {
            node.setAttribute(key, attr[key]);
        }
        return dfr_resolve();
    }
    valGetFn (node: Element): Promise<any> {
        return this.getField(node, 'value')
    }
    valSetFn (node: Element, value: any): Deferred<void> {
        return this.setField(node, 'value', value);
    }
    dataGetFn (node: HTMLElement, key: string): Promise<any> {
        return dfr_resolve(node.dataset[key]);
    }
    dataSetFn (node: HTMLElement, data: object): Deferred<void> {
        for (let key in data) {
            node.dataset[key] = data[key];
        }
        return dfr_resolve();
    }
    protected propGetFn(node: HTMLElement, key: string): Promise<any> {
        return dfr_resolve(node[key]);
    }
    protected propSetFn(node: Element, data: object): Deferred<void> {
        for (let key in data) {
            node[key] = data[key];
        }        
        return dfr_resolve();
    }
    //#endregion

    findFn (node: Element, selector: string): Deferred<Element[]> {
        let arr = Array.from(node.querySelectorAll(selector));
        return dfr_resolve(arr);
    }

    matchesFn (node: Element, selector: string): Deferred<boolean> {
        return dfr_resolve(node.matches(selector));
    }

    parentFn (node: Element): Promise<Element> {
        return dfr_resolve(node.parentElement);
    }
    closestFn (node: Element, sel: string): Promise<Element> {
        let el = node.parentElement
        for (; el != null; el = el.parentElement) {
            el = el.parentElement;
            if (el.matches(sel)) {
                break;
            }
        }
        return dfr_resolve(el);
    }
    childrenFn (node: Element, sel?: string): Promise<Element[]> {
        let arr = Array.from(node.children);
        if (sel) {
            arr = arr.filter(el => el.matches(sel));
        }
        return dfr_resolve(arr);
    }
    nextFn (node: Element, sel?: string): Promise<Element> {
        let next = node.nextElementSibling;
        if (sel != null) {
            for (; next != null; next = next.nextElementSibling) {
                if (next.matches(sel)) break;
            }            
        }
        return dfr_resolve(next);
    }

    protected getField<T>(node: Element, field: string): Deferred<T> {
        return node[field];
    }
    
    protected setField(node: Element, obj: any): Deferred<void>;
    protected setField(node: Element, field: string, val: any): Deferred<void>;
    protected setField(node: Element, mix, val?): Deferred<void> {
        if (arguments.length === 2) { 
            for (let key in mix) {
                node[key] = mix[key];
            }
            return dfr_resolve();
        }
        node[mix] = val;
        return dfr_resolve();
    }
    protected callField<T>(node: Element, field: string, ...args): Deferred<T> {
        return dfr_resolve(node[field](...args));
    }

    static newAsync (mix?, parent?: IQuery<Element>) {
        let query = new JsdomQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
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
        let query = new JsdomQuery();
        NetworkDriver.load(url, setts.opts).then(content => {
            let jsdom = new JSDOM(content.toString());
            query.add(jsdom.window.document);
            query.resolve(query);
        })
        return query;
	}
	static fetch(url: string, config: IBuildConfig, setts?: ISettings) {
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