import { map, each } from './arr'
import { dfr_run } from './dfr'
import { IElement } from '../IDriver';
import { SQuery, ThenableSQuery } from '../SQuery'
import { Deferred } from 'atma-class';

export function async_each(self: ThenableSQuery | SQuery, fn: (ctx: InstanceType<typeof SQuery>, node: IElement) => any) {
	const $ = new ThenableSQuery();
	async_toThenable(self).done(ctx => {
		const dfrs = map(ctx as IElement[], node => {
			return fn($, node)
		});
		_when(dfrs, () => {
			$.resolve($)
		});
	});
	return $;
};
export function async_map(self, fn) {
	return async_next(async_toThenable(self), ($, source) => {
		return async_waterfall(source, (node, i) => {
			return dfr_run(resolve => {
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
};

export function async_at(self, index, fn) {
	var $ = new ThenableSQuery();
	self.done(ctx => {
		if (index >= ctx.length) {
			$.resolve($);
			return;
		}
		_always(fn($, self[index]), () => $.resolve($));
	});
	return $;
};

export function async_next(self, fn) {
	var $ = new ThenableSQuery();
	self.done(ctx => {
		_always(fn($, ctx), () => $.resolve($));
	});
	return $;
};

export function async_aggr(accum, $, fn) {
	return dfr_run((resolve, reject) => {
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

export function async_traverse(self, fn) {
	return async_each(self, ($, node) => {
		return _always(fn(node), mix => {
			$.add(mix);
		});
	});
};

export function async_getValueOf(index, self, getter: (x: IElement) => any): Promise<any> {
	return <Promise<any>><any> dfr_run(resolve => {
		async_toThenable(self).done(ctx => {
			if (index >= ctx.length) {
				resolve(null);
				return;
			}
			getter(ctx[index]).then(resolve, error => {
				console.error('Getter error', error);
				resolve(null);
			});
		});
	})
};

export function async_mutate(self, fn) {
	const $ = new ThenableSQuery();
	async_toThenable(self).done(ctx => {
		let dfrs = map(ctx, node => {
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

export function async_toThenable (ctx) {
	if ('then' in ctx) {
		return ctx; //.then($ => async_toThenable($));
		// return Deferred.run(resolve => {

		// 	ctx.then($ => {
		// 		resolve(new ThenableSQuery($));
		// 	});
		// })
	} 
	return new ThenableSQuery(ctx);
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
	each(dfrs, x => _always(x, ready));
}