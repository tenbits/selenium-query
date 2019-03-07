import * as crypto from 'crypto';
import { ILoadConfig } from '../common/IConfig'
import { File } from 'atma-io'
import * as zlib from 'zlib'

interface ICacheItem {
    time: number
    file: string
    maxAge: number
}
const CACHE_BASE = './cache/squery';
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
        return File[ isAsync ? 'exists' : 'existsAsync' ](`${CACHE_BASE}/${meta.file}`);
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
        let withCompression = meta.file.endsWith('.gz');
        let encoding = withCompression ? 'buffer' : 'utf8';
        let result = await new File(`${CACHE_BASE}/${meta.file}`, { cached: false }).readAsync({ encoding });
        if (withCompression === false) {
            return result;
        }
        let str = await Compression.decompress(<Buffer> result);
        return JSON.parse(str);
    }
    save (url: string, config: ILoadConfig, json) {
        this.ensureMeta();
        url = this.normalizeUrl(url, config);

        let md5 = crypto.createHash('md5').update(url).digest('hex');
        let file = `${md5}.json`;
        let withCompression = config.cache.compress;
        if (withCompression) {
            file += '.gz';
        }
        
        this.meta[url] = {
            time: Date.now(),
            file: file,
            maxAge: config.cache && config.cache.maxAge
        };

        this.flushMeta();

        if (!withCompression) {
            new File(`${CACHE_BASE}/${file}`, { cached: false }).writeAsync(json);
            return;
        }

        let str = JSON.stringify(json);
        Compression.compress(Buffer.from(str)).then(buffer => {
            new File(`${CACHE_BASE}/${file}`, { cached: false }).writeAsync(buffer);
        });
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
        let file = `${CACHE_BASE}/meta.json`;
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
                .writeAsync(`${CACHE_BASE}/meta.json`, <any> this.meta)
                .always(x => {
                    this.isFlushDeferred = false;
                });
        }, 1000);
    }
}

class Compression {
    static compress (buffer: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            zlib.deflate(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer);
            });
        });
    }
    static decompress (buffer: Buffer): Promise<string> {
        return new Promise((resolve, reject) => {
            zlib.unzip(buffer, (err, buffer) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buffer.toString('utf8'));
            });
        });
    }
}

export const cache = new Cache;