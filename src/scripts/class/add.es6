function scripts_nodeClassAdd () {
	// import ./_inline.es6
	// import ./has.es6
	if (scripts_nodeClassHas(el, klass)) {
		return;
	}
	if (el.classList) {
		el.classList.add(klass);
		return;
	}
	el.className += ' ' + klass;
}