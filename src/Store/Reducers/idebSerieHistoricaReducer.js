import * as actions from '../action/variables'

export default function idebReducer(state = {
   isFetching: false,
   showIdebSerieHistorica: false,
   forChart: [],
},
   action
) {
   switch (action.type) {
      case actions.idebSerieHistoricaRequested:
         return Object.assign({}, state, {
            isFetching: true,
            showIdebSerieHistorica: false,
         })
      case actions.idebSerieHistoricaReceived:
         return Object.assign({}, state, {
            showIdebSerieHistorica: true,
            forChart: action.payload,
         })
      default:
         return state
   }
}