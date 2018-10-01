function scripts_nodeCss(){
	// import ../_inlineGetSetKeyValue.js
	// import ../_str.es6

	function get(el, key) {
		return getComputedStyle(el)[str_toCamelCase(key)];
	}
	function set(el, key, val) {
		console.log(arguments);
		el.style[str_toCamelCase(key)] = val;
	}
}