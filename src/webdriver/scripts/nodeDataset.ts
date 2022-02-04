declare let str_toCamelCase;
declare let str_toDashed;
declare let scripts_nodeDatasetRemove;

export function scripts_nodeDataset () {
	// import ./nodeDatasetRemove.es6
	// import ./_str.es6
	// import ./_inlineGetSetKeyValue.js

	function get(el, key){
		key = str_toCamelCase(key);
		if (el.dataset) {
			return el.dataset[key];
		}
		return el.getAttribute('data-' + str_toDashed(key));
	}
	function set(el, key, val) {
		if (val == null) {
			scripts_nodeDatasetRemove(el, key);
			return;
		}
		if (el.dataset) {
			el.dataset[key] = val;
			return;
		}
		el.setAttribute(el, 'data-' + str_toDashed(key), val);
	}
};
