"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreModule", {
    enumerable: true,
    get: function() {
        return CoreModule;
    }
});
const _common = require("@nestjs/common");
const _prismaservice = require("./infra/database/prisma.service");
const _configservice = require("./infra/config/config.service");
const _multerconfigservice = require("./infra/multer/multer-config.service");
const _fileservice = require("./infra/multer/file.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CoreModule = class CoreModule {
};
CoreModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [],
        controllers: [],
        providers: [
            _prismaservice.PrismaService,
            _configservice.AppConfigService,
            _multerconfigservice.MulterConfigService,
            _fileservice.FileService
        ],
        exports: [
            _prismaservice.PrismaService,
            _configservice.AppConfigService,
            _multerconfigservice.MulterConfigService,
            _fileservice.FileService
        ]
    })
], CoreModule);

//# sourceMappingURL=core.module.js.map