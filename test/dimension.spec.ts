import Utils from './utils'
UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should get height' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('footer')
				.height()
				.done(val => {
					eq_(val, 100);
					done();
				});
		});
	},
	'should get width' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('footer')
				.width()
				.done(val => {
					eq_(val, 300);
					done();
				});
		});
	},
	'should get position' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('footer > div')
				.position()
				.done(val => {
					deepEq_(val, { left: 10, top: 5 });
					done();
				});
		});
	},
	'should get offset' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('footer > div')
				.offset()
				.done(val => {
					has_(val, { left: 110, top: 105 });
					done();
				});
		});
	}

});

