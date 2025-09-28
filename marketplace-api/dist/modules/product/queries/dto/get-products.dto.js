"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetProductsDto", {
    enumerable: true,
    get: function() {
        return GetProductsDto;
    }
});
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
let GetProductsDto = class GetProductsDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The page number',
        example: 1,
        required: false
    }),
    _ts_metadata("design:type", Number)
], GetProductsDto.prototype, "page", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The limit of products per page',
        example: 10,
        required: false
    }),
    _ts_metadata("design:type", Number)
], GetProductsDto.prototype, "limit", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The name of the product',
        example: 'Product 1',
        required: false
    }),
    _ts_metadata("design:type", String)
], GetProductsDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The description of the product',
        example: 'Product 1 description',
        required: false
    }),
    _ts_metadata("design:type", String)
], GetProductsDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'The price of the product',
        example: 100,
        required: false
    }),
    _ts_metadata("design:type", Number)
], GetProductsDto.prototype, "price", void 0);

//# sourceMappingURL=get-products.dto.js.map