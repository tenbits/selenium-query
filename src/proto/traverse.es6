var ProtoTraverse = {
	find (sel) {
		return async_traverse(this, node => {
			return node.findElements({css: sel});
		});
	},
	filter (sel) {
		return async_traverse(this, node => {
			return dfr_run(resolve => {
				node_eval(node, scripts_nodeMatchesSelector, sel).done(match => {
					if (match) {
						resolve(node);
						return;
					}
					resolve();
				});
			});
		});
	},
	parent () {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeParent);
		});
	},
	closest (sel) {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeClosest, sel);
		});
	},
	children (sel) {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeChildren, sel);
		});
	},
	next (sel) {
		return async_traverse(this, node => {
			return node_eval(node, scripts_nodeNext, sel);
		});
	}
};