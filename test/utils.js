var Utils = {
	driver: null,
	start: function () {
		if (this.driver) {
			return this.driver();
		}

		var webdriver = require('selenium-webdriver');
		var chrome = require('selenium-webdriver/chrome');
		var options = new chrome.Options();
		options.addArguments('no-sandbox');

		this.driver = new webdriver.Builder()
		  .forBrowser('chrome')
		  .setChromeOptions(options)
		  .build();

		return this.driver;
	},
	stop: function () {
		if (this.driver) {
			this.driver.quit();
			this.driver = null;
			return
		}
	},
	query: function (path, fn) {
		return this
			.driver
			.get('file://' + __dirname + path)
			.then(function () {
				return fn(new SQuery(this.driver))
			}.bind(this));
	}
};