function scripts_nodeClassToggle () {
	// import ./_inline.es6
	// import ./has.es6
	if (el.classList) {
		el.classList.toggle(klass);
		return;
	}

	if (scripts_nodeClassHas(el, klass)) {
		scripts_nodeClassRemove(el, klass);
		return;
	}
	scripts_nodeClassAdd(el, klass);
}