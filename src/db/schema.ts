import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

//Goals é o nome da tabela
//text e integer são os tipos de dados
//pgTable cria uma tabela
//Tudo o que esta entre string é a forma como vai ficar no banco de dados
//o id: por exemplo é como sera chamado no javascript, camel case.
export const goals = pgTable('goals', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text('title').notNull(), //Not null -> obrigatório
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }) //Guarda a data que a meta foi criada independente de ter fuso horário
    .notNull()
    .defaultNow(), //Seja preenchido automaticamente com a data atual
})

//A partir dos dados acima, automaticamente ele cria um arquivo mysql com esses dados

export const goalCompletions = pgTable('goal_completions', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()), //Quando inserir um registro na tabela, ele vai adicionar um registro automaticamente executando a funcao createdId
  goalId: text('goal_id')
    .references(() => goals.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
