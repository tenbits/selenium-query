function scripts_nodeClosest (){
	// import ./nodeMatchesSelector.es6

	var el = arguments[0], selector = arguments[1];
	while( el != null && el.parentNode != null){
		el = el.parentNode;
		if (scripts_nodeMatchesSelector(el, selector)) {
			return el;
		}
	}
	return null;
};