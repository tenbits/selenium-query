import Utils from './utils'
UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should create custom typer' (done) {
		Utils.SQuery.fn.enterFoo = function(){
			return this
				.find('input')
				.select()
				.type('Foo');
		};

		Utils.query('/html/foo.html', $ => {
			$
				.enterFoo()
				.done($ => eq_($.length, 1))
				.val()
				.done(val => {
					eq_(val, 'Foo');
					done();
				});
		});
	}
});
