"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AddProductToCartHandler", {
    enumerable: true,
    get: function() {
        return AddProductToCartHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _addproducttocartimpl = require("../impl/add-product-to-cart.impl");
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
let AddProductToCartHandler = class AddProductToCartHandler {
    async execute(command) {
        const { productId, quantity, userId } = command.data;
        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            },
            include: {
                products: {
                    select: {
                        product: true
                    }
                }
            }
        });
        if (!cart) {
            throw new _common.NotFoundException('Cart not found');
        }
        const productInCart = await this.prismaService.productInCart.findFirst({
            where: {
                productId,
                cartId: cart.id
            }
        });
        let updatedProductInCart;
        if (productInCart) {
            updatedProductInCart = await this.prismaService.productInCart.update({
                where: {
                    productId_cartId: {
                        productId,
                        cartId: cart.id
                    }
                },
                data: {
                    quantity: productInCart.quantity + quantity
                },
                include: {
                    product: true
                }
            });
        } else {
            updatedProductInCart = await this.prismaService.productInCart.create({
                data: {
                    productId,
                    cartId: cart.id,
                    quantity
                },
                include: {
                    product: true
                }
            });
        }
        return {
            product: updatedProductInCart.product,
            quantity: updatedProductInCart.quantity
        };
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
AddProductToCartHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_addproducttocartimpl.AddProductToCartImpl),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], AddProductToCartHandler);

//# sourceMappingURL=add-product-to-cart.handler.js.map