"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CartController", {
    enumerable: true,
    get: function() {
        return CartController;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _addproducttocartdto = require("./commands/dto/add-product-to-cart.dto");
const _removeproductfromcartdto = require("./commands/dto/remove-product-from-cart.dto");
const _decreaseproductquantitydto = require("./commands/dto/decrease-product-quantity.dto");
const _addproducttocartimpl = require("./commands/impl/add-product-to-cart.impl");
const _removeproductfromcartimpl = require("./commands/impl/remove-product-from-cart.impl");
const _decreaseproductquantityimpl = require("./commands/impl/decrease-product-quantity.impl");
const _getcartquery = require("./queries/get-cart.query");
const _express = require("express");
const _swagger = require("@nestjs/swagger");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let CartController = class CartController {
    async getCart(req) {
        return this.queryBus.execute(new _getcartquery.GetCartQuery(req.user.sub));
    }
    async addProductToCart(addProductToCartDto, req) {
        return this.commandBus.execute(new _addproducttocartimpl.AddProductToCartImpl({
            ...addProductToCartDto,
            userId: req.user.sub
        }));
    }
    async removeProductFromCart(removeProductFromCartDto, req) {
        return this.commandBus.execute(new _removeproductfromcartimpl.RemoveProductFromCartImpl({
            ...removeProductFromCartDto,
            userId: req.user.sub
        }));
    }
    async decreaseProductQuantity(decreaseProductQuantityDto, req) {
        return this.commandBus.execute(new _decreaseproductquantityimpl.DecreaseProductQuantityImpl({
            ...decreaseProductQuantityDto,
            userId: req.user.sub
        }));
    }
    constructor(commandBus, queryBus){
        this.commandBus = commandBus;
        this.queryBus = queryBus;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get user cart with all products and total price'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Cart retrieved successfully'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Cart not found'
    }),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], CartController.prototype, "getCart", null);
_ts_decorate([
    (0, _common.Post)("add-product"),
    (0, _swagger.ApiOperation)({
        summary: 'Add a product to the cart'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        description: 'Product added to cart successfully'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _addproducttocartdto.AddProductToCartDto === "undefined" ? Object : _addproducttocartdto.AddProductToCartDto,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], CartController.prototype, "addProductToCart", null);
_ts_decorate([
    (0, _common.Delete)("remove-product"),
    (0, _swagger.ApiOperation)({
        summary: 'Remove a product from the cart'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Product removed from cart successfully'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Product not found in cart'
    }),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _removeproductfromcartdto.RemoveProductFromCartDto === "undefined" ? Object : _removeproductfromcartdto.RemoveProductFromCartDto,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], CartController.prototype, "removeProductFromCart", null);
_ts_decorate([
    (0, _common.Patch)("decrease-quantity"),
    (0, _swagger.ApiOperation)({
        summary: 'Decrease product quantity in the cart'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        description: 'Product quantity decreased successfully'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Product not found in cart'
    }),
    (0, _swagger.ApiBearerAuth)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _decreaseproductquantitydto.DecreaseProductQuantityDto === "undefined" ? Object : _decreaseproductquantitydto.DecreaseProductQuantityDto,
        typeof _express.Request === "undefined" ? Object : _express.Request
    ]),
    _ts_metadata("design:returntype", Promise)
], CartController.prototype, "decreaseProductQuantity", null);
CartController = _ts_decorate([
    (0, _common.Controller)("cart"),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus,
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus
    ])
], CartController);

//# sourceMappingURL=cart.controller.js.map