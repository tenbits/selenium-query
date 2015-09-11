_.obj_extend(SQueryProto, {
	add (mix) {
		if (mix == null)
			return this;
		if (_.is_Array(mix) === true)
			return each(mix, this.add, this);

		this[this.length++] = mix;
		return this;
	},
	eq (index) {
		return async_next(this, ($, source) => {
			if (index < source.length) {
				$.add(source[index]);
			}
		});
	},
	slice (start = 0, end = null) {
		return async_next(this, ($, source) => {
			var i = start;
			if (end > source.length) {
				end = source.length;
			}
			if (i < end) {
				for(; i < end; i++) {
					$.add(source[i]);
				}
			}
		});
	},
	each (fn) {
		return async_next(this, ($, source) => {
			return async_waterfall(source, (node, i) => {
				$.add(node);
				return fn(node, i);
			})
		});
	},
	map (fn) {
		return async_map(this, fn);
	},
	toArray () {
		return dfr_run(resolve => {
			this.done($ => {
				var arr = Array.prototype.slice.call($);
				resolve(arr);
			});
		})
	}
})