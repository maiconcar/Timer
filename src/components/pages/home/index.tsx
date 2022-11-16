import { HandPalm, Play} from 'phosphor-react';
import {  HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { useForm, FormProvider} from 'react-hook-form'
import { zodResolver} from '@hookform/resolvers/zod'
import * as zod from'zod'
import {  useContext  } from 'react';
import { NewCycleForm } from './componets/NewCycleForm';
import { Countdown } from './componets/Countdown';
import { CycleContext } from '../../../contexts/CyclesContext';



const NewCycleformValidationSchema = zod.object({
  task: zod.string().min(1,'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60),
})

// interface NewCycleformData {
//   task: string
//   minutesAmount: number
// }

type NewCycleformData = zod.infer<typeof NewCycleformValidationSchema>



export function Home() {

const { activeCycle, createNewCycle, interruptCurrentCycle} = useContext(CycleContext)

const newCycleForm = useForm<NewCycleformData>({
  resolver: zodResolver(NewCycleformValidationSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0,
  }
})

 
 const { handleSubmit, watch, reset } = newCycleForm

 function handleCreateNewCycle(data: NewCycleformData) {
  createNewCycle(data)
  reset()
 }
 

 const task = watch('task')
 const isSubmitDisabled = !task

  return (
  <HomeContainer>
    <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
          <Countdown/>
      
      { activeCycle ? (
        <StopCountdownButton onClick={interruptCurrentCycle}  type="button">
         <HandPalm size={24}/>
          Interromper
        </StopCountdownButton>
      ) : (
      <StartCountdownButton disabled={isSubmitDisabled} type="submit">
        <Play size={24}/>
        Começar
      </StartCountdownButton>
      )}
    </form>
  </HomeContainer>
  )
}
