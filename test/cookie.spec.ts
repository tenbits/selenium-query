import { cookieContainer } from '../src/common/CookieContainer'

UTest({
    'should add and get cookies' () {
        cookieContainer.addCookies('http://foo.de/baz', 'A=B; Path=/, D=C');

        let str = cookieContainer.getCookies('http://foo.de/qux');
        eq_(str, 'A=B; D=C');
    }
})