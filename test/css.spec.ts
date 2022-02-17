import { TestUtils } from './utils'

UTest({
    $before() {
        Utils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should get css value'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('form > input')
            .css('display')

        eq_(val, 'inline-block');
    },
    async 'shoudl set css value'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('form > input')
            .css('background-color', 'red')
            .css('background-color')

        eq_(val, 'rgba(255, 0, 0, 1)');

    },
    async 'should css object'() {
        let $ = await Utils.query('/html/foo.html');
        var input = $.find('form > input');

        let val = await input
            .css({
                display: 'block',
                color: 'red'
            })
            .css('display')

        eq_(val, 'block');

        let val2 = await input.css('color');
        eq_(val2, 'rgba(255, 0, 0, 1)');
    },

});

