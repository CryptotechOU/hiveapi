export declare const SCHEME = "https://";
export declare const HOST = "api2.hiveos.farm";
export declare const BASE_PATH = "/api/v2";
export declare namespace HiveInterfaces {
    interface HiveAuthorization {
        access_token: string;
        token_type: string;
        expires_in: number;
    }
    interface Farms {
    }
}
export declare class HiveError {
}
export declare class HiveFarms {
    api: HiveAPI;
    constructor(api: HiveAPI);
    get(): Promise<HiveInterfaces.Farms>;
}
export declare class HiveAPI {
    farms: HiveFarms;
    authorization: HiveInterfaces.HiveAuthorization;
    constructor(authorization: HiveInterfaces.HiveAuthorization);
    get(endpoint: '/farms'): Promise<HiveInterfaces.Farms>;
    get(endpoint: string): Promise<object>;
}
export default HiveAPI;
