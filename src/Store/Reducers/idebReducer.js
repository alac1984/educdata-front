import * as actions from '../action/variables'

export default function idebReducer(state = {
   isFetching: false,
   showIdeb: false,
   showSerieHistorica: false,
   idebInfo: [],
   deps: [],
   activeDep: 0,
   activeEt: 0,
   etsForActiveDep: [],
   serieHistorica: [],
},
   action
) {
   switch (action.type) {
      case actions.idebInfoRequested:
         return Object.assign({}, state, {
            isFetching: true,
            showIdeb: false,
         })
      case actions.idebInfoReceived:
         return Object.assign({}, state, {
            isFetching: false,
            showIdeb: true,
            idebInfo: action.payload.results
         })
      case actions.idebSerieHistoricaRequested:
         return Object.assign({}, state, {
            isFetching: true,
            showSerieHistorica: false,
         })
      case actions.depDefined:
         return Object.assign({}, state, {
            showSerieHistorica: false,
            deps: action.payload,
            activeDep: action.payload[0],
         })
      case actions.etDefined:
         return Object.assign({}, state, {
            showSerieHistorica: false,
            etsForActiveDep: action.payload,
            activeEt: action.payload[0],
         })
      case actions.chartDataReceived:
         return Object.assign({}, state, {
            serieHistorica: action.payload,
            showSerieHistorica: true,
         })

      default:
         return state
   }
}