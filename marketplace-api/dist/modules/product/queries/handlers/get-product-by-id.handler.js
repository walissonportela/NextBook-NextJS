"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetProductByIdHandler", {
    enumerable: true,
    get: function() {
        return GetProductByIdHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _getproductbyidquery = require("../impl/get-product-by-id.query");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
const _common = require("@nestjs/common");
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
let GetProductByIdHandler = class GetProductByIdHandler {
    async execute(query) {
        const { id } = query.data;
        const product = await this.prismaService.product.findUnique({
            where: {
                id
            }
        });
        if (!product) {
            throw new _common.NotFoundException(`Product with ID ${id} not found`);
        }
        return {
            ...product,
            imageUrl: this.fileService.getFileUrl(product.imageUrl)
        };
    }
    constructor(prismaService, fileService){
        this.prismaService = prismaService;
        this.fileService = fileService;
    }
};
GetProductByIdHandler = _ts_decorate([
    (0, _cqrs.QueryHandler)(_getproductbyidquery.GetProductByIdQuery),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _fileservice.FileService === "undefined" ? Object : _fileservice.FileService
    ])
], GetProductByIdHandler);

//# sourceMappingURL=get-product-by-id.handler.js.map