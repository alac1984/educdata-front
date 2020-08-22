import * as actions from '../action/variables'
import { idebSerieHistoricaReceived } from '../action/idebActions'

const idebSerieHistorica = store => next => action => {

   if (action.type !== actions.idebSerieHistoricaRequested) {
      return next(action)
   }

   next(action)

   const data = store.getState().ideb.idebInfo.results

   console.log('data', data)

   let exportData = []
   
   exportData.push({
      id: '',
      color: 'hsl(353, 70%, 50%)',
      data: []
   })

   if(action.payload.et === 1) {
      exportData[0].id = 'Anos Iniciais'
   } else if(action.payload.et === 2) {
      exportData[0].id = 'Anos Finais'
   } else {
      exportData[0].id = 'Ensino Médio'
   }

   data.map(result => {
      if(
         result.cd_tipo_dependencia === action.payload.dep
         && result.cd_etapa_ideb === action.payload.et
      ) {
         exportData[0].data.push({
            x: result.nr_ano_ideb,
            y: result.ideb_avg
         })
      }

   })
   store.dispatch(idebSerieHistoricaReceived(exportData))
}

export default idebSerieHistorica