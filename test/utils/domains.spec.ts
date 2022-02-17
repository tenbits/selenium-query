import { $domains } from '../../src/utils/$domains';

UTest({
    'equal domains' () {
        let a = `https://api.google.com`;
        let b = `https://api.google.com/hello`;
        eq_($domains.equal(a, b), true);


        a = `https://api.google.com`;
        b = `https://api.google.com/`;
        eq_($domains.equal(a, b), true);
    }
})
