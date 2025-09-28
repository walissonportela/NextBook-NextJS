"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _common = require("@nestjs/common");
const _logindto = require("./commands/dto/login.dto");
const _publicdecorator = require("./decorators/public.decorator");
const _cqrs = require("@nestjs/cqrs");
const _swagger = require("@nestjs/swagger");
const _logincommand = require("./commands/impl/login.command");
const _registerdto = require("./commands/dto/register.dto");
const _registercommand = require("./commands/impl/register.command");
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
let AuthController = class AuthController {
    async login(loginDto) {
        return this.commandBus.execute(new _logincommand.LoginCommand(loginDto));
    }
    async register(registerDto) {
        return this.commandBus.execute(new _registercommand.RegisterCommand(registerDto));
    }
    constructor(commandBus){
        this.commandBus = commandBus;
    }
};
_ts_decorate([
    (0, _swagger.ApiOperation)({
        summary: 'Login a user'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        example: {
            user: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'admin'
            },
            accessToken: 'token jwt'
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 401,
        example: {
            message: 'Invalid credentials',
            statusCode: 401
        }
    }),
    (0, _common.Post)('login'),
    (0, _publicdecorator.Public)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logindto.LoginDto === "undefined" ? Object : _logindto.LoginDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
_ts_decorate([
    (0, _swagger.ApiOperation)({
        summary: 'Register a user'
    }),
    (0, _swagger.ApiResponse)({
        status: 201,
        example: {
            user: {
                id: '1',
                name: 'John Doe',
                email: 'john.doe@example.com',
                role: 'admin',
                phone: '1234567890',
                cpf: '1234567890'
            },
            accessToken: 'token jwt'
        }
    }),
    (0, _swagger.ApiResponse)({
        status: 409,
        example: {
            message: 'User already exists',
            statusCode: 409
        }
    }),
    (0, _common.Post)('register'),
    (0, _publicdecorator.Public)(),
    _ts_param(0, (0, _common.Body)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _registerdto.RegisterDto === "undefined" ? Object : _registerdto.RegisterDto
    ]),
    _ts_metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = _ts_decorate([
    (0, _common.Controller)('auth'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cqrs.CommandBus === "undefined" ? Object : _cqrs.CommandBus
    ])
], AuthController);

//# sourceMappingURL=auth.controller.js.map