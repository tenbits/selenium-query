import { IQuery } from './IQuery';

let rgx_PSEUDO = /:([\w]+)(\s*\(([^)]+)\))?/g;

export interface IPseudoSelectorFn <TElement = any> {
    ($: IQuery<TElement>, arg: string): IQuery<TElement>
}

export namespace SelectorsEx {

    export const pseudoFns: { [key: string]: IPseudoSelectorFn<any> } = {}

    export function register (name: string, fn: IPseudoSelectorFn) {
        pseudoFns[name] = fn;
    }
    
    export async function find <TElement> (el: IQuery<TElement>, selector: string, find: (el: IQuery<TElement> , selector: string) => IQuery<TElement>)  {
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

            let fn = pseudoFns[name];
            $ = await fn($, arg);

            
        } while (selector.length > 0);

        if (selector.length > 0) {
            return find($, selector);
        }
        return $;
    }
}
