import * as actions from '../action/variables'

export default function selectedUnidadeReducer(state = {
   fetchingUnidade: false,
   fetchingEstInfo: false,
   fetchingEscInfo: false,
   fetchingMunInfo: false,
   fetchingPainelInfo: false,
   showPainelInfo: false,
   showEstInfo: false,
   showEscInfo: false,
   showMunInfo: false,
   unidade: [],
   basicInfo: [],
   painelInfo: [],
},
   action
) {
   switch (action.type) {
      case actions.selectedUnidadeRequested:
         return Object.assign({}, state, {
            fetchingUnidade: true
         })
      case actions.selectedUnidadeReceived:
         return Object.assign({}, state, {
            fetchingUnidade: false,
            unidade: action.payload
         })
      case actions.stateInfoRequested:
         return Object.assign({}, state, {
            fetchingEstInfo: true,
            showEstInfo: false,
         })
      case actions.stateInfoReceived:
         return Object.assign({}, state, {
            fetchingEstInfo: false,
            showEstInfo: true,
            basicInfo: action.payload
         })
      case actions.cityInfoRequested:
         return Object.assign({}, state, {
            fetchingMunInfo: true,
            showMunInfo: false,
         })
      case actions.cityInfoReceived:
         return Object.assign({}, state, {
            fetchingMunInfo: false,
            showMunInfo: true,
            basicInfo: action.payload
         })
      case actions.schoolInfoRequested:
         return Object.assign({}, state, {
            showEscInfo: false,
            fetchingMunInfo: true,
         })
      case actions.schoolInfoReceived:
         return Object.assign({}, state, {
            showEscInfo: true,
            fetchingMunInfo: false,
            basicInfo: action.payload
         })
      case actions.painelInfoRequested:
         return Object.assign({}, state, {
            fetchingPainelInfo: true,
            showPainelInfo: false
         })
      case actions.painelInfoReceived:
         return Object.assign({}, state, {
            fetchingPainelInfo: false,
            showPainelInfo: true,
            painelInfo: action.payload
         })
      
      default:
         return state
   }
}