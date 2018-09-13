module.exports = {
	suites: {
		selenium : {
			exec: 'node',
			env: [
				'/src/scripts/exports.es6',
				'/lib/index.js::SQuery',
				'/test/utils.js::Utils'
			],
			tests: 'test/**.test'
		}
	}
};