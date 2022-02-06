import { type WebdriverQuerySync } from '../src/webdriver/WebdriverQuery'

let Lib = require('../lib/query.js')
let SQuery = Lib;


export default {
    SQuery: SQuery,
    driver: null,
    start: function () {
        if (this.driver) {
            return this.driver;
        }

        var webdriver = require('selenium-webdriver');
        var chrome = require('selenium-webdriver/chrome');
        var options = new chrome.Options();
        options.addArguments('no-sandbox');
        options.addArguments('log-level=3');

        if (process.env.BROWSER_PATH) {
            options.setChromeBinaryPath(process.env.BROWSER_PATH);
        }
        this.driver = new webdriver.Builder()
          .forBrowser('chrome')
          .setChromeOptions(options)
          .build();

        return this.driver;
    },
    stop: function () {
        if (this.driver) {
            this.driver.quit();
            this.driver = null;
            return
        }
    },
    async query (path: string, cb?: ($: WebdriverQuerySync) => void): Promise<WebdriverQuerySync>  {
        await this.driver.get('file://' + __dirname + path);

        let $ = new SQuery(this.driver);
        cb?.($);
        return $;
    }
};
