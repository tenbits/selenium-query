interface ICookie {
    key: string
    value: string
    rawOptions?: string
}
class DomainCookies {
    arr: ICookie[] = []

    constructor (public domain: string) {

    }

    add(mix: string | string[] | { [key: string]: string }, opts?: { extend: boolean }) {
        if (mix == null) {
            return;
        }
        if (typeof mix === 'string') {
            this.push(mix, opts);
            return;
        }
        if (Array.isArray(mix)) {
            if (mix.length === 0) {
                return;
            }
            let f = mix[0];
            if (typeof f === 'string') {
                mix.forEach(str => this.push(str, opts));
                return;
            }
            throw Error('Cookie models are not yet supported');
        }

        for (let key in mix) {
            let cookie = `${key}=${mix[key]}`;
            this.push(cookie, opts);
        }

    }
    stringify () {
        return this.arr.map(x => `${x.key}=${x.value}`).join('; ');
    }
    private push (str: string, opts?: { extend: boolean }) {
        let arr = DomainCookies.parse(str);
        arr.forEach(cookie => {
            let i = this.arr.findIndex(x => x.key === cookie.key);
            if (i !== -1) {
                if (opts?.extend === true) {
                    // Skip existed cookie
                    return;
                }
                this.arr[i] = cookie;
                return;
            }
            this.arr.push(cookie);
        });
    }
    private static parse (cookies: string): ICookie[] {
        let format = CookiesHelper.detectFormat(cookies);
        if (format === 'key-values') {
            return cookies.split(';').map(DomainCookies.parseSingle);
        }
        if (format === 'set-cookie') {
            // Comma Seperated cookies from `set-cookie` header
            let arr = [];
            let rgx = /,/g
            while (cookies !== '') {
                let match = rgx.exec(cookies);
                if (match == null) {
                    arr.push(cookies);
                    break;
                }
                let str = cookies.substring(0, match.index);
                if (/Expires=[\w]{1,4}$/i.test(str)) {
                    continue;
                }
                arr.push(str);
                cookies = cookies.substring(match.index + 1).trim();
            }
            return arr.map(DomainCookies.parseSingle);
        }
        throw new Error(`Unknown cookie format: ${format} for ${cookies}`);
    }
    private static parseSingle (cookie: string): ICookie {
        let i = cookie.indexOf('=');
        if (i === -1) {
            throw new Error(`Invalid cookie format ${cookie}`);
        }
        let key = cookie.substring(0, i);

        cookie = cookie.substring(i + 1).trim();
        i = cookie.indexOf(';');
        if (i === -1) {
            return { key, value: cookie };
        }

        let value = cookie.substring(0, i);
        return {
            key,
            value,
            rawOptions: cookie.substring(i)
        };
    }
}

namespace CookiesHelper {
    export function detectFormat (cookies: string): 'set-cookie' | 'key-values' {
        let optionsRgx = /;\s*(Path|Domain|Expires|Max\-Age|Secure|HttpOnly)([=;]|$)/i;
        let hasOptions = optionsRgx.test(cookies);
        if (hasOptions) {
            return 'set-cookie';
        }
        if (/^[\w_-]+=\{/.test(cookies)) {
            return 'key-values';
        }

        let commaIndex = cookies.indexOf(',');
        let semicolonIndex = cookies.indexOf(';');
        if (commaIndex > -1 && semicolonIndex === -1) {
            // Has comma but not semicolon
            return 'set-cookie';
        }

        return 'key-values';
    }
}

export class CookieContainer {
    domains: {
        [domain: string]: DomainCookies
    } = {};

    addCookies(cookies: string | string[] | { [key: string]: string });
    addCookies(url: string, cookies: string | string[] | { [key: string]: string })
    addCookies(url: string, cookies: string | string[] | { [key: string]: string }, opts: { extend: boolean })
    addCookies(mix: any, cookies?: string | string[] | { [key: string]: string }, opts?: { extend: boolean }) {
        let domain = 'global';
        if (arguments.length > 1) {
            let url = mix;
            domain = this.getDomain(url);
        } else {
            cookies = mix;
        }
        let container = this.domains[domain];
        if (container == null) {
            container = this.domains[domain] = new DomainCookies(domain);
        }
        container.add(cookies, opts);
    }
    clearCookies () {
        this.domains = {};
    }
    getCookies (url?: string) {
        let cookies = [];
        let domain = url && this.getDomain(url) || null;
        for (let key in this.domains) {
            if (key !== 'global' && key !== domain && domain.endsWith('.' + key) === false /** Includ root cookies also to subdomains */) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join('; ');
    }


    private getDomain(url: string) {
        return url
            .replace(/https?:\/\//, '')
            .replace(/\/.*$/, '')
            .toLowerCase();
    }

}

export const cookieContainer = new CookieContainer();
