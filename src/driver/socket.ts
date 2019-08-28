import { DEFAULT_PORT, API_SOCKET_SERVER_CONFIG } from './config';
import { IOSocketServer } from 'eska-common';

export const server = new IOSocketServer(DEFAULT_PORT, API_SOCKET_SERVER_CONFIG);
server.run();
