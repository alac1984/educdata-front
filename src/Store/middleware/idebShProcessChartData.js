import * as actions from '../action/variables'

function convertToChartData(data, type, activeEt, activeDep) {

   let exportData = []

   data.map(entry => {
      if (entry.et === activeEt && entry.dep === activeDep) {
         exportData.push({
            id: '',
            color: 'hsl(2, 86%, 50%)',
            data: []
         })

         if (activeEt === 1) {
            exportData[0].id = 'Anos Iniciais'
         } else if (activeEt === 2) {
            exportData[0].id = 'Anos Finais'
         } else {
            exportData[0].id = 'Ensino Médio'
         }

         if (type === 'projeção') {
            exportData[0].id = 'Projeção'
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

   console.log(exportData[0])
   return exportData[0]

}

const idebShProcessChartData = store => next => action => {

   if (action.type !== actions.chartCreationRequested) {
      return next(action)
   }

   next(action)

   const unidadeChartData = store.getState().idebSh.unidadeChartData
   const unidadeProjData = store.getState().idebSh.unidadeProjData
   // const parentMunChartData = store.getState().idebSh.parentMunChartData
   // const parentEstChartData = store.getState().idebSh.parentEstChartData
   // const parentRegChartData = store.getState().idebSh.parentRegChartData
   // const paisChartData = store.getState().idebSh.paisChartData

   const unidadeChartDataProcessed = convertToChartData(unidadeChartData, 'unidade' ,action.payload.et, action.payload.dep)
   const unidadeProjDataProcessed = convertToChartData(unidadeProjData, 'projeção' ,action.payload.et, action.payload.dep)

   store.dispatch({
      type: actions.chartDataProcessed,
      payload: [unidadeChartDataProcessed, unidadeProjDataProcessed]
   })
}

export default idebShProcessChartData