import io from 'socket.io-client';

const DEFAULT_PORT = 7007;

const TIME_WARN = 5000;
const TIME_OFF = 5000;

enum StatusType {
    OK = 'online',
    WARN = 'warning',
    OFF = 'offline'
}

export type Address = {
    ip: string;
    name: string;
}

export class Peer {
    ip: string;
    name: string;
    socket: any;
    status: StatusType;
    timerWarnId;
    timerOffId;
    lastTimeUpdate: number;

    constructor(data: Address) {
        this.ip = data.ip;
        this.name = data.name;
        this.status = StatusType.OFF;
        this.lastTimeUpdate = 0;
        this.connect();
        this.timerWarn();
        setInterval(() => {
            this.update();
        }, 3000);
    }

    connect() {
        this.socket = io(`ws://${this.ip}:${DEFAULT_PORT}`);
        this.socket.on('message', () => {
            this.update();
        });
    }

    timerWarn() {
        this.timerWarnId = setTimeout(() => {
            this.status = StatusType.WARN;
            this.timerOff();
        }, TIME_WARN);
    }

    timerOff() {
        this.timerOffId = setTimeout(() => {
            this.status = StatusType.OFF;
        }, TIME_OFF);
    }

    timersReset() {
        clearTimeout(this.timerWarnId);
        clearTimeout(this.timerOffId);
        this.timerWarn();
    }

    update() {
        const currentTime = new Date().getTime();
        this.timersReset();
        if (this.lastTimeUpdate + TIME_WARN + TIME_OFF < currentTime) {
            this.status = StatusType.OFF;
        } else if (this.lastTimeUpdate + TIME_WARN < currentTime) {
            this.status = StatusType.WARN;
        } else {
            this.status = StatusType.OK;
        }
        this.lastTimeUpdate = currentTime;
    }
}
