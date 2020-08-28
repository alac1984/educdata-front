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


export const idebSerieHistoricaRequested = (dep = -1, et = -1) => {
   return {
      type: actions.idebSerieHistoricaRequested,
      payload: {
         et: et,
         dep: dep,
      }
   }
}

export const depDefined = deps => {
   return {
      type: actions.depDefined,
      payload: deps
   }
}

export const etDefined = ets => {
   return {
      type: actions.etDefined,
      payload: ets
   }
}

export const chartDataRequested = () => {
   return {
      type: actions.chartDataRequested,
   }
}

export const chartDataReceived = data => {
   return {
      type: actions.chartDataReceived,
      payload: data,
   }
}
