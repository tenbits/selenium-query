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

    private hasInner (url: string, config: ILoadConfig, { isAsync = false } = {}) {
        if (config.cache == null || config.cache === false) {
            return false;
        }
        this.ensureMeta();
        url = this.normalizeUrl(url, config);

        let meta = this.meta[url];
        if (meta == null) {
            return false;
        }
        return File[ isAsync ? 'exists' : 'existsAsync' ](meta.file);
    }
    public has (url: string, config?: ILoadConfig) {
        return <boolean> this.hasInner(url, config, { isAsync: false });
    }
    public hasAsync (url: string, config?: ILoadConfig) {
        return <Promise<boolean>> <any> this.hasInner(url, config, { isAsync: true });
    }

    async get (url: string, config: ILoadConfig ) {
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
        return await new File(`./cache/squery/${meta.file}`, { cached: false }).readAsync();
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


        this.flushMeta();
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

    isFlushDeferred = false  

    private flushMeta () {
        if (this.isFlushDeferred) {
            return;
        }
        this.isFlushDeferred = true;
        setTimeout(() => {
            File
                .writeAsync('./cache/squery/meta.json', <any> this.meta)
                .always(x => {
                    this.isFlushDeferred = false;
                });
        }, 1000);
    }
}

export const cache = new Cache;