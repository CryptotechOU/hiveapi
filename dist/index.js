// S.
'use strict';
import API from './API.js';
import fetch from 'node-fetch';
import { authenticator } from 'otplib';
export const SCHEME = 'https://';
export const HOST = 'api2.hiveos.farm';
export const BASE_PATH = '/api/v2';
function formatDowntime(ms) {
    ms = Date.now() - ms;
    let seconds = Math.floor(ms / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    let days = Math.floor(hours / 24);
    hours = hours % 24;
    if (hours > 0) {
        if (days > 0)
            return days + ' d ' + hours + ' h';
        else
            return hours + ' h';
    }
    if (minutes > 0)
        return minutes + ' m';
    if (seconds > 0)
        return seconds + ' s';
    return 'now';
}
export class HiveError {
}
export class HiveWorker {
    api;
    id;
    farm;
    data;
    constructor(api, id, farm) {
        this.api = api;
        this.id = id;
        this.farm = farm;
    }
    async update() {
        this.data = await this.api.get();
    }
    async messages() {
        return this.api.get('messages')
            .then((messages) => messages.data);
    }
    async command(bash) {
        const request = {
            command: 'exec',
            data: {
                cmd: bash
            }
        };
        return this.api.post('command', {
            body: JSON.stringify(request),
            headers: { 'Content-Type': 'application/json' }
        }).then(result => result.errors === undefined);
    }
    get downtime() {
        if (this.data?.stats.stats_time === undefined)
            return 'unkown';
        return formatDowntime(this.data.stats.stats_time * 1000);
    }
    get link() {
        return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`;
    }
    get name() {
        return this.data?.name || '';
    }
}
export class HiveWorkers {
    api;
    farm;
    constructor(api, farm) {
        this.api = api;
        this.farm = farm;
    }
    async all() {
        const response = await this.api.get('');
        const { data } = response;
        let result = [];
        for (const item of data) {
            const worker = new HiveWorker(this.api.prefix(item.id), item.id, this.farm);
            worker.data = item;
            result.push(worker);
        }
        return result;
    }
    async get(id) {
        const worker = new HiveWorker(this.api.prefix(id), id, this.farm);
        await worker.update();
        return worker;
    }
}
export class HiveFarm {
    api;
    id;
    workers;
    data;
    constructor(api, id) {
        this.api = api;
        this.id = id;
        this.workers = new HiveWorkers(this.api.prefix('workers'), this);
    }
    async update() {
        this.data = await this.api.get();
    }
    get link() {
        return `https://the.hiveos.farm/farms/${this.id}/`;
    }
    get name() {
        return this.data?.name || '';
    }
}
export class HiveFarms {
    api;
    constructor(api) {
        this.api = api;
    }
    async all() {
        const response = await this.api.get('');
        const { data } = response;
        let result = [];
        for (const item of data) {
            const farm = new HiveFarm(this.api.prefix(item.id), item.id);
            farm.data = item;
            result.push(farm);
        }
        return result;
    }
    async get(id) {
        const farm = new HiveFarm(this.api.prefix(id), id);
        await farm.update();
        return farm;
    }
}
export class HiveAPI extends API {
    farms;
    authorization;
    proxy;
    constructor(authorization, proxy) {
        const options = {
            method: 'GET',
            headers: {}
        };
        const target = SCHEME + HOST + BASE_PATH;
        super(undefined, proxy !== undefined ? proxy + target : target, options);
        this.authorization = authorization;
        this.proxy = proxy;
        this.farms = new HiveFarms(this.prefix('farms'));
    }
    async authenticate() {
        const twofa_code = authenticator.generate(this.authorization.secret);
        const target = SCHEME + HOST + BASE_PATH + '/auth/login';
        const remote = this.proxy ? (this.proxy + target) : target;
        const body = {
            login: this.authorization.username,
            password: this.authorization.password,
            twofa_code,
            remember: this.authorization.remember || false
        };
        const headers = {
            'Content-Type': 'application/json'
        };
        const token = await fetch(remote, {
            method: 'post',
            body: JSON.stringify(body),
            headers
        }).then((response) => response.json());
        if (this.options === undefined)
            this.options = {};
        if (this.options.headers === undefined)
            this.options.headers = {};
        this.options.headers['Authorization'] = 'Bearer ' + token['access_token'];
    }
    async get(...args) {
        const response = await super.get(...args);
        if (typeof response === 'object' && response.hasOwnProperty('message') === true && response['message'] === 'Unauthorized') {
            await this.authenticate();
            // Repeat attempt
            const response2 = await super.get(...args);
            if (typeof response2 === 'object' && response2.hasOwnProperty('message') === true && response2['message'] === 'Unauthorized') {
                throw new Error('Failed to authenticate');
            }
            // Authentication success
            return response2;
        }
        // All good, just return the response
        return response;
    }
}
export default HiveAPI;
//# sourceMappingURL=index.js.map