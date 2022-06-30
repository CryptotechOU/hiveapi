
// S.

'use strict'

import deepmerge from "ts-deepmerge"
import fetch, { RequestInit } from 'node-fetch'

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
			throw new Error()

		// Otherwise execute on its own
		return fetch(path, options)
			.catch(error => { throw new Error() })
			.then(response => response.json())
	}
}

// EOF