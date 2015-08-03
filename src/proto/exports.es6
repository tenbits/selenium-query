var SQueryProto = {
	length: 0,
	constructor (mix) {
		if (this instanceof SQuery === false) {
			return new SQuery(mix);
		}
		if (arguments.length === 0) {
			return;
		}
		this.add(mix);
		this.resolve(this);
	},
};

// import ./collection.es6
// import ./traverse.es6
// import ./properties.es6
// import ./content.es6
// import ./manipulate.es6
// import ./events.es6
// import ./keyboard.es6
// import ./css.es6