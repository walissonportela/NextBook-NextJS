"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ProductController", {
    enumerable: true,
    get: function() {
        return ProductController;
    }
});
const _common = require("@nestjs/common");
const _cqrs = require("@nestjs/cqrs");
const _getproductsdto = require("./queries/dto/get-products.dto");
const _getproductsquery = require("./queries/impl/get-products.query");
const _getproductbyidquery = require("./queries/impl/get-product-by-id.query");
const _createproductcommand = require("./commands/impl/create-product.command");
const _updateproductcommand = require("./commands/impl/update-product.command");
const _deleteproductcommand = require("./commands/impl/delete-product.command");
const _createproductdto = require("./commands/dto/create-product.dto");
const _updateproductdto = require("./commands/dto/update-product.dto");
const _swagger = require("@nestjs/swagger");
const _publicdecorator = require("../auth/decorators/public.decorator");
const _rolesdecorator = require("../../core/decorators/roles.decorator");
const _platformexpress = require("@nestjs/platform-express");
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
let ProductController = class ProductController {
    async getProducts(query) {
        return this.queryBus.execute(new _getproductsquery.GetProductsQuery({
            ...query,
            price: query.price ? Number(query.price) : undefined
        }));
    }
    async getProductById(id) {
        return this.queryBus.execute(new _getproductbyidquery.GetProductByIdQuery({
            id
        }));
    }
    async createProduct(image, createProductDto) {
        return this.commandBus.execute(new _createproductcommand.CreateProductCommand({
            ...createProductDto,
            price: Number(createProductDto.price),
            imageUrl: image.filename
        }));
    }
    async updateProduct(id, updateProductDto, image) {
        return this.commandBus.execute(new _updateproductcommand.UpdateProductCommand({
            id,
            price: updateProductDto.price ? Number(updateProductDto.price) : undefined,
            imageUrl: image ? image.filename : undefined,
            description: updateProductDto.description ? updateProductDto.description : undefined,
            name: updateProductDto.name ? updateProductDto.name : undefined
        }));
    }
    async deleteProduct(id) {
        return this.commandBus.execute(new _deleteproductcommand.DeleteProductCommand({
            id
        }));
    }
    constructor(queryBus, commandBus){
        this.queryBus = queryBus;
        this.commandBus = commandBus;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _swagger.ApiOperation)({
        summary: 'Get products with pagination and filters'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        example: {
            page: 1,
            limit: 10,
            total: 100,
            products: []
        }
    }),
    (0, _publicdecorator.Public)(),
    _ts_param(0, (0, _common.Query)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _getproductsdto.GetProductsDto === "undefined" ? Object : _getproductsdto.GetProductsDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
_ts_decorate([
    (0, _common.Get)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Get product by ID'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        example: {
            id: '1',
            name: 'iPhone 15',
            description: 'Latest iPhone with advanced features',
            imageUrl: `${process.env.BASE_URL}/image.jpg`,
            price: 999.99
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Product not found'
    }),
    (0, _publicdecorator.Public)(),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "getProductById", null);
_ts_decorate([
    (0, _common.Post)(),
    (0, _swagger.ApiOperation)({
        summary: 'Create a new product (Admin only)'
    }),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('image')),
    (0, _swagger.ApiConsumes)('multipart/form-data'),
    (0, _swagger.ApiResponse)({
        status: 201,
        example: {
            id: '1',
            name: 'iPhone 15',
            description: 'Latest iPhone with advanced features',
            imageUrl: `${process.env.BASE_URL}/image.jpg`,
            price: 999.99
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        example: {
            message: 'Unauthorized',
            statusCode: 401
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        example: {
            message: 'Forbidden - Admin role required',
            statusCode: 403
        }
    }),
    (0, _swagger.ApiBearerAuth)(),
    (0, _rolesdecorator.Roles)([
        'ADMIN'
    ]),
    _ts_param(0, (0, _common.UploadedFile)()),
    _ts_param(1, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File,
        typeof _createproductdto.CreateProductDto === "undefined" ? Object : _createproductdto.CreateProductDto
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
_ts_decorate([
    (0, _common.Put)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Update a product (Admin only)'
    }),
    (0, _common.UseInterceptors)((0, _platformexpress.FileInterceptor)('image')),
    (0, _swagger.ApiConsumes)('multipart/form-data'),
    (0, _swagger.ApiResponse)({
        status: 200,
        example: {
            id: '1',
            name: 'iPhone 15',
            description: 'Latest iPhone with advanced features',
            imageUrl: `${process.env.BASE_URL}/image.jpg`,
            price: 999.99
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Product not found'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Forbidden - Admin role required'
    }),
    (0, _swagger.ApiBearerAuth)(),
    (0, _rolesdecorator.Roles)([
        'ADMIN'
    ]),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_param(1, (0, _common.Body)()),
    _ts_param(2, (0, _common.UploadedFile)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof _updateproductdto.UpdateProductDtoWithoutId === "undefined" ? Object : _updateproductdto.UpdateProductDtoWithoutId,
        typeof Express === "undefined" || typeof Express.Multer === "undefined" || typeof Express.Multer.File === "undefined" ? Object : Express.Multer.File
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
_ts_decorate([
    (0, _common.Delete)(':id'),
    (0, _swagger.ApiOperation)({
        summary: 'Delete a product (Admin only)'
    }),
    (0, _swagger.ApiResponse)({
        status: 200,
        example: {
            message: 'Product deleted successfully',
            product: {
                id: '1',
                name: 'iPhone 15',
                description: 'Latest iPhone with advanced features',
                imageUrl: `${process.env.BASE_URL}/image.jpg`,
                price: 999.99
            }
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 404,
        description: 'Product not found'
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        description: 'Unauthorized'
    }),
    (0, _swagger.ApiResponse)({
        status: 403,
        description: 'Forbidden - Admin role required'
    }),
    (0, _swagger.ApiBearerAuth)(),
    (0, _rolesdecorator.Roles)([
        'ADMIN'
    ]),
    _ts_param(0, (0, _common.Param)('id')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = _ts_decorate([
    (0, _swagger.ApiTags)('Products'),
    (0, _common.Controller)('products'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cqrs.QueryBus === "undefined" ? Object : _cqrs.QueryBus,
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus
    ])
], ProductController);

//# sourceMappingURL=product.controller.js.map