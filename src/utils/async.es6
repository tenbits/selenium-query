var async_traverse,
	async_each,
	async_at,
	async_getValueOf,
	async_mutate,
	async_next,
	async_aggr,
	async_waterfall;
(function(){

	async_each = function(self, fn){
		var $ = new SQuery();
		self.done(ctx => {
			var dfrs = map(ctx, node => {
				return fn($, node)
			});
			_when(dfrs, () => $.resolve($));
		});
		return $;
	};
	async_map = function(self, fn){
		return async_next(self, (source, $) => {
			return async_waterfall(source, (node, i) => {
				function add(x) {
					$.add(x);
				}
				return fn(node, i).then(add, () => add(null));
			});
		});
	};

	async_at = function(self, index, fn) {
		var $ = new SQuery();
		self.done(ctx => {
			if (index >= ctx.length) {
				$.resolve($);
				return;
			}
			_always(fn($, self[index]), () => $.resolve($));
		});
		return $;
	};

	async_next = function(self, fn) {
		var $ = new SQuery();
		self.done(ctx => {
			_always(fn($, ctx), () => $.resolve($));
		});
		return $;
	};

	async_aggr = function(accum, $, fn){
		return dfr_run((resolve, reject) => {
			$.done($ => {
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

	async_traverse = function(self, fn) {
		return async_each(self, ($, node) => {
			return _always(fn(node), mix => {
				$.add(mix);
			});
		});
	};

	async_getValueOf = function(index, self, getter){
		return dfr_run(resolve => {
			self.done(ctx => {
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

	async_mutate = function(self, fn){
		var $ = new SQuery();
		self.done(ctx => {
			var dfrs = map(ctx, node => {
				$.add(node);
				return fn(node);
			});
			_when(dfrs, () => $.resolve($));
		});
		return $;
	};

	async_waterfall = function(arr, fn) {
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

	function _always(dfr, fn) {
		if (dfr == null) {
			fn();
			return;
		}
		return dfr.then(
			function(...args){
				fn(...args);
			},
			function(error) {
				fn();
			});
	}

	function _when (dfrs, callback) {
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
}());