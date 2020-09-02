import * as actions from '../action/variables'
import { chartDataReceived } from '../action/idebActions'

const idebSerieHistorica = store => next => action => {

   if (action.type !== actions.chartDataRequested) {
      return next(action)
   }

   next(action)

   const data = store.getState().ideb

   console.log('data', data)

   let exportData = []
   
   exportData.push({
      id: '',
      color: 'hsl(353, 70%, 50%)',
      data: []
   })

   if(data.activeEt === 1) {
      exportData[0].id = 'Anos Iniciais'
   } else if(data.activeEt === 2) {
      exportData[0].id = 'Anos Finais'
   } else {
      exportData[0].id = 'Ensino Médio'
   }

   data.idebInfo.map(result => {
      if(
         result.cd_tipo_dependencia === data.activeDep
         && result.cd_etapa_ideb === data.activeEt
      ) {
         exportData[0].data.push({
            x: result.nr_ano_ideb,
            y: result.ideb_avg
         })
      }

   })
   store.dispatch(chartDataReceived(exportData))
}

export default idebSerieHistorica