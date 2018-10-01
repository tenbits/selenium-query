function scripts_nodeDatasetRemove () {
	var el = arguments[0], key = arguments[1];
	if (el == null || key == null) {
		return;
	}
	el.removeAttribute(key);
}