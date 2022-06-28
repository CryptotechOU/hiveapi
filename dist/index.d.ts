export declare const SCHEME = "https://";
export declare const HOST = "api2.hiveos.farm";
export declare const BASE_PATH = "/api/v2";
export declare class HiveError {
}
export declare class HiveFarm {
    data?: HiveInterfaces.Farm.Data;
}
export declare class HiveFarms {
    api: HiveAPI;
    farms: HiveFarm[];
    constructor(api: HiveAPI);
    refresh(datas: HiveInterfaces.Farm.Data[]): void;
    get(id: number): HiveFarm | undefined;
    init(data: HiveInterfaces.Farm.Data): HiveFarm;
    update(): Promise<void>;
}
export declare class HiveAPI {
    farms: HiveFarms;
    authorization: HiveInterfaces.HiveAuthorization;
    constructor(authorization: HiveInterfaces.HiveAuthorization);
    get(endpoint: '/farms'): Promise<HiveInterfaces.FarmResponse>;
    get(endpoint: string): Promise<object>;
}
export default HiveAPI;
