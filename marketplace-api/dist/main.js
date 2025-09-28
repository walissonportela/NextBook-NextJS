// src/main.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
const _config = require("@nestjs/config");
const _path = require("path");
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    const logger = new _common.Logger(_appmodule.AppModule.name);
    const configService = app.get(_config.ConfigService);
    const port = configService.get('PORT');
    app.setGlobalPrefix('api/v1');
    app.enableCors();
    app.useGlobalPipes(new _common.ValidationPipe());
    app.useStaticAssets((0, _path.join)(__dirname, '..', 'uploads'));
    const config = new _swagger.DocumentBuilder().setTitle("Marketplace API").setDescription("API for the Marketplace").setVersion("1.0.0").addBearerAuth().build();
    const document = _swagger.SwaggerModule.createDocument(app, config);
    _swagger.SwaggerModule.setup('api/v1/docs', app, document);
    await app.listen(port || 4000);
    logger.log(`Server is running on port ${port || 4000} 🚀`);
}
bootstrap();

//# sourceMappingURL=main.js.map