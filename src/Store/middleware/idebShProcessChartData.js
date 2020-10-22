import * as actions from '../action/variables'

function convertToChartData(data, type, activeEt, activeDep) {


}

const idebShProcessChartData = store => next => action => {

   if (action.type !== actions.chartCreationRequested) {
      return next(action)
   }

   next(action)


   let exportData = [{
      id: '',
      color: 'hsl(22, 100%, 33%)',
      data: [
         {x: 2005, y: 0},
         {x: 2007, y: 0},
         {x: 2009, y: 0},
         {x: 2011, y: 0},
         {x: 2013, y: 0},
         {x: 2015, y: 0},
         {x: 2017, y: 0},
         {x: 2019, y: 0},
         {x: 2021, y: 0},
      ]
   }]

   action.payload.data.map(entry => {
      if (entry.et === action.payload.et && entry.dep === action.payload.dep) {

         if (action.payload.et === 1) {
            exportData[0].id = 'Anos Iniciais'
         } else if (action.payload.et === 2) {
            exportData[0].id = 'Anos Finais'
         } else {
            exportData[0].id = 'Ensino Médio'
         }

         if (action.payload.datatype === 'Projeção') {
            exportData[0].id = action.payload.datatype
            exportData[0].color = 'hsl(238, 87%, 24%)'
         }

         if (action.payload.datatype !== 'Projeção' && action.payload.datatype !== '') {
            exportData[0].id = action.payload.datatype
            exportData[0].color = 'hsl(64, 100%, 32%)'
         }

         exportData[0].data[0].y = entry.y2005
         exportData[0].data[1].y = entry.y2007
         exportData[0].data[2].y = entry.y2009
         exportData[0].data[3].y = entry.y2011
         exportData[0].data[4].y = entry.y2013
         exportData[0].data[5].y = entry.y2015
         exportData[0].data[6].y = entry.y2017
         exportData[0].data[7].y = entry.y2019
         exportData[0].data[8].y = entry.y2021

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
      .then(
         store.dispatch({
            type: actions.showChart,
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