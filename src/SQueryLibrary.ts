import { WebdriverQuery } from './webdriver/WebdriverQuery'
import { Classify, FnPrototypeAlias } from './utils/classify';

@Classify
@FnPrototypeAlias
class SQuery extends WebdriverQuery {

    static default = SQuery
}

// Reapply already decorated SQuery to default.
SQuery.default = SQuery;

export = SQuery;