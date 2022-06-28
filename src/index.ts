
// S.

'use strict'

import fetch from 'node-fetch'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

export class HiveError { }

export class HiveFarm {
	data?: HiveInterfaces.Farm.Data
}

export class HiveFarms {
	api: HiveAPI
	farms: HiveFarm[]

	constructor(api: HiveAPI) {
		this.api = api
		this.farms = []
	}

	refresh(datas: HiveInterfaces.Farm.Data[]) {
		for (const data of datas) {
			this.init(data)
		}
	}

	get(id: number): HiveFarm | undefined {
		return this.farms.find(farm => farm.data?.id === id)
	}

	init(data: HiveInterfaces.Farm.Data): HiveFarm {
		const existing = this.get(data.id)

		if (existing !== undefined)
			return existing

		const farm = new HiveFarm()

		farm.data = data

		this.farms.push(farm)

		return farm
	}

	async update() {
		return this.api.get('/farms')
			.then(response => this.refresh(response.data))
	}
}

export class HiveAPI {
	farms: HiveFarms
	authorization: HiveInterfaces.HiveAuthorization

	constructor(authorization: HiveInterfaces.HiveAuthorization) {
		this.farms = new HiveFarms(this)
		this.authorization = authorization
	}

	async get(endpoint: '/farms'): Promise<HiveInterfaces.FarmResponse>
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
