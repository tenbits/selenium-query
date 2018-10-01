module.exports = {
	suites: {
		selenium : {
			exec: 'node',
			env: [
				'/src/webdriver/scripts/exports.es6',
				'/lib/query.js::Lib',
				'/test/utils.js::Utils'
			],
			tests: 'test/**.test'
		}
	}
};