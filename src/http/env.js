'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.env = void 0;
var zod_1 = require('zod');
var envSchema = zod_1.default.object({
  DATABASE_URL: zod_1.default.string().url(),
});
exports.env = envSchema.parse(process.env);
//Onde vem as variaveis de ambiente que foram declaradas dentro do .env
//Parse verifica se o process.env segue o formato acima
