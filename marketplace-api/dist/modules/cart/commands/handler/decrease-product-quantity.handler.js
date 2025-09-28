"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DecreaseProductQuantityHandler", {
    enumerable: true,
    get: function() {
        return DecreaseProductQuantityHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _decreaseproductquantityimpl = require("../impl/decrease-product-quantity.impl");
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
let DecreaseProductQuantityHandler = class DecreaseProductQuantityHandler {
    async execute(command) {
        const { productId, quantity, userId } = command.data;
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
        const newQuantity = productInCart.quantity - quantity;
        if (newQuantity <= 0) {
            // Se a quantidade ficar zero ou negativa, remove o produto do carrinho
            await this.prismaService.productInCart.delete({
                where: {
                    productId_cartId: {
                        productId,
                        cartId: cart.id
                    }
                }
            });
            return {
                message: 'Product removed from cart (quantity reached zero)',
                product: productInCart.product,
                quantity: 0
            };
        }
        // Atualiza a quantidade
        const updatedProductInCart = await this.prismaService.productInCart.update({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            },
            data: {
                quantity: newQuantity
            },
            include: {
                product: true
            }
        });
        return {
            message: 'Product quantity decreased successfully',
            product: updatedProductInCart.product,
            quantity: updatedProductInCart.quantity
        };
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
DecreaseProductQuantityHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_decreaseproductquantityimpl.DecreaseProductQuantityImpl),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], DecreaseProductQuantityHandler);

//# sourceMappingURL=decrease-product-quantity.handler.js.map