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

         if (type !== '') {
            exportData[0].id = type
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

   return exportData[0]

}

const idebShListenerCompBtns = store => next => async action => {

   if (action.type !== actions.parentBtnClicked) {
      return next(action)
   }

   next(action)

   const parentMunChartData = store.getState().idebSh.parentMunChartData
   const parentEstChartData = store.getState().idebSh.parentEstChartData
   const parentRegChartData = store.getState().idebSh.parentRegChartData
   const paisChartData = store.getState().idebSh.paisChartData
   const showCompareBtns = store.getState().idebSh.showCompareBtns
   const showingChart = store.getState().idebSh.showingChart
   const activeEtAndDep = store.getState().idebSh.activeEtAndDep
   
   let newCompBtnsState = {...showCompareBtns}

   switch(action.payload.btn) {
      case 'mun':
         if(newCompBtnsState.municipio == 2) {
            newCompBtnsState.municipio = 1
            newCompBtnsState.estado = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
         } else {
            newCompBtnsState.municipio = 2
            newCompBtnsState.estado = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
            store.dispatch({
               type: actions.addParentChartData,
               payload: [...showingChart, convertToChartData(
                  parentMunChartData, 
                  'Município',
                  activeEtAndDep[0],
                  activeEtAndDep[1],
                  )]
            })
         }
         break
      case 'est':
         if(newCompBtnsState.estado == 2) {
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
         } else {
            newCompBtnsState.estado = 2
            newCompBtnsState.municipio = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
            store.dispatch({
               type: actions.addParentChartData,
               payload: [...showingChart, convertToChartData(
                  parentEstChartData, 
                  'Estado',
                  activeEtAndDep[0],
                  activeEtAndDep[1],
                  )]
            })
         }
         break
      case 'reg':
         if(newCompBtnsState.regiao == 2) {
            newCompBtnsState.regiao = 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
         } else {
            newCompBtnsState.regiao= 2
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.pais = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
            store.dispatch({
               type: actions.addParentChartData,
               payload: [...showingChart, convertToChartData(
                  parentRegChartData, 
                  'Região',
                  activeEtAndDep[0],
                  activeEtAndDep[1],
                  )]
            })
         }
         break
      case 'pais':
         if(newCompBtnsState.pais == 2) {
            newCompBtnsState.pais = 1
            newCompBtnsState.regiao= 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
         } else {
            newCompBtnsState.pais = 2
            newCompBtnsState.regiao= 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            store.dispatch({
               type: actions.removeParentChartData,
               payload: showingChart
            })
            store.dispatch({
               type: actions.addParentChartData,
               payload: [...showingChart, convertToChartData(
                  paisChartData, 
                  'País',
                  activeEtAndDep[0],
                  activeEtAndDep[1],
                  )]
            })
         }
         break
   }

   // Colocando os zeros nos botões que não devem aparecer
   Object.keys(showCompareBtns).map(key => {
      if(showCompareBtns[key] === 0) {
         newCompBtnsState[key] = 0
      }
   })

   console.log('newCompBtnsState', newCompBtnsState)
   store.dispatch({type: actions.newCompBtnStateDefined, payload: newCompBtnsState})

}

export default idebShListenerCompBtns
