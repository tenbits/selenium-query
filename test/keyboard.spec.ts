import Utils from './utils'

UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should send keys' (done) {
		Utils.query('/html/foo.html', $ => {
			var input = $.find('form > input[type=text]');
			input
				.sendKeys('Bro')
				.val()
				.done(val => {
					eq_(val, 'HelloBro');
					done();
				});
		});
	},
	'should send also meta keys' (done) {
		Utils.query('/html/foo.html', $ => {
			var input = $.find('form > input[type=text]');
			input
				.type('{backspace}{backspace}pers{back_space}')
				.val()
				.done(val => {
					eq_(val, 'Helper');
					done();
				});
		});
	},
	'should press a key combination' (done) {
		Utils.query('/html/foo.html', $ => {
			var input = $.find('form > input[type=text]');
			input
				.press('shift+b')
				.val()
				.done(val => {
					eq_(val, 'HelloB');
					done();
				});
		});
	}
});
