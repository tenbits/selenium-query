function scripts_nodeProp (){
	var el = arguments[0], key = arguments[1], val = arguments[2];
	if (val == null) {
		return el[key];
	}
	el[key] = val;
};
