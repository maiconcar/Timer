import { differenceInSeconds } from "date-fns"
import { createContext, ReactNode, useEffect, useReducer, useState } from "react"
import { addNewCycleAction, 
         interruptCurrentCycleAction,
         markCurrentCyclesAsFinishAction } from "../reducers/cycles/actions"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer"


interface CreateCycleData {
  task: string
  minutesAmount: number

}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleasFinshed: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCurrentCycle: () => void
  }

export const CycleContext = createContext({} as CycleContextType)

interface CycleContextProviderProps {
    children: ReactNode
}


export function CyclesContextProvider( 
  {children} : CycleContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(cyclesReducer
      , {
      cycles: [],
      activeCycleId: null,
    }, () => {
      const storedStateAsJSON = localStorage.getItem('@timer:cycles-state-1.0.0')

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }
    })

    const  { cycles, activeCycleId} = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {

      if (activeCycle) {
      return differenceInSeconds( new Date(), new Date(activeCycle.startDate),)
      }
      return 0
    })

    // salvando ciclos no storoge web
    useEffect(() => {
      const stateJSON = JSON.stringify(cyclesState)
      localStorage.setItem('@timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])

    function markCurrentCycleasFinshed() {
      dispatch(markCurrentCyclesAsFinishAction())
      }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
       }

    function createNewCycle(data: CreateCycleData) {
        const NewCycle: Cycle = {
          id: String(new Date().getTime()),
          task: data.task,
          minutesAmount: data.minutesAmount,
          startDate: new Date()
        }
    
        dispatch(addNewCycleAction(NewCycle))
      
        setAmountSecondsPassed(0)
    
     }
    
     function interruptCurrentCycle() {
      dispatch(interruptCurrentCycleAction())
      
     }
    


    return (
        <CycleContext.Provider 
        value={{
          cycles,
          activeCycle,
          activeCycleId, 
          markCurrentCycleasFinshed,
          amountSecondsPassed,
          setSecondsPassed,
          createNewCycle,
          interruptCurrentCycle
          }}
      > 
        {children}
      </CycleContext.Provider>
    )
}