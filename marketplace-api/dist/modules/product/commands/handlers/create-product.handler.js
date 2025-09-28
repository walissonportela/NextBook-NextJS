"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreateProductHandler", {
    enumerable: true,
    get: function() {
        return CreateProductHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _createproductcommand = require("../impl/create-product.command");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CreateProductHandler = class CreateProductHandler {
    async execute(command) {
        const { name, description, imageUrl, price } = command.data;
        const product = await this.prismaService.product.create({
            data: {
                name,
                description,
                imageUrl,
                price
            }
        });
        return product;
    }
    constructor(prismaService){
        this.prismaService = prismaService;
    }
};
CreateProductHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_createproductcommand.CreateProductCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService
    ])
], CreateProductHandler);

//# sourceMappingURL=create-product.handler.js.map