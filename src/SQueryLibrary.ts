import { WebdriverQuery } from './webdriver/WebdriverQuery'
import { Classify, FnPrototypeAlias } from './utils/classify';

@Classify
@FnPrototypeAlias
class SQuery extends WebdriverQuery {

    static default = SQuery
}
export = SQuery;