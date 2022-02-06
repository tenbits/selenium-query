import { class_Dfr } from 'atma-utils'
import { Deferred } from '../types/Deferred';

export function dfr_run <T> (fn: (resolve: (result?: T) => void | any, reject: (error: any) => void | any) => void | any) : Promise<T> {
    return new Promise(fn)
};

export function dfr_resolve <T> (x?: T) : Deferred<T> {
    let dfr = new class_Dfr;
    let args = arguments.length === 0 ? [] : [ x ];
    dfr.resolve(...args);
    return <any> dfr;
};
