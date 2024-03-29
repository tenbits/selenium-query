import { TestUtils } from './utils'

UTest({
    $before() {
        TestUtils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should map tagNames'() {
        let $ = await TestUtils.query('/html/foo.html');
        let arr = await $
            .find('body > *')
            .map(node => TestUtils.SQuery(node).prop('tagName'))
            .toArray()

        deepEq_(arr, ['STYLE', 'SPAN', 'SECTION', 'FOOTER', 'FORM']);

    },
    async 'should slice elements'() {
        let $ = await TestUtils.query('/html/foo.html');
        let arr = await $
            .find('body > *')
            .slice(1, 3)
            .map(node => TestUtils.SQuery(node).prop('tagName'))
            .toArray();

        deepEq_(arr, ['SPAN', 'SECTION']);
    },
    async 'should get at index'() {
        let $ = await TestUtils.query('/html/foo.html');
        let arr = await $
            .find('body > *')
            .eq(2)
            .map(node => TestUtils.SQuery(node).prop('tagName'))
            .toArray();

        deepEq_(arr, ['SECTION']);
    },
});

