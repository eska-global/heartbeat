import { Address } from './../model/node';
import { Node } from './../model/node';

class NodeRepository {
    private store: Map<string, Node>;

    constructor() {
        this.store = new Map();
    }

    add(data: Address) {
        const node = new Node(data);
        this.store.set(data.ip, node);
    }

    getAll(): Array<Node> {
        return [...this.store.values()];
    }
}

export default new NodeRepository();
