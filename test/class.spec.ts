import { TestUtils } from './utils'

UTest({
    $config: {
        timeout: 10000
    },
    $before() {
        TestUtils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should be resolved with native Promise'() {
        let $ = await TestUtils.query('/html/foo.html')
        let $section = await $.find('body').find('section');
        eq_($section.length, 1);

    },
    async 'should find element with two hops'() {
        let $ = await TestUtils.query('/html/foo.html')
        let $section = await $
            .find('body')
            .find('section')

        eq_($section.length, 1);
        notEq_($section[0], null);

    },
    async 'should have foo class'() {
        let $ = await TestUtils.query('/html/foo.html')
        let hasFoo = await $
            .find('body > section')
            .hasClass('foo')

        eq_(hasFoo, true);

    },
    async 'should toggle foo class'() {
        let $ = await TestUtils.query('/html/foo.html');
        let hasFoo = await $
            .find('body > section')
            .toggleClass('foo')
            .hasClass('foo')

        eq_(hasFoo, false);

    },
    async 'should add baz class'() {
        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .find('body > section')
            .addClass('baz')
            .attr('class');

        eq_(val, 'foo baz');
    },
});
