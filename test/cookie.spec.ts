import { cookieContainer } from '../src/common/CookieContainer'

UTest({
    'should add and get cookies' () {
        cookieContainer.addCookies('http://foo.de/baz', 'A=B; Path=/, D=C');

        var str = cookieContainer.getCookies('http://foo.de/qux');
        eq_(str, 'A=B; D=C');

        cookieContainer.addCookies('http://foo.de/baz', ['A=None']);
        cookieContainer.addCookies('http://foo.de/baz', 'A=None1');
        cookieContainer.addCookies('http://foo.de/baz', ['A=None2', 'A=None3']);
        cookieContainer.addCookies('http://foo.de/baz', ['A=Z']);

        var str = cookieContainer.getCookies('http://foo.de/qux');
        eq_(str, 'A=Z; D=C');

        cookieContainer.addCookies('http://foo.de/baz', 'A=L; Path=/, D=K');
        var str = cookieContainer.getCookies('http://foo.de/qux');
        eq_(str, 'A=L; D=K');

    }
})