export namespace Humanize {
    export namespace Time {
        export function getSeconds (str: string) {
            let rgx = /^(\d+)(s|sec|seconds|m|mins?|h|hours?|d|days?|w|weeks?|months?|y|years?)$/
            let match = rgx.exec(str);
            if (match == null) {
                throw new Error(`Invalid Humanize seconds. Pattern: ${rgx.toString()}. Got: ${str}`);
            }
            let val = parseFloat(match[1]);
            let unit = match[2];
            switch (unit) {
                case 's':
                case 'sec':
                    return val;
                case 'm':
                case 'min':
                case 'mins':
                    return val * 60;
                case 'h':
                case 'hour':
                case 'hours':
                    return val * 60 * 60;
                case 'd':
                case 'day':
                case 'days':
                    return val * 60 * 60 * 24;
                case 'w':
                case 'week':
                case 'weeks':
                    return val * 60 * 60 * 24 * 7;
                case 'month':
                case 'months':
                    return val * 60 * 60 * 24 * 31;
                case 'y':
                case 'year':
                case 'years':
                    return val * 60 * 60 * 24 * 365;
            }
            return 0;
        }
    }
}
