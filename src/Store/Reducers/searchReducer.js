import * as actions from '../action/variables'

export default function searchReducer(state = {
   isFetching: false,
   showResults: false,
   isTyping: false,
   searchTerm: '',
   unidades: [],
},
   action
) {
   switch (action.type) {
      case actions.unidadesRequested:
         return Object.assign({}, state, {
            isFetching: true,
            showResults: false,
         })
      case actions.unidadesReceived:
         return Object.assign({}, state, {
            isFetching: false,
            showResults: true,
            unidades: action.payload
         })
      case actions.userTyped:
         return Object.assign({}, state, {
            isTyping: true,
            searchTerm: action.payload
         })
      case actions.userErasedAll:
         return Object.assign({}, state, {
            isTyping: false,
            showResults: false,
            isFetching: false,
         })
      case actions.escKeyHitted:
         return Object.assign({}, state, {
            showResults: false
         })
      default:
         return state
   }
}