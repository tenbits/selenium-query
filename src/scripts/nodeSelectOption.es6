function scripts_nodeSelectOption(){
	// import ./events/trigger.es6

	var el = arguments[0], str = arguments[1];

	var opts,
		opt = find(byText);
	if (opt == null)  opt = find(byAttr('value'));
	if (opt == null)  opt = find(byAttr('name'));
	if (opt == null)  opt = find(byAttr('id'));
	if (opt == null) throw Error('Option not found: ' + str);

	var optEl = opt[0],
		index = opt[1];

	el.selectedIndex = index;

	scripts_nodeTrigger(optEl, 'click');
	scripts_nodeTrigger(el, 'change');

	function byText (el, i) {
		var txt = el.textContent || '';
		return txt.trim().indexOf(str) !== -1;
	}
	function byAttr (name) {
		return function(el){
			return (el.getAttribute(name) || '').trim() === str;
		};
	}
	function find(fn) {
		if (opts == null)
			opts = el.querySelectorAll('option');

		var imax = opts.length,
			i = 0, x;
		for(; i < imax; i++) {
			x = opts[i];
			if (fn(x, i) === true)
				return [x, i];
		}
		return null;
	}
}