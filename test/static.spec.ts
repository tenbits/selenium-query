import { WebdriverQuery } from '../src/webdriver/WebdriverQuery';

UTest({
    $config: {
        timeout: 30000
    },
    async 'load local file'() {
        let $ =await WebdriverQuery
            .load('/test/html/foo.html')
            .find('.foo')

        eq_($.length, 2);
    },
    async 'load google'() {
        let $ = await WebdriverQuery
            .load('http://google.com')
            .find('input')
            .css('background-color', 'red')
            ;
        notEq_($.length, 0)

    },
    async 'fetch HTML (github terms)'() {
        let resp = await WebdriverQuery
            .fetch<WebdriverQuery>('https://docs.github.com/en/github/site-policy/github-terms-of-service');

        let { data: $, status } = resp;
        eq_(status, 200);
        let h1 = await $.find('main h1');
        eq_(h1.length, 1);

        let str = await h1.text();
        eq_(str, 'GitHub Terms of Service');
    },
    async 'fetch (JSON)'() {

        let resp = await WebdriverQuery
            .fetch('https://api.github.com/users/tenbits', {
                baseUrl: 'https://github.com'
            });

        let { data, status, headers } = resp;
        eq_(status, 200);
        eq_(data.login, 'tenbits');
        has_(headers['content-type'], 'json');
    }
})
