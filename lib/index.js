
// source ./RootModule.js
(function(){
	
	var _src_SQuery = {};
var _src_global = {};
var _src_static_build = {};
var _src_utils_arr = {};
var _src_utils_async = {};
var _src_utils_classify = {};
var _src_utils_dfr = {};
var _src_utils_node = {};

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
var _src_utils_async;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var arr_1 = _src_utils_arr;
var dfr_1 = _src_utils_dfr;
var SQuery_1 = _src_SQuery;
function async_each(self, fn) {
    var $ = new SQuery_1.ThenableSQuery();
    async_toThenable(self).done(function (ctx) {
        var dfrs = arr_1.map(ctx, function (node) {
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
                var x = fn(node, i);
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
function async_at(self, index, fn) {
    var $ = new SQuery_1.ThenableSQuery();
    self.done(function (ctx) {
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
    var $ = new SQuery_1.ThenableSQuery();
    self.done(function (ctx) {
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
    var $ = new SQuery_1.ThenableSQuery();
    async_toThenable(self).done(function (ctx) {
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
function async_toThenable(ctx) {
    if ('then' in ctx) {
        return ctx; //.then($ => async_toThenable($));
        // return Deferred.run(resolve => {
        // 	ctx.then($ => {
        // 		resolve(new ThenableSQuery($));
        // 	});
        // })
    }
    return new SQuery_1.ThenableSQuery(ctx);
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
var _src_utils_node;
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
	if (isObject(_src_utils_node) && isObject(module.exports)) {
		Object.assign(_src_utils_node, module.exports);
		return;
	}
	_src_utils_node = module.exports;
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
var _src_static_build;
(function () {
	var exports = {};
	var module = { exports: exports };
	"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var atma_utils_1 = require("atma-utils");
var selenium_webdriver_1 = require("selenium-webdriver");
var SQuery_1 = _src_SQuery;
var global_1 = _src_global;
exports.BuildStatics = {
    build: function (config) {
        config = atma_utils_1.obj_extend(Object.create(DefaultConfig), config);
        var browser = require('selenium-webdriver/' + config.name.toLowerCase());
        var options = new browser.Options;
        config.setBinaryPath(options);
        config.setArguments(options);
        config.setLogging(options);
        var builder = new selenium_webdriver_1.Builder().forBrowser(config.name.toLowerCase());
        config.setOptions(builder, options);
        config.applyOptions(builder, options);
        return builder.build();
    },
    load: function (url, config) {
        if (url[0] === '/') {
            url = 'file://' + process.cwd() + url;
        }
        if (global_1.refs.driver == null) {
            global_1.refs.driver = exports.BuildStatics.build(config);
        }
        var driver = global_1.refs.driver;
        var query = new SQuery_1.ThenableSQuery();
        driver
            .get(url)
            .then(function (d) {
            query.add(driver);
            query.resolve(query);
        }, function (error) {
            if (error.code !== 100) {
                query.reject(error);
                return;
            }
            driver = exports.BuildStatics.build(config);
            driver
                .get(url)
                .then(function () {
                query.add(driver);
                query.resolve(query);
            }, function (error) { return query.reject(error); });
        });
        return query;
    }
};
var DefaultConfig = {
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
    DefaultConfig.binaryPath = process.env.BROWSER_PATH;
}
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_static_build) && isObject(module.exports)) {
		Object.assign(_src_static_build, module.exports);
		return;
	}
	_src_static_build = module.exports;
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


// source ./ModuleSimplified.js
var _src_SQuery;
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var async_1 = _src_utils_async;
var node_1 = _src_utils_node;
var atma_utils_1 = require("atma-utils");
var dfr_1 = _src_utils_dfr;
var arr_1 = _src_utils_arr;
var global_1 = _src_global;
var build_1 = _src_static_build;
var classify_1 = _src_utils_classify;
var SQueryBase = /** @class */ (function () {
    function SQueryBase(mix) {
        this.length = 0;
        this.add(mix);
    }
    //#region CssClass
    SQueryBase.prototype.hasClass = function (name) {
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval(node, scripts_nodeClassHas, name);
        });
    };
    SQueryBase.prototype.addClass = function (name) {
        return CssClass.mutate(this, name, scripts_nodeClassAdd);
    };
    SQueryBase.prototype.removeClass = function (name) {
        return CssClass.mutate(this, name, scripts_nodeClassRemove);
    };
    SQueryBase.prototype.toggleClass = function (name) {
        return CssClass.mutate(this, name, scripts_nodeClassToggle);
    };
    //#endregion CssClass
    //#region Collection
    SQueryBase.prototype.add = function (mix) {
        if (mix == null) {
            return this;
        }
        if (atma_utils_1.is_ArrayLike(mix) === true) {
            return arr_1.each(mix, this.add, this);
        }
        this[this.length++] = mix;
        return this;
    };
    SQueryBase.prototype.eq = function (index) {
        return async_1.async_next(this, function ($, source) {
            if (index < source.length) {
                $.add(source[index]);
            }
        });
    };
    SQueryBase.prototype.slice = function (start, end) {
        if (start === void 0) { start = 0; }
        if (end === void 0) { end = null; }
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
    SQueryBase.prototype.each = function (fn) {
        return async_1.async_next(this, function ($, source) {
            return async_1.async_waterfall(source, function (node, i) {
                $.add(node);
                return fn(node, i);
            });
        });
    };
    SQueryBase.prototype.map = function (fn) {
        return async_1.async_map(this, fn);
    };
    SQueryBase.prototype.toArray = function () {
        var _this = this;
        return dfr_1.dfr_run(function (resolve) {
            async_1.async_toThenable(_this).done(function ($) {
                var arr = Array.prototype.slice.call($);
                resolve(arr);
            });
        });
    };
    SQueryBase.prototype.text = function (str) {
        if (typeof str === 'undefined') {
            return async_1.async_aggr('', this, function (accum, node) {
                return node_1.node_eval(node, scripts_nodeProperty, 'textContent').then(function (val) { return accum + val; });
            });
        }
        return async_1.async_each(this, function ($, node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'textContent', str)
                .done(function () { return $.add(node); });
        });
    };
    SQueryBase.prototype.html = function (str) {
        if (typeof str === 'undefined') {
            return async_1.async_getValueOf(0, this, function (node) {
                return node_1.node_eval(node, scripts_nodeProperty, 'innerHTML');
            });
        }
        return async_1.async_each(this, function ($, node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'textContent', str)
                .done(function () { return $.add(node); });
        });
    };
    SQueryBase.prototype.append = function (html) {
        return Content.inserter(this, html, 'beforeend');
    };
    SQueryBase.prototype.prepend = function (html) {
        return Content.inserter(this, html, 'afterbegin');
    };
    SQueryBase.prototype.before = function (html) {
        return Content.inserter(this, html, 'beforebegin');
    };
    SQueryBase.prototype.after = function (html) {
        return Content.inserter(this, html, 'afterend');
    };
    SQueryBase.prototype.css = function (mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return async_1.async_getValueOf(0, this, function (node) {
                return node.getCssValue(mix);
            });
        }
        return async_1.async_mutate(this, function (node) {
            return node_1.node_eval(node, scripts_nodeCss, mix, val);
        });
    };
    SQueryBase.prototype.height = function (val) {
        if (val == null) {
            return async_1.async_getValueOf(0, this, function (node) {
                return node.getSize().then(function (x) { return x.height; });
            });
        }
        return this.css('height', val);
    };
    SQueryBase.prototype.innerHeight = function () {
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'offsetHeight');
        });
    };
    SQueryBase.prototype.width = function (val) {
        if (val === void 0) { val = null; }
        if (val == null) {
            return async_1.async_getValueOf(0, this, function (node) {
                return node.getSize().then(function (x) { return x.width; });
            });
        }
        return this.css('width', val);
    };
    SQueryBase.prototype.innerWidth = function () {
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'offsetWidth');
        });
    };
    SQueryBase.prototype.offset = function () {
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval(node, scripts_nodeFunctionCall, 'getBoundingClientRect')
                .then(function (x) { return ({ top: x.top, left: x.left }); });
        });
    };
    SQueryBase.prototype.position = function () {
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'offsetTop')
                .then(function (top) {
                return node_1.node_eval(node, scripts_nodeProperty, 'offsetLeft')
                    .then(function (left) {
                    return { top: top, left: left };
                });
            });
        });
    };
    SQueryBase.prototype.scrollTop = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval.apply(void 0, [node, scripts_nodeProperty, 'scrollTop'].concat(args));
        });
    };
    SQueryBase.prototype.scrollLeft = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval.apply(void 0, [node, scripts_nodeProperty, 'scrollLeft'].concat(args));
        });
    };
    //#endregion
    //#region driver
    SQueryBase.prototype.eval = function (mix) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return async_1.async_getValueOf(0, this, function (node) {
            return node_1.node_eval.apply(void 0, [node, mix].concat(args));
        });
    };
    //#endregion
    //#region Events
    SQueryBase.prototype.click = function () {
        return async_1.async_each(this, function ($, node) {
            return node.click().then(function () {
                $.add(node);
            });
        });
    };
    SQueryBase.prototype.trigger = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return async_1.async_each(this, function ($, node) {
            return node_1.node_eval.apply(void 0, [node, scripts_nodeTrigger, type].concat(args)).done(function () { return $.add(node); });
        });
    };
    SQueryBase.prototype.select = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return async_1.async_mutate(this, function (node, $) {
            return node.getTagName().then(function (name) {
                var fn = name === 'select' ?
                    scripts_nodeSelectOption :
                    scripts_nodeSelectTextRange;
                return node_1.node_eval.apply(void 0, [node, fn].concat(args));
            });
        });
    };
    SQueryBase.prototype.focus = function () {
        return Events.callFn(this, 'focus');
    };
    SQueryBase.prototype.blur = function () {
        return Events.callFn(this, 'blur');
    };
    SQueryBase.prototype.sendKeys = function (mix) {
        return async_1.async_each(this, function ($, node) {
            return node.sendKeys(mix).then(function () {
                $.add(node);
            });
        });
    };
    SQueryBase.prototype.type = function (str) {
        var arr = Events.toSequance(str), fn = Events.getSequenceFunction(arr);
        return async_1.async_each(this, function ($, node) {
            return fn(node).then(function () {
                $.add(node);
            });
        });
    };
    SQueryBase.prototype.press = function (str) {
        var key = Events.toCombination(str);
        return async_1.async_each(this, function ($, node) {
            return node.sendKeys(key).then(function () {
                $.add(node);
            });
        });
    };
    //#endregion
    //#region Manipulate
    SQueryBase.prototype.remove = function () {
        return async_1.async_each(this, function ($, node) {
            return node_1.node_eval(node, scripts_nodeRemove)
                .done(function () { return $.add(node); });
        });
    };
    SQueryBase.prototype.attr = function (mix, val) {
        if (arguments.length === 1 && typeof mix === 'string') {
            return async_1.async_getValueOf(0, this, function (node) {
                return node.getAttribute(mix);
            });
        }
        return async_1.async_mutate(this, function (node) {
            return node_1.node_eval(node, scripts_nodeAttribute, mix, val);
        });
    };
    SQueryBase.prototype.val = function (val) {
        if (arguments.length === 0) {
            return async_1.async_getValueOf(0, this, function (node) {
                return node_1.node_eval(node, scripts_nodeProperty, 'value');
            });
        }
        return async_1.async_mutate(this, function (node) {
            return node_1.node_eval(node, scripts_nodeProperty, 'value', val);
        });
    };
    SQueryBase.prototype.data = function (key, val) {
        if (arguments.length === 1) {
            return async_1.async_getValueOf(0, this, function (node) {
                return node_1.node_eval(node, scripts_nodeDataset, key);
            });
        }
        return async_1.async_mutate(this, function (node) {
            return node_1.node_eval(node, scripts_nodeDataset, key, val);
        });
    };
    SQueryBase.prototype.prop = function (key, val) {
        if (val === void 0) { val = null; }
        if (arguments.length === 1) {
            return async_1.async_getValueOf(0, this, function (node) {
                return node_1.node_eval(node, scripts_nodeProperty, key);
            });
        }
        return async_1.async_mutate(this, function (node) {
            return node_1.node_eval(node, scripts_nodeProperty, key, val);
        });
    };
    //#endregion
    //#region Traverse
    SQueryBase.prototype.find = function (sel) {
        return async_1.async_traverse(this, function (node) {
            return node.findElements({ css: sel });
        });
    };
    SQueryBase.prototype.filter = function (sel) {
        return async_1.async_traverse(this, function (node) {
            return dfr_1.dfr_run(function (resolve) {
                node_1.node_eval(node, scripts_nodeMatchesSelector, sel).done(function (match) {
                    if (match) {
                        resolve(node);
                        return;
                    }
                    resolve();
                });
            });
        });
    };
    SQueryBase.prototype.parent = function () {
        return async_1.async_traverse(this, function (node) {
            return node_1.node_eval(node, scripts_nodeParent);
        });
    };
    SQueryBase.prototype.closest = function (sel) {
        return async_1.async_traverse(this, function (node) {
            return node_1.node_eval(node, scripts_nodeClosest, sel);
        });
    };
    SQueryBase.prototype.children = function (sel) {
        return async_1.async_traverse(this, function (node) {
            return node_1.node_eval(node, scripts_nodeChildren, sel);
        });
    };
    SQueryBase.prototype.next = function (sel) {
        return async_1.async_traverse(this, function (node) {
            return node_1.node_eval(node, scripts_nodeNext, sel);
        });
    };
    //#endregion
    SQueryBase.build = function (config) {
        return build_1.BuildStatics.build(config);
    };
    SQueryBase.load = function (url, config) {
        return build_1.BuildStatics.load(url, config);
    };
    SQueryBase.setDriver = function (driver) {
        global_1.refs.driver = driver;
    };
    SQueryBase.getDriver = function () {
        return global_1.refs.driver;
    };
    return SQueryBase;
}());
exports.SQueryBase = SQueryBase;
var CssClass;
(function (CssClass) {
    function mutate(self, name, mutator) {
        return async_1.async_each(self, function ($, node) {
            return node_1.node_eval(node, mutator, name).done(function () { return $.add(node); });
        });
    }
    CssClass.mutate = mutate;
})(CssClass || (CssClass = {}));
var Content;
(function (Content) {
    function inserter(self, html, position) {
        return async_1.async_each(self, function ($, node) {
            return node_1.node_eval(node, scripts_nodeFunctionCall, 'insertAdjacentHTML', position, html)
                .done(function () { return $.add(node); });
        });
    }
    Content.inserter = inserter;
})(Content || (Content = {}));
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
    function callFn(self, name) {
        return async_1.async_each(this, function ($, node) {
            return node_1.node_eval(node, scripts_nodeFunctionCall, name)
                .done(function () { return $.add(node); });
        });
    }
    Events.callFn = callFn;
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
var SQuery = /** @class */ (function (_super) {
    __extends(SQuery, _super);
    function SQuery() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SQuery = __decorate([
        classify_1.Classify,
        classify_1.FnPrototypeAlias
    ], SQuery);
    return SQuery;
}(SQueryBase));
exports.SQuery = SQuery;
var ThenableSQuery = /** @class */ (function (_super) {
    __extends(ThenableSQuery, _super);
    function ThenableSQuery() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        if (_this.length > 0) {
            _this.resolve(_this);
        }
        return _this;
    }
    ThenableSQuery_1 = ThenableSQuery;
    ThenableSQuery.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length !== 0) {
            if (args[0] instanceof ThenableSQuery_1) {
                args[0] = ThenableSQuery_1.toSync(args[0]);
            }
        }
        return _super.prototype.resolve.apply(this, args);
    };
    ThenableSQuery.toSync = function (x) {
        return new SQueryBase(x);
    };
    ThenableSQuery.toAsync = function (x) {
        return new ThenableSQuery_1(x);
    };
    var ThenableSQuery_1;
    ThenableSQuery = ThenableSQuery_1 = __decorate([
        classify_1.Classify,
        classify_1.FnPrototypeAlias
    ], ThenableSQuery);
    return ThenableSQuery;
}(atma_utils_1.class_create(atma_utils_1.class_Dfr, SQueryBase, {})));
exports.ThenableSQuery = ThenableSQuery;
new ThenableSQuery();
;

	function isObject(x) {
		return x != null && typeof x === 'object' && x.constructor === Object;
	}
	if (isObject(_src_SQuery) && isObject(module.exports)) {
		Object.assign(_src_SQuery, module.exports);
		return;
	}
	_src_SQuery = module.exports;
}());
// end:source ./ModuleSimplified.js

// source ./scripts/exports.es6
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
		console.log(arguments);
		el.style[str_toCamelCase(key)] = val;
	}
}
// end:source ./css/nodeCss.es6
// end:source ./scripts/exports.es6
// source ./SQueryLibrary.ts
"use strict";
var SQuery_1 = _src_SQuery;
module.exports = SQuery_1.SQuery;

// end:source ./SQueryLibrary.ts

}());
// end:source ./RootModule.js
