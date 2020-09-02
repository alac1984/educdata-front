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
   hasSerieHistorica: false,
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
      case actions.allDepsDefined:
         return Object.assign({}, state, {
            showSerieHistorica: false,
            deps: action.payload,
         })
      case actions.activeDepChanged:
         return Object.assign({}, state, {
            showSerieHistorica: false,
            activeDep: action.payload,
         })
      case actions.activeEtChanged:
         return Object.assign({}, state, {
            showSerieHistorica: false,
            activeEt: action.payload,
         })
      case actions.etsForActiveDepDefined:
         return Object.assign({}, state, {
            etsForActiveDep: action.payload,
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