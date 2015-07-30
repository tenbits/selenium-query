var async_traverse,
	async_each,
	async_at,
	async_get,
	async_mutate,
	async_next,
	async_aggr;
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
				_waterfall($, node => {
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
		return async_each(self, function($, node){
			return _always(fn(node), mix => {
				$.add(mix);
			});
		});
	};

	async_get = function(self, getter){
		return dfr_run(resolve => {
			self.done(ctx => {
				if (ctx.length === 0) {
					resolve(null);
					return;
				}
				getter(ctx[0]).then(resolve, error => {
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

	function _waterfall(arr, fn) {
		return dfr_run((resolve, reject) => {
			var i = -1,
				imax = arr.length;

			function next() {
				if (++i >= imax) {
					resolve();
					return;
				}
				fn(arr[i]).then(() => next(), (error) => reject(error));
			}
			next();
		});
	}

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