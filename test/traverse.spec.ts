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
	'find': function (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('span')
				.done($ => {
					eq_($.length, 2);
					done();
				});
		});
	},
	'filter' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.foo')
				.done($ => {
					eq_($.length, 2);
				})
				.filter('span')
				.done($ => {
					eq_($.length, 1);
					done();
				});
		});
	},
	'parent' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.foo > span')
				.parent()
				.done($ => {
					eq_($.length, 1);
					$[0].getTagName().then(x => {
						eq_(x, 'section');
						done();
					});
				})
		})
	},
	'closest' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.foo > span')
				.closest('body')
				.done($ => {
					eq_($.length, 1);

					$[0].getTagName().then(x => {
						eq_(x, 'body');
						done();
					});
				})
		})
	},
	'children': {
		'should get all children' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('body')
					.children()
					.done($ => {
						eq_($.length, 5);
						done();
					})
			})
		},
		'should filter children' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('body')
					.children('section')
					.done($ => {
						eq_($.length, 1);
						done();
					})
			})
		},
	},
	'next': {
		'should get direct next element' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('body > span')
					.done($ => {
                        eq_($.length, 1);
                    })
					.next()
					.done($ => {
                        eq_($.length, 1);
                        done();
					})
			})
		},
		'should filter children' (done) {
            Utils.query('/html/foo.html', $ => {
            	$
					.find('body > span')
					.done($ => eq_($.length, 1))
					.next('footer')
					.done($ => {
						eq_($.length, 1);
                        done();
					})
			})
		},
	}
})
