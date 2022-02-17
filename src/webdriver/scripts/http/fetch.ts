export function scripts_fetchAsync() {
    var url: string = arguments[0];
    var opts: RequestInit = null;
    if (arguments.length > 2) {
        opts = arguments[1]
        if (typeof opts === 'string') {
            opts = JSON.parse(opts);
        }
    }
    opts = opts || {};

    var callback = arguments[arguments.length - 1];


    if (opts.body instanceof HTMLFormElement) {
        opts.body = new FormData(opts.body);
    }

    fetch(url, opts).then(response => {
        var contentType = response.headers.get('content-type');
        var status = response.status;
        var headers = Array.from(response.headers.entries()).reduce((aggr, entry) => {
            aggr[entry[0]] = entry[1];
            return aggr;
        }, {});

        response.text().then(text => {

            let $resp = {
                status,
                headers,
                data: text,
                name: null,
                message: null
            };

            if (!response.ok) {
                callback(Object.assign($resp, {
                    name: 'Error',
                    message: url + " has the status code " + response.status
                }));
                return;
            }

            if (contentType.includes('html')) {

                var parser = new DOMParser();
                var respDoc = parser.parseFromString(text, 'text/html');
                var respBody = respDoc.querySelector('body');

                var links = respBody.querySelectorAll('link[href]');
                for (var i = 0; i < links.length; i++) {
                    links[i].parentElement.removeChild(links[i]);
                }

                var scripts = respBody.querySelectorAll('script');
                for (var i = 0; i < links.length; i++) {
                    var script = scripts[i];
                    var type = script.getAttribute('type');
                    if (!type || type.includes('javascript')) {
                        script.parentElement.removeChild(script);
                        continue;
                    }
                }

                var container = respDoc.createElement('div');
                container.setAttribute('style', 'display: none');
                container.setAttribute('visibility', 'hidden');

                var shadow;
                if (container.attachShadow) {
                    shadow = container.attachShadow({ mode: 'open' });
                }

                if (shadow != null) {
                    shadow.appendChild(respBody);
                } else {
                    container.appendChild(respBody);
                }

                document.body.appendChild(container);
                callback(Object.assign($resp, {
                    data: respBody
                }));
                return;
            }
            if (contentType.includes('json')) {
                try {
                    var json = JSON.parse(text);
                    callback(Object.assign($resp, {
                        data: json
                    }));
                }
                catch (error) {
                    callback(Object.assign($resp, {
                        name: 'Error',
                        message: error.message
                    }));
                }
                return;
            }

            callback($resp);

        }, err => {
            // text() failed
            callback(err);
        });


    }, err => {
        // fetch() failed
        callback(err);
    });
}
