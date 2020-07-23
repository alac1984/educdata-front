// Request Unidades (base search)
export const unidadesRequested = searchTerm => {
   return {
      type: 'unidadesRequested',
      payload: {
         url: `/unidades?busca=${searchTerm}`,
         method: 'get',
         onSuccess: 'unidadesReceived',
         onError: 'unidadesRequestFailed'
      }
   }
}

// Request the selected unidade (in Listing Details)
export const selectedUnidadeRequested = id => {
   return {
      type: 'selectedUnidadeRequested',
      payload: {
         url: `/unidades/${id}`,
         method: 'get',
         onSuccess: 'selectedUnidadeReceived',
         onError: 'selectedUnidadeRequestFailed'
      }
   }
}
