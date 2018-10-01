function str_toCamelCase (str) {
	return str.replace(/\-(.)/g, function(_, letter){
		return letter.toUpperCase();
	});
}
function str_toDashed (str) {
	return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}