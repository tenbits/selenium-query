function scripts_addEventListener (){
    if (window.__eventManager == null) {
        var hash = {};
        window.__eventManager = {
            add (el, type) {
                var id = Math.random() * 100000000 | 0;
                var obj = hash[id] = {
                    queue: [],
                    el: el,
                    type: type,
                    cb: function (event) {
                        obj.queue.push(event);
                    }
                };
                obj.el.addEventListener(obj.type, obj.cb, false);
                return id;
            },
            remove (id) {
                var obj = hash[id];
                if (obj == null) {
                    throw new Error('Event ID not found: ' + id);
                }
                delete hash[id];
                obj.el.removeEventListener(obj.type, obj.cb, false);
            },
            tryGet (id) {
                var obj = hash[id];
                if (obj == null) {
                    throw new Error('Event ID not found: ' + id);
                }
                if (obj.queue.length === 0) {
                    return null;
                }
                return obj.queue.shift();
            }
        }
    }

    var el = arguments[0], type = arguments[1];
    return window.__eventManager.add(el, type)
};
function scripts_removeEventListener () {
    var el = arguments[0], id = arguments[1];
    return window.__eventManager.remove(id);
}
function scripts_pollEvent () {
    var el = arguments[0], id = arguments[1];
    return window.__eventManager.tryGet(id);
}