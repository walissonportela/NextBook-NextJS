"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get UpdateProductDto () {
        return UpdateProductDto;
    },
    get UpdateProductDtoWithoutId () {
        return UpdateProductDtoWithoutId;
    }
});
const _classvalidator = require("class-validator");
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
let UpdateProductDto = class UpdateProductDto {
};
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Product ID',
        example: 'uuid-string'
    }),
    (0, _classvalidator.IsUUID)(),
    _ts_metadata("design:type", String)
], UpdateProductDto.prototype, "id", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Product name',
        example: 'iPhone 15 Pro',
        required: false
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateProductDto.prototype, "name", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Product description',
        example: 'Latest iPhone Pro with advanced features',
        required: false
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Product image',
        type: 'string',
        format: 'binary',
        required: false
    }),
    _ts_metadata("design:type", Object)
], UpdateProductDto.prototype, "image", void 0);
_ts_decorate([
    (0, _swagger.ApiProperty)({
        description: 'Product price',
        example: 1199.99,
        required: false
    }),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Number)
], UpdateProductDto.prototype, "price", void 0);
let UpdateProductDtoWithoutId = class UpdateProductDtoWithoutId extends (0, _swagger.OmitType)(UpdateProductDto, [
    'id'
]) {
};

//# sourceMappingURL=update-product.dto.js.map