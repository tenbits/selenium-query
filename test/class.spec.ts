import Utils from './utils'

UTest({
    $config: {
        timeout: 10000
    },
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should be resolved with native Promise' (done) {
		Utils.query('/html/foo.html', $ => {
            let thenabe = $.find('body').find('section');

			Promise.resolve(thenabe).then(x => {
				
				eq_(x.length, 1);
				done();
			})
		});
	},
	'should find element with two hops' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body')
				.find('section')
				.then($ => {
					eq_($.length, 1);
					notEq_($[0], null);
					done();
				});
		});
	},
	'should have foo class' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body > section')
				.hasClass('foo')
				.done(has => {
					eq_(has, true);
					done();
				});
		});
	},
	'should toggle foo class' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body > section')
				.toggleClass('foo')
				.hasClass('foo')
				.done(has => {
					eq_(has, false);
					done();
				});
		});
	},
	'should add baz class' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('body > section')
				.addClass('baz')
				.attr('class')
				.done(val => {
					eq_(val, 'foo baz');
					done();
				});
		});
	},
});


export {};

