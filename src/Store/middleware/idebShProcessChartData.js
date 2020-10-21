import * as actions from '../action/variables'

function convertToChartData(data, type, activeEt, activeDep) {


}

const idebShProcessChartData = store => next => action => {

   if (action.type !== actions.chartCreationRequested) {
      return next(action)
   }

   next(action)


   let exportData = []

   action.payload.data.map(entry => {
      if (entry.et === action.payload.et && entry.dep === action.payload.dep) {
         exportData.push({
            id: '',
            color: 'hsl(2, 86%, 50%)',
            data: []
         })

         if (action.payload.et === 1) {
            exportData[0].id = 'Anos Iniciais'
         } else if (action.payload.et === 2) {
            exportData[0].id = 'Anos Finais'
         } else {
            exportData[0].id = 'Ensino Médio'
         }

         if (action.payload.datatype !== '') {
            exportData[0].id = action.payload.datatype
            exportData[0].color = 'hsl(348, 70%, 0%)'
         }

         exportData[0].data.push({
            x: 2005,
            y: entry.y2005,
         })
         exportData[0].data.push({
            x: 2007,
            y: entry.y2007,
         })
         exportData[0].data.push({
            x: 2009,
            y: entry.y2009,
         })
         exportData[0].data.push({
            x: 2011,
            y: entry.y2011,
         })
         exportData[0].data.push({
            x: 2013,
            y: entry.y2013,
         })
         exportData[0].data.push({
            x: 2015,
            y: entry.y2015,
         })
         exportData[0].data.push({
            x: 2017,
            y: entry.y2017,
         })
         exportData[0].data.push({
            x: 2019,
            y: entry.y2019,
         })
         exportData[0].data.push({
            x: 2021,
            y: entry.y2021,
         })

      }
   })

   if(action.payload.datatype === '') {

      store.dispatch({type: actions.erasePreviousChartData})
      .then(
         store.dispatch({
            type: actions.chartDataProcessed,
            payload: exportData[0]
         })
      )
   } else if(action.payload.datatype === 'Projeção') {
      store.dispatch({
         type: actions.chartDataProjProcessed,
         payload: exportData[0]
      })
   }
}

export default idebShProcessChartData