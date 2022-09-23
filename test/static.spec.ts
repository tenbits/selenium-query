import { Application } from 'atma-server';
import { WebdriverQuery } from '../src/webdriver/WebdriverQuery';
import { TestUtils } from './utils';

let app: Application;

UTest({
    $config: {
        timeout: 30000
    },
    async $before () {
        app = await TestUtils.startApplication();
    },
    async 'load local file'() {
        let $ = await WebdriverQuery
            .load(`http://127.0.0.1:${app.getHttpPort()}/test/html/foo-static.html`)
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
