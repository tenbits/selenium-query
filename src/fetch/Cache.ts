import * as crypto from 'crypto';
import { ILoadConfig } from '../common/IConfig'
import { File } from 'atma-io'

interface ICacheItem {
    time: number
    file: string
    maxAge: number
}
export class Cache {
    meta: {[url: string]: ICacheItem } = null;

    get (url: string, config: ILoadConfig ) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        this.ensureMeta();
        url = this.normalizeUrl(url, config);

        let meta = this.meta[url];
        if (meta == null) {
            return null;
        }
        let now = Date.now();
        let seconds = ((now - meta.time) / 1000) | 0;
        if (meta.maxAge && seconds > meta.maxAge) {
            return null;
        }
        let response = new File(`./cache/squery/${meta.file}`, { cached: false }).read();
        return response;
    }
    save (url: string, config: ILoadConfig, json) {
        this.ensureMeta();
        url = this.normalizeUrl(url, config);

        let md5 = crypto.createHash('md5').update(url).digest('hex');
        let file = `${md5}.json`;
        this.meta[url] = {
            time: Date.now(),
            file: file,
            maxAge: config.cache && config.cache.maxAge
        };


        new File('./cache/squery/meta.json', { cached: false }).write(<any> this.meta);
        new File(`./cache/squery/${file}`,   { cached: false }).writeAsync(json);
    }

    private normalizeUrl (url: string, config: ILoadConfig) {
        url = url.toLowerCase();
        let ignore = config.cacheQueryIgnore;
        if (ignore) {
            ignore.forEach(x => {
                url = url.replace(new RegExp(`&${x}=[\\w\\d]+`), '');
                url = url.replace(new RegExp(`\\?${x}=[\\w\\d]+`), '?');
            });
        }
        return url;
    }

    private ensureMeta () {
        if (this.meta != null) {
            return;
        }
        let file = './cache/squery/meta.json';
        if (File.exists(file)) {
            this.meta = <any> File.read(file);
        } else {
            this.meta = {};
        }
    }
}

export const cache = new Cache;