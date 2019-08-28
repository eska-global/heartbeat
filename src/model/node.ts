import io from 'socket.io-client';
import { ThresholdType } from './../config';
import { StatusType } from './../config';
import { DEFAULT_PORT } from './../config';

export type Address = {
    ip: string;
    name: string;
}

export type NodeInfo = Address & {
    status: StatusType,
}

export class Node {
    ip: string;
    name: string;
    socket: any;
    status: StatusType;
    warningTimerId;
    criticalTimerId;
    lastTimeUpdate: number;

    constructor(data: Address) {
        this.ip = data.ip;
        this.name = data.name;
        this.status = StatusType.DOWN;
        this.lastTimeUpdate = 0;
        this._connect();
        this._startWarningTimer();
    }

    private _connect() {
        this.socket = io(`ws://${this.ip}:${DEFAULT_PORT}`);
        this.socket.on('message', () => {
            this._update();
            console.log('Socket server started successfully');
        });
    }

    private _startWarningTimer() {
        this.warningTimerId = setTimeout(() => {
            this.status = StatusType.WARNING;
            this._startCriticalTimer();
        }, ThresholdType.WARNING);
    }

    private _startCriticalTimer() {
        this.criticalTimerId = setTimeout(() => {
            this.status = StatusType.CRITICAL;
        }, ThresholdType.CRITICAL);
    }

    private _resetTimers() {
        clearTimeout(this.warningTimerId);
        clearTimeout(this.criticalTimerId);
        this._startWarningTimer();
    }

    private _update() {
        const currentTime = new Date().getTime();
        this._resetTimers();
        if (this.lastTimeUpdate + ThresholdType.WARNING + ThresholdType.CRITICAL < currentTime) {
            this.status = StatusType.CRITICAL;
        } else if (this.lastTimeUpdate + ThresholdType.WARNING < currentTime) {
            this.status = StatusType.WARNING;
        } else {
            this.status = StatusType.UP;
        }
        this.lastTimeUpdate = currentTime;
    }
}
