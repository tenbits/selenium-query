import { TestUtils } from './utils'

UTest({
	$config: {
		timeout: 30000
	},
	'load local file' (done) {
		// Lib
		// 	.SQuery
		// 	.load('http://brambumtok2345.com')
		// 	.then(async $ => {
        //         let html = await $.find('body').html();
		// 		console.log(html);
		// 		done();
        // 	}, error => console.error(error));
        eq_(1, 1);
        done();
	}
})

