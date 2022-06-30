// S.
'use strict';
import fetch from 'node-fetch';
export const SCHEME = 'https://';
export const HOST = 'api2.hiveos.farm';
export const BASE_PATH = '/api/v2';
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
        return this.api.get(this.id)
            .then(data => this.data = data);
    }
    get link() {
        return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`;
    }
}
export class HiveWorkersAPI {
    api;
    farm;
    constructor(api, farm) {
        this.api = api;
        this.farm = farm;
    }
    async get(endpoint = '') {
        return this.api.get(this.farm.id + '/workers/' + endpoint);
    }
}
export class HiveWorkers {
    api;
    farm;
    constructor(api, farm) {
        this.api = new HiveWorkersAPI(api, farm);
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
        const worker = new HiveWorker(this.api, id, this.farm);
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
        this.workers = new HiveWorkers(this.api, this);
    }
    async update() {
        return this.api.get(this.id)
            .then(data => this.data = data);
    }
}
export class HiveFarmsAPI {
    api;
    constructor(api) {
        this.api = api;
    }
    async get(endpoint = '') {
        return this.api.get('farms/' + endpoint);
    }
}
export class HiveFarms {
    api;
    constructor(api) {
        this.api = new HiveFarmsAPI(api);
    }
    async all() {
        const response = await this.api.get('');
        const { data } = response;
        let result = [];
        for (const item of data) {
            const farm = new HiveFarm(this.api, item.id);
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
export class HiveAPI {
    farms;
    authorization;
    constructor(authorization) {
        this.farms = new HiveFarms(this);
        this.authorization = authorization;
    }
    async get(endpoint = '') {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.authorization.access_token
            }
        };
        return fetch(SCHEME + HOST + BASE_PATH + '/' + endpoint, options)
            .catch(error => { throw new HiveError(); })
            .then(response => response.json());
    }
}
export default HiveAPI;
//# sourceMappingURL=index.js.map