(function(){

	_.obj_extend(SQueryProto, {
		eval (mix, ...args) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, mix, ...args);
			});
		}
	});

}());