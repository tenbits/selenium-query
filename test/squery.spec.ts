import { TestUtils } from './utils'

UTest({
    'should find nothing in empty ' (done) {
        let q = new TestUtils.SQuery();
        let result = q.find('.foo');

        result.then(x => {
            eq_(x.length, 0);
            done();
        })
    }
})
