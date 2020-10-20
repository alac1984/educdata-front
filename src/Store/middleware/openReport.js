import * as actions from '../action/variables'
import {
   selectedUnidadeRequested,
} from '../action/searchActions'
import {
   parentMunChartDataRequested,
   parentEstChartDataRequested,
   parentRegChartDataRequested,
   paisChartDataRequested,
   btnsRequested,
} from '../action/idebShActions'

const openReport = store => next => async action => {

   if (action.type !== actions.reportOpened) {
      return next(action)
   }

   let basicInfo = store.getState().selectedUnidade.basicInfo

   next(action)

   if (Object.keys(basicInfo).length === 0) {
      store.dispatch(selectedUnidadeRequested(action.payload.id))
   }

   store.dispatch({
      type: actions.latLongInfoRequested,
      payload: {
         url: `/latlong/${action.payload.id}`,
         method: 'get',
         onSuccess: actions.latLongInfoReceived,
         onError: actions.latLongInfoRequestFailed,
      }
   })
   .then(
      store.dispatch({
         type: actions.painelInfoRequested,
         payload: {
            url: `/painelind?unidade=${action.payload.id}`,
            method: 'get',
            onSuccess: actions.painelInfoReceived,
            onError: actions.painelInfoRequestFailed,
         }
      })
   )
   .then(
      store.dispatch({
         type: actions.chartDataRequested,
         payload: {
            url: `idebsh?id_un=${action.payload.id}`,
            method: 'get',
            onSuccess: actions.chartDataReceived,
            onError: actions.chartDataRequestFailed,
         }
      })
   )
   .then(
      store.dispatch({
         type: actions.chartDataProjRequested,
         payload: {
            url: `/idebshproj?id_un=${action.payload.id}`,
            method: 'get',
            onSuccess: actions.chartDataProjReceived,
            onError: actions.chartDataProjRequestFailed,
         }
      })
   )
   .then(() => {
      if(action.payload.id > 9999999) { // Escola 
         store.dispatch(parentMunChartDataRequested(basicInfo.id_unidade_pai))
         .then(store.dispatch(parentEstChartDataRequested(Number(String(action.payload.id).substring(0,2)))))
         .then(store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1)))))
         .then(store.dispatch(paisChartDataRequested(1)))
         .then(store.dispatch(btnsRequested(action.payload.id)))
      } else if(action.payload.id > 999999) { // Município
         store.dispatch(parentEstChartDataRequested(Number(String(action.payload.id).substring(0,2))))
         .then(store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1)))))
         .then(store.dispatch(paisChartDataRequested(1)))
         .then(store.dispatch(btnsRequested(action.payload.id)))
      } else if(action.payload.id > 9) { // Estado
         store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1))))
         .then(store.dispatch(paisChartDataRequested(1)))
         .then(store.dispatch(btnsRequested(action.payload.id)))
      } else if(action.payload.id > 1) { // Região
         store.dispatch(paisChartDataRequested(1))
         .then(store.dispatch(btnsRequested(action.payload.id)))
      }
   })


}

export default openReport
