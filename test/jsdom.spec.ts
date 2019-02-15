import Utils from './utils'
let http = require('http');

UTest({
    $config: {
        timeout: 50000
    },
    async 'build jsdom and test children, text methods' () {
        let query = await Utils.SQuery
            .jsdom
            .build({
                html: '<div><span>Foo</span></div>'
            });

        eq_(query.length, 1);

        let span = await query.children('span');
        eq_(span.length, 1);
        let text = await span.text();
        eq_(text, 'Foo');
    },
    async 'fetch' () {
        let $ = await Utils.SQuery
            .jsdom
			.fetch('https://help.github.com/articles/github-terms-of-service/');

		
		let h2 = await $.find('.article > h2');
		eq_(h2.length, 1);

		let str = await h2.text();
		eq_(str, 'GitHub Terms of Service');
    },
    'check headers on fetch' (done) {
        let headers = null;
        let server = http
            .createServer((request, response) => {
                headers = request.headers;
                
                response.end('<!DOCTYPE><html><body>Yes FOO</body></html>')
            })
            .listen(5772, (error) => {
                if (error) return done(error);

                Utils.SQuery.jsdom.fetch('http://localhost:5772').then(query => {
                    
                    console.log(headers);
                    has_(headers['user-agent'], 'Chrome');
                    has_(headers['host'], 'localhost:5772');
                    server.close(() => done());
                });
            });
        
        
    }
})