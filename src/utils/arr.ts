export function each<T, T2> (arr: T[], fn: (x: T, i?: number) => void, ctx: T2 = null): T[] | T2 {
    if (arr == null)
        return ctx || arr;
    var imax = arr.length,
        i = -1;
    while( ++i < imax ){
        fn.call(ctx || arr, arr[i], i);
    }
    return ctx || arr;
};

export function map<TIn, TOut> (arr: TIn[], fn: (x: TIn, i?: number) => TOut): TOut[] {
    const out = [];
    each(arr, (x, i) => {
        out.push(fn(x, i));
    });
    return out;
}

export function aggr <TSeed, TArr> (seed: TSeed, arr: TArr[], fn: (seed: TSeed, x: TArr, i?: number) => TSeed, ctx?: any): TSeed {
    each(arr, function(x, i){
        seed = fn.call(ctx || arr, seed, x, i);
    });
    return seed;
}
export function indexOf<TArr> (arr: TArr[], fn: (x: TArr, i?:number) => boolean, ctx?): number{
    if (arr == null)
        return -1;
    var imax = arr.length,
        i = -1;
    while( ++i < imax ){
        if (fn.call(ctx || arr, arr[i], i) === true)
            return i;
    }
    return -1;
}
