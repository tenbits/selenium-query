class DomainCookie {
    arr: string[] = []
    
    constructor (public domain: string) {
        
    }

    add(mix: string | string[]) {
        if (typeof mix === 'string') {
            let arr = mix.split(';').map(x => x.trim());
            this.arr.push(...arr);
        }
        if (Array.isArray(mix)) {
            if (mix.length === 0) {
                return;
            }
            let f = mix[0];
            if (typeof f === 'string') {
                this.arr.push(...mix);
                return;
            }
            throw Error('Cookie models are not yet supported');
        }
    }
    stringify () {
        return this.arr.join(';');
    }
}

export class CookieContainer {
    domains: {
        [domain: string]: DomainCookie
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
            container = this.domains[domain] = new DomainCookie(domain);
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
        return cookies.join(';');
    }


    getDomain(url: string) {
        let match = /[^/]\/[^/]/.exec(url);
        let domain = match == null ? url : url.substring(0, match.index + 1);
        return domain.replace(/https?:\/\//, '').toLowerCase();
    }

}

export const cookieContainer = new CookieContainer();