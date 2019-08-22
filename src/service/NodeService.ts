import data from './../data/config.json';
import NodeRepository from './../repository/NodeRepository';
import { Node, NodeInfo } from './../model/node';
import { server } from './../driver/socket';

class NodeService {

    constructor() {
        this.init();
    }

    init() {
        data.hosts.forEach(item => {
            NodeRepository.add(item);
        });
    }

    getAllNodes(): Array<NodeInfo> {
        return NodeRepository.getAll().map((node: Node) => ({
            status: node.status,
            ip: node.ip,
            name: node.name
        }));
    }

    update() {
         const nodes = this.getAllNodes();
         server.getSocket().send(nodes);
    }
}

export default new NodeService();
