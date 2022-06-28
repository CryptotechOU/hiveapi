// S.
'use strict';
import fetch from 'node-fetch';
export const SCHEME = 'https://';
export const HOST = 'api2.hiveos.farm';
export const BASE_PATH = '/api/v2';
export class HiveError {
}
export class HiveFarm {
    data;
}
export class HiveFarms {
    api;
    farms;
    constructor(api) {
        this.api = api;
        this.farms = [];
    }
    refresh(datas) {
        for (const data of datas) {
            this.init(data);
        }
    }
    get(id) {
        return this.farms.find(farm => farm.data?.id === id);
    }
    init(data) {
        const existing = this.get(data.id);
        if (existing !== undefined)
            return existing;
        const farm = new HiveFarm();
        farm.data = data;
        this.farms.push(farm);
        return farm;
    }
    async update() {
        return this.api.get('/farms')
            .then(response => this.refresh(response.data));
    }
}
export class HiveAPI {
    farms;
    authorization;
    constructor(authorization) {
        this.farms = new HiveFarms(this);
        this.authorization = authorization;
    }
    async get(endpoint) {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.authorization.access_token
            }
        };
        return fetch(SCHEME + HOST + BASE_PATH + endpoint, options)
            .then(response => response.json());
    }
}
export default HiveAPI;
//# sourceMappingURL=index.js.map