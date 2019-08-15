import { Address } from './../model/peer';
import { Peer } from './../model/peer';

class PeerRepository {
    private store: Map<string, Peer>;

    constructor() {
        this.store = new Map();
    }

    add(data: Address) {
        const peer = new Peer(data);
        this.store.set(data.ip, peer);
    }
    getAll(): Array<Peer> {
        return [...this.store.values()];
    }
}

export default new PeerRepository();
