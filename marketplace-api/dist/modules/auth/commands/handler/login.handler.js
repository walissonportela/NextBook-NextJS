"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoginHandler", {
    enumerable: true,
    get: function() {
        return LoginHandler;
    }
});
const _cqrs = require("@nestjs/cqrs");
const _logincommand = require("../impl/login.command");
const _prismaservice = require("../../../../core/infra/database/prisma.service");
const _common = require("@nestjs/common");
const _bcryptjs = require("bcryptjs");
const _jwt = require("@nestjs/jwt");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let LoginHandler = class LoginHandler {
    async execute(command) {
        const { email, password } = command.data;
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await (0, _bcryptjs.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new _common.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };
        const accessToken = await this.jwtService.signAsync(payload);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                cpf: user.cpf
            },
            accessToken
        };
    }
    constructor(prismaService, jwtService){
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
};
LoginHandler = _ts_decorate([
    (0, _cqrs.CommandHandler)(_logincommand.LoginCommand),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _prismaservice.PrismaService === "undefined" ? Object : _prismaservice.PrismaService,
        typeof _jwt.JwtService === "undefined" ? Object : _jwt.JwtService
    ])
], LoginHandler);

//# sourceMappingURL=login.handler.js.map