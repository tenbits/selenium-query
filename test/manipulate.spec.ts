import { WebElement } from 'selenium-webdriver';
import { IQuery } from '../src/common/IQuery';
import { TestUtils } from './utils'

UTest({
    $config: {
        timeout: 50000
    },
    $before() {
        Utils.start();
    },
    $after() {
        //Utils.stop();
    },
    'should get/set attributes': {
        async 'get attr'() {
            let $ = await Utils.query('/html/foo.html');
            let val = await $
                .find('span')
                .attr('class');

            eq_(val, 'foo');

        },
        async 'set attr'() {
            let $ = await Utils.query('/html/foo.html');
            let $foo = await $
                .find('.foo')
                .attr('class', 'baz')

            eq_($foo.length, 2);

            async function check(node, klass, tagName) {
                let klassVal = await node.getAttribute('class');
                eq_(klassVal, klass);

                let tagNameVal = await node.getTagName()
                eq_(tagNameVal, tagName);
            }

            await check($foo[0], 'baz', 'span');
            await check($foo[1], 'baz', 'section');
        },
        'should get/set value': {
            async 'get value'() {
                let $ = await Utils.query('/html/foo.html');
                let val = await $
                    .find('input[type=text]')
                    .val();

                eq_(val, 'Hello');
            },
            async 'set value'() {
                let $ = await Utils.query('/html/foo.html');
                let $input = await $
                    .find('input[type=text]')
                    .val('Ciao');

                eq_($input.length, 1);

                let name = await $input[0].getTagName();
                eq_(name, 'input');

                let val = await $input.val();
                eq_(val, 'Ciao');
            }
        },
        'should get/set textContent': {
            async 'get text'() {
                let $ = await Utils.query('/html/foo.html');
                let val = await $
                    .find('.foo')
                    .text()

                eq_(val, 'Span1Span2');

            },
            async 'set text'() {
                let $ = await Utils.query('/html/foo.html');
                await $
                    .find('.foo')
                    .text('Foo')


                let val = await $
                    .find('.foo')
                    .text()

                eq_(val, 'FooFoo');
            }
        },
        'should get/set data values': {
            async 'get data'() {
                let $ = await Utils.query('/html/foo.html');
                let val = await $
                    .find('.btn-upload')
                    .data('myBaz');

                eq_(val, 'foo');

            },
            async 'set data'() {
                let $ = await Utils.query('/html/foo.html');
                await $
                    .find('.btn-upload')
                    .data('myBaz', '')

                let val = await $
                    .find('.btn-upload')
                    .data('myBaz')

                eq_(val, '');
            }
        },
        'should get/set inner html': {
            async 'get and set html'() {
                let $ = await Utils.query('/html/foo.html');
                let html = await $
                    .find('footer')
                    .html();

                eq_(html, '<div></div>');

                let val = await $
                    .find('footer')
                    .html('IFoot')
                    .html()

                eq_(val, 'IFoot');
            },
            async 'get html'() {
                let $ = await Utils.query('/html/foo.html');
                let val = await $
                    .find('.foo')
                    .html()

                eq_(val, 'Span1<span>Span2</span>', 'Should get html of all Elements. Though jQuery returns html of the first Element only');
            }
        },
        async 'append'() {
            let $ = await Utils.query('/html/foo.html');
            let $el = await $
                .find('section.foo')
                .append('<br/><em>1</em>')

            eq_($el.length, 1);

            let val = await $el.html()
            eq_(val, '<span>Span2</span><br><em>1</em>');
        },
        async 'prepend'() {
            let $ = await Utils.query('/html/foo.html');
            let $el = await $
                .find('section.foo')
                .prepend('<div class="one">div</div><section class="one">section</section><span class="one">span</span>')

            eq_($el.length, 1);

            let $children = await $el.children('.one');


            eq_($children.length, 3);
        },

        async 'should remove element'() {
            let $ = await Utils.query('/html/foo.html');
            let $foo = await $
                .find('.foo')
                .remove()

            eq_($foo.length, 2);

            let $foo2 = await $foo
                .find('.foo')

            eq_($foo2.length, 0);
        }
    }
});

