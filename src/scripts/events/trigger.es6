function scripts_nodeTrigger() {
	var el = arguments[0],
		type = arguments[1],
		data = arguments[2];

	if (data == null && typeof el[type] === 'function') {
		el[type]();
		return;
	}

	var event = create(type, data);
	dispatch(el, event);

	function createEvent (type){
		var event = document.createEvent('Event');
		event.initEvent(type, true, true);
		return event;
	}
	function createCustomEvent (type, data = {}){
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(type, true, true, data);
		return event;
	}
	function create(type, data){
		if (data == null || ('on' + type) in el)
			return createEvent(type);

		return createCustomEvent(type, data);
	}
	function dispatch(node, event){
		node.dispatchEvent(event);
	};
}