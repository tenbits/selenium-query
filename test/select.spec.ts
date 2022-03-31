import { TestUtils } from './utils'

UTest({
    $before () {
        return TestUtils.start();
    },
    $after () {
        //Utils.stop();
    },
    async 'should select text and type' () {
        let $ = await TestUtils.query('/html/foo.html')
        await $.waitForPageLoad();


        let val = await $
                .find('form > input')
                .select('ell')
                .type('ip')
                .val();

        eq_(val, 'Hipo');

    },
    async 'should select an option ' () {
        let $ = await TestUtils.query('/html/foo.html');
        await $.waitForPageLoad();

        let val = await $
            .find('select[name=letters]')
            .select('C')
            .prop('selectedIndex');

        eq_(val, 2);
    }
});
