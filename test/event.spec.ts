import Utils from './utils'
UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should click the button' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.btn-upload')
				.done($ => eq_($.length, 1))
				.click()
				.parent()
				.children('input')
				.done($ => eq_($.length, 1))
				.val()
				.done(val => {
					eq_(val, 'Gruesse');
					done();
				});
		});
	},
	'should trigger custom event' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.btn-upload')
				.done($ => eq_($.length, 1))
				.trigger('MyCustom',{})
				.parent()
				.children('input')
				.done($ => eq_($.length, 1))
				.val()
				.done(val => {
					eq_(val, 'Guten Tag');
					done();
				});
		});
	}
});