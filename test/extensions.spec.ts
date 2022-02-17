import { WebdriverQuery, WebdriverQuerySync } from '../src/webdriver/WebdriverQuery';
import { TestUtils } from './utils'
UTest({
    $before() {
        Utils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should create custom typer'() {
        class InputHandler extends WebdriverQuery {
            enterFoo () {
                return this
                    .find('input')
                    .select()
                    .type('Foo');
            };
        }


        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .use(InputHandler)
            .enterFoo()
            .val()

        eq_(val, 'Foo');

    }
});
