/**
 *	Build: Run Atma.js Toolkit
 *  $ npm install
 *  $ bower install
 *  $ git submodule update --recursive
 *  $ npm build
 **/

module.exports = {
	'settings': {
		io: {
			extensions: {
				js: ['condcomments:read', 'importer:read']
			}
		}
	},
	'import': {
		files: 'builds/**',
		output: 'lib/',
		defines: {
			DEBUG: true
		}
	},
	'jshint': {
		files: ['lib/domtest.js'],
		jshint: JSHint()
	},
	'uglify': {
		files: 'lib/domtest.js',
		defines: {
			DEBUG: false
		}
	},

	'watch': {
		files: 'src/**',
		config: '#[import]'
	},

	'defaults': ['import', 'uglify']
};

function JSHint() {

	return {
		options: {
			curly: true,
			eqeqeq: true,
			forin: false,
			immed: true,
			latedef: true,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			expr: true,
			regexp: true,
			undef: true,
			unused: true,
			strict: true,
			trailing: true,

			boss: true,
			eqnull: true,
			es5: true,
			lastsemic: true,
			browser: true,
			node: true,
			onevar: false,
			evil: true,
			sub: true,
		},
		globals: {
			define: true,
			require: true,
		}
	};
}
