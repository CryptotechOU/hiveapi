import { RequestInit } from 'node-fetch';
export default class API {
    parent?: API;
    path?: string;
    options?: RequestInit;
    constructor(parent?: API, path?: string, options?: RequestInit);
    serializePath(path?: string): string | undefined;
    serializeOptions(options?: RequestInit): RequestInit | undefined;
    prefix(path: string): API;
    prefix(path: number): API;
    prefix(path: RequestInit): API;
    prefix(path: string | number, options: RequestInit): API;
    get(path: string): Promise<any>;
    get(path?: string | number, options?: RequestInit): Promise<any>;
}
