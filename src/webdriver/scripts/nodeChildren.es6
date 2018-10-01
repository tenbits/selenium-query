function scripts_nodeChildren() {
	// import ./nodeMatchesSelector.es6
	var el = arguments[0], selector = arguments[1];
	var out = [];

	var node = el.firstChild;
	while(node != null) {
		if (selector == null || scripts_nodeMatchesSelector(node, selector)) {
			out.push(node);
		}
		node = node.nextSibling;
	}
	return out;
}