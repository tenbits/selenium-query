function scripts_nodeAttribute () {
	// import ./_str.es6
	// import ./_inlineGetSetKeyValue.es6

	function get(el, key) {
		return el.getAttribute(key);
	}
	function set(el, key, value) {
		return el.setAttribute(key, value);
	}
};
