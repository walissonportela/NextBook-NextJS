"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CartModule", {
    enumerable: true,
    get: function() {
        return CartModule;
    }
});
const _common = require("@nestjs/common");
const _cartcontroller = require("./cart.controller");
const _addproducttocarthandler = require("./commands/handler/add-product-to-cart.handler");
const _removeproductfromcarthandler = require("./commands/handler/remove-product-from-cart.handler");
const _decreaseproductquantityhandler = require("./commands/handler/decrease-product-quantity.handler");
const _getcarthandler = require("./queries/handlers/get-cart.handler");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CartModule = class CartModule {
};
CartModule = _ts_decorate([
    (0, _common.Module)({
        imports: [],
        controllers: [
            _cartcontroller.CartController
        ],
        providers: [
            _addproducttocarthandler.AddProductToCartHandler,
            _removeproductfromcarthandler.RemoveProductFromCartHandler,
            _decreaseproductquantityhandler.DecreaseProductQuantityHandler,
            _getcarthandler.GetCartHandler
        ]
    })
], CartModule);

//# sourceMappingURL=cart.module.js.map