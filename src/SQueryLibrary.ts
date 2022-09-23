import { WebdriverQuery } from './webdriver/WebdriverQuery'
import { Classify, FnPrototypeAlias } from './utils/classify';
import { CookieContainer } from './common/CookieContainer';
import { BrowserNetworkInterceptor } from './webdriver/network/BrowserNetworkInterceptor';
import { BrowserNetworkMonitor } from './webdriver/network/BrowserNetworkMonitor';

@Classify
@FnPrototypeAlias
class SQuery extends WebdriverQuery {

    static default = SQuery
    static CookieContainer = CookieContainer
    static BrowserNetworkInterceptor = BrowserNetworkInterceptor;
    static BrowserNetworkMonitor = BrowserNetworkMonitor;
}

// Reapply already decorated SQuery to default.
SQuery.default = SQuery;

export = SQuery;
