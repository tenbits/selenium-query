import { WebdriverQuery } from './webdriver/WebdriverQuery'
import { Classify, FnPrototypeAlias } from './utils/classify';
import { CookieContainer } from './common/CookieContainer';

@Classify
@FnPrototypeAlias
class SQuery extends WebdriverQuery {

    static default = SQuery
    static CookieContainer = CookieContainer
}

// Reapply already decorated SQuery to default.
SQuery.default = SQuery;

export = SQuery;