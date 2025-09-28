"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RegisterHandler", {
    enumerable: true,
    get: function() {
        return RegisterHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
const _registercommand = require("../impl/register.command");
const _common = require("@nestjs/common");
const _bcryptjs = require("bcryptjs");
const _jwt = require("@nestjs/jwt");
const _client = require("@prisma/client");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RegisterHandler = class RegisterHandler {
    async execute(command) {
        const { name, email, password, phone, cpf } = command.data;
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            throw new _common.ConflictException('User already exists');
        }
        const hashedPassword = await (0, _bcryptjs.hash)(password, 10);
        const userWithCpf = await this.prismaService.user.findUnique({
            where: {
                cpf
            }
        });
        if (userWithCpf) {
            throw new _common.ConflictException('User with cpf already exists');
        }
        const userCreated = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: _client.Role.USER,
                phone,
                cpf
            }
        });
        await this.prismaService.cart.create({
            data: {
                userId: userCreated.id
            }
        });
        const payload = {
            sub: userCreated.id,
            email: userCreated.email,
            role: userCreated.role
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            user: {
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                phone: userCreated.phone,
                cpf: userCreated.cpf,
                role: userCreated.role
            },
            accessToken
        };
    }
    constructor(prismaService, jwtService){
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
};
RegisterHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_registercommand.RegisterCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], RegisterHandler);

//# sourceMappingURL=register.handler.js.map