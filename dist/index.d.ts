export declare const SCHEME = "https://";
export declare const HOST = "api2.hiveos.farm";
export declare const BASE_PATH = "/api/v2";
export declare namespace HiveResponse {
    interface Farms {
    }
}
export declare class HiveError {
}
export declare class HiveFarms {
    api: HiveAPI;
    constructor(api: HiveAPI);
    get(): Promise<HiveResponse.Farms>;
}
export declare class HiveAPI {
    farms: HiveFarms;
    constructor();
    get(endpoint: '/farms'): Promise<HiveResponse.Farms>;
    get(endpoint: string): Promise<object>;
}
export default HiveAPI;
