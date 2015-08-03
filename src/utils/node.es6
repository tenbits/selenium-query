var node_eval,
	node_evalGlobal,
	node_is;
(function(){
	node_eval = function(node, mix, ...args) {
		return dfr_run(resolve => {
			if (node instanceof _webdriver.WebDriver) {
				// Selenium can not run scripts with WebDriver context
				resolve();
				return;
			}

			var script = toScript(mix);
			var driver = getDriver(node);
			getDriver(node)
				.executeScript(script, node, ...args)
				.then(resolve, error => {
					console.error('Unexpected browser error', error);
					resolve();
				});
		});
	};
	node_evalGlobal = function(mix, ...args) {
		return dfr_run(resolve => {
			var script = toScript(mix);

			_webdriver
				.executeScript(script, ...args)
				.then(resolve, error => {
					console.error('Unexpected browser error', error);
					resolve();
				});
		});
	};

	function getDriver(node) {
		if (node.executeScript) {
			return node;
		}
		if (node.getDriver) {
			return node.getDriver();
		}
		return node.driver_;
	}

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