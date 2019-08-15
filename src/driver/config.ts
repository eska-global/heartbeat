export const DEFAULT_PORT = 7008;
const DEFAULT_SYSTEM_SOCKET_CHANNEL = 'SYSTEM_HEALTH';
export const SYSTEM_HEALTH_SOCKET_CHANNEL = process.env.SYSTEM_HEALTH_SOCKET_CHANNEL || DEFAULT_SYSTEM_SOCKET_CHANNEL;
import { ServerOptions } from 'socket.io';

export const API_SOCKET_SERVER_CONFIG: ServerOptions = {
    serveClient: false,
    pingTimeout: 5000,
    pingInterval: 10000,
};
