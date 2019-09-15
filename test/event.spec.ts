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
	'should click the button' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.btn-upload')
				.done($ => eq_($.length, 1))
				.click()
				.parent()
				.children('input')
				.done($ => eq_($.length, 1))
				.val()
				.done(val => {
					eq_(val, 'Gruesse');
					done();
				});
		});
	},
	'should trigger custom event' (done) {
		Utils.query('/html/foo.html', $ => {
			$
				.find('.btn-upload')
				.done($ => eq_($.length, 1))
				.trigger('MyCustom',{})
				.parent()
				.children('input')
				.done($ => eq_($.length, 1))
				.val()
				.done(val => {
					eq_(val, 'Guten Tag');
					done();
				});
		});
    },
    'should listen for the event' (done) {
        async function inner () {
            
            let $ = await Utils.query('/html/button.html');
            await $.waitForPageReady();
            
            let fn = assert.await(function (event) {
                eq_(event.type, 'click');
                eq_(typeof event.x === 'number', true);
                eq_(typeof event.x === 'number', true);
                done();
            });

            let $button = await $.find('button');

            await $button.once('click', fn);
            await $button.click();
        }

        inner().then(null, error => console.log(error));
    },
    async 'should list for resource to be loaded' () {
        let $ = await Utils.query('/html/button.html');
        //await $.waitForPageReady();
        await $.waitForResource(`script[src*="foo"]`);
        
        let x = await $.eval(() => window.foo);
        eq_(x, 'Foo123');
    }
});
