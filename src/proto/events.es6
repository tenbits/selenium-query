(function(){

	_.obj_extend(SQueryProto, {
		click () {
			return async_each(this, ($, node) => {
				return node.click().then(() => {
					$.add(node);
				});
			});
		},
		trigger (type, ...args) {
			return async_each(this, ($, node) => {
				return node_eval(node, scripts_nodeTrigger, type, ...args)
					.done(() => $.add(node));
			});
		}
	});

	['focus', 'blur'].forEach(function(name){
		SQueryProto[name] = function(){
			return async_each(this, ($, node) => {
				return node_eval(node, scripts_nodeFunctionCall, name)
					.done(() => $.add(node));
			});
		};
	})

}());