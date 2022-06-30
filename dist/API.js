// S.
'use strict';
import deepmerge from "ts-deepmerge";
import fetch from 'node-fetch';
export default class API {
    parent;
    path;
    options;
    constructor(parent, path, options) {
        this.parent = parent;
        this.path = path;
        this.options = options;
    }
    serializePath(path) {
        if (this.path !== undefined && path !== undefined)
            return this.path + '/' + path;
        if (this.path !== undefined)
            return this.path;
        return path;
    }
    serializeOptions(options) {
        if (this.options !== undefined && options !== undefined)
            //@ts-ignore
            return deepmerge.default(this.options, options);
        if (this.options !== undefined)
            return this.options;
        return options;
    }
    prefix(path, options) {
        if (typeof path === 'number')
            path = path.toString();
        // If options is passed without path,
        // swap places
        if (path !== undefined && typeof path !== 'string') {
            options = path;
            path = undefined;
        }
        return new API(this, path, options);
    }
    async get(path, options) {
        if (typeof path === 'number')
            path = path.toString();
        // If options is passed without path,
        // swap places
        if (path !== undefined && typeof path !== 'string') {
            options = path;
            path = undefined;
        }
        if (path === undefined)
            path = this.path;
        else
            path = this.serializePath(path);
        options = this.serializeOptions(options);
        // Pass to parent if defined
        if (this.parent !== undefined)
            return this.parent.get(path, options);
        if (path == undefined)
            throw new Error();
        // Otherwise execute on its own
        return fetch(path, options)
            .catch(error => { throw new Error(); })
            .then(response => response.json());
    }
}
//# sourceMappingURL=API.js.map