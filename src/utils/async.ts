import { map, each } from './arr'
import { dfr_run } from './dfr'
import { IQuery } from '../common/IQuery'
import { class_Dfr, is_Object, is_Function } from 'atma-utils';


export function async_each<TElement>(query: IQuery<TElement>, fn: (ctx: IQuery<TElement>, node: TElement) => any) {
    const $ = query.ctx.newAsync(null, query);
    query.ensureAsync().done($base => {

        const dfrs = map($base as any as TElement[], node => {
            return fn($, node)
        }).filter(Boolean);
        _when(dfrs, () => {
            $.resolve($)
        });
    });
    return $;
};
export function async_map<TResult, TElement>(self: IQuery<TElement>, fn: (x: IQuery<TElement>, i: number) => TResult): IQuery<TResult extends PromiseLike<any> ? Awaited<TResult> : TResult> {
    return async_next(async_toThenable(self), ($, source) => {
        return async_waterfall(source, (node, i) => {
            return dfr_run(resolve => {
                function add(x) {
                    $.add(x);
                    resolve();
                }
                var x = fn($.ctx.newSync(node), i);
                if (x == null || typeof (<any>x).then !== 'function') {
                    add(x);
                    return;
                }
                (<any>x).then(add, add);
            });
        });
    });
};
export function async_filter(self, fn) {
    return async_next(async_toThenable(self), ($, source) => {
        return async_waterfall(source, (node, i) => {
            return dfr_run((resolve, reject) => {
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
                } , reject);
            });
        });
    });
};

export function async_at<T>(self: IQuery<T>, index, fn) {
    const $ = self.ctx.newAsync(null, self);
    async_toThenable(self).done(ctx => {
        if (index >= ctx.length) {
            $.resolve($);
            return;
        }
        _always(fn($, self[index]), () => $.resolve($));
    });
    return $;
};

export function async_next(self: IQuery<any>, fn: (self: IQuery, wrapped?: IQuery) => void | PromiseLike<any>) {
    const $ = self.ctx.newAsync(null, self);
    async_toThenable(self).then(ctx => {
        _always(fn($, ctx), (result) => $.resolve(result ?? $));
    });
    return $;
};

export function async_aggr<TElement, TResult>(accum: TResult, $: IQuery<TElement>, fn) {
    return dfr_run<TResult>((resolve, reject) => {
        async_toThenable($).done($ => {

            async_waterfall($, node => {
                return fn(accum, node)
                    .then(val => {
                        accum = val;
                    })
            })
                .then(() => resolve(accum), error => reject(error));
        })
    });
};

export function async_traverse<TElement>(self: IQuery<TElement>, fn: (node: TElement) => Promise<any> | any): IQuery<TElement> {
    return async_each(self, ($, node) => {
        return _always(fn(node), mix => {
            $.add(mix);
        });
    });
};

export function async_getValueOf<TElement>(index: number, self: IQuery<TElement>, getter: (x: TElement) => any): Promise<any> {
    return <Promise<any>><any> dfr_run(resolve => {
        async_toThenable(self).done(ctx => {
            if (index >= ctx.length) {
                resolve(null);
                return;
            }

            let result = getter(ctx[index])
            if (is_Object(result) === false || is_Function(result.then) === false) {
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
    })
};

export function async_mutate<TElement>(self: IQuery<TElement>, fn) {
    const $ = self.ctx.newAsync(null, self);

    self.ensureAsync().done(ctx => {
        let dfrs = map(ctx as any as TElement[], node => {
            $.add(node);
            return fn(node);
        });
        _when(dfrs, () => $.resolve($));
    });
    return $;
};

export function async_waterfall(arr, fn) {
    return dfr_run((resolve, reject) => {
        var i = -1,
            imax = arr.length;

        function next() {
            if (++i >= imax) {
                resolve();
                return;
            }
            fn(arr[i], i).then(() => next(), (error) => reject(error));
        }
        next();
    });
};

export function async_waterfallFn(...args: (() => PromiseLike<any>)[]): PromiseLike<undefined> {
    return dfr_run((resolve, reject) => {
        let i = -1,
            imax = args.length;

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

export function async_all(dfrs: PromiseLike<any>[]) {
    let wait = dfrs.length;
    let error = null;
    let result = new Array(dfrs.length);
    let self = new class_Dfr;
    dfrs.forEach((dfr, i) => {
        dfr.then(x => {
            if (error) return;
            result[i] = x;
            if (--wait > 0) {
                self.resolve(result);
            }
        }, err => {
            if (error) return;
            error = err;
            self.reject(error);
        })
    })
    return self;
}
export function async_toThenable <T> (ctx: IQuery<T>): IQuery<T> {
    return ctx.ensureAsync();
}


function _always(dfr, fn) {
    if (dfr == null || 'then' in dfr === false) {
        fn();
        return;
    }
    return dfr.then(
        function (...args) {
            fn(...args);
        },
        function (error) {
            fn();
        });
}

export function _when(dfrs, callback) {
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
    each(dfrs, x => _always(x, ready));
}
