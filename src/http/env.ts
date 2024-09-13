import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)
//Onde vem as variaveis de ambiente que foram declaradas dentro do .env
//Parse verifica se o process.env segue o formato acima
