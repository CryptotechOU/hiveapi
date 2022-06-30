
// S.

'use strict'

import fetch, { RequestInit } from 'node-fetch'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

export class HiveError { }

export class HiveWorker {
	api: HiveWorkersAPI
	id: number
	farm: HiveFarm
	data?: HiveInterfaces.Worker.Data

	constructor(api: HiveWorkersAPI, id: number, farm: HiveFarm) {
		this.api = api
		this.id = id
		this.farm = farm
	}

	async update() {
		return this.api.get(this.id)
			.then(data => this.data = data)
	}

	get link() {
		return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`
	}
}

export class HiveWorkersAPI {
	api: HiveFarmsAPI
	farm: HiveFarm

	constructor(api: HiveFarmsAPI, farm: HiveFarm) {
		this.api = api
		this.farm = farm
	}

	async get(id: number): Promise<HiveInterfaces.Worker.Data>
	async get(all: ''): Promise<HiveInterfaces.WorkersResponse>
	async get(endpoint: string): Promise<object>
	async get(endpoint: string | number = ''): Promise<object> {
		return this.api.get(this.farm.id + '/workers/' + endpoint)
	}
}

export class HiveWorkers {
	api: HiveWorkersAPI
	farm: HiveFarm

	constructor(api: HiveFarmsAPI, farm: HiveFarm) {
		this.api = new HiveWorkersAPI(api, farm)
		this.farm = farm
	}

	async all(): Promise<HiveWorker[]> {
		const response = await this.api.get('')
		const { data } = response

		let result = []

		for (const item of data) {
			const worker = new HiveWorker(this.api, item.id, this.farm)

			worker.data = item

			result.push(worker)
		}

		return result
	}

	async get(id: number): Promise<HiveWorker> {
		const worker = new HiveWorker(this.api, id, this.farm)

		await worker.update()

		return worker
	}
}

export class HiveFarm {
	api: HiveFarmsAPI
	id: number
	workers: HiveWorkers
	data?: HiveInterfaces.Farm.Data

	constructor(api: HiveFarmsAPI, id: number) {
		this.api = api
		this.id = id

		this.workers = new HiveWorkers(this.api, this)
	}

	async update() {
		return this.api.get(this.id)
			.then(data => this.data = data)
	}
}

export class HiveFarmsAPI {
	api: HiveAPI

	constructor(api: HiveAPI) {
		this.api = api
	}

	async get(endpoint: number): Promise<HiveInterfaces.Farm.Data>
	async get(endpoint: ''): Promise<HiveInterfaces.FarmsResponse>
	async get(endpoint: string): Promise<object>
	async get(endpoint: string | number = ''): Promise<object> {
		return this.api.get('farms/' + endpoint)
	}
}

export class HiveFarms {
	api: HiveFarmsAPI

	constructor(api: HiveAPI) {
		this.api = new HiveFarmsAPI(api)
	}

	async all(): Promise<HiveFarm[]> {
		const response = await this.api.get('')
		const { data } = response

		let result = []

		for (const item of data) {
			const farm = new HiveFarm(this.api, item.id)

			farm.data = item

			result.push(farm)
		}

		return result
	}

	async get(id: number): Promise<HiveFarm> {
		const farm = new HiveFarm(this.api, id)

		await farm.update()

		return farm
	}
}

export class HiveAPI {
	farms: HiveFarms
	authorization: HiveInterfaces.HiveAuthorization

	constructor(authorization: HiveInterfaces.HiveAuthorization) {
		this.farms = new HiveFarms(this)
		this.authorization = authorization
	}

	async get(endpoint: string): Promise<object>
	async get(endpoint: string = ''): Promise<object> {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + this.authorization.access_token
			}
		}

		return fetch(SCHEME + HOST + BASE_PATH + '/' + endpoint, options)
			.catch(error => { throw new HiveError() })
			.then(response => response.json() as object)
	}
}

export default HiveAPI

// EOF
