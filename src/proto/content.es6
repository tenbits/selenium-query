(function(){

	_.obj_extend(SQueryProto, {
		text (str = null) {
			if (arguments.length === 0) {
				return async_aggr('', this, (accum, node) => {
					return node_eval(node, scripts_nodeProperty, 'textContent').then(val => accum + val)
				});
			}
			return async_each(this, ($, node) => {
				return node_eval(node, scripts_nodeProperty, 'textContent', str)
					.done(() => $.add(node));
			});
		},
		html (str = null) {
			if (arguments.length === 0) {
				return async_getFirst(this, node => {
					return node_eval(node, scripts_nodeProperty, 'innerHTML')
				});
			}
			return async_each(this, ($, node) => {
				return node_eval(node, scripts_nodeProperty, 'textContent', str)
					.done(() => $.add(node));
			});
		},
	});

	(function(){
		var map = {
			'append': 'beforeend',
			'prepend': 'afterbegin',
			'before': 'beforebegin',
			'after': 'afterend'
		};

		Object.keys(map).forEach(fn => {
			var position = map[fn];
			SQueryProto[fn] = function (html) {
				return async_each(this, ($, node) => {
					return node_eval(node, scripts_nodeFunctionCall, 'insertAdjacentHTML', position, html)
						.done(() => $.add(node));
				});
			};
		})
	}());

}());