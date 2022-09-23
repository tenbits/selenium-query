import { HttpEndpoint, HttpResponse } from 'atma-server';
import { WebdriverQuery, WebdriverQuerySync } from '../src/webdriver/WebdriverQuery';
import { TestUtils } from './utils';
import axios from 'axios';
import { File } from 'atma-io'

UTest({
    'get': {
        async 'fetch HTML (github terms)'() {
            let resp = await WebdriverQuery.fetch<WebdriverQuery>(
                'https://docs.github.com/en/github/site-policy/github-terms-of-service'
            );

            let { data: $, status } = resp;
            eq_(status, 200);
            let h1 = await $.find('main h1');
            eq_(h1.length, 1);

            let str = await h1.text();
            eq_(str, 'GitHub Terms of Service');
        },
        async 'fetch JSON'() {
            let resp = await WebdriverQuery.fetch('https://api.github.com/users/tenbits', {
                baseUrl: 'https://github.com'
            });

            let { data, status, headers } = resp;
            eq_(status, 200);
            eq_(data.login, 'tenbits');
            has_(headers['content-type'], 'json');
        }
    },
    'post': {
        async 'send FormData'() {

            let app = await TestUtils.startApplication();

            @HttpEndpoint.route('/upload')
            class UploadEndpoint extends HttpEndpoint {
                async '$get /page' () {
                    return new HttpResponse({
                        headers: {
                            'Content-Type': 'text/html'
                        },
                        content: '<!DOCTYPE html> <h1> Upload </h1>'
                    })
                }
                async '$post /echo'(req) {
                    const formidable = require('formidable');
                    const form = formidable({ multiples: true });

                    return new Promise((resolve, reject) => {
                        form.parse(req, async (err, fields, files) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            let responseBody = {
                                ...fields
                            };
                            if (files.fooFile) {
                                let fileContent = await File.readAsync<string>(files.fooFile.filepath);
                                responseBody = {
                                    ...responseBody,
                                    ...JSON.parse(fileContent)
                                };
                            }

                            let response = new HttpResponse({
                                content: responseBody,
                                headers: {
                                    'ECHO': req.headers['echo']
                                }
                            });
                            resolve(response);
                        });
                    });

                }
                '$get /echo'(req) {
                    return req.body || { no: true };
                }
            }
            app.handlers.registerEndpoint(UploadEndpoint);


            let form = await new WebdriverQuery
                .FormData()
                .append('fooField', 'fooFieldVal')
                .append('fooFile', {
                    file: new File('./test/html/foo.json').uri.toLocalFile()
                });

            let port = app.getHttpPort();

            let resp = await WebdriverQuery.fetch(`http://127.0.0.1:${port}/upload/echo`, {
                baseUrl: `http://127.0.0.1:${port}/upload/page`,
                method: 'POST',
                body: form,
                headers: {
                    'ECHO': 'ok'
                }
            });
            deepEq_(resp.data, {
                fooField: 'fooFieldVal',
                foo: 'fooFileVal'
            });
            eq_(resp.headers['echo'], 'ok');
        }
    }
});
