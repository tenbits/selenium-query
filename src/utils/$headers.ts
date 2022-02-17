
export namespace $headers {

    export function resolve(headers: any | string) {
        if (headers == null) {
            return {};
        }
        if (typeof headers === 'string') {
            let hash = Object.create(null);
            headers
                .split('\n')
                .map(x => x.trim())
                .filter(Boolean)
                .forEach(line => {
                    let semi = line.indexOf(':');
                    if (semi === -1) {
                        throw new Error(`Invalid header delimter. ":" expected. ${line} in ${headers}`);
                    }
                    let key = line.substring(0, semi).trim();
                    let val = line.substring(semi + 1).trim();
                    hash[key] = val;
                });
            return hash;
        }
        return headers;
    }
}
