var SQuery = _.class_create(_.class_Dfr, ProtoTraverse, ProtoManip, {
	length: 0,
	constructor (mix) {
		if (this instanceof SQuery === false) {
			return new SQuery(els);
		}
		if (arguments.length === 0) {
			return;
		}
		this.add(mix);
		this.resolve(this);
	},
	add (mix) {
		if (mix == null)
			return this;
		if (_.is_Array(mix) === true)
			return each(mix, this.add, this);

		this[this.length++] = mix;
		return this;
	},
	eq (num) {
		return async_next(this, (source, $) => {
			if (num <= source.length) {
				$.add(source[num]);
			}
		});
	},
	slice (start = 0, end = null) {
		return async_next(this, (source, $) => {
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
	}
})

var x =  {

	children: function(sel){
		var set = each(this, function(node){
			this.add(node.childNodes);
		}, new SQuery);
		return sel == null ? set : set.filter(sel);
	},
	closest: function(selector){
		var x = this[0],
			dom = new SQuery;
		while( x != null && x.parentNode != null){
			x = x.parentNode;
			if (_is(x, selector))
				return dom.add(x);
		}
		return dom;
	},
	next: function(selector){
		var x = this[0],
			dom = new SQuery;
		while (x != null && x.nextElementSibling != null) {
			x = x.nextElementSibling;
			if (selector == null) {
				return dom.add(x);
			}
			if (_is(x, selector)) {
				return dom.add(x);
			}
		}
		return dom;
	},
	remove: function(){
		return each(this, function(x){
			x.parentNode.removeChild(x);
		});
	},
	text: function(mix){
		if (arguments.length === 0) {
			return aggr('', this, function(txt, x){
				return txt + x.textContent;
			});
		}
		return each(this, function(x){
			x.textContent = mix;
		});
	},
	html: function(mix){
		if (arguments.length === 0) {
			return aggr('', this, function(txt, x){
				return txt + x.innerHTML;
			});
		}
		return each(this, function(x){
			x.innerHTML = mix;
		});
	},
	val: function(mix){
		if (arguments.length === 0) {
			return this.length === 0 ? null : this[0].value;
		}
		if (this.length !== 0) {
			this[0].value = mix;
		}
		return this;
	},
	focus: function(){
		return each(this, function(x){
			x.focus && x.focus();
		});
	}
};