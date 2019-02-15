import Utils from './utils'

UTest({
    $config: {
        timeout: 30000
    },
    async 'navigate' () {
        let url = 'file://' + __dirname + '/html/a.html';
        console.log(url);
        let q = await Utils.SQuery.load(url);
        let anchor = await q.find('a').click();
        
        let next = await q.waitForPageLoad();
        let heading = await next.find('h1').text();
        eq_(heading, 'Foo');
    }
})