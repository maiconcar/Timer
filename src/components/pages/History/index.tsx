import { useContext } from "react";
import { CycleContext } from "../../../contexts/CyclesContext";
import { HistoryContainer, HistoryList, Status } from "./styels";
import ptBR from "date-fns/esm/locale/pt-BR";
import { formatDistanceToNow } from 'date-fns'


export function History() {

const {cycles} = useContext(CycleContext)
  
  return (
    <HistoryContainer>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => {
              return (
                <tr key={cycle.id}>
              <td>{cycle.task}</td>
              <td>{cycle.minutesAmount} minutos</td>
              <td>{formatDistanceToNow(new Date(cycle.startDate), {
                  addSuffix: true,
                  locale: ptBR
              })}
              </td>
              <td>
                {cycle.finishedDate && (
                  <Status StatusColor="green"> Concluído</Status>
                )}

                {cycle.interrptedDate && (
                  <Status StatusColor="red"> Interrompido</Status>
                )}

                {!cycle.finishedDate && !cycle.interrptedDate && (
                  <Status StatusColor="yellow"> Em andamento</Status>
                )}

              </td>
            </tr>
              )
              })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
