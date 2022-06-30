
// S.

'use strict'


import API from './API.js'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

export class HiveError { }

export class HiveWorker {
	api: API
	id: number
	farm: HiveFarm
	data?: HiveInterfaces.Worker.Data

	constructor(api: API, id: number, farm: HiveFarm) {
		this.api = api
		this.id = id
		this.farm = farm
	}

	async update() {
		this.data = await this.api.get()
	}

	async messages() {
		return this.api.get('messages')
			.then((messages: HiveInterfaces.Messages) => messages.data)
	}

	get link() {
		return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`
	}
}

export class HiveWorkers {
	api: API
	farm: HiveFarm

	constructor(api: API, farm: HiveFarm) {
		this.api = api
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
		const worker = new HiveWorker(this.api.prefix(id), id, this.farm)

		await worker.update()

		return worker
	}
}

export class HiveFarm {
	api: API
	id: number
	workers: HiveWorkers
	data?: HiveInterfaces.Farm.Data

	constructor(api: API, id: number) {
		this.api = api
		this.id = id

		this.workers = new HiveWorkers(this.api.prefix('workers'), this)
	}

	async update() {
		this.data = await this.api.get(this.id)
	}
}

export class HiveFarms {
	api: API

	constructor(api: API) {
		this.api = api
	}

	async all(): Promise<HiveFarm[]> {
		const response = await this.api.get('')
		const { data } = response

		let result = []

		for (const item of data) {
			const farm = new HiveFarm(this.api.prefix(item.id), item.id)

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

export class HiveAPI extends API {
	farms: HiveFarms

	constructor(authorization: HiveInterfaces.HiveAuthorization) {
		const options = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + authorization.access_token
			}
		}

		super(undefined, SCHEME + HOST + BASE_PATH, options)
		
		this.farms = new HiveFarms(this.prefix('farms'))
	}
}

export default HiveAPI

// EOF
