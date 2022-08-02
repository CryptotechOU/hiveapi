import API from './API.js';
export declare const SCHEME = "https://";
export declare const HOST = "api2.hiveos.farm";
export declare const BASE_PATH = "/api/v2";
export declare class HiveError {
}
export declare class HiveWorker {
    api: API;
    id: number;
    farm: HiveFarm;
    data?: HiveInterfaces.Worker.Data;
    constructor(api: API, id: number, farm: HiveFarm);
    update(): Promise<void>;
    messages(): Promise<Data[]>;
    command(bash: string): Promise<boolean>;
    get downtime(): string;
    get link(): string;
    get name(): string;
}
export declare class HiveWorkers {
    api: API;
    farm: HiveFarm;
    constructor(api: API, farm: HiveFarm);
    all(): Promise<HiveWorker[]>;
    get(id: number): Promise<HiveWorker>;
}
export declare class HiveFarm {
    api: API;
    id: number;
    workers: HiveWorkers;
    data?: HiveInterfaces.Farm.Data;
    constructor(api: API, id: number);
    update(): Promise<void>;
    get link(): string;
    get name(): string;
}
export declare class HiveFarms {
    api: API;
    constructor(api: API);
    all(): Promise<HiveFarm[]>;
    get(id: number): Promise<HiveFarm>;
}
export declare class HiveAPI extends API {
    farms: HiveFarms;
    authorization: HiveInterfaces.HiveAuthorization;
    proxy?: string;
    constructor(authorization: HiveInterfaces.HiveAuthorization, proxy?: string);
    authenticate(): Promise<void>;
    get(...args: any[]): Promise<any>;
}
export default HiveAPI;
