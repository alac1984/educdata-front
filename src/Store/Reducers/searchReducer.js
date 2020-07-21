export default function searchReducer(state = {
   isFetching: false,
   haveList: false,
   unidades: [],
},
   action
) {
   switch (action.type) {
      case 'unidadesRequested':
         return Object.assign({}, state, {
            isFetching: true
         })
      case 'unidadesReceived':
         return Object.assign({}, state, {
            isFetching: false,
            haveList: true,
            unidades: action.payload
         })
      default:
         return state
   }
}