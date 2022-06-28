
// S.

'use strict'

import fetch from 'node-fetch'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

export namespace HiveResponse {
	export interface Farms {}
}

export class HiveError { }

export class HiveFarms {
	api: HiveAPI

	constructor(api: HiveAPI) {
		this.api = api
	}

	async get() {
		return this.api.get('/farms')
	}
}

export class HiveAPI {
	farms: HiveFarms

	constructor() {
		this.farms = new HiveFarms(this)
	}

	async get(endpoint: '/farms'): Promise<HiveResponse.Farms>
	async get(endpoint: string): Promise<object>
	async get(endpoint: string) {
		return fetch(SCHEME + HOST + BASE_PATH + endpoint)
			.then(response => response.json())
	}
}

export default HiveAPI

// EOF
