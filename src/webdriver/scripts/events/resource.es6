function scripts_waitForResourceCallback () {
    var selector = arguments[0];
    var cb = arguments[arguments.length - 1];

    var state = document.readyState;
    var start = Date.now();
    var TIMEOUT = 10000;

    function poll () {
        var el = document.querySelector(selector);
        if (el == null) {
            let ms = Date.now() - start;
            if (ms > TIMEOUT) {
                cb({ error: new Error(`Resource wait timeout: ${selector} in ${TIMEOUT}ms`)})
                return;
            }
            setTimeout(poll, 150);
            return;
        }
        waitResource(el);
    }
    function waitResource (el) {
        if (el.completed === true) {
            cb({ element: el });
            return;
        }
        
        if (el.tagName === 'SCRIPT') {
            el.async = false;
            el.defer = false;
            setTimeout(function () {
                cb({ element: el });
            }, 50);
            return;
        }

        el.addEventListener('load', function () {
            cb({ element: el });
            return;
        });
        el.addEventListener('error', function () {
            cb({ element: el });
            return;
        });
    }

    poll();
} 