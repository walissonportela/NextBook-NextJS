"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppConfigService", {
    enumerable: true,
    get: function() {
        return AppConfigService;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AppConfigService = class AppConfigService {
    get nodeEnv() {
        return this.config.get('NODE_ENV', {
            infer: true
        });
    }
    get port() {
        return this.config.get('PORT', {
            infer: true
        });
    }
    get databaseUrl() {
        return this.config.get('DATABASE_URL', {
            infer: true
        });
    }
    get jwtSecret() {
        return this.config.get('JWT_SECRET', {
            infer: true
        });
    }
    get baseUrl() {
        return this.config.get('BASE_URL', {
            infer: true
        });
    }
    constructor(config){
        this.config = config;
    }
};
AppConfigService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService
    ])
], AppConfigService);

//# sourceMappingURL=config.service.js.map