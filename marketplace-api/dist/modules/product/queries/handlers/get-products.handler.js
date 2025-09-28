"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetProductsHandler", {
    enumerable: true,
    get: function() {
        return GetProductsHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _getproductsquery = require("../impl/get-products.query");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
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
let GetProductsHandler = class GetProductsHandler {
    async execute(query) {
        const { page, limit, description, name, price } = query.data;
        const whereClause = {};
        let pageNumber = page ?? 1;
        let limitNumber = limit ?? 50;
        if (name) {
            whereClause.name = {
                contains: name,
                mode: 'insensitive'
            };
        }
        if (description) {
            whereClause.description = {
                contains: description,
                mode: 'insensitive'
            };
        }
        if (price) {
            whereClause.price = price;
        }
        const total = await this.prismaService.product.count({
            where: whereClause
        });
        const products = await this.prismaService.product.findMany({
            where: whereClause,
            skip: (pageNumber - 1) * limitNumber,
            take: Number(limitNumber),
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            page: Number(pageNumber),
            limit: Number(limitNumber),
            total,
            products: products.map((product)=>({
                    ...product,
                    imageUrl: this.fileService.getFileUrl(product.imageUrl)
                }))
        };
    }
    constructor(prismaService, fileService){
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
};
GetProductsHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(_getproductsquery.GetProductsQuery),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService
    ])
], GetProductsHandler);

//# sourceMappingURL=get-products.handler.js.map