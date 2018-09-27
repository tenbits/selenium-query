export function singleton (target, propertyKey, descriptor){
    var viaProperty = descriptor == null;
    var fn = fn_singleton(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}
export function memoize (target, propertyKey, descriptor){
    var viaProperty = descriptor == null;
    var fn = fn_memoize(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}


function fn_singleton (fn) {
    var _singleton = null;

    var Wrapper = function(...args) {
        return _singleton == null
            ? (_singleton = fn.apply(this, args))
            : (_singleton);
    };
    (Wrapper as any).clearArgs = function (...args) {
        _singleton = null;
    };
    (Wrapper as any).clearAll = function () {
        _singleton = null;
    };
    return Wrapper;
}

function fn_memoize (fn) {
    var _cache = {},
        _args = [];

    var Wrapper = function(...args) {
        var id = fn_argsId(args, _args);
        return _cache[id] == null
            ? (_cache[id] = fn.apply(this, args))
            : _cache[id];
    };
    (Wrapper as any).clearArgs = function (...args) {
        var id = fn_argsId(args, _args);
        _cache[id] = null;
    };
    (Wrapper as any).clearAll = function () {
        _cache = {};
    };
    return Wrapper;
}

function fn_argsId (args, cache) {
    if (args.length === 0)
        return 0;
    
    var imax = cache.length,
        i = -1;
    while( ++i < imax ){
        if (args_match(cache[i], args))
            return i + 1;
    }
    cache.push(args);
    return cache.length;
};


function args_match(a, b){
    if (a.length !== b.length) 
        return false;
    
    var imax = a.length,
        i = 0;
    for (; i < imax; i++){
        if (a[i] !== b[i])
            return false;
    }
    return true;
}