import { IElement } from '../common/IDriver';
import { node_eval } from './utils/node';

declare var scripts_addEventListener: any;
declare var scripts_removeEventListener: any;
declare var scripts_pollEvent: any;


export namespace WebdriverEventsPoll {

    let bin = [];
    let ids = {};

    export function addEventListener (node: IElement, type: string, cb: Function) : Promise<any> {
        return <any> node_eval(
            node, 
            scripts_addEventListener, 
            type
        ).then(id => {
            
            bin.push([ node, type, cb, id ]);
            ids[id] = { node, type, cb, active: true };

            async function poll () {
                let data = ids[id];
                if (data.active !== true) {
                    return;
                }
                let event = await node_eval(node, scripts_pollEvent, id);
                if (data.active !== true) {
                    return;
                }

                if (event) {
                    cb(event);
                    poll();
                    return;
                }
                setTimeout(poll, 200);
            }
            poll();
        });
    }

    export async function removeEventListener(node: IElement, type: string, cb: Function = null): Promise<any> {

        for (let i = 0; i < bin.length; i++) {
            let data = bin[i];
            let [ _node, _type, _cb, _id ] = data;
            if (type !== _type) {
                continue;
            }
            if (node !== _node) {
                continue;
            }
            if (cb != null && cb !== _cb) {
                continue;
            }

            let info = ids[_id];
            if (info) {
                info.active = false;
            }
            await node_eval(
                node, 
                scripts_removeEventListener, 
                _id
            );
            bin.splice(i, 1);
            delete ids[_id];
            i--;
        }
    }
}