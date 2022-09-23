
let ID = 0;

type TAwaiter = {
    id: number
    resolve: (value: any) => void
    reject: (reason?: any) => void
};

export class CDPConnection {

    private requests: Map<number, TAwaiter> = new Map();

    constructor(private wsConnection, private sessionId: string) {
        wsConnection.on('message', this.onMessage.bind(this));
        wsConnection.on('close', this.onClose.bind(this));
        wsConnection.on('error', this.rejectAll.bind(this));
    }

    execute <T = any> (method, params, onMessageSent: (err) => any = null): Promise<T> {

        let message = {
            sessionId: this.sessionId,
            method,
            params,
            id: ++ID,
        };
        let listener = {
            id: message.id,
            resolve: null,
            reject: null,
        };
        let promise = new Promise<T>((resolve, reject) => {
            listener.resolve = resolve;
            listener.reject = reject;
        });

        this.requests.set(listener.id, listener);

        this.wsConnection.send(JSON.stringify(message), onMessageSent)
        return promise;
    }

    private onMessage (message: Buffer) {
        let params = JSON.parse(message.toString());
        let { id, result } = params;

        if (id != null && this.requests.has(id)) {
            this.requests.get(id)?.resolve?.(result);
            this.requests.delete(id);
        }
    }

    private onClose () {
        this.rejectAll(new Error(`CDPConnection: The underlying connection was closed`));
    }

    private rejectAll(error: Error) {

        let awaiters = this.requests.values();
        this.requests = new Map();

        for (let awaiter of awaiters) {
            awaiter.reject(error);
        }
    }
}

