import * as crypto from 'crypto';
import { ILoadConfig } from '../common/IConfig'
import { File } from 'atma-io'
import * as zlib from 'zlib'
import { NetworkResponse } from './NetworkDriver';

interface ICacheItem {
    time: number
    file: string
    maxAge: number
}
const CACHE_BASE = './cache/squery';
export class Cache {
    meta:  { [domainKey: string]: { [url: string]: ICacheItem } } = null;

    private hasInner (url: string, config: ILoadConfig, { isAsync = false } = {}) {
        if (config.cache == null || config.cache === false) {
            return false;
        }
        url = this.normalizeUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);

        let meta = this.meta[domainKey][url];
        if (meta == null) {
            return false;
        }
        return File[ isAsync ? 'exists' : 'existsAsync' ](`${CACHE_BASE}/${domainKey}/${meta.file}`);
    }
    public has (url: string, config?: ILoadConfig) {
        return <boolean> this.hasInner(url, config, { isAsync: false });
    }
    public hasAsync (url: string, config?: ILoadConfig) {
        return <Promise<boolean>> <any> this.hasInner(url, config, { isAsync: true });
    }

    remove (url: string, config: ILoadConfig) {
        url = this.normalizeUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);

        let meta = this.meta[domainKey][url];
        if (meta == null) {
            return null;
        }
        delete this.meta[domainKey][url];
        this.flushMeta(domainKey);
    }

    async get (url: string, config: ILoadConfig) {
        if (config.cache == null || config.cache === false) {
            return null;
        }
        url = this.normalizeUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);

        let meta = this.meta[domainKey][url];
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
        let result: any = await new File(`${CACHE_BASE}/${domainKey}/${meta.file}`, { cached: false }).readAsync({ encoding });
        if (withCompression) {         
            let str = await Compression.decompress(<Buffer> result);
            result = JSON.parse(str);
        }
        if (result.file != null) {
            result.body = await new File(`${CACHE_BASE}/${domainKey}/${result.file}`, { cached: false }).readAsync({ encoding: 'buffer' });
            delete result.file;
        }
        return result;
    }
    save (url: string, config: ILoadConfig, resp: NetworkResponse) { 
        if (config.cache == null || config.cache === false) {
            return null;
        }
        let cache = typeof config.cache !== 'boolean' ? config.cache : {
            compress: true,
            maxAge: 24 * 60 * 60
        };

        if (config.cache === true) {
            cache = {
                compress: true,
            };
        }       
        url = this.normalizeUrl(url, config);
        let domainKey = Utils.getDomainKey(url);
        this.ensureMeta(domainKey);

        let md5 = crypto.createHash('md5').update(url).digest('hex');
        let file = `${md5}.json`;
        
        let withCompression = cache.compress;
        if (withCompression) {
            file += '.gz';
        }
        
        this.meta[domainKey][url] = {
            time: Date.now(),
            file: file,
            maxAge: cache.maxAge
        };

        this.flushMeta(domainKey);       
        let json: any = {
            status: resp.status,
            headers: resp.headers,
            url: resp.url,
            body: resp.body
        };
        let contentType = resp.headers['content-type'];
        let isText = /json|text/.test(contentType);
        if (isText === false) {
            let match = /\.[\w\d]+$/.exec(url);
            let ext = match[0];
            let path = `${CACHE_BASE}/${domainKey}/files/${md5}${ext}`;
            let file = new File(path, { cached: false });
            file.writeAsync(resp.body);
            json.file = `files/${md5}${ext}`
            delete json.body;
        }

        if (!withCompression) {
            new File(`${CACHE_BASE}/${domainKey}/${file}`, { cached: false }).writeAsync(json);
            return;
        }

        let str = JSON.stringify(json);
        Compression.compress(Buffer.from(str)).then(buffer => {
            new File(`${CACHE_BASE}/${domainKey}/${file}`, { cached: false }).writeAsync(buffer);
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

    private ensureMeta (domainKey: string) {
        if (this.meta != null && this.meta[domainKey] != null) {
            return;
        }
        if (this.meta == null) {
            this.meta = <any> {};       
        }
        let file = `${CACHE_BASE}/${domainKey}/meta.json`;
        if (File.exists(file)) {            
            this.meta[domainKey] = <any> File.read(file);
        } else {
            this.meta[domainKey] = {};
        }
    }

    isFlushDeferred = false  

    private flushMeta (domainKey) {
        if (this.isFlushDeferred) {
            return;
        }
        this.isFlushDeferred = true;
        setTimeout(() => {
            File
                .writeAsync(`${CACHE_BASE}/${domainKey}/meta.json`, <any> this.meta[domainKey])
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

namespace Utils {
    export function getDomainKey (url: string) {
        let domainMatch = /([\w\d_\-]+\.[\w]{2,5})([\/:]|$)/.exec(url);
        if (domainMatch) {
            return domainMatch[1].replace('.', '_');
        }
        return '';
    }
}

export const cache = new Cache;