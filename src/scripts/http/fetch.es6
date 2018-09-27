function scripts_fetchAsync() {
    var url = arguments[0];
    var opts = null;
    console.log('FETCH', url);
    if (arguments.length > 2) {
        opts = arguments[1]
        if (typeof opts === 'strings') {
            opts = JSON.parse(opts);
        }
    }
    
    var callback = arguments[arguments.length - 1];

	
	fetch(url, opts).then(response => {
        console.log('done', response.status);
        if (!response.ok) {
            callback(new Error("Status code: " + response.status));
            return;
        }
        var contentType = response.headers.get('content-type');
        
        response.text().then(text => {

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
                callback(respBody);
                return;
            }
            if (contentType.includes('html')) {
                try {
                    callback(JSON.parse(text));
                }
                catch (error) {
                    callback(error)
                }
                return;
            }
            callback(text);

        }, callback);
    
        
    }, callback);
}