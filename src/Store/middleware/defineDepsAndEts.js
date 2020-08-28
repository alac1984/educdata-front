import * as actions from '../action/variables'
import { depDefined, etDefined, chartDataRequested } from '../action/idebActions'

const defineDepsAndEts = store => next => action => {

   if (action.type !== actions.idebSerieHistoricaRequested) {
      return next(action)
   }

   next(action)

   const data = store.getState().ideb.idebInfo

   let deps = []
   let ets = []
   
   if (action.payload.dep === -1 || action.payload.et === -1) {
      data.map(value => {
         if (!deps.includes(value.cd_tipo_dependencia)) {
            deps.push(value.cd_tipo_dependencia)
         }
         deps.sort((a,b) => a-b)
      })

      store.dispatch(depDefined(deps))

      data.map(value => {
         if (!ets.includes(value.cd_etapa_ideb) && value.cd_tipo_dependencia === deps[0]) {
            ets.push(value.cd_etapa_ideb)
         }
         deps.sort((a,b) => a-b)
      })

      store.dispatch(etDefined(ets))
      store.dispatch(chartDataRequested(deps[0], ets[0]))

   } else {
      store.dispatch(chartDataRequested(action.payload.dep, action.payload.et))
   }



}

export default defineDepsAndEts