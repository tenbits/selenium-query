module.exports = {
	suites: {
		selenium : {
			exec: 'node',
			env: [
				'/src/webdriver/scripts/exports.es6',
				'/lib/query.js::SQuery',
				'/test/utils.js::Utils'
			],
			tests: 'test/**.test'
		}
	}
};