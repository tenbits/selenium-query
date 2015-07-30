var node_eval,
	node_is;
(function(){
	node_eval = function(node, mix, ...args) {
		return dfr_run(resolve => {
			var script = toScript(mix);

			node
				.driver_
				.executeScript(script, node, ...args)
				.then(resolve, error => {
					console.error('Unexpected browser error', error);
					resolve();
				});
		});
	};


	function toScript(mix) {
		if (typeof mix === 'string') {
			return mix;
		}
		var script = mix.toString();
		script = script.substring(script.indexOf('{') + 1);
		script = script.substring(0, script.lastIndexOf('}') - 1);
		script = script.trim();
		return script;
	}
}());