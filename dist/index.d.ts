export declare const SCHEME = "https://";
export declare const HOST = "api2.hiveos.farm";
export declare const BASE_PATH = "/api/v2";
export declare class HiveError {
}
export declare class HiveWorker {
    api: HiveWorkersAPI;
    id: number;
    farm: HiveFarm;
    data?: HiveInterfaces.Worker.Data;
    constructor(api: HiveWorkersAPI, id: number, farm: HiveFarm);
    update(): Promise<import("./HiveInterfaces").Worker.Data>;
    get link(): string;
}
export declare class HiveWorkersAPI {
    api: HiveFarmsAPI;
    farm: HiveFarm;
    constructor(api: HiveFarmsAPI, farm: HiveFarm);
    get(id: number): Promise<HiveInterfaces.Worker.Data>;
    get(endpoint: string): Promise<object>;
}
export declare class HiveWorkers {
    api: HiveWorkersAPI;
    farm: HiveFarm;
    constructor(api: HiveFarmsAPI, farm: HiveFarm);
    get(id: number): Promise<HiveWorker>;
}
export declare class HiveFarm {
    api: HiveFarmsAPI;
    id: number;
    workers: HiveWorkers;
    data?: HiveInterfaces.Farm.Data;
    constructor(api: HiveFarmsAPI, id: number);
    update(): Promise<import("./HiveInterfaces").Farm.Data>;
}
export declare class HiveFarmsAPI {
    api: HiveAPI;
    constructor(api: HiveAPI);
    get(endpoint: number): Promise<HiveInterfaces.Farm.Data>;
    get(endpoint: ''): Promise<HiveInterfaces.FarmResponse>;
    get(endpoint: string): Promise<object>;
}
export declare class HiveFarms {
    api: HiveFarmsAPI;
    constructor(api: HiveAPI);
    all(): Promise<HiveFarm[]>;
    get(id: number): Promise<HiveFarm>;
}
export declare class HiveAPI {
    farms: HiveFarms;
    authorization: HiveInterfaces.HiveAuthorization;
    constructor(authorization: HiveInterfaces.HiveAuthorization);
    get(endpoint: string): Promise<object>;
}
export default HiveAPI;
