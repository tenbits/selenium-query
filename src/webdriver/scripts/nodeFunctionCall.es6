function scripts_nodeFunctionCall() {
	var el = arguments[0],
		name = arguments[1],
		args = Array.prototype.slice.call(arguments, 2);

	if (typeof el[name] !== 'function') {
		console.error(name + ' is not a function in ', el);		
	}
	return el[name].apply(el, args);
}