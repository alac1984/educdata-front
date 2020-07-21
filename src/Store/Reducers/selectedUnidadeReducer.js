export default function selectedUnidadeReducer(state = {
   isFetching: false,
   haveList: false,
   unidade: [],
},
   action
) {
   switch (action.type) {
      case 'selectedUnidadeRequested':
         return Object.assign({}, state, {
            isFetching: true
         })
      case 'selectedUnidadeReceived':
         return Object.assign({}, state, {
            isFetching: false,
            haveList: true,
            unidade: action.payload
         })
      default:
         return state
   }
}