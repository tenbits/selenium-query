import Utils from './utils'

UTest({
    $config: {
        timeout: 20000
    },
	$before () {
		Utils.start();
	},
	$after () {
		//Utils.stop();
	},
	'should get html content' (done) {
		Utils.query('/html/foo.html', $ => {
            $
                .outerHtml()
                .done(html => {
                    has_(html, `btn-upload`);
                    done();
                });
		});
	}
});
