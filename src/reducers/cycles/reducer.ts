import { ActionType } from "./actions";




export interface Cycle {
    id: string;
    task: string
    minutesAmount: number
    startDate: Date
    interrptedDate?: Date
    finishedDate?:Date
  }

  interface CyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
  }



export function cyclesReducer( state : CyclesState, action : any)  {
    switch(action.type) {
      case  ActionType.ADD_NEW_CYCLE:
      return{
        ...state,
        cycles: [...state.cycles, action.payload.NewCycle],
        activeCycleId: action.payload.NewCycle.id,
      }
      case ActionType.INTERRUPT_NEW_CYCLE:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, interrptedDate: new Date() }
          } else {
            return cycle
          }
        }),
          activeCycleId: null,
        }
      case ActionType.MARK_CURRENT_CYCLE_AS_FINSHED:
        return {
          ...state,
          cycles: state.cycles.map((cycle) => {
            if (cycle.id === state.activeCycleId) {
              return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
          activeCycleId: null,
        }
      default:
        return state
    }
  }