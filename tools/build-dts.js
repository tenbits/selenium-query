var dts = require('dts-bundle');

dts.bundle({
	name: 'selenium-query',
	main: './ts-temp/SQueryLibrary.d.ts',
	out: './typings/index.d.ts'
});

io.File.copyTo('./ts-temp/typings/index.d.ts', './lib/query.d.ts');