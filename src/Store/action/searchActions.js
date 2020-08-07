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

// Used for get latitude and longitude of states 
export const stateInfoRequested = id => {
   return {
      type: actions.stateInfoRequested,
      payload: {
         url: `/estinfo/${id}`,
         method: 'get',
         onSuccess: actions.stateInfoReceived,
         onError: actions.stateInfoRequestFailed,
      }
   }
}

// Used for get latitude and longitude of cities
export const cityInfoRequested = id => {
   return {
      type: actions.cityInfoRequested,
      payload: {
         url: `/muninfo/${id}`,
         method: 'get',
         onSuccess: actions.cityInfoReceived,
         onError: actions.cityInfoRequestFailed,
      }
   }
}

// Used for get basic info from schools
export const schoolInfoRequested = id => {
   return {
      type: actions.schoolInfoRequested,
      payload: {
         url: `/escinfo/${id}`,
         method: 'get',
         onSuccess: actions.schoolInfoReceived,
         onError: actions.schoolInfoRequestFailed,
      }
   }
}

export const painelInfoRequested = id => {
   return {
      type: actions.painelInfoRequested,
      payload: {
         url: `/painelind?unidade=${id}`,
         method: 'get',
         onSuccess: actions.painelInfoReceived,
         onError: actions.painelInfoRequestFailed,
      }
   }
}