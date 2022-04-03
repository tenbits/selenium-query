import { IQuery } from './IQuery';

let rgx_PSEUDO = /:([\w]+)(\s*\(([^)]+)\))?/g;

export interface IPseudoSelectorFn <TElement = any> {
    ($: IQuery<TElement>, arg: string): boolean | Promise<boolean>
}

export namespace SelectorsEx {

    export const pseudoFns: {
        [key: string]: IPseudoSelectorFn<any> | {
            isNodeFilter: boolean
            fn: <T = any> ($: IQuery<T>, arg?: string) => (IQuery<T> | Promise<IQuery<T>>)
        }
    } = {
        async 'text' (el: IQuery, txt) {
            let text = await el.text();
            let rgx = new RegExp(txt, 'i');
            return rgx.test(text);
        }
    }

    export function register (name: string, fn: IPseudoSelectorFn) {
        pseudoFns[name] = fn;
    }

    export function find <TElement> (el: IQuery<TElement>, selector: string, find: (el: IQuery<TElement> , selector: string) => IQuery<TElement>)  {
        let query = el.ctx.newAsync();
        findInner(el, selector, find).then(
            $ => {
                query.resolve($);
            },
            error => {
                query.reject(error)
            });
        return query;
    }

    async function findInner <TElement> (el: IQuery<TElement>, selector: string, find: (el: IQuery<TElement> , selector: string) => IQuery<TElement>)  {
        rgx_PSEUDO.lastIndex = -1;

        let $ = el;

        do {
            let match = rgx_PSEUDO.exec(selector);
            if (match == null) {
                break;
            }
            let [_, name, _g2, arg] = match;
            if (name in pseudoFns === false) {
                continue;
            }

            let selectorBefore = selector.substring(0, match.index);
            if (selectorBefore.length > 0) {
                $ = await find($, selectorBefore);
                if ($.length === 0) {
                    return $;
                }
            }
            selector = selector.substring(match.index + match[0].length);

            let misc = pseudoFns[name];
            if (typeof misc !== 'function') {
                $ = await misc.fn($, arg);
                continue;
            }

            let filterFn = misc;
            let $arr = el.ctx.newSync(null, el);
            for (let i = 0 ; i < $.length; i++) {
                let node = $[i];
                let $el = $.ctx.newSync(node);
                let result = await filterFn($el, arg);
                if (result) {
                    $arr.add(node);
                }
            }
            $ = $arr;
        } while (selector.length > 0);

        if (selector.length > 0) {
            return find($, selector);
        }
        return $;
    }
}


