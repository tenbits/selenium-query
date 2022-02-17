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

    }
})
