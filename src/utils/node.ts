import { IDriver, IElement } from "../IDriver";
import { dfr_run } from "./dfr";

export function node_eval(node: IElement | IDriver, mix: string | Function, ...args: any[]) {
	return dfr_run((resolve, reject) => {
		
		var script = toScript(mix);
		var driver = getDriver(node);
		if (driver == null) {
			reject(new Error('Driver is not resolved.'));
			return;
		}
		driver
			.executeScript(script, node, ...args)
			.then(resolve, error => {
				console.error('Unexpected browser error', error);
				resolve();
			});
	});
};

function getDriver(node: IDriver | IElement): IDriver {
	if ('executeScript' in node) {
		return node;
	}
	if ('getDriver' in node) {
		return node.getDriver();
	}
	return (node as any).driver_;
}

function toScript(mix: string | Function) {
	if (typeof mix === 'string') {
		return mix;
	}
	var script = mix.toString();
	script = script.substring(script.indexOf('{') + 1);
	script = script.substring(0, script.lastIndexOf('}') - 1);
	script = script.trim();
	return script;
}
