import Utils from './utils'

UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should map tagNames' (done) {
		Utils.query('/html/foo.html', $ => {
			console.log('IN');
			$
				.find('body > *')
				.map(node => Utils.SQuery(node).prop('tagName'))
				.toArray()
				.done(arr => {
					deepEq_(arr, ['STYLE', 'SPAN', 'SECTION', 'FOOTER', 'FORM']);
					done();
				});
		});
	},
	'should slice elements' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body > *')
				.slice(1, 3)
				.map(node => Utils.SQuery(node).prop('tagName'))
				.toArray()
				.done(arr => {
					deepEq_(arr, ['SPAN', 'SECTION']);
					done();
				});
		});
	},
	'should get at index' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body > *')
				.eq(2)
				.map(node => Utils.SQuery(node).prop('tagName'))
				.toArray()
				.done(arr => {
					deepEq_(arr, ['SECTION']);
					done();
				});
		});
	},
});

