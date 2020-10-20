import * as actions from './variables'

// Request Unidades (base search)
export const unidadesRequested = (searchTerm, cancelToken) => {
   return {
      type: actions.unidadesRequested,
      payload: {
         url: `/unidades?busca=${searchTerm}`,
         method: 'get',
         onSuccess: actions.unidadesReceived,
         onError: actions.unidadesRequestFailed,
         cancelToken,
      }
   }
}

export const unidadeChosed = unidade => {
   return {
      type: actions.unidadeChosed,
      payload: unidade
   }
}


// Request the selected unidade (in Listing Details)
export const selectedUnidadeRequested = id => {
   return {
      type: actions.selectedUnidadeRequested,
      payload: {
         url: `/unidades/${id}`,
         method: 'get',
         onSuccess: actions.selectedUnidadeReceived,
         onError: actions.selectedUnidadeRequestFailed
      }
   }
}

// When user is typing
export const userTyped = (term) => {
   return {
      type: actions.userTyped,
      payload: term
   }
}

// When user erased all characters on the input
export const userErasedAll = () => {
   return {
      type: actions.userErasedAll
   }
}

// When user hits ESC key in search input
export const escKeyHitted = () => {
   return {
      type: actions.escKeyHitted
   }
}
