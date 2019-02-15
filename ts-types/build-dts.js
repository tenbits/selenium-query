var dts = require('dts-bundle');

dts.bundle({
	name: 'selenium-query',
	main: './ts-types/ts-temp/SQueryLibrary.d.ts',
    out: './typings/index.d.ts',
    
});

io.File.copyTo('./ts-types/ts-temp/typings/index.d.ts', './lib/query.d.ts');