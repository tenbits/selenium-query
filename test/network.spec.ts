import * as http from 'http';
import * as ruta from 'ruta';
import { NetworkDriver } from '../src/fetch/NetworkDriver';


const Server = {
    port: null,
    http: null,
    routes: new ruta.Collection,

    start () {
        return new Promise ((resolve, reject) => {
            Server.http  = http.createServer((req, res: http.ServerResponse) => {
                let url = req.url;
                let route = Server.routes.get(url);
                if (route == null) {
                    res.writeHead(404);
                    res.end("Not found");
                    return;
                }
                let status = route.value.status || 200;
                let headers = route.value.headers || {};
                res.writeHead(status, headers);

                let body = route.value.body;
                res.end(body);
            });
            Server.http.on('listening', () => {
                Server.port = Server.http.address().port;
                resolve(null);
            })
            Server.http.on('error', (error) => reject(error));

            var connections = {}

            Server.http.on('connection', function(conn) {
                var key = conn.remoteAddress + ':' + conn.remotePort;
                connections[key] = conn;
                conn.on('close', function() {
                delete connections[key];
                });
            });

            Server.http.destroy = function(cb) {
                Server.http.close(cb);
                for (var key in connections)
                    connections[key].destroy();
            };

            Server.http.listen(0);
        });
    },
    stop () {
        return new Promise(resolve => {
            Server.http.destroy(() => {
                resolve(null);
            });
        })
    },
    define (data) {
        const scope = 'scope' in data ? data.scope : Math.random() * 10 ** 5 | 0;

        for (let key in data.routes) {
            let path = `${scope}/${key}`;
            Server.routes.add(path, data.routes[key]);
        }

        return {
            url: `http://localhost:${Server.port}/${scope}`
        };
    }
}

UTest({
    async $before () {
        return Server.start();
    },
    async $after () {
        return Server.stop();
    },
    async 'should load string' () {
        let test = Server.define({
            routes: {
                '/': {
                    body: 'foo'
                }
            }
        });
        NetworkDriver.tracer.onComplete(<any> assert.await(function(span){
            eq_(span.res.url, test.url);
            eq_(span.res.body, 'foo');
        }));
        let resp = await NetworkDriver.load(test.url);
        eq_(resp.body, 'foo');
        eq_(resp.url, test.url);
        NetworkDriver.tracer.clear();
    },
    async 'should handle redirect' () {
        let test = Server.define({
            scope: 'redirect-test',
            routes: {
                '/': {
                    status: 301,
                    headers: {
                        'Location': `/redirect-test/redirected`
                    }
                },
                '/redirected': {
                    body: 'lorem'
                }
            }
        });
        let resp = await NetworkDriver.load(test.url);
        eq_(resp.body, 'lorem');
        eq_(resp.url, test.url + '/redirected');
    },
})
