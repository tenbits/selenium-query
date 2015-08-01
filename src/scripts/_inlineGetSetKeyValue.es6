var argsCount = arguments.length;
if (argsCount < 2) {
	return;
}

var el = arguments[0], mix = arguments[1];
if (el == null || mix == null) {
	return;
}
if (argsCount == 2 && typeof mix === 'string') {
	return get(el, mix);
}
if (argsCount == 2 && typeof mix === 'object') {
	for (var key in mix) {
		set(el, key, mix[key]);
	}
	return;
}
if (argsCount > 2 && typeof mix === 'string') {
	var val = arguments[2];
	set(el, mix, val);
	return;
}