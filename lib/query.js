
// source ./RootModule.js
(function(){
	
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
var atma_utils_1 = require("atma-utils");
function dfr_run(fn) {
    return new Promise(fn);
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
exports.node_toScript = exports.node_getDriver = exports.node_evalAsync = exports.node_eval = void 0;
var dfr_1 = _src_utils_dfr;
function node_eval(node, mix) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
        var script = node_toScript(mix);
        var driver = node_getDriver(node);
        if (driver == null) {
            reject(new Error('Driver is not resolved.'));
            return;
        }
        var arr = node == driver ? args : __spreadArray([node], args, true);
        driver
            .executeScript.apply(driver, __spreadArray([script], arr, false)).then(function (result) {
            resolve(result);
        }, function (error) {
            console.error('Unexpected sync browser error', error, 'for', script);
            resolve();
        });
    });
}
exports.node_eval = node_eval;
;
function node_evalAsync(node, mix) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
        var script = node_toScript(mix);
        var driver = node_getDriver(node);
        if (driver == null) {
            reject(new Error('Driver is not resolved.'));
            return;
        }
        driver
            .executeAsyncScript.apply(driver, __spreadArray([script, node], args, false)).then(resolve, function (error) {
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
            return "return ".concat(script);
        }
    }
    script = script.substring(script.indexOf('{') + 1);
    script = script.substring(0, script.lastIndexOf('}') - 1);
    script = script.trim();
    return script;
}
exports.node_toScript = node_toScript;
;

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
var seleniumDriver = require("selenium-webdriver");
var _driver;
exports.refs = {
    driver: _driver,
    Key: seleniumDriver.Key
};
;

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
var arr_1 = _src_utils_arr;
var dfr_1 = _src_utils_dfr;
var atma_utils_1 = require("atma-utils");
function async_each(query, fn) {
    var $ = query.ctx.newAsync(null, query);
    query.ensureAsync().done(function ($base) {
        var dfrs = (0, arr_1.map)($base, function (node) {
            return fn($, node);
        }).filter(Boolean);
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
            return (0, dfr_1.dfr_run)(function (resolve) {
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
            return (0, dfr_1.dfr_run)(function (resolve, reject) {
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
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
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
    return (0, dfr_1.dfr_run)(function (resolve) {
        async_toThenable(self).done(function (ctx) {
            if (index >= ctx.length) {
                resolve(null);
                return;
            }
            var result = getter(ctx[index]);
            if ((0, atma_utils_1.is_Object)(result) === false || (0, atma_utils_1.is_Function)(result.then) === false) {
                resolve(result);
                return;
            }
            result.then(function (val) {
                resolve(val);
            }, function (error) {
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
        var dfrs = (0, arr_1.map)(ctx, function (node) {
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
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
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
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
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
    (0, arr_1.each)(dfrs, function (x) { return _always(x, ready); });
}
exports._when = _when;
;

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
exports.SelectorsEx = void 0;
var rgx_PSEUDO = /:([\w]+)(\s*\(([^)]+)\))?/g;
var SelectorsEx;
(function (SelectorsEx) {
    SelectorsEx.pseudoFns = {};
    function register(name, fn) {
        SelectorsEx.pseudoFns[name] = fn;
    }
    SelectorsEx.register = register;
    function find(el, selector, find) {
        var query = el.ctx.newAsync();
        findInner(el, selector, find).then(function ($) {
            query.resolve($);
        }, function (error) {
            query.reject(error);
        });
        return query;
    }
    SelectorsEx.find = find;
    function findInner(el, selector, find) {
        return __awaiter(this, void 0, void 0, function () {
            var $, match, _, name, _g2, arg, selectorBefore, misc, filterFn, $arr, i, node, $el, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rgx_PSEUDO.lastIndex = -1;
                        $ = el;
                        _a.label = 1;
                    case 1:
                        match = rgx_PSEUDO.exec(selector);
                        if (match == null) {
                            return [3 /*break*/, 11];
                        }
                        _ = match[0], name = match[1], _g2 = match[2], arg = match[3];
                        if (name in SelectorsEx.pseudoFns === false) {
                            return [3 /*break*/, 10];
                        }
                        selectorBefore = selector.substring(0, match.index);
                        if (!(selectorBefore.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, find($, selectorBefore)];
                    case 2:
                        $ = _a.sent();
                        if ($.length === 0) {
                            return [2 /*return*/, $];
                        }
                        _a.label = 3;
                    case 3:
                        selector = selector.substring(match.index + match[0].length);
                        misc = SelectorsEx.pseudoFns[name];
                        if (!(typeof misc !== 'function')) return [3 /*break*/, 5];
                        return [4 /*yield*/, misc.fn($, arg)];
                    case 4:
                        $ = _a.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        filterFn = misc;
                        $arr = el.ctx.newSync(null, el);
                        i = 0;
                        _a.label = 6;
                    case 6:
                        if (!(i < $.length)) return [3 /*break*/, 9];
                        node = $[i];
                        $el = $.ctx.newSync(node);
                        return [4 /*yield*/, filterFn($el, arg)];
                    case 7:
                        result = _a.sent();
                        if (result) {
                            $arr.add(node);
                        }
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 6];
                    case 9:
                        $ = $arr;
                        _a.label = 10;
                    case 10:
                        if (selector.length > 0) return [3 /*break*/, 1];
                        _a.label = 11;
                    case 11:
                        if (selector.length > 0) {
                            return [2 /*return*/, find($, selector)];
                        }
                        return [2 /*return*/, $];
                }
            });
        });
    }
})(SelectorsEx = exports.SelectorsEx || (exports.SelectorsEx = {}));
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.IQuery = exports.IQueryCtx = void 0;
var async_1 = _src_utils_async;
var atma_utils_1 = require("atma-utils");
var dfr_1 = _src_utils_dfr;
var arr_1 = _src_utils_arr;
var SelectorsEx_1 = _src_common_SelectorsEx;
var IQueryCtx = /** @class */ (function () {
    function IQueryCtx() {
    }
    IQueryCtx.prototype.newSync = function (arr, parent) {
        var query = new this.Ctor(arr);
        query.ctx.owner = parent !== null && parent !== void 0 ? parent : this.self;
        IQueryCtx.copyFrom(query.ctx, parent === null || parent === void 0 ? void 0 : parent.ctx);
        return query;
    };
    IQueryCtx.prototype.newAsync = function (arr, parent) {
        var query = new this.Ctor(arr);
        query.ctx.owner = parent !== null && parent !== void 0 ? parent : this.self;
        query.then = query.ctx.thener;
        IQueryCtx.copyFrom(query.ctx, parent === null || parent === void 0 ? void 0 : parent.ctx);
        return query;
    };
    IQueryCtx.copyFrom = function (targetCtx, parentCtx) {
        if (parentCtx != null) {
            targetCtx.url = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.url;
            targetCtx.source = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.source;
            targetCtx.status = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.status;
            targetCtx.headers = parentCtx === null || parentCtx === void 0 ? void 0 : parentCtx.headers;
        }
        return targetCtx;
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
            if (x != null && x.then != null && x instanceof IQuery) {
                var q = new x.ctx.Ctor(x);
                args[0] = q;
            }
        }
        return _super.prototype.resolve.apply(this, args);
    };
    IQuery.prototype.wait = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
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
        if ((0, atma_utils_1.is_ArrayLike)(mix) === true) {
            return (0, arr_1.each)(mix, this.add, this);
        }
        this[this.length++] = mix;
        return this;
    };
    IQuery.prototype.eq = function (index) {
        return (0, async_1.async_next)(this, function ($, source) {
            if (index < source.length) {
                $.add(source[index]);
            }
        });
    };
    IQuery.prototype.get = function (index) {
        return this[index];
    };
    IQuery.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        return (0, async_1.async_next)(this, function ($, source) {
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
        return (0, async_1.async_next)(this, function ($, source) {
            return (0, async_1.async_waterfall)(source, function (node, i) {
                $.add(node);
                return fn(node, i);
            });
        });
    };
    IQuery.prototype.map = function (fn) {
        return (0, async_1.async_map)(this, fn);
    };
    IQuery.prototype.toArray = function () {
        var _this = this;
        return (0, dfr_1.dfr_run)(function (resolve) {
            _this.ensureAsync().done(function ($) {
                var arr = Array.prototype.slice.call($);
                resolve(arr);
            });
        });
    };
    IQuery.prototype.as = function () {
        var t;
        t = this;
        return t;
    };
    IQuery.prototype.use = function (Ctor) {
        var proto = Ctor.prototype;
        while (proto != null && proto !== Object.prototype) {
            Object
                .getOwnPropertyNames(proto)
                .forEach(function (key) {
                if (key in IQuery.prototype) {
                    return;
                }
                IQuery.prototype[key] = Ctor.prototype[key];
            });
            proto = Object.getPrototypeOf(proto);
        }
        return this;
    };
    IQuery.prototype.text = function (str) {
        var _this = this;
        if (typeof str === 'undefined') {
            return (0, async_1.async_aggr)('', this, function (accum, node) {
                return _this.textGetFn(node).then(function (val) { return accum + val; });
            });
        }
        return (0, async_1.async_each)(this, function ($, node) {
            return _this
                .textSetFn(node, str)
                .then(function () {
                $.add(node);
            });
        });
    };
    IQuery.prototype.html = function (str) {
        var _this = this;
        if (typeof str === 'undefined') {
            return (0, async_1.async_aggr)('', this, function (accum, node) {
                return _this.htmlGetFn(node).then(function (val) { return accum + val; });
            });
        }
        return (0, async_1.async_each)(this, function ($, node) {
            return _this
                .htmlSetFn(node, str)
                .then(function () {
                $.add(node);
            });
        });
    };
    IQuery.prototype.outerHtml = function () {
        var _this = this;
        return (0, async_1.async_aggr)('', this, function (accum, node) {
            return _this.htmlOuterGetFn(node).then(function (val) { return accum + val; });
        });
    };
    IQuery.prototype.append = function (html) {
        var _this = this;
        return Arr.mutate(this, function (node) {
            return _this.appendFn(node, html);
        });
    };
    // not possible to manipulate IElements in node, which are not already attached to the Live DOM.
    // appendTo(selector: string): IQuery<TElement> {
    //     return Arr.mutate(this, async node => {
    //         await this.appendToFn(selector, node);
    //     });
    // }
    // protected abstract appendToFn(selector: string, node: TElement): PromiseLike<void>;
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
        var _a;
        var _this = this;
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
        return Arr.mapFirst(this, function (node) { return _this.evalFn.apply(_this, __spreadArray([node, mix], args, false)); });
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
        return Arr.mutate(this, function (node) { return _this.triggerFn.apply(_this, __spreadArray([node, type], args, false)); });
    };
    IQuery.prototype.select = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return Arr.mutate(this, function (node) { return _this.selectFn.apply(_this, __spreadArray([node], args, false)); });
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
        var _a;
        var _this = this;
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
        var _a;
        var _this = this;
        if (arguments.length === 1 && typeof mix === 'string') {
            return Arr.mapFirst(this, function (node) { return _this.dataGetFn(node, mix); });
        }
        var data = arguments.length === 2 ? (_a = {}, _a[mix] = val, _a) : mix;
        return Arr.mutate(this, function (node) { return _this.dataSetFn(node, data); });
    };
    IQuery.prototype.prop = function (mix, val) {
        var _a;
        var _this = this;
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
        return SelectorsEx_1.SelectorsEx.find(this, sel, function (el, sel) {
            return (0, async_1.async_traverse)(el, function (node) { return _this.findFn(node, sel); });
        });
        //return async_traverse(this, (node: TElement) => this.findFn(node, sel));
    };
    IQuery.prototype.filter = function (mix) {
        var _this = this;
        if (typeof mix === 'string') {
            var selector_1 = mix;
            return (0, async_1.async_filter)(this, function ($single) { return _this.matchesFn($single[0], selector_1); });
        }
        var fn = mix;
        return (0, async_1.async_filter)(this, fn);
    };
    IQuery.prototype.parent = function () {
        var _this = this;
        return (0, async_1.async_traverse)(this, function (node) {
            return _this.parentFn(node);
        });
    };
    IQuery.prototype.closest = function (sel) {
        var _this = this;
        return (0, async_1.async_traverse)(this, function (node) {
            return _this.closestFn(node, sel);
        });
    };
    IQuery.prototype.children = function (sel) {
        var _this = this;
        return (0, async_1.async_traverse)(this, function (node) {
            return _this.childrenFn(node, sel);
        });
    };
    IQuery.prototype.next = function (sel) {
        var _this = this;
        return (0, async_1.async_traverse)(this, function (node) {
            return _this.nextFn(node, sel);
        });
    };
    IQuery.prototype.on = function (type, cb) {
        var _this = this;
        return (0, async_1.async_each)(this, function (ctx, node) { return _this._onFn(node, type, cb); });
    };
    IQuery.prototype.off = function (type, cb) {
        var _this = this;
        return (0, async_1.async_each)(this, function (ctx, node) { return _this._offFn(node, type, cb); });
    };
    IQuery.prototype.once = function (type, cb) {
        var _this = this;
        if (cb === void 0) { cb = null; }
        return (0, async_1.async_each)(this, function (ctx, node) { return _this._onOnceFn(node, type, cb); });
    };
    return IQuery;
}(atma_utils_1.class_Dfr));
exports.IQuery = IQuery;
var Arr;
(function (Arr) {
    function mutate(self, mutator) {
        return (0, async_1.async_each)(self, function ($, node) {
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
;

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
var atma_utils_1 = require("atma-utils");
var selenium_webdriver_1 = require("selenium-webdriver");
function buildDriver(config) {
    config = (0, atma_utils_1.obj_extend)(Object.create(exports.DefaultConfig), config);
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
        var fn = "set".concat(this.name, "Options");
        if (typeof builder[fn] !== 'function') {
            throw Error("Default function not found, please override 'applyOptions(builder, options)' to set it yourself. Was looking for : ".concat(fn));
        }
        builder[fn](options);
    },
    setOptions: function (builder, options) {
    },
    setArguments: function (options) {
        options.addArguments(this.args);
    },
    setBinaryPath: function (options) {
        var fn = "set".concat(this.name, "BinaryPath");
        if (typeof options[fn] !== 'function') {
            throw Error("Default function not found, please override 'setBinaryPath' to set it yourself. Was looking for: ".concat(fn));
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
var _src_utils_deco;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_utils_deco != null ? _src_utils_deco : {};
    var module = { exports: exports };

    "use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memoize = exports.singleton = void 0;
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

    function __isObj(x) {
        return x != null && typeof x === 'object' && x.constructor === Object;
    }
    if (_src_utils_deco === module.exports) {
        // do nothing if
    } else if (__isObj(_src_utils_deco) && __isObj(module.exports)) {
        Object.assign(_src_utils_deco, module.exports);
    } else {
        _src_utils_deco = module.exports;
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
var DomainCookies = /** @class */ (function () {
    function DomainCookies(domain) {
        this.domain = domain;
        this.arr = [];
    }
    DomainCookies.prototype.add = function (mix, opts) {
        var _this = this;
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
            var f = mix[0];
            if (typeof f === 'string') {
                mix.forEach(function (str) { return _this.push(str, opts); });
                return;
            }
            throw Error('Cookie models are not yet supported');
        }
        for (var key in mix) {
            var cookie = "".concat(key, "=").concat(mix[key]);
            this.push(cookie, opts);
        }
    };
    DomainCookies.prototype.stringify = function () {
        return this.arr.map(function (x) { return "".concat(x.key, "=").concat(x.value); }).join('; ');
    };
    DomainCookies.prototype.push = function (str, opts) {
        var _this = this;
        var arr = DomainCookies.parse(str);
        arr.forEach(function (cookie) {
            var i = _this.arr.findIndex(function (x) { return x.key === cookie.key; });
            if (i !== -1) {
                if ((opts === null || opts === void 0 ? void 0 : opts.extend) === true) {
                    // Skip existed cookie
                    return;
                }
                _this.arr[i] = cookie;
                return;
            }
            _this.arr.push(cookie);
        });
    };
    DomainCookies.parse = function (cookies) {
        var format = CookiesHelper.detectFormat(cookies);
        if (format === 'key-values') {
            return cookies.split(';').map(DomainCookies.parseSingle);
        }
        if (format === 'set-cookie') {
            // Comma Seperated cookies from `set-cookie` header
            var arr = [];
            var rgx = /,/g;
            while (cookies !== '') {
                var match = rgx.exec(cookies);
                if (match == null) {
                    arr.push(cookies);
                    break;
                }
                var str = cookies.substring(0, match.index);
                if (/Expires=[\w]{1,4}$/i.test(str)) {
                    continue;
                }
                arr.push(str);
                cookies = cookies.substring(match.index + 1).trim();
            }
            return arr.map(DomainCookies.parseSingle);
        }
        throw new Error("Unknown cookie format: ".concat(format, " for ").concat(cookies));
    };
    DomainCookies.parseSingle = function (cookie) {
        var i = cookie.indexOf('=');
        if (i === -1) {
            throw new Error("Invalid cookie format ".concat(cookie));
        }
        var key = cookie.substring(0, i);
        cookie = cookie.substring(i + 1).trim();
        i = cookie.indexOf(';');
        if (i === -1) {
            return { key: key, value: cookie };
        }
        var value = cookie.substring(0, i);
        return {
            key: key,
            value: value,
            rawOptions: cookie.substring(i)
        };
    };
    return DomainCookies;
}());
var CookiesHelper;
(function (CookiesHelper) {
    function detectFormat(cookies) {
        var optionsRgx = /;\s*(Path|Domain|Expires|Max\-Age|Secure|HttpOnly)([=;]|$)/i;
        var hasOptions = optionsRgx.test(cookies);
        if (hasOptions) {
            return 'set-cookie';
        }
        if (/^[\w_-]+=\{/.test(cookies)) {
            return 'key-values';
        }
        var commaIndex = cookies.indexOf(',');
        var semicolonIndex = cookies.indexOf(';');
        if (commaIndex > -1 && semicolonIndex === -1) {
            // Has comma but not semicolon
            return 'set-cookie';
        }
        return 'key-values';
    }
    CookiesHelper.detectFormat = detectFormat;
})(CookiesHelper || (CookiesHelper = {}));
var CookieContainer = /** @class */ (function () {
    function CookieContainer() {
        this.domains = {};
    }
    CookieContainer.prototype.addCookies = function (mix, cookies, opts) {
        var domain = 'global';
        if (arguments.length > 1) {
            var url = mix;
            domain = this.getDomain(url);
        }
        else {
            cookies = mix;
        }
        var container = this.domains[domain];
        if (container == null) {
            container = this.domains[domain] = new DomainCookies(domain);
        }
        container.add(cookies, opts);
    };
    CookieContainer.prototype.clearCookies = function () {
        this.domains = {};
    };
    CookieContainer.prototype.getCookies = function (url) {
        var cookies = [];
        var domain = url && this.getDomain(url) || null;
        for (var key in this.domains) {
            if (key !== 'global' && key !== domain && domain.endsWith('.' + key) === false /** Includ root cookies also to subdomains */) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join('; ');
    };
    CookieContainer.prototype.getDomain = function (url) {
        return url
            .replace(/https?:\/\//, '')
            .replace(/\/.*$/, '')
            .toLowerCase();
    };
    return CookieContainer;
}());
exports.CookieContainer = CookieContainer;
exports.cookieContainer = new CookieContainer();
;

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
exports.driverPool = exports.DriverWrapper = exports.DriverPool = void 0;
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
            var wrapper, domain, currentUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(url, config, setts)];
                    case 1:
                        wrapper = _a.sent();
                        domain = Domains.fromUrl(url);
                        return [4 /*yield*/, wrapper.driver.getCurrentUrl()];
                    case 2:
                        currentUrl = _a.sent();
                        if (!(Domains.equal(domain, currentUrl) === false)) return [3 /*break*/, 4];
                        // Load page in DOMAIN context
                        return [4 /*yield*/, wrapper.driver.get(domain)];
                    case 3:
                        // Load page in DOMAIN context
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
                        if (driver == null || this.pool.length === 0) {
                            return [2 /*return*/];
                        }
                        wrapper = this.pool.find(function (x) { return x.driver === driver; });
                        if (wrapper == null) {
                            console.warn('SeleniumQuery. Unlock driver. Wrapper not found');
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
        if (config === null || config === void 0 ? void 0 : config.cookies) {
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
                        return [4 /*yield*/, (0, SeleniumDriver_1.buildDriver)(config)];
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
                        return [4 /*yield*/, (0, driver_1.ensureCookies)(this.driver, url, cookies, config)];
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
var Domains;
(function (Domains) {
    function fromUrl(url) {
        var match = /[^/]\/[^/]/.exec(url);
        // cuts path out (if any)
        return match == null
            ? url
            : url.substring(0, match.index + 1);
    }
    Domains.fromUrl = fromUrl;
    function equal(urlA, urlB) {
        if (urlB == null) {
            return false;
        }
        var a = fromUrl(urlA);
        var b = fromUrl(urlB);
        var rgxProtocol = /\w+:[\/]{1, 3}/;
        a = a.replace(rgxProtocol, '');
        b = b.replace(rgxProtocol, '');
        return a.toLowerCase() === b.toLowerCase();
    }
    Domains.equal = equal;
})(Domains || (Domains = {}));
;

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
exports.waitForPageLoad = exports.waitForElement = exports.driver_evalAsync = exports.ensureCookies = exports.loadUrl = void 0;
var dfr_1 = _src_utils_dfr;
var async_1 = _src_utils_async;
var DriverPool_1 = _src_webdriver_DriverPool;
var WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
var atma_utils_1 = require("atma-utils");
var node_1 = _src_webdriver_utils_node;
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
    return (0, dfr_1.dfr_run)(function (resolve, reject) {
        if (!cookies) {
            resolve();
            return;
        }
        var arr = cookies.split(';').map(function (x) { return x.trim(); }).map(function (single) {
            var i = single.indexOf('=');
            var name = single.substring(0, i).trim();
            var value = single.substring(i + 1).trim();
            return { name: name, value: value };
        });
        ;
        var origin = config.cookieOrigin;
        if (origin == null) {
            origin = url;
        }
        loadUrl(driver, origin, config).then(function (driver) {
            var dfrs = arr.map(function (cookie) { return driver.manage().addCookie(cookie); });
            (0, async_1._when)(dfrs, function () {
                resolve();
            });
        });
    });
}
exports.ensureCookies = ensureCookies;
function driver_evalAsync(el, mix) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var set = WebdriverQuery_1.WebdriverQuery.newAsync(void 0, el);
    var script = (0, node_1.node_toScript)(mix);
    var driver = DriverPool_1.driverPool.extractDriver(el);
    if (driver == null) {
        set.reject(new Error('Driver is not resolved.'));
        return set;
    }
    driver
        .executeAsyncScript.apply(driver, __spreadArray([script], args, false)).then(function (result) {
        set.resolve(Promise.resolve(result));
    }, function (error) {
        console.error('Unexpected browser error', error);
        set.reject(error);
    });
    return set;
}
exports.driver_evalAsync = driver_evalAsync;
function waitForElement(query, selector) {
    var _this = this;
    var driver = DriverPool_1.driverPool.extractDriver(query);
    var set = WebdriverQuery_1.WebdriverQuery.newAsync(void 0, query);
    if (driver == null) {
        set.reject(new Error("Driver not found in set"));
        return;
    }
    waitForTrue(function () { return __awaiter(_this, void 0, void 0, function () {
        var $;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, query.find(selector)];
                case 1:
                    $ = _a.sent();
                    return [2 /*return*/, $.length > 0];
            }
        });
    }); }, 10000).then(function () {
        query.find(selector).then(function (x) { return set.resolve(x); }, function (err) { return set.reject(err); });
    }, function (err) { return set.reject(err); });
    return set;
}
exports.waitForElement = waitForElement;
function waitForPageLoad(query, waitForState) {
    if (waitForState === void 0) { waitForState = 'complete'; }
    var driver = DriverPool_1.driverPool.extractDriver(query);
    var set = WebdriverQuery_1.WebdriverQuery.newAsync(null, query);
    if (driver == null) {
        set.reject(new Error("Driver not found in set"));
        return set;
    }
    var delay = WaitForPageLoad.delay();
    var q = (0, async_1.async_toThenable)(query);
    (0, async_1.async_all)([q, delay]).then(function (_a) {
        var query = _a[0];
        var awaiters = [
            function () { return WaitForPageLoad.documentState(driver, 5000, waitForState); },
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
    function documentState(driver, timeout, waitForState) {
        if (waitForState === void 0) { waitForState = 'complete'; }
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
                if (waitForState === 'interactive') {
                    return state === 'interactive' || state === 'complete';
                }
                return state === waitForState;
            });
        }
    }
    WaitForPageLoad.documentState = documentState;
    function elementLeavesDom(driver, el, timeout) {
        var dfr = new atma_utils_1.class_Dfr;
        waitForTrue(isStale, timeout).then(function (x) {
            dfr.resolve();
        }, function (error) {
            dfr.reject(new Error("The old element is still in dom after ".concat(timeout, "ms. Reload is not triggered")));
        });
        return dfr;
        function isStale() {
            return (0, dfr_1.dfr_run)(function (resolve, reject) {
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
    console.log('OPTS', opts, opts.body instanceof HTMLFormElement);
    if (opts.body instanceof HTMLFormElement) {
        opts.body = new FormData(opts.body);
    }
    fetch(url, opts).then(function (response) {
        var contentType = response.headers.get('content-type');
        var status = response.status;
        var headers = Array.from(response.headers.entries()).reduce(function (aggr, entry) {
            aggr[entry[0]] = entry[1];
            return aggr;
        }, {});
        response.text().then(function (text) {
            var $resp = {
                status: status,
                headers: headers,
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
        }, callback);
    }, callback);
}
exports.scripts_fetchAsync = scripts_fetchAsync;
;

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
exports.WebdriverFormData = void 0;
var WebdriverFormData = /** @class */ (function () {
    function WebdriverFormData($, form, formId) {
        this.$ = $;
        this.form = form;
        this.formId = formId;
    }
    WebdriverFormData.prototype.append = function (name, value) {
        return __awaiter(this, void 0, Promise, function () {
            var isFile, _type, _value, input;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (value == null) {
                            return [2 /*return*/, this];
                        }
                        isFile = typeof value === 'object' && 'file' in value;
                        _type = isFile ? 'file' : null;
                        _value = isFile ? null : value;
                        return [4 /*yield*/, this.$.eval(function () {
                                var form = arguments[0];
                                var name = arguments[1];
                                var type = arguments[2];
                                var value = arguments[3];
                                var input = document.createElement('input');
                                input.setAttribute('name', name);
                                if (type != null) {
                                    input.setAttribute('type', type);
                                }
                                if (value != null) {
                                    input.setAttribute('value', value);
                                }
                                form.appendChild(input);
                                return input;
                            }, this.form, name, _type, _value)];
                    case 1:
                        input = _a.sent();
                        if (!isFile) return [3 /*break*/, 3];
                        return [4 /*yield*/, input.sendKeys(value.file)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, this];
                }
            });
        });
    };
    WebdriverFormData.create = function ($) {
        return __awaiter(this, void 0, Promise, function () {
            var formId, form;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formId = "".concat(Date.now(), "_").concat(Math.round(Math.random() * 10000));
                        return [4 /*yield*/, $.eval(function () {
                                var formId = arguments[0];
                                var form = document.createElement('form');
                                form.setAttribute('style', 'display: none');
                                form.setAttribute('id', formId);
                                document.body.appendChild(form);
                                return form;
                            }, formId)];
                    case 1:
                        form = _a.sent();
                        return [2 /*return*/, new WebdriverFormData($, form, formId)];
                }
            });
        });
    };
    return WebdriverFormData;
}());
exports.WebdriverFormData = WebdriverFormData;
;

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
var alot = require("alot");
var FormDataBase = /** @class */ (function () {
    function FormDataBase() {
        this.dict = Object.create(null);
    }
    FormDataBase.prototype.append = function (key, value) {
        this.dict[key] = value;
        return this;
    };
    FormDataBase.prototype.entries = function () {
        return alot
            .fromObject(this.dict).map(function (x) { return [x.key, x.value]; })
            .toArray();
    };
    return FormDataBase;
}());
exports.FormDataBase = FormDataBase;
;

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
var _src_webdriver_Webdriver;
(function () {
    // ensure AMD is not active for the model, so that any UMD exports as commonjs
    var define = null;
    var exports = _src_webdriver_Webdriver != null ? _src_webdriver_Webdriver : {};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webdriver = void 0;
var driver_1 = _src_webdriver_utils_driver;
var DriverPool_1 = _src_webdriver_DriverPool;
var atma_utils_1 = require("atma-utils");
var WebdriverQuery_1 = _src_webdriver_WebdriverQuery;
var SelectorsEx_1 = _src_common_SelectorsEx;
var fetch_1 = _src_webdriver_scripts_http_fetch;
var WebdriverFormData_1 = _src_webdriver_WebdriverFormData;
var FormDataBase_1 = _src_common_FormDataBase;
var alot = require("alot");
exports.Webdriver = {
    fromHtml: function (html, config) {
        return exports.Webdriver.load("data:text/html;charset=utf-8,".concat(html), config);
    },
    build: function (config, setts) {
        var query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(null, config, setts)
            .then(function (wrapper) {
            query.add(wrapper.driver);
            query.resolve(query);
        }, function (error) {
            query.reject(error);
        });
        return query;
    },
    load: function (url, config, setts) {
        if (url[0] === '/') {
            url = 'file://' + process.cwd() + url;
        }
        var query = WebdriverQuery_1.WebdriverQuery.newAsync();
        DriverPool_1.driverPool
            .get(url, config, setts)
            .then(function (wrapper) {
            (0, driver_1.loadUrl)(wrapper.driver, url, config).then(function (driver) {
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, Promise, function () {
            var wrapper, $, formData_1, fetchOpts, result, isError, data, $;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0: return [4 /*yield*/, DriverPool_1.driverPool.getWithDomain((_a = config === null || config === void 0 ? void 0 : config.baseUrl) !== null && _a !== void 0 ? _a : url, config, setts)
                        // let p = new Promise(resolve => setTimeout(resolve, 5000));
                        // await p;
                    ];
                    case 1:
                        wrapper = _j.sent();
                        if (!(config.body instanceof FormDataBase_1.FormDataBase)) return [3 /*break*/, 4];
                        $ = new WebdriverQuery_1.WebdriverQuery(wrapper.driver);
                        return [4 /*yield*/, WebdriverFormData_1.WebdriverFormData.create($)];
                    case 2:
                        formData_1 = _j.sent();
                        return [4 /*yield*/, alot(config.body.entries()).forEachAsync(function (_a) {
                                var key = _a[0], value = _a[1];
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, formData_1.append(key, value)];
                                            case 1:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }).toArrayAsync({ threads: 1 })];
                    case 3:
                        _j.sent();
                        config.body = formData_1.form;
                        _j.label = 4;
                    case 4:
                        fetchOpts = __assign(__assign({}, ((_b = setts === null || setts === void 0 ? void 0 : setts.opts) !== null && _b !== void 0 ? _b : {})), { body: (_d = (_c = setts === null || setts === void 0 ? void 0 : setts.opts) === null || _c === void 0 ? void 0 : _c.body) !== null && _d !== void 0 ? _d : config.body, headers: (_f = (_e = setts === null || setts === void 0 ? void 0 : setts.opts) === null || _e === void 0 ? void 0 : _e.headers) !== null && _f !== void 0 ? _f : config.headers, method: (_h = (_g = setts === null || setts === void 0 ? void 0 : setts.opts) === null || _g === void 0 ? void 0 : _g.method) !== null && _h !== void 0 ? _h : config.method });
                        return [4 /*yield*/, wrapper
                                .driver
                                .executeAsyncScript(fetch_1.scripts_fetchAsync, url, fetchOpts)];
                    case 5:
                        result = _j.sent();
                        if (result == null) {
                            throw new Error("Response from the script is undefined");
                        }
                        isError = result.name === 'Error';
                        if (isError) {
                            DriverPool_1.driverPool.unlockDriver(wrapper);
                            throw result;
                        }
                        data = result.data;
                        if (data != null && typeof data === 'object') {
                            if ('findElements' in data || ((0, atma_utils_1.is_ArrayLike)(data) && data.length !== 0 && 'findElements' in data[0])) {
                                $ = new WebdriverQuery_1.WebdriverQuery(data);
                                return [2 /*return*/, __assign(__assign({}, result), { data: $ })];
                            }
                        }
                        DriverPool_1.driverPool.unlockDriver(wrapper);
                        return [2 /*return*/, result];
                }
            });
        });
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
function object_clean(fetchOpts) {
    throw new Error('Function not implemented.');
}
;

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
    var Time;
    (function (Time) {
        function getSeconds(str) {
            var rgx = /^(\d+)(s|sec|seconds|m|mins?|h|hours?|d|days?|w|weeks?|months?|y|years?)$/;
            var match = rgx.exec(str);
            if (match == null) {
                throw new Error("Invalid Humanize seconds. Pattern: ".concat(rgx.toString(), ". Got: ").concat(str));
            }
            var val = parseFloat(match[1]);
            var unit = match[2];
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
;

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
function serializeUrl(url, config) {
    if (config === void 0) { config = {}; }
    if (url.includes('://localhost')) {
        url.replace('://localhost', '://127.0.0.1');
    }
    if (config.query) {
        var q = '';
        for (var key in config.query) {
            if (url.includes("".concat(key, "="))) {
                continue;
            }
            var p = "".concat(key, "=").concat(encodeURIComponent(config.query[key]));
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
    var ignore = config.cacheQueryIgnore;
    if (ignore) {
        ignore.forEach(function (x) {
            url = url.replace(new RegExp("&".concat(x, "=[\\w\\d]+")), '');
            url = url.replace(new RegExp("\\?".concat(x, "=[\\w\\d]+")), '?');
        });
    }
    return serializeUrl(url, config);
}
exports.serializeCachableUrl = serializeCachableUrl;
;

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
exports.cache = exports.Cache = void 0;
var crypto = require("crypto");
var atma_io_1 = require("atma-io");
var zlib = require("zlib");
var humanize_1 = _src_utils_humanize;
var url_1 = _src_utils_url;
var CACHE_BASE = './cache/squery';
var Cache = /** @class */ (function () {
    function Cache() {
        this.meta = null;
        this.isFlushDeferred = false;
    }
    Cache.prototype.hasInner = function (url, config, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.isAsync, isAsync = _d === void 0 ? false : _d;
        if (config.cache == null || config.cache === false) {
            return false;
        }
        url = (0, url_1.serializeCachableUrl)(url, config);
        var domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        var domainCache = this.meta[domainKey];
        var meta = (_b = domainCache[url]) !== null && _b !== void 0 ? _b : domainCache[url.toLowerCase()];
        if (meta == null) {
            return false;
        }
        return atma_io_1.File[isAsync ? 'exists' : 'existsAsync']("".concat(CACHE_BASE, "/").concat(domainKey, "/").concat(meta.file));
    };
    Cache.prototype.has = function (url, config) {
        return this.hasInner(url, config, { isAsync: false });
    };
    Cache.prototype.hasAsync = function (url, config) {
        return this.hasInner(url, config, { isAsync: true });
    };
    Cache.prototype.remove = function (url, config) {
        var _a;
        url = (0, url_1.serializeCachableUrl)(url, config);
        var domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        var domainCache = this.meta[domainKey];
        var meta = (_a = domainCache[url]) !== null && _a !== void 0 ? _a : domainCache[url.toLowerCase()];
        if (meta == null) {
            return null;
        }
        delete this.meta[domainKey][url];
        this.flushMeta(domainKey);
    };
    Cache.prototype.get = function (url, config) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var domainKey, domainCache, meta, now, seconds, maxAge, withCompression, encoding, result, str, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (config.cache == null || config.cache === false) {
                            return [2 /*return*/, null];
                        }
                        url = (0, url_1.serializeCachableUrl)(url, config);
                        domainKey = Utils.getDomainKey(url);
                        this.ensureMeta(domainKey);
                        domainCache = this.meta[domainKey];
                        meta = (_a = domainCache[url]) !== null && _a !== void 0 ? _a : domainCache[url.toLowerCase()];
                        if (meta == null) {
                            return [2 /*return*/, null];
                        }
                        now = Date.now();
                        seconds = ((now - meta.time) / 1000) | 0;
                        maxAge = Utils.getMaxAge(config.cache, meta);
                        if (maxAge && seconds > maxAge) {
                            return [2 /*return*/, null];
                        }
                        withCompression = meta.file.endsWith('.gz');
                        encoding = (withCompression ? 'buffer' : 'utf8');
                        return [4 /*yield*/, new atma_io_1.File("".concat(CACHE_BASE, "/").concat(domainKey, "/").concat(meta.file), { cached: false }).readAsync({ encoding: encoding })];
                    case 1:
                        result = _c.sent();
                        if (!withCompression) return [3 /*break*/, 3];
                        return [4 /*yield*/, Compression.decompress(result)];
                    case 2:
                        str = _c.sent();
                        result = JSON.parse(str);
                        _c.label = 3;
                    case 3:
                        if (!(result.file != null)) return [3 /*break*/, 5];
                        _b = result;
                        return [4 /*yield*/, new atma_io_1.File("".concat(CACHE_BASE, "/").concat(domainKey, "/").concat(result.file), { cached: false }).readAsync({ encoding: 'buffer' })];
                    case 4:
                        _b.body = _c.sent();
                        delete result.file;
                        _c.label = 5;
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    Cache.prototype.save = function (url, config, resp) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        if (!resp.body || resp.status >= 400) {
            // Do not cache failed and empty responses
            return null;
        }
        var cache = typeof config.cache !== 'boolean' ? config.cache : {
            compress: true,
            maxAge: 24 * 60 * 60
        };
        if (config.cache === true) {
            cache = {
                compress: true,
            };
        }
        url = (0, url_1.serializeCachableUrl)(url, config);
        var domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);
        var md5 = crypto.createHash('md5').update(url).digest('hex');
        var file = "".concat(md5, ".json");
        var withCompression = cache.compress;
        if (withCompression) {
            file += '.gz';
        }
        this.meta[domainKey][url] = {
            time: Date.now(),
            file: file,
            maxAge: Utils.getMaxAge(cache)
        };
        this.flushMeta(domainKey);
        var json = {
            status: resp.status,
            headers: resp.headers,
            url: resp.url,
            body: resp.body
        };
        var contentType = resp.headers['content-type'];
        var isText = /json|text/.test(contentType);
        if (isText === false) {
            var match = /\.[\w\d]+$/.exec(url);
            var ext = match[0];
            var path = "".concat(CACHE_BASE, "/").concat(domainKey, "/files/").concat(md5).concat(ext);
            var file_1 = new atma_io_1.File(path, { cached: false });
            file_1.writeAsync(resp.body);
            json.file = "files/".concat(md5).concat(ext);
            delete json.body;
        }
        if (!withCompression) {
            new atma_io_1.File("".concat(CACHE_BASE, "/").concat(domainKey, "/").concat(file), { cached: false }).writeAsync(json);
            return;
        }
        var str = JSON.stringify(json);
        Compression.compress(Buffer.from(str)).then(function (buffer) {
            new atma_io_1.File("".concat(CACHE_BASE, "/").concat(domainKey, "/").concat(file), { cached: false }).writeAsync(buffer);
        });
    };
    Cache.prototype.ensureMeta = function (domainKey) {
        if (this.meta != null && this.meta[domainKey] != null) {
            return;
        }
        if (this.meta == null) {
            this.meta = {};
        }
        var file = "".concat(CACHE_BASE, "/").concat(domainKey, "/meta.json");
        if (atma_io_1.File.exists(file)) {
            this.meta[domainKey] = atma_io_1.File.read(file);
        }
        else {
            this.meta[domainKey] = {};
        }
    };
    Cache.prototype.flushMeta = function (domainKey) {
        var _this = this;
        if (this.isFlushDeferred) {
            return;
        }
        this.isFlushDeferred = true;
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, , 2, 3]);
                        return [4 /*yield*/, atma_io_1.File.writeAsync("".concat(CACHE_BASE, "/").concat(domainKey, "/meta.json"), this.meta[domainKey])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.isFlushDeferred = false;
                        return [7 /*endfinally*/];
                    case 3:
                        ;
                        return [2 /*return*/];
                }
            });
        }); }, 1000);
    };
    return Cache;
}());
exports.Cache = Cache;
var Compression = /** @class */ (function () {
    function Compression() {
    }
    Compression.compress = function (buffer) {
        return new Promise(function (resolve, reject) {
            zlib.deflate(buffer, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    };
    Compression.decompress = function (buffer) {
        return new Promise(function (resolve, reject) {
            zlib.unzip(buffer, function (err, buffer) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer.toString('utf8'));
            });
        });
    };
    return Compression;
}());
var Utils;
(function (Utils) {
    function getDomainKey(url) {
        var domainMatch = /([\w\d_\-]+\.[\w]{2,5})([\/:]|$)/.exec(url);
        if (domainMatch) {
            return domainMatch[1].replace('.', '_');
        }
        return '';
    }
    Utils.getDomainKey = getDomainKey;
    function getMaxAge(configCache, configMeta) {
        var _a, _b;
        return (_b = (_a = $getMaxAge(configCache)) !== null && _a !== void 0 ? _a : $getMaxAge(configMeta)) !== null && _b !== void 0 ? _b : 0;
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
        var maxAge = cache.maxAge;
        if (typeof maxAge === 'string') {
            return humanize_1.Humanize.Time.getSeconds(maxAge);
        }
        return maxAge;
    }
})(Utils || (Utils = {}));
exports.cache = new Cache;
;

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
var atma_utils_1 = require("atma-utils");
var Body;
(function (Body) {
    function handleAsRawObject(opts) {
        var _a, _b, _c;
        var mime = (_b = (_a = opts.headers) === null || _a === void 0 ? void 0 : _a['content-type']) !== null && _b !== void 0 ? _b : (_c = opts.headers) === null || _c === void 0 ? void 0 : _c['Content-Type'];
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
            var URLSearchParams = require('url').URLSearchParams;
            var params = new URLSearchParams();
            var obj = flatternObject(opts.body);
            for (var key in obj) {
                params.append(key, obj[key]);
            }
            opts.body = params;
            return;
        }
        if (mime.includes('form-data')) {
            var FormData = require('form-data');
            var form = new FormData();
            var obj = flatternObject(opts.body);
            for (var key in obj) {
                form.append(key, obj[key]);
            }
            opts.body = form;
            return;
        }
    }
    Body.handleAsRawObject = handleAsRawObject;
    function flatternObject(obj, out, prfx) {
        if (out === void 0) { out = {}; }
        if (prfx === void 0) { prfx = null; }
        var _loop_1 = function (key) {
            var val = obj[key];
            if (val == null) {
                return "continue";
            }
            var path = prfx ? "".concat(prfx, "[").concat(key, "]") : key;
            if (typeof val !== 'object') {
                out[path] = val;
                return "continue";
            }
            if (Array.isArray(val)) {
                val.forEach(function (x, index) {
                    flatternObject(x, out, "".concat(path, "[").concat(index, "]"));
                });
                return { value: void 0 };
            }
            if ((0, atma_utils_1.is_rawObject)(val)) {
                flatternObject(val, out, path);
                return { value: void 0 };
            }
            throw new Error("Cannt flattern object. Unsupported value type in ".concat(path));
        };
        for (var key in obj) {
            var state_1 = _loop_1(key);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return out;
    }
})(Body = exports.Body || (exports.Body = {}));
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkSpan = exports.NetworkTracer = void 0;
var atma_utils_1 = require("atma-utils");
var EVENT_COMPLETE = 'complete';
var NetworkTracer = /** @class */ (function (_super) {
    __extends(NetworkTracer, _super);
    function NetworkTracer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = false;
        _this.spans = [];
        return _this;
    }
    NetworkTracer.prototype.createSpan = function (req) {
        var _this = this;
        if (this.active === false) {
            return new NetworkSpanMock(req);
        }
        var span = new NetworkSpan(req);
        this.spans.push(span);
        span.on(EVENT_COMPLETE, function () { return _this.trigger(EVENT_COMPLETE, span); });
        return span;
    };
    NetworkTracer.prototype.onComplete = function (cb) {
        this.active = true;
        this.on(EVENT_COMPLETE, cb);
    };
    NetworkTracer.prototype.clear = function () {
        this.active = false;
        this.spans.length = 0;
        this.off(EVENT_COMPLETE);
    };
    return NetworkTracer;
}(atma_utils_1.class_EventEmitter));
exports.NetworkTracer = NetworkTracer;
var NetworkSpan = /** @class */ (function (_super) {
    __extends(NetworkSpan, _super);
    function NetworkSpan(req) {
        var _this = _super.call(this) || this;
        _this.cached = false;
        _this.req = req;
        _this.startTime = new Date();
        return _this;
    }
    NetworkSpan.prototype.complete = function (res) {
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
    };
    return NetworkSpan;
}(atma_utils_1.class_EventEmitter));
exports.NetworkSpan = NetworkSpan;
var NetworkSpanMock = /** @class */ (function () {
    function NetworkSpanMock(req) {
    }
    NetworkSpanMock.prototype.complete = function (res) { };
    return NetworkSpanMock;
}());
;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkDriver = void 0;
var https = require("https");
var http = require("http");
var Url = require("url");
var node_fetch_1 = require("node-fetch");
var CookieContainer_1 = _src_common_CookieContainer;
var Cache_1 = _src_fetch_Cache;
var atma_utils_1 = require("atma-utils");
var Body_1 = _src_fetch_Body;
var NetworkTracer_1 = _src_fetch_NetworkTracer;
var url_1 = _src_utils_url;
var DefaultOptions = {
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml,application/json;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,ru;q=0.9,de;q=0.8,en-GB;q=0.7,uk;q=0.6,la;q=0.5',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
    }
};
var agents = {
    http: new http.Agent({ keepAlive: true }),
    https: new https.Agent({ keepAlive: true }),
};
var tracer = new NetworkTracer_1.NetworkTracer();
exports.NetworkDriver = {
    isCached: function (url, config) {
        if (config === void 0) { config = {}; }
        url = (0, url_1.serializeCachableUrl)(url, config);
        return Cache_1.cache.has(url, config);
    },
    isCachedAsync: function (url, config) {
        if (config === void 0) { config = {}; }
        url = (0, url_1.serializeCachableUrl)(url, config);
        return Cache_1.cache.hasAsync(url, config);
    },
    clearCookies: function () {
        CookieContainer_1.cookieContainer.clearCookies();
    },
    clearCached: function (url, config) {
        if (config === void 0) { config = {}; }
        url = (0, url_1.serializeCachableUrl)(url, config);
        Cache_1.cache.remove(url, config);
    },
    load: function (url, config) {
        if (config === void 0) { config = {}; }
        var worker = new RequestWorker(url, config);
        return worker.load();
    },
    getCookies: function (url) {
        return CookieContainer_1.cookieContainer.getCookies(url);
    },
    setCookies: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        CookieContainer_1.cookieContainer.addCookies.apply(CookieContainer_1.cookieContainer, args);
    },
    tracer: tracer
};
function readAllHeaders(headers) {
    var obj = {};
    for (var _i = 0, _a = headers.entries(); _i < _a.length; _i++) {
        var entry = _a[_i];
        var key = entry[0], value = entry[1];
        obj[key] = value;
    }
    return obj;
}
var RequestWorker = /** @class */ (function () {
    function RequestWorker(url, config) {
        if (config === void 0) { config = {}; }
        this.url = url;
        this.config = config;
        this.promise = new atma_utils_1.class_Dfr;
        this.isCompleted = false;
        this.timer = null;
        this.redirectIndex = 0;
        this.retryIndex = 0;
        var headers = Object.assign({}, (config === null || config === void 0 ? void 0 : config.includeDefaultHeaders) !== false ? DefaultOptions.headers : {}, Headers.get(config.headers));
        this.options = {
            headers: headers,
            method: config.method,
            body: config.body,
            follow: config.follow,
            onRedirect: function (data) {
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
            var cookies = this.cookieContainer.getCookies(url);
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
            var HttpsProxyAgent = require('https-proxy-agent');
            var headers_1 = null;
            var uri = null;
            var auth = void 0;
            if (typeof config.httpsProxy === 'string') {
                uri = Url.parse(config.httpsProxy);
            }
            else {
                uri = Url.parse(config.httpsProxy.url);
                var _a = config.httpsProxy, username = _a.username, password = _a.password;
                if (username && password) {
                    auth = "".concat(username, ":").concat(password);
                }
            }
            if (uri.auth) {
                auth = uri.auth;
            }
            if (auth) {
                headers_1 = {
                    'Proxy-Authorization': "Basic ".concat(Buffer.from(auth).toString('base64'))
                };
            }
            this.options.agent = new HttpsProxyAgent(__assign(__assign({}, uri), { headers: headers_1 }));
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
    RequestWorker.prototype.load = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cached;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.span = tracer.createSpan({
                            url: this.location,
                            headers: this.options.headers,
                            method: this.options.method,
                            body: this.options.body
                        });
                        return [4 /*yield*/, this._fromCache()];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            this.span.complete(cached);
                            return [2 /*return*/, cached];
                        }
                        if (this.config.timeoutMs) {
                            this.timer = setTimeout(function () {
                                _this.doComplete(new Error("Timeouted in ".concat(_this.config.timeoutMs, "ms")));
                            }, this.config.timeoutMs);
                        }
                        this._fetch(this.location);
                        return [2 /*return*/, this.promise];
                }
            });
        });
    };
    RequestWorker.prototype._fromCache = function () {
        return __awaiter(this, void 0, Promise, function () {
            var cached, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, Cache_1.cache.get(this.url, this.config)];
                    case 1:
                        cached = _a.sent();
                        if (cached) {
                            return [2 /*return*/, {
                                    status: cached.status,
                                    url: cached.url,
                                    headers: cached.headers,
                                    body: cached.body
                                }];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    RequestWorker.prototype._handleResponse = function (res) {
        return __awaiter(this, void 0, Promise, function () {
            var errored, _a, setCookie, cookies, location;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errored = res.status >= 400;
                        if (!(errored && --this.retryCount > 0)) return [3 /*break*/, 4];
                        _a = res.status;
                        switch (_a) {
                            case 404: return [3 /*break*/, 1];
                            case 401: return [3 /*break*/, 1];
                            case 403: return [3 /*break*/, 1];
                        }
                        return [3 /*break*/, 2];
                    case 1: return [3 /*break*/, 4];
                    case 2:
                        console.log("Retry ".concat(this.retryCount, " for [").concat(this.options.method, "] ").concat(this.location, " as got ").concat(res.status));
                        return [4 /*yield*/, wait(this.retryTimeout)];
                    case 3:
                        _b.sent();
                        this._fetch(this.location);
                        return [2 /*return*/];
                    case 4:
                        setCookie = res.headers.get('set-cookie');
                        if (setCookie) {
                            this.cookieContainer.addCookies(this.location, setCookie);
                        }
                        if (res.status === 301 || res.status === 302) {
                            cookies = this.cookieContainer.getCookies(this.location);
                            if (cookies) {
                                this.options.headers['Cookie'] = cookies;
                            }
                            location = res.headers.get('location');
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
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this._handleCompletion(res)];
                    case 5: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    RequestWorker.prototype._handleCompletion = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var errored, typeEnum, contentType, body, _a, str, arr, resp, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errored = res.status >= 400;
                        typeEnum = 'buffer';
                        contentType = res.headers.get('content-type');
                        if (contentType && contentType.includes('json')) {
                            typeEnum = 'json';
                        }
                        if (contentType && contentType.includes('text')) {
                            typeEnum = 'text';
                        }
                        body = null;
                        _a = typeEnum;
                        switch (_a) {
                            case 'text': return [3 /*break*/, 1];
                            case 'json': return [3 /*break*/, 3];
                            case 'buffer': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, res.textConverted()];
                    case 2:
                        body = _b.sent();
                        return [3 /*break*/, 7];
                    case 3: return [4 /*yield*/, res.textConverted()];
                    case 4:
                        str = _b.sent();
                        try {
                            body = JSON.parse(str);
                        }
                        catch (error) {
                            throw new Error("Invalid json response for ".concat(res.url, ": ").concat(str));
                        }
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, res.arrayBuffer()];
                    case 6:
                        arr = _b.sent();
                        body = Buffer.from(arr);
                        return [3 /*break*/, 7];
                    case 7:
                        resp = {
                            status: res.status,
                            headers: readAllHeaders(res.headers),
                            url: res.url,
                            body: body
                        };
                        this.span.complete(resp);
                        if (errored) {
                            if (this.doNotThrow === true) {
                                return [2 /*return*/, resp];
                            }
                            error = new Error("Request for ".concat(res.url, " failed with ").concat(res.status));
                            error.status = res.status;
                            error.body = res.body;
                            error.headers = res.headers;
                            throw error;
                        }
                        Cache_1.cache.save(this.location, this.config, resp);
                        return [2 /*return*/, resp];
                }
            });
        });
    };
    RequestWorker.prototype._fetch = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var httpRes, res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, node_fetch_1.default)(url, this.options)];
                    case 1:
                        httpRes = _a.sent();
                        return [4 /*yield*/, this._handleResponse(httpRes)];
                    case 2:
                        res = _a.sent();
                        if (res != null) {
                            this.doComplete(null, res);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        this.doComplete(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RequestWorker.prototype.doComplete = function (error, resp) {
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
    };
    return RequestWorker;
}());
function wait(ms) {
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(null); }, ms);
    });
}
var Headers;
(function (Headers) {
    function get(headers) {
        if (headers == null) {
            return {};
        }
        if (typeof headers === 'string') {
            var hash_1 = Object.create(null);
            headers
                .split('\n')
                .map(function (x) { return x.trim(); })
                .filter(Boolean)
                .forEach(function (line) {
                var semi = line.indexOf(':');
                if (semi === -1) {
                    throw new Error("Invalid header delimter. \":\" expected. ".concat(line, " in ").concat(headers));
                }
                var key = line.substring(0, semi).trim();
                var val = line.substring(semi + 1).trim();
                hash_1[key] = val;
            });
            return hash_1;
        }
        return headers;
    }
    Headers.get = get;
})(Headers || (Headers = {}));
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.JsdomQuery = void 0;
var IQuery_1 = _src_common_IQuery;
var jsdom_1 = require("jsdom");
var dfr_1 = _src_utils_dfr;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var JsdomQuery = /** @class */ (function (_super) {
    __extends(JsdomQuery, _super);
    function JsdomQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsdomQuery.prototype._onFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    JsdomQuery.prototype._onOnceFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    JsdomQuery.prototype._offFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    JsdomQuery.prototype.hasClassFn = function (node, name) {
        return (0, dfr_1.dfr_resolve)(node.classList.contains(name));
    };
    JsdomQuery.prototype.addClassFn = function (node, name) {
        node.classList.add(name);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.removeClassFn = function (node, name) {
        node.classList.remove(name);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.toggleClassFn = function (node, name) {
        node.classList.toggle(name);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.textGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)(node.textContent);
    };
    JsdomQuery.prototype.textSetFn = function (node, text) {
        node.textContent = text;
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.htmlOuterGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)(node.outerHTML);
    };
    JsdomQuery.prototype.htmlGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)(node.innerHTML);
    };
    JsdomQuery.prototype.htmlSetFn = function (node, text) {
        node.innerHTML = text;
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.appendFn = function (node, html) {
        node.insertAdjacentHTML('beforeend', html);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.prependFn = function (node, html) {
        node.insertAdjacentHTML('afterbegin', html);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.beforeFn = function (node, html) {
        node.insertAdjacentHTML('beforebegin', html);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.afterFn = function (node, html) {
        node.insertAdjacentHTML('afterend', html);
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.cssGet = function (node, prop) {
        return (0, dfr_1.dfr_resolve)(node.style[toCamelCase(prop)]);
    };
    JsdomQuery.prototype.cssSet = function (node, css) {
        for (var key in css) {
            node.style[toCamelCase(key)] = css[key];
        }
        return (0, dfr_1.dfr_resolve)();
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
        return (0, dfr_1.dfr_resolve)(node.getBoundingClientRect());
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
        return (0, dfr_1.dfr_resolve)();
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
        return (0, dfr_1.dfr_resolve)();
    };
    //#endregion
    //#region Properties
    JsdomQuery.prototype.attrGetFn = function (node, prop) {
        return (0, dfr_1.dfr_resolve)(node.getAttribute(prop));
    };
    JsdomQuery.prototype.attrSetFn = function (node, attr) {
        for (var key in attr) {
            node.setAttribute(key, attr[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.valGetFn = function (node) {
        return this.getField(node, 'value');
    };
    JsdomQuery.prototype.valSetFn = function (node, value) {
        return this.setField(node, 'value', value);
    };
    JsdomQuery.prototype.dataGetFn = function (node, key) {
        return (0, dfr_1.dfr_resolve)(node.dataset[key]);
    };
    JsdomQuery.prototype.dataSetFn = function (node, data) {
        for (var key in data) {
            node.dataset[key] = data[key];
        }
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.propGetFn = function (node, key) {
        return (0, dfr_1.dfr_resolve)(node[key]);
    };
    JsdomQuery.prototype.propSetFn = function (node, data) {
        for (var key in data) {
            node[key] = data[key];
        }
        return (0, dfr_1.dfr_resolve)();
    };
    //#endregion
    JsdomQuery.prototype.findFn = function (node, selector) {
        var arr = Array.from(node.querySelectorAll(selector));
        return (0, dfr_1.dfr_resolve)(arr);
    };
    JsdomQuery.prototype.matchesFn = function (node, selector) {
        return (0, dfr_1.dfr_resolve)(node.matches(selector));
    };
    JsdomQuery.prototype.parentFn = function (node) {
        return (0, dfr_1.dfr_resolve)(node.parentElement);
    };
    JsdomQuery.prototype.closestFn = function (node, sel) {
        var el = node.parentElement;
        for (; el != null; el = el.parentElement) {
            el = el.parentElement;
            if (el.matches(sel)) {
                break;
            }
        }
        return (0, dfr_1.dfr_resolve)(el);
    };
    JsdomQuery.prototype.childrenFn = function (node, sel) {
        var arr = Array.from(node.children);
        if (sel) {
            arr = arr.filter(function (el) { return el.matches(sel); });
        }
        return (0, dfr_1.dfr_resolve)(arr);
    };
    JsdomQuery.prototype.nextFn = function (node, sel) {
        var next = node.nextElementSibling;
        if (sel != null) {
            for (; next != null; next = next.nextElementSibling) {
                if (next.matches(sel))
                    break;
            }
        }
        return (0, dfr_1.dfr_resolve)(next);
    };
    JsdomQuery.prototype.getField = function (node, field) {
        return node[field];
    };
    JsdomQuery.prototype.setField = function (node, mix, val) {
        if (arguments.length === 2) {
            for (var key in mix) {
                node[key] = mix[key];
            }
            return (0, dfr_1.dfr_resolve)();
        }
        node[mix] = val;
        return (0, dfr_1.dfr_resolve)();
    };
    JsdomQuery.prototype.callField = function (node, field) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return (0, dfr_1.dfr_resolve)(node[field].apply(node, args));
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
        var query = JsdomQuery.newAsync();
        NetworkDriver_1.NetworkDriver.load(url, setts === null || setts === void 0 ? void 0 : setts.opts).then(function (resp) {
            var html = resp.body.toString();
            var jsdom = new jsdom_1.JSDOM(html);
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
var JsdomQuery_1 = _src_jsdom_JsdomQuery;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var jsdom_1 = require("jsdom");
var SelectorsEx_1 = _src_common_SelectorsEx;
exports.JsdomDriver = {
    fromHtml: function (html) {
        return exports.JsdomDriver.build({ html: html });
    },
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
        }, function (error) {
            query.reject(error);
        });
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
        throw new Error('JSDOM does not support driver');
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
;

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
var cheerio = require("cheerio");
exports.CheerioUtils = {
    fromHtml: function (html) {
        var $ = cheerio(html, void 0, void 0, { xml: { decodeEntities: false } });
        var el = $;
        return el;
    },
    fromNode: function (el) {
        return cheerio(el, void 0, void 0, { xml: { decodeEntities: false } });
    }
};
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.CherrioQuery = void 0;
var IQuery_1 = _src_common_IQuery;
var dfr_1 = _src_utils_dfr;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var CheerioUtils_1 = _src_cheerio_CheerioUtils;
var $ = require("cheerio");
var CherrioQuery = /** @class */ (function (_super) {
    __extends(CherrioQuery, _super);
    function CherrioQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CherrioQuery.prototype._onFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    CherrioQuery.prototype._onOnceFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    CherrioQuery.prototype._offFn = function (node, type, cb) {
        throw new Error('Method not implemented.');
    };
    CherrioQuery.prototype.hasClassFn = function (node, name) {
        return (0, dfr_1.dfr_resolve)($(node).hasClass(name));
    };
    CherrioQuery.prototype.addClassFn = function (node, name) {
        $(node).addClass(name);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.removeClassFn = function (node, name) {
        $(node).removeClass(name);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.toggleClassFn = function (node, name) {
        $(node).toggleClass(name);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.textGetFn = function (node) {
        // Cheerio returns empty string on `text` for script elements
        var method = node.tagName === 'script' ? 'html' : 'text';
        return (0, dfr_1.dfr_resolve)($(node)[method]());
    };
    CherrioQuery.prototype.textSetFn = function (node, text) {
        $(node).text(text);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.htmlOuterGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)($.html(node));
    };
    CherrioQuery.prototype.htmlGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)(CheerioUtils_1.CheerioUtils.fromNode(node).html());
    };
    CherrioQuery.prototype.htmlSetFn = function (node, text) {
        $(node).html(text);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.appendFn = function (node, html) {
        $(node).append(html);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.prependFn = function (node, html) {
        $(node).prepend(html);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.beforeFn = function (node, html) {
        $(node).insertBefore(html);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.afterFn = function (node, html) {
        $(node).insertAfter(html);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.cssGet = function (node, prop) {
        return (0, dfr_1.dfr_resolve)($(node).css(prop));
    };
    CherrioQuery.prototype.cssSet = function (node, css) {
        $(node).css(css);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.heightGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                throw new Error('Cheerio driver does not support dimensions feature');
            });
        });
    };
    CherrioQuery.prototype.widthGetFn = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                throw new Error('Cheerio driver does not support dimensions feature');
            });
        });
    };
    CherrioQuery.prototype.innerHeightFn = function (node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.innerWidthFn = function (node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.getBoundingClientRect = function (node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.getPosition = function (node) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                throw new Error('Cheerio driver does not support dimensions feature');
            });
        });
    };
    CherrioQuery.prototype.scrollTopGetFn = function (node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.scrollTopSetFn = function (node, scroll) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.scrollLeftGetFn = function (node) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.scrollLeftSetFn = function (node, scroll) {
        throw new Error('Cheerio driver does not support dimensions feature');
    };
    CherrioQuery.prototype.evalFn = function (node, mix) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error('Eval is not supported with Cheerio Driver');
    };
    //#region Events
    CherrioQuery.prototype.clickFn = function (node) {
        throw new Error('Cheerio driver does not support manipulation feature');
    };
    CherrioQuery.prototype.triggerFn = function (node, type) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error('Cheerio driver does not support manipulation feature');
    };
    CherrioQuery.prototype.selectFn = function (node) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        throw new Error('Cheerio driver does not support manipulation feature');
    };
    CherrioQuery.prototype.focusFn = function (node) {
        throw new Error('FOCUS is not supported in Cheerio');
    };
    CherrioQuery.prototype.blurFn = function (node) {
        throw new Error('BLUR is not supported in Cheerio');
    };
    CherrioQuery.prototype.sendKeysFn = function (node, mix) {
        throw new Error('SEND_KEYS is not supported in Cheerio');
    };
    CherrioQuery.prototype.typeFn = function (node, str) {
        throw new Error('TYPE is not supported in Cheerio');
    };
    CherrioQuery.prototype.pressFn = function (node, str) {
        throw new Error('PRESS is not supported in Cheerio');
    };
    //#endregion
    //#region Manipulate
    CherrioQuery.prototype.removeFn = function (node) {
        $(node).remove();
        return (0, dfr_1.dfr_resolve)();
    };
    //#endregion
    //#region Properties
    CherrioQuery.prototype.attrGetFn = function (node, prop) {
        return (0, dfr_1.dfr_resolve)($(node).attr(prop));
    };
    CherrioQuery.prototype.attrSetFn = function (node, attr) {
        for (var key in attr) {
            $(node).attr(key, attr[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.valGetFn = function (node) {
        return (0, dfr_1.dfr_resolve)($(node).val());
    };
    CherrioQuery.prototype.valSetFn = function (node, value) {
        $(node).val(value);
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.dataGetFn = function (node, key) {
        return (0, dfr_1.dfr_resolve)($(node).data(key));
    };
    CherrioQuery.prototype.dataSetFn = function (node, data) {
        for (var key in data) {
            $(node).data(key, data[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.propGetFn = function (node, key) {
        return (0, dfr_1.dfr_resolve)($(node).prop(key));
    };
    CherrioQuery.prototype.propSetFn = function (node, data) {
        for (var key in data) {
            $(node).prop(key, data[key]);
        }
        return (0, dfr_1.dfr_resolve)();
    };
    //#endregion
    CherrioQuery.prototype.findFn = function (node, selector) {
        var arr = $(node).find(selector).toArray();
        return (0, dfr_1.dfr_resolve)(arr);
    };
    CherrioQuery.prototype.matchesFn = function (node, selector) {
        return (0, dfr_1.dfr_resolve)($(node).is(selector));
    };
    CherrioQuery.prototype.parentFn = function (node) {
        var el = $(node).parent().get(0);
        return (0, dfr_1.dfr_resolve)(el);
    };
    CherrioQuery.prototype.closestFn = function (node, sel) {
        var el = $(node).closest(sel).get(0);
        return (0, dfr_1.dfr_resolve)(el);
    };
    CherrioQuery.prototype.childrenFn = function (node, sel) {
        var arr = $(node).children(sel).toArray();
        return (0, dfr_1.dfr_resolve)(arr);
    };
    CherrioQuery.prototype.nextFn = function (node, sel) {
        var next = $(node).next(sel).get(0);
        return (0, dfr_1.dfr_resolve)(next);
    };
    CherrioQuery.prototype.getField = function (node, field) {
        return node[field];
    };
    CherrioQuery.prototype.setField = function (node, mix, val) {
        if (arguments.length === 2) {
            for (var key in mix) {
                node[key] = mix[key];
            }
            return (0, dfr_1.dfr_resolve)();
        }
        node[mix] = val;
        return (0, dfr_1.dfr_resolve)();
    };
    CherrioQuery.prototype.callField = function (node, field) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return (0, dfr_1.dfr_resolve)(node[field].apply(node, args));
    };
    CherrioQuery.newAsync = function (mix, parent) {
        var query = new CherrioQuery(mix);
        query.ctx.owner = parent;
        query.then = query.ctx.thener;
        return query;
    };
    //#region driver utils
    CherrioQuery.prototype.unlock = function () {
    };
    //#endregion driver utils
    CherrioQuery.build = function (config, setts) {
        throw new Error('No build for JSDom is required. Use direkt load');
    };
    CherrioQuery.load = function (url, config, setts) {
        var query = CherrioQuery.newAsync();
        NetworkDriver_1.NetworkDriver.load(url, setts === null || setts === void 0 ? void 0 : setts.opts).then(function (resp) {
            var html = resp.body.toString();
            var $ = CheerioUtils_1.CheerioUtils.fromHtml(html);
            query.ctx.source = html;
            query.add($);
            query.resolve(query);
        });
        return query;
    };
    CherrioQuery.fetch = function (url, config, setts) {
        return this.load(url, config, setts);
    };
    CherrioQuery.setDriver = function (driver) {
        throw new Error('JSDOM does not support driver');
    };
    CherrioQuery.getDriver = function (config, setts) {
        throw new Error('JSDOM does not support driver');
    };
    CherrioQuery.unlockDriver = function (mix) {
    };
    return CherrioQuery;
}(IQuery_1.IQuery));
exports.CherrioQuery = CherrioQuery;
function toCamelCase(property) {
    return property.replace(/\-(\w)/g, function (full, char) {
        return char.toUpperCase();
    });
}
;

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
exports.CheerioDriver = void 0;
var CherrioQuery_1 = _src_cheerio_CherrioQuery;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var CheerioUtils_1 = _src_cheerio_CheerioUtils;
var SelectorsEx_1 = _src_common_SelectorsEx;
var driver;
exports.CheerioDriver = {
    fromHtml: function (html) {
        return exports.CheerioDriver.build({ html: html });
    },
    build: function (config) {
        var html = config.html;
        driver = new CheerioDriverInner(config);
        driver.html = html;
        var el = CheerioUtils_1.CheerioUtils.fromHtml(html);
        var query = new CherrioQuery_1.CherrioQuery(el);
        query.ctx.source = html;
        return query;
    },
    load: function (url, config) {
        driver = new CheerioDriverInner(config);
        return driver.getAsQuery(url);
    },
    fetch: function (url, config, setts) {
        return this.load(url, config, setts);
    },
    setDriver: function (driver) {
        throw new Error('Cheerio does not support driver');
    },
    getDriver: function (config, setts) {
        return Promise.resolve(driver);
    },
    unlockDriver: function (mix) {
        driver = null;
    },
    pseudo: SelectorsEx_1.SelectorsEx.pseudoFns
};
var CheerioDriverInner = /** @class */ (function () {
    function CheerioDriverInner(config) {
        this.config = config;
    }
    CheerioDriverInner.prototype.get = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var query, resp, html, $el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = CherrioQuery_1.CherrioQuery.newAsync();
                        return [4 /*yield*/, NetworkDriver_1.NetworkDriver.load(url, this.config)];
                    case 1:
                        resp = _a.sent();
                        html = resp.body.toString();
                        $el = CheerioUtils_1.CheerioUtils.fromHtml(html);
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
                        return [2 /*return*/];
                }
            });
        });
    };
    CheerioDriverInner.prototype.getCurrentUrl = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.url];
            });
        });
    };
    CheerioDriverInner.prototype.getPageSource = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.html];
            });
        });
    };
    CheerioDriverInner.prototype.getAsQuery = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var query, $el;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(url)];
                    case 1:
                        _a.sent();
                        query = CherrioQuery_1.CherrioQuery.newAsync();
                        $el = CheerioUtils_1.CheerioUtils.fromHtml(this.html);
                        query.ctx.source = this.html;
                        query.ctx.url = url;
                        query.ctx.status = this.status;
                        query.ctx.headers = this.headers;
                        query.add($el);
                        query.resolve(query);
                        return [2 /*return*/, query];
                }
            });
        });
    };
    // NOT IMPLEMENTED
    CheerioDriverInner.prototype.manage = function () {
        throw new Error('Method not implemented.');
        return null;
    };
    CheerioDriverInner.prototype.execute = function (command, description) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.setFileDetector = function (detector) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getExecutor = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getSession = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getCapabilities = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.quit = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.actions = function (options) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.wait = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error('Method not implemented.');
        return null;
    };
    CheerioDriverInner.prototype.sleep = function (ms) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getWindowHandle = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getAllWindowHandles = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.close = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.getTitle = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.findElement = function (locator) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.findElements = function (locator) {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.takeScreenshot = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.navigate = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.switchTo = function () {
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.executeScript = function (script) {
        var var_args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            var_args[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    CheerioDriverInner.prototype.executeAsyncScript = function (script) {
        var var_args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            var_args[_i - 1] = arguments[_i];
        }
        throw new Error('Method not implemented.');
    };
    return CheerioDriverInner;
}());
;

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
exports.WebdriverEventsPoll = void 0;
var node_1 = _src_webdriver_utils_node;
var WebdriverEventsPoll;
(function (WebdriverEventsPoll) {
    var bin = [];
    var ids = {};
    function addEventListener(node, type, cb) {
        return (0, node_1.node_eval)(node, scripts_addEventListener, type).then(function (id) {
            bin.push([node, type, cb, id]);
            ids[id] = { node: node, type: type, cb: cb, active: true };
            function poll() {
                return __awaiter(this, void 0, void 0, function () {
                    var data, event;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                data = ids[id];
                                if (data.active !== true) {
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, (0, node_1.node_eval)(node, scripts_pollEvent, id)];
                            case 1:
                                event = _a.sent();
                                if (data.active !== true) {
                                    return [2 /*return*/];
                                }
                                if (event) {
                                    cb(event);
                                    poll();
                                    return [2 /*return*/];
                                }
                                setTimeout(poll, 200);
                                return [2 /*return*/];
                        }
                    });
                });
            }
            poll();
        });
    }
    WebdriverEventsPoll.addEventListener = addEventListener;
    function removeEventListener(node, type, cb) {
        if (cb === void 0) { cb = null; }
        return __awaiter(this, void 0, Promise, function () {
            var i, data, _node, _type, _cb, _id, info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < bin.length)) return [3 /*break*/, 4];
                        data = bin[i];
                        _node = data[0], _type = data[1], _cb = data[2], _id = data[3];
                        if (type !== _type) {
                            return [3 /*break*/, 3];
                        }
                        if (node !== _node) {
                            return [3 /*break*/, 3];
                        }
                        if (cb != null && cb !== _cb) {
                            return [3 /*break*/, 3];
                        }
                        info = ids[_id];
                        if (info) {
                            info.active = false;
                        }
                        return [4 /*yield*/, (0, node_1.node_eval)(node, scripts_removeEventListener, _id)];
                    case 2:
                        _a.sent();
                        bin.splice(i, 1);
                        delete ids[_id];
                        i--;
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    WebdriverEventsPoll.removeEventListener = removeEventListener;
})(WebdriverEventsPoll = exports.WebdriverEventsPoll || (exports.WebdriverEventsPoll = {}));
;

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
;

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
;

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
;

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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.WebdriverQuery = void 0;
var node_1 = _src_webdriver_utils_node;
var global_1 = _src_global;
var IQuery_1 = _src_common_IQuery;
var Webdriver_1 = _src_webdriver_Webdriver;
var DriverPool_1 = _src_webdriver_DriverPool;
var JsdomDriver_1 = _src_jsdom_JsdomDriver;
var CheerioDriver_1 = _src_cheerio_CheerioDriver;
var NetworkDriver_1 = _src_fetch_NetworkDriver;
var driver_1 = _src_webdriver_utils_driver;
var SeleniumDriver_1 = _src_webdriver_SeleniumDriver;
var WebdriverEventsPoll_1 = _src_webdriver_WebdriverEventsPoll;
var SelectorsEx_1 = _src_common_SelectorsEx;
var nodeCss_1 = _src_webdriver_scripts_css_nodeCss;
var nodeProperty_1 = _src_webdriver_scripts_nodeProperty;
var nodeDataset_1 = _src_webdriver_scripts_nodeDataset;
var WebdriverFormData_1 = _src_webdriver_WebdriverFormData;
var FormDataBase_1 = _src_common_FormDataBase;
var WebdriverQuery = /** @class */ (function (_super) {
    __extends(WebdriverQuery, _super);
    function WebdriverQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebdriverQuery.prototype.hasClassFn = function (node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassHas, name);
    };
    WebdriverQuery.prototype.addClassFn = function (node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassAdd, name);
    };
    WebdriverQuery.prototype.removeClassFn = function (node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassRemove, name);
    };
    WebdriverQuery.prototype.toggleClassFn = function (node, name) {
        return (0, node_1.node_eval)(node, scripts_nodeClassToggle, name);
    };
    WebdriverQuery.prototype.textGetFn = function (node) {
        return this.getField(node, 'textContent');
    };
    WebdriverQuery.prototype.textSetFn = function (node, text) {
        return this.setField(node, 'textContent', text);
    };
    WebdriverQuery.prototype.htmlOuterGetFn = function (node) {
        var driver = (0, node_1.node_getDriver)(node);
        if (driver === node) {
            return driver.getPageSource();
        }
        return this.getField(node, 'outerHTML');
    };
    WebdriverQuery.prototype.htmlGetFn = function (node) {
        var driver = (0, node_1.node_getDriver)(node);
        if (driver === node) {
            return driver.getPageSource();
        }
        return this.getField(node, 'innerHTML');
    };
    WebdriverQuery.prototype.htmlSetFn = function (node, text) {
        return this.setField(node, 'innerHTML', text);
    };
    WebdriverQuery.prototype.appendFn = function (node, html) {
        return this.callField(node, 'insertAdjacentHTML', 'beforeend', html);
    };
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
        return new Promise(function (resolve, reject) {
            node.getCssValue(prop).then(resolve, reject);
        });
    };
    WebdriverQuery.prototype.cssSet = function (node, css) {
        return (0, node_1.node_eval)(node, nodeCss_1.scripts_nodeCss, css);
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
        return (0, node_1.node_eval)(node, scripts_nodeFunctionCall, 'getBoundingClientRect');
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
        return node_1.node_eval.apply(void 0, __spreadArray([node, mix], args, false));
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
        return node_1.node_eval.apply(void 0, __spreadArray([node, scripts_nodeTrigger, type], args, false));
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
            return node_1.node_eval.apply(void 0, __spreadArray([node, fn], args, false));
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
        return (0, node_1.node_eval)(node, scripts_nodeRemove);
    };
    //#endregion
    //#region Properties
    WebdriverQuery.prototype.attrGetFn = function (node, prop) {
        return new Promise(function (resolve, reject) {
            node.getAttribute(prop).then(resolve, reject);
        });
    };
    WebdriverQuery.prototype.attrSetFn = function (node, attr) {
        return (0, node_1.node_eval)(node, scripts_nodeAttribute, attr);
    };
    WebdriverQuery.prototype.valGetFn = function (node) {
        return this.getField(node, 'value');
    };
    WebdriverQuery.prototype.valSetFn = function (node, value) {
        return this.setField(node, 'value', value);
    };
    WebdriverQuery.prototype.dataGetFn = function (node, key) {
        return (0, node_1.node_eval)(node, nodeDataset_1.scripts_nodeDataset, key);
    };
    WebdriverQuery.prototype.dataSetFn = function (node, data) {
        return (0, node_1.node_eval)(node, nodeDataset_1.scripts_nodeDataset, data);
    };
    WebdriverQuery.prototype.propGetFn = function (node, key) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, key);
    };
    WebdriverQuery.prototype.propSetFn = function (node, data) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, data);
    };
    //#endregion
    WebdriverQuery.prototype.findFn = function (node, selector) {
        return new Promise(function (resolve, reject) {
            node.findElements({ css: selector }).then(resolve, reject);
        });
    };
    WebdriverQuery.prototype.matchesFn = function (node, selector) {
        return (0, node_1.node_eval)(node, scripts_nodeMatchesSelector, selector);
    };
    WebdriverQuery.prototype.parentFn = function (node) {
        return (0, node_1.node_eval)(node, scripts_nodeParent);
    };
    WebdriverQuery.prototype.closestFn = function (node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeClosest, sel);
    };
    WebdriverQuery.prototype.childrenFn = function (node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeChildren, sel);
    };
    WebdriverQuery.prototype.nextFn = function (node, sel) {
        return (0, node_1.node_eval)(node, scripts_nodeNext, sel);
    };
    WebdriverQuery.prototype.getField = function (node, field) {
        return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, field);
    };
    WebdriverQuery.prototype.setField = function (node, mix, val) {
        if (arguments.length === 2) {
            return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, mix);
        }
        if (arguments.length === 3) {
            return (0, node_1.node_eval)(node, nodeProperty_1.scripts_nodeProperty, mix, val);
        }
        return null;
    };
    WebdriverQuery.prototype.callField = function (node, field) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        return node_1.node_eval.apply(void 0, __spreadArray([node,
            scripts_nodeFunctionCall,
            field], args, false));
    };
    WebdriverQuery.prototype._onFn = function (node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.addEventListener(node, type, cb);
    };
    WebdriverQuery.prototype._offFn = function (node, type, cb) {
        return WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, cb);
    };
    WebdriverQuery.prototype._onOnceFn = function (node, type, cb) {
        var fn = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, WebdriverEventsPoll_1.WebdriverEventsPoll.removeEventListener(node, type, fn)];
                        case 1:
                            _a.sent();
                            cb(event);
                            return [2 /*return*/];
                    }
                });
            });
        };
        return WebdriverEventsPoll_1.WebdriverEventsPoll.addEventListener(node, type, fn);
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
        return (0, driver_1.waitForPageLoad)(this);
    };
    WebdriverQuery.prototype.waitForPageReady = function () {
        return (0, driver_1.waitForPageLoad)(this, 'interactive');
    };
    WebdriverQuery.prototype.waitForElement = function (selector) {
        return (0, driver_1.waitForElement)(this, selector);
    };
    WebdriverQuery.prototype.waitForResource = function (selector) {
        return (0, driver_1.driver_evalAsync)(this, scripts_waitForResourceCallback, selector);
    };
    WebdriverQuery.prototype.unlock = function () {
        Webdriver_1.Webdriver.unlockDriver(this);
    };
    WebdriverQuery.prototype.getDriver = function () {
        return DriverPool_1.driverPool.extractDriver(this);
    };
    WebdriverQuery.prototype.createFormData = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, WebdriverFormData_1.WebdriverFormData.create(this)];
            });
        });
    };
    WebdriverQuery.build = function (config, setts) {
        return Webdriver_1.Webdriver.build(config, setts);
    };
    WebdriverQuery.load = function (url, config, setts) {
        var _a;
        if (config === void 0) { config = SeleniumDriver_1.DefaultConfig; }
        switch ((_a = config.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver_1.JsdomDriver.load(url, config, setts);
            case 'cheerio':
                return CheerioDriver_1.CheerioDriver.load(url, config, setts);
            default:
                return Webdriver_1.Webdriver.load(url, config, setts);
        }
    };
    WebdriverQuery.loadWithWebdriver = function (url, config, setts) {
        if (config === void 0) { config = SeleniumDriver_1.DefaultConfig; }
        return Webdriver_1.Webdriver.load(url, config, setts);
    };
    WebdriverQuery.fetch = function (url, config, setts) {
        var _a;
        if (config === void 0) { config = SeleniumDriver_1.DefaultConfig; }
        switch ((_a = config.name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) {
            case 'jsdom':
                return JsdomDriver_1.JsdomDriver.fetch(url, config, setts);
            case 'cheerio':
                return CheerioDriver_1.CheerioDriver.fetch(url, config, setts);
            default:
                return Webdriver_1.Webdriver.fetch(url, config, setts);
        }
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
    //#endregion driver utils
    WebdriverQuery.FormData = FormDataBase_1.FormDataBase;
    WebdriverQuery.cheerio = CheerioDriver_1.CheerioDriver;
    WebdriverQuery.jsdom = JsdomDriver_1.JsdomDriver;
    WebdriverQuery.network = NetworkDriver_1.NetworkDriver;
    WebdriverQuery.pseudo = SelectorsEx_1.SelectorsEx.pseudoFns;
    return WebdriverQuery;
}(IQuery_1.IQuery));
exports.WebdriverQuery = WebdriverQuery;
var Events;
(function (Events) {
    // https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_Key.html
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
        var parts = str.split(delimiter);
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
            return __awaiter(this, void 0, void 0, function () {
                var _i, arr_1, str;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, arr_1 = arr;
                            _a.label = 1;
                        case 1:
                            if (!(_i < arr_1.length)) return [3 /*break*/, 4];
                            str = arr_1[_i];
                            return [4 /*yield*/, node.sendKeys(str)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
    }
    Events.getSequenceFunction = getSequenceFunction;
})(Events || (Events = {}));
;

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
exports.FnPrototypeAlias = exports.Classify = void 0;
function Classify(Ctor) {
    var Class = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new (Ctor.bind.apply(Ctor, __spreadArray([void 0], args, false)))();
    };
    Class.prototype = Ctor.prototype;
    forIn(Ctor, function (key) {
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
    var hash = Object.create(null);
    var cursor = obj;
    do {
        var props = Object.getOwnPropertyNames(cursor);
        for (var i = 0; i < props.length; i++) {
            var key = props[i];
            if (key in hash === false) {
                cb(key);
            }
            hash[key] = null;
        }
    } while (cursor = Object.getPrototypeOf(cursor));
}
;

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
var __extends = this && this.__extends || function () {
	var extendStatics = function (d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
			d.__proto__ = b;
		} || function (d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function (d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
var CookieContainer_1 = _src_common_CookieContainer;
var SQuery = /** @class */function (_super) {
	__extends(SQuery, _super);
	function SQuery() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	SQuery_1 = SQuery;
	var SQuery_1;
	SQuery.default = SQuery_1;
	SQuery.CookieContainer = CookieContainer_1.CookieContainer;
	SQuery = SQuery_1 = __decorate([classify_1.Classify, classify_1.FnPrototypeAlias], SQuery);
	return SQuery;
}(WebdriverQuery_1.WebdriverQuery);
// Reapply already decorated SQuery to default.
SQuery.default = SQuery;
module.exports = SQuery;

// end:source ./SQueryLibrary.ts

}());
// end:source ./RootModule.js
