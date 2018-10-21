
// source ./RootModule.js
(function(){
	
	var _src_common_CookieContainer = {};
var _src_common_IQuery = {};
var _src_fetch_Cache = {};
var _src_fetch_NetworkDriver = {};
var _src_global = {};
var _src_jsdom_JsdomDriver = {};
var _src_jsdom_JsdomQuery = {};
var _src_jsdom_Network = {};
var _src_utils_arr = {};
var _src_utils_async = {};
var _src_utils_classify = {};
var _src_utils_deco = {};
var _src_utils_dfr = {};
var _src_webdriver_DriverPool = {};
var _src_webdriver_SeleniumDriver = {};
var _src_webdriver_Webdriver = {};
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
var atma_utils_1 = require("atma-utils");
function dfr_run(fn) {
    return atma_utils_1.class_Dfr.run(fn);
}
exports.dfr_run = dfr_run;
;
function dfr_resolve(x) {
    var dfr = new atma_utils_1.class_Dfr;
    var args = arguments.length === 0 ? [] : [x];
    dfr.resolve.apply(dfr, args);
    return dfr;
}
exports.dfr_resolve = dfr_resolve;
;
;

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
var dfr_1 = _src_utils_dfr;
function node_eval(node, mix) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return dfr_1.dfr_run(function (resolve, reject) {
        var script = toScript(mix);
        var driver = getDriver(node);
        if (driver == null) {
            reject(new Error('Driver is not resolved.'));
            return;
        }
        driver
            .executeScript.apply(driver, [script, node].concat(args)).then(resolve, function (error) {
            console.error('Unexpected browser error', error);
            resolve();
        });
    });
}
exports.node_eval = node_eval;
;
function getDriver(node) {
    if ('executeScript' in node) {
        return node;
    }
    if ('getDriver' in node) {
        return node.getDriver();
    }
    return node.driver_;
}
function toScript(mix) {
    if (typeof mix === 'string') {
        return mix;
    }
    var script = mix.toString();
    script = script.substring(script.indexOf('{') + 1);
    script = script.substring(0, script.lastIndexOf('}') - 1);
    script = script.trim();
    return script;
}
;

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
var seleniumDriver = require("selenium-webdriver");
var _driver;
exports.refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};
;

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
function each(arr, fn, ctx) {
    if (ctx === void 0) { ctx = null; }
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
    var out = [];
    each(arr, function (x, i) {
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
;

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
var arr_1 = _src_utils_arr;
var dfr_1 = _src_utils_dfr;
var atma_utils_1 = require("atma-utils");
function async_each(query, fn) {
    var $ = query.ctx.newAsync(null, query);
    query.ensureAsync().done(function ($base) {
        var dfrs = arr_1.map($base, function (node) {
            return fn($, node);
        });
        _when(dfrs, function () {
            $.resolve($);
        });
    });
    return $;
}
exports.async_each = async_each;
;
function async_map(self, fn) {
    return async_next(async_toThenable(self), function ($, source) {
        return async_waterfall(source, function (node, i) {
            return dfr_1.dfr_run(function (resolve) {
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
    return async_next(async_toThenable(self), function ($, source) {
        return async_waterfall(source, function (node, i) {
            return dfr_1.dfr_run(function (resolve, reject) {
                var x = fn($.ctx.newSync(node), i);
                if (typeof x === 'boolean') {
                    if (x === true) {
                        $.add(node);
                    }
                    resolve();
                }
                x.then(function (result) {
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
    var $ = self.ctx.newAsync(null, self);
    async_toThenable(self).done(function (ctx) {
        if (index >= ctx.length) {
            $.resolve($);
            return;
        }
        _always(fn($, self[index]), function () { return $.resolve($); });
    });
    return $;
}
exports.async_at = async_at;
;
function async_next(self, fn) {
    var $ = self.ctx.newAsync(null, self);
    async_toThenable(self).done(function (ctx) {
        _always(fn($, ctx), function () { return $.resolve($); });
    });
    return $;
}
exports.async_next = async_next;
;
function async_aggr(accum, $, fn) {
    return dfr_1.dfr_run(function (resolve, reject) {
        async_toThenable($).done(function ($) {
            async_waterfall($, function (node) {
                return fn(accum, node)
                    .then(function (val) {
                    accum = val;
                });
            })
                .then(function () { return resolve(accum); }, function (error) { return reject(error); });
        });
    });
}
exports.async_aggr = async_aggr;
;
function async_traverse(self, fn) {
    return async_each(self, function ($, node) {
        return _always(fn(node), function (mix) {
            $.add(mix);
        });
    });
}
exports.async_traverse = async_traverse;
;
function async_getValueOf(index, self, getter) {
    return dfr_1.dfr_run(function (resolve) {
        async_toThenable(self).done(function (ctx) {
            if (index >= ctx.length) {
                resolve(null);
                return;
            }
            getter(ctx[index]).then(resolve, function (error) {
                console.error('Getter error', error);
                resolve(null);
            });
        });
    });
}
exports.async_getValueOf = async_getValueOf;
;
function async_mutate(self, fn) {
    var $ = self.ctx.newAsync(null, self);
    self.ensureAsync().done(function (ctx) {
        var dfrs = arr_1.map(ctx, function (node) {
            $.add(node);
            return fn(node);
        });
        _when(dfrs, function () { return $.resolve($); });
    });
    return $;
}
exports.async_mutate = async_mutate;
;
function async_waterfall(arr, fn) {
    return dfr_1.dfr_run(function (resolve, reject) {
        var i = -1, imax = arr.length;
        function next() {
            if (++i >= imax) {
                resolve();
                return;
            }
            fn(arr[i], i).then(function () { return next(); }, function (error) { return reject(error); });
        }
        next();
    });
}
exports.async_waterfall = async_waterfall;
;
function async_waterfallFn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return dfr_1.dfr_run(function (resolve, reject) {
        var i = -1, imax = args.length;
        function next() {
            if (++i >= imax) {
                resolve();
                return;
            }
            args[i]().then(function () { return next(); }, function (error) { return reject(error); });
        }
        next();
    });
}
exports.async_waterfallFn = async_waterfallFn;
function async_all(dfrs) {
    var wait = dfrs.length;
    var error = null;
    var result = new Array(dfrs.length);
    var self = new atma_utils_1.class_Dfr;
    dfrs.forEach(function (dfr, i) {
        dfr.then(function (x) {
            if (error)
                return;
            result[i] = x;
            if (--wait > 0) {
                self.resolve(result);
            }
        }, function (err) {
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
    return dfr.then(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        fn.apply(void 0, args);
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
    arr_1.each(dfrs, function (x) { return _always(x, ready); });
}
exports._when = _when;
;

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
var _src_common_IQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = _src_utils_async;
var atma_utils_1 = require("atma-utils");
var dfr_1 = _src_utils_dfr;
var arr_1 = _src_utils_arr;
var IQueryCtx = /** @class */ (function () {
    function IQueryCtx() {
    }
    IQueryCtx.prototype.newSync = function (arr, parent) {
        var query = new this.Ctor(arr);
        query.ctx.owner = parent;
        return query;
    };
    IQueryCtx.prototype.newAsync = function (arr, parent) {
        var query = new this.Ctor(arr);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    };
    return IQueryCtx;
}());
exports.IQueryCtx = IQueryCtx;
var IQuery = /** @class */ (function (_super) {
    __extends(IQuery, _super);
    function IQuery(mix) {
        var _this = _super.call(this) || this;
        _this.length = 0;
        _this.ctx = new IQueryCtx;
        _this.ctx.self = _this;
        _this.ctx.thener = _this.then;
        _this.ctx.Ctor = _this.constructor;
        _this.ensureSync();
        _this.add(mix);
        if (mix != null) {
            _this.resolve(_this);
        }
        return _this;
    }
    IQuery.prototype.ensureSync = function () {
        this.then = null;
        return this;
    };
    IQuery.prototype.ensureAsync = function () {
        if (this.then != null) {
            return this;
        }
        return this.ctx.newAsync(this, this);
    };
    IQuery.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 0) {
            var x = args[0];
            if (x.then != null && x instanceof IQuery) {
                var q = new x.ctx.Ctor(x);
                args[0] = q;
            }
        }
        return _super.prototype.resolve.apply(this, args);
    };
    //#region CssClass
    IQuery.prototype.hasClass = function (name) {
        var _this = this;
        return Arr.mapFirst(this, function (node) { return _this.hasClassFn(node, name); });
    };
    IQuery.prototype.addClass = function (name) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.addClassFn(node, name); });
    };
    IQuery.prototype.removeClass = function (name) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.removeClassFn(node, name); });
    };
    IQuery.prototype.toggleClass = function (name) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.toggleClassFn(node, name); });
    };
    //#endregion CssClass
    //#region Collection
    IQuery.prototype.add = function (mix) {
        if (mix == null) {
            return this;
        }
        if (atma_utils_1.is_ArrayLike(mix) === true) {
            return arr_1.each(mix, this.add, this);
        }
        this[this.length++] = mix;
        return this;
    };
    IQuery.prototype.eq = function (index) {
        return async_1.async_next(this, function ($, source) {
            if (index < source.length) {
                $.add(source[index]);
            }
        });
    };
    IQuery.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        return async_1.async_next(this, function ($, source) {
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
    };
    IQuery.prototype.each = function (fn) {
        return async_1.async_next(this, function ($, source) {
            return async_1.async_waterfall(source, function (node, i) {
                $.add(node);
                return fn(node, i);
            });
        });
    };
    IQuery.prototype.map = function (fn) {
        return async_1.async_map(this, fn);
    };
    IQuery.prototype.toArray = function () {
        var _this = this;
        return dfr_1.dfr_run(function (resolve) {
            _this.ensureAsync().done(function ($) {
                var arr = Array.prototype.slice.call($);
                resolve(arr);
            });
        });
    };
    IQuery.prototype.text = function (str) {
        var _this = this;
        if (typeof str === 'undefined') {
            return async_1.async_aggr('', this, function (accum, node) {
                return _this.textGetFn(node).then(function (val) { return accum + val; });
            });
        }
        return async_1.async_each(this, function ($, node) {
            return _this
                .textSetFn(node, str)
                .done(function () { return $.add(node); });
        });
    };
    IQuery.prototype.html = function (str) {
        var _this = this;
        if (typeof str === 'undefined') {
            return Arr.mapFirst(this, function (node) { return _this.htmlGetFn(node); });
        }
        return async_1.async_each(this, function ($, node) {
            return _this
                .htmlSetFn(node, str)
                .done(function () { return $.add(node); });
        });
    };
    IQuery.prototype.append = function (html) {
        var _this = this;
        return Arr.mutate(this, function (node) {
            return _this.appendFn(node, html);
        });
    };
    IQuery.prototype.prepend = function (html) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.prependFn(node, html); });
    };
    IQuery.prototype.before = function (html) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.beforeFn(node, html); });
    };
    IQuery.prototype.after = function (html) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.afterFn(node, html); });
    };
    IQuery.prototype.css = function (mix, val) {
        var _this = this;
        var _a;
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, function (node) { return _this.cssGet(node, mix); });
        }
        var css = arguments.length === 1 ? mix : (_a = {}, _a[mix] = val, _a);
        return Arr.mutate(this, function (node) { return _this.cssSet(node, css); });
    };
    IQuery.prototype.height = function (val) {
        var _this = this;
        if (val == null) {
            return Arr.mapFirst(this, function (node) { return _this.heightGetFn(node); });
        }
        return this.css('height', val);
    };
    IQuery.prototype.innerHeight = function () {
        var _this = this;
        return Arr.mapFirst(this, function (node) { return _this.innerHeightFn(node); });
    };
    IQuery.prototype.width = function (val) {
        var _this = this;
        if (val === void 0) { val = null; }
        if (val == null) {
            return Arr.mapFirst(this, function (node) { return _this.widthGetFn(node); });
        }
        return this.css('width', val);
    };
    IQuery.prototype.innerWidth = function () {
        var _this = this;
        return Arr.mapFirst(this, function (node) { return _this.innerWidthFn(node); });
    };
    IQuery.prototype.offset = function () {
        var _this = this;
        return Arr.mapFirst(this, function (node) { return _this.getBoundingClientRect(node); });
    };
    IQuery.prototype.position = function () {
        var _this = this;
        return Arr.mapFirst(this, function (node) { return _this.getPosition(node); });
    };
    IQuery.prototype.scrollTop = function (mix) {
        var _this = this;
        if (arguments.length === 0) {
            return Arr.mapFirst(this, function (node) { return _this.scrollTopGetFn(node); });
        }
        return Arr.mutate(this, function (node) { return _this.scrollTopSetFn(node, mix); });
    };
    IQuery.prototype.scrollLeft = function (mix) {
        var _this = this;
        if (arguments.length === 0) {
            return Arr.mapFirst(this, function (node) { return _this.scrollLeftGetFn(node); });
        }
        return Arr.mutate(this, function (node) { return _this.scrollLeftSetFn(node, mix); });
    };
    //#endregion
    //#region driver
    IQuery.prototype.eval = function (mix) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return Arr.mapFirst(this, function (node) { return _this.evalFn.apply(_this, [node, mix].concat(args)); });
    };
    //#endregion
    //#region Events
    IQuery.prototype.click = function () {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.clickFn(node); });
    };
    IQuery.prototype.trigger = function (type) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return Arr.mutate(this, function (node) { return _this.triggerFn.apply(_this, [node, type].concat(args)); });
    };
    IQuery.prototype.select = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Arr.mutate(this, function (node) { return _this.selectFn.apply(_this, [node].concat(args)); });
    };
    IQuery.prototype.focus = function () {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.focusFn(node); });
    };
    IQuery.prototype.blur = function () {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.blurFn(node); });
    };
    IQuery.prototype.sendKeys = function (mix) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.sendKeysFn(node, mix); });
    };
    IQuery.prototype.type = function (str) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.typeFn(node, str); });
    };
    IQuery.prototype.press = function (str) {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.pressFn(node, str); });
    };
    //#endregion
    //#region Manipulate
    IQuery.prototype.remove = function () {
        var _this = this;
        return Arr.mutate(this, function (node) { return _this.removeFn(node); });
    };
    IQuery.prototype.attr = function (mix, val) {
        var _this = this;
        var _a;
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, function (node) { return _this.attrGetFn(node, mix); });
        }
        var attr = arguments.length === 2 ? (_a = {}, _a[mix] = val, _a) : mix;
        return Arr.mutate(this, function (node) { return _this.attrSetFn(node, attr); });
    };
    IQuery.prototype.val = function (val) {
        var _this = this;
        if (arguments.length === 0) {
            return Arr.mapFirst(this, function (node) { return _this.valGetFn(node); });
        }
        return Arr.mutate(this, function (node) { return _this.valSetFn(node, val); });
    };
    IQuery.prototype.data = function (mix, val) {
        var _this = this;
        var _a;
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, function (node) { return _this.dataGetFn(node, mix); });
        }
        var data = arguments.length === 2 ? (_a = {}, _a[mix] = val, _a) : mix;
        return Arr.mutate(this, function (node) { return _this.dataSetFn(node, data); });
    };
    IQuery.prototype.prop = function (mix, val) {
        var _this = this;
        var _a;
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, function (node) { return _this.getField(node, mix); });
        }
        var obj = arguments.length === 2 ? (_a = {}, _a[mix] = val, _a) : mix;
        return Arr.mutate(this, function (node) { return _this.setField(node, obj); });
    };
    //#endregion
    //#region Traverse
    IQuery.prototype.find = function (sel) {
        var _this = this;
        return async_1.async_traverse(this, function (node) { return _this.findFn(node, sel); });
    };
    IQuery.prototype.filter = function (mix) {
        var _this = this;
        if (typeof mix === 'string') {
            var selector_1 = mix;
            return async_1.async_filter(this, function ($single) { return _this.matchesFn($single[0], selector_1); });
        }
        var fn = mix;
        return async_1.async_filter(this, fn);
    };
    IQuery.prototype.parent = function () {
        var _this = this;
        return async_1.async_traverse(this, function (node) {
            return _this.parentFn(node);
        });
    };
    IQuery.prototype.closest = function (sel) {
        var _this = this;
        return async_1.async_traverse(this, function (node) {
            return _this.closestFn(node, sel);
        });
    };
    IQuery.prototype.children = function (sel) {
        var _this = this;
        return async_1.async_traverse(this, function (node) {
            return _this.childrenFn(node, sel);
        });
    };
    IQuery.prototype.next = function (sel) {
        var _this = this;
        return async_1.async_traverse(this, function (node) {
            return _this.nextFn(node, sel);
        });
    };
    return IQuery;
}(atma_utils_1.class_Dfr));
exports.IQuery = IQuery;
var Arr;
(function (Arr) {
    function mutate(self, mutator) {
        return async_1.async_each(self, function ($, node) {
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
;

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
var atma_utils_1 = require("atma-utils");
var selenium_webdriver_1 = require("selenium-webdriver");
function buildDriver(config) {
    config = atma_utils_1.obj_extend(Object.create(exports.DefaultConfig), config);
    var browser = require('selenium-webdriver/' + config.name.toLowerCase());
    var options = new browser.Options;
    config.setBinaryPath(options);
    config.setArguments(options);
    config.setLogging(options);
    var builder = new selenium_webdriver_1.Builder().forBrowser(config.name.toLowerCase());
    config.setOptions(builder, options);
    config.applyOptions(builder, options);
    return builder.build();
}
exports.buildDriver = buildDriver;
exports.DefaultConfig = {
    name: 'Chrome',
    args: ['no-sandbox'],
    binaryPath: null,
    applyOptions: function (builder, options) {
        var fn = "set" + this.name + "Options";
        if (typeof builder[fn] !== 'function') {
            throw Error("Default function not found, please override 'applyOptions(builder, options)' to set it yourself. Was looking for : " + fn);
        }
        builder[fn](options);
    },
    setOptions: function (builder, options) {
    },
    setArguments: function (options) {
        options.addArguments(this.args);
    },
    setBinaryPath: function (options) {
        var fn = "set" + this.name + "BinaryPath";
        if (typeof options[fn] !== 'function') {
            throw Error("Default function not found, please override 'setBinaryPath' to set it yourself. Was looking for: " + fn);
        }
        if (this.binaryPath) {
            options[fn](this.binaryPath);
        }
    },
    setLogging: function (options) {
        options.setLoggingPrefs({});
    }
};
if (typeof process.env.BROWSER_PATH !== 'undefined') {
    exports.DefaultConfig.binaryPath = process.env.BROWSER_PATH;
}
;

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
    var Wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _singleton == null
            ? (_singleton = fn.apply(this, args))
            : (_singleton);
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _singleton = null;
    };
    Wrapper.clearAll = function () {
        _singleton = null;
    };
    return Wrapper;
}
function fn_memoize(fn) {
    var _cache = {}, _args = [];
    var Wrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var id = fn_argsId(args, _args);
        return _cache[id] == null
            ? (_cache[id] = fn.apply(this, args))
            : _cache[id];
    };
    Wrapper.clearArgs = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
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
;

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
var DomainCookie = /** @class */ (function () {
    function DomainCookie(domain) {
        this.domain = domain;
        this.arr = [];
    }
    DomainCookie.prototype.add = function (mix) {
        var _a, _b;
        if (typeof mix === 'string') {
            var arr = mix.split(';').map(function (x) { return x.trim(); });
            (_a = this.arr).push.apply(_a, arr);
        }
        if (Array.isArray(mix)) {
            if (mix.length === 0) {
                return;
            }
            var f = mix[0];
            if (typeof f === 'string') {
                (_b = this.arr).push.apply(_b, mix);
                return;
            }
            throw Error('Cookie models are not yet supported');
        }
    };
    DomainCookie.prototype.stringify = function () {
        return this.arr.join(';');
    };
    return DomainCookie;
}());
var CookieContainer = /** @class */ (function () {
    function CookieContainer() {
        this.domains = {};
    }
    CookieContainer.prototype.addCookies = function (mix, cookies) {
        var domain = 'global';
        if (arguments.length === 2) {
            var url = mix;
            domain = this.getDomain(url);
        }
        else {
            cookies = mix;
        }
        var container = this.domains[domain];
        if (container == null) {
            container = this.domains[domain] = new DomainCookie(domain);
        }
        container.add(cookies);
    };
    CookieContainer.prototype.getCookies = function (url) {
        var cookies = [];
        var domain = url && this.getDomain(url) || null;
        for (var key in this.domains) {
            if (key !== 'global' && key !== domain) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join(';');
    };
    CookieContainer.prototype.getDomain = function (url) {
        var match = /[^/]\/[^/]/.exec(url);
        var domain = match == null ? url : url.substring(0, match.index + 1);
        return domain.replace(/https?:\/\//, '').toLowerCase();
    };
    return CookieContainer;
}());
exports.CookieContainer = CookieContainer;
exports.cookieContainer = new CookieContainer();
;

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var atma_utils_1 = require("atma-utils");
var SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
var driver_1 = _src_webdriver_utils_driver;
var deco_1 = _src_utils_deco;
var CookieContainer_1 = _src_common_CookieContainer;
var POOL_DEFAULT = 5;
var POOL_CUSTOM;
var DriverPool = /** @class */ (function () {
    function DriverPool() {
        this.pool = [];
        this.queue = [];
    }
    DriverPool.prototype.get = function (url, config, setts) {
        if (url === void 0) { url = null; }
        return __awaiter(this, void 0, Promise, function () {
            var driver_2, wrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!setts) return [3 /*break*/, 2];
                        driver_2 = DriverExtractor.extractDriver(setts.query);
                        if (driver_2) {
                            if (this.singleton && this.singleton.driver === driver_2) {
                                this.singleton.busy = true;
                                return [2 /*return*/, this.singleton];
                            }
                            wrapper = this.pool.find(function (x) { return x.driver === driver_2; });
                            if (wrapper == null) {
                                wrapper = new DriverWrapper();
                                wrapper.driver = driver_2;
                                wrapper.busy = true;
                                wrapper.requestedAt = new Date();
                                this.pool.push(wrapper);
                            }
                            return [2 /*return*/, wrapper];
                        }
                        if (!setts.pool) return [3 /*break*/, 2];
                        if (typeof setts.pool === 'number') {
                            POOL_CUSTOM = Math.max(setts.pool, this.pool.length);
                        }
                        return [4 /*yield*/, this.requestDriver(url, config)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [4 /*yield*/, this.getGlobal(url, config)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DriverPool.prototype.getWithDomain = function (url, config, setts) {
        if (url === void 0) { url = null; }
        return __awaiter(this, void 0, Promise, function () {
            var wrapper, match, domain, currentUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(url, config, setts)];
                    case 1:
                        wrapper = _a.sent();
                        match = /[^/]\/[^/]/.exec(url);
                        domain = match == null ? url : url.substring(0, match.index + 1);
                        return [4 /*yield*/, wrapper.driver.getCurrentUrl()];
                    case 2:
                        currentUrl = _a.sent();
                        if (!(!currentUrl || !currentUrl.includes(domain.replace(/https?:\/\//, '')))) return [3 /*break*/, 4];
                        return [4 /*yield*/, wrapper.driver.get(domain)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, wrapper];
                }
            });
        });
    };
    DriverPool.prototype.unlockDriver = function (mix) {
        return __awaiter(this, void 0, void 0, function () {
            var driver, wrapper, dfrData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        driver = DriverExtractor.extractDriver(mix);
                        wrapper = this.pool.find(function (x) { return x.driver === driver; });
                        if (wrapper == null) {
                            console.warn('Unlocking: Wrapper not found');
                            return [2 /*return*/];
                        }
                        wrapper.busy = false;
                        dfrData = this.queue.shift();
                        if (!dfrData) return [3 /*break*/, 2];
                        wrapper.busy = true;
                        return [4 /*yield*/, wrapper.ensureCookies(dfrData.url, dfrData.config)];
                    case 1:
                        _a.sent();
                        dfrData.dfr.resolve(wrapper);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DriverPool.prototype.getGlobal = function (url, config) {
        if (url === void 0) { url = null; }
        return __awaiter(this, void 0, Promise, function () {
            var singleton;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memCookies(url, config);
                        singleton = new DriverWrapper();
                        return [4 /*yield*/, singleton.build(config)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, singleton.ensureCookies(url, config)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, (this.singleton = singleton)];
                }
            });
        });
    };
    DriverPool.prototype.extractDriver = function (query) {
        return DriverExtractor.extractDriver(query);
    };
    DriverPool.prototype.requestDriver = function (url, config) {
        if (url === void 0) { url = null; }
        return __awaiter(this, void 0, Promise, function () {
            var free, wrapper, dfr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.memCookies(url, config);
                        free = this.pool.find(function (x) { return x.busy !== true; });
                        if (!free) return [3 /*break*/, 2];
                        free.busy = true;
                        return [4 /*yield*/, free.ensureCookies(url, config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, free];
                    case 2:
                        if (!(this.pool.length < getPoolCount())) return [3 /*break*/, 5];
                        wrapper = new DriverWrapper();
                        wrapper.busy = true;
                        wrapper.requestedAt = new Date;
                        this.pool.push(wrapper);
                        return [4 /*yield*/, wrapper.build(config)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, wrapper.ensureCookies(url, config)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, wrapper];
                    case 5:
                        dfr = new atma_utils_1.class_Dfr();
                        this.queue.push({ url: url, config: config, dfr: dfr });
                        return [2 /*return*/, dfr];
                }
            });
        });
    };
    DriverPool.prototype.memCookies = function (url, config) {
        if (config && config.cookies) {
            CookieContainer_1.cookieContainer.addCookies(url, config.cookies);
        }
    };
    DriverPool.prototype.setGlobal = function (driver) {
        this.singleton = new DriverWrapper();
        this.singleton.busy = false;
        this.singleton.driver = driver;
    };
    __decorate([
        deco_1.singleton
    ], DriverPool.prototype, "getGlobal", null);
    return DriverPool;
}());
exports.DriverPool = DriverPool;
var DriverWrapper = /** @class */ (function () {
    function DriverWrapper() {
        this.busy = false;
    }
    DriverWrapper.prototype.build = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, SeleniumDriver_1.buildDriver(config)];
                    case 1:
                        _a.driver = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DriverWrapper.prototype.ensureCookies = function (url, config) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookies = CookieContainer_1.cookieContainer.getCookies(url);
                        if (!cookies || cookies === this.cookies) {
                            return [2 /*return*/];
                        }
                        this.cookies = cookies;
                        return [4 /*yield*/, driver_1.ensureCookies(this.driver, url, cookies, config)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DriverWrapper;
}());
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
        var el = mix[0];
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
        var owner = mix.ctx && mix.ctx.owner;
        var stack = [];
        while (owner != null) {
            var driver = fromQuery(owner);
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
;

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
var dfr_1 = _src_utils_dfr;
var async_1 = _src_utils_async;
var DriverPool_1 = _src_webdriver_DriverPool;
var WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
var atma_utils_1 = require("atma-utils");
function loadUrl(driver, url, config) {
    return driver
        .get(url)
        .then(function () { return driver; }, function (error) {
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
    return dfr_1.dfr_run(function (resolve, reject) {
        if (!cookies) {
            resolve();
            return;
        }
        var arr = cookies.split(';').map(function (x) { return x.trim(); }).map(function (single) {
            var parts = single.split('=').map(function (x) { return x.trim(); });
            return { name: parts[0], value: parts[1] };
        });
        ;
        var origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }
        loadUrl(driver, origin, config).then(function (driver) {
            var dfrs = arr.map(function (cookie) { return driver.manage().addCookie(cookie); });
            async_1._when(dfrs, function () {
                resolve();
            });
        });
    });
}
exports.ensureCookies = ensureCookies;
function waitForElement(query, selector) {
    var driver = DriverPool_1.driverPool.extractDriver(query);
    var set = WebdriverQuery_1.WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error("Driver not found in set"));
        return;
    }
    waitForTrue(function () {
        return query.find(selector).then(function (x) {
            return x.length > 0;
        });
    }, 10000).then(function () {
        query.find(selector).then(function (x) { return set.resolve(x); }, function (err) { return set.reject(err); });
    }, function (err) { return set.reject(err); });
    return set;
}
exports.waitForElement = waitForElement;
function waitForPageLoad(query) {
    var driver = DriverPool_1.driverPool.extractDriver(query);
    var set = WebdriverQuery_1.WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error("Driver not found in set"));
        return;
    }
    var delay = WaitForPageLoad.delay();
    var q = async_1.async_toThenable(query);
    async_1.async_all([q, delay]).then(function (_a) {
        var query = _a[0];
        var awaiters = [
            function () { return WaitForPageLoad.documentIsReady(driver, 5000); },
        ];
        if (query.length > 0 && query[0] !== driver) {
            /* If element is passed, listen also for the element to be destroyed on page unload */
            var el_1 = query[0];
            awaiters.unshift(function () { return WaitForPageLoad.elementLeavesDom(driver, el_1, 5000); });
        }
        async_1.async_waterfallFn.apply(void 0, awaiters).then(function () {
            set.add(driver);
            set.resolve(set);
        }, function (error) { return set.reject(error); });
    });
    return set;
}
exports.waitForPageLoad = waitForPageLoad;
var WaitForPageLoad;
(function (WaitForPageLoad) {
    function delay() {
        var dfr = new atma_utils_1.class_Dfr;
        setTimeout(function () { return dfr.resolve(); }, 100);
        return dfr;
    }
    WaitForPageLoad.delay = delay;
    function documentIsReady(driver, timeout) {
        var dfr = new atma_utils_1.class_Dfr;
        waitForTrue(isReady, timeout).then(function () {
            dfr.resolve();
        }, function (error) {
            dfr.reject(new Error("ReadyState timeout"));
        });
        return dfr;
        function isReady() {
            return driver
                .executeScript('return document.readyState')
                .then(function (state) {
                return state === 'complete';
            });
        }
    }
    WaitForPageLoad.documentIsReady = documentIsReady;
    function elementLeavesDom(driver, el, timeout) {
        var dfr = new atma_utils_1.class_Dfr;
        waitForTrue(isStale, timeout).then(function (x) {
            dfr.resolve();
        }, function (error) {
            dfr.reject(new Error("The old element is still in dom after " + timeout + "ms. Reload is not triggered"));
        });
        return dfr;
        function isStale() {
            return dfr_1.dfr_run(function (resolve, reject) {
                el.getTagName().then(function (x) {
                    resolve(false);
                }, function (x) {
                    // waiting for StaleElementReferenceError
                    resolve(true);
                });
            });
        }
    }
    WaitForPageLoad.elementLeavesDom = elementLeavesDom;
})(WaitForPageLoad || (WaitForPageLoad = {}));
function waitForTrue(check, timeout) {
    var dfr = new atma_utils_1.class_Dfr;
    var time = Date.now();
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
        }, function (error) { return dfr.reject(error); });
    }
    tick();
    return dfr;
}
;

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
var driver_1 = _src_webdriver_utils_driver;
var DriverPool_1 = _src_webdriver_DriverPool;
var atma_utils_1 = require("atma-utils");
var WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
exports.Webdriver = {
    build: function (config, setts) {
        return DriverPool_1.driverPool
            .get(null, config, setts)
            .then(function (wrapper) { return wrapper.driver; });
    },
    load: function (url, config, setts) {
        if (url[0] === '/') {
            url = 'file://' + process.cwd() + url;
        }
        var query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(url, config, setts)
            .then(function (wrapper) {
            driver_1.loadUrl(wrapper.driver, url, config).then(function (driver) {
                query.add(driver);
                query.resolve(query);
            });
        }, function (error) { return query.reject(error); });
        return query;
    },
    unlockDriver: function (mix) {
        DriverPool_1.driverPool.unlockDriver(mix);
    },
    fetch: function (url, config, setts) {
        var dfr = new atma_utils_1.class_Dfr;
        DriverPool_1.driverPool
            .getWithDomain(url, config, setts)
            .then(function (wrapper) {
            wrapper
                .driver
                .executeAsyncScript(scripts_fetchAsync, url, setts && setts.opts && JSON.stringify(setts.opts) || null)
                .then(function (result) {
                var isError = result && result.name === 'Error';
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
            }, function (error) {
                dfr.reject(error);
            });
        });
        return dfr;
    }
};
;

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
var _src_jsdom_Network;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require("fetch");
var DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.google.de/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
};
var Network = /** @class */ (function () {
    function Network() {
    }
    Network.fetch = function (url, opts) {
        if (opts === void 0) { opts = {}; }
        if (opts.headers == null) {
            opts.headers = DefaultOptions.headers;
        }
        else {
            for (var key in DefaultOptions.headers) {
                if (key in opts.headers) {
                    continue;
                }
                opts.headers[key] = DefaultOptions.headers[key];
            }
        }
        return new Promise(function (resolve, reject) {
            fetch.fetchUrl(url, opts, function (error, meta, body) {
                if (error) {
                    reject(error);
                    return;
                }
                if (meta.status >= 400) {
                    reject(new Error("Request failed " + meta.status));
                    return;
                }
                var resp = {
                    status: meta.status,
                    headers: meta.responseHeaders,
                    url: meta.finalUrl,
                    cookieJar: meta.cookieJar,
                    body: body.toString()
                };
                resolve(resp);
            });
        });
    };
    return Network;
}());
exports.Network = Network;
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_jsdom_Network) && isObject(module.exports)) {
		Object.assign(_src_jsdom_Network, module.exports);
		return;
	}
	_src_jsdom_Network = module.exports;
}());
// end:source ./ModuleSimplified.js


// source ./ModuleSimplified.js
var _src_jsdom_JsdomQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var IQuery_1 = _src_common_IQuery;
var jsdom_1 = require("jsdom");
var dfr_1 = _src_utils_dfr;
var Network_1 = _src_jsdom_Network;
var JsdomQuery = /** @class */ (function (_super) {
    __extends(JsdomQuery, _super);
    function JsdomQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsdomQuery.prototype.hasClassFn = function (node, name) {
        return dfr_1.dfr_resolve(node.classList.contains(name));
    };
    JsdomQuery.prototype.addClassFn = function (node, name) {
        node.classList.add(name);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.removeClassFn = function (node, name) {
        node.classList.remove(name);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.toggleClassFn = function (node, name) {
        node.classList.toggle(name);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.textGetFn = function (node) {
        return dfr_1.dfr_resolve(node.textContent);
    };
    JsdomQuery.prototype.textSetFn = function (node, text) {
        node.textContent = text;
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.htmlGetFn = function (node) {
        return dfr_1.dfr_resolve(node.innerHTML);
    };
    JsdomQuery.prototype.htmlSetFn = function (node, text) {
        node.innerHTML = text;
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.appendFn = function (node, html) {
        node.insertAdjacentHTML('beforeend', html);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.prependFn = function (node, html) {
        node.insertAdjacentHTML('afterbegin', html);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.beforeFn = function (node, html) {
        node.insertAdjacentHTML('beforebegin', html);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.afterFn = function (node, html) {
        node.insertAdjacentHTML('afterend', html);
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.cssGet = function (node, prop) {
        return dfr_1.dfr_resolve(node.style[toCamelCase(prop)]);
    };
    JsdomQuery.prototype.cssSet = function (node, css) {
        for (var key in css) {
            node.style[toCamelCase(key)] = css[key];
        }
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.heightGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoundingClientRect(node)];
                    case 1: return [2 /*return*/, (_a.sent()).height];
                }
            });
        });
    };
    JsdomQuery.prototype.widthGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoundingClientRect(node)];
                    case 1: return [2 /*return*/, (_a.sent()).width];
                }
            });
        });
    };
    JsdomQuery.prototype.innerHeightFn = function (node) {
        return this.getField(node, 'offsetHeight');
    };
    JsdomQuery.prototype.innerWidthFn = function (node) {
        return this.getField(node, 'offsetWidth');
    };
    JsdomQuery.prototype.getBoundingClientRect = function (node) {
        return dfr_1.dfr_resolve(node.getBoundingClientRect());
    };
    JsdomQuery.prototype.getPosition = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            var dfrTop, dfrLeft, _a, top, left;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dfrTop = this.getField(node, 'offsetTop');
                        dfrLeft = this.getField(node, 'offsetLeft');
                        return [4 /*yield*/, Promise.all([dfrTop, dfrLeft])];
                    case 1:
                        _a = _b.sent(), top = _a[0], left = _a[1];
                        return [2 /*return*/, { top: top, left: left }];
                }
            });
        });
    };
    JsdomQuery.prototype.scrollTopGetFn = function (node) {
        return this.getField(node, 'scrollTop');
    };
    JsdomQuery.prototype.scrollTopSetFn = function (node, scroll) {
        return this.setField(node, 'scrollTop', scroll);
    };
    JsdomQuery.prototype.scrollLeftGetFn = function (node) {
        return this.getField(node, 'scrollLeft');
    };
    JsdomQuery.prototype.scrollLeftSetFn = function (node, scroll) {
        return this.setField(node, 'scrollLeft', scroll);
    };
    JsdomQuery.prototype.evalFn = function (node, mix) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error('Eval is not supported in JSDOM');
    };
    //#region Events
    JsdomQuery.prototype.clickFn = function (node) {
        node.click();
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.triggerFn = function (node, type) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error('Trigger is not supported in JSDOM');
    };
    JsdomQuery.prototype.selectFn = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error('Select is not supported in JSDOM');
    };
    JsdomQuery.prototype.focusFn = function (node) {
        throw new Error('FOCUS is not supported in JSDOM');
    };
    JsdomQuery.prototype.blurFn = function (node) {
        throw new Error('BLUR is not supported in JSDOM');
    };
    JsdomQuery.prototype.sendKeysFn = function (node, mix) {
        throw new Error('SEND_KEYS is not supported in JSDOM');
    };
    JsdomQuery.prototype.typeFn = function (node, str) {
        throw new Error('TYPE is not supported in JSDOM');
    };
    JsdomQuery.prototype.pressFn = function (node, str) {
        throw new Error('PRESS is not supported in JSDOM');
    };
    //#endregion
    //#region Manipulate
    JsdomQuery.prototype.removeFn = function (node) {
        node.parentElement.removeChild(node);
        return dfr_1.dfr_resolve();
    };
    //#endregion
    //#region Properties
    JsdomQuery.prototype.attrGetFn = function (node, prop) {
        return dfr_1.dfr_resolve(node.getAttribute(prop));
    };
    JsdomQuery.prototype.attrSetFn = function (node, attr) {
        for (var key in attr) {
            node.setAttribute(key, attr[key]);
        }
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.valGetFn = function (node) {
        return this.getField(node, 'value');
    };
    JsdomQuery.prototype.valSetFn = function (node, value) {
        return this.setField(node, 'value', value);
    };
    JsdomQuery.prototype.dataGetFn = function (node, key) {
        return dfr_1.dfr_resolve(node.dataset[key]);
    };
    JsdomQuery.prototype.dataSetFn = function (node, data) {
        for (var key in data) {
            node.dataset[key] = data[key];
        }
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.propGetFn = function (node, key) {
        return dfr_1.dfr_resolve(node[key]);
    };
    JsdomQuery.prototype.propSetFn = function (node, data) {
        for (var key in data) {
            node[key] = data[key];
        }
        return dfr_1.dfr_resolve();
    };
    //#endregion
    JsdomQuery.prototype.findFn = function (node, selector) {
        var arr = Array.from(node.querySelectorAll(selector));
        return dfr_1.dfr_resolve(arr);
    };
    JsdomQuery.prototype.matchesFn = function (node, selector) {
        return dfr_1.dfr_resolve(node.matches(selector));
    };
    JsdomQuery.prototype.parentFn = function (node) {
        return dfr_1.dfr_resolve(node.parentElement);
    };
    JsdomQuery.prototype.closestFn = function (node, sel) {
        var el = node.parentElement;
        for (; el != null; el = el.parentElement) {
            el = el.parentElement;
            if (el.matches(sel)) {
                break;
            }
        }
        return dfr_1.dfr_resolve(el);
    };
    JsdomQuery.prototype.childrenFn = function (node, sel) {
        var arr = Array.from(node.children);
        if (sel) {
            arr = arr.filter(function (el) { return el.matches(sel); });
        }
        return dfr_1.dfr_resolve(arr);
    };
    JsdomQuery.prototype.nextFn = function (node, sel) {
        var next = node.nextElementSibling;
        if (sel != null) {
            for (; next != null; next = next.nextElementSibling) {
                if (next.matches(sel))
                    break;
            }
        }
        return dfr_1.dfr_resolve(next);
    };
    JsdomQuery.prototype.getField = function (node, field) {
        return node[field];
    };
    JsdomQuery.prototype.setField = function (node, mix, val) {
        if (arguments.length === 2) {
            for (var key in mix) {
                node[key] = mix[key];
            }
            return dfr_1.dfr_resolve();
        }
        node[mix] = val;
        return dfr_1.dfr_resolve();
    };
    JsdomQuery.prototype.callField = function (node, field) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return dfr_1.dfr_resolve(node[field].apply(node, args));
    };
    JsdomQuery.newAsync = function (mix, parent) {
        var query = new JsdomQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    };
    //#region driver utils
    JsdomQuery.prototype.unlock = function () {
    };
    //#endregion driver utils
    JsdomQuery.build = function (config, setts) {
        throw new Error('No build for JSDom is required. Use direkt load');
    };
    JsdomQuery.load = function (url, config, setts) {
        var query = new JsdomQuery();
        Network_1.Network.fetch(url, setts.opts).then(function (content) {
            var jsdom = new jsdom_1.JSDOM(content.toString());
            query.add(jsdom.window.document);
            query.resolve(query);
        });
        return query;
    };
    JsdomQuery.fetch = function (url, config, setts) {
        return this.load(url, config, setts);
    };
    JsdomQuery.setDriver = function (driver) {
        throw new Error('JSDOM does not support driver');
    };
    JsdomQuery.getDriver = function (config, setts) {
        throw new Error('JSDOM does not support driver');
    };
    JsdomQuery.unlockDriver = function (mix) {
    };
    return JsdomQuery;
}(IQuery_1.IQuery));
exports.JsdomQuery = JsdomQuery;
function toCamelCase(property) {
    return property.replace(/\-(\w)/g, function (full, char) {
        return char.toUpperCase();
    });
}
;

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
var _src_fetch_Cache;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Cache = /** @class */ (function () {
    function Cache() {
        this.meta = null;
    }
    Cache.prototype.get = function (url, config) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        this.ensureMeta();
        var meta = this.meta[url];
        if (meta == null) {
            return null;
        }
        var now = Date.now();
        var seconds = ((now - meta.time) / 1000) | 0;
        if (meta.maxAge && seconds > meta.maxAge) {
            return null;
        }
        var response = io.File.read("./cache/squery/" + meta.file);
        return response;
    };
    Cache.prototype.save = function (url, config, json) {
        this.ensureMeta();
        var md5 = crypto.createHash('md5').update(url).digest('hex');
        var file = md5 + ".json";
        this.meta[url] = {
            time: Date.now(),
            file: file,
            maxAge: config.cache && config.cache.maxAge
        };
        io.File.write('./cache/squery/meta.json', this.meta);
        io.File.write("./cache/squery/" + file, json);
    };
    Cache.prototype.ensureMeta = function () {
        if (this.meta != null) {
            return;
        }
        var file = './cache/squery/meta.json';
        if (io.File.exists(file)) {
            this.meta = io.File.read(file);
        }
        else {
            this.meta = {};
        }
    };
    return Cache;
}());
exports.Cache = Cache;
exports.cache = new Cache;
;

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
var _src_fetch_NetworkDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cache_1 = _src_fetch_Cache;
var fetch = require("fetch");
var CookieContainer_1 = _src_common_CookieContainer;
var DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.google.de/',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
};
exports.NetworkDriver = {
    isCached: function (url, config) {
        if (config === void 0) { config = {}; }
        url = serializeUrl(url, config);
        return Cache_1.cache.get(url, config) != null;
    },
    load: function (url, config) {
        if (config === void 0) { config = {}; }
        var options = {
            headers: Object.assign({}, DefaultOptions.headers, config.headers || {}),
            method: config.method,
            payload: config.payload,
            cookies: config.cookies
        };
        if (options.cookies) {
            CookieContainer_1.cookieContainer.addCookies(options.cookies);
        }
        if (options.headers['Cookies']) {
            CookieContainer_1.cookieContainer.addCookies(options.headers['Cookies']);
        }
        options.cookies = CookieContainer_1.cookieContainer
            .getCookies(url)
            .split(';');
        url = serializeUrl(url, config);
        return new Promise(function (resolve, reject) {
            var cached = Cache_1.cache.get(url, config);
            if (cached) {
                resolve({
                    status: cached.status,
                    url: cached.url,
                    headers: cached.headers,
                    body: cached.body,
                    cookieJar: null
                });
                return;
            }
            fetch.fetchUrl(url, options, function (error, meta, body) {
                if (error) {
                    reject(error);
                    return;
                }
                if (meta.status >= 400) {
                    reject(new Error("Request failed " + meta.status));
                    return;
                }
                var resp = {
                    status: meta.status,
                    headers: meta.responseHeaders,
                    url: meta.finalUrl,
                    cookieJar: meta.cookieJar,
                    body: body.toString()
                };
                var type = resp.headers['content-type'];
                if (type && type.includes('json')) {
                    resp.body = JSON.parse(resp.body);
                }
                Cache_1.cache.save(url, config, {
                    status: resp.status,
                    headers: resp.headers,
                    url: resp.url,
                    body: resp.body
                });
                resolve(resp);
            });
        });
    }
};
function serializeUrl(url, config) {
    if (config === void 0) { config = {}; }
    if (config.query) {
        var q = '';
        for (var key in config.query) {
            var p = key + "=" + encodeURIComponent(config.query[key]);
            q += (q ? '&' : '') + p;
        }
        url += (url.includes('?') ? '&' : '?') + q;
    }
    return url;
}
;

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
var _src_jsdom_JsdomDriver;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsdomQuery_1 = _src_jsdom_JsdomQuery;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var jsdom_1 = require("jsdom");
exports.JsdomDriver = {
    build: function (config) {
        var html = config.html;
        var jsdom = new jsdom_1.JSDOM(html);
        var el = jsdom.window.document;
        var isDocument = true;
        if (/^\s*<(?!(!?DOCTYPE|html))/i.test(html)) {
            isDocument = false;
        }
        if (config.fragment === true) {
            isDocument = false;
        }
        if (isDocument === false) {
            el = Array.from(el.body.children);
        }
        var query = new JsdomQuery_1.JsdomQuery(el);
        return query;
    },
    load: function (url, config) {
        var query = JsdomQuery_1.JsdomQuery.newAsync();
        NetworkDriver_1.NetworkDriver
            .load(url, config)
            .then(function (resp) {
            var jsdom = new jsdom_1.JSDOM(resp.body.toString());
            query.add(jsdom.window.document);
            query.resolve(query);
        }, function (error) { return query.reject(error); });
        return query;
    },
    fetch: function (url, config, setts) {
        return this.load(url, config, setts);
    },
    setDriver: function (driver) {
        throw new Error('JSDOM does not support driver');
    },
    getDriver: function (config, setts) {
        throw new Error('JSDOM does not support driver');
    },
    unlockDriver: function (mix) {
    }
};
;

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
var _src_webdriver_WebdriverQuery;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var node_1 = _src_webdriver_utils_node;
var global_1 = _src_global;
var IQuery_1 = _src_common_IQuery;
var Webdriver_1 = _src_webdriver_Webdriver;
var DriverPool_1 = _src_webdriver_DriverPool;
var JsdomDriver_1 = _src_jsdom_JsdomDriver;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var driver_1 = _src_webdriver_utils_driver;
var SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
var WebdriverQuery = /** @class */ (function (_super) {
    __extends(WebdriverQuery, _super);
    function WebdriverQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebdriverQuery.prototype.hasClassFn = function (node, name) {
        return node_1.node_eval(node, scripts_nodeClassHas, name);
    };
    WebdriverQuery.prototype.addClassFn = function (node, name) {
        return node_1.node_eval(node, scripts_nodeClassAdd, name);
    };
    WebdriverQuery.prototype.removeClassFn = function (node, name) {
        return node_1.node_eval(node, scripts_nodeClassRemove, name);
    };
    WebdriverQuery.prototype.toggleClassFn = function (node, name) {
        return node_1.node_eval(node, scripts_nodeClassToggle, name);
    };
    WebdriverQuery.prototype.textGetFn = function (node) {
        return this.getField(node, 'textContent');
    };
    WebdriverQuery.prototype.textSetFn = function (node, text) {
        return this.setField(node, 'textContent', text);
    };
    WebdriverQuery.prototype.htmlGetFn = function (node) {
        return this.getField(node, 'innerHTML');
    };
    WebdriverQuery.prototype.htmlSetFn = function (node, text) {
        return this.setField(node, 'innerHTML', text);
    };
    WebdriverQuery.prototype.appendFn = function (node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'beforeend', html);
    };
    WebdriverQuery.prototype.prependFn = function (node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'afterbegin', html);
    };
    WebdriverQuery.prototype.beforeFn = function (node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'beforebegin', html);
    };
    WebdriverQuery.prototype.afterFn = function (node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'afterend', html);
    };
    WebdriverQuery.prototype.cssGet = function (node, prop) {
        return node.getCssValue(prop);
    };
    WebdriverQuery.prototype.cssSet = function (node, css) {
        return node_1.node_eval(node, scripts_nodeCss, css);
    };
    WebdriverQuery.prototype.heightGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoundingClientRect(node)];
                    case 1: return [2 /*return*/, (_a.sent()).height];
                }
            });
        });
    };
    WebdriverQuery.prototype.widthGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getBoundingClientRect(node)];
                    case 1: return [2 /*return*/, (_a.sent()).width];
                }
            });
        });
    };
    WebdriverQuery.prototype.innerHeightFn = function (node) {
        return this.getField(node, 'offsetHeight');
    };
    WebdriverQuery.prototype.innerWidthFn = function (node) {
        return this.getField(node, 'offsetWidth');
    };
    WebdriverQuery.prototype.getBoundingClientRect = function (node) {
        return node_1.node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
    };
    WebdriverQuery.prototype.getPosition = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            var dfrTop, dfrLeft, _a, top, left;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dfrTop = this.getField(node, 'offsetTop');
                        dfrLeft = this.getField(node, 'offsetLeft');
                        return [4 /*yield*/, Promise.all([dfrTop, dfrLeft])];
                    case 1:
                        _a = _b.sent(), top = _a[0], left = _a[1];
                        return [2 /*return*/, { top: top, left: left }];
                }
            });
        });
    };
    WebdriverQuery.prototype.scrollTopGetFn = function (node) {
        return this.getField(node, 'scrollTop');
    };
    WebdriverQuery.prototype.scrollTopSetFn = function (node, scroll) {
        return this.setField(node, 'scrollTop', scroll);
    };
    WebdriverQuery.prototype.scrollLeftGetFn = function (node) {
        return this.getField(node, 'scrollLeft');
    };
    WebdriverQuery.prototype.scrollLeftSetFn = function (node, scroll) {
        return this.setField(node, 'scrollLeft', scroll);
    };
    WebdriverQuery.prototype.evalFn = function (node, mix) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return node_1.node_eval.apply(void 0, [node, mix].concat(args));
    };
    //#region Events
    WebdriverQuery.prototype.clickFn = function (node) {
        return node.click();
    };
    WebdriverQuery.prototype.triggerFn = function (node, type) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return node_1.node_eval.apply(void 0, [node, scripts_nodeTrigger, type].concat(args));
    };
    WebdriverQuery.prototype.selectFn = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.getField(node, 'tagName').then(function (name) {
            var fn = name === 'SELECT' ?
                scripts_nodeSelectOption :
                scripts_nodeSelectTextRange;
            return node_1.node_eval.apply(void 0, [node, fn].concat(args));
        });
    };
    WebdriverQuery.prototype.focusFn = function (node) {
        return this.callField(node, 'focus');
    };
    WebdriverQuery.prototype.blurFn = function (node) {
        return this.callField(node, 'blur');
    };
    WebdriverQuery.prototype.sendKeysFn = function (node, mix) {
        return node.sendKeys(mix);
    };
    WebdriverQuery.prototype.typeFn = function (node, str) {
        var arr = Events.toSequance(str), fn = Events.getSequenceFunction(arr);
        return fn(node);
    };
    WebdriverQuery.prototype.pressFn = function (node, str) {
        var key = Events.toCombination(str);
        return node.sendKeys(key);
    };
    //#endregion
    //#region Manipulate
    WebdriverQuery.prototype.removeFn = function (node) {
        return node_1.node_eval(node, scripts_nodeRemove);
    };
    //#endregion
    //#region Properties
    WebdriverQuery.prototype.attrGetFn = function (node, prop) {
        return node.getAttribute(prop);
    };
    WebdriverQuery.prototype.attrSetFn = function (node, attr) {
        return node_1.node_eval(node, scripts_nodeAttribute, attr);
    };
    WebdriverQuery.prototype.valGetFn = function (node) {
        return this.getField(node, 'value');
    };
    WebdriverQuery.prototype.valSetFn = function (node, value) {
        return this.setField(node, 'value', value);
    };
    WebdriverQuery.prototype.dataGetFn = function (node, key) {
        return node_1.node_eval(node, scripts_nodeDataset, key);
    };
    WebdriverQuery.prototype.dataSetFn = function (node, data) {
        return node_1.node_eval(node, scripts_nodeDataset, data);
    };
    WebdriverQuery.prototype.propGetFn = function (node, key) {
        return node_1.node_eval(node, scripts_nodeProperty, key);
    };
    WebdriverQuery.prototype.propSetFn = function (node, data) {
        return node_1.node_eval(node, scripts_nodeProperty, data);
    };
    //#endregion
    WebdriverQuery.prototype.findFn = function (node, selector) {
        return node.findElements({ css: selector });
    };
    WebdriverQuery.prototype.matchesFn = function (node, selector) {
        return node_1.node_eval(node, scripts_nodeMatchesSelector, selector);
    };
    WebdriverQuery.prototype.parentFn = function (node) {
        return node_1.node_eval(node, scripts_nodeParent);
    };
    WebdriverQuery.prototype.closestFn = function (node, sel) {
        return node_1.node_eval(node, scripts_nodeClosest, sel);
    };
    WebdriverQuery.prototype.childrenFn = function (node, sel) {
        return node_1.node_eval(node, scripts_nodeChildren, sel);
    };
    WebdriverQuery.prototype.nextFn = function (node, sel) {
        return node_1.node_eval(node, scripts_nodeNext, sel);
    };
    WebdriverQuery.prototype.getField = function (node, field) {
        return node_1.node_eval(node, scripts_nodeProperty, field);
    };
    WebdriverQuery.prototype.setField = function (node, mix, val) {
        if (arguments.length === 2) {
            return node_1.node_eval(node, scripts_nodeProperty, mix);
        }
        if (arguments.length === 3) {
            return node_1.node_eval(node, scripts_nodeProperty, mix, val);
        }
        return null;
    };
    WebdriverQuery.prototype.callField = function (node, field) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return node_1.node_eval.apply(void 0, [node,
            scripts_nodeFunctionCall,
            field].concat(args));
    };
    //#region driver utils
    WebdriverQuery.prototype.manage = function () {
        var driver = DriverPool_1.driverPool.extractDriver(this);
        if (driver == null) {
            console.log(this);
            throw new Error("Driver not found in set");
        }
        return driver.manage();
    };
    WebdriverQuery.prototype.waitForPageLoad = function () {
        return driver_1.waitForPageLoad(this);
    };
    WebdriverQuery.prototype.waitForElement = function (selector) {
        return driver_1.waitForElement(this, selector);
    };
    WebdriverQuery.prototype.unlock = function () {
        Webdriver_1.Webdriver.unlockDriver(this);
    };
    //#endregion driver utils
    WebdriverQuery.build = function (config, setts) {
        return Webdriver_1.Webdriver.build(config, setts);
    };
    WebdriverQuery.load = function (url, config, setts) {
        if (config === void 0) { config = SeleniumDriver_1.DefaultConfig; }
        if (config.name.toLowerCase() === 'jsdom') {
            return JsdomDriver_1.JsdomDriver.load(url, config, setts);
        }
        return Webdriver_1.Webdriver.load(url, config, setts);
    };
    WebdriverQuery.fetch = function (url, config, setts) {
        if (config === void 0) { config = SeleniumDriver_1.DefaultConfig; }
        if (config.name.toLowerCase() === 'jsdom') {
            return JsdomDriver_1.JsdomDriver.fetch(url, config, setts);
        }
        return Webdriver_1.Webdriver.fetch(url, config, setts);
    };
    WebdriverQuery.setDriver = function (driver) {
        DriverPool_1.driverPool.setGlobal(driver);
    };
    WebdriverQuery.getDriver = function (config, setts) {
        return DriverPool_1.driverPool.get('', config, setts);
    };
    WebdriverQuery.unlockDriver = function (mix) {
        Webdriver_1.Webdriver.unlockDriver(mix);
    };
    WebdriverQuery.newAsync = function (mix, parent) {
        var query = new WebdriverQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    };
    WebdriverQuery.jsdom = JsdomDriver_1.JsdomDriver;
    WebdriverQuery.network = NetworkDriver_1.NetworkDriver;
    return WebdriverQuery;
}(IQuery_1.IQuery));
exports.WebdriverQuery = WebdriverQuery;
var Events;
(function (Events) {
    var Key = global_1.refs.Key;
    var aliases = {
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
        var parts = str.split(delimiter), i = 1, imax = parts.length;
        return parts.map(function (str, i) {
            if (i % 2 === 0) {
                return str;
            }
            return Key[str];
        });
    }
    Events.toSequance = toSequance;
    function toCombination(str) {
        var keys = str.split('+');
        keys.forEach(function (x, i) {
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
        return Key.chord.apply(Key, keys);
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
            var dfrs = arr.map(function (str) { return node.sendKeys(str); });
            return dfrs[dfrs.length - 1];
        };
    }
    Events.getSequenceFunction = getSequenceFunction;
})(Events || (Events = {}));
;

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
    var Class = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (Ctor.bind.apply(Ctor, [void 0].concat(args)))();
    };
    Class.prototype = Ctor.prototype;
    for (var key in Ctor) {
        if (key in Class === false) {
            Class[key] = Ctor[key];
        }
    }
    return Class;
}
exports.Classify = Classify;
function FnPrototypeAlias(Ctor) {
    Ctor.fn = Ctor.prototype;
    return Ctor;
}
exports.FnPrototypeAlias = FnPrototypeAlias;
;

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
// end:source ./webdriver/scripts/exports.es6
// source ./SQueryLibrary.ts
"use strict";
var __extends = this && this.__extends || function () {
	var extendStatics = function (d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
			d.__proto__ = b;
		} || function (d, b) {
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function (d, b) {
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
}();
var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
	var c = arguments.length,
	    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
	    d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
var classify_1 = _src_utils_classify;
var SQuery = /** @class */function (_super) {
	__extends(SQuery, _super);
	function SQuery() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	SQuery_1 = SQuery;
	var SQuery_1;
	SQuery.default = SQuery_1;
	SQuery = SQuery_1 = __decorate([classify_1.Classify, classify_1.FnPrototypeAlias], SQuery);
	return SQuery;
}(WebdriverQuery_1.WebdriverQuery);
module.exports = SQuery;

// end:source ./SQueryLibrary.ts

}());
// end:source ./RootModule.js
