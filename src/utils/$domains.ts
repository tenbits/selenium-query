

export namespace $domains {
    let rgxDomain = /^(?<protocol>\w+):[\/]{1,3}(?<base>[\w\-\.]+)/;
    export function fromUrl (url: string) {
        let match = rgxDomain.exec(url);
        if (match == null) {
            throw new Error(`Invalid URL: ${url}`);
        }
        return match[0];
    }
    export function equal (urlA: string, urlB: string) {
        if (urlB == null) {
            return false;
        }
        if (urlB.startsWith('data:')) {
            return false;
        }

        let a = fromUrl(urlA);
        let b = fromUrl(urlB);

        let rgxProtocol = /\w+:[\/]{1, 3}/;
        a = a.replace(rgxProtocol, '');
        b = b.replace(rgxProtocol, '');
        return a.toLowerCase() === b.toLowerCase();
    }
}
