(function(){

	_.obj_extend(SQueryProto, {
		css (mix, val = null) {
			if (arguments.length === 1 && typeof mix === 'string') {
				return async_getValueOf(0, this, node => {
					return node.getCssValue(mix);
				});
			}
			return async_mutate(this, node => {
				return node_eval(node, scripts_nodeCss, mix, val);
			});
		}
	});

}());