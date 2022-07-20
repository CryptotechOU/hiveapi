
// S.

'use strict'

import deepmerge from "ts-deepmerge"
import fetch from 'node-fetch'

export class APIError extends Error {
	constructor(parent?: Error|string) {
		const description = typeof parent === 'string' ?
			parent :
			parent instanceof Error ?
			parent.message :
			'no description'

		super('APIError:' + description)
	}
}

export interface RequestHeaders {
	[key: string]: string
}

export interface RequestInit {
	method?: string | 'GET' | 'POST'
	body?: string
	headers?: RequestHeaders
}

export default class API {
	parent?: API
	path?: string
	options?: RequestInit

	constructor(parent?: API, path?: string, options?: RequestInit) {
		this.parent = parent
		this.path = path
		this.options = options
	}

	serializePath(path?: string): string | undefined {
		if (this.path !== undefined && path !== undefined)
			return this.path + '/' + path

		if (this.path !== undefined)
			return this.path

		return path
	}

	serializeOptions(options?: RequestInit): RequestInit | undefined {
		if (this.options !== undefined && options !== undefined)
			//@ts-ignore
			return deepmerge.default(this.options, options)

		if (this.options !== undefined)
			return this.options

		return options
	}

	prefix(path: string): API
	prefix(path: number): API
	prefix(path: RequestInit): API
	prefix(path: string | number, options: RequestInit): API
	prefix(path?: string | RequestInit | number, options?: RequestInit): API {
		if (typeof path === 'number')
			path = path.toString()

		// If options is passed without path,
		// swap places
		if (path !== undefined && typeof path !== 'string') {
			options = path
			path = undefined
		}

		return new API(this, path, options)
	}

	async get(path: string): Promise<any>
	async get(path?: string | number, options?: RequestInit): Promise<any>
	async get(path?: string | RequestInit | number, options?: RequestInit): Promise<any> {
		if (typeof path === 'number')
			path = path.toString()

		// If options is passed without path,
		// swap places
		if (path !== undefined && typeof path !== 'string') {
			options = path
			path = undefined
		}

		if (path === undefined)
			path = this.path

		else
			path = this.serializePath(path)

		options = this.serializeOptions(options)

		// Pass to parent if defined
		if (this.parent !== undefined)
			return this.parent.get(path, options)

		if (path == undefined)
			throw new APIError('path is undefined')

		// Otherwise execute on its own
		return fetch(path, options)
			.catch((error: Error) => { throw new APIError(error) })
			.then((response: any) => response.json())
	}

	async post(path?: string | number, options?: RequestInit): Promise<any> {
		if (typeof path === 'number')
			path = path.toString()

		if (path === undefined)
			path = this.path

		else
			path = this.serializePath(path)

		options = this.serializeOptions(options)


		if (options === undefined)
			options = {}

		options.method = 'POST'

		// Pass to parent if defined
		if (this.parent !== undefined)
			return this.parent.post(path, options)



		if (options === undefined)
			throw new APIError(`Options is undefined`)

		if (path == undefined)
			throw new APIError('path is undefined')

		// Otherwise execute on its own
		return fetch(path, options)
			.catch((error: Error) => { throw new APIError(error) })
			.then((response: any) => response.json())
	}
}

// EOF