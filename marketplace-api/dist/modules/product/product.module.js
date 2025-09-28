"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductModule", {
    enumerable: true,
    get: function() {
        return ProductModule;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _getproductshandler = require("./queries/handlers/get-products.handler");
const _getproductbyidhandler = require("./queries/handlers/get-product-by-id.handler");
const _createproducthandler = require("./commands/handlers/create-product.handler");
const _updateproducthandler = require("./commands/handlers/update-product.handler");
const _deleteproducthandler = require("./commands/handlers/delete-product.handler");
const _productcontroller = require("./product.controller");
const _platformexpress = require("@nestjs/platform-express");
const _multerconfigservice = require("../../core/infra/multer/multer-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ProductModule = class ProductModule {
};
ProductModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _cqrs.CqrsModule,
            _platformexpress.MulterModule.registerAsync({
                useClass: _multerconfigservice.MulterConfigService
            })
        ],
        controllers: [
            _productcontroller.ProductController
        ],
        providers: [
            _getproductshandler.GetProductsHandler,
            _getproductbyidhandler.GetProductByIdHandler,
            _createproducthandler.CreateProductHandler,
            _updateproducthandler.UpdateProductHandler,
            _deleteproducthandler.DeleteProductHandler
        ]
    })
], ProductModule);

//# sourceMappingURL=product.module.js.map