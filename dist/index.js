// S.
'use strict';
import fetch from 'node-fetch';
export const SCHEME = 'https://';
export const HOST = 'api2.hiveos.farm';
export const BASE_PATH = '/api/v2';
export class HiveError {
}
export class HiveFarms {
    api;
    constructor(api) {
        this.api = api;
    }
    async get() {
        return this.api.get('/farms');
    }
}
export class HiveAPI {
    farms;
    constructor() {
        this.farms = new HiveFarms(this);
    }
    async get(endpoint) {
        return fetch(SCHEME + HOST + BASE_PATH + endpoint)
            .then(response => response.json());
    }
}
export default HiveAPI;
//# sourceMappingURL=index.js.map