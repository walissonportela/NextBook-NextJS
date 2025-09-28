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
    get envSchema () {
        return envSchema;
    },
    get validateEnv () {
        return validateEnv;
    }
});
const _zod = require("zod");
const envSchema = _zod.z.object({
    NODE_ENV: _zod.z.enum([
        'development',
        'production'
    ]).default('development'),
    PORT: _zod.z.coerce.number().default(3333),
    DATABASE_URL: _zod.z.string(),
    JWT_SECRET: _zod.z.string().min(1),
    BASE_URL: _zod.z.string().min(1)
});
function validateEnv(config) {
    const parsed = envSchema.safeParse(config);
    if (!parsed.success) {
        throw new Error(`Invalid environment variables: ${parsed.error.message}`);
    }
    return parsed.data;
}

//# sourceMappingURL=env.js.map