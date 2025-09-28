"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RemoveProductFromCartHandler", {
    enumerable: true,
    get: function() {
        return RemoveProductFromCartHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _removeproductfromcartimpl = require("../impl/remove-product-from-cart.impl");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
const _common = require("@nestjs/common");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RemoveProductFromCartHandler = class RemoveProductFromCartHandler {
    async execute(command) {
        const { productId, userId } = command.data;
        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            }
        });
        if (!cart) {
            throw new _common.NotFoundException('Cart not found');
        }
        const productInCart = await this.prismaService.productInCart.findFirst({
            where: {
                productId,
                cartId: cart.id
            },
            include: {
                product: true
            }
        });
        if (!productInCart) {
            throw new _common.NotFoundException('Product not found in cart');
        }
        await this.prismaService.productInCart.delete({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            }
        });
        return {
            message: 'Product removed from cart successfully',
            product: productInCart.product
        };
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
RemoveProductFromCartHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_removeproductfromcartimpl.RemoveProductFromCartImpl),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], RemoveProductFromCartHandler);

//# sourceMappingURL=remove-product-from-cart.handler.js.map