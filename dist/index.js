// S.
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiveAPI = exports.HiveFarms = exports.HiveError = exports.BASE_PATH = exports.HOST = exports.SCHEME = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
exports.SCHEME = 'https://';
exports.HOST = 'api2.hiveos.farm';
exports.BASE_PATH = '/api/v2';
class HiveError {
}
exports.HiveError = HiveError;
class HiveFarms {
    constructor(api) {
        this.api = api;
    }
    async get() {
        return this.api.get('/farms');
    }
}
exports.HiveFarms = HiveFarms;
class HiveAPI {
    constructor() {
        this.farms = new HiveFarms(this);
    }
    async get(endpoint) {
        return (0, node_fetch_1.default)(exports.SCHEME + exports.HOST + exports.BASE_PATH + endpoint)
            .then(response => response.json());
    }
}
exports.HiveAPI = HiveAPI;
exports.default = HiveAPI;
//# sourceMappingURL=index.js.map