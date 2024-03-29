export declare class APIError extends Error {
    constructor(parent?: Error | string);
}
export interface RequestHeaders {
    [key: string]: string;
}
export interface RequestInit {
    method?: string | 'GET' | 'POST';
    body?: string;
    headers?: RequestHeaders;
}
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
    post(path?: string | number, options?: RequestInit): Promise<any>;
}
