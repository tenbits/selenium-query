function scripts_nodeFunctionCall() {
	var el = arguments[0],
		name = arguments[1],
		args = Array.prototype.slice.call(arguments, 2);

	return el[name].apply(el, args);
}