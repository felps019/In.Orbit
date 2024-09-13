"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.goalCompletions = exports.goals = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var cuid2_1 = require("@paralleldrive/cuid2");
//Goals é o nome da tabela
//text e integer são os tipos de dados
//pgTable cria uma tabela
//Tudo o que esta entre string é a forma como vai ficar no banco de dados
//o id: por exemplo é como sera chamado no javascript, camel case.
exports.goals = (0, pg_core_1.pgTable)('goals', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(function () { return (0, cuid2_1.createId)(); }),
    title: (0, pg_core_1.text)('title').notNull(), //Not null -> obrigatório
    desiredWeeklyFrequency: (0, pg_core_1.integer)('desired_weekly_frequency').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }) //Guarda a data que a meta foi criada independente de ter fuso horário
        .notNull()
        .defaultNow(), //Seja preenchido automaticamente com a data atual
});
//A partir dos dados acima, automaticamente ele cria um arquivo mysql com esses dados
exports.goalCompletions = (0, pg_core_1.pgTable)('goal_completions', {
    id: (0, pg_core_1.text)('id')
        .primaryKey()
        .$defaultFn(function () { return (0, cuid2_1.createId)(); }), //Quando inserir um registro na tabela, ele vai adicionar um registro automaticamente executando a funcao createdId
    goalId: (0, pg_core_1.text)('goal_id')
        .references(function () { return exports.goals.id; })
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true })
        .notNull()
        .defaultNow(),
});
