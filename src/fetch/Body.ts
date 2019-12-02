import { ILoadConfig } from '../common/IConfig';
import { is_rawObject, obj_extend } from 'atma-utils';

export namespace Body {
    export function handleAsRawObject (opts: { body?, headers? }) {
        let mime = opts.headers?.['content-type'] ?? opts.headers?.['Content-Type'];
        if (mime == null) {
            mime = 'application/json; charset=UTF-8'
            opts.headers = obj_extend(opts.headers, {
                'Content-Type': mime
            });
        }

        if (mime.includes('/json')) {
            opts.body = JSON.stringify(opts.body);
            return;
        }
        if (mime.includes('form-urlencoded')) {
            const { URLSearchParams } = require('url');
            const params = new URLSearchParams();
            const obj = flatternObject(opts.body);
            for (let key in obj) {
                params.append(key, obj[key]);
            }
            opts.body = <any> params;
            return;
        }
        if (mime.includes('form-data')) {
            const FormData = require('form-data');
            const form = new FormData();
            const obj = flatternObject(opts.body);
            for (let key in obj) {
                form.append(key, obj[key]);
            }
            opts.body = <any> form;
            return;
        }
    }

    function flatternObject (obj, out = {}, prfx: string = null) {
        for (let key in obj) {
            let val = obj[key];
            if (val == null) {
                continue;
            }
            let path = prfx ? `${prfx}[${key}]` : key;

            if (typeof val !== 'object') {
                out[path] = val;
                continue;
            }
            if (Array.isArray(val)) {
                val.forEach((x, index) => {
                    flatternObject(x, out, `${path}[${index}]`)
                });
                return;
            }
            if (is_rawObject(val)) {
                flatternObject(val, out, path);
                return;
            }
            throw new Error(`Cannt flattern object. Unsupported value type in ${path}`);
        }
        return out;
    }
}