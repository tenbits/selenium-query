import { TestUtils } from './utils'

UTest({
    $config: {
        timeout: 20000
    },
    $before() {
        TestUtils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should get html content'() {
        let $ = await TestUtils.query('/html/foo.html');
        let html = await $
            .outerHtml();

        has_(html, `btn-upload`);
    }
});
