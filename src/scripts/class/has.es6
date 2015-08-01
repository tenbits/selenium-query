function scripts_nodeClassHas () {
	// import ./_inline.es6
	if (el.classList) {
		return el.classList.contains(klass)
	}
	return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
}