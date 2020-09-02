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
         dep: dep,
         et: et,
      }
   }
}

export const allDepsDefined = deps => {
   return {
      type: actions.allDepsDefined,
      payload: deps
   }
}

export const etsForActiveDepDefined = ets => {
   return {
      type: actions.etsForActiveDepDefined,
      payload: ets
   }
}

export const activeDepChanged = dep => {
   return {
      type: actions.activeDepChanged,
      payload: dep
   }
}

export const activeEtChanged = et => {
   return {
      type: actions.activeEtChanged,
      payload: et
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
