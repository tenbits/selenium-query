function scripts_nodeDatasetRemove () {
	var el = arguments[0], key = arguments[1];
	if (el == null || key == null) {
		return;
	}
	if (el.dataset) {
		delete el.dataset[key];
		return;
	}
	el.removeAttribute(key);
}