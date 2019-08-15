import data from './../data/config.json';
import PeerRepository from './../repository/PeerRepository';
import { Peer } from './../model/peer';

class EventService {

    constructor() {
        this.init();
    }

    init() {
        data.hosts.forEach(item => {
            PeerRepository.add(item);
        });
    }

    getAllPeers() {
        return PeerRepository.getAll().map((peer: Peer) => ({
            status: peer.status,
            ip: peer.ip,
            name: peer.name
        }));

    }
}

export default new EventService();
