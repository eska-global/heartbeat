import { DEFAULT_PORT, SYSTEM_HEALTH_SOCKET_CHANNEL, API_SOCKET_SERVER_CONFIG } from './config';
import socketIO from 'socket.io';
import { NodeInfo } from './../model/node';

class Socket {
    server;

    constructor() {
        this.server = socketIO(DEFAULT_PORT, API_SOCKET_SERVER_CONFIG);
    }

    send(nodes: Array<NodeInfo>) {
        this.server.emit(SYSTEM_HEALTH_SOCKET_CHANNEL, nodes);
    }
}

export default new Socket();
