const initState = {
   unidade: "",
   unidade
}

const searchReducer = (state = initState, action) => {
   if (action.type === 'SEARCH_UNIDADES') {
      return {
         ...state,
         unidades: action.payload
      }
   }
   return state;
}
export default searchReducer;