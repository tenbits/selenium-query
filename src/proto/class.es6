(function(){
	_.obj_extend(SQueryProto, {
		hasClass (name) {
			return async_getValueOf(0, this, node => {
				return node_eval(node, scripts_nodeClassHas, name);
			});
		},
		addClass: classMutationDelegate(scripts_nodeClassAdd),
		removeClass: classMutationDelegate(scripts_nodeClassRemove),
		toggleClass: classMutationDelegate(scripts_nodeClassToggle),
	});

	function classMutationDelegate (fn) {
		return function (name) {
			return async_each(this, ($, node) => {
				return node_eval(node, fn, name)
					.done(() => $.add(node));
			});
		};
	}
}());