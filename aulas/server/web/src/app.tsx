import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { useEffect, useState } from 'react'
import { EmptyGoals } from './components/empty-goals'
import { useQuery } from '@tanstack/react-query'
import { getSummary } from './http/get-summary'
// import { EmptyGoals } from './components/empty-goals'

export function App() {
  const { data } = useQuery({
    //queryKey é uma forma de identificar essa requisição
    queryKey: ['summary'],
    queryFn: getSummary,
    staleTime: 1000 * 60, //Staletime significa quanto tempo deve ficar armazenado o dado na cache
  })

  return (
    <Dialog>
      {/* Se o total for maior que 0, renderiza o Summary, se for 0, renderiza o EmptyGoals */}
      {/* Se existir o data.total e for maior que 0 renderiza o Summary, se for 0 renderiza o EmptyGoals */}
      {data?.total && data.total > 0 ? <Summary /> : <EmptyGoals />}

      <CreateGoal />
    </Dialog>
  )
}
