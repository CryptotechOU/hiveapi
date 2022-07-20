
// S.

'use strict'


import API, { RequestInit } from './API.js'

export const SCHEME = 'https://'
export const HOST = 'api2.hiveos.farm'
export const BASE_PATH = '/api/v2'

function formatDowntime(ms: number) {
	ms = Date.now() - ms

	let seconds = Math.floor(ms / 1000)
	let minutes = Math.floor(seconds / 60)
	seconds = seconds % 60

	let hours = Math.floor(minutes / 60)
	minutes = minutes % 60

	let days = Math.floor(hours / 24)
	hours = hours % 24

	if (hours > 0) {
		if (days > 0)
			return days + ' d ' + hours + ' h'

		else return hours + ' h'
	}

	if (minutes > 0)
		return minutes + ' m'

	if (seconds > 0)
		return seconds + ' s'

	return 'now'
}


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

	async command(bash: string) {
		const request = {
			command: 'exec',
			data: {
				cmd: bash
			}
		}

		return this.api.post('command', {
			body: JSON.stringify(request),
			headers: { 'Content-Type': 'application/json' }
		}).then(result => result.errors === undefined)
	}

	get downtime(): string {
		if (this.data?.stats.stats_time === undefined)
			return 'unkown'

		return formatDowntime(this.data.stats.stats_time * 1000)
	}

	get link(): string {
		return `https://the.hiveos.farm/farms/${this.farm.id}/workers/${this.id}/`
	}

	get name(): string {
		return this.data?.name || ''
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
			const worker = new HiveWorker(this.api.prefix(item.id), item.id, this.farm)

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

	get link(): string {
		return `https://the.hiveos.farm/farms/${this.id}/`
	}

	get name(): string {
		return this.data?.name || ''
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

	constructor(authorization: HiveInterfaces.HiveAuthorization, proxy?: string) {
		const options: RequestInit = {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + authorization.access_token
			}
		}

		const target = SCHEME + HOST + BASE_PATH

		if (proxy !== undefined) {
			if (options.headers === undefined)
				options.headers = {}

			options.headers['Target-URL'] = target

			super(undefined, proxy, options)
		} else {
			super(undefined, target, options)
		}

		this.farms = new HiveFarms(this.prefix('farms'))
	}
}

export default HiveAPI

// EOF
