import * as actions from '../action/variables'
import { 
   allDepsDefined, 
   etsForActiveDepDefined, 
   chartDataRequested,
   activeDepChanged,
   activeEtChanged,
} from '../action/idebActions'

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


      data.map(value => {
         if (!ets.includes(value.cd_etapa_ideb) && value.cd_tipo_dependencia === deps[0]) {
            ets.push(value.cd_etapa_ideb)
         }
         deps.sort((a,b) => a-b)
      })
      store.dispatch(activeDepChanged(deps[0]))
      store.dispatch(activeEtChanged(ets[0]))
      store.dispatch(allDepsDefined(deps))
      store.dispatch(etsForActiveDepDefined(ets))
      store.dispatch(chartDataRequested(deps[0], ets[0]))

   } else {
      store.dispatch(activeDepChanged(action.payload.dep))
      store.dispatch(activeEtChanged(action.payload.et))

      ets = []
      data.map(value => {
         if (!ets.includes(value.cd_etapa_ideb) && value.cd_tipo_dependencia === action.payload.dep) {
            ets.push(value.cd_etapa_ideb)
         }
         deps.sort((a,b) => a-b)
      })
      store.dispatch(etsForActiveDepDefined(ets))
      store.dispatch(chartDataRequested(action.payload.dep, action.payload.et))
   }

}

export default defineDepsAndEts