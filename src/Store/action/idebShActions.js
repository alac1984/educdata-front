import * as actions from './variables' 


export const parentMunChartDataRequested = id => {
   return {
      type: actions.parentMunChartDataRequested,
      payload: {
         url: `/idebsh?id_un=${id}`,
         method: 'get',
         onSuccess: actions.parentMunChartDataReceived,
         onError: actions.parentMunChartDataRequestFailed,
      }
   }
}

export const parentEstChartDataRequested = id => {
   return {
      type: actions.parentEstChartDataRequested,
      payload: {
         url: `/idebsh?id_un=${id}`,
         method: 'get',
         onSuccess: actions.parentEstChartDataReceived,
         onError: actions.parentEstChartDataRequestFailed,
      }
   }
}

export const parentRegChartDataRequested = id => {
   return {
      type: actions.parentRegChartDataRequested,
      payload: {
         url: `/idebsh?id_un=${id}`,
         method: 'get',
         onSuccess: actions.parentRegChartDataReceived,
         onError: actions.parentRegChartDataRequestFailed,
      }
   }
}

export const paisChartDataRequested = id => {
   return {
      type: actions.paisChartDataRequested,
      payload: {
         url: `/idebsh?id_un=${id}`,
         method: 'get',
         onSuccess: actions.paisChartDataReceived,
         onError: actions.paisChartDataRequestFailed,
      }
   }
}

export const requestAndProcessBtns = id => {
   return dispatch => {
      dispatch({ type: actions.btnsRequested })
      fetch(`https://educdata-api.herokuapp.com/idebshbtns?id_un=${id}`)
         .then(response => response.json())
         .then(data => dispatch({ type: actions.btnsReceived, payload: data }))
         .then(() => dispatch({ type: actions.btnsProcessed, payload: {id: id} }))
   }
}

export const btnsRequested = id => {
   return {
      type: actions.btnsRequested,
      payload: {
         url: `/idebshbtns?id_un=${id}`,
         method: 'get',
         onSuccess: actions.btnsReceived,
         onError: actions.btnsRequestFailed,
      }
   }
}

export const chartDataRequestReceiveAndProcess = (id, et, dep) => {
   return dispatch => {
      dispatch({type: actions.chartDataRequested})
      fetch(`https://educdata-api.herokuapp.com/idebsh?id_un=${id}&et=${et}&dep=${dep}`)
      .then(response => response.json())
      .then(data => {
         dispatch({type: actions.chartDataReceived})
         dispatch({type: actions.chartDataProcessed, payload: { id: id, data: data.results[0]}})
      })
   }
}

export const chartDataProjRequestReceiveAndProcess = (id, et, dep) => {
   return dispatch => {
      dispatch({type: actions.chartDataProjRequested})
      fetch(`https://educdata-api.herokuapp.com/idebshproj?id_un=${id}&et=${et}&dep=${dep}`)
      .then(response => response.json())
      .then(data => {
         dispatch({type: actions.chartDataProjReceived})
         dispatch({type: actions.chartDataProjProcessed, payload: {id: id, data: data.results[0]}})
      })
   }
}

export const parentDataRequestReceiveAndProcess = (id, et, dep) => {
   return dispatch => {
      dispatch({type: actions.parentDataRequested})
      fetch(`https://educdata-api.herokuapp.com/idebsh?id_un=${id}&et=${et}&dep=${dep}`)
      .then(response => response.json())
      .then(data => {
         dispatch({type: actions.parentDataReceived})
         dispatch({type: actions.parentDataProcessed, payload: { id: id, data: data.results[0]}})
      })
   }
}

export const chartDataProjRequested = (id, et, dep) => {
   return {
      type: actions.chartDataProjRequested,
      payload: {
         url: `/idebshproj?id_un=${id}&et=${et}&dep=${dep}`,
         method: 'get',
         onSuccess: actions.chartDataProjReceived,
         onError: actions.chartDataProjRequestFailed,
      }
   }
}

export const activeEtAndDepChanged = (et, dep, changeOnEt) => {
   return {
      type: actions.activeEtAndDepChanged,
      payload: {
         et,
         dep,
         changeOnEt,
      }
   }
}

// export const idebSerieHistoricaRequested = (dep = -1, et = -1) => {
//    return {
//       type: actions.idebSerieHistoricaRequested,
//       payload: {
//          dep: dep,
//          et: et,
//       }
//    }
// }

// export const allDepsDefined = deps => {
//    return {
//       type: actions.allDepsDefined,
//       payload: deps
//    }
// }

// export const etsForActiveDepDefined = ets => {
//    return {
//       type: actions.etsForActiveDepDefined,
//       payload: ets
//    }
// }


// export const chartDataRequested = () => {
//    return {
//       type: actions.chartDataRequested,
//    }
// }

// export const chartDataReceived = data => {
//    return {
//       type: actions.chartDataReceived,
//       payload: data,
//    }
// }
