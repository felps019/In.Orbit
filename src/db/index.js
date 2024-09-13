"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.client = void 0;
var postgres_js_1 = require("drizzle-orm/postgres-js");
var postgres_1 = require("postgres");
var schema = require("./schema"); //Joga todas as exportacoes do file schema para o index.ts
var env_1 = require("../http/env");
exports.client = (0, postgres_1.default)(env_1.env.DATABASE_URL);
exports.db = (0, postgres_js_1.drizzle)(exports.client, { schema: schema, logger: true }); //Possibilita ver todos os logs do banco de dados no terminal
