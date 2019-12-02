import * as dts from 'dts-bundle';
import { File, Directory } from 'atma-io';

async function process () {

    let files = await Directory.readFilesAsync(`./ts-types/ts-temp/`, `**.d.ts`);
    for (let file of files) {
        await Preprocess.run(file);
    }

    dts.bundle({
        name: 'selenium-query',
        main: './ts-types/ts-temp/SQueryLibrary.d.ts',
        out: './typings/index.d.ts',
        
    });
    
    File.copyTo('./ts-types/ts-temp/typings/index.d.ts', './lib/query.d.ts');
}

namespace Preprocess {
    export async function run (file: InstanceType<typeof File>) {
        let source = await file.readAsync<string>({ skipHooks: true, encoding: 'utf8' });
        let out = source;
        
        let importsRgx = /import\("([^"]+)"\)\.([a-zA-Z_$\d]+)/g;
        let handled = {};

        // extract
        do {
            let match = importsRgx.exec(source);
            if (match == null) {
                break;
            }
            let [_, path, name ] = match;

            let key = `${path}:${name}`;
            if (key in handled) {
                continue;
            }

            out = `import { ${name} } from '${path}'; \n ${out}`;
            handled[key] = 1;
        } while (true);

        if (out === source) {
            // no imports
            return;
        }

        // remove
        out = out.replace(importsRgx, '$2');

        await file.writeAsync(out, { skipHooks: true });
    }
}

export { process }