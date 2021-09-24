
// source ./RootModule.js
(function(){
	
	var _src_cheerio_CheerioDriver = {};
var _src_cheerio_CheerioUtils = {};
var _src_cheerio_CherrioQuery = {};
var _src_common_CookieContainer = {};
var _src_common_IQuery = {};
var _src_common_SelectorsEx = {};
var _src_fetch_Body = {};
var _src_fetch_Cache = {};
var _src_fetch_NetworkDriver = {};
var _src_fetch_NetworkTracer = {};
var _src_global = {};
var _src_jsdom_JsdomDriver = {};
var _src_jsdom_JsdomQuery = {};
var _src_utils_arr = {};
var _src_utils_async = {};
var _src_utils_classify = {};
var _src_utils_deco = {};
var _src_utils_dfr = {};
var _src_utils_humanize = {};
var _src_utils_url = {};
var _src_webdriver_DriverPool = {};
var _src_webdriver_SeleniumDriver = {};
var _src_webdriver_Webdriver = {};
var _src_webdriver_WebdriverEventsPoll = {};
var _src_webdriver_WebdriverQuery = {};
var _src_webdriver_utils_driver = {};
var _src_webdriver_utils_node = {};

// source ./ModuleSimplified.js
var _src_utils_dfr;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atma_utils_1 = require("atma-utils");
function dfr_run(fn) {
    return atma_utils_1.class_Dfr.run(fn);
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=dfr.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_dfr) && isObject(module.exports)) {
		Object.assign(_src_utils_dfr, module.exports);
		return;
	}
	_src_utils_dfr = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_utils_node;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dfr_1 = _src_utils_dfr;
function node_eval(node, mix, ...args) {
    return dfr_1.dfr_run((resolve, reject) => {
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
    return dfr_1.dfr_run((resolve, reject) => {
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=node.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_utils_node) && isObject(module.exports)) {
		Object.assign(_src_webdriver_utils_node, module.exports);
		return;
	}
	_src_webdriver_utils_node = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_global;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const seleniumDriver = require("selenium-webdriver");
let _driver;
exports.refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=global.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_global) && isObject(module.exports)) {
		Object.assign(_src_global, module.exports);
		return;
	}
	_src_global = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_arr;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=arr.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_arr) && isObject(module.exports)) {
		Object.assign(_src_utils_arr, module.exports);
		return;
	}
	_src_utils_arr = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_async;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arr_1 = _src_utils_arr;
const dfr_1 = _src_utils_dfr;
const atma_utils_1 = require("atma-utils");
function async_each(query, fn) {
    const $ = query.ctx.newAsync(null, query);
    query.ensureAsync().done($base => {
        const dfrs = arr_1.map($base, node => {
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
            return dfr_1.dfr_run(resolve => {
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
            return dfr_1.dfr_run((resolve, reject) => {
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
    return dfr_1.dfr_run((resolve, reject) => {
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
    return dfr_1.dfr_run(resolve => {
        async_toThenable(self).done(ctx => {
            if (index >= ctx.length) {
                resolve(null);
                return;
            }
            let result = getter(ctx[index]);
            if (atma_utils_1.is_Object(result) === false || atma_utils_1.is_Function(result.then) === false) {
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
        let dfrs = arr_1.map(ctx, node => {
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
    return dfr_1.dfr_run((resolve, reject) => {
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
    return dfr_1.dfr_run((resolve, reject) => {
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
    arr_1.each(dfrs, x => _always(x, ready));
}
exports._when = _when;
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=async.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_async) && isObject(module.exports)) {
		Object.assign(_src_utils_async, module.exports);
		return;
	}
	_src_utils_async = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_SelectorsEx;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=SelectorsEx.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_common_SelectorsEx) && isObject(module.exports)) {
		Object.assign(_src_common_SelectorsEx, module.exports);
		return;
	}
	_src_common_SelectorsEx = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_IQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = _src_utils_async;
const atma_utils_1 = require("atma-utils");
const dfr_1 = _src_utils_dfr;
const arr_1 = _src_utils_arr;
const SelectorsEx_1 = _src_common_SelectorsEx;
class IQueryCtx {
    newSync(arr, parent) {
        var _a;
        let query = new this.Ctor(arr);
        query.ctx.owner = (parent !== null && parent !== void 0 ? parent : this.self);
        IQueryCtx.copyFrom(query.ctx, (_a = parent) === null || _a === void 0 ? void 0 : _a.ctx);
        return query;
    }
    newAsync(arr, parent) {
        var _a;
        let query = new this.Ctor(arr);
        query.ctx.owner = (parent !== null && parent !== void 0 ? parent : this.self);
        query.then = query.ctx.thener;
        IQueryCtx.copyFrom(query.ctx, (_a = parent) === null || _a === void 0 ? void 0 : _a.ctx);
        return query;
    }
    static copyFrom(targetCtx, parentCtx) {
        var _a, _b, _c, _d;
        if (parentCtx != null) {
            targetCtx.url = (_a = parentCtx) === null || _a === void 0 ? void 0 : _a.url;
            targetCtx.source = (_b = parentCtx) === null || _b === void 0 ? void 0 : _b.source;
            targetCtx.status = (_c = parentCtx) === null || _c === void 0 ? void 0 : _c.status;
            targetCtx.headers = (_d = parentCtx) === null || _d === void 0 ? void 0 : _d.headers;
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
        if (atma_utils_1.is_ArrayLike(mix) === true) {
            return arr_1.each(mix, this.add, this);
        }
        this[this.length++] = mix;
        return this;
    }
    eq(index) {
        return async_1.async_next(this, ($, source) => {
            if (index < source.length) {
                $.add(source[index]);
            }
        });
    }
    slice(start = 0, end) {
        return async_1.async_next(this, ($, source) => {
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
        return async_1.async_next(this, ($, source) => {
            return async_1.async_waterfall(source, (node, i) => {
                $.add(node);
                return fn(node, i);
            });
        });
    }
    map(fn) {
        return async_1.async_map(this, fn);
    }
    toArray() {
        return dfr_1.dfr_run(resolve => {
            this.ensureAsync().done($ => {
                var arr = Array.prototype.slice.call($);
                resolve(arr);
            });
        });
    }
    text(str) {
        if (typeof str === 'undefined') {
            return async_1.async_aggr('', this, (accum, node) => {
                return this.textGetFn(node).then(val => accum + val);
            });
        }
        return async_1.async_each(this, ($, node) => {
            return this
                .textSetFn(node, str)
                .done(() => $.add(node));
        });
    }
    html(str) {
        if (typeof str === 'undefined') {
            return async_1.async_aggr('', this, (accum, node) => {
                return this.htmlGetFn(node).then(val => accum + val);
            });
        }
        return async_1.async_each(this, ($, node) => {
            return this
                .htmlSetFn(node, str)
                .done(() => $.add(node));
        });
    }
    outerHtml() {
        return async_1.async_aggr('', this, (accum, node) => {
            return this.htmlOuterGetFn(node).then(val => accum + val);
        });
    }
    append(html) {
        return Arr.mutate(this, node => {
            return this.appendFn(node, html);
        });
    }
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
            return async_1.async_traverse(el, (node) => this.findFn(node, sel));
        });
        //return async_traverse(this, (node: TElement) => this.findFn(node, sel));
    }
    filter(mix) {
        if (typeof mix === 'string') {
            let selector = mix;
            return async_1.async_filter(this, $single => this.matchesFn($single[0], selector));
        }
        let fn = mix;
        return async_1.async_filter(this, fn);
    }
    parent() {
        return async_1.async_traverse(this, node => {
            return this.parentFn(node);
        });
    }
    closest(sel) {
        return async_1.async_traverse(this, node => {
            return this.closestFn(node, sel);
        });
    }
    children(sel) {
        return async_1.async_traverse(this, node => {
            return this.childrenFn(node, sel);
        });
    }
    next(sel) {
        return async_1.async_traverse(this, node => {
            return this.nextFn(node, sel);
        });
    }
    on(type, cb) {
        return async_1.async_each(this, (ctx, node) => this._onFn(node, type, cb));
    }
    off(type, cb) {
        return async_1.async_each(this, (ctx, node) => this._offFn(node, type, cb));
    }
    once(type, cb = null) {
        return async_1.async_each(this, (ctx, node) => this._onOnceFn(node, type, cb));
    }
}
exports.IQuery = IQuery;
var Arr;
(function (Arr) {
    function mutate(self, mutator) {
        return async_1.async_each(self, ($, node) => {
            $.add(node);
            return mutator(node);
        });
    }
    Arr.mutate = mutate;
    function mapFirst(self, map) {
        return async_1.async_getValueOf(0, self, map);
    }
    Arr.mapFirst = mapFirst;
})(Arr || (Arr = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=IQuery.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_common_IQuery) && isObject(module.exports)) {
		Object.assign(_src_common_IQuery, module.exports);
		return;
	}
	_src_common_IQuery = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_SeleniumDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atma_utils_1 = require("atma-utils");
const selenium_webdriver_1 = require("selenium-webdriver");
function buildDriver(config) {
    config = atma_utils_1.obj_extend(Object.create(exports.DefaultConfig), config);
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=SeleniumDriver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_SeleniumDriver) && isObject(module.exports)) {
		Object.assign(_src_webdriver_SeleniumDriver, module.exports);
		return;
	}
	_src_webdriver_SeleniumDriver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_deco;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function singleton(target, propertyKey, descriptor) {
    var viaProperty = descriptor == null;
    var fn = fn_singleton(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}
exports.singleton = singleton;
function memoize(target, propertyKey, descriptor) {
    var viaProperty = descriptor == null;
    var fn = fn_memoize(viaProperty ? target[propertyKey] : descriptor.value);
    if (viaProperty) {
        target[propertyKey] = fn;
        return;
    }
    descriptor.value = fn;
    return descriptor;
}
exports.memoize = memoize;
function fn_singleton(fn) {
    var _singleton = null;
    var Wrapper = function (...args) {
        return _singleton == null
            ? (_singleton = fn.apply(this, args))
            : (_singleton);
    };
    Wrapper.clearArgs = function (...args) {
        _singleton = null;
    };
    Wrapper.clearAll = function () {
        _singleton = null;
    };
    return Wrapper;
}
function fn_memoize(fn) {
    var _cache = {}, _args = [];
    var Wrapper = function (...args) {
        var id = fn_argsId(args, _args);
        return _cache[id] == null
            ? (_cache[id] = fn.apply(this, args))
            : _cache[id];
    };
    Wrapper.clearArgs = function (...args) {
        var id = fn_argsId(args, _args);
        _cache[id] = null;
    };
    Wrapper.clearAll = function () {
        _cache = {};
    };
    return Wrapper;
}
function fn_argsId(args, cache) {
    if (args.length === 0)
        return 0;
    var imax = cache.length, i = -1;
    while (++i < imax) {
        if (args_match(cache[i], args))
            return i + 1;
    }
    cache.push(args);
    return cache.length;
}
;
function args_match(a, b) {
    if (a.length !== b.length)
        return false;
    var imax = a.length, i = 0;
    for (; i < imax; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=deco.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_deco) && isObject(module.exports)) {
		Object.assign(_src_utils_deco, module.exports);
		return;
	}
	_src_utils_deco = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_common_CookieContainer;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            let cookie = `${key}=${mix}`;
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
                if (opts && opts.extend) {
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
            if (key !== 'global' && key !== domain) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join('; ');
    }
    getDomain(url) {
        let match = /[^/]\/[^/]/.exec(url);
        let domain = match == null ? url : url.substring(0, match.index + 1);
        return domain.replace(/https?:\/\//, '').toLowerCase();
    }
}
exports.CookieContainer = CookieContainer;
exports.cookieContainer = new CookieContainer();
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=CookieContainer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_common_CookieContainer) && isObject(module.exports)) {
		Object.assign(_src_common_CookieContainer, module.exports);
		return;
	}
	_src_common_CookieContainer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_DriverPool;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const atma_utils_1 = require("atma-utils");
const SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
const driver_1 = _src_webdriver_utils_driver;
const deco_1 = _src_utils_deco;
const CookieContainer_1 = _src_common_CookieContainer;
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
        let match = /[^/]\/[^/]/.exec(url);
        let domain = match == null ? url : url.substring(0, match.index + 1);
        let currentUrl = await wrapper.driver.getCurrentUrl();
        if (!currentUrl || !currentUrl.includes(domain.replace(/https?:\/\//, ''))) {
            await wrapper.driver.get(domain);
        }
        return wrapper;
    }
    async unlockDriver(mix) {
        let driver = DriverExtractor.extractDriver(mix);
        if (driver == null) {
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
        var _a;
        if ((_a = config) === null || _a === void 0 ? void 0 : _a.cookies) {
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
    deco_1.singleton
], DriverPool.prototype, "getGlobal", null);
exports.DriverPool = DriverPool;
class DriverWrapper {
    constructor() {
        this.busy = false;
    }
    async build(config) {
        this.driver = await SeleniumDriver_1.buildDriver(config);
    }
    async ensureCookies(url, config) {
        let cookies = CookieContainer_1.cookieContainer.getCookies(url);
        if (!cookies || cookies === this.cookies) {
            return;
        }
        this.cookies = cookies;
        await driver_1.ensureCookies(this.driver, url, cookies, config);
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
        if (driver)
            return driver;
        var driver = fromOwner(mix);
        if (driver)
            return driver;
        var driver = fromWrapper(mix);
        if (driver)
            return driver;
        return null;
    }
    DriverExtractor.extractDriver = extractDriver;
})(DriverExtractor || (DriverExtractor = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=DriverPool.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_DriverPool) && isObject(module.exports)) {
		Object.assign(_src_webdriver_DriverPool, module.exports);
		return;
	}
	_src_webdriver_DriverPool = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_utils_driver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return dfr_1.dfr_run((resolve, reject) => {
        if (!cookies) {
            resolve();
            return;
        }
        let arr = cookies.split(';').map(x => x.trim()).map(single => {
            let parts = single.split('=').map(x => x.trim());
            return { name: parts[0], value: parts[1] };
        });
        ;
        let origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }
        loadUrl(driver, origin, config).then(driver => {
            let dfrs = arr.map(cookie => driver.manage().addCookie(cookie));
            async_1._when(dfrs, () => {
                resolve();
            });
        });
    });
}
exports.ensureCookies = ensureCookies;
function driver_evalAsync(el, mix, ...args) {
    let set = WebdriverQuery_1.WebdriverQuery.newAsync(void 0, el);
    let script = node_1.node_toScript(mix);
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
    waitForTrue(() => {
        return query.find(selector).then(x => {
            return x.length > 0;
        });
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
    let q = async_1.async_toThenable(query);
    async_1.async_all([q, delay]).then(([query]) => {
        let awaiters = [
            () => WaitForPageLoad.documentState(driver, 5000, waitForState),
        ];
        if (query.length > 0 && query[0] !== driver) {
            /* If element is passed, listen also for the element to be destroyed on page unload */
            let el = query[0];
            awaiters.unshift(() => WaitForPageLoad.elementLeavesDom(driver, el, 5000));
        }
        async_1.async_waterfallFn(...awaiters).then(() => {
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
            return dfr_1.dfr_run((resolve, reject) => {
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=driver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_utils_driver) && isObject(module.exports)) {
		Object.assign(_src_webdriver_utils_driver, module.exports);
		return;
	}
	_src_webdriver_utils_driver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_Webdriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const driver_1 = _src_webdriver_utils_driver;
const DriverPool_1 = _src_webdriver_DriverPool;
const atma_utils_1 = require("atma-utils");
const WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
const SelectorsEx_1 = _src_common_SelectorsEx;
exports.Webdriver = {
    fromHtml(html, config) {
        return exports.Webdriver.load(`data:text/html;charset=utf-8,${html}`, config);
    },
    build(config, setts) {
        return DriverPool_1.driverPool
            .get(null, config, setts)
            .then(wrapper => wrapper.driver);
    },
    load(url, config, setts) {
        if (url[0] === '/') {
            url = 'file://' + process.cwd() + url;
        }
        let query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(url, config, setts)
            .then(wrapper => {
            driver_1.loadUrl(wrapper.driver, url, config).then(driver => {
                query.add(driver);
                query.resolve(query);
            });
        }, error => query.reject(error));
        return query;
    },
    unlockDriver(mix) {
        DriverPool_1.driverPool.unlockDriver(mix);
    },
    fetch(url, config, setts) {
        let dfr = new atma_utils_1.class_Dfr;
        DriverPool_1.driverPool
            .getWithDomain(url, config, setts)
            .then(wrapper => {
            wrapper
                .driver
                .executeAsyncScript(scripts_fetchAsync, url, setts && setts.opts && JSON.stringify(setts.opts) || null)
                .then((result) => {
                let isError = result && result.name === 'Error';
                if (isError) {
                    DriverPool_1.driverPool.unlockDriver(wrapper);
                    dfr.reject(new Error(result.message));
                    return;
                }
                if ('findElements' in result || (atma_utils_1.is_ArrayLike(result) && result.length !== 0 && 'findElements' in result[0])) {
                    // Consumer is responsible to unlock later the driver
                    dfr.resolve(new WebdriverQuery_1.WebdriverQuery(result));
                    return;
                }
                DriverPool_1.driverPool.unlockDriver(wrapper);
                dfr.resolve(result);
            }, error => {
                dfr.reject(error);
            });
        });
        return dfr;
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=Webdriver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_Webdriver) && isObject(module.exports)) {
		Object.assign(_src_webdriver_Webdriver, module.exports);
		return;
	}
	_src_webdriver_Webdriver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_humanize;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=humanize.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_humanize) && isObject(module.exports)) {
		Object.assign(_src_utils_humanize, module.exports);
		return;
	}
	_src_utils_humanize = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_url;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=url.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_url) && isObject(module.exports)) {
		Object.assign(_src_utils_url, module.exports);
		return;
	}
	_src_utils_url = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_Cache;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        var _a;
        if (config.cache == null || config.cache === false) {
            return false;
        }
        url = url_1.serializeCachableUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = (_a = domainCache[url], (_a !== null && _a !== void 0 ? _a : domainCache[url.toLowerCase()]));
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
        var _a;
        url = url_1.serializeCachableUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = (_a = domainCache[url], (_a !== null && _a !== void 0 ? _a : domainCache[url.toLowerCase()]));
        if (meta == null) {
            return null;
        }
        delete this.meta[domainKey][url];
        this.flushMeta(domainKey);
    }
    async get(url, config) {
        var _a;
        if (config.cache == null || config.cache === false) {
            return null;
        }
        url = url_1.serializeCachableUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        let domainCache = this.meta[domainKey];
        let meta = (_a = domainCache[url], (_a !== null && _a !== void 0 ? _a : domainCache[url.toLowerCase()]));
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
        let encoding = withCompression ? 'buffer' : 'utf8';
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
        url = url_1.serializeCachableUrl(url, config);
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
        setTimeout(() => {
            atma_io_1.File
                .writeAsync(`${CACHE_BASE}/${domainKey}/meta.json`, this.meta[domainKey])
                .always(x => {
                this.isFlushDeferred = false;
            });
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
        var _a, _b;
        return _b = (_a = $getMaxAge(configCache), (_a !== null && _a !== void 0 ? _a : $getMaxAge(configMeta))), (_b !== null && _b !== void 0 ? _b : 0);
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=Cache.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fetch_Cache) && isObject(module.exports)) {
		Object.assign(_src_fetch_Cache, module.exports);
		return;
	}
	_src_fetch_Cache = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_Body;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atma_utils_1 = require("atma-utils");
var Body;
(function (Body) {
    function handleAsRawObject(opts) {
        var _a, _b, _c;
        let mime = (_b = (_a = opts.headers) === null || _a === void 0 ? void 0 : _a['content-type'], (_b !== null && _b !== void 0 ? _b : (_c = opts.headers) === null || _c === void 0 ? void 0 : _c['Content-Type']));
        if (mime == null) {
            mime = 'application/json; charset=UTF-8';
            opts.headers = atma_utils_1.obj_extend(opts.headers, {
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
            if (atma_utils_1.is_rawObject(val)) {
                flatternObject(val, out, path);
                return;
            }
            throw new Error(`Cannt flattern object. Unsupported value type in ${path}`);
        }
        return out;
    }
})(Body = exports.Body || (exports.Body = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=Body.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fetch_Body) && isObject(module.exports)) {
		Object.assign(_src_fetch_Body, module.exports);
		return;
	}
	_src_fetch_Body = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_NetworkTracer;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=NetworkTracer.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fetch_NetworkTracer) && isObject(module.exports)) {
		Object.assign(_src_fetch_NetworkTracer, module.exports);
		return;
	}
	_src_fetch_NetworkTracer = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_fetch_NetworkDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require("node-fetch");
const https = require("https");
const http = require("http");
const CookieContainer_1 = _src_common_CookieContainer;
const Cache_1 = _src_fetch_Cache;
const atma_utils_1 = require("atma-utils");
const Body_1 = _src_fetch_Body;
const NetworkTracer_1 = _src_fetch_NetworkTracer;
const url_1 = _src_utils_url;
const DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        //'Referer': 'https://www.google.de/',
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
        url = url_1.serializeCachableUrl(url, config);
        return Cache_1.cache.has(url, config);
    },
    isCachedAsync(url, config = {}) {
        url = url_1.serializeCachableUrl(url, config);
        return Cache_1.cache.hasAsync(url, config);
    },
    clearCookies() {
        CookieContainer_1.cookieContainer.clearCookies();
    },
    clearCached(url, config = {}) {
        url = url_1.serializeCachableUrl(url, config);
        Cache_1.cache.remove(url, config);
    },
    load(url, config = {}) {
        let worker = new RequestWorker(url, config);
        return worker.load();
    },
    getCookies(url) {
        return CookieContainer_1.cookieContainer.getCookies(url);
    },
    setCookies: ((...args) => {
        CookieContainer_1.cookieContainer.addCookies.apply(CookieContainer_1.cookieContainer, args);
    }),
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
        this.redirectIndex = 0;
        this.retryIndex = 0;
        const headers = Object.assign({}, DefaultOptions.headers, Headers.get(config.headers));
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
        let cookies = this.cookieContainer.getCookies(url);
        if (cookies) {
            this.options.headers['Cookie'] = cookies;
        }
        url = url_1.serializeUrl(url, config);
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
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            const HttpsProxyAgent = require('https-proxy-agent');
            this.options.agent = new HttpsProxyAgent(config.httpsProxy);
        }
        if (config.ignoreSSLErrors) {
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        }
        if (config.body != null && atma_utils_1.is_rawObject(config.body)) {
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
        return await this._fetch(this.location);
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
                    return this._fetch(this.location);
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
                return this._fetch(location);
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
        let res = await fetch(url, this.options);
        return this._handleResponse(res);
    }
}
function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
var Headers;
(function (Headers) {
    function get(headers) {
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
    Headers.get = get;
})(Headers || (Headers = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=NetworkDriver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_fetch_NetworkDriver) && isObject(module.exports)) {
		Object.assign(_src_fetch_NetworkDriver, module.exports);
		return;
	}
	_src_fetch_NetworkDriver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_jsdom_JsdomQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return dfr_1.dfr_resolve(node.classList.contains(name));
    }
    addClassFn(node, name) {
        node.classList.add(name);
        return dfr_1.dfr_resolve();
    }
    removeClassFn(node, name) {
        node.classList.remove(name);
        return dfr_1.dfr_resolve();
    }
    toggleClassFn(node, name) {
        node.classList.toggle(name);
        return dfr_1.dfr_resolve();
    }
    textGetFn(node) {
        return dfr_1.dfr_resolve(node.textContent);
    }
    textSetFn(node, text) {
        node.textContent = text;
        return dfr_1.dfr_resolve();
    }
    htmlOuterGetFn(node) {
        return dfr_1.dfr_resolve(node.outerHTML);
    }
    htmlGetFn(node) {
        return dfr_1.dfr_resolve(node.innerHTML);
    }
    htmlSetFn(node, text) {
        node.innerHTML = text;
        return dfr_1.dfr_resolve();
    }
    appendFn(node, html) {
        node.insertAdjacentHTML('beforeend', html);
        return dfr_1.dfr_resolve();
    }
    prependFn(node, html) {
        node.insertAdjacentHTML('afterbegin', html);
        return dfr_1.dfr_resolve();
    }
    beforeFn(node, html) {
        node.insertAdjacentHTML('beforebegin', html);
        return dfr_1.dfr_resolve();
    }
    afterFn(node, html) {
        node.insertAdjacentHTML('afterend', html);
        return dfr_1.dfr_resolve();
    }
    cssGet(node, prop) {
        return dfr_1.dfr_resolve(node.style[toCamelCase(prop)]);
    }
    cssSet(node, css) {
        for (let key in css) {
            node.style[toCamelCase(key)] = css[key];
        }
        return dfr_1.dfr_resolve();
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
        return dfr_1.dfr_resolve(node.getBoundingClientRect());
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
        return dfr_1.dfr_resolve();
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
        return dfr_1.dfr_resolve();
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return dfr_1.dfr_resolve(node.getAttribute(prop));
    }
    attrSetFn(node, attr) {
        for (let key in attr) {
            node.setAttribute(key, attr[key]);
        }
        return dfr_1.dfr_resolve();
    }
    valGetFn(node) {
        return this.getField(node, 'value');
    }
    valSetFn(node, value) {
        return this.setField(node, 'value', value);
    }
    dataGetFn(node, key) {
        return dfr_1.dfr_resolve(node.dataset[key]);
    }
    dataSetFn(node, data) {
        for (let key in data) {
            node.dataset[key] = data[key];
        }
        return dfr_1.dfr_resolve();
    }
    propGetFn(node, key) {
        return dfr_1.dfr_resolve(node[key]);
    }
    propSetFn(node, data) {
        for (let key in data) {
            node[key] = data[key];
        }
        return dfr_1.dfr_resolve();
    }
    //#endregion
    findFn(node, selector) {
        let arr = Array.from(node.querySelectorAll(selector));
        return dfr_1.dfr_resolve(arr);
    }
    matchesFn(node, selector) {
        return dfr_1.dfr_resolve(node.matches(selector));
    }
    parentFn(node) {
        return dfr_1.dfr_resolve(node.parentElement);
    }
    closestFn(node, sel) {
        let el = node.parentElement;
        for (; el != null; el = el.parentElement) {
            el = el.parentElement;
            if (el.matches(sel)) {
                break;
            }
        }
        return dfr_1.dfr_resolve(el);
    }
    childrenFn(node, sel) {
        let arr = Array.from(node.children);
        if (sel) {
            arr = arr.filter(el => el.matches(sel));
        }
        return dfr_1.dfr_resolve(arr);
    }
    nextFn(node, sel) {
        let next = node.nextElementSibling;
        if (sel != null) {
            for (; next != null; next = next.nextElementSibling) {
                if (next.matches(sel))
                    break;
            }
        }
        return dfr_1.dfr_resolve(next);
    }
    getField(node, field) {
        return node[field];
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            for (let key in mix) {
                node[key] = mix[key];
            }
            return dfr_1.dfr_resolve();
        }
        node[mix] = val;
        return dfr_1.dfr_resolve();
    }
    callField(node, field, ...args) {
        return dfr_1.dfr_resolve(node[field](...args));
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
        let query = new JsdomQuery();
        NetworkDriver_1.NetworkDriver.load(url, setts.opts).then(content => {
            let jsdom = new jsdom_1.JSDOM(content.toString());
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=JsdomQuery.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_jsdom_JsdomQuery) && isObject(module.exports)) {
		Object.assign(_src_jsdom_JsdomQuery, module.exports);
		return;
	}
	_src_jsdom_JsdomQuery = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_jsdom_JsdomDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=JsdomDriver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_jsdom_JsdomDriver) && isObject(module.exports)) {
		Object.assign(_src_jsdom_JsdomDriver, module.exports);
		return;
	}
	_src_jsdom_JsdomDriver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CheerioUtils;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=CheerioUtils.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_cheerio_CheerioUtils) && isObject(module.exports)) {
		Object.assign(_src_cheerio_CheerioUtils, module.exports);
		return;
	}
	_src_cheerio_CheerioUtils = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CherrioQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return dfr_1.dfr_resolve($(node).hasClass(name));
    }
    addClassFn(node, name) {
        $(node).addClass(name);
        return dfr_1.dfr_resolve();
    }
    removeClassFn(node, name) {
        $(node).removeClass(name);
        return dfr_1.dfr_resolve();
    }
    toggleClassFn(node, name) {
        $(node).toggleClass(name);
        return dfr_1.dfr_resolve();
    }
    textGetFn(node) {
        // Cheerio returns empty string on `text` for script elements
        const method = node.tagName === 'script' ? 'html' : 'text';
        return dfr_1.dfr_resolve($(node)[method]());
    }
    textSetFn(node, text) {
        $(node).text(text);
        return dfr_1.dfr_resolve();
    }
    htmlOuterGetFn(node) {
        return dfr_1.dfr_resolve($.html(node));
    }
    htmlGetFn(node) {
        return dfr_1.dfr_resolve(CheerioUtils_1.CheerioUtils.fromNode(node).html());
    }
    htmlSetFn(node, text) {
        $(node).html(text);
        return dfr_1.dfr_resolve();
    }
    appendFn(node, html) {
        $(node).append(html);
        return dfr_1.dfr_resolve();
    }
    prependFn(node, html) {
        $(node).prepend(html);
        return dfr_1.dfr_resolve();
    }
    beforeFn(node, html) {
        $(node).insertBefore(html);
        return dfr_1.dfr_resolve();
    }
    afterFn(node, html) {
        $(node).insertAfter(html);
        return dfr_1.dfr_resolve();
    }
    cssGet(node, prop) {
        return dfr_1.dfr_resolve($(node).css(prop));
    }
    cssSet(node, css) {
        $(node).css(css);
        return dfr_1.dfr_resolve();
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
        return dfr_1.dfr_resolve();
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return dfr_1.dfr_resolve($(node).attr(prop));
    }
    attrSetFn(node, attr) {
        for (let key in attr) {
            $(node).attr(key, attr[key]);
        }
        return dfr_1.dfr_resolve();
    }
    valGetFn(node) {
        return dfr_1.dfr_resolve($(node).val());
    }
    valSetFn(node, value) {
        $(node).val(value);
        return dfr_1.dfr_resolve();
    }
    dataGetFn(node, key) {
        return dfr_1.dfr_resolve($(node).data(key));
    }
    dataSetFn(node, data) {
        for (let key in data) {
            $(node).data(key, data[key]);
        }
        return dfr_1.dfr_resolve();
    }
    propGetFn(node, key) {
        return dfr_1.dfr_resolve($(node).prop(key));
    }
    propSetFn(node, data) {
        for (let key in data) {
            $(node).prop(key, data[key]);
        }
        return dfr_1.dfr_resolve();
    }
    //#endregion
    findFn(node, selector) {
        let arr = $(node).find(selector).toArray();
        return dfr_1.dfr_resolve(arr);
    }
    matchesFn(node, selector) {
        return dfr_1.dfr_resolve($(node).is(selector));
    }
    parentFn(node) {
        let el = $(node).parent().get(0);
        return dfr_1.dfr_resolve(el);
    }
    closestFn(node, sel) {
        let el = $(node).closest(sel).get(0);
        return dfr_1.dfr_resolve(el);
    }
    childrenFn(node, sel) {
        let arr = $(node).children(sel).toArray();
        return dfr_1.dfr_resolve(arr);
    }
    nextFn(node, sel) {
        let next = $(node).next(sel).get(0);
        return dfr_1.dfr_resolve(next);
    }
    getField(node, field) {
        return node[field];
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            for (let key in mix) {
                node[key] = mix[key];
            }
            return dfr_1.dfr_resolve();
        }
        node[mix] = val;
        return dfr_1.dfr_resolve();
    }
    callField(node, field, ...args) {
        return dfr_1.dfr_resolve(node[field](...args));
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
        let query = new CherrioQuery();
        NetworkDriver_1.NetworkDriver.load(url, setts.opts).then(content => {
            let html = content.toString();
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=CherrioQuery.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_cheerio_CherrioQuery) && isObject(module.exports)) {
		Object.assign(_src_cheerio_CherrioQuery, module.exports);
		return;
	}
	_src_cheerio_CherrioQuery = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_cheerio_CheerioDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return driver.get(url);
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
    executeScript(script, ...var_args) {
        throw new Error('Method not implemented.');
    }
    executeAsyncScript(script, ...var_args) {
        throw new Error('Method not implemented.');
    }
    get(url) {
        let query = CherrioQuery_1.CherrioQuery.newAsync();
        NetworkDriver_1.NetworkDriver
            .load(url, this.config)
            .then(resp => {
            this.url = resp.url;
            this.headers = resp.headers;
            this.status = resp.status;
            let html = resp.body.toString();
            let $el = CheerioUtils_1.CheerioUtils.fromHtml(html);
            query.ctx.source = html;
            query.ctx.url = url;
            query.ctx.status = resp.status;
            query.ctx.headers = resp.headers;
            query.add($el);
            query.resolve(query);
        }, error => {
            query.reject(error);
        });
        return query;
    }
    manage() {
        throw new Error('Method not implemented.');
    }
    async getCurrentUrl() {
        return this.url;
    }
    async getPageSource() {
        return this.html;
    }
}
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=CheerioDriver.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_cheerio_CheerioDriver) && isObject(module.exports)) {
		Object.assign(_src_cheerio_CheerioDriver, module.exports);
		return;
	}
	_src_cheerio_CheerioDriver = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_WebdriverEventsPoll;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = _src_webdriver_utils_node;
var WebdriverEventsPoll;
(function (WebdriverEventsPoll) {
    let bin = [];
    let ids = {};
    function addEventListener(node, type, cb) {
        return node_1.node_eval(node, scripts_addEventListener, type).then(id => {
            bin.push([node, type, cb, id]);
            ids[id] = { node, type, cb, active: true };
            async function poll() {
                let data = ids[id];
                if (data.active !== true) {
                    return;
                }
                let event = await node_1.node_eval(node, scripts_pollEvent, id);
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
            await node_1.node_eval(node, scripts_removeEventListener, _id);
            bin.splice(i, 1);
            delete ids[_id];
            i--;
        }
    }
    WebdriverEventsPoll.removeEventListener = removeEventListener;
})(WebdriverEventsPoll = exports.WebdriverEventsPoll || (exports.WebdriverEventsPoll = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=WebdriverEventsPoll.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_WebdriverEventsPoll) && isObject(module.exports)) {
		Object.assign(_src_webdriver_WebdriverEventsPoll, module.exports);
		return;
	}
	_src_webdriver_WebdriverEventsPoll = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_webdriver_WebdriverQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class WebdriverQuery extends IQuery_1.IQuery {
    hasClassFn(node, name) {
        return node_1.node_eval(node, scripts_nodeClassHas, name);
    }
    addClassFn(node, name) {
        return node_1.node_eval(node, scripts_nodeClassAdd, name);
    }
    removeClassFn(node, name) {
        return node_1.node_eval(node, scripts_nodeClassRemove, name);
    }
    toggleClassFn(node, name) {
        return node_1.node_eval(node, scripts_nodeClassToggle, name);
    }
    textGetFn(node) {
        return this.getField(node, 'textContent');
    }
    textSetFn(node, text) {
        return this.setField(node, 'textContent', text);
    }
    htmlOuterGetFn(node) {
        let driver = node_1.node_getDriver(node);
        if (driver === node) {
            return driver.getPageSource();
        }
        return this.getField(node, 'outerHTML');
    }
    htmlGetFn(node) {
        let driver = node_1.node_getDriver(node);
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
        return node_1.node_eval(node, scripts_nodeCss, css);
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
        return node_1.node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
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
        return node_1.node_eval(node, mix, ...args);
    }
    //#region Events
    clickFn(node) {
        return node.click();
    }
    triggerFn(node, type, ...args) {
        return node_1.node_eval(node, scripts_nodeTrigger, type, ...args);
    }
    selectFn(node, ...args) {
        return this.getField(node, 'tagName').then(name => {
            var fn = name === 'SELECT' ?
                scripts_nodeSelectOption :
                scripts_nodeSelectTextRange;
            return node_1.node_eval(node, fn, ...args);
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
        return node_1.node_eval(node, scripts_nodeRemove);
    }
    //#endregion
    //#region Properties
    attrGetFn(node, prop) {
        return new Promise((resolve, reject) => {
            node.getAttribute(prop).then(resolve, reject);
        });
    }
    attrSetFn(node, attr) {
        return node_1.node_eval(node, scripts_nodeAttribute, attr);
    }
    valGetFn(node) {
        return this.getField(node, 'value');
    }
    valSetFn(node, value) {
        return this.setField(node, 'value', value);
    }
    dataGetFn(node, key) {
        return node_1.node_eval(node, scripts_nodeDataset, key);
    }
    dataSetFn(node, data) {
        return node_1.node_eval(node, scripts_nodeDataset, data);
    }
    propGetFn(node, key) {
        return node_1.node_eval(node, scripts_nodeProperty, key);
    }
    propSetFn(node, data) {
        return node_1.node_eval(node, scripts_nodeProperty, data);
    }
    //#endregion
    findFn(node, selector) {
        return new Promise((resolve, reject) => {
            node.findElements({ css: selector }).then(resolve, reject);
        });
    }
    matchesFn(node, selector) {
        return node_1.node_eval(node, scripts_nodeMatchesSelector, selector);
    }
    parentFn(node) {
        return node_1.node_eval(node, scripts_nodeParent);
    }
    closestFn(node, sel) {
        return node_1.node_eval(node, scripts_nodeClosest, sel);
    }
    childrenFn(node, sel) {
        return node_1.node_eval(node, scripts_nodeChildren, sel);
    }
    nextFn(node, sel) {
        return node_1.node_eval(node, scripts_nodeNext, sel);
    }
    getField(node, field) {
        return node_1.node_eval(node, scripts_nodeProperty, field);
    }
    setField(node, mix, val) {
        if (arguments.length === 2) {
            return node_1.node_eval(node, scripts_nodeProperty, mix);
        }
        if (arguments.length === 3) {
            return node_1.node_eval(node, scripts_nodeProperty, mix, val);
        }
        return null;
    }
    callField(node, field, ...args) {
        return node_1.node_eval(node, scripts_nodeFunctionCall, field, ...args);
    }
    _onFn(node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.addEventListener(node, type, cb);
    }
    _offFn(node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, cb);
    }
    _onOnceFn(node, type, cb) {
        const fn = function (event) {
            WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, fn);
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
        return driver_1.waitForPageLoad(this);
    }
    waitForPageReady() {
        return driver_1.waitForPageLoad(this, 'interactive');
    }
    waitForElement(selector) {
        return driver_1.waitForElement(this, selector);
    }
    waitForResource(selector) {
        return driver_1.driver_evalAsync(this, scripts_waitForResourceCallback, selector);
    }
    unlock() {
        Webdriver_1.Webdriver.unlockDriver(this);
    }
    //#endregion driver utils
    static build(config, setts) {
        return Webdriver_1.Webdriver.build(config, setts);
    }
    static load(url, config = SeleniumDriver_1.DefaultConfig, setts) {
        switch (config.name.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver_1.JsdomDriver.load(url, config, setts);
            case 'cheerio':
                return CheerioDriver_1.CheerioDriver.load(url, config, setts);
            default:
                return Webdriver_1.Webdriver.load(url, config, setts);
        }
    }
    static fetch(url, config = SeleniumDriver_1.DefaultConfig, setts) {
        switch (config.name.toLowerCase()) {
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
WebdriverQuery.cheerio = CheerioDriver_1.CheerioDriver;
WebdriverQuery.jsdom = JsdomDriver_1.JsdomDriver;
WebdriverQuery.network = NetworkDriver_1.NetworkDriver;
WebdriverQuery.pseudo = SelectorsEx_1.SelectorsEx.pseudoFns;
var Events;
(function (Events) {
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
        return function (node) {
            var dfrs = arr.map(str => node.sendKeys(str));
            return dfrs[dfrs.length - 1];
        };
    }
    Events.getSequenceFunction = getSequenceFunction;
})(Events || (Events = {}));
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=WebdriverQuery.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_webdriver_WebdriverQuery) && isObject(module.exports)) {
		Object.assign(_src_webdriver_WebdriverQuery, module.exports);
		return;
	}
	_src_webdriver_WebdriverQuery = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_utils_classify;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=SQueryLibrary.js.map
//# sourceMappingURL=classify.ts.map;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_utils_classify) && isObject(module.exports)) {
		Object.assign(_src_utils_classify, module.exports);
		return;
	}
	_src_utils_classify = module.exports;
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

	var node = el.firstChild;
	while (node != null) {
		if (selector == null || scripts_nodeMatchesSelector(node, selector)) {
			out.push(node);
		}
		node = node.nextSibling;
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
function scripts_nodeProperty() {
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
		return el[key];
	}
	function set(el, key, val) {
		el[key] = val;
	}
}
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
function scripts_nodeDataset() {
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
};
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
			},
			tryGet(id) {
				var obj = hash[id];
				if (obj == null) {
					throw new Error('Event ID not found: ' + id);
				}
				if (obj.queue.length === 0) {
					return null;
				}
				return obj.queue.shift();
			}
		};
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
function scripts_nodeCss() {
	// source ../_inlineGetSetKeyValue.js
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
// end:source ./css/nodeCss.es6

// source ./http/fetch.es6
function scripts_fetchAsync() {
	var url = arguments[0];
	var opts = null;
	if (arguments.length > 2) {
		opts = arguments[1];
		if (typeof opts === 'strings') {
			opts = JSON.parse(opts);
		}
	}

	var callback = arguments[arguments.length - 1];

	fetch(url, opts).then(response => {
		if (!response.ok) {
			callback({
				name: 'Error',
				message: url + " has the status code " + response.status
			});
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
				} catch (error) {
					callback(error);
				}
				return;
			}
			callback(text);
		}, callback);
	}, callback);
}
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
