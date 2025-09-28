"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetCartHandler", {
    enumerable: true,
    get: function() {
        return GetCartHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
const _common = require("@nestjs/common");
const _getcartquery = require("../get-cart.query");
const _fileservice = require("../../../../core/infra/multer/file.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetCartHandler = class GetCartHandler {
    async execute(query) {
        const { userId } = query;
        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!cart) {
            throw new _common.NotFoundException('Cart not found');
        }
        let totalPrice = 0;
        const cartItems = cart.products.map((item)=>{
            const itemTotal = item.product.price * item.quantity;
            totalPrice += itemTotal;
            return {
                product: {
                    ...item.product,
                    imageUrl: this.fileService.getFileUrl(item.product.imageUrl)
                },
                quantity: item.quantity,
                itemTotal: itemTotal
            };
        });
        return {
            cartId: cart.id,
            userId: cart.userId,
            items: cartItems,
            totalItems: cartItems.length,
            totalPrice: totalPrice,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt
        };
    }
    constructor(prismaService, fileService){
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
};
GetCartHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(_getcartquery.GetCartQuery),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService
    ])
], GetCartHandler);

//# sourceMappingURL=get-cart.handler.js.map