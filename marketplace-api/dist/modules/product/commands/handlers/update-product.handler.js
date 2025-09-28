"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpdateProductHandler", {
    enumerable: true,
    get: function() {
        return UpdateProductHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _updateproductcommand = require("../impl/update-product.command");
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
let UpdateProductHandler = class UpdateProductHandler {
    async execute(command) {
        const { id, ...updateData } = command.data;
        const filteredData = Object.fromEntries(Object.entries(updateData).filter(([_, value])=>value !== undefined));
        const product = await this.prismaService.product.update({
            where: {
                id
            },
            data: {
                ...filteredData,
                imageUrl: updateData.imageUrl ? updateData.imageUrl : undefined
            }
        });
        if (!product) {
            throw new _common.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
UpdateProductHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_updateproductcommand.UpdateProductCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], UpdateProductHandler);

//# sourceMappingURL=update-product.handler.js.map