import * as http from 'http';
import { JsdomDriver } from '../src/jsdom/JsdomDriver';
import { JsdomQuery } from '../src/jsdom/JsdomQuery';



UTest({
    $config: {
        timeout: 50000
    },
    async 'build jsdom and test children, text methods' () {
        let query = await JsdomDriver
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
        let $ = await JsdomQuery.fetch('https://docs.github.com/en/github/site-policy/github-terms-of-service');
        let h1 = await $.find('main h1');
        eq_(h1.length, 1);

        let str = await h1.text();
        eq_(str, 'GitHub Terms of Service');
    },
    'check headers on fetch' (done) {
        let headers = null;
        let server = http
            .createServer((request, response) => {
                headers = request.headers;

                response.end('<!DOCTYPE><html><body>Yes FOO</body></html>')
            })
            .listen(5772, () => {

                JsdomQuery.fetch('http://localhost:5772').then(query => {
                    has_(headers['user-agent'], 'Chrome');
                    has_(headers['host'], 'localhost:5772');
                    server.close(() => done());
                });
            });


    }
})
