import Utils from './utils'

UTest({
    $config: {
        timeout: 20000
    },
    $before() {
        Utils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should get html content'() {
        let $ = await Utils.query('/html/foo.html');
        let html = await $
            .outerHtml();

        has_(html, `btn-upload`);
    }
});
