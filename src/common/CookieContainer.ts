interface ICookie {
    key: string
    value: string
    rawOptions?: string
}
class DomainCookies {
    arr: ICookie[] = []
    
    constructor (public domain: string) {
        
    }

    add(mix: string | string[]) {
        if (typeof mix === 'string') {
            this.push(mix);
        }
        if (Array.isArray(mix)) {
            if (mix.length === 0) {
                return;
            }
            let f = mix[0];
            if (typeof f === 'string') {
                mix.forEach(str => this.push(str));
                return;
            }
            throw Error('Cookie models are not yet supported');
        }
    }
    stringify () {
        return this.arr.map(x => `${x.key}=${x.value}`).join('; ');
    }
    private push (str: string) {
        let arr = DomainCookies.parse(str);
        arr.forEach(cookie => {
            let i = this.arr.findIndex(x => x.key === cookie.key);
            if (i !== -1) {
                this.arr[i] = cookie;
                return;
            }
            this.arr.push(cookie);
        });
    }    
    private static parse (cookies: string): ICookie[] {
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

export class CookieContainer {
    domains: {
        [domain: string]: DomainCookies
    } = {};

    addCookies(cookies: string | string[]);
    addCookies(url: string, cookies: string | string[])
    addCookies(mix: any, cookies?: string | string[]) {
        let domain = 'global';
        if (arguments.length === 2) {
            let url = mix;
            domain = this.getDomain(url);
        } else {
            cookies = mix;
        }
        let container = this.domains[domain];
        if (container == null) {
            container = this.domains[domain] = new DomainCookies(domain);
        }
        container.add(cookies);
    }

    getCookies (url?: string) {
        let cookies = [];
        let domain = url && this.getDomain(url) || null;
        for (let key in this.domains) {
            if (key !== 'global' && key !== domain) {
                continue;
            }
            cookies.push(this.domains[key].stringify());
        }
        return cookies.join('; ');
    }


    private getDomain(url: string) {
        let match = /[^/]\/[^/]/.exec(url);
        let domain = match == null ? url : url.substring(0, match.index + 1);
        return domain.replace(/https?:\/\//, '').toLowerCase();
    }

}

export const cookieContainer = new CookieContainer();