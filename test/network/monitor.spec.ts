import { Application } from 'atma-server';
import { BrowserNetworkInterceptor } from '../../src/webdriver/network/BrowserNetworkInterceptor';
import { BrowserNetworkMonitor } from '../../src/webdriver/network/BrowserNetworkMonitor';
import { WebdriverQuery } from '../../src/webdriver/WebdriverQuery';
import { TestUtils } from '../utils';

let httpApp: Application;

UTest({
    async $before () {
        httpApp = await TestUtils.startApplication();
    },
    async 'should get requested resources' () {
        let driver = await WebdriverQuery.getDriver({
            args: [
                '--log-level=3',
            ]
        });

        let monitor = await BrowserNetworkMonitor.start(driver);
        let fromEvents = []
        monitor.on('requestWillBeSent', req => {
            fromEvents.push(req);
        })

        let url = `http://127.0.0.1:${httpApp.getHttpPort()}/test/html/a.html`;
        let $ = await WebdriverQuery.load(url, {
            driver
        });
        await $.waitForPageLoad();

        let allRequests = monitor.getRequests();
        eq_(allRequests.length, fromEvents.length);

        `> get document request`
        let [ htmlReq ] = monitor.getRequests(/a.html/);
        notEq_(htmlReq, null, 'HTML was not loaded or not captured');
        eq_(htmlReq.response.status, 200);
        eq_(htmlReq.request.url, url);
        has_(htmlReq.response.headers['Content-Type'], 'text/html');


        `> get body`
        let { body } = await monitor.getResponseBody(htmlReq);
        has_(body, 'b.html');

        '> get not found favicon request'
        let [imgReq] = monitor.getRequests(/404.png/);
        notEq_(imgReq, null, '404 image was not trying to load');
        eq_(imgReq.response.status, 404);
    },
    async 'should modify requested resources' () {
        let driver = await WebdriverQuery.getDriver({
            args: [
                '--log-level=3',
            ]
        });

        let interceptor = await BrowserNetworkInterceptor.start(driver);
        interceptor.register({
            match: /foo.html/,
            response: {
                body: '<!DOCTYPE html> <h1>Foo</h1>'
            }
        });

        let url = `http://127.0.0.1:${httpApp.getHttpPort()}/foo.html`;
        let $ = await WebdriverQuery.load(url, {
            driver
        });
        await $.waitForPageLoad();

        let $h1 = await $.find('h1');
        eq_($h1.length, 1);
        eq_(await $h1.text(), 'Foo')
    }
})
