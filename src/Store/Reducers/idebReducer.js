import * as actions from '../action/variables'

export default function idebReducer(state = {
   isFetching: false,
   showIdeb: false,
   idebInfo: [],
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
            idebInfo: action.payload
         })
      default:
         return state
   }
}