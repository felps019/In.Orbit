import dayjs from 'dayjs'

import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

//Funçao para executar as tarefas pendentes da semana
export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  //Validaçao de criaçao de metas para a semana seguinte
  //Comum table expression
  const goalsCreatedUptoWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek)) //lte = menor ou igual ao dia da semana
  )

  //Contar quantas vezes cada meta foi completada
  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek), //gte = maior ou igual ao dia da semana
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
      .groupBy(goalCompletions.goalId) //Agrupa as metas atraves do id
  )

  const pendingGoals = await db
    .with(goalsCreatedUptoWeek, goalCompletionCounts)
    .select({
      id: goalsCreatedUptoWeek.id,
      title: goalsCreatedUptoWeek.title,
      desiredWeeklyFrequency: goalsCreatedUptoWeek.desiredWeeklyFrequency,
      completionCount: sql`
      COALESCE(${goalCompletionCounts.completionCount}, 0) 
      `.mapWith(Number),
    }) //Coalesce permite que seja feito uma contagem de valores
    .from(goalsCreatedUptoWeek)
    .leftJoin(
      goalCompletionCounts,
      eq(goalCompletionCounts.goalId, goalsCreatedUptoWeek.id)
    ) //Left join é usado para juntar as duas tabelas

  return { pendingGoals }
}
