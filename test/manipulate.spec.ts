import Utils from './utils'

UTest({
    $config: {
        timeout: 50000
    },
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should get/set attributes': {
		'get attr' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('span')
					.attr('class')
					.done(val => {
						eq_(val, 'foo');
						done();
					})
			});
		},
		'set attr' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.foo')
					.attr('class', 'baz')
					.done($ => {
						eq_($.length, 2);

						function check(node, klass, tagName, next) {
							node.getAttribute('class').then(val => {
								eq_(val, klass);

								node.getTagName().then(val => {
									eq_(val, tagName);
									next();
								});
							});
						}
						check($[0], 'baz', 'span', () => {
							check($[1], 'baz', 'section', done);
						});
					})
			});
		}
	},
	'should get/set value': {
		'get value' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('input[type=text]')
					.val()
					.done(val => {
						eq_(val, 'Hello');
						done();
					})
			});
		},
		'set value' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('input[type=text]')
					.val('Ciao')
					.done($ => {
						eq_($.length, 1);

						$[0].getTagName().then(name => {
							eq_(name, 'input');

							new Utils.SQuery($)
								.val()
								.done(val => {
									eq_(val, 'Ciao');
									done();
								})
						});
					})
			});
		}
	},
	'should get/set textContent': {
		'get text' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.foo')
					.text()
					.done(val => {
						eq_(val, 'Span1Span2');
						done();
					})
			});
		},
		'set text' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.foo')
					.text('Foo')
					.done(val => {
						$
							.find('.foo')
							.text()
							.done(val => {
								eq_(val, 'FooFoo');
								done();
							})
					})
			});
		}
	},
	'should get/set data values': {
		'get data' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.btn-upload')
					.data('myBaz')
					.done(val => {
						eq_(val, 'foo');
						done();
					})
			});
		},
		'set data' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.btn-upload')
					.data('myBaz', '')
					.done(val => {
						$
							.find('.btn-upload')
							.data('myBaz')
							.done(val => {
								eq_(val, '');
								done();
							})
					});
			});
		}
	},
	'should get/set inner html': {
		'get and set html' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('footer')
					.done($ => eq_($.length, 1))
					.html()
					.done(val => {
						eq_(val, '<div></div>');

						$
							.find('footer')
							.html('IFoot')
							.done($ => eq_($.length, 1))
							.html()
							.done(val => {
								eq_(val, 'IFoot');
								done();
							});
					})

			});
		},
		'get html' (done) {
			Utils.query('/html/foo.html', $ => {
				$
					.find('.foo')
					.html()
					.done(val => {
						eq_(val, 'Span1<span>Span2</span>', 'Should get html of all Elements. Though jQuery returns html of the first Element only');
						done();
					});
			});
		}
	},
	'append' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('section.foo')
				.append('<br/><em>1</em>')
				.done($ => {
					eq_($.length, 1);

					$
						.html()
						.done(val => {
							eq_(val, '<span>Span2</span><br><em>1</em>');
							done();
						});
				});
		});
	},
	'prepend' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('section.foo')
				.prepend('<div class="one">div</div><section class="one">section</section><span class="one">span</span>')
				.done($ => {
					eq_($.length, 1);

					$
						.children('.one')
						.done($ => {
							eq_($.length, 3);
							done();
						});
				});
		});
	},

	'should remove element' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.foo')
				.remove()
				.done($ => {
					eq_($.length, 2);

					$
						.find('.foo')
						.done($ => {
							eq_($.length, 0);
							done();
						});
				});
		});
	}

});

