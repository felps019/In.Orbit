import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema' //Joga todas as exportacoes do file schema para o index.ts
import { env } from '../http/env'

export const client = postgres(env.DATABASE_URL)
export const db = drizzle(client, { schema, logger: true }) //Possibilita ver todos os logs do banco de dados no terminal
