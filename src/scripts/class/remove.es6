function scripts_nodeClassRemove () {
	// import ./_inline.es6
	// import ./has.es6
	if (scripts_nodeClassHas(el, klass) === false) {
		return;
	}
	if (el.classList) {
		el.classList.remove(klass);
		return;
	}
	el.className = (' ' + el.className + ' ').replace(' ' + klass + ' ', ' ');
}