// Not using it anymore

export const searchAction = searchTerm => {
   return (dispatch, getState) => {
      fetch(`https://educdata-api.herokuapp.com/unidades?nome=${searchTerm}`)
      .then(res => res.json())
      .then(searchResult => dispatch({
         type: 'SEARCH_UNIDADES',
         payload: searchResult.results
      }))
      return Promise.resolve()
   }
}