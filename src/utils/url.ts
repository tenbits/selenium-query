import { ILoadConfig } from '../common/IConfig';

export function serializeUrl (url: string, config: ILoadConfig = {}) {
    if (url.includes('://localhost')) {
        url.replace('://localhost', '://127.0.0.1');
    }
    if (config.query) {
        let q = '';
        for (let key in config.query) {
            if (url.includes(`${key}=`)) {
                continue;
            }
            let  p = `${key}=${ encodeURIComponent(config.query[key]) }`;
            q += (q ? '&' : '') + p;
        }
        if (q) {
            url += (url.includes('?') ? '&' : '?') + q;
        }
    }
    return url;
}

export function serializeCachableUrl (url: string, config: ILoadConfig) {
    url = url.replace(/(?<!:)[/]{2,}/g, '/');

    let ignore = config.cacheQueryIgnore;
    if (ignore) {
        ignore.forEach(x => {
            url = url.replace(new RegExp(`&${x}=[\\w\\d]+`), '');
            url = url.replace(new RegExp(`\\?${x}=[\\w\\d]+`), '?');
        });
    }
    return serializeUrl(url, config);
}
