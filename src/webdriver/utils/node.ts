import { IDriver, IElement } from "../../common/IDriver";
import { dfr_run } from "../../utils/dfr";
import { Deferred } from "../../types/Deferred";

export function node_eval(node: IElement | IDriver, mix: string | Function, ...args: any[]): Deferred<any> {
	return dfr_run((resolve, reject) => {
		
		var script = node_toScript(mix);
        var driver = node_getDriver(node);
        if (driver == null) {
			reject(new Error('Driver is not resolved.'));
			return;
        }
        let arr = node == driver ? args : [ node, ...args ];
        
		driver
			.executeScript(script, ...arr)
			.then(result => {
                resolve(result);
            }, error => {
				console.error('Unexpected sync browser error', error, 'for', script);
				resolve();
			});
	});
};

export function node_evalAsync(node: IElement | IDriver, mix: string | Function, ...args: any[]): Deferred<any> {
	return dfr_run((resolve, reject) => {
		
		var script = node_toScript(mix);
		var driver = node_getDriver(node);
		if (driver == null) {
			reject(new Error('Driver is not resolved.'));
			return;
		}
		driver
			.executeAsyncScript(script, node, ...args)
			.then(resolve, error => {
				console.error('Unexpected async browser error', error, 'for', script);
				resolve();
			});
	});
};


export function node_getDriver(node: IDriver | IElement): IDriver {
	if ('executeScript' in node) {
		return node;
	}
	if ('getDriver' in node) {
		return node.getDriver();
	}
	return (node as any).driver_;
}

export function node_toScript(mix: string | Function) {
	if (typeof mix === 'string') {
		return mix;
	}
    var script = mix.toString();
    var arrowRgx = /^[^\)]+\)\s*=>/;
    if (arrowRgx.test(script)) {
        script = script.replace(arrowRgx, '').trim();
        if (script[0] !== '{') {
            // oneliner
            return `return ${script}`;
        }
    }

	script = script.substring(script.indexOf('{') + 1);
	script = script.substring(0, script.lastIndexOf('}') - 1);
	script = script.trim();
	return script;
}
