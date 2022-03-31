import { TestUtils } from './utils'

UTest({
    $before() {
        TestUtils.start();
    },
    $after() {
        //Utils.stop();
    },
    async 'should get height'() {
        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .find('footer')
            .height();

        eq_(val, 100);
    },
    async 'should get width'() {
        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .find('footer')
            .width();

        eq_(val, 300);
    },
    async 'should get position'() {
        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .find('footer > div')
            .position();

        deepEq_(val, { left: 10, top: 5 });
    },
    async 'should get offset'() {
        let $ = await TestUtils.query('/html/foo.html');
        let val = await $
            .find('footer > div')
            .offset()

        has_(val, { left: 110, top: 105 });
    }
});

