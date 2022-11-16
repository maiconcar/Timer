import { Cycle } from "./reducer"

export enum ActionType {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_NEW_CYCLE = 'INTERRUPT_NEW_CYCLE',
    MARK_CURRENT_CYCLE_AS_FINSHED = 'MARK_CURRENT_CYCLE_AS_FINSHED' ,
}

export function addNewCycleAction( NewCycle: Cycle ){
    return {
    type: ActionType.ADD_NEW_CYCLE,
     payload: {
        NewCycle,
     },
    }
}

export function markCurrentCyclesAsFinishAction(){
    return {
        type: ActionType.MARK_CURRENT_CYCLE_AS_FINSHED,
     }  
    }

    export function interruptCurrentCycleAction(){
        return {
            type: ActionType.INTERRUPT_NEW_CYCLE,
         }  
        }

