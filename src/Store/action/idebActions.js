import * as actions from '../action/variables'

export const idebInfoRequested = id => {
   return {
      type: actions.idebInfoRequested,
      payload: {
         url: `/ideb?id_un=${id}`,
         method: 'get',
         onSuccess: actions.idebInfoReceived,
         onError: actions.idebInfoRequestFailed,
      }
   }
}

export const etsAndDepsRequested = idebInfo => {
   return {
      type: actions.etsAndDepsRequested,
      payload: idebInfo
   }
}

export const etsAndDepsCalculated = values => {
   return {
      type: actions.etsAndDepsCalculated,
      payload: values
   }
}


export const idebSerieHistoricaRequested = (dep, et) => {
   return {
      type: actions.idebSerieHistoricaRequested,
      payload: {
         et: et,
         dep: dep,
      }
   }
}

export const idebSerieHistoricaReceived = data => {
   return {
      type: actions.idebSerieHistoricaReceived,
      payload: data
   }
}