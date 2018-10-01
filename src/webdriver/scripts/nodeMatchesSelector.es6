function scripts_nodeMatchesSelector (){
	var el = arguments[0], selector = arguments[1];
	var docEl = document.documentElement,
		matchesSelector =
			docEl.webkitMatchesSelector ||
			docEl.mozMatchesSelector ||
			docEl.msMatchesSelector ||
			docEl.oMatchesSelector ||
			docEl.matchesSelector
		;

	return el == null || el.nodeType !== 1
		? false
		: matchesSelector.call(el, selector);
};