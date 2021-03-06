import Utils from './utils'

UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should get css value' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('form > input')
				.css('display')
				.done(val => {
					eq_(val, 'inline-block');
					done();
				});
		});
	},
	'shoudl set css value' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('form > input')
				.css('background-color', 'red')
				.css('background-color')
				.done(val => {
					eq_(val, 'rgba(255, 0, 0, 1)');
					done();
				});
		});
	},
	'should css object' (done) {
		Utils.query('/html/foo.html', $ => {
			var input = $.find('form > input');

			input
				.css({
					display: 'block',
					color: 'red'
				})
				.css('display')
				.done(val => {
					eq_(val, 'block');

					input
						.css('color')
						.done(val => {
							eq_(val, 'rgba(255, 0, 0, 1)');
							done();
						});
				});
		});
	},

});

