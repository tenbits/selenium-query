import Utils from './utils'

UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should select text and type' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('form > input')
				.select('ell')
				.type('ip')
				.val()
				.done(val => {
					eq_(val, 'Hipo');
					done();
				});
		});
	},
	'should select an option ' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('select[name=letters]')
				.select('C')
				.prop('selectedIndex')
				.done(val => {
					eq_(val, 2);
					done();
				});
		});
	}
});
