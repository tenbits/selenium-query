import { TestUtils } from './utils'

UTest({
    $before () {
        TestUtils.start();
    },
    $after () {
        //Utils.stop();
    },
    async 'should send keys' () {
        let $ = await TestUtils.query('/html/foo.html')
        let input = await $.find('form > input[type=text]');
        let val = await input
                .sendKeys('Bro')
                .val();

        eq_(val, 'HelloBro');
    },
    async 'should send also meta keys' (done) {
        let $ = await TestUtils.query('/html/foo.html')
        let input = $.find('form > input[type=text]');

        let val = await input
            .type('{backspace}{backspace}pers{backspace}')
            .val();

        eq_(val, 'Helper');
    },
    async 'should press a key combination' () {
        let $ = await TestUtils.query('/html/foo.html')
        let input = await $.find('form > input[type=text]');
        let val = await input
                .press('shift+b')
                .val();

        eq_(val, 'HelloB');
    }
});


// async function wait (ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }
