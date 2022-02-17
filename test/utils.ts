import { type WebdriverQuerySync } from '../src/webdriver/WebdriverQuery'
import { Application } from 'atma-server'
import memd = require('memd');

let Lib = require('../lib/query.js')
let SQuery = Lib;


export class TestUtils {
    static SQuery = SQuery
    static driver = null

    @memd.deco.memoize()
    static start () {

        var webdriver = require('selenium-webdriver');
        var chrome = require('selenium-webdriver/chrome');
        var options = new chrome.Options();
        options.addArguments('no-sandbox');
        options.addArguments('log-level=3');

        if (process.env.BROWSER_PATH) {
            options.setChromeBinaryPath(process.env.BROWSER_PATH);
        }
        let driver = new webdriver.Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();

        return driver;
    }
    static stop () {
        let driver = TestUtils.start();
        memd.fn.clearMemoized(TestUtils.start);

        driver.quit();
    }

    @memd.deco.memoize()
    static async startApplication () {
        let app = await Application.create({ configs: null });
        app.processor({
            before: [
                function (req, res, next) {
                    res.status = function (code) {
                        this.statusCode = code;
                        return this;
                    };
                    res.send = function (data) {
                        this.end(data);
                        return this;
                    };
                    res.set = function (key, val) {
                        this.setHeader(key, val);
                    }
                    next();
                }
            ],
            middleware: [
                require('body-parser').json(),
            ]
        })
        app.listen(0);
        return app;
    }

    static async query (path: string, cb?: ($: WebdriverQuerySync) => void): Promise<WebdriverQuerySync>  {
        let driver = TestUtils.start();

        await driver.get('file://' + __dirname + path);

        let $ = new SQuery(driver);
        cb?.($);
        return $;
    }
};
