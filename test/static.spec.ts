import Utils from './utils'


UTest({
	$config: {
		timeout: 30000
	},
	'load local file' (done) {
		Utils.SQuery
			.load('/test/html/foo.html')
			.find('.foo')
			.done($ => {
				eq_($.length, 2)
				done();
			});
	},
	'load google' (done) {
		Utils.SQuery
			.load('http://google.com')
			.find('input')
			.css('background-color', 'red')
			.done($ => {
				notEq_($.length, 0)
				done();
			});
	},
	async 'fetch github terms' () {
		let $ = await Utils.SQuery
			.fetch('https://help.github.com/articles/github-terms-of-service/');

		
		let h1 = await $.find('article > h1');
		eq_(h1.length, 1);

		let str = await h1.text();
		eq_(str, 'GitHub Terms of Service');
	}
})
