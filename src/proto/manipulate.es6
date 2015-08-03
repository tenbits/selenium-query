(function(){

	_.obj_extend(SQueryProto, {
		remove () {
			return async_each(this, ($, node) => {
				return node_eval(node, scripts_nodeRemove)
					.done(() => $.add(node));
			});
		},
	});


}());