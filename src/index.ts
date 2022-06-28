
// S.

'use strict'

import fetch from 'node-fetch'

import token from './access_token.json'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

export namespace HiveInterfaces {
	export interface HiveAuthorization {
		access_token: string
		token_type: string
		expires_in: number
	}

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
	authorization: HiveInterfaces.HiveAuthorization

	constructor(authorization: HiveInterfaces.HiveAuthorization) {
		this.farms = new HiveFarms(this)
		this.authorization = authorization
	}

	async get(endpoint: '/farms'): Promise<HiveInterfaces.Farms>
	async get(endpoint: string): Promise<object>
	async get(endpoint: string) {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.authorization.access_token
			}
		}

		return fetch(SCHEME + HOST + BASE_PATH + endpoint, options)
			.then(response => response.json())
	}
}

export default HiveAPI

// EOF
