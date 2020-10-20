import * as actions from '../action/variables'

export default function selectedUnidadeReducer(state = {
   basicInfo: {},
   showLatLongInfo: false,
   showPainelInfo: false,
   latLongInfo: [],
   painelInfo: [],
},
   action
) {
   switch (action.type) {
      case actions.unidadeChosed:
         return Object.assign({}, state, {
            basicInfo: action.payload
         })
      case actions.latLongInfoRequested:
         return Object.assign({}, state, {
            showLatLongInfo: false
         })
      case actions.latLongInfoReceived:
         return Object.assign({}, state, {
            showLatLongInfo: true,
            latLongInfo: action.payload
         })
      case actions.painelInfoRequested:
         return Object.assign({}, state, {
            showPainelInfo: false
         })
      case actions.painelInfoReceived:
         return Object.assign({}, state, {
            showPainelInfo: true,
            painelInfo: action.payload
         })
      case actions.selectedUnidadeReceived:
         return Object.assign({}, state, {
            basicInfo: action.payload
         })
      
      default:
         return state
   }
}