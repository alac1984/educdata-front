import * as actions from '../action/variables'
import {
   selectedUnidadeRequested,
} from '../action/searchActions'
import {
   parentMunChartDataRequested,
   parentEstChartDataRequested,
   parentRegChartDataRequested,
   paisChartDataRequested,
} from '../action/idebShActions'

const openReport = store => next => async action => {

   if (action.type !== actions.reportOpened) {
      return next(action)
   }

   let basicInfo = store.getState().selectedUnidade.basicInfo

   if (Object.keys(basicInfo).length === 0) {
      store.dispatch(selectedUnidadeRequested(action.payload.id))
   }

   next(action)

   store.dispatch({
      type: actions.latLongInfoRequested,
      payload: {
         url: `/latlong/${action.payload.id}`,
         method: 'get',
         onSuccess: actions.latLongInfoReceived,
         onError: actions.latLongInfoRequestFailed,
      }
   })
   store.dispatch({
      type: actions.painelInfoRequested,
      payload: {
         url: `/painelind?unidade=${action.payload.id}`,
         method: 'get',
         onSuccess: actions.painelInfoReceived,
         onError: actions.painelInfoRequestFailed,
      }
   })
   store.dispatch({
      type: actions.chartDataRequested,
      payload: {
         url: `idebsh?id_un=${action.payload.id}`,
         method: 'get',
         onSuccess: actions.chartDataReceived,
         onError: actions.chartDataRequestFailed,
      }
   })
   store.dispatch({
      type: actions.chartDataProjRequested,
      payload: {
         url: `/idebshproj?id_un=${action.payload.id}`,
         method: 'get',
         onSuccess: actions.chartDataProjReceived,
         onError: actions.chartDataProjRequestFailed,
      }
   })
   store.dispatch({
      type: actions.btnsRequested,
      payload: {
         url: `/idebshbtns?id_un=${action.payload.id}`,
         method: 'get',
         onSuccess: actions.btnsReceived,
         onError: actions.btnsRequestFailed,
      }
   })

   if(action.payload.id > 9999999) { // Escola 
      store.dispatch(parentMunChartDataRequested(basicInfo.id_unidade_pai))
      store.dispatch(parentEstChartDataRequested(Number(String(action.payload.id).substring(0,2))))
      store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1))))
      store.dispatch(paisChartDataRequested(1))
   } else if(action.payload.id > 999999) { // Município
      store.dispatch(parentEstChartDataRequested(Number(String(action.payload.id).substring(0,2))))
      store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1))))
      store.dispatch(paisChartDataRequested(1))
   } else if(action.payload.id > 9) { // Estado
      store.dispatch(parentRegChartDataRequested(Number(String(action.payload.id).substring(0,1))))
      store.dispatch(paisChartDataRequested(1))
   } else if(action.payload.id > 1) { // Região
      store.dispatch(paisChartDataRequested(1))
   }

}

export default openReport
