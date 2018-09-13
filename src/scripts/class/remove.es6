function scripts_nodeClassRemove () {
	// import ./_inline.js
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