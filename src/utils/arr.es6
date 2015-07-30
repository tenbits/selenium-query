function each(arr, fn, ctx){
	if (arr == null)
		return ctx || arr;
	var imax = arr.length,
		i = -1;
	while( ++i < imax ){
		fn.call(ctx || arr, arr[i], i);
	}
	return ctx || arr;
}
function map(arr, fn, ctx) {
	var out = [];
	each(arr, (x, i) => {
		out.push(fn(x, i));
	});
	return out;
}
function aggr(seed, arr, fn, ctx) {
	each(arr, function(x, i){
		seed = fn.call(ctx || arr, seed, arr[i], i);
	});
	return seed;
}
function indexOf(arr, fn, ctx){
	if (arr == null)
		return -1;
	var imax = arr.length,
		i = -1;
	while( ++i < imax ){
		if (fn.call(ctx || arr, arr[i], i) === true)
			return i;
	}
	return -1;
}