import EventService from './../service/EventService';

export class Main {
    service;

    constructor() {
        this.service = EventService;
        this.run();
    }

    sendStatuses() {
        const peers = this.service.getAllPeers();
        console.log(peers)
    }

    run() {
        setInterval(() => {
            this.sendStatuses();
        }, 3000);
    }
}
export default new Main();
