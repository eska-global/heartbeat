export const DEFAULT_PORT = Number(process.env.DEFAULT_PORT) || 7008;
import { ServerOptions } from 'socket.io';

export const API_SOCKET_SERVER_CONFIG: ServerOptions = {
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 10000,
};
