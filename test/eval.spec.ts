import Utils from './utils'
UTest({
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'load page and eval' (done) {
		
		
        Utils.query('/html/foo.html', ($, a, b) => {            
            
            $.find('span').text().then(function(str){
                console.log('>', str);
                done();
            });
		});
    },
});