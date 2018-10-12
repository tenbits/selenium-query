import * as crypto from 'crypto';
import { ILoadConfig } from '../common/IConfig'
declare var io: any;


export class Cache {
    meta: {[url: string]: {time: number, file: string, maxAge: number} } = null;

    get (url: string, config: ILoadConfig ) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        this.ensureMeta();
        let meta = this.meta[url];
        if (meta == null) {
            return null;
        }
        let now = Date.now();
        let seconds = ((now - meta.time) / 1000) | 0;
        if (meta.maxAge && seconds > meta.maxAge) {
            return null;
        }
        let response = io.File.read(`./cache/squery/${meta.file}`);
        return response;
    }
    save (url: string, config: ILoadConfig, json) {
        this.ensureMeta();

        let md5 = crypto.createHash('md5').update(url).digest('hex');
        let file = `${md5}.json`;
        this.meta[url] = {
            time: Date.now(),
            file: file,
            maxAge: config.cache && config.cache.maxAge
        };


        io.File.write('./cache/squery/meta.json', this.meta);
        io.File.write(`./cache/squery/${file}`, json);
    }

    private ensureMeta () {
        if (this.meta != null) {
            return;
        }
        let file = './cache/squery/meta.json';
        if (io.File.exists(file)) {
            this.meta = io.File.read(file);
        } else {
            this.meta = {};
        }
    }
}

export const cache = new Cache;