"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _coremodule = require("./core/core.module");
const _env = require("./core/infra/config/env");
const _core = require("@nestjs/core");
const _rolesguard = require("./core/guards/roles.guard");
const _authguard = require("./modules/auth/guards/auth.guard");
const _authmodule = require("./modules/auth/auth.module");
const _cqrs = require("@nestjs/cqrs");
const _productmodule = require("./modules/product/product.module");
const _cartmodule = require("./modules/cart/cart.module");
const _appcontroller = require("./app.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        controllers: [
            _appcontroller.AppController
        ],
        providers: [
            {
                provide: _core.APP_GUARD,
                useClass: _authguard.AuthGuard
            },
            {
                provide: _core.APP_GUARD,
                useClass: _rolesguard.RolesGuard
            }
        ],
        imports: [
            _authmodule.AuthModule,
            _coremodule.CoreModule,
            _productmodule.ProductModule,
            _cartmodule.CartModule,
            _cqrs.CqrsModule.forRoot(),
            _config.ConfigModule.forRoot({
                isGlobal: true,
                validate: _env.validateEnv
            })
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map