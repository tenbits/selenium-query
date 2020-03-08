import { class_EventEmitter } from 'atma-utils';

const EVENT_COMPLETE = 'complete'

export class NetworkTracer extends class_EventEmitter {
    active = false

    spans: NetworkSpan[] = []

    createSpan (req: IReq): NetworkSpan {
        if (this.active === false) {
            return new NetworkSpanMock(req) as NetworkSpan;
        }
        let span = new NetworkSpan(req);
        this.spans.push(span);
        span.on(EVENT_COMPLETE, () => this.trigger(EVENT_COMPLETE, span));
        return span;
    }

    onComplete (cb: (span: NetworkSpan) => void) {
        this.active = true;
        this.on(EVENT_COMPLETE, cb);
    }

    clear () {
        this.active = false;
        this.spans.length = 0;
        this.off(EVENT_COMPLETE);
    }
}

export class NetworkSpan extends class_EventEmitter {
    startTime: Date
    endTime: Date

    res: IRes
    req: IReq

    cached: boolean = false

    constructor (req: IReq) {
        super();
        this.req = req;
        this.startTime = new Date();
    }

    complete (res: IRes) {
        this.endTime = new Date();
        this.res = {
            url: res.url,
            status: res.status,
            headers: res.headers,
            body: res.body
        };
        if (Buffer.isBuffer(res.body)) {
            this.res.body = res.body.toString()
        }
        this.trigger(EVENT_COMPLETE, this);
    }
}

class NetworkSpanMock {
    constructor (req: IReq) {}
    complete (res: IRes) {}
}

interface IReq {
    method: string
    url: string
    headers: { [name: string] : string }
    body: any
}
interface IRes {
    url: string
    status: number
    headers: { [name: string] : string }
    body: any
}