function scripts_nodeNext() {
	// import ./nodeMatchesSelector.es6
	var el = arguments[0], selector = arguments[1];
	var node = el.nextElementSibling;
	if (selector == null) {
		return node;
	}

	while(node != null) {
		if (scripts_nodeMatchesSelector(node, selector)) {
			return node;
		}
		node = node.nextElementSibling;
	}
	return null;
}