import SQuery from '../src/SQueryLibrary'

UTest({
    async 'should support custom pseudo fns' () {
        
        SQuery.pseudo.isA = async function (x) {
            return await x.attr('name') === 'A';
        };

        
        let $ = SQuery.cheerio.fromHtml(`
            <div>
                <span><i name='1'></i></span>
                <span name='A'><i name='2'></i></span>
                <span><i name='3'></i></span>
                <span><i name='4'></i></span>
            </div>
        `);

        let spansAll = await $.find('span');
        eq_(spansAll.length, 4);
        
        let spansA = await $.find('span:isA');
        eq_(spansA.length, 1);

        let iAll = await $.find('span > i');
        eq_(iAll.length, 4);

        let iA = await $.find('span:isA > i');
        eq_(iA.length, 1);
        
        eq_(await iA.attr('name'), '2');
    },
    async 'should support text finder' () {
        SQuery.pseudo.has_text = async function (x, txt) {
            return (await x.text()).includes(txt);
        };
        let $ = SQuery.cheerio.fromHtml(`
            <div>
                <span>
                    <h3>Foo</h3>
                    <i name='1'></i>
                </span>
                <span>
                    <h3>Bar</h3>
                    <i name='bar'></i>
                </span>
            </div>
        `);

        let i = await $.find('span:has_text(ar) > i');

        eq_(i.length, 1);
        eq_(await i.attr('name'), 'bar');
    }
})