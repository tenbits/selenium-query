import Utils from './utils'

UTest({
    $before() {
        Utils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should get height'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('footer')
            .height();

        eq_(val, 100);
    },
    async 'should get width'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('footer')
            .width();

        eq_(val, 300);
    },
    async 'should get position'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('footer > div')
            .position();

        deepEq_(val, { left: 10, top: 5 });
    },
    async 'should get offset'() {
        let $ = await Utils.query('/html/foo.html');
        let val = await $
            .find('footer > div')
            .offset()

        has_(val, { left: 110, top: 105 });
    }
});

