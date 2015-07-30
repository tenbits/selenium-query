module.exports = {
	suites: {
		selenium : {
			exec: 'node',
			env: [
				'/lib/query.js::SQuery',
				'/test/utils.js::Utils'
			],
			tests: 'test/**.test'
		}
	}
};