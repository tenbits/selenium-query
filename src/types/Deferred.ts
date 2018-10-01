export interface Deferred<T> extends Promise<T> {
    
    done (cb: (x: T) => void | any): this
    fail (cb: (error: Error) => void | any): this
}