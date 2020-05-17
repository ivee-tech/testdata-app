export class EventEmitter {

    private static events: {} = {};

    static dispatch(event: string, data: any) {
        if(!this.events[event]) return;
        this.events[event].forEach(callback => {
            callback(data);
        });
    }

    static subscribe(event: string, callback: Function) {
        if(!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }
    
}
