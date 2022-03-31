import { TestUtils } from './utils'

UTest({
    $config: {
        timeout: 10000
    },
    $before () {
        return TestUtils.start();
    },
    $after () {
        //Utils.stop();
    },
    'find' (done) {
        TestUtils.query('/html/foo.html', $ => {
            $
                .find('span')
                .done($ => {
                    eq_($.length, 2);
                    done();
                });
        });
    },
    'filter' (done) {
        TestUtils.query('/html/foo.html', $ => {
            $
                .find('.foo')
                .done($ => {
                    eq_($.length, 2);
                })
                .filter('span')
                .done($ => {
                    eq_($.length, 1);
                    done();
                });
        });
    },
    'parent' (done) {
        TestUtils.query('/html/foo.html', $ => {
            $
                .find('.foo > span')
                .parent()
                .done($ => {
                    eq_($.length, 1);
                    $[0].getTagName().then(x => {
                        eq_(x, 'section');
                        done();
                    });
                })
        })
    },
    'closest' (done) {
        TestUtils.query('/html/foo.html', $ => {
            $
                .find('.foo > span')
                .closest('body')
                .done($ => {
                    eq_($.length, 1);

                    $[0].getTagName().then(x => {
                        eq_(x, 'body');
                        done();
                    });
                })
        })
    },
    'children': {
        'should get all children' (done) {
            TestUtils.query('/html/foo.html', $ => {
                $
                    .find('body')
                    .children()
                    .done($ => {
                        debugger;
                        eq_($.length, 5);
                        done();
                    })
            })
        },
        'should filter children' (done) {
            TestUtils.query('/html/foo.html', $ => {
                $
                    .find('body')
                    .children('section')
                    .done($ => {
                        eq_($.length, 1);
                        done();
                    })
            })
        },
    },
    'next': {
        'should get direct next element' (done) {
            TestUtils.query('/html/foo.html', $ => {
                $
                    .find('body > span')
                    .done($ => {
                        eq_($.length, 1);
                    })
                    .next()
                    .done($ => {
                        eq_($.length, 1);
                        done();
                    })
            })
        },
        'should filter children' (done) {
            TestUtils.query('/html/foo.html', $ => {
                $
                    .find('body > span')
                    .done($ => eq_($.length, 1))
                    .next('footer')
                    .done($ => {
                        eq_($.length, 1);
                        done();
                    })
            })
        },
    }
})
