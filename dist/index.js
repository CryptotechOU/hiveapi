// S.
'use strict';
import API from './API.js';
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
    if (days > 0)
        return days + ' days';
    if (hours > 0)
        return hours + ' hours';
    if (minutes > 0)
        return minutes + ' minutes';
    if (seconds > 0)
        return seconds + ' seconds';
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
    get downtime() {
        if (this.data?.stats.stats_time === undefined)
            return 'unkown';
        return formatDowntime(this.data.stats.stats_time * 1000);
    }
    get link() {
        return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`;
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
            const worker = new HiveWorker(this.api, item.id, this.farm);
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
        this.data = await this.api.get(this.id);
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
        const farm = new HiveFarm(this.api, id);
        await farm.update();
        return farm;
    }
}
export class HiveAPI extends API {
    farms;
    constructor(authorization) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authorization.access_token
            }
        };
        super(undefined, SCHEME + HOST + BASE_PATH, options);
        this.farms = new HiveFarms(this.prefix('farms'));
    }
}
export default HiveAPI;
//# sourceMappingURL=index.js.map