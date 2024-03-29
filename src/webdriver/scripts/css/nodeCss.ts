declare let str_toCamelCase;

export function scripts_nodeCss(){
	// import ../_inlineGetSetKeyValue.js
	// import ../_str.es6

	function get(el, key) {
		return getComputedStyle(el)[str_toCamelCase(key)];
	}
	function set(el, key, val) {
		el.style[str_toCamelCase(key)] = val;
	}
}
