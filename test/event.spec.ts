import { TestUtils } from './utils'

UTest({
    $config: {
        timeout: 20000
    },
    $before () {
        TestUtils.start();
    },
    $after () {
        // TestUtils.stop();
    },
    async 'should click the button' () {
        let $ = await TestUtils.query('/html/foo.html');
        let $btn = await $.find('.btn-upload');

        eq_($btn.length, 1);

        let $input = await $btn
                .click()
                .parent()
                .children('input')
        eq_($input.length, 1);

        let val = await $input.val();
        eq_(val, 'Gruesse');
    },
    async 'should trigger custom event' () {
        let $ = await TestUtils.query('/html/foo.html');

        let val = await $
                .find('.btn-upload')
                .trigger('MyCustom',{})
                .parent()
                .children('input')
                .val();

                eq_(val, 'Guten Tag');
    },
    'should listen for the event' (done) {
        async function inner () {

            let $ = await TestUtils.query('/html/button.html');
            await $.waitForPageReady();

            let fn = assert.await(async function (event) {
                eq_(event.type, 'click');
                eq_(typeof event.x === 'number', true);
                done();
            });

            let $button = await $.find('button');

            await $button.once('click', fn as any);
            await $button.click();
        }
        inner().then(null, error => console.log(error));
    },
    async 'should list for resource to be loaded' () {
        let $ = await TestUtils.query('/html/button.html');
        await $.waitForResource(`script[src*="foo"]`);

        let x = await $.eval(() => (window as any).foo);
        eq_(x, 'Foo123');
    }
});
