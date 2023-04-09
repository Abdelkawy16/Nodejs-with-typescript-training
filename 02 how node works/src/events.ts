import EventEmitter from 'events';
import * as http from 'http';


class Sales extends EventEmitter {
    private _eventName : string = 'myEvent';
    constructor() {
        super();
    }
    public emitMyEvent(...args: any[]) {
        this.emit(this._eventName, ...args);
    }
    public createEvent(callback: (...args: any[])=>void) {
        this.on(this._eventName, callback);
    }
}

function MyEmitter() {
    const eventEmitter = new Sales();
    eventEmitter.createEvent((arg1, arg2, arg3) => {
        console.log('myEvent fired', arg1, arg2, arg3);
    });
    eventEmitter.emitMyEvent('arg1', 'arg2', 'arg3');

    const server = http.createServer();
    server.on('request', (req, res) => {
        console.log('Request received');
        res.end('Request received');
    });
    server.on('request', (req, res) => {
        console.log('Another request received 😁');
    });
    server.on('close', () => {
        console.log('Server closed');
    });
    server.listen(8000, '127.0.0.1', () => {
        console.log('Listening to requests on port 8000');
    });
}

// require('').exports = MyEmitter;
//exports.test = "MyEmitter";

// export object
// module.exports = {
//     test: "MyEmitter",
//     MyEmitter: MyEmitter
// }

//or you can use the following code:
export class _eventEmmoter {
    test: string = "MyEmitter";
    MyEmitter: () => void = MyEmitter;
}

