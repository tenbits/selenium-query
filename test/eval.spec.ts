import { TestUtils } from './utils'
UTest({
    $before () {
        TestUtils.start();
    },
    $after () {
        //Utils.stop();
    },
    'load page and eval' (done) {


        TestUtils.query('/html/foo.html', ($, a, b) => {

            $.find('span').text().then(function(str){
                console.log('>', str);
                done();
            });
        });
    },
});
