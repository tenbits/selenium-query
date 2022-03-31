import { WebdriverQuery, WebdriverQuerySync } from '../src/webdriver/WebdriverQuery';
import { TestUtils } from './utils'
UTest({
    $before() {
        TestUtils.start();
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


        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .use(InputHandler)
            .enterFoo()
            .val()

        eq_(val, 'Foo');

    }
});
