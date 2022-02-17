
// source ./RootModule.js
(function(){
	
	var _node_modules_memd_lib_memd = {};
var _src_cheerio_CheerioDriver = {};
var _src_cheerio_CheerioUtils = {};
var _src_cheerio_CherrioQuery = {};
var _src_common_CookieContainer = {};
var _src_common_FormDataBase = {};
var _src_common_IQuery = {};
var _src_common_SelectorsEx = {};
var _src_fetch_Body = {};
var _src_fetch_Cache = {};
var _src_fetch_NetworkDriver = {};
var _src_fetch_NetworkTracer = {};
var _src_global = {};
var _src_jsdom_JsdomDriver = {};
var _src_jsdom_JsdomQuery = {};
var _src_utils__domains = {};
var _src_utils__headers = {};
var _src_utils_arr = {};
var _src_utils_async = {};
var _src_utils_classify = {};
var _src_utils_dfr = {};
var _src_utils_humanize = {};
var _src_utils_url = {};
var _src_webdriver_DriverPool = {};
var _src_webdriver_SeleniumDriver = {};
var _src_webdriver_Webdriver = {};
var _src_webdriver_WebdriverEventsPoll = {};
var _src_webdriver_WebdriverFormData = {};
var _src_webdriver_WebdriverQuery = {};
var _src_webdriver_scripts_css_nodeCss = {};
var _src_webdriver_scripts_http_fetch = {};
var _src_webdriver_scripts_nodeDataset = {};
var _src_webdriver_scripts_nodeProperty = {};
var _src_webdriver_utils_driver = {};
var _src_webdriver_utils_node = {};

// source ./ModuleSimplified.js
var _src_utils_dfr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_dfr != null ? _src_utils_dfr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dfr_resolve = exports.dfr_run = void 0;
const atma_utils_1 = require("atma-utils");
function dfr_run(fn) {
    return new Promise(fn);
}
exports.dfr_run = dfr_run;
;
function dfr_resolve(x) {
    let dfr = new atma_utils_1.class_Dfr;
    let args = arguments.length === 0 ? [] : [x];
    dfr.resolve(...args);
    return dfr;
}
exports.dfr_resolve = dfr_resolve;
;
//# sourceMappingURL=dfr.js.map
//# sourceMappingURL=dfr.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_dfr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_dfr) && __isObj(module.exports)) {
        Object.assign(_src_utils_dfr, module.exports);
    } else {
        _src_utils_dfr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_utils_node;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_utils_node != null ? _src_webdriver_utils_node : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.node_toScript = exports.node_getDriver = exports.node_evalAsync = exports.node_eval = void 0;
const dfr_1 = _src_utils_dfr;
function node_eval(node, mix, ...args) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        var script = node_toScript(mix);
        var driver = node_getDriver(node);
        if (driver == null) {
            reject(new Error('Driver is not resolved.'));
            return;
        }
        let arr = node == driver ? args : [node, ...args];
        driver
            .executeScript(script, ...arr)
            .then(result => {
            resolve(result);
        }, error => {
            console.error('Unexpected sync browser error', error, 'for', script);
            resolve();
        });
    });
}
exports.node_eval = node_eval;
;
function node_evalAsync(node, mix, ...args) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        var script = node_toScript(mix);
        var driver = node_getDriver(node);
        if (driver == null) {
            reject(new Error('Driver is not resolved.'));
            return;
        }
        driver
            .executeAsyncScript(script, node, ...args)
            .then(resolve, error => {
            console.error('Unexpected async browser error', error, 'for', script);
            resolve();
        });
    });
}
exports.node_evalAsync = node_evalAsync;
;
function node_getDriver(node) {
    if ('executeScript' in node) {
        return node;
    }
    if ('getDriver' in node) {
        return node.getDriver();
    }
    return node.driver_;
}
exports.node_getDriver = node_getDriver;
function node_toScript(mix) {
    if (typeof mix === 'string') {
        return mix;
    }
    var script = mix.toString();
    var arrowRgx = /^[^\)]+\)\s*=>/;
    if (arrowRgx.test(script)) {
        script = script.replace(arrowRgx, '').trim();
        if (script[0] !== '{') {
            // oneliner
            return `return ${script}`;
        }
    }
    script = script.substring(script.indexOf('{') + 1);
    script = script.substring(0, script.lastIndexOf('}') - 1);
    script = script.trim();
    return script;
}
exports.node_toScript = node_toScript;
//# sourceMappingURL=node.js.map
//# sourceMappingURL=node.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_utils_node === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_utils_node) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_utils_node, module.exports);
    } else {
        _src_webdriver_utils_node = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_global;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_global != null ? _src_global : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refs = void 0;
const seleniumDriver = require("selenium-webdriver");
let _driver;
exports.refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};
//# sourceMappingURL=global.js.map
//# sourceMappingURL=global.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_global === module.exports) {
        // do nothing if
    } else if (__isObj(_src_global) && __isObj(module.exports)) {
        Object.assign(_src_global, module.exports);
    } else {
        _src_global = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_arr;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_arr != null ? _src_utils_arr : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexOf = exports.aggr = exports.map = exports.each = void 0;
function each(arr, fn, ctx = null) {
    if (arr == null)
        return ctx || arr;
    var imax = arr.length, i = -1;
    while (++i < imax) {
        fn.call(ctx || arr, arr[i], i);
    }
    return ctx || arr;
}
exports.each = each;
;
function map(arr, fn) {
    const out = [];
    each(arr, (x, i) => {
        out.push(fn(x, i));
    });
    return out;
}
exports.map = map;
function aggr(seed, arr, fn, ctx) {
    each(arr, function (x, i) {
        seed = fn.call(ctx || arr, seed, x, i);
    });
    return seed;
}
exports.aggr = aggr;
function indexOf(arr, fn, ctx) {
    if (arr == null)
        return -1;
    var imax = arr.length, i = -1;
    while (++i < imax) {
        if (fn.call(ctx || arr, arr[i], i) === true)
            return i;
    }
    return -1;
}
exports.indexOf = indexOf;
//# sourceMappingURL=arr.js.map
//# sourceMappingURL=arr.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_arr === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_arr) && __isObj(module.exports)) {
        Object.assign(_src_utils_arr, module.exports);
    } else {
        _src_utils_arr = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_async;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_async != null ? _src_utils_async : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._when = exports.async_toThenable = exports.async_all = exports.async_waterfallFn = exports.async_waterfall = exports.async_mutate = exports.async_getValueOf = exports.async_traverse = exports.async_aggr = exports.async_next = exports.async_at = exports.async_filter = exports.async_map = exports.async_each = void 0;
const arr_1 = _src_utils_arr;
const dfr_1 = _src_utils_dfr;
const atma_utils_1 = require("atma-utils");
function async_each(query, fn) {
    const $ = query.ctx.newAsync(null, query);
    query.ensureAsync().done($base => {
        const dfrs = (0, arr_1.map)($base, node => {
            return fn($, node);
        }).filter(Boolean);
        _when(dfrs, () => {
            $.resolve($);
        });
    });
    return $;
}
exports.async_each = async_each;
;
function async_map(self, fn) {
    return async_next(async_toThenable(self), ($, source) => {
        return async_waterfall(source, (node, i) => {
            return (0, dfr_1.dfr_run)(resolve => {
                function add(x) {
                    $.add(x);
                    resolve();
                }
                var x = fn($.ctx.newSync(node), i);
                if (x == null || typeof x.then !== 'function') {
                    add(x);
                    return;
                }
                x.then(add, add);
            });
        });
    });
}
exports.async_map = async_map;
;
function async_filter(self, fn) {
    return async_next(async_toThenable(self), ($, source) => {
        return async_waterfall(source, (node, i) => {
            return (0, dfr_1.dfr_run)((resolve, reject) => {
                var x = fn($.ctx.newSync(node), i);
                if (typeof x === 'boolean') {
                    if (x === true) {
                        $.add(node);
                    }
                    resolve();
                }
                x.then(result => {
                    if (result) {
                        $.add(node);
                    }
                    resolve();
                }, reject);
            });
        });
    });
}
exports.async_filter = async_filter;
;
function async_at(self, index, fn) {
    const $ = self.ctx.newAsync(null, self);
    async_toThenable(self).done(ctx => {
        if (index >= ctx.length) {
            $.resolve($);
            return;
        }
        _always(fn($, self[index]), () => $.resolve($));
    });
    return $;
}
exports.async_at = async_at;
;
function async_next(self, fn) {
    const $ = self.ctx.newAsync(null, self);
    async_toThenable(self).done(ctx => {
        _always(fn($, ctx), () => $.resolve($));
    });
    return $;
}
exports.async_next = async_next;
;
function async_aggr(accum, $, fn) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        async_toThenable($).done($ => {
            async_waterfall($, node => {
                return fn(accum, node)
                    .then(val => {
                    accum = val;
                });
            })
                .then(() => resolve(accum), error => reject(error));
        });
    });
}
exports.async_aggr = async_aggr;
;
function async_traverse(self, fn) {
    return async_each(self, ($, node) => {
        return _always(fn(node), mix => {
            $.add(mix);
        });
    });
}
exports.async_traverse = async_traverse;
;
function async_getValueOf(index, self, getter) {
    return (0, dfr_1.dfr_run)(resolve => {
        async_toThenable(self).done(ctx => {
            if (index >= ctx.length) {
                resolve(null);
                return;
            }
            let result = getter(ctx[index]);
            if ((0, atma_utils_1.is_Object)(result) === false || (0, atma_utils_1.is_Function)(result.then) === false) {
                resolve(result);
                return;
            }
            result.then(function (val) {
                resolve(val);
            }, error => {
                console.error('Getter error', error);
                resolve(null);
            });
        });
    });
}
exports.async_getValueOf = async_getValueOf;
;
function async_mutate(self, fn) {
    const $ = self.ctx.newAsync(null, self);
    self.ensureAsync().done(ctx => {
        let dfrs = (0, arr_1.map)(ctx, node => {
            $.add(node);
            return fn(node);
        });
        _when(dfrs, () => $.resolve($));
    });
    return $;
}
exports.async_mutate = async_mutate;
;
function async_waterfall(arr, fn) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        var i = -1, imax = arr.length;
        function next() {
            if (++i >= imax) {
                resolve();
                return;
            }
            fn(arr[i], i).then(() => next(), (error) => reject(error));
        }
        next();
    });
}
exports.async_waterfall = async_waterfall;
;
function async_waterfallFn(...args) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        let i = -1, imax = args.length;
        function next() {
            if (++i >= imax) {
                resolve();
                return;
            }
            args[i]().then(() => next(), (error) => reject(error));
        }
        next();
    });
}
exports.async_waterfallFn = async_waterfallFn;
function async_all(dfrs) {
    let wait = dfrs.length;
    let error = null;
    let result = new Array(dfrs.length);
    let self = new atma_utils_1.class_Dfr;
    dfrs.forEach((dfr, i) => {
        dfr.then(x => {
            if (error)
                return;
            result[i] = x;
            if (--wait > 0) {
                self.resolve(result);
            }
        }, err => {
            if (error)
                return;
            error = err;
            self.reject(error);
        });
    });
    return self;
}
exports.async_all = async_all;
function async_toThenable(ctx) {
    return ctx.ensureAsync();
}
exports.async_toThenable = async_toThenable;
function _always(dfr, fn) {
    if (dfr == null || 'then' in dfr === false) {
        fn();
        return;
    }
    return dfr.then(function (...args) {
        fn(...args);
    }, function (error) {
        fn();
    });
}
function _when(dfrs, callback) {
    if (dfrs.length === 0) {
        callback();
        return;
    }
    var count = dfrs.length;
    function ready() {
        if (--count < 1) {
            callback();
            return;
        }
    }
    (0, arr_1.each)(dfrs, x => _always(x, ready));
}
exports._when = _when;
//# sourceMappingURL=async.js.map
//# sourceMappingURL=async.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_async === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_async) && __isObj(module.exports)) {
        Object.assign(_src_utils_async, module.exports);
    } else {
        _src_utils_async = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_SelectorsEx;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_common_SelectorsEx != null ? _src_common_SelectorsEx : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectorsEx = void 0;
let rgx_PSEUDO = /:([\w]+)(\s*\(([^)]+)\))?/g;
var SelectorsEx;
(function (SelectorsEx) {
    SelectorsEx.pseudoFns = {};
    function register(name, fn) {
        SelectorsEx.pseudoFns[name] = fn;
    }
    SelectorsEx.register = register;
    function find(el, selector, find) {
        let query = el.ctx.newAsync();
        findInner(el, selector, find).then($ => {
            query.resolve($);
        }, error => {
            query.reject(error);
        });
        return query;
    }
    SelectorsEx.find = find;
    async function findInner(el, selector, find) {
        rgx_PSEUDO.lastIndex = -1;
        let $ = el;
        do {
            let match = rgx_PSEUDO.exec(selector);
            if (match == null) {
                break;
            }
            let [_, name, _g2, arg] = match;
            if (name in SelectorsEx.pseudoFns === false) {
                continue;
            }
            let selectorBefore = selector.substring(0, match.index);
            if (selectorBefore.length > 0) {
                $ = await find($, selectorBefore);
                if ($.length === 0) {
                    return $;
                }
            }
            selector = selector.substring(match.index + match[0].length);
            let misc = SelectorsEx.pseudoFns[name];
            if (typeof misc !== 'function') {
                $ = await misc.fn($, arg);
                continue;
            }
            let filterFn = misc;
            let $arr = el.ctx.newSync(null, el);
            for (let i = 0; i < $.length; i++) {
                let node = $[i];
                let $el = $.ctx.newSync(node);
                let result = await filterFn($el, arg);
                if (result) {
                    $arr.add(node);
                }
            }
            $ = $arr;
        } while (selector.length > 0);
        if (selector.length > 0) {
            return find($, selector);
        }
        return $;
    }
})(SelectorsEx = exports.SelectorsEx || (exports.SelectorsEx = {}));
//# sourceMappingURL=SelectorsEx.js.map
//# sourceMappingURL=SelectorsEx.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_common_SelectorsEx === module.exports) {
        // do nothing if
    } else if (__isObj(_src_common_SelectorsEx) && __isObj(module.exports)) {
        Object.assign(_src_common_SelectorsEx, module.exports);
    } else {
        _src_common_SelectorsEx = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_IQuery;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_common_IQuery != null ? _src_common_IQuery : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IQuery = exports.IQueryCtx = void 0;
const async_1 = _src_utils_async;
const atma_utils_1 = require("atma-utils");
const dfr_1 = _src_utils_dfr;
const arr_1 = _src_utils_arr;
const SelectorsEx_1 = _src_common_SelectorsEx;
class IQueryCtx {
    newSync(arr, parent) {
        let query = new this.Ctor(arr);
        query.ctx.owner = parent ?? this.self;
        IQueryCtx.copyFrom(query.ctx, parent?.ctx);
        return query;
    }
    newAsync(arr, parent) {
        let query = new this.Ctor(arr);
        query.ctx.owner = parent ?? this.self;
        query.then = query.ctx.thener;
        IQueryCtx.copyFrom(query.ctx, parent?.ctx);
        return query;
    }
    static copyFrom(targetCtx, parentCtx) {
        if (parentCtx != null) {
            targetCtx.url = parentCtx?.url;
            targetCtx.source = parentCtx?.source;
            targetCtx.status = parentCtx?.status;
            targetCtx.headers = parentCtx?.headers;
        }
        return targetCtx;
    }
}
exports.IQueryCtx = IQueryCtx;
class IQuery extends atma_utils_1.class_Dfr {
    constructor(mix) {
        super();
        this.length = 0;
        this.ctx = new IQueryCtx;
        this.ctx.self = this;
        this.ctx.thener = this.then;
        this.ctx.Ctor = this.constructor;
        this.ensureSync();
        this.add(mix);
        if (mix != null) {
            this.resolve(this);
        }
    }
    ensureSync() {
        this.then = null;
        return this;
    }
    ensureAsync() {
        if (this.then != null) {
            return this;
        }
        return this.ctx.newAsync(this, this);
    }
    resolve(...args) {
        if (args.length !== 0) {
            let x = args[0];
            if (x != null && x.then != null && x instanceof IQuery) {
                let q = new x.ctx.Ctor(x);
                args[0] = q;
            }
        }
        return super.resolve(...args);
    }
    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //#region CssClass
    hasClass(name) {
        return Arr.mapFirst(this, node => this.hasClassFn(node, name));
    }
    addClass(name) {
        return Arr.mutate(this, node => this.addClassFn(node, name));
    }
    removeClass(name) {
        return Arr.mutate(this, node => this.removeClassFn(node, name));
    }
    toggleClass(name) {
        return Arr.mutate(this, node => this.toggleClassFn(node, name));
    }
    //#endregion CssClass
    //#region Collection
    add(mix) {
        if (mix == null) {
            return this;
        }
        if ((0, atma_utils_1.is_ArrayLike)(mix) === true) {
            return (0, arr_1.each)(mix, this.add, this);
        }
        this[this.length++] = mix;
        return this;
    }
    eq(index) {
        return (0, async_1.async_next)(this, ($, source) => {
            if (index < source.length) {
                $.add(source[index]);
            }
        });
    }
    get(index) {
        return this[index];
    }
    slice(start = 0, end) {
        return (0, async_1.async_next)(this, ($, source) => {
            var i = start;
            if (end > source.length) {
                end = source.length;
            }
            if (i < end) {
                for (; i < end; i++) {
                    $.add(source[i]);
                }
            }
        });
    }
    each(fn) {
        return (0, async_1.async_next)(this, ($, source) => {
            return (0, async_1.async_waterfall)(source, (node, i) => {
                $.add(node);
                return fn(node, i);
            });
        });
    }
    map(fn) {
        return (0, async_1.async_map)(this, fn);
    }
    toArray() {
        return (0, dfr_1.dfr_run)(resolve => {
            this.ensureAsync().done($ => {
                var arr = Array.prototype.slice.call($);
                resolve(arr);
            });
        });
    }
    as() {
        let t;
        t = this;
        return t;
    }
    use(Ctor) {
        let proto = Ctor.prototype;
        while (proto != null && proto !== Object.prototype) {
            Object
                .getOwnPropertyNames(proto)
                .forEach(key => {
                if (key in IQuery.prototype) {
                    return;
                }
                IQuery.prototype[key] = Ctor.prototype[key];
            });
            proto = Object.getPrototypeOf(proto);
        }
        return this;
    }
    text(str) {
        if (typeof str === 'undefined') {
            return (0, async_1.async_aggr)('', this, (accum, node) => {
                return this.textGetFn(node).then(val => accum + val);
            });
        }
        return (0, async_1.async_each)(this, ($, node) => {
            return this
                .textSetFn(node, str)
                .then(() => {
                $.add(node);
            });
        });
    }
    html(str) {
        if (typeof str === 'undefined') {
            return (0, async_1.async_aggr)('', this, (accum, node) => {
                return this.htmlGetFn(node).then(val => accum + val);
            });
        }
        return (0, async_1.async_each)(this, ($, node) => {
            return this
                .htmlSetFn(node, str)
                .then(() => {
                $.add(node);
            });
        });
    }
    outerHtml() {
        return (0, async_1.async_aggr)('', this, (accum, node) => {
            return this.htmlOuterGetFn(node).then(val => accum + val);
        });
    }
    append(html) {
        return Arr.mutate(this, node => {
            return this.appendFn(node, html);
        });
    }
    // not possible to manipulate IElements in node, which are not already attached to the Live DOM.
    // appendTo(selector: string): IQuery<TElement> {
    //     return Arr.mutate(this, async node => {
    //         await this.appendToFn(selector, node);
    //     });
    // }
    // protected abstract appendToFn(selector: string, node: TElement): PromiseLike<void>;
    prepend(html) {
        return Arr.mutate(this, node => this.prependFn(node, html));
    }
    before(html) {
        return Arr.mutate(this, node => this.beforeFn(node, html));
    }
    after(html) {
        return Arr.mutate(this, node => this.afterFn(node, html));
    }
    css(mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.cssGet(node, mix));
        }
        let css = arguments.length === 1 ? mix : { [mix]: val };
        return Arr.mutate(this, node => this.cssSet(node, css));
    }
    height(val) {
        if (val == null) {
            return Arr.mapFirst(this, node => this.heightGetFn(node));
        }
        return this.css('height', val);
    }
    innerHeight() {
        return Arr.mapFirst(this, node => this.innerHeightFn(node));
    }
    width(val = null) {
        if (val == null) {
            return Arr.mapFirst(this, node => this.widthGetFn(node));
        }
        return this.css('width', val);
    }
    innerWidth() {
        return Arr.mapFirst(this, node => this.innerWidthFn(node));
    }
    offset() {
        return Arr.mapFirst(this, node => this.getBoundingClientRect(node));
    }
    position() {
        return Arr.mapFirst(this, node => this.getPosition(node));
    }
    scrollTop(mix) {
        if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.scrollTopGetFn(node));
        }
        return Arr.mutate(this, node => this.scrollTopSetFn(node, mix));
    }
    scrollLeft(mix) {
        if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.scrollLeftGetFn(node));
        }
        return Arr.mutate(this, node => this.scrollLeftSetFn(node, mix));
    }
    //#endregion
    //#region driver
    eval(mix, ...args) {
        return Arr.mapFirst(this, node => this.evalFn(node, mix, ...args));
    }
    //#endregion
    //#region Events
    click() {
        return Arr.mutate(this, node => this.clickFn(node));
    }
    trigger(type, ...args) {
        return Arr.mutate(this, node => this.triggerFn(node, type, ...args));
    }
    select(...args) {
        return Arr.mutate(this, node => this.selectFn(node, ...args));
    }
    focus() {
        return Arr.mutate(this, node => this.focusFn(node));
    }
    blur() {
        return Arr.mutate(this, node => this.blurFn(node));
    }
    sendKeys(mix) {
        return Arr.mutate(this, node => this.sendKeysFn(node, mix));
    }
    type(str) {
        return Arr.mutate(this, node => this.typeFn(node, str));
    }
    press(str) {
        return Arr.mutate(this, node => this.pressFn(node, str));
    }
    //#endregion
    //#region Manipulate
    remove() {
        return Arr.mutate(this, node => this.removeFn(node));
    }
    attr(mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.attrGetFn(node, mix));
        }
        let attr = arguments.length === 2 ? { [mix]: val } : mix;
        return Arr.mutate(this, node => this.attrSetFn(node, attr));
    }
    val(val) {
        if (arguments.length === 0) {
            return Arr.mapFirst(this, node => this.valGetFn(node));
        }
        return Arr.mutate(this, node => this.valSetFn(node, val));
    }
    data(mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.dataGetFn(node, mix));
        }
        let data = arguments.length === 2 ? { [mix]: val } : mix;
        return Arr.mutate(this, node => this.dataSetFn(node, data));
    }
    prop(mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, node => this.getField(node, mix));
        }
        let obj = arguments.length === 2 ? { [mix]: val } : mix;
        return Arr.mutate(this, node => this.setField(node, obj));
    }
    //#endregion
    //#region Traverse
    find(sel) {
        return SelectorsEx_1.SelectorsEx.find(this, sel, (el, sel) => {
            return (0, async_1.async_traverse)(el, (node) => this.findFn(node, sel));
        });
        //return async_traverse(this, (node: TElement) => this.findFn(node, sel));
    }
    filter(mix) {
        if (typeof mix === 'string') {
            let selector = mix;
            return (0, async_1.async_filter)(this, $single => this.matchesFn($single[0], selector));
        }
        let fn = mix;
        return (0, async_1.async_filter)(this, fn);
    }
    parent() {
        return (0, async_1.async_traverse)(this, node => {
            return this.parentFn(node);
        });
    }
    closest(sel) {
        return (0, async_1.async_traverse)(this, node => {
            return this.closestFn(node, sel);
        });
    }
    children(sel) {
        return (0, async_1.async_traverse)(this, node => {
            return this.childrenFn(node, sel);
        });
    }
    next(sel) {
        return (0, async_1.async_traverse)(this, node => {
            return this.nextFn(node, sel);
        });
    }
    on(type, cb) {
        return (0, async_1.async_each)(this, (ctx, node) => this._onFn(node, type, cb));
    }
    off(type, cb) {
        return (0, async_1.async_each)(this, (ctx, node) => this._offFn(node, type, cb));
    }
    once(type, cb = null) {
        return (0, async_1.async_each)(this, (ctx, node) => this._onOnceFn(node, type, cb));
    }
}
exports.IQuery = IQuery;
var Arr;
(function (Arr) {
    function mutate(self, mutator) {
        return (0, async_1.async_each)(self, ($, node) => {
            $.add(node);
            return mutator(node);
        });
    }
    Arr.mutate = mutate;
    function mapFirst(self, map) {
        return (0, async_1.async_getValueOf)(0, self, map);
    }
    Arr.mapFirst = mapFirst;
})(Arr || (Arr = {}));
//# sourceMappingURL=IQuery.js.map
//# sourceMappingURL=IQuery.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_common_IQuery === module.exports) {
        // do nothing if
    } else if (__isObj(_src_common_IQuery) && __isObj(module.exports)) {
        Object.assign(_src_common_IQuery, module.exports);
    } else {
        _src_common_IQuery = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_SeleniumDriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_SeleniumDriver != null ? _src_webdriver_SeleniumDriver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfig = exports.buildDriver = void 0;
const atma_utils_1 = require("atma-utils");
const selenium_webdriver_1 = require("selenium-webdriver");
function buildDriver(config) {
    config = (0, atma_utils_1.obj_extend)(Object.create(exports.DefaultConfig), config);
    let browser = require('selenium-webdriver/' + config.name.toLowerCase());
    let options = new browser.Options;
    config.setBinaryPath(options);
    config.setArguments(options);
    config.setLogging(options);
    let builder = new selenium_webdriver_1.Builder().forBrowser(config.name.toLowerCase());
    config.setOptions(builder, options);
    config.applyOptions(builder, options);
    return builder.build();
}
exports.buildDriver = buildDriver;
exports.DefaultConfig = {
    name: 'Chrome',
    args: ['no-sandbox'],
    binaryPath: null,
    applyOptions(builder, options) {
        var fn = `set${this.name}Options`;
        if (typeof builder[fn] !== 'function') {
            throw Error(`Default function not found, please override 'applyOptions(builder, options)' to set it yourself. Was looking for : ${fn}`);
        }
        builder[fn](options);
    },
    setOptions(builder, options) {
    },
    setArguments(options) {
        options.addArguments(this.args);
    },
    setBinaryPath(options) {
        var fn = `set${this.name}BinaryPath`;
        if (typeof options[fn] !== 'function') {
            throw Error(`Default function not found, please override 'setBinaryPath' to set it yourself. Was looking for: ${fn}`);
        }
        if (this.binaryPath) {
            options[fn](this.binaryPath);
        }
    },
    setLogging(options) {
        options.setLoggingPrefs({});
    }
};
if (typeof process.env.BROWSER_PATH !== 'undefined') {
    exports.DefaultConfig.binaryPath = process.env.BROWSER_PATH;
}
//# sourceMappingURL=SeleniumDriver.js.map
//# sourceMappingURL=SeleniumDriver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_SeleniumDriver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_SeleniumDriver) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_SeleniumDriver, module.exports);
    } else {
        _src_webdriver_SeleniumDriver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_CookieContainer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_common_CookieContainer != null ? _src_common_CookieContainer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieContainer = exports.CookieContainer = void 0;
class DomainCookies {
    constructor(domain) {
        this.domain = domain;
        this.arr = [];
    }
    add(mix, opts) {
        if (mix == null) {
            return;
        }
        if (typeof mix === 'string') {
            this.push(mix, opts);
            return;
        }
        if (Array.isArray(mix)) {
            if (mix.length === 0) {
                return;
            }
            let f = mix[0];
            if (typeof f === 'string') {
                mix.forEach(str => this.push(str, opts));
                return;
            }
            throw Error('Cookie models are not yet supported');
        }
        for (let key in mix) {
            let cookie = `${key}=${mix[key]}`;
            this.push(cookie, opts);
        }
    }
    stringify() {
        return this.arr.map(x => `${x.key}=${x.value}`).join('; ');
    }
    push(str, opts) {
        let arr = DomainCookies.parse(str);
        arr.forEach(cookie => {
            let i = this.arr.findIndex(x => x.key === cookie.key);
            if (i !== -1) {
                if (opts?.extend === true) {
                    // Skip existed cookie
                    return;
                }
                this.arr[i] = cookie;
                return;
            }
            this.arr.push(cookie);
        });
    }
    static parse(cookies) {
        let format = CookiesHelper.detectFormat(cookies);
        if (format === 'key-values') {
            return cookies.split(';').map(DomainCookies.parseSingle);
        }
        if (format === 'set-cookie') {
            // Comma Seperated cookies from `set-cookie` header
            let arr = [];
            let rgx = /,/g;
            while (cookies !== '') {
                let match = rgx.exec(cookies);
                if (match == null) {
                    arr.push(cookies);
                    break;
                }
                let str = cookies.substring(0, match.index);
                if (/Expires=[\w]{1,4}$/i.test(str)) {
                    continue;
                }
                arr.push(str);
                cookies = cookies.substring(match.index + 1).trim();
            }
            return arr.map(DomainCookies.parseSingle);
        }
        throw new Error(`Unknown cookie format: ${format} for ${cookies}`);
    }
    static parseSingle(cookie) {
        let i = cookie.indexOf('=');
        if (i === -1) {
            throw new Error(`Invalid cookie format ${cookie}`);
        }
        let key = cookie.substring(0, i);
        cookie = cookie.substring(i + 1).trim();
        i = cookie.indexOf(';');
        if (i === -1) {
            return { key, value: cookie };
        }
        let value = cookie.substring(0, i);
        return {
            key,
            value,
            rawOptions: cookie.substring(i)
        };
    }
}
var CookiesHelper;
(function (CookiesHelper) {
    function detectFormat(cookies) {
        let optionsRgx = /;\s*(Path|Domain|Expires|Max\-Age|Secure|HttpOnly)([=;]|$)/i;
        let hasOptions = optionsRgx.test(cookies);
        if (hasOptions) {
            return 'set-cookie';
        }
        if (/^[\w_-]+=\{/.test(cookies)) {
            return 'key-values';
        }
        let commaIndex = cookies.indexOf(',');
        let semicolonIndex = cookies.indexOf(';');
        if (commaIndex > -1 && semicolonIndex === -1) {
            // Has comma but not semicolon
            return 'set-cookie';
        }
        return 'key-values';
    }
    CookiesHelper.detectFormat = detectFormat;
})(CookiesHelper || (CookiesHelper = {}));
class CookieContainer {
    constructor() {
        this.domains = {};
    }
    addCookies(mix, cookies, opts) {
        let domain = 'global';
        if (arguments.length > 1) {
            let url = mix;
            domain = this.getDomain(url);
        }
        else {
            cookies = mix;
        }
        let container = this.domains[domain];
        if (container == null) {
            container = this.domains[domain] = new DomainCookies(domain);
        }
        container.add(cookies, opts);
    }
    clearCookies() {
        this.domains = {};
    }
    getCookies(url) {
        let cookies = [];
        let domain = url && this.getDomain(url) || null;
        for (let key in this.domains) {
            if (key !== 'global' && key !== domain && domain.endsWith('.' + key) === false /** Includ root cookies also to subdomains */) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join('; ');
    }
    getDomain(url) {
        return url
            .replace(/https?:\/\//, '')
            .replace(/\/.*$/, '')
            .toLowerCase();
    }
}
exports.CookieContainer = CookieContainer;
exports.cookieContainer = new CookieContainer();
//# sourceMappingURL=CookieContainer.js.map
//# sourceMappingURL=CookieContainer.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_common_CookieContainer === module.exports) {
        // do nothing if
    } else if (__isObj(_src_common_CookieContainer) && __isObj(module.exports)) {
        Object.assign(_src_common_CookieContainer, module.exports);
    } else {
        _src_common_CookieContainer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _node_modules_memd_lib_memd;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _node_modules_memd_lib_memd != null ? _node_modules_memd_lib_memd : {};
    var module = { exports: exports };

    
// source ./UMD.js
(function (factory) {

    var _name = 'memd',
        _global = typeof window === 'undefined' ? global : window,
        _module = {
            exports: {}
        };

    factory(_module, _module.exports, _global);

    if (typeof module === 'object' && module.exports) {
        module.exports = _module.exports;
    }

    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return _module.exports;
        });
        return;
    }
    
    if (_name) {
        _global[_name] = _module.exports;
    }

}(function (module, exports, global) {

    var _src_Cache = {};
var _src_deco_debounce = {};
var _src_deco_memoize = {};
var _src_deco_queued = {};
var _src_deco_throttle = {};
var _src_fn_Args = {};
var _src_fn_memoize = {};
var _src_fn_queued = {};
var _src_model_Deferred = {};
var _src_persistance_FsTransport = {};
var _src_persistance_LocalStorageTransport = {};
var _src_persistance_StoreWorker = {};
var _src_persistance_TransportWorker = {};
var _src_workers_CachedWorker = {};

// source ./ModuleSimplified.js
var _src_fn_Args;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
var Args;
(function (Args) {
    function getKey(args) {
        var key = '';
        for (var i = 0; i < args.length; i++) {
            if (i > 0) {
                key += '.';
            }
            key += getKeySingle(args[i]);
        }
        return key;
    }
    Args.getKey = getKey;
    function getKeySingle(misc) {
        if (misc == null) {
            return '';
        }
        if (typeof misc !== 'object') {
            return misc;
        }
        if (misc instanceof Date) {
            return misc.getTime();
        }
        if (misc instanceof Array) {
            return getKey(misc);
        }
        var str = '';
        for (var key in misc) {
            str += '.' + getKeySingle(misc[key]);
        }
        return str;
    }
})(Args = exports.Args || (exports.Args = {}));
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_Args) && isObject(module.exports)) {
		Object.assign(_src_fn_Args, module.exports);
		return;
	}
	_src_fn_Args = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_TransportWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportWorker = void 0;
var TransportWorker = /** @class */ (function () {
    function TransportWorker(cache, transport) {
        var _this = this;
        var _a;
        this.cache = cache;
        this.transport = transport;
        this.isReady = false;
        this.isAsync = false;
        this.lastModified = null;
        this.restorePromise = null;
        // We duplicate collection, as Cache collections can store also promises.
        this.coll = {};
        this.isAsync = Boolean(this.transport.isAsync);
        this.flushRunner = new AsyncRunner(function () { return _this.flushInner(); }, (_a = this.transport.debounceMs) !== null && _a !== void 0 ? _a : 500);
    }
    TransportWorker.prototype.restore = function () {
        if (this.isReady) {
            return;
        }
        if (this.isAsync) {
            throw new Error('Transport is Async');
        }
        var coll = this.transport.restore();
        this.cache.setRestored(coll);
        this.coll = coll !== null && coll !== void 0 ? coll : {};
        this.isReady = true;
    };
    TransportWorker.prototype.restoreAsync = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.restorePromise) !== null && _a !== void 0 ? _a : (this.restorePromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var coll;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    if (this.isAsync === false) {
                                        this.restore();
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, this.transport.restoreAsync()];
                                case 1:
                                    coll = _a.sent();
                                    if (this.isReady) {
                                        return [2 /*return*/];
                                    }
                                    this.cache.setRestored(coll);
                                    this.coll = coll !== null && coll !== void 0 ? coll : {};
                                    this.isReady = true;
                                    return [2 /*return*/];
                            }
                        });
                    }); })())];
            });
        });
    };
    TransportWorker.prototype.flush = function (key, entry) {
        this.isReady = true;
        this.lastModified = new Date();
        this.coll[key] = entry;
        if (this.transport.debounceMs === 0) {
            this.transport.flush(this.coll);
            return;
        }
        this.flushRunner.run();
    };
    TransportWorker.prototype.flushAsync = function (key, entry, force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.restoreAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.lastModified = new Date();
                        this.coll[key] = entry;
                        return [2 /*return*/, this.flushRunner.run()];
                }
            });
        });
    };
    TransportWorker.prototype.flushAllAsync = function (force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.restoreAsync()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.lastModified = new Date();
                        return [2 /*return*/, this.flushRunner.run(force)];
                }
            });
        });
    };
    TransportWorker.prototype.clear = function () {
        return this.flushRunner.run();
    };
    TransportWorker.prototype.clearAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.clear()];
            });
        });
    };
    TransportWorker.prototype.flushInner = function () {
        var coll = this.coll;
        if (this.transport.isAsync) {
            return this.transport.flushAsync(coll);
        }
        this.transport.flush(coll);
    };
    return TransportWorker;
}());
exports.TransportWorker = TransportWorker;
var AsyncRunner = /** @class */ (function () {
    function AsyncRunner(fn, debounce) {
        this.fn = fn;
        this.debounce = debounce;
        this.isWaiting = false;
        this.isBusy = false;
        this.timeout = null;
        this.shouldRunNext = false;
    }
    AsyncRunner.prototype.run = function (force) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                if (this.isWaiting && !this.isBusy) {
                    this.defer(force);
                    return [2 /*return*/, this.dfr.promise];
                }
                if (this.isBusy) {
                    this.shouldRunNext = true;
                    return [2 /*return*/, this.dfr.promise];
                }
                this.isWaiting = true;
                this.isBusy = false;
                this.dfr = new Deferred;
                this.defer(force);
                return [2 /*return*/, this.dfr.promise];
            });
        });
    };
    AsyncRunner.prototype.defer = function (force) {
        var _this = this;
        if (this.isWaiting) {
            clearTimeout(this.timeout);
        }
        if (force === true) {
            this.runInner();
            return;
        }
        this.timeout = setTimeout(function () { return _this.runInner(); }, this.debounce);
    };
    AsyncRunner.prototype.reset = function () {
        clearTimeout(this.timeout);
        this.isWaiting = false;
        this.isBusy = false;
        this.shouldRunNext = false;
    };
    AsyncRunner.prototype.runInner = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1, runNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isWaiting = false;
                        this.isBusy = true;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.fn()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Transport error', error_1);
                        return [3 /*break*/, 4];
                    case 4:
                        runNext = this.shouldRunNext;
                        this.dfr.resolve(null);
                        this.reset();
                        if (runNext) {
                            this.run();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return AsyncRunner;
}());
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_TransportWorker) && isObject(module.exports)) {
		Object.assign(_src_persistance_TransportWorker, module.exports);
		return;
	}
	_src_persistance_TransportWorker = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_StoreWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreWorker = void 0;
var StoreWorker = /** @class */ (function () {
    function StoreWorker(store, options) {
        if (options === void 0) { options = {}; }
        this.store = store;
        this.options = options;
        this.isAsync = false;
        this.doNotWaitSave = false;
        this.isAsync = this.store.getAsync != null;
        this.doNotWaitSave = (options === null || options === void 0 ? void 0 : options.doNotWaitSave) === true;
    }
    StoreWorker.prototype.get = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.store.get(key);
    };
    StoreWorker.prototype.getAsync = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this.store).getAsync.apply(_a, __spreadArray([key], args, false));
    };
    StoreWorker.prototype.save = function (key, val) {
        this.store.save(key, val);
    };
    StoreWorker.prototype.saveAsync = function (key, val) {
        var promise = this.store.saveAsync(key, val);
        if (this.doNotWaitSave === true) {
            return null;
        }
        return promise;
    };
    StoreWorker.prototype.clear = function (key) {
        this.store.clear(key);
    };
    StoreWorker.prototype.clearAsync = function (key) {
        return this.store.clearAsync(key);
    };
    return StoreWorker;
}());
exports.StoreWorker = StoreWorker;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_StoreWorker) && isObject(module.exports)) {
		Object.assign(_src_persistance_StoreWorker, module.exports);
		return;
	}
	_src_persistance_StoreWorker = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_Cache;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
var Args_1 = _src_fn_Args;
var TransportWorker_1 = _src_persistance_TransportWorker;
var StoreWorker_1 = _src_persistance_StoreWorker;
var Cache = /** @class */ (function () {
    function Cache(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.options = options;
        this._cache = {};
        this.isAsync = false;
        if (this.options.monitors) {
            this.onChanged = this.onChanged.bind(this);
            options.monitors.forEach(function (x) { return x.on('change', _this.onChanged); });
        }
        if (this.options.persistance) {
            this._transport = new TransportWorker_1.TransportWorker(this, this.options.persistance);
            this.isAsync = this._transport.isAsync;
        }
        if (this.options.store) {
            this._store = new StoreWorker_1.StoreWorker(this.options.store, options);
            this.isAsync = this._store.isAsync;
        }
        if (options.trackRef) {
            Cache.caches.push(this);
        }
    }
    Cache.prototype.resolveKey = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.keyResolver) === null || _b === void 0 ? void 0 : _b.call.apply(_b, __spreadArray([_a], args, false));
        return key !== null && key !== void 0 ? key : Args_1.Args.getKey(args);
    };
    Cache.prototype.get = function (key) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this._transport != null && this._transport.isReady === false) {
            this._transport.restore();
        }
        var entry = this._cache[key];
        if (entry == null) {
            if (this._store == null) {
                return null;
            }
            entry = (_a = this._store).get.apply(_a, __spreadArray([key], args, false));
            if (entry == null) {
                return null;
            }
        }
        if (this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge) {
            this.clear(key);
            return null;
        }
        return entry.value;
    };
    Cache.prototype.getAsync = function (key) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, Promise, function () {
            var entry;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this._transport != null && this._transport.isReady === false)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._transport.restoreAsync()];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        entry = this._cache[key];
                        if (!(entry == null)) return [3 /*break*/, 4];
                        if (this._store == null) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, (_a = this._store).getAsync.apply(_a, __spreadArray([key], args, false))];
                    case 3:
                        entry = _b.sent();
                        if (entry == null) {
                            return [2 /*return*/, null];
                        }
                        _b.label = 4;
                    case 4:
                        if (!(this.options.maxAge != null && ((Date.now() - entry.timestamp) / 1000) > this.options.maxAge)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.clearAsync(key)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/, entry.value];
                }
            });
        });
    };
    Cache.prototype.set = function (key, val) {
        var cached = {
            timestamp: Date.now(),
            value: val
        };
        this._cache[key] = cached;
        this.persist(key, cached, false);
        return val;
    };
    Cache.prototype.persist = function (key, entry, isAsync) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var transport, store, val, isPromise, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        transport = this._transport;
                        store = this._store;
                        if (transport == null && store == null) {
                            return [2 /*return*/];
                        }
                        val = entry.value;
                        isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                        if (!isPromise) return [3 /*break*/, 5];
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, val];
                    case 2:
                        val = _e.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _e.sent();
                        // do nothing on rejection
                        return [2 /*return*/];
                    case 4:
                        entry = {
                            value: val,
                            timestamp: entry.timestamp,
                        };
                        _e.label = 5;
                    case 5:
                        if (!isAsync) return [3 /*break*/, 8];
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAsync(key, entry))];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, ((_b = this._store) === null || _b === void 0 ? void 0 : _b.saveAsync(key, entry))];
                    case 7:
                        _e.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        (_c = this._transport) === null || _c === void 0 ? void 0 : _c.flush(key, entry);
                        (_d = this._store) === null || _d === void 0 ? void 0 : _d.save(key, entry);
                        _e.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.setAsync = function (key, val) {
        return __awaiter(this, void 0, Promise, function () {
            var cached;
            return __generator(this, function (_a) {
                cached = {
                    timestamp: Date.now(),
                    value: val
                };
                this._cache[key] = cached;
                this.persist(key, cached, true);
                return [2 /*return*/, val];
            });
        });
    };
    Cache.prototype.setRestored = function (coll) {
        var _a;
        this._cache = __assign(__assign({}, (coll !== null && coll !== void 0 ? coll : {})), ((_a = this._cache) !== null && _a !== void 0 ? _a : {}));
    };
    Cache.prototype.clear = function (key) {
        var _a, _b;
        if (typeof key === 'string') {
            this._cache[key] = null;
        }
        else {
            this._cache = {};
        }
        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.clear();
        (_b = this._store) === null || _b === void 0 ? void 0 : _b.clear(key);
    };
    Cache.prototype.clearAsync = function (key) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (typeof key === 'string') {
                            this._cache[key] = null;
                        }
                        else {
                            this._cache = {};
                        }
                        return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.clearAsync())];
                    case 1:
                        _c.sent();
                        (_b = this._store) === null || _b === void 0 ? void 0 : _b.clearAsync(key);
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.prototype.destroy = function () {
        var _this = this;
        var _a;
        this.clear();
        (_a = this.options.monitors) === null || _a === void 0 ? void 0 : _a.forEach(function (x) { return x.off('change', _this.onChanged); });
    };
    Cache.prototype.onChanged = function (key) {
        this.clear(key);
    };
    Cache.prototype.flushAsync = function (force) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this._transport) === null || _a === void 0 ? void 0 : _a.flushAllAsync(force))];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.flushAllAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(Cache.caches.map(function (cache) { return cache.flushAsync(true); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Cache.resolve = function (cache, resolver, key) {
        if (key === void 0) { key = ''; }
        return __awaiter(this, void 0, Promise, function () {
            var value, promise, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cache.getAsync(key)];
                    case 1:
                        value = _a.sent();
                        if (value != null) {
                            return [2 /*return*/, value];
                        }
                        promise = resolver();
                        cache.set(key, promise);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, promise];
                    case 3:
                        value = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        cache.clear(key);
                        throw error_2;
                    case 5: return [4 /*yield*/, cache.flushAsync()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, value];
                }
            });
        });
    };
    Cache.caches = [];
    return Cache;
}());
exports.Cache = Cache;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_Cache) && isObject(module.exports)) {
		Object.assign(_src_Cache, module.exports);
		return;
	}
	_src_Cache = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_clearMemoized = exports.fn_memoize = void 0;
var Cache_1 = _src_Cache;
function fn_memoize(fn, opts, key) {
    var _a, _b, _c, _d;
    if (opts === void 0) { opts = {}; }
    var _cache = new Cache_1.Cache(opts);
    if (_cache.isAsync) {
        return fn_memoizeAsync(_cache, fn, opts, key);
    }
    var _perInstance = (_a = opts === null || opts === void 0 ? void 0 : opts.perInstance) !== null && _a !== void 0 ? _a : false;
    var _clearOnReady = (_b = opts === null || opts === void 0 ? void 0 : opts.clearOnReady) !== null && _b !== void 0 ? _b : false;
    var _clearOnReject = (_c = opts === null || opts === void 0 ? void 0 : opts.clearOnReject) !== null && _c !== void 0 ? _c : false;
    var _clearOn = (_d = opts === null || opts === void 0 ? void 0 : opts.clearOn) !== null && _d !== void 0 ? _d : null;
    var _caches = [];
    var _thisArg = opts === null || opts === void 0 ? void 0 : opts.thisArg;
    var Wrapper = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var cache = _cache;
        if (_perInstance === true) {
            var prop = "__$mem_".concat(key);
            cache = this[prop];
            if (cache == null) {
                cache = new Cache_1.Cache(opts);
                Object.defineProperty(this, prop, {
                    value: cache,
                    enumerable: false
                });
                _caches.push(cache);
            }
        }
        var thisArg = _thisArg !== null && _thisArg !== void 0 ? _thisArg : this;
        var id = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.key) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([opts, { this: thisArg }], args, false))) !== null && _b !== void 0 ? _b : cache.resolveKey.apply(cache, args);
        var cached = cache.get(id);
        if (cached != null) {
            return cached;
        }
        var isPromise = null;
        var val = fn.apply(thisArg, args);
        if (_clearOnReject === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(null, function (err) {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOnReady === true) {
            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
            if (isPromise) {
                val = val.then(function (result) {
                    cache.clear(id);
                    return Promise.resolve(result);
                }, function (err) {
                    cache.clear(id);
                    return Promise.reject(err);
                });
            }
        }
        if (_clearOn != null) {
            isPromise = isPromise !== null && isPromise !== void 0 ? isPromise : (val != null && typeof val === 'object' && typeof val.then === 'function');
            if (isPromise) {
                val = val.then(function (result) {
                    if (_clearOn(result)) {
                        cache.clear(id);
                    }
                    return result;
                });
            }
            else if (_clearOn(val)) {
                // don't even set to cache
                return val;
            }
        }
        return cache.set(id, val);
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = _cache.resolveKey.apply(_cache, args);
        _cache.clear(id);
        _caches.forEach(function (x) { return x.clear(id); });
    };
    Wrapper.clearAll = function () {
        _cache.clear();
        _caches.forEach(function (x) { return x.clear(); });
    };
    return Wrapper;
}
exports.fn_memoize = fn_memoize;
;
function fn_memoizeAsync(_cache, fn, opts, key) {
    var _a, _b, _c, _d;
    if (opts === void 0) { opts = {}; }
    var _perInstance = (_a = opts === null || opts === void 0 ? void 0 : opts.perInstance) !== null && _a !== void 0 ? _a : false;
    var _clearOnReady = (_b = opts === null || opts === void 0 ? void 0 : opts.clearOnReady) !== null && _b !== void 0 ? _b : false;
    var _clearOnReject = (_c = opts === null || opts === void 0 ? void 0 : opts.clearOnReject) !== null && _c !== void 0 ? _c : false;
    var _clearOn = (_d = opts === null || opts === void 0 ? void 0 : opts.clearOn) !== null && _d !== void 0 ? _d : null;
    var _caches = [];
    var _thisArg = opts === null || opts === void 0 ? void 0 : opts.thisArg;
    var Wrapper = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var cache, prop, thisArg, id, cached, isPromise, val;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cache = _cache;
                        if (_perInstance === true) {
                            prop = "__$mem_".concat(key);
                            cache = this[prop];
                            if (cache == null) {
                                cache = new Cache_1.Cache(opts);
                                Object.defineProperty(this, prop, {
                                    value: cache,
                                    enumerable: false
                                });
                                _caches.push(cache);
                            }
                        }
                        thisArg = _thisArg !== null && _thisArg !== void 0 ? _thisArg : this;
                        id = (_b = (_a = opts === null || opts === void 0 ? void 0 : opts.key) === null || _a === void 0 ? void 0 : _a.call.apply(_a, __spreadArray([opts, { this: thisArg }], args, false))) !== null && _b !== void 0 ? _b : cache.resolveKey.apply(cache, args);
                        return [4 /*yield*/, cache.getAsync.apply(cache, __spreadArray([id], args, false))];
                    case 1:
                        cached = _c.sent();
                        if (cached != null) {
                            return [2 /*return*/, cached];
                        }
                        isPromise = null;
                        val = fn.apply(thisArg, args);
                        if (_clearOnReject === true) {
                            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                            if (isPromise) {
                                val = val.then(null, function (err) {
                                    cache.clearAsync(id);
                                    return Promise.reject(err);
                                });
                            }
                        }
                        if (_clearOnReady === true) {
                            isPromise = val != null && typeof val === 'object' && typeof val.then === 'function';
                            if (isPromise) {
                                val = val.then(function (result) {
                                    cache.clearAsync(id);
                                    return Promise.resolve(result);
                                }, function (err) {
                                    cache.clearAsync(id);
                                    return Promise.reject(err);
                                });
                            }
                        }
                        if (_clearOn != null) {
                            isPromise = isPromise !== null && isPromise !== void 0 ? isPromise : (val != null && typeof val === 'object' && typeof val.then === 'function');
                            if (isPromise) {
                                val = val.then(function (result) {
                                    if (_clearOn(result)) {
                                        cache.clearAsync(id);
                                    }
                                    return result;
                                });
                            }
                            else if (_clearOn(val)) {
                                // don't even set to cache
                                return [2 /*return*/, val];
                            }
                        }
                        return [2 /*return*/, cache.setAsync(id, val)];
                }
            });
        });
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = _cache.resolveKey.apply(_cache, args);
        _cache.clearAsync(id);
        _caches.forEach(function (x) { return x.clearAsync(id); });
    };
    Wrapper.clearAll = function () {
        _cache.clearAsync();
        _caches.forEach(function (x) { return x.clearAsync(); });
    };
    return Wrapper;
}
function fn_clearMemoized(fn) {
    var _a, _b, _c, _d;
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length === 0) {
        (_b = (_a = fn) === null || _a === void 0 ? void 0 : _a.clearAll) === null || _b === void 0 ? void 0 : _b.call(_a);
        return;
    }
    (_d = (_c = fn) === null || _c === void 0 ? void 0 : _c.clearArgs) === null || _d === void 0 ? void 0 : _d.call.apply(_d, __spreadArray([_c], args, false));
    return;
}
exports.fn_clearMemoized = fn_clearMemoized;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_memoize) && isObject(module.exports)) {
		Object.assign(_src_fn_memoize, module.exports);
		return;
	}
	_src_fn_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_memoize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_memoize = void 0;
var memoize_1 = _src_fn_memoize;
function deco_memoize(opts) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var isGetter = !viaProperty && typeof descriptor.get === 'function';
        var innerFn = viaProperty
            ? target[propertyKey]
            : (isGetter ? descriptor.get : descriptor.value);
        var fn = (0, memoize_1.fn_memoize)(innerFn, opts, propertyKey);
        if (viaProperty) {
            target[propertyKey] = fn;
            return;
        }
        if (isGetter) {
            descriptor.get = fn;
        }
        else {
            descriptor.value = fn;
        }
        return descriptor;
    };
}
exports.deco_memoize = deco_memoize;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_memoize) && isObject(module.exports)) {
		Object.assign(_src_deco_memoize, module.exports);
		return;
	}
	_src_deco_memoize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_debounce;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_debounce = void 0;
var requestFn = typeof requestAnimationFrame === 'undefined' ? setImmediate : requestAnimationFrame;
var clearRequest = typeof requestAnimationFrame === 'undefined' ? clearImmediate : cancelAnimationFrame;
/**
 *
 * @param timeoutMs ms to wait before calling inner fn
 */
function deco_debounce(timeoutMs) {
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        if (viaProperty) {
            descriptor = {
                configurable: true,
                value: target[propertyKey]
            };
        }
        var fn = descriptor.value;
        if (timeoutMs == null || timeoutMs === 0) {
            var frame_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                if (frame_1 !== 0) {
                    clearRequest(frame_1);
                }
                frame_1 = requestFn(function () {
                    frame_1 = 0;
                    fn.apply(self, args);
                });
            };
        }
        else {
            var timer_1 = 0;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var self = this;
                clearTimeout(timer_1);
                timer_1 = setTimeout(function () {
                    fn.apply(self, args);
                }, timeoutMs);
            };
        }
        if (viaProperty) {
            target[propertyKey] = descriptor.value;
            return;
        }
        return descriptor;
    };
}
exports.deco_debounce = deco_debounce;
;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_debounce) && isObject(module.exports)) {
		Object.assign(_src_deco_debounce, module.exports);
		return;
	}
	_src_deco_debounce = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_model_Deferred;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deferred = void 0;
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.isResolved = false;
        this.isRejected = false;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolveFn = resolve;
            _this.rejectFn = reject;
            if (_this.isResolved === true) {
                resolve(_this.resolvedArg);
            }
            if (_this.isRejected === true) {
                reject(_this.rejectedArg);
            }
        });
    }
    Deferred.prototype.resolve = function (arg) {
        if (this.resolveFn) {
            this.resolveFn(arg);
            return;
        }
        this.isResolved = true;
        this.resolvedArg = arg;
    };
    Deferred.prototype.reject = function (arg) {
        if (this.rejectFn) {
            this.rejectFn(arg);
            return;
        }
        this.isRejected = true;
        this.rejectedArg = arg;
    };
    Deferred.prototype.then = function (fnA, fnB) {
        this.promise.then(fnA, fnB);
    };
    return Deferred;
}());
exports.Deferred = Deferred;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_model_Deferred) && isObject(module.exports)) {
		Object.assign(_src_model_Deferred, module.exports);
		return;
	}
	_src_model_Deferred = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_throttle;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_throttle = void 0;
var Args_1 = _src_fn_Args;
var Deferred_1 = _src_model_Deferred;
function deco_throttle(timeWindow, mix) {
    var _a, _b;
    var options = typeof mix === 'boolean'
        ? { shouldCallLater: mix }
        : mix;
    var shouldCallLater = (_a = options === null || options === void 0 ? void 0 : options.shouldCallLater) !== null && _a !== void 0 ? _a : false;
    var perArguments = (_b = options === null || options === void 0 ? void 0 : options.perArguments) !== null && _b !== void 0 ? _b : false;
    var perArgumentInfos = perArguments ? Object.create(null) : null;
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var timer = 0;
        var latestArgs = null;
        var latestCall = 0;
        var promise = null;
        var resultFn = function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _key = perArguments !== true ? null : Args_1.Args.getKey(args);
            var _meta = perArguments !== true ? null : ((_a = perArgumentInfos[_key]) !== null && _a !== void 0 ? _a : (perArgumentInfos[_key] = {
                latestCall: 0,
                latestArgs: null,
                promise: null,
                timer: 0
            }));
            var _latestCall = perArguments ? _meta.latestCall : latestCall;
            var _timer = perArguments ? _meta.timer : timer;
            var self = this;
            var now = Date.now();
            var diff = now - _latestCall;
            if (diff >= timeWindow) {
                latestCall = now;
                if (perArguments) {
                    _meta.latestCall = now;
                }
                if (shouldCallLater !== true) {
                    return fn.apply(self, args);
                }
            }
            latestArgs = args;
            if (perArguments) {
                _meta.latestArgs = args;
            }
            var _promise = perArguments ? _meta.promise : promise;
            if (_timer === 0) {
                _promise = promise = new Deferred_1.Deferred();
                if (perArguments) {
                    _meta.promise = _promise;
                }
                _timer = setTimeout(function () {
                    latestCall = Date.now();
                    timer = 0;
                    if (perArguments) {
                        _meta.latestCall = latestCall;
                        _meta.timer = 0;
                    }
                    var args = perArguments ? _meta.latestArgs : latestArgs;
                    var r = fn.apply(self, args);
                    promise.resolve(r);
                }, diff >= timeWindow ? timeWindow : timeWindow - diff);
                timer = _timer;
                if (perArguments) {
                    _meta.timer = _timer;
                }
            }
            return _promise;
        };
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_throttle = deco_throttle;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_throttle) && isObject(module.exports)) {
		Object.assign(_src_deco_throttle, module.exports);
		return;
	}
	_src_deco_throttle = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fn_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn_queued = void 0;
var Deferred_1 = _src_model_Deferred;
/** For original async method - ensure it is called one after another  */
function fn_queued(fn, opts) {
    if (opts === void 0) { opts = {}; }
    var queue = [];
    var busy = false;
    var lastResultAt = 0;
    var throttle = opts === null || opts === void 0 ? void 0 : opts.throttle;
    var resultFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (opts != null && opts.single === true && queue.length > 0) {
            return queue[0].promise;
        }
        var wrapped = Queued.prepair(fn, this, args, opts);
        if (opts != null && opts.trimQueue && queue.length > 0) {
            queue.splice(0);
        }
        queue.push(wrapped);
        if (busy === false) {
            busy = true;
            tick();
        }
        return wrapped.promise;
    };
    var tick = function () {
        if (queue.length === 0) {
            busy = false;
            return;
        }
        if (throttle != null) {
            var ms = throttle - (Date.now() - lastResultAt);
            if (ms > 0) {
                setTimeout(tick, ms);
                return;
            }
        }
        var x = queue.shift();
        x.always(next);
        x.run();
    };
    var next = function () {
        lastResultAt = Date.now();
        tick();
    };
    return resultFn;
}
exports.fn_queued = fn_queued;
var Queued = {
    prepair: function (innerFn, ctx, args, opts) {
        var dfr = new Deferred_1.Deferred;
        var completed = false;
        var timeout = null;
        return {
            promise: dfr,
            run: function () {
                var result = innerFn.apply(ctx, args);
                if ('then' in result === false) {
                    dfr.resolve(result);
                }
                else {
                    if ((opts === null || opts === void 0 ? void 0 : opts.timeout) > 0) {
                        timeout = setTimeout(function () {
                            if (completed) {
                                return;
                            }
                            dfr.reject(new Error("Queue Worker: the inner function ".concat(innerFn.name, " timeouted: ").concat(opts.timeout)));
                        }, opts.timeout);
                    }
                    result.then(function (_result) {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.resolve(_result);
                    }, function (_error) {
                        if (timeout != null) {
                            clearTimeout(timeout);
                        }
                        if (completed) {
                            return;
                        }
                        completed = true;
                        dfr.reject(_error);
                    });
                }
                return result;
            },
            always: function (fn) {
                dfr.then(fn, fn);
            }
        };
    }
};
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fn_queued) && isObject(module.exports)) {
		Object.assign(_src_fn_queued, module.exports);
		return;
	}
	_src_fn_queued = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_deco_queued;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deco_queued = void 0;
var queued_1 = _src_fn_queued;
function deco_queued(opts) {
    if (opts === void 0) { opts = null; }
    return function (target, propertyKey, descriptor) {
        var viaProperty = descriptor == null;
        var fn = viaProperty ? target[propertyKey] : descriptor.value;
        var resultFn = (0, queued_1.fn_queued)(fn, opts);
        if (viaProperty) {
            target[propertyKey] = resultFn;
            return;
        }
        descriptor.value = resultFn;
        return descriptor;
    };
}
exports.deco_queued = deco_queued;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_deco_queued) && isObject(module.exports)) {
		Object.assign(_src_deco_queued, module.exports);
		return;
	}
	_src_deco_queued = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_FsTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FsTransport = void 0;
var FsTransport = /** @class */ (function () {
    function FsTransport(opts) {
        this.opts = opts;
        this._file = null;
        this.isAsync = true;
        if (typeof process === 'undefined' || typeof process.exit !== 'function') {
            throw new Error('NodeJS expected');
        }
        var r = require;
        var module = 'atma-io';
        var FileSafe = r(module).FileSafe;
        this._file = new FileSafe(this.opts.path, { threadSafe: true });
    }
    FsTransport.prototype.restoreAsync = function () {
        return __awaiter(this, void 0, void 0, function () {
            var json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._file.readAsync()];
                    case 1:
                        json = _a.sent();
                        return [2 /*return*/, typeof json === 'string'
                                ? JSON.parse(json)
                                : json];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FsTransport.prototype.flushAsync = function (coll) {
        return __awaiter(this, void 0, void 0, function () {
            var json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        json = JSON.stringify(coll);
                        return [4 /*yield*/, this._file.writeAsync(json)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return FsTransport;
}());
exports.FsTransport = FsTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_FsTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_FsTransport, module.exports);
		return;
	}
	_src_persistance_FsTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_persistance_LocalStorageTransport;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageTransport = void 0;
var LocalStorageTransport = /** @class */ (function () {
    function LocalStorageTransport(opts) {
        this.opts = opts;
        this.isAsync = false;
        if (typeof localStorage === 'undefined' || typeof localStorage.setItem !== 'function') {
            throw new Error('Browser expected');
        }
    }
    LocalStorageTransport.prototype.restore = function () {
        try {
            return JSON.parse(localStorage.getItem(this.opts.key));
        }
        catch (error) {
        }
    };
    LocalStorageTransport.prototype.flush = function (coll) {
        try {
            localStorage.getItem(JSON.stringify(this.opts.key));
        }
        catch (error) {
        }
    };
    return LocalStorageTransport;
}());
exports.LocalStorageTransport = LocalStorageTransport;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_persistance_LocalStorageTransport) && isObject(module.exports)) {
		Object.assign(_src_persistance_LocalStorageTransport, module.exports);
		return;
	}
	_src_persistance_LocalStorageTransport = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_workers_CachedWorker;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachedWorker = void 0;
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var Cache_1 = _src_Cache;
var CachedWorker = /** @class */ (function () {
    function CachedWorker(opts) {
        var _a;
        this.opts = opts;
        var persistance = (_a = opts.persistance) !== null && _a !== void 0 ? _a : this.getTransport();
        if (persistance) {
            persistance.debounceMs = 0;
        }
        this.cache = new Cache_1.Cache({
            persistance: persistance,
            maxAge: opts.maxAge,
            monitors: opts.monitors,
        });
        this.worker = opts.worker;
    }
    CachedWorker.prototype.getTransport = function () {
        var t = this.opts.transport;
        if (t == null) {
            return null;
        }
        if ('path' in t) {
            return new FsTransport_1.FsTransport(t);
        }
        if ('key' in t) {
            return new LocalStorageTransport_1.LocalStorageTransport(t);
        }
        throw new Error('Invalid transport options');
    };
    CachedWorker.prototype.run = function () {
        var result = this.cache.get('result');
        if (result != null) {
            return result;
        }
        result = this.worker();
        this.cache.set('result', result);
        return result;
    };
    CachedWorker.prototype.runAsync = function () {
        var _a;
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            return __generator(this, function (_b) {
                return [2 /*return*/, (_a = this.workerDfr) !== null && _a !== void 0 ? _a : (this.workerDfr = (function () { return __awaiter(_this, void 0, void 0, function () {
                        var result;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.cache.getAsync('result')];
                                case 1:
                                    result = _a.sent();
                                    if (result) {
                                        return [2 /*return*/, result];
                                    }
                                    return [4 /*yield*/, this.opts.worker()];
                                case 2:
                                    result = _a.sent();
                                    return [4 /*yield*/, this.cache.setAsync('result', result)];
                                case 3:
                                    _a.sent();
                                    return [2 /*return*/, result];
                            }
                        });
                    }); })())];
            });
        });
    };
    CachedWorker.run = function (opts) {
        return new CachedWorker(opts).run();
    };
    CachedWorker.runAsync = function (opts) {
        return new CachedWorker(opts).runAsync();
    };
    return CachedWorker;
}());
exports.CachedWorker = CachedWorker;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_workers_CachedWorker) && isObject(module.exports)) {
		Object.assign(_src_workers_CachedWorker, module.exports);
		return;
	}
	_src_workers_CachedWorker = module.exports;
}());
// end:source ./ModuleSimplified.js

"use strict";
var memoize_1 = _src_deco_memoize;
var debounce_1 = _src_deco_debounce;
var throttle_1 = _src_deco_throttle;
var queued_1 = _src_deco_queued;
var memoize_2 = _src_fn_memoize;
var Cache_1 = _src_Cache;
var FsTransport_1 = _src_persistance_FsTransport;
var LocalStorageTransport_1 = _src_persistance_LocalStorageTransport;
var CachedWorker_1 = _src_workers_CachedWorker;
var queued_2 = _src_fn_queued;
var Memd = /** @class */ (function () {
    function Memd() {
    }
    Memd.Cache = Cache_1.Cache;
    Memd.fn = {
        memoize: memoize_2.fn_memoize,
        queued: queued_2.fn_queued,
        clearMemoized: memoize_2.fn_clearMemoized
    };
    Memd.deco = {
        memoize: memoize_1.deco_memoize,
        throttle: throttle_1.deco_throttle,
        debounce: debounce_1.deco_debounce,
        queued: queued_1.deco_queued
    };
    Memd.FsTransport = FsTransport_1.FsTransport;
    Memd.LocalStorageTransport = LocalStorageTransport_1.LocalStorageTransport;
    Memd.CachedWorker = CachedWorker_1.CachedWorker;
    return Memd;
}());
Memd.default = Memd;
module.exports = Memd;


}));

// end:source ./UMD.js
;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_node_modules_memd_lib_memd === module.exports) {
        // do nothing if
    } else if (__isObj(_node_modules_memd_lib_memd) && __isObj(module.exports)) {
        Object.assign(_node_modules_memd_lib_memd, module.exports);
    } else {
        _node_modules_memd_lib_memd = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__domains;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__domains != null ? _src_utils__domains : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$domains = void 0;
var $domains;
(function ($domains) {
    let rgxDomain = /^(?<protocol>\w+):[\/]{1,3}(?<base>[\w\-\.]+)/;
    function fromUrl(url) {
        let match = rgxDomain.exec(url);
        if (match == null) {
            throw new Error(`Invalid URL: ${url}`);
        }
        return match[0];
    }
    $domains.fromUrl = fromUrl;
    function equal(urlA, urlB) {
        if (urlB == null) {
            return false;
        }
        let a = fromUrl(urlA);
        let b = fromUrl(urlB);
        let rgxProtocol = /\w+:[\/]{1, 3}/;
        a = a.replace(rgxProtocol, '');
        b = b.replace(rgxProtocol, '');
        return a.toLowerCase() === b.toLowerCase();
    }
    $domains.equal = equal;
})($domains = exports.$domains || (exports.$domains = {}));
//# sourceMappingURL=$domains.js.map
//# sourceMappingURL=$domains.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__domains === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__domains) && __isObj(module.exports)) {
        Object.assign(_src_utils__domains, module.exports);
    } else {
        _src_utils__domains = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_DriverPool;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_DriverPool != null ? _src_webdriver_DriverPool : {};
    var module = { exports: exports };

    "use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverPool = exports.DriverWrapper = exports.DriverPool = void 0;
const atma_utils_1 = require("atma-utils");
const SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
const driver_1 = _src_webdriver_utils_driver;
const CookieContainer_1 = _src_common_CookieContainer;
const memd = _node_modules_memd_lib_memd;
const _domains_1 = _src_utils__domains;
let POOL_DEFAULT = 5;
let POOL_CUSTOM;
class DriverPool {
    constructor() {
        this.pool = [];
        this.queue = [];
    }
    async get(url = null, config, setts) {
        if (setts) {
            let driver = DriverExtractor.extractDriver(setts.query);
            if (driver) {
                if (this.singleton && this.singleton.driver === driver) {
                    this.singleton.busy = true;
                    return this.singleton;
                }
                let wrapper = this.pool.find(x => x.driver === driver);
                if (wrapper == null) {
                    wrapper = new DriverWrapper();
                    wrapper.driver = driver;
                    wrapper.busy = true;
                    wrapper.requestedAt = new Date();
                    this.pool.push(wrapper);
                }
                return wrapper;
            }
            if (setts.pool) {
                if (typeof setts.pool === 'number') {
                    POOL_CUSTOM = Math.max(setts.pool, this.pool.length);
                }
                return await this.requestDriver(url, config);
            }
        }
        return await this.getGlobal(url, config);
    }
    async getWithDomain(url = null, config, setts) {
        let wrapper = await this.get(url, config, setts);
        let domain = _domains_1.$domains.fromUrl(url);
        let currentUrl = await wrapper.driver.getCurrentUrl();
        if (_domains_1.$domains.equal(domain, currentUrl) === false) {
            // Load page in DOMAIN context
            await wrapper.driver.get(domain);
        }
        return wrapper;
    }
    async unlockDriver(mix) {
        let driver = DriverExtractor.extractDriver(mix);
        if (driver == null || this.pool.length === 0) {
            return;
        }
        let wrapper = this.pool.find(x => x.driver === driver);
        if (wrapper == null) {
            console.warn('SeleniumQuery. Unlock driver. Wrapper not found');
            return;
        }
        wrapper.busy = false;
        // Tick next awaiter
        let dfrData = this.queue.shift();
        if (dfrData) {
            wrapper.busy = true;
            await wrapper.ensureCookies(dfrData.url, dfrData.config);
            dfrData.dfr.resolve(wrapper);
        }
    }
    async getGlobal(url = null, config) {
        this.memCookies(url, config);
        let singleton = new DriverWrapper();
        await singleton.build(config);
        await singleton.ensureCookies(url, config);
        return (this.singleton = singleton);
    }
    extractDriver(query) {
        return DriverExtractor.extractDriver(query);
    }
    async requestDriver(url = null, config) {
        this.memCookies(url, config);
        let free = this.pool.find(x => x.busy !== true);
        if (free) {
            free.busy = true;
            await free.ensureCookies(url, config);
            return free;
        }
        if (this.pool.length < getPoolCount()) {
            let wrapper = new DriverWrapper();
            wrapper.busy = true;
            wrapper.requestedAt = new Date;
            this.pool.push(wrapper);
            await wrapper.build(config);
            await wrapper.ensureCookies(url, config);
            return wrapper;
        }
        let dfr = new atma_utils_1.class_Dfr();
        this.queue.push({ url, config, dfr });
        return dfr;
    }
    memCookies(url, config) {
        if (config?.cookies) {
            CookieContainer_1.cookieContainer.addCookies(url, config.cookies);
        }
    }
    setGlobal(driver) {
        this.singleton = new DriverWrapper();
        this.singleton.busy = false;
        this.singleton.driver = driver;
    }
}
__decorate([
    memd.deco.memoize()
], DriverPool.prototype, "getGlobal", null);
exports.DriverPool = DriverPool;
class DriverWrapper {
    constructor() {
        this.busy = false;
    }
    async build(config) {
        this.driver = await (0, SeleniumDriver_1.buildDriver)(config);
    }
    async ensureCookies(url, config) {
        let cookies = CookieContainer_1.cookieContainer.getCookies(url);
        if (!cookies || cookies === this.cookies) {
            return;
        }
        this.cookies = cookies;
        await (0, driver_1.ensureCookies)(this.driver, url, cookies, config);
    }
}
exports.DriverWrapper = DriverWrapper;
function getPoolCount() {
    return POOL_CUSTOM == null ? POOL_DEFAULT : POOL_CUSTOM;
}
exports.driverPool = new DriverPool();
var DriverExtractor;
(function (DriverExtractor) {
    function isElement(mix) {
        return mix != null && 'getDriver' in mix;
    }
    function isDriver(mix) {
        return mix != null && 'get' in mix && 'manage' in mix;
    }
    function fromQuery(mix) {
        let el = mix[0];
        if (isDriver(el)) {
            // is driver itself
            return el;
        }
        if (isElement(el)) {
            return el.getDriver();
        }
        return null;
    }
    function fromOwner(mix) {
        let owner = mix.ctx && mix.ctx.owner;
        let stack = [];
        while (owner != null) {
            let driver = fromQuery(owner);
            if (driver) {
                return driver;
            }
            stack.push(owner);
            owner = owner.ctx && owner.ctx.owner;
            if (stack.indexOf(owner) !== -1) {
                return null;
            }
        }
    }
    function fromWrapper(mix) {
        if (isDriver(mix)) {
            return mix;
        }
        if ('driver' in mix && 'busy' in mix) {
            return mix.driver;
        }
        return null;
    }
    function extractDriver(mix) {
        if (mix == null) {
            return null;
        }
        var driver = fromQuery(mix);
        if (driver) {
            return driver;
        }
        var driver = fromOwner(mix);
        if (driver) {
            return driver;
        }
        var driver = fromWrapper(mix);
        if (driver) {
            return driver;
        }
        return null;
    }
    DriverExtractor.extractDriver = extractDriver;
})(DriverExtractor || (DriverExtractor = {}));
//# sourceMappingURL=DriverPool.js.map
//# sourceMappingURL=DriverPool.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_DriverPool === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_DriverPool) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_DriverPool, module.exports);
    } else {
        _src_webdriver_DriverPool = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_utils_driver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_utils_driver != null ? _src_webdriver_utils_driver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForPageLoad = exports.waitForElement = exports.driver_evalAsync = exports.ensureCookies = exports.loadUrl = void 0;
const dfr_1 = _src_utils_dfr;
const async_1 = _src_utils_async;
const DriverPool_1 = _src_webdriver_DriverPool;
const WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
const atma_utils_1 = require("atma-utils");
const node_1 = _src_webdriver_utils_node;
function loadUrl(driver, url, config) {
    return driver
        .get(url)
        .then(() => driver, (error) => {
        return error;
        // if (error.code !== 100) {
        //     return error;
        // }
        // return BuildStatics
        //     .build(config)
        //     .then(driver => {
        //         return driver
        //             .get(url)
        //             .then(() => driver);
        //     });
    });
}
exports.loadUrl = loadUrl;
function ensureCookies(driver, url, cookies, config) {
    return (0, dfr_1.dfr_run)((resolve, reject) => {
        if (!cookies) {
            resolve();
            return;
        }
        let arr = cookies.split(';').map(x => x.trim()).map(single => {
            let i = single.indexOf('=');
            let name = single.substring(0, i).trim();
            let value = single.substring(i + 1).trim();
            return { name, value };
        });
        ;
        let origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }
        loadUrl(driver, origin, config).then(driver => {
            let dfrs = arr.map(cookie => driver.manage().addCookie(cookie));
            (0, async_1._when)(dfrs, () => {
                resolve();
            });
        });
    });
}
exports.ensureCookies = ensureCookies;
function driver_evalAsync(el, mix, ...args) {
    let set = WebdriverQuery_1.WebdriverQuery.newAsync(void 0, el);
    let script = (0, node_1.node_toScript)(mix);
    let driver = DriverPool_1.driverPool.extractDriver(el);
    if (driver == null) {
        set.reject(new Error('Driver is not resolved.'));
        return set;
    }
    driver
        .executeAsyncScript(script, ...args)
        .then((result) => {
        set.resolve(Promise.resolve(result));
    }, error => {
        console.error('Unexpected browser error', error);
        set.reject(error);
    });
    return set;
}
exports.driver_evalAsync = driver_evalAsync;
function waitForElement(query, selector) {
    let driver = DriverPool_1.driverPool.extractDriver(query);
    let set = WebdriverQuery_1.WebdriverQuery.newAsync(void 0, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return;
    }
    waitForTrue(async () => {
        let $ = await query.find(selector);
        return $.length > 0;
    }, 10000).then(() => {
        query.find(selector).then(x => set.resolve(x), err => set.reject(err));
    }, (err) => set.reject(err));
    return set;
}
exports.waitForElement = waitForElement;
function waitForPageLoad(query, waitForState = 'complete') {
    let driver = DriverPool_1.driverPool.extractDriver(query);
    let set = WebdriverQuery_1.WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error(`Driver not found in set`));
        return set;
    }
    let delay = WaitForPageLoad.delay();
    let q = (0, async_1.async_toThenable)(query);
    (0, async_1.async_all)([q, delay]).then(([query]) => {
        let awaiters = [
            () => WaitForPageLoad.documentState(driver, 5000, waitForState),
        ];
        if (query.length > 0 && query[0] !== driver) {
            /* If element is passed, listen also for the element to be destroyed on page unload */
            let el = query[0];
            awaiters.unshift(() => WaitForPageLoad.elementLeavesDom(driver, el, 5000));
        }
        (0, async_1.async_waterfallFn)(...awaiters).then(() => {
            set.add(driver);
            set.resolve(set);
        }, error => set.reject(error));
    });
    return set;
}
exports.waitForPageLoad = waitForPageLoad;
var WaitForPageLoad;
(function (WaitForPageLoad) {
    function delay() {
        let dfr = new atma_utils_1.class_Dfr;
        setTimeout(() => dfr.resolve(), 100);
        return dfr;
    }
    WaitForPageLoad.delay = delay;
    function documentState(driver, timeout, waitForState = 'complete') {
        let dfr = new atma_utils_1.class_Dfr;
        waitForTrue(isReady, timeout).then(() => {
            dfr.resolve();
        }, error => {
            dfr.reject(new Error(`ReadyState timeout`));
        });
        return dfr;
        function isReady() {
            return driver
                .executeScript('return document.readyState')
                .then(state => {
                if (waitForState === 'interactive') {
                    return state === 'interactive' || state === 'complete';
                }
                return state === waitForState;
            });
        }
    }
    WaitForPageLoad.documentState = documentState;
    function elementLeavesDom(driver, el, timeout) {
        let dfr = new atma_utils_1.class_Dfr;
        waitForTrue(isStale, timeout).then(x => {
            dfr.resolve();
        }, error => {
            dfr.reject(new Error(`The old element is still in dom after ${timeout}ms. Reload is not triggered`));
        });
        return dfr;
        function isStale() {
            return (0, dfr_1.dfr_run)((resolve, reject) => {
                el.getTagName().then(x => {
                    resolve(false);
                }, x => {
                    // waiting for StaleElementReferenceError
                    resolve(true);
                });
            });
        }
    }
    WaitForPageLoad.elementLeavesDom = elementLeavesDom;
})(WaitForPageLoad || (WaitForPageLoad = {}));
function waitForTrue(check, timeout) {
    let dfr = new atma_utils_1.class_Dfr;
    let time = Date.now();
    function tick() {
        check().then(function (state) {
            if (state === true) {
                dfr.resolve();
                return;
            }
            if (Date.now() - time > timeout) {
                dfr.reject(new Error('Timeout error'));
                return;
            }
            setTimeout(tick, 400);
        }, error => dfr.reject(error));
    }
    tick();
    return dfr;
}
//# sourceMappingURL=driver.js.map
//# sourceMappingURL=driver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_utils_driver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_utils_driver) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_utils_driver, module.exports);
    } else {
        _src_webdriver_utils_driver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_scripts_http_fetch;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_scripts_http_fetch != null ? _src_webdriver_scripts_http_fetch : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts_fetchAsync = void 0;
function scripts_fetchAsync() {
    var url = arguments[0];
    var opts = null;
    if (arguments.length > 2) {
        opts = arguments[1];
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
                }
                else {
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
exports.scripts_fetchAsync = scripts_fetchAsync;
//# sourceMappingURL=fetch.js.map
//# sourceMappingURL=fetch.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_scripts_http_fetch === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_scripts_http_fetch) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_scripts_http_fetch, module.exports);
    } else {
        _src_webdriver_scripts_http_fetch = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_WebdriverFormData;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_WebdriverFormData != null ? _src_webdriver_WebdriverFormData : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebdriverFormData = void 0;
class WebdriverFormData {
    constructor($, form, formId) {
        this.$ = $;
        this.form = form;
        this.formId = formId;
    }
    async append(name, value) {
        if (value == null) {
            return this;
        }
        let isFile = typeof value === 'object' && 'file' in value;
        let _type = isFile ? 'file' : null;
        let _value = isFile ? null : value;
        let input = await this.$.eval(function () {
            let form = arguments[0];
            let name = arguments[1];
            let type = arguments[2];
            let value = arguments[3];
            let input = document.createElement('input');
            input.setAttribute('name', name);
            if (type != null) {
                input.setAttribute('type', type);
            }
            if (value != null) {
                input.setAttribute('value', value);
            }
            form.appendChild(input);
            return input;
        }, this.form, name, _type, _value);
        if (isFile) {
            await input.sendKeys(value.file);
        }
        return this;
    }
    static async create($) {
        let formId = `${Date.now()}_${Math.round(Math.random() * 10000)}`;
        let form = await $.eval(function () {
            let formId = arguments[0];
            let form = document.createElement('form');
            form.setAttribute('style', 'display: none');
            form.setAttribute('id', formId);
            document.body.appendChild(form);
            return form;
        }, formId);
        return new WebdriverFormData($, form, formId);
    }
}
exports.WebdriverFormData = WebdriverFormData;
//# sourceMappingURL=WebdriverFormData.js.map
//# sourceMappingURL=WebdriverFormData.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_WebdriverFormData === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_WebdriverFormData) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_WebdriverFormData, module.exports);
    } else {
        _src_webdriver_WebdriverFormData = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_FormDataBase;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_common_FormDataBase != null ? _src_common_FormDataBase : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormDataBase = void 0;
const alot = require("alot");
class FormDataBase {
    constructor() {
        this.dict = Object.create(null);
    }
    append(key, value) {
        this.dict[key] = value;
        return this;
    }
    entries() {
        return alot
            .fromObject(this.dict).map(x => [x.key, x.value])
            .toArray();
    }
}
exports.FormDataBase = FormDataBase;
//# sourceMappingURL=FormDataBase.js.map
//# sourceMappingURL=FormDataBase.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_common_FormDataBase === module.exports) {
        // do nothing if
    } else if (__isObj(_src_common_FormDataBase) && __isObj(module.exports)) {
        Object.assign(_src_common_FormDataBase, module.exports);
    } else {
        _src_common_FormDataBase = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils__headers;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils__headers != null ? _src_utils__headers : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$headers = void 0;
var $headers;
(function ($headers) {
    function resolve(headers) {
        if (headers == null) {
            return {};
        }
        if (typeof headers === 'string') {
            let hash = Object.create(null);
            headers
                .split('\n')
                .map(x => x.trim())
                .filter(Boolean)
                .forEach(line => {
                let semi = line.indexOf(':');
                if (semi === -1) {
                    throw new Error(`Invalid header delimter. ":" expected. ${line} in ${headers}`);
                }
                let key = line.substring(0, semi).trim();
                let val = line.substring(semi + 1).trim();
                hash[key] = val;
            });
            return hash;
        }
        return headers;
    }
    $headers.resolve = resolve;
})($headers = exports.$headers || (exports.$headers = {}));
//# sourceMappingURL=$headers.js.map
//# sourceMappingURL=$headers.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils__headers === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils__headers) && __isObj(module.exports)) {
        Object.assign(_src_utils__headers, module.exports);
    } else {
        _src_utils__headers = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_Webdriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_Webdriver != null ? _src_webdriver_Webdriver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webdriver = void 0;
const driver_1 = _src_webdriver_utils_driver;
const DriverPool_1 = _src_webdriver_DriverPool;
const atma_utils_1 = require("atma-utils");
const WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
const SelectorsEx_1 = _src_common_SelectorsEx;
const fetch_1 = _src_webdriver_scripts_http_fetch;
const WebdriverFormData_1 = _src_webdriver_WebdriverFormData;
const FormDataBase_1 = _src_common_FormDataBase;
const alot_1 = require("alot");
const _headers_1 = _src_utils__headers;
exports.Webdriver = {
    fromHtml(html, config) {
        return exports.Webdriver.load(`data:text/html;charset=utf-8,${html}`, config);
    },
    build(config, setts) {
        let query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(null, config, setts)
            .then(wrapper => {
            query.add(wrapper.driver);
            query.resolve(query);
        }, error => {
            query.reject(error);
        });
        return query;
    },
    load(url, config, setts) {
        if (url[0] === '/') {
            url = 'file://' + process.cwd() + url;
        }
        let query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(url, config, setts)
            .then(wrapper => {
            (0, driver_1.loadUrl)(wrapper.driver, url, config).then(driver => {
                query.add(driver);
                query.resolve(query);
            });
        }, error => query.reject(error));
        return query;
    },
    unlockDriver(mix) {
        DriverPool_1.driverPool.unlockDriver(mix);
    },
    async fetch(url, config, setts) {
        let wrapper = await DriverPool_1.driverPool.getWithDomain(config?.baseUrl ?? url, config, setts);
        if (config.body instanceof FormDataBase_1.FormDataBase) {
            let $ = new WebdriverQuery_1.WebdriverQuery(wrapper.driver);
            let formData = await WebdriverFormData_1.WebdriverFormData.create($);
            await (0, alot_1.default)(config.body.entries()).forEachAsync(async ([key, value]) => {
                await formData.append(key, value);
            }).toArrayAsync({ threads: 1 });
            config.body = formData.form;
        }
        let fetchOpts = {
            ...(setts?.opts ?? {}),
            body: setts?.opts?.body ?? config.body,
            headers: setts?.opts?.headers ?? config.headers,
            method: setts?.opts?.method ?? config.method,
        };
        if (typeof fetchOpts.headers === 'string') {
            fetchOpts.headers = _headers_1.$headers.resolve(fetchOpts.headers);
        }
        let result = await wrapper
            .driver
            .executeAsyncScript(fetch_1.scripts_fetchAsync, url, fetchOpts);
        if (result == null) {
            throw new Error(`Response from the script is undefined`);
        }
        let isError = result.name === 'Error';
        if (isError) {
            DriverPool_1.driverPool.unlockDriver(wrapper);
            throw result;
        }
        let data = result.data;
        if (data != null && typeof data === 'object') {
            if ('findElements' in data || ((0, atma_utils_1.is_ArrayLike)(data) && data.length !== 0 && 'findElements' in data[0])) {
                // Consumer is responsible to unlock later the driver
                let $ = new WebdriverQuery_1.WebdriverQuery(data);
                return {
                    ...result,
                    data: $
                };
            }
        }
        DriverPool_1.driverPool.unlockDriver(wrapper);
        return result;
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
function object_clean(fetchOpts) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=Webdriver.js.map
//# sourceMappingURL=Webdriver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_Webdriver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_Webdriver) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_Webdriver, module.exports);
    } else {
        _src_webdriver_Webdriver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_humanize;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_humanize != null ? _src_utils_humanize : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Humanize = void 0;
var Humanize;
(function (Humanize) {
    let Time;
    (function (Time) {
        function getSeconds(str) {
            let rgx = /^(\d+)(s|sec|seconds|m|mins?|h|hours?|d|days?|w|weeks?|months?|y|years?)$/;
            let match = rgx.exec(str);
            if (match == null) {
                throw new Error(`Invalid Humanize seconds. Pattern: ${rgx.toString()}. Got: ${str}`);
            }
            let val = parseFloat(match[1]);
            let unit = match[2];
            switch (unit) {
                case 's':
                case 'sec':
                    return val;
                case 'm':
                case 'min':
                case 'mins':
                    return val * 60;
                case 'h':
                case 'hour':
                case 'hours':
                    return val * 60 * 60;
                case 'd':
                case 'day':
                case 'days':
                    return val * 60 * 60 * 24;
                case 'w':
                case 'week':
                case 'weeks':
                    return val * 60 * 60 * 24 * 7;
                case 'month':
                case 'months':
                    return val * 60 * 60 * 24 * 31;
                case 'y':
                case 'year':
                case 'years':
                    return val * 60 * 60 * 24 * 365;
            }
            return 0;
        }
        Time.getSeconds = getSeconds;
    })(Time = Humanize.Time || (Humanize.Time = {}));
})(Humanize = exports.Humanize || (exports.Humanize = {}));
//# sourceMappingURL=humanize.js.map
//# sourceMappingURL=humanize.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_humanize === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_humanize) && __isObj(module.exports)) {
        Object.assign(_src_utils_humanize, module.exports);
    } else {
        _src_utils_humanize = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_url;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_url != null ? _src_utils_url : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeCachableUrl = exports.serializeUrl = void 0;
function serializeUrl(url, config = {}) {
    if (url.includes('://localhost')) {
        url.replace('://localhost', '://127.0.0.1');
    }
    if (config.query) {
        let q = '';
        for (let key in config.query) {
            if (url.includes(`${key}=`)) {
                continue;
            }
            let p = `${key}=${encodeURIComponent(config.query[key])}`;
            q += (q ? '&' : '') + p;
        }
        if (q) {
            url += (url.includes('?') ? '&' : '?') + q;
        }
    }
    return url;
}
exports.serializeUrl = serializeUrl;
function serializeCachableUrl(url, config) {
    url = url.replace(/(?<!:)[/]{2,}/g, '/');
    let ignore = config.cacheQueryIgnore;
    if (ignore) {
        ignore.forEach(x => {
            url = url.replace(new RegExp(`&${x}=[\\w\\d]+`), '');
            url = url.replace(new RegExp(`\\?${x}=[\\w\\d]+`), '?');
        });
    }
    return serializeUrl(url, config);
}
exports.serializeCachableUrl = serializeCachableUrl;
//# sourceMappingURL=url.js.map
//# sourceMappingURL=url.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_url === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_url) && __isObj(module.exports)) {
        Object.assign(_src_utils_url, module.exports);
    } else {
        _src_utils_url = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_Cache;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fetch_Cache != null ? _src_fetch_Cache : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.Cache = void 0;
const crypto = require("crypto");
const atma_io_1 = require("atma-io");
const zlib = require("zlib");
const humanize_1 = _src_utils_humanize;
const url_1 = _src_utils_url;
const CACHE_BASE = './cache/squery';
class Cache {
    constructor() {
        this.meta = null;
        this.isFlushDeferred = false;
    }
    hasInner(url, config, { isAsync = false } = {}) {
        if (config.cache == null || config.cache === false) {
            return false;
        }
        url = (0, url_1.serializeCachableUrl)(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = domainCache[url] ?? domainCache[url.toLowerCase()];
        if (meta == null) {
            return false;
        }
        return atma_io_1.File[isAsync ? 'exists' : 'existsAsync'](`${CACHE_BASE}/${domainKey}/${meta.file}`);
    }
    has(url, config) {
        return this.hasInner(url, config, { isAsync: false });
    }
    hasAsync(url, config) {
        return this.hasInner(url, config, { isAsync: true });
    }
    remove(url, config) {
        url = (0, url_1.serializeCachableUrl)(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = domainCache[url] ?? domainCache[url.toLowerCase()];
        if (meta == null) {
            return null;
        }
        delete this.meta[domainKey][url];
        this.flushMeta(domainKey);
    }
    async get(url, config) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        url = (0, url_1.serializeCachableUrl)(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = domainCache[url] ?? domainCache[url.toLowerCase()];
        if (meta == null) {
            return null;
        }
        let now = Date.now();
        let seconds = ((now - meta.time) / 1000) | 0;
        let maxAge = Utils.getMaxAge(config.cache, meta);
        if (maxAge && seconds > maxAge) {
            return null;
        }
        let withCompression = meta.file.endsWith('.gz');
        let encoding = (withCompression ? 'buffer' : 'utf8');
        let result = await new atma_io_1.File(`${CACHE_BASE}/${domainKey}/${meta.file}`, { cached: false }).readAsync({ encoding });
        if (withCompression) {
            let str = await Compression.decompress(result);
            result = JSON.parse(str);
        }
        if (result.file != null) {
            result.body = await new atma_io_1.File(`${CACHE_BASE}/${domainKey}/${result.file}`, { cached: false }).readAsync({ encoding: 'buffer' });
            delete result.file;
        }
        return result;
    }
    save(url, config, resp) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        if (!resp.body || resp.status >= 400) {
            // Do not cache failed and empty responses
            return null;
        }
        let cache = typeof config.cache !== 'boolean' ? config.cache : {
            compress: true,
            maxAge: 24 * 60 * 60
        };
        if (config.cache === true) {
            cache = {
                compress: true,
            };
        }
        url = (0, url_1.serializeCachableUrl)(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let md5 = crypto.createHash('md5').update(url).digest('hex');
        let file = `${md5}.json`;
        let withCompression = cache.compress;
        if (withCompression) {
            file += '.gz';
        }
        this.meta[domainKey][url] = {
            time: Date.now(),
            file: file,
            maxAge: Utils.getMaxAge(cache)
        };
        this.flushMeta(domainKey);
        let json = {
            status: resp.status,
            headers: resp.headers,
            url: resp.url,
            body: resp.body
        };
        let contentType = resp.headers['content-type'];
        let isText = /json|text/.test(contentType);
        if (isText === false) {
            let match = /\.[\w\d]+$/.exec(url);
            let ext = match[0];
            let path = `${CACHE_BASE}/${domainKey}/files/${md5}${ext}`;
            let file = new atma_io_1.File(path, { cached: false });
            file.writeAsync(resp.body);
            json.file = `files/${md5}${ext}`;
            delete json.body;
        }
        if (!withCompression) {
            new atma_io_1.File(`${CACHE_BASE}/${domainKey}/${file}`, { cached: false }).writeAsync(json);
            return;
        }
        let str = JSON.stringify(json);
        Compression.compress(Buffer.from(str)).then(buffer => {
            new atma_io_1.File(`${CACHE_BASE}/${domainKey}/${file}`, { cached: false }).writeAsync(buffer);
        });
    }
    ensureMeta(domainKey) {
        if (this.meta != null && this.meta[domainKey] != null) {
            return;
        }
        if (this.meta == null) {
            this.meta = {};
        }
        let file = `${CACHE_BASE}/${domainKey}/meta.json`;
        if (atma_io_1.File.exists(file)) {
            this.meta[domainKey] = atma_io_1.File.read(file);
        }
        else {
            this.meta[domainKey] = {};
        }
    }
    flushMeta(domainKey) {
        if (this.isFlushDeferred) {
            return;
        }
        this.isFlushDeferred = true;
        setTimeout(async () => {
            try {
                await atma_io_1.File.writeAsync(`${CACHE_BASE}/${domainKey}/meta.json`, this.meta[domainKey]);
            }
            finally {
                this.isFlushDeferred = false;
            }
            ;
        }, 1000);
    }
}
exports.Cache = Cache;
class Compression {
    static compress(buffer) {
        return new Promise((resolve, reject) => {
            zlib.deflate(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
    static decompress(buffer) {
        return new Promise((resolve, reject) => {
            zlib.unzip(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer.toString('utf8'));
            });
        });
    }
}
var Utils;
(function (Utils) {
    function getDomainKey(url) {
        let domainMatch = /([\w\d_\-]+\.[\w]{2,5})([\/:]|$)/.exec(url);
        if (domainMatch) {
            return domainMatch[1].replace('.', '_');
        }
        return '';
    }
    Utils.getDomainKey = getDomainKey;
    function getMaxAge(configCache, configMeta) {
        return $getMaxAge(configCache) ?? $getMaxAge(configMeta) ?? 0;
    }
    Utils.getMaxAge = getMaxAge;
    function $getMaxAge(cache) {
        if (cache == null) {
            return true;
        }
        if (cache === false) {
            return 0;
        }
        if (cache === true) {
            return Number.MAX_SAFE_INTEGER;
        }
        let maxAge = cache.maxAge;
        if (typeof maxAge === 'string') {
            return humanize_1.Humanize.Time.getSeconds(maxAge);
        }
        return maxAge;
    }
})(Utils || (Utils = {}));
exports.cache = new Cache;
//# sourceMappingURL=Cache.js.map
//# sourceMappingURL=Cache.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fetch_Cache === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fetch_Cache) && __isObj(module.exports)) {
        Object.assign(_src_fetch_Cache, module.exports);
    } else {
        _src_fetch_Cache = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_Body;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fetch_Body != null ? _src_fetch_Body : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = void 0;
const atma_utils_1 = require("atma-utils");
var Body;
(function (Body) {
    function handleAsRawObject(opts) {
        let mime = opts.headers?.['content-type'] ?? opts.headers?.['Content-Type'];
        if (mime == null) {
            mime = 'application/json; charset=UTF-8';
            opts.headers = (0, atma_utils_1.obj_extend)(opts.headers, {
                'Content-Type': mime
            });
        }
        if (mime.includes('/json')) {
            opts.body = JSON.stringify(opts.body);
            return;
        }
        if (mime.includes('form-urlencoded')) {
            const { URLSearchParams } = require('url');
            const params = new URLSearchParams();
            const obj = flatternObject(opts.body);
            for (let key in obj) {
                params.append(key, obj[key]);
            }
            opts.body = params;
            return;
        }
        if (mime.includes('form-data')) {
            const FormData = require('form-data');
            const form = new FormData();
            const obj = flatternObject(opts.body);
            for (let key in obj) {
                form.append(key, obj[key]);
            }
            opts.body = form;
            return;
        }
    }
    Body.handleAsRawObject = handleAsRawObject;
    function flatternObject(obj, out = {}, prfx = null) {
        for (let key in obj) {
            let val = obj[key];
            if (val == null) {
                continue;
            }
            let path = prfx ? `${prfx}[${key}]` : key;
            if (typeof val !== 'object') {
                out[path] = val;
                continue;
            }
            if (Array.isArray(val)) {
                val.forEach((x, index) => {
                    flatternObject(x, out, `${path}[${index}]`);
                });
                return;
            }
            if ((0, atma_utils_1.is_rawObject)(val)) {
                flatternObject(val, out, path);
                return;
            }
            throw new Error(`Cannt flattern object. Unsupported value type in ${path}`);
        }
        return out;
    }
})(Body = exports.Body || (exports.Body = {}));
//# sourceMappingURL=Body.js.map
//# sourceMappingURL=Body.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fetch_Body === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fetch_Body) && __isObj(module.exports)) {
        Object.assign(_src_fetch_Body, module.exports);
    } else {
        _src_fetch_Body = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_NetworkTracer;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fetch_NetworkTracer != null ? _src_fetch_NetworkTracer : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkSpan = exports.NetworkTracer = void 0;
const atma_utils_1 = require("atma-utils");
const EVENT_COMPLETE = 'complete';
class NetworkTracer extends atma_utils_1.class_EventEmitter {
    constructor() {
        super(...arguments);
        this.active = false;
        this.spans = [];
    }
    createSpan(req) {
        if (this.active === false) {
            return new NetworkSpanMock(req);
        }
        let span = new NetworkSpan(req);
        this.spans.push(span);
        span.on(EVENT_COMPLETE, () => this.trigger(EVENT_COMPLETE, span));
        return span;
    }
    onComplete(cb) {
        this.active = true;
        this.on(EVENT_COMPLETE, cb);
    }
    clear() {
        this.active = false;
        this.spans.length = 0;
        this.off(EVENT_COMPLETE);
    }
}
exports.NetworkTracer = NetworkTracer;
class NetworkSpan extends atma_utils_1.class_EventEmitter {
    constructor(req) {
        super();
        this.cached = false;
        this.req = req;
        this.startTime = new Date();
    }
    complete(res) {
        this.endTime = new Date();
        this.res = {
            url: res.url,
            status: res.status,
            headers: res.headers,
            body: res.body
        };
        if (Buffer.isBuffer(res.body)) {
            this.res.body = res.body.toString();
        }
        this.trigger(EVENT_COMPLETE, this);
    }
}
exports.NetworkSpan = NetworkSpan;
class NetworkSpanMock {
    constructor(req) { }
    complete(res) { }
}
//# sourceMappingURL=NetworkTracer.js.map
//# sourceMappingURL=NetworkTracer.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fetch_NetworkTracer === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fetch_NetworkTracer) && __isObj(module.exports)) {
        Object.assign(_src_fetch_NetworkTracer, module.exports);
    } else {
        _src_fetch_NetworkTracer = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_NetworkDriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_fetch_NetworkDriver != null ? _src_fetch_NetworkDriver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDriver = void 0;
const https = require("https");
const http = require("http");
const Url = require("url");
const node_fetch_1 = require("node-fetch");
const CookieContainer_1 = _src_common_CookieContainer;
const Cache_1 = _src_fetch_Cache;
const atma_utils_1 = require("atma-utils");
const Body_1 = _src_fetch_Body;
const NetworkTracer_1 = _src_fetch_NetworkTracer;
const url_1 = _src_utils_url;
const _headers_1 = _src_utils__headers;
const DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
};
const agents = {
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true }),
};
const tracer = new NetworkTracer_1.NetworkTracer();
exports.NetworkDriver = {
    isCached(url, config = {}) {
        url = (0, url_1.serializeCachableUrl)(url, config);
        return Cache_1.cache.has(url, config);
    },
    isCachedAsync(url, config = {}) {
        url = (0, url_1.serializeCachableUrl)(url, config);
        return Cache_1.cache.hasAsync(url, config);
    },
    clearCookies() {
        CookieContainer_1.cookieContainer.clearCookies();
    },
    clearCached(url, config = {}) {
        url = (0, url_1.serializeCachableUrl)(url, config);
        Cache_1.cache.remove(url, config);
    },
    load(url, config = {}) {
        let worker = new RequestWorker(url, config);
        return worker.load();
    },
    getCookies(url) {
        return CookieContainer_1.cookieContainer.getCookies(url);
    },
    setCookies(...args) {
        CookieContainer_1.cookieContainer.addCookies(...args);
    },
    tracer: tracer
};
function readAllHeaders(headers) {
    let obj = {};
    for (let entry of headers.entries()) {
        let [key, value] = entry;
        obj[key] = value;
    }
    return obj;
}
class RequestWorker {
    constructor(url, config = {}) {
        this.url = url;
        this.config = config;
        this.promise = new atma_utils_1.class_Dfr;
        this.isCompleted = false;
        this.timer = null;
        this.redirectIndex = 0;
        this.retryIndex = 0;
        const headers = Object.assign({}, config?.includeDefaultHeaders !== false ? DefaultOptions.headers : {}, _headers_1.$headers.resolve(config.headers));
        this.options = {
            headers: headers,
            method: config.method,
            body: config.body,
            follow: config.follow,
            onRedirect(data) {
                if (data.prev.startsWith('http:') && data.url.includes('https:')) {
                    data.opts.agent = agents.https;
                }
            }
        };
        this.cookieContainer = config.cookieContainer || CookieContainer_1.cookieContainer;
        this.retryCount = 'retryCount' in config ? config.retryCount : 3;
        this.retryTimeout = 'retryTimeout' in config ? config.retryTimeout : 1000;
        this.doNotThrow = config.doNotThrow;
        if (this.options.headers['Cookie']) {
            this.cookieContainer.addCookies(url, this.options.headers['Cookie']);
        }
        if (config.cookies) {
            this.cookieContainer.addCookies(url, config.cookies);
        }
        if (config.cookiesDefault) {
            this.cookieContainer.addCookies(url, config.cookiesDefault, { extend: true });
        }
        if (config.includeCookies !== false) {
            let cookies = this.cookieContainer.getCookies(url);
            if (cookies) {
                this.options.headers['Cookie'] = cookies;
            }
        }
        url = (0, url_1.serializeUrl)(url, config);
        if (config.agent) {
            this.options.agent = config.agent;
        }
        else {
            if (url.startsWith('http:')) {
                this.options.agent = agents.http;
            }
            if (url.startsWith('https:')) {
                this.options.agent = agents.https;
            }
        }
        if (config.httpsProxy) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
            let HttpsProxyAgent = require('https-proxy-agent');
            let headers = null;
            let uri = null;
            let auth;
            if (typeof config.httpsProxy === 'string') {
                uri = Url.parse(config.httpsProxy);
            }
            else {
                uri = Url.parse(config.httpsProxy.url);
                let { username, password } = config.httpsProxy;
                if (username && password) {
                    auth = `${username}:${password}`;
                }
            }
            if (uri.auth) {
                auth = uri.auth;
            }
            if (auth) {
                headers = {
                    'Proxy-Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
                };
            }
            this.options.agent = new HttpsProxyAgent({
                ...uri,
                headers,
            });
        }
        if (config.ignoreSSLErrors) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        }
        if (config.body != null && (0, atma_utils_1.is_rawObject)(config.body)) {
            Body_1.Body.handleAsRawObject(this.options);
        }
        if (this.options.headers['Referer'] == null) {
            this.options.headers['Referer'] = url;
        }
        this.redirectCount = this.options.follow == null ? 10 : this.options.follow;
        this.options.redirect = 'manual';
        this.location = url;
    }
    async load() {
        this.span = tracer.createSpan({
            url: this.location,
            headers: this.options.headers,
            method: this.options.method,
            body: this.options.body
        });
        let cached = await this._fromCache();
        if (cached) {
            this.span.complete(cached);
            return cached;
        }
        if (this.config.timeoutMs) {
            this.timer = setTimeout(() => {
                this.doComplete(new Error(`Timeouted in ${this.config.timeoutMs}ms`));
            }, this.config.timeoutMs);
        }
        this._fetch(this.location);
        return this.promise;
    }
    async _fromCache() {
        try {
            let cached = await Cache_1.cache.get(this.url, this.config);
            if (cached) {
                return {
                    status: cached.status,
                    url: cached.url,
                    headers: cached.headers,
                    body: cached.body
                };
            }
        }
        catch (error) {
            // Not cached
        }
        return null;
    }
    async _handleResponse(res) {
        let errored = res.status >= 400;
        if (errored && --this.retryCount > 0) {
            switch (res.status) {
                case 404:
                case 401:
                case 403:
                    break;
                default: {
                    console.log(`Retry ${this.retryCount} for [${this.options.method}] ${this.location} as got ${res.status}`);
                    await wait(this.retryTimeout);
                    this._fetch(this.location);
                    return;
                }
            }
        }
        let setCookie = res.headers.get('set-cookie');
        if (setCookie) {
            this.cookieContainer.addCookies(this.location, setCookie);
        }
        if (res.status === 301 || res.status === 302) {
            let cookies = this.cookieContainer.getCookies(this.location);
            if (cookies) {
                this.options.headers['Cookie'] = cookies;
            }
            var location = res.headers.get('location');
            if (!location) {
                throw new Error('Location not present');
            }
            if (++this.redirectIndex < this.redirectCount) {
                this.options.method = 'GET';
                this.options.body = null;
                if (this.options.headers) {
                    delete this.options.headers['Content-Type'];
                    delete this.options.headers['content-type'];
                    delete this.options.headers['Content-Length'];
                    delete this.options.headers['content-length'];
                }
                this.location = location;
                this._fetch(location);
                return;
            }
        }
        return await this._handleCompletion(res);
    }
    async _handleCompletion(res) {
        let errored = res.status >= 400;
        let typeEnum = 'buffer';
        let contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('json')) {
            typeEnum = 'json';
        }
        if (contentType && contentType.includes('text')) {
            typeEnum = 'text';
        }
        let body = null;
        switch (typeEnum) {
            case 'text':
                body = await res.textConverted();
                break;
            case 'json':
                let str = await res.textConverted();
                try {
                    body = JSON.parse(str);
                }
                catch (error) {
                    throw new Error(`Invalid json response for ${res.url}: ${str}`);
                }
                break;
            case 'buffer':
                let arr = await res.arrayBuffer();
                body = Buffer.from(arr);
                break;
        }
        let resp = {
            status: res.status,
            headers: readAllHeaders(res.headers),
            url: res.url,
            body
        };
        this.span.complete(resp);
        if (errored) {
            if (this.doNotThrow === true) {
                return resp;
            }
            let error = new Error(`Request for ${res.url} failed with ${res.status}`);
            error.status = res.status;
            error.body = res.body;
            error.headers = res.headers;
            throw error;
        }
        Cache_1.cache.save(this.location, this.config, resp);
        return resp;
    }
    async _fetch(url) {
        try {
            let httpRes = await (0, node_fetch_1.default)(url, this.options);
            let res = await this._handleResponse(httpRes);
            if (res != null) {
                this.doComplete(null, res);
            }
        }
        catch (error) {
            this.doComplete(error);
        }
    }
    doComplete(error, resp) {
        clearTimeout(this.timer);
        if (this.isCompleted) {
            return;
        }
        this.isCompleted = true;
        if (error != null) {
            this.promise.reject(error);
            return;
        }
        this.promise.resolve(resp);
    }
}
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(null), ms);
    });
}
//# sourceMappingURL=NetworkDriver.js.map
//# sourceMappingURL=NetworkDriver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_fetch_NetworkDriver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_fetch_NetworkDriver) && __isObj(module.exports)) {
        Object.assign(_src_fetch_NetworkDriver, module.exports);
    } else {
        _src_fetch_NetworkDriver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_jsdom_JsdomQuery;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_jsdom_JsdomQuery != null ? _src_jsdom_JsdomQuery : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsdomQuery = void 0;
const IQuery_1 = _src_common_IQuery;
const jsdom_1 = require("jsdom");
const dfr_1 = _src_utils_dfr;
const NetworkDriver_1 = _src_fetch_NetworkDriver;
class JsdomQuery extends IQuery_1.IQuery {
    _onFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    _onOnceFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    _offFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    hasClassFn(node, name) {
        return (0, dfr_1.dfr_resolve)(node.classList.contains(name));
    }
    addClassFn(node, name) {
        node.classList.add(name);
        return (0, dfr_1.dfr_resolve)();
    }
    removeClassFn(node, name) {
        node.classList.remove(name);
        return (0, dfr_1.dfr_resolve)();
    }
    toggleClassFn(node, name) {
        node.classList.toggle(name);
        return (0, dfr_1.dfr_resolve)();
    }
    textGetFn(node) {
        return (0, dfr_1.dfr_resolve)(node.textContent);
    }
    textSetFn(node, text) {
        node.textContent = text;
        return (0, dfr_1.dfr_resolve)();
    }
    htmlOuterGetFn(node) {
        return (0, dfr_1.dfr_resolve)(node.outerHTML);
    }
    htmlGetFn(node) {
        return (0, dfr_1.dfr_resolve)(node.innerHTML);
    }
    htmlSetFn(node, text) {
        node.innerHTML = text;
        return (0, dfr_1.dfr_resolve)();
    }
    appendFn(node, html) {
        node.insertAdjacentHTML('beforeend', html);
        return (0, dfr_1.dfr_resolve)();
    }
    prependFn(node, html) {
        node.insertAdjacentHTML('afterbegin', html);
        return (0, dfr_1.dfr_resolve)();
    }
    beforeFn(node, html) {
        node.insertAdjacentHTML('beforebegin', html);
        return (0, dfr_1.dfr_resolve)();
    }
    afterFn(node, html) {
        node.insertAdjacentHTML('afterend', html);
        return (0, dfr_1.dfr_resolve)();
    }
    cssGet(node, prop) {
        return (0, dfr_1.dfr_resolve)(node.style[toCamelCase(prop)]);
    }
    cssSet(node, css) {
        for (let key in css) {
            node.style[toCamelCase(key)] = css[key];
        }
        return (0, dfr_1.dfr_resolve)();
    }
    async heightGetFn(node) {
        return (await this.getBoundingClientRect(node)).height;
    }
    async widthGetFn(node) {
        return (await this.getBoundingClientRect(node)).width;
    }
    innerHeightFn(node) {
        return this.getField(node, 'offsetHeight');
    }
    innerWidthFn(node) {
        return this.getField(node, 'offsetWidth');
    }
    getBoundingClientRect(node) {
        return (0, dfr_1.dfr_resolve)(node.getBoundingClientRect());
    }
    async getPosition(node) {
        let dfrTop = this.getField(node, 'offsetTop');
        let dfrLeft = this.getField(node, 'offsetLeft');
        let [top, left] = await Promise.all([dfrTop, dfrLeft]);
        return { top, left };
    }
    scrollTopGetFn(node) {
        return this.getField(node, 'scrollTop');
    }
    scrollTopSetFn(node, scroll) {
        return this.setField(node, 'scrollTop', scroll);
    }
    scrollLeftGetFn(node) {
        return this.getField(node, 'scrollLeft');
    }
    scrollLeftSetFn(node, scroll) {
        return this.setField(node, 'scrollLeft', scroll);
    }
    evalFn(node, mix, ...args) {
        throw new Error('Eval is not supported in JSDOM');
    }
    //#region Events
    clickFn(node) {
        node.click();
        return (0, dfr_1.dfr_resolve)();
    }
    triggerFn(node, type, ...args) {
        throw new Error('Trigger is not supported in JSDOM');
    }
    selectFn(node, ...args) {
        throw new Error('Select is not supported in JSDOM');
    }
    focusFn(node) {
        throw new Error('FOCUS is not supported in JSDOM');
    }
    blurFn(node) {
        throw new Error('BLUR is not supported in JSDOM');
    }
    sendKeysFn(node, mix) {
        throw new Error('SEND_KEYS is not supported in JSDOM');
    }
    typeFn(node, str) {
        throw new Error('TYPE is not supported in JSDOM');
    }
    pressFn(node, str) {
        throw new Error('PRESS is not supported in JSDOM');
    }
    //#endregion
    //#region Manipulate
    removeFn(node) {
        node.parentElement.removeChild(node);
        return (0, dfr_1.dfr_resolve)();
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return (0, dfr_1.dfr_resolve)(node.getAttribute(prop));
    }
    attrSetFn(node, attr) {
        for (let key in attr) {
            node.setAttribute(key, attr[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    }
    valGetFn(node) {
        return this.getField(node, 'value');
    }
    valSetFn(node, value) {
        return this.setField(node, 'value', value);
    }
    dataGetFn(node, key) {
        return (0, dfr_1.dfr_resolve)(node.dataset[key]);
    }
    dataSetFn(node, data) {
        for (let key in data) {
            node.dataset[key] = data[key];
        }
        return (0, dfr_1.dfr_resolve)();
    }
    propGetFn(node, key) {
        return (0, dfr_1.dfr_resolve)(node[key]);
    }
    propSetFn(node, data) {
        for (let key in data) {
            node[key] = data[key];
        }
        return (0, dfr_1.dfr_resolve)();
    }
    //#endregion
    findFn(node, selector) {
        let arr = Array.from(node.querySelectorAll(selector));
        return (0, dfr_1.dfr_resolve)(arr);
    }
    matchesFn(node, selector) {
        return (0, dfr_1.dfr_resolve)(node.matches(selector));
    }
    parentFn(node) {
        return (0, dfr_1.dfr_resolve)(node.parentElement);
    }
    closestFn(node, sel) {
        let el = node.parentElement;
        for (; el != null; el = el.parentElement) {
            el = el.parentElement;
            if (el.matches(sel)) {
                break;
            }
        }
        return (0, dfr_1.dfr_resolve)(el);
    }
    childrenFn(node, sel) {
        let arr = Array.from(node.children);
        if (sel) {
            arr = arr.filter(el => el.matches(sel));
        }
        return (0, dfr_1.dfr_resolve)(arr);
    }
    nextFn(node, sel) {
        let next = node.nextElementSibling;
        if (sel != null) {
            for (; next != null; next = next.nextElementSibling) {
                if (next.matches(sel))
                    break;
            }
        }
        return (0, dfr_1.dfr_resolve)(next);
    }
    getField(node, field) {
        return node[field];
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            for (let key in mix) {
                node[key] = mix[key];
            }
            return (0, dfr_1.dfr_resolve)();
        }
        node[mix] = val;
        return (0, dfr_1.dfr_resolve)();
    }
    callField(node, field, ...args) {
        return (0, dfr_1.dfr_resolve)(node[field](...args));
    }
    static newAsync(mix, parent) {
        let query = new JsdomQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    }
    //#region driver utils
    unlock() {
    }
    //#endregion driver utils
    static build(config, setts) {
        throw new Error('No build for JSDom is required. Use direkt load');
    }
    static load(url, config, setts) {
        let query = JsdomQuery.newAsync();
        NetworkDriver_1.NetworkDriver.load(url, setts?.opts).then(resp => {
            let html = resp.body.toString();
            let jsdom = new jsdom_1.JSDOM(html);
            query.add(jsdom.window.document);
            query.resolve(query);
        });
        return query;
    }
    static fetch(url, config, setts) {
        return this.load(url, config, setts);
    }
    static setDriver(driver) {
        throw new Error('JSDOM does not support driver');
    }
    static getDriver(config, setts) {
        throw new Error('JSDOM does not support driver');
    }
    static unlockDriver(mix) {
    }
}
exports.JsdomQuery = JsdomQuery;
function toCamelCase(property) {
    return property.replace(/\-(\w)/g, (full, char) => {
        return char.toUpperCase();
    });
}
//# sourceMappingURL=JsdomQuery.js.map
//# sourceMappingURL=JsdomQuery.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_jsdom_JsdomQuery === module.exports) {
        // do nothing if
    } else if (__isObj(_src_jsdom_JsdomQuery) && __isObj(module.exports)) {
        Object.assign(_src_jsdom_JsdomQuery, module.exports);
    } else {
        _src_jsdom_JsdomQuery = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_jsdom_JsdomDriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_jsdom_JsdomDriver != null ? _src_jsdom_JsdomDriver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsdomDriver = void 0;
const JsdomQuery_1 = _src_jsdom_JsdomQuery;
const NetworkDriver_1 = _src_fetch_NetworkDriver;
const jsdom_1 = require("jsdom");
const SelectorsEx_1 = _src_common_SelectorsEx;
exports.JsdomDriver = {
    fromHtml(html) {
        return exports.JsdomDriver.build({ html });
    },
    build(config) {
        let html = config.html;
        let jsdom = new jsdom_1.JSDOM(html);
        let el = jsdom.window.document;
        let isDocument = true;
        if (/^\s*<(?!(!?DOCTYPE|html))/i.test(html)) {
            isDocument = false;
        }
        if (config.fragment === true) {
            isDocument = false;
        }
        if (isDocument === false) {
            el = Array.from(el.body.children);
        }
        let query = new JsdomQuery_1.JsdomQuery(el);
        return query;
    },
    load(url, config) {
        let query = JsdomQuery_1.JsdomQuery.newAsync();
        NetworkDriver_1.NetworkDriver
            .load(url, config)
            .then(resp => {
            let jsdom = new jsdom_1.JSDOM(resp.body.toString());
            query.add(jsdom.window.document);
            query.resolve(query);
        }, error => {
            query.reject(error);
        });
        return query;
    },
    fetch(url, config, setts) {
        return this.load(url, config, setts);
    },
    setDriver(driver) {
        throw new Error('JSDOM does not support driver');
    },
    getDriver(config, setts) {
        throw new Error('JSDOM does not support driver');
    },
    unlockDriver(mix) {
        throw new Error('JSDOM does not support driver');
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
//# sourceMappingURL=JsdomDriver.js.map
//# sourceMappingURL=JsdomDriver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_jsdom_JsdomDriver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_jsdom_JsdomDriver) && __isObj(module.exports)) {
        Object.assign(_src_jsdom_JsdomDriver, module.exports);
    } else {
        _src_jsdom_JsdomDriver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CheerioUtils;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_cheerio_CheerioUtils != null ? _src_cheerio_CheerioUtils : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheerioUtils = void 0;
const cheerio = require("cheerio");
exports.CheerioUtils = {
    fromHtml(html) {
        let $ = cheerio(html, void 0, void 0, { xml: { decodeEntities: false } });
        let el = $;
        return el;
    },
    fromNode(el) {
        return cheerio(el, void 0, void 0, { xml: { decodeEntities: false } });
    }
};
//# sourceMappingURL=CheerioUtils.js.map
//# sourceMappingURL=CheerioUtils.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_cheerio_CheerioUtils === module.exports) {
        // do nothing if
    } else if (__isObj(_src_cheerio_CheerioUtils) && __isObj(module.exports)) {
        Object.assign(_src_cheerio_CheerioUtils, module.exports);
    } else {
        _src_cheerio_CheerioUtils = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CherrioQuery;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_cheerio_CherrioQuery != null ? _src_cheerio_CherrioQuery : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CherrioQuery = void 0;
const IQuery_1 = _src_common_IQuery;
const dfr_1 = _src_utils_dfr;
const NetworkDriver_1 = _src_fetch_NetworkDriver;
const CheerioUtils_1 = _src_cheerio_CheerioUtils;
const $ = require("cheerio");
class CherrioQuery extends IQuery_1.IQuery {
    _onFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    _onOnceFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    _offFn(node, type, cb) {
        throw new Error('Method not implemented.');
    }
    hasClassFn(node, name) {
        return (0, dfr_1.dfr_resolve)($(node).hasClass(name));
    }
    addClassFn(node, name) {
        $(node).addClass(name);
        return (0, dfr_1.dfr_resolve)();
    }
    removeClassFn(node, name) {
        $(node).removeClass(name);
        return (0, dfr_1.dfr_resolve)();
    }
    toggleClassFn(node, name) {
        $(node).toggleClass(name);
        return (0, dfr_1.dfr_resolve)();
    }
    textGetFn(node) {
        // Cheerio returns empty string on `text` for script elements
        const method = node.tagName === 'script' ? 'html' : 'text';
        return (0, dfr_1.dfr_resolve)($(node)[method]());
    }
    textSetFn(node, text) {
        $(node).text(text);
        return (0, dfr_1.dfr_resolve)();
    }
    htmlOuterGetFn(node) {
        return (0, dfr_1.dfr_resolve)($.html(node));
    }
    htmlGetFn(node) {
        return (0, dfr_1.dfr_resolve)(CheerioUtils_1.CheerioUtils.fromNode(node).html());
    }
    htmlSetFn(node, text) {
        $(node).html(text);
        return (0, dfr_1.dfr_resolve)();
    }
    appendFn(node, html) {
        $(node).append(html);
        return (0, dfr_1.dfr_resolve)();
    }
    prependFn(node, html) {
        $(node).prepend(html);
        return (0, dfr_1.dfr_resolve)();
    }
    beforeFn(node, html) {
        $(node).insertBefore(html);
        return (0, dfr_1.dfr_resolve)();
    }
    afterFn(node, html) {
        $(node).insertAfter(html);
        return (0, dfr_1.dfr_resolve)();
    }
    cssGet(node, prop) {
        return (0, dfr_1.dfr_resolve)($(node).css(prop));
    }
    cssSet(node, css) {
        $(node).css(css);
        return (0, dfr_1.dfr_resolve)();
    }
    async heightGetFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    async widthGetFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    innerHeightFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    innerWidthFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    getBoundingClientRect(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    async getPosition(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollTopGetFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollTopSetFn(node, scroll) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollLeftGetFn(node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    scrollLeftSetFn(node, scroll) {
        throw new Error('Cheerio driver does not support dimensions feature');
    }
    evalFn(node, mix, ...args) {
        throw new Error('Eval is not supported with Cheerio Driver');
    }
    //#region Events
    clickFn(node) {
        throw new Error('Cheerio driver does not support manipulation feature');
    }
    triggerFn(node, type, ...args) {
        throw new Error('Cheerio driver does not support manipulation feature');
    }
    selectFn(node, ...args) {
        throw new Error('Cheerio driver does not support manipulation feature');
    }
    focusFn(node) {
        throw new Error('FOCUS is not supported in Cheerio');
    }
    blurFn(node) {
        throw new Error('BLUR is not supported in Cheerio');
    }
    sendKeysFn(node, mix) {
        throw new Error('SEND_KEYS is not supported in Cheerio');
    }
    typeFn(node, str) {
        throw new Error('TYPE is not supported in Cheerio');
    }
    pressFn(node, str) {
        throw new Error('PRESS is not supported in Cheerio');
    }
    //#endregion
    //#region Manipulate
    removeFn(node) {
        $(node).remove();
        return (0, dfr_1.dfr_resolve)();
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return (0, dfr_1.dfr_resolve)($(node).attr(prop));
    }
    attrSetFn(node, attr) {
        for (let key in attr) {
            $(node).attr(key, attr[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    }
    valGetFn(node) {
        return (0, dfr_1.dfr_resolve)($(node).val());
    }
    valSetFn(node, value) {
        $(node).val(value);
        return (0, dfr_1.dfr_resolve)();
    }
    dataGetFn(node, key) {
        return (0, dfr_1.dfr_resolve)($(node).data(key));
    }
    dataSetFn(node, data) {
        for (let key in data) {
            $(node).data(key, data[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    }
    propGetFn(node, key) {
        return (0, dfr_1.dfr_resolve)($(node).prop(key));
    }
    propSetFn(node, data) {
        for (let key in data) {
            $(node).prop(key, data[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    }
    //#endregion
    findFn(node, selector) {
        let arr = $(node).find(selector).toArray();
        return (0, dfr_1.dfr_resolve)(arr);
    }
    matchesFn(node, selector) {
        return (0, dfr_1.dfr_resolve)($(node).is(selector));
    }
    parentFn(node) {
        let el = $(node).parent().get(0);
        return (0, dfr_1.dfr_resolve)(el);
    }
    closestFn(node, sel) {
        let el = $(node).closest(sel).get(0);
        return (0, dfr_1.dfr_resolve)(el);
    }
    childrenFn(node, sel) {
        let arr = $(node).children(sel).toArray();
        return (0, dfr_1.dfr_resolve)(arr);
    }
    nextFn(node, sel) {
        let next = $(node).next(sel).get(0);
        return (0, dfr_1.dfr_resolve)(next);
    }
    getField(node, field) {
        return node[field];
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            for (let key in mix) {
                node[key] = mix[key];
            }
            return (0, dfr_1.dfr_resolve)();
        }
        node[mix] = val;
        return (0, dfr_1.dfr_resolve)();
    }
    callField(node, field, ...args) {
        return (0, dfr_1.dfr_resolve)(node[field](...args));
    }
    static newAsync(mix, parent) {
        let query = new CherrioQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    }
    //#region driver utils
    unlock() {
    }
    //#endregion driver utils
    static build(config, setts) {
        throw new Error('No build for JSDom is required. Use direkt load');
    }
    static load(url, config, setts) {
        let query = CherrioQuery.newAsync();
        NetworkDriver_1.NetworkDriver.load(url, setts?.opts).then(resp => {
            let html = resp.body.toString();
            let $ = CheerioUtils_1.CheerioUtils.fromHtml(html);
            query.ctx.source = html;
            query.add($);
            query.resolve(query);
        });
        return query;
    }
    static fetch(url, config, setts) {
        return this.load(url, config, setts);
    }
    static setDriver(driver) {
        throw new Error('JSDOM does not support driver');
    }
    static getDriver(config, setts) {
        throw new Error('JSDOM does not support driver');
    }
    static unlockDriver(mix) {
    }
}
exports.CherrioQuery = CherrioQuery;
function toCamelCase(property) {
    return property.replace(/\-(\w)/g, (full, char) => {
        return char.toUpperCase();
    });
}
//# sourceMappingURL=CherrioQuery.js.map
//# sourceMappingURL=CherrioQuery.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_cheerio_CherrioQuery === module.exports) {
        // do nothing if
    } else if (__isObj(_src_cheerio_CherrioQuery) && __isObj(module.exports)) {
        Object.assign(_src_cheerio_CherrioQuery, module.exports);
    } else {
        _src_cheerio_CherrioQuery = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CheerioDriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_cheerio_CheerioDriver != null ? _src_cheerio_CheerioDriver : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheerioDriver = void 0;
const CherrioQuery_1 = _src_cheerio_CherrioQuery;
const NetworkDriver_1 = _src_fetch_NetworkDriver;
const CheerioUtils_1 = _src_cheerio_CheerioUtils;
const SelectorsEx_1 = _src_common_SelectorsEx;
let driver;
exports.CheerioDriver = {
    fromHtml(html) {
        return exports.CheerioDriver.build({ html });
    },
    build(config) {
        let html = config.html;
        driver = new CheerioDriverInner(config);
        driver.html = html;
        let el = CheerioUtils_1.CheerioUtils.fromHtml(html);
        let query = new CherrioQuery_1.CherrioQuery(el);
        query.ctx.source = html;
        return query;
    },
    load(url, config) {
        driver = new CheerioDriverInner(config);
        return driver.getAsQuery(url);
    },
    fetch(url, config, setts) {
        return this.load(url, config, setts);
    },
    setDriver(driver) {
        throw new Error('Cheerio does not support driver');
    },
    getDriver(config, setts) {
        return Promise.resolve(driver);
    },
    unlockDriver(mix) {
        driver = null;
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
class CheerioDriverInner {
    constructor(config) {
        this.config = config;
    }
    async get(url) {
        let query = CherrioQuery_1.CherrioQuery.newAsync();
        let resp = await NetworkDriver_1.NetworkDriver.load(url, this.config);
        let html = resp.body.toString();
        let $el = CheerioUtils_1.CheerioUtils.fromHtml(html);
        this.url = resp.url;
        this.headers = resp.headers;
        this.status = resp.status;
        this.html = html;
        query.ctx.source = html;
        query.ctx.url = url;
        query.ctx.status = resp.status;
        query.ctx.headers = resp.headers;
        query.add($el);
        query.resolve(query);
    }
    async getCurrentUrl() {
        return this.url;
    }
    async getPageSource() {
        return this.html;
    }
    async getAsQuery(url) {
        await this.get(url);
        let query = CherrioQuery_1.CherrioQuery.newAsync();
        let $el = CheerioUtils_1.CheerioUtils.fromHtml(this.html);
        query.ctx.source = this.html;
        query.ctx.url = url;
        query.ctx.status = this.status;
        query.ctx.headers = this.headers;
        query.add($el);
        query.resolve(query);
        return query;
    }
    // NOT IMPLEMENTED
    manage() {
        throw new Error('Method not implemented.');
        return null;
    }
    execute(command, description) {
        throw new Error('Method not implemented.');
    }
    setFileDetector(detector) {
        throw new Error('Method not implemented.');
    }
    getExecutor() {
        throw new Error('Method not implemented.');
    }
    getSession() {
        throw new Error('Method not implemented.');
    }
    getCapabilities() {
        throw new Error('Method not implemented.');
    }
    quit() {
        throw new Error('Method not implemented.');
    }
    actions(options) {
        throw new Error('Method not implemented.');
    }
    wait(...args) {
        throw new Error('Method not implemented.');
        return null;
    }
    sleep(ms) {
        throw new Error('Method not implemented.');
    }
    getWindowHandle() {
        throw new Error('Method not implemented.');
    }
    getAllWindowHandles() {
        throw new Error('Method not implemented.');
    }
    close() {
        throw new Error('Method not implemented.');
    }
    getTitle() {
        throw new Error('Method not implemented.');
    }
    findElement(locator) {
        throw new Error('Method not implemented.');
    }
    findElements(locator) {
        throw new Error('Method not implemented.');
    }
    takeScreenshot() {
        throw new Error('Method not implemented.');
    }
    navigate() {
        throw new Error('Method not implemented.');
    }
    switchTo() {
        throw new Error('Method not implemented.');
    }
    executeScript(script, ...var_args) {
        throw new Error('Method not implemented.');
    }
    executeAsyncScript(script, ...var_args) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=CheerioDriver.js.map
//# sourceMappingURL=CheerioDriver.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_cheerio_CheerioDriver === module.exports) {
        // do nothing if
    } else if (__isObj(_src_cheerio_CheerioDriver) && __isObj(module.exports)) {
        Object.assign(_src_cheerio_CheerioDriver, module.exports);
    } else {
        _src_cheerio_CheerioDriver = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_WebdriverEventsPoll;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_WebdriverEventsPoll != null ? _src_webdriver_WebdriverEventsPoll : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebdriverEventsPoll = void 0;
const node_1 = _src_webdriver_utils_node;
var WebdriverEventsPoll;
(function (WebdriverEventsPoll) {
    let bin = [];
    let ids = {};
    function addEventListener(node, type, cb) {
        return (0, node_1.node_eval)(node, scripts_addEventListener, type).then(id => {
            bin.push([node, type, cb, id]);
            ids[id] = { node, type, cb, active: true };
            async function poll() {
                let data = ids[id];
                if (data.active !== true) {
                    return;
                }
                let event = await (0, node_1.node_eval)(node, scripts_pollEvent, id);
                if (data.active !== true) {
                    return;
                }
                if (event) {
                    cb(event);
                    poll();
                    return;
                }
                setTimeout(poll, 200);
            }
            poll();
        });
    }
    WebdriverEventsPoll.addEventListener = addEventListener;
    async function removeEventListener(node, type, cb = null) {
        for (let i = 0; i < bin.length; i++) {
            let data = bin[i];
            let [_node, _type, _cb, _id] = data;
            if (type !== _type) {
                continue;
            }
            if (node !== _node) {
                continue;
            }
            if (cb != null && cb !== _cb) {
                continue;
            }
            let info = ids[_id];
            if (info) {
                info.active = false;
            }
            await (0, node_1.node_eval)(node, scripts_removeEventListener, _id);
            bin.splice(i, 1);
            delete ids[_id];
            i--;
        }
    }
    WebdriverEventsPoll.removeEventListener = removeEventListener;
})(WebdriverEventsPoll = exports.WebdriverEventsPoll || (exports.WebdriverEventsPoll = {}));
//# sourceMappingURL=WebdriverEventsPoll.js.map
//# sourceMappingURL=WebdriverEventsPoll.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_WebdriverEventsPoll === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_WebdriverEventsPoll) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_WebdriverEventsPoll, module.exports);
    } else {
        _src_webdriver_WebdriverEventsPoll = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_scripts_css_nodeCss;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_scripts_css_nodeCss != null ? _src_webdriver_scripts_css_nodeCss : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts_nodeCss = void 0;
function scripts_nodeCss() {
    // source ../_inlineGetSetKeyValue.js
    var argsCount = arguments.length;
    if (argsCount < 2) {
        return;
    }
    var el = arguments[0], mix = arguments[1];
    if (el == null || mix == null) {
        return;
    }
    if (argsCount == 2 && typeof mix === 'string') {
        return get(el, mix);
    }
    if (typeof mix === 'object') {
        for (var key in mix) {
            set(el, key, mix[key]);
        }
        return;
    }
    if (argsCount > 2 && typeof mix === 'string') {
        var val = arguments[2];
        set(el, mix, val);
        return;
    }
    // end:source ../_inlineGetSetKeyValue.js
    // source ../_str.es6
    function str_toCamelCase(str) {
        return str.replace(/\-(.)/g, function (_, letter) {
            return letter.toUpperCase();
        });
    }
    function str_toDashed(str) {
        return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    // end:source ../_str.es6
    function get(el, key) {
        return getComputedStyle(el)[str_toCamelCase(key)];
    }
    function set(el, key, val) {
        el.style[str_toCamelCase(key)] = val;
    }
}
exports.scripts_nodeCss = scripts_nodeCss;
//# sourceMappingURL=nodeCss.js.map
//# sourceMappingURL=nodeCss.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_scripts_css_nodeCss === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_scripts_css_nodeCss) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_scripts_css_nodeCss, module.exports);
    } else {
        _src_webdriver_scripts_css_nodeCss = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_scripts_nodeProperty;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_scripts_nodeProperty != null ? _src_webdriver_scripts_nodeProperty : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts_nodeProperty = void 0;
function scripts_nodeProperty() {
    // source ./_inlineGetSetKeyValue.js
    var argsCount = arguments.length;
    if (argsCount < 2) {
        return;
    }
    var el = arguments[0], mix = arguments[1];
    if (el == null || mix == null) {
        return;
    }
    if (argsCount == 2 && typeof mix === 'string') {
        return get(el, mix);
    }
    if (typeof mix === 'object') {
        for (var key in mix) {
            set(el, key, mix[key]);
        }
        return;
    }
    if (argsCount > 2 && typeof mix === 'string') {
        var val = arguments[2];
        set(el, mix, val);
        return;
    }
    // end:source ./_inlineGetSetKeyValue.js
    function get(el, key) {
        return el[key];
    }
    function set(el, key, val) {
        el[key] = val;
    }
}
exports.scripts_nodeProperty = scripts_nodeProperty;
//# sourceMappingURL=nodeProperty.js.map
//# sourceMappingURL=nodeProperty.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_scripts_nodeProperty === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_scripts_nodeProperty) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_scripts_nodeProperty, module.exports);
    } else {
        _src_webdriver_scripts_nodeProperty = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_scripts_nodeDataset;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_scripts_nodeDataset != null ? _src_webdriver_scripts_nodeDataset : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scripts_nodeDataset = void 0;
function scripts_nodeDataset() {
    // source ./nodeDatasetRemove.es6
    function scripts_nodeDatasetRemove() {
        var el = arguments[0], key = arguments[1];
        if (el == null || key == null) {
            return;
        }
        if (el.dataset) {
            delete el.dataset[key];
            return;
        }
        el.removeAttribute(key);
    }
    // end:source ./nodeDatasetRemove.es6
    // source ./_str.es6
    function str_toCamelCase(str) {
        return str.replace(/\-(.)/g, function (_, letter) {
            return letter.toUpperCase();
        });
    }
    function str_toDashed(str) {
        return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
    // end:source ./_str.es6
    // source ./_inlineGetSetKeyValue.js
    var argsCount = arguments.length;
    if (argsCount < 2) {
        return;
    }
    var el = arguments[0], mix = arguments[1];
    if (el == null || mix == null) {
        return;
    }
    if (argsCount == 2 && typeof mix === 'string') {
        return get(el, mix);
    }
    if (typeof mix === 'object') {
        for (var key in mix) {
            set(el, key, mix[key]);
        }
        return;
    }
    if (argsCount > 2 && typeof mix === 'string') {
        var val = arguments[2];
        set(el, mix, val);
        return;
    }
    // end:source ./_inlineGetSetKeyValue.js
    function get(el, key) {
        key = str_toCamelCase(key);
        if (el.dataset) {
            return el.dataset[key];
        }
        return el.getAttribute('data-' + str_toDashed(key));
    }
    function set(el, key, val) {
        if (val == null) {
            scripts_nodeDatasetRemove(el, key);
            return;
        }
        if (el.dataset) {
            el.dataset[key] = val;
            return;
        }
        el.setAttribute(el, 'data-' + str_toDashed(key), val);
    }
}
exports.scripts_nodeDataset = scripts_nodeDataset;
;
//# sourceMappingURL=nodeDataset.js.map
//# sourceMappingURL=nodeDataset.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_scripts_nodeDataset === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_scripts_nodeDataset) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_scripts_nodeDataset, module.exports);
    } else {
        _src_webdriver_scripts_nodeDataset = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_WebdriverQuery;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_WebdriverQuery != null ? _src_webdriver_WebdriverQuery : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebdriverQuery = void 0;
const node_1 = _src_webdriver_utils_node;
const global_1 = _src_global;
const IQuery_1 = _src_common_IQuery;
const Webdriver_1 = _src_webdriver_Webdriver;
const DriverPool_1 = _src_webdriver_DriverPool;
const JsdomDriver_1 = _src_jsdom_JsdomDriver;
const CheerioDriver_1 = _src_cheerio_CheerioDriver;
const NetworkDriver_1 = _src_fetch_NetworkDriver;
const driver_1 = _src_webdriver_utils_driver;
const SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
const WebdriverEventsPoll_1 = _src_webdriver_WebdriverEventsPoll;
const SelectorsEx_1 = _src_common_SelectorsEx;
const nodeCss_1 = _src_webdriver_scripts_css_nodeCss;
const nodeProperty_1 = _src_webdriver_scripts_nodeProperty;
const nodeDataset_1 = _src_webdriver_scripts_nodeDataset;
const WebdriverFormData_1 = _src_webdriver_WebdriverFormData;
const FormDataBase_1 = _src_common_FormDataBase;
class WebdriverQuery extends IQuery_1.IQuery {
    hasClassFn(node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassHas, name);
    }
    addClassFn(node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassAdd, name);
    }
    removeClassFn(node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassRemove, name);
    }
    toggleClassFn(node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassToggle, name);
    }
    textGetFn(node) {
        return this.getField(node, 'textContent');
    }
    textSetFn(node, text) {
        return this.setField(node, 'textContent', text);
    }
    htmlOuterGetFn(node) {
        let driver = (0, node_1.node_getDriver)(node);
        if (driver === node) {
            return driver.getPageSource();
        }
        return this.getField(node, 'outerHTML');
    }
    htmlGetFn(node) {
        let driver = (0, node_1.node_getDriver)(node);
        if (driver === node) {
            return driver.getPageSource();
        }
        return this.getField(node, 'innerHTML');
    }
    htmlSetFn(node, text) {
        return this.setField(node, 'innerHTML', text);
    }
    appendFn(node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'beforeend', html);
    }
    // protected async appendToFn (selector: string, node: IElement) {
    //     let $parent = await this.find(selector);
    //     let parent: IElement = $parent[0];
    //     if (parent != null) {
    //         await this.callField(
    //             parent,
    //             'appendChild',
    //             node
    //         );
    //     }
    // }
    prependFn(node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'afterbegin', html);
    }
    beforeFn(node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'beforebegin', html);
    }
    afterFn(node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'afterend', html);
    }
    cssGet(node, prop) {
        return new Promise((resolve, reject) => {
            node.getCssValue(prop).then(resolve, reject);
        });
    }
    cssSet(node, css) {
        return (0, node_1.node_eval)(node, nodeCss_1.scripts_nodeCss, css);
    }
    async heightGetFn(node) {
        return (await this.getBoundingClientRect(node)).height;
    }
    async widthGetFn(node) {
        return (await this.getBoundingClientRect(node)).width;
    }
    innerHeightFn(node) {
        return this.getField(node, 'offsetHeight');
    }
    innerWidthFn(node) {
        return this.getField(node, 'offsetWidth');
    }
    getBoundingClientRect(node) {
        return (0, node_1.node_eval)(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
    }
    async getPosition(node) {
        let dfrTop = this.getField(node, 'offsetTop');
        let dfrLeft = this.getField(node, 'offsetLeft');
        let [top, left] = await Promise.all([dfrTop, dfrLeft]);
        return { top, left };
    }
    scrollTopGetFn(node) {
        return this.getField(node, 'scrollTop');
    }
    scrollTopSetFn(node, scroll) {
        return this.setField(node, 'scrollTop', scroll);
    }
    scrollLeftGetFn(node) {
        return this.getField(node, 'scrollLeft');
    }
    scrollLeftSetFn(node, scroll) {
        return this.setField(node, 'scrollLeft', scroll);
    }
    evalFn(node, mix, ...args) {
        return (0, node_1.node_eval)(node, mix, ...args);
    }
    //#region Events
    clickFn(node) {
        return node.click();
    }
    triggerFn(node, type, ...args) {
        return (0, node_1.node_eval)(node, scripts_nodeTrigger, type, ...args);
    }
    selectFn(node, ...args) {
        return this.getField(node, 'tagName').then(name => {
            var fn = name === 'SELECT' ?
                scripts_nodeSelectOption :
                scripts_nodeSelectTextRange;
            return (0, node_1.node_eval)(node, fn, ...args);
        });
    }
    focusFn(node) {
        return this.callField(node, 'focus');
    }
    blurFn(node) {
        return this.callField(node, 'blur');
    }
    sendKeysFn(node, mix) {
        return node.sendKeys(mix);
    }
    typeFn(node, str) {
        var arr = Events.toSequance(str), fn = Events.getSequenceFunction(arr);
        return fn(node);
    }
    pressFn(node, str) {
        var key = Events.toCombination(str);
        return node.sendKeys(key);
    }
    //#endregion
    //#region Manipulate
    removeFn(node) {
        return (0, node_1.node_eval)(node, scripts_nodeRemove);
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return new Promise((resolve, reject) => {
            node.getAttribute(prop).then(resolve, reject);
        });
    }
    attrSetFn(node, attr) {
        return (0, node_1.node_eval)(node, scripts_nodeAttribute, attr);
    }
    valGetFn(node) {
        return this.getField(node, 'value');
    }
    valSetFn(node, value) {
        return this.setField(node, 'value', value);
    }
    dataGetFn(node, key) {
        return (0, node_1.node_eval)(node, nodeDataset_1.scripts_nodeDataset, key);
    }
    dataSetFn(node, data) {
        return (0, node_1.node_eval)(node, nodeDataset_1.scripts_nodeDataset, data);
    }
    propGetFn(node, key) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, key);
    }
    propSetFn(node, data) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, data);
    }
    //#endregion
    findFn(node, selector) {
        return new Promise((resolve, reject) => {
            node.findElements({ css: selector }).then(resolve, reject);
        });
    }
    matchesFn(node, selector) {
        return (0, node_1.node_eval)(node, scripts_nodeMatchesSelector, selector);
    }
    parentFn(node) {
        return (0, node_1.node_eval)(node, scripts_nodeParent);
    }
    closestFn(node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeClosest, sel);
    }
    childrenFn(node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeChildren, sel);
    }
    nextFn(node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeNext, sel);
    }
    getField(node, field) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, field);
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, mix);
        }
        if (arguments.length === 3) {
            return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, mix, val);
        }
        return null;
    }
    callField(node, field, ...args) {
        return (0, node_1.node_eval)(node, scripts_nodeFunctionCall, field, ...args);
    }
    _onFn(node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.addEventListener(node, type, cb);
    }
    _offFn(node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, cb);
    }
    _onOnceFn(node, type, cb) {
        const fn = async function (event) {
            await WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, fn);
            cb(event);
        };
        return WebdriverEventsPoll_1.WebdriverEventsPoll.addEventListener(node, type, fn);
    }
    //#region driver utils
    manage() {
        let driver = DriverPool_1.driverPool.extractDriver(this);
        if (driver == null) {
            console.log(this);
            throw new Error(`Driver not found in set`);
        }
        return driver.manage();
    }
    waitForPageLoad() {
        return (0, driver_1.waitForPageLoad)(this);
    }
    waitForPageReady() {
        return (0, driver_1.waitForPageLoad)(this, 'interactive');
    }
    waitForElement(selector) {
        return (0, driver_1.waitForElement)(this, selector);
    }
    waitForResource(selector) {
        return (0, driver_1.driver_evalAsync)(this, scripts_waitForResourceCallback, selector);
    }
    unlock() {
        Webdriver_1.Webdriver.unlockDriver(this);
    }
    getDriver() {
        return DriverPool_1.driverPool.extractDriver(this);
    }
    async createFormData() {
        return WebdriverFormData_1.WebdriverFormData.create(this);
    }
    static build(config, setts) {
        return Webdriver_1.Webdriver.build(config, setts);
    }
    static load(url, config = SeleniumDriver_1.DefaultConfig, setts) {
        switch (config.name?.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver_1.JsdomDriver.load(url, config, setts);
            case 'cheerio':
                return CheerioDriver_1.CheerioDriver.load(url, config, setts);
            default:
                return Webdriver_1.Webdriver.load(url, config, setts);
        }
    }
    static loadWithWebdriver(url, config = SeleniumDriver_1.DefaultConfig, setts) {
        return Webdriver_1.Webdriver.load(url, config, setts);
    }
    static fetch(url, config = SeleniumDriver_1.DefaultConfig, setts) {
        switch (config.name?.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver_1.JsdomDriver.fetch(url, config, setts);
            case 'cheerio':
                return CheerioDriver_1.CheerioDriver.fetch(url, config, setts);
            default:
                return Webdriver_1.Webdriver.fetch(url, config, setts);
        }
    }
    static setDriver(driver) {
        DriverPool_1.driverPool.setGlobal(driver);
    }
    static getDriver(config, setts) {
        return DriverPool_1.driverPool.get('', config, setts);
    }
    static unlockDriver(mix) {
        Webdriver_1.Webdriver.unlockDriver(mix);
    }
    static newAsync(mix, parent) {
        let query = new WebdriverQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    }
}
exports.WebdriverQuery = WebdriverQuery;
//#endregion driver utils
WebdriverQuery.FormData = FormDataBase_1.FormDataBase;
WebdriverQuery.cheerio = CheerioDriver_1.CheerioDriver;
WebdriverQuery.jsdom = JsdomDriver_1.JsdomDriver;
WebdriverQuery.network = NetworkDriver_1.NetworkDriver;
WebdriverQuery.pseudo = SelectorsEx_1.SelectorsEx.pseudoFns;
var Events;
(function (Events) {
    // https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html
    const Key = global_1.refs.Key;
    const aliases = {
        'ctrl': 'control',
        'backspace': 'back_space',
        'esc': 'escape',
        'left': 'arrow_left',
        'right': 'arrow_right',
        'up': 'arrow_up',
        'down': 'arrow_down',
    };
    function toSequance(str) {
        var delimiter = '_%%%%%%_';
        str = str.replace(/\{([\w_]+)\}/g, function (full, name) {
            var key = (aliases[name] || name).toUpperCase();
            if (key in Key === false) {
                return full;
            }
            return delimiter + key + delimiter;
        });
        var parts = str.split(delimiter);
        return parts.map((str, i) => {
            if (i % 2 === 0) {
                return str;
            }
            return Key[str];
        });
    }
    Events.toSequance = toSequance;
    function toCombination(str) {
        var keys = str.split('+');
        keys.forEach((x, i) => {
            if (x === '') {
                keys[i] = '+';
                return;
            }
            if (isSpecial(x)) {
                keys[i] = getSpecial(x);
                return;
            }
        });
        if (keys.length === 0) {
            return keys[0];
        }
        return Key.chord(...keys);
    }
    Events.toCombination = toCombination;
    ;
    function getSpecial(name) {
        var key = (aliases[name] || name).toUpperCase();
        return Key[key];
    }
    function isSpecial(name) {
        var key = (aliases[name] || name).toUpperCase();
        return key in Key;
    }
    function getSequenceFunction(arr) {
        return async function (node) {
            for (let str of arr) {
                await node.sendKeys(str);
            }
        };
    }
    Events.getSequenceFunction = getSequenceFunction;
})(Events || (Events = {}));
//# sourceMappingURL=WebdriverQuery.js.map
//# sourceMappingURL=WebdriverQuery.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_webdriver_WebdriverQuery === module.exports) {
        // do nothing if
    } else if (__isObj(_src_webdriver_WebdriverQuery) && __isObj(module.exports)) {
        Object.assign(_src_webdriver_WebdriverQuery, module.exports);
    } else {
        _src_webdriver_WebdriverQuery = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_classify;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_classify != null ? _src_utils_classify : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FnPrototypeAlias = exports.Classify = void 0;
function Classify(Ctor) {
    const Class = function (...args) {
        return new Ctor(...args);
    };
    Class.prototype = Ctor.prototype;
    forIn(Ctor, key => {
        if (key in Class === false) {
            Class[key] = Ctor[key];
        }
    });
    return Class;
}
exports.Classify = Classify;
function FnPrototypeAlias(Ctor) {
    Ctor.fn = Ctor.prototype;
    return Ctor;
}
exports.FnPrototypeAlias = FnPrototypeAlias;
function forIn(obj, cb) {
    let hash = Object.create(null);
    let cursor = obj;
    do {
        let props = Object.getOwnPropertyNames(cursor);
        for (let i = 0; i < props.length; i++) {
            let key = props[i];
            if (key in hash === false) {
                cb(key);
            }
            hash[key] = null;
        }
    } while (cursor = Object.getPrototypeOf(cursor));
}
//# sourceMappingURL=classify.js.map
//# sourceMappingURL=classify.ts.map;

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_classify === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_classify) && __isObj(module.exports)) {
        Object.assign(_src_utils_classify, module.exports);
    } else {
        _src_utils_classify = module.exports;
    }

    ;
}());

// end:source ./ModuleSimplified.js

// source ./webdriver/scripts/exports.es6
// source ./nodeMatchesSelector.es6
function scripts_nodeMatchesSelector() {
	var el = arguments[0],
	    selector = arguments[1];
	var docEl = document.documentElement,
	    matchesSelector = docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector || docEl.matchesSelector;

	return el == null || el.nodeType !== 1 ? false : matchesSelector.call(el, selector);
};
// end:source ./nodeMatchesSelector.es6
// source ./nodeParent.es6
function scripts_nodeParent() {
	var el = arguments[0];
	return el.parentNode;
};
// end:source ./nodeParent.es6
// source ./nodeClosest.es6
function scripts_nodeClosest() {
	// source ./nodeMatchesSelector.es6
	function scripts_nodeMatchesSelector() {
		var el = arguments[0],
		    selector = arguments[1];
		var docEl = document.documentElement,
		    matchesSelector = docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector || docEl.matchesSelector;

		return el == null || el.nodeType !== 1 ? false : matchesSelector.call(el, selector);
	};
	// end:source ./nodeMatchesSelector.es6

	var el = arguments[0],
	    selector = arguments[1];
	while (el != null && el.parentNode != null) {
		el = el.parentNode;
		if (scripts_nodeMatchesSelector(el, selector)) {
			return el;
		}
	}
	return null;
};
// end:source ./nodeClosest.es6
// source ./nodeChildren.es6
function scripts_nodeChildren() {
	// source ./nodeMatchesSelector.es6
	function scripts_nodeMatchesSelector() {
		var el = arguments[0],
		    selector = arguments[1];
		var docEl = document.documentElement,
		    matchesSelector = docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector || docEl.matchesSelector;

		return el == null || el.nodeType !== 1 ? false : matchesSelector.call(el, selector);
	};
	// end:source ./nodeMatchesSelector.es6
	var el = arguments[0],
	    selector = arguments[1];
	var out = [];

	var node = el.firstElementChild;
	while (node != null) {
		if (selector == null || scripts_nodeMatchesSelector(node, selector)) {
			out.push(node);
		}
		node = node.nextElementSibling;
	}
	return out;
}
// end:source ./nodeChildren.es6
// source ./nodeNext.es6
function scripts_nodeNext() {
	// source ./nodeMatchesSelector.es6
	function scripts_nodeMatchesSelector() {
		var el = arguments[0],
		    selector = arguments[1];
		var docEl = document.documentElement,
		    matchesSelector = docEl.webkitMatchesSelector || docEl.mozMatchesSelector || docEl.msMatchesSelector || docEl.oMatchesSelector || docEl.matchesSelector;

		return el == null || el.nodeType !== 1 ? false : matchesSelector.call(el, selector);
	};
	// end:source ./nodeMatchesSelector.es6
	var el = arguments[0],
	    selector = arguments[1];
	var node = el.nextElementSibling;
	if (selector == null) {
		return node;
	}

	while (node != null) {
		if (scripts_nodeMatchesSelector(node, selector)) {
			return node;
		}
		node = node.nextElementSibling;
	}
	return null;
}
// end:source ./nodeNext.es6
// source ./nodeRemove.es6
function scripts_nodeRemove() {
	var el = arguments[0];
	if (el.parentNode != null) {
		el.parentNode.removeChild(el);
	}
}
// end:source ./nodeRemove.es6
// source ./nodeAttribute.es6
function scripts_nodeAttribute() {
	// source ./_str.es6
	function str_toCamelCase(str) {
		return str.replace(/\-(.)/g, function (_, letter) {
			return letter.toUpperCase();
		});
	}
	function str_toDashed(str) {
		return key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
	// end:source ./_str.es6
	// source ./_inlineGetSetKeyValue.js
	var argsCount = arguments.length;
	if (argsCount < 2) {
		return;
	}
	var el = arguments[0],
	    mix = arguments[1];
	if (el == null || mix == null) {
		return;
	}

	if (argsCount == 2 && typeof mix === 'string') {
		return get(el, mix);
	}
	if (typeof mix === 'object') {
		for (var key in mix) {
			set(el, key, mix[key]);
		}
		return;
	}
	if (argsCount > 2 && typeof mix === 'string') {
		var val = arguments[2];
		set(el, mix, val);
		return;
	}
	// end:source ./_inlineGetSetKeyValue.js

	function get(el, key) {
		return el.getAttribute(key);
	}
	function set(el, key, value) {
		return el.setAttribute(key, value);
	}
};
// end:source ./nodeAttribute.es6
// source ./nodeAttributeRemove.es6
function scripts_nodeDatasetRemove() {
	var el = arguments[0],
	    key = arguments[1];
	if (el == null || key == null) {
		return;
	}
	el.removeAttribute(key);
}
// end:source ./nodeAttributeRemove.es6
// source ./nodeProperty.es6

// end:source ./nodeProperty.es6
// source ./nodeFunctionCall.es6
function scripts_nodeFunctionCall() {
	var el = arguments[0],
	    name = arguments[1],
	    args = Array.prototype.slice.call(arguments, 2);

	if (typeof el[name] !== 'function') {
		console.error(name + ' is not a function in ', el);
	}
	return el[name].apply(el, args);
}
// end:source ./nodeFunctionCall.es6
// source ./nodeDataset.es6

// end:source ./nodeDataset.es6
// source ./nodeDatasetRemove.es6
function scripts_nodeDatasetRemove() {
	var el = arguments[0],
	    key = arguments[1];
	if (el == null || key == null) {
		return;
	}
	if (el.dataset) {
		delete el.dataset[key];
		return;
	}
	el.removeAttribute(key);
}
// end:source ./nodeDatasetRemove.es6
// source ./nodeSelectTextRange.es6
function scripts_nodeSelectTextRange() {
	var el = arguments[0],
	    args = Array.prototype.slice.call(arguments, 1);
	var txt = el.value;

	if (args.length === 0) {
		select(0, txt.length);
		return;
	}

	var str = args[0];
	if (typeof str === 'string') {
		var start = txt.indexOf(str);
		if (start !== -1) {
			select(start, start + str.length);
		}
		return;
	}

	var start = args[0],
	    end = args[1];
	if (typeof start === 'number' && typeof end === 'number') {
		select(start, end);
	}

	function select(start, end) {
		if (el.focus) {
			el.focus();
		}
		if (el.selectionStart !== void 0) {
			el.selectionStart = start;
			el.selectionEnd = end;
			return;
		}
		if (el.setSelectionRange !== void 0) {
			el.setSelectionRange(start, end);
			return;
		}
		throw Error('Unable to select the range');
	}
}
// end:source ./nodeSelectTextRange.es6
// source ./nodeSelectOption.es6
function scripts_nodeSelectOption() {
	// source ./events/trigger.es6
	function scripts_nodeTrigger() {
		var el = arguments[0],
		    type = arguments[1],
		    data = arguments[2];

		if (data == null && typeof el[type] === 'function') {
			el[type]();
			return;
		}

		var event = create(type, data);
		dispatch(el, event);

		function createEvent(type) {
			var event = document.createEvent('Event');
			event.initEvent(type, true, true);
			return event;
		}
		function createCustomEvent(type, data = {}) {
			var event = document.createEvent('CustomEvent');
			event.initCustomEvent(type, true, true, data);
			return event;
		}
		function create(type, data) {
			if (data == null || 'on' + type in el) return createEvent(type);

			return createCustomEvent(type, data);
		}
		function dispatch(node, event) {
			node.dispatchEvent(event);
		};
	}
	// end:source ./events/trigger.es6

	var el = arguments[0],
	    str = arguments[1];

	var opts,
	    opt = find(byText);
	if (opt == null) opt = find(byAttr('value'));
	if (opt == null) opt = find(byAttr('name'));
	if (opt == null) opt = find(byAttr('id'));
	if (opt == null) throw Error('Option not found: ' + str);

	var optEl = opt[0],
	    index = opt[1];

	el.selectedIndex = index;

	scripts_nodeTrigger(optEl, 'click');
	scripts_nodeTrigger(el, 'change');

	function byText(el, i) {
		var txt = el.textContent || '';
		return txt.trim().indexOf(str) !== -1;
	}
	function byAttr(name) {
		return function (el) {
			return (el.getAttribute(name) || '').trim() === str;
		};
	}
	function find(fn) {
		if (opts == null) opts = el.querySelectorAll('option');

		var imax = opts.length,
		    i = 0,
		    x;
		for (; i < imax; i++) {
			x = opts[i];
			if (fn(x, i) === true) return [x, i];
		}
		return null;
	}
}
// end:source ./nodeSelectOption.es6
// source ./nodeEventListener.es6
function scripts_addEventListener() {
	if (window.__eventManager == null) {
		var hash = {};
		window.__eventManager = {
			add(el, type) {
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
			remove(id) {
				var obj = hash[id];
				if (obj == null) {
					throw new Error('Event ID not found: ' + id);
				}
				delete hash[id];
				obj.el.removeEventListener(obj.type, obj.cb, false);
				return true;
			},
			tryGet(id) {
				var obj = hash[id];
				if (obj == null) {
					throw new Error('Event ID not found: ' + id);
				}
				if (obj.queue.length === 0) {
					return null;
				}
				var event = serialize(obj.queue.shift());
				return event;
			}
		};
		function serialize(model, refs) {
			if (refs == null) {
				refs = [];
			}
			if (model == null || typeof model !== 'object') {
				return model;
			}
			if (model === document || model === window) {
				// do not pass window/document objects, as causing circular refs
				return null;
			}
			if (model instanceof HTMLElement) {
				// check if element is not staled
				if (document.body.contains(model) === false) {
					return null;
				}
				return model;
			}
			if (Array.isArray(model)) {
				return model.map(function (x) {
					return serialize(x, refs);
				});
			}
			if (refs.indexOf(model) > -1) {
				return null;
			}
			refs.push(model);
			var obj = {};
			for (var key in model) {
				obj[key] = serialize(model[key], refs);
			}
			return obj;
		}
	}

	var el = arguments[0],
	    type = arguments[1];
	return window.__eventManager.add(el, type);
};
function scripts_removeEventListener() {
	var el = arguments[0],
	    id = arguments[1];
	return window.__eventManager.remove(id);
}
function scripts_pollEvent() {
	var el = arguments[0],
	    id = arguments[1];
	return window.__eventManager.tryGet(id);
}
// end:source ./nodeEventListener.es6
// source ./class/add.es6
function scripts_nodeClassAdd() {
	// source ./_inline.js
	var el = arguments[0],
	    klass = arguments[1];
	if (el == null || klass == null) {
		return;
	}
	// end:source ./_inline.js
	// source ./has.es6
	function scripts_nodeClassHas() {
		// source ./_inline.js
		var el = arguments[0],
		    klass = arguments[1];
		if (el == null || klass == null) {
			return;
		}
		// end:source ./_inline.js
		if (el.classList) {
			return el.classList.contains(klass);
		}
		return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
	}
	// end:source ./has.es6
	if (scripts_nodeClassHas(el, klass)) {
		return;
	}
	if (el.classList) {
		el.classList.add(klass);
		return;
	}
	el.className += ' ' + klass;
}
// end:source ./class/add.es6
// source ./class/remove.es6
function scripts_nodeClassRemove() {
	// source ./_inline.js
	var el = arguments[0],
	    klass = arguments[1];
	if (el == null || klass == null) {
		return;
	}
	// end:source ./_inline.js
	// source ./has.es6
	function scripts_nodeClassHas() {
		// source ./_inline.js
		var el = arguments[0],
		    klass = arguments[1];
		if (el == null || klass == null) {
			return;
		}
		// end:source ./_inline.js
		if (el.classList) {
			return el.classList.contains(klass);
		}
		return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
	}
	// end:source ./has.es6
	if (scripts_nodeClassHas(el, klass) === false) {
		return;
	}
	if (el.classList) {
		el.classList.remove(klass);
		return;
	}
	el.className = (' ' + el.className + ' ').replace(' ' + klass + ' ', ' ');
}
// end:source ./class/remove.es6
// source ./class/toggle.es6
function scripts_nodeClassToggle() {
	// source ./_inline.js
	var el = arguments[0],
	    klass = arguments[1];
	if (el == null || klass == null) {
		return;
	}
	// end:source ./_inline.js
	// source ./has.es6
	function scripts_nodeClassHas() {
		// source ./_inline.js
		var el = arguments[0],
		    klass = arguments[1];
		if (el == null || klass == null) {
			return;
		}
		// end:source ./_inline.js
		if (el.classList) {
			return el.classList.contains(klass);
		}
		return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
	}
	// end:source ./has.es6
	// source ./add.es6
	function scripts_nodeClassAdd() {
		// source ./_inline.js
		var el = arguments[0],
		    klass = arguments[1];
		if (el == null || klass == null) {
			return;
		}
		// end:source ./_inline.js
		// source ./has.es6
		function scripts_nodeClassHas() {
			// source ./_inline.js
			var el = arguments[0],
			    klass = arguments[1];
			if (el == null || klass == null) {
				return;
			}
			// end:source ./_inline.js
			if (el.classList) {
				return el.classList.contains(klass);
			}
			return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
		}
		// end:source ./has.es6
		if (scripts_nodeClassHas(el, klass)) {
			return;
		}
		if (el.classList) {
			el.classList.add(klass);
			return;
		}
		el.className += ' ' + klass;
	}
	// end:source ./add.es6
	// source ./remove.es6
	function scripts_nodeClassRemove() {
		// source ./_inline.js
		var el = arguments[0],
		    klass = arguments[1];
		if (el == null || klass == null) {
			return;
		}
		// end:source ./_inline.js
		// source ./has.es6
		function scripts_nodeClassHas() {
			// source ./_inline.js
			var el = arguments[0],
			    klass = arguments[1];
			if (el == null || klass == null) {
				return;
			}
			// end:source ./_inline.js
			if (el.classList) {
				return el.classList.contains(klass);
			}
			return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
		}
		// end:source ./has.es6
		if (scripts_nodeClassHas(el, klass) === false) {
			return;
		}
		if (el.classList) {
			el.classList.remove(klass);
			return;
		}
		el.className = (' ' + el.className + ' ').replace(' ' + klass + ' ', ' ');
	}
	// end:source ./remove.es6

	if (el.classList) {
		el.classList.toggle(klass);
		return;
	}

	if (scripts_nodeClassHas(el, klass)) {
		scripts_nodeClassRemove(el, klass);
		return;
	}
	scripts_nodeClassAdd(el, klass);
}
// end:source ./class/toggle.es6
// source ./class/has.es6
function scripts_nodeClassHas() {
	// source ./_inline.js
	var el = arguments[0],
	    klass = arguments[1];
	if (el == null || klass == null) {
		return;
	}
	// end:source ./_inline.js
	if (el.classList) {
		return el.classList.contains(klass);
	}
	return -1 !== (' ' + el.className + ' ').indexOf(' ' + klass + ' ');
}
// end:source ./class/has.es6
// source ./events/trigger.es6
function scripts_nodeTrigger() {
	var el = arguments[0],
	    type = arguments[1],
	    data = arguments[2];

	if (data == null && typeof el[type] === 'function') {
		el[type]();
		return;
	}

	var event = create(type, data);
	dispatch(el, event);

	function createEvent(type) {
		var event = document.createEvent('Event');
		event.initEvent(type, true, true);
		return event;
	}
	function createCustomEvent(type, data = {}) {
		var event = document.createEvent('CustomEvent');
		event.initCustomEvent(type, true, true, data);
		return event;
	}
	function create(type, data) {
		if (data == null || 'on' + type in el) return createEvent(type);

		return createCustomEvent(type, data);
	}
	function dispatch(node, event) {
		node.dispatchEvent(event);
	};
}
// end:source ./events/trigger.es6
// source ./css/nodeCss.es6

// end:source ./css/nodeCss.es6

// source ./http/fetch.es6

// end:source ./http/fetch.es6
// source ./events/resource.es6
function scripts_waitForResourceCallback() {
	var selector = arguments[0];
	var cb = arguments[arguments.length - 1];

	var state = document.readyState;
	var start = Date.now();
	var TIMEOUT = 10000;

	function poll() {
		var el = document.querySelector(selector);
		if (el == null) {
			let ms = Date.now() - start;
			if (ms > TIMEOUT) {
				cb({ error: new Error(`Resource wait timeout: ${selector} in ${TIMEOUT}ms`) });
				return;
			}
			setTimeout(poll, 150);
			return;
		}
		waitResource(el);
	}
	function waitResource(el) {
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
// end:source ./events/resource.es6
// end:source ./webdriver/scripts/exports.es6
// source ./SQueryLibrary.ts
"use strict";
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
	var c = arguments.length,
	    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	    d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SQuery_1;
const WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
const classify_1 = _src_utils_classify;
const CookieContainer_1 = _src_common_CookieContainer;
let SQuery = SQuery_1 = class SQuery extends WebdriverQuery_1.WebdriverQuery {};
SQuery.default = SQuery_1;
SQuery.CookieContainer = CookieContainer_1.CookieContainer;
SQuery = SQuery_1 = __decorate([classify_1.Classify, classify_1.FnPrototypeAlias], SQuery);
// Reapply already decorated SQuery to default.
SQuery.default = SQuery;
module.exports = SQuery;
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=SQueryLibrary.ts.map
// end:source ./SQueryLibrary.ts

}());
// end:source ./RootModule.js
