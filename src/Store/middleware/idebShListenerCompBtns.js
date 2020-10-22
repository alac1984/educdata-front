import * as actions from '../action/variables'

const idebShListenerCompBtns = store => next => async action => {

   if (action.type !== actions.parentBtnClicked &&
      action.type !== actions.etOrDepBtnClicked
   ) {
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

   let newCompBtnsState = { ...showCompareBtns }

   if (action.type === actions.etOrDepBtnClicked) {
      store.dispatch({
         type: actions.justRemoveParentChartData,
         payload: [showingChart[0], showingChart[1]]
      })
      newCompBtnsState.pais = 1
      newCompBtnsState.regiao = 1
      newCompBtnsState.estado = 1
      newCompBtnsState.municipio = 1

      // Colocando os zeros nos botões que não devem aparecer
      Object.keys(showCompareBtns).map(key => {
         if (showCompareBtns[key] === 0) {
            newCompBtnsState[key] = 0
         }
      })

   } else {

      let electedData
      let exportData = [{
         id: '',
         color: 'hsl(22, 100%, 33%, 0)',
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

      switch (action.payload.btn) {
         case 'mun':
            electedData = parentMunChartData
            break
         case 'est':
            electedData = parentEstChartData
            break
         case 'reg':
            electedData = parentRegChartData
            break
         case 'pais':
            electedData = paisChartData
            break
      }

      electedData.map(entry => {
         if (entry.et === activeEtAndDep[0] && entry.dep === 0) {
            exportData[0].color = 'hsl(22, 100%, 33%)'

            if (action.payload.btn === 'est') {
               exportData[0].id = 'Estado'
            } else if (action.payload.btn === 'reg') {
               exportData[0].id = 'Região'
            } else if (action.payload.btn === 'mun') {
               exportData[0].id = 'Município'
            } else {
               exportData[0].id = 'País'
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

      switch (action.payload.btn) {
         case 'mun':
            if (newCompBtnsState.municipio == 2) {
               newCompBtnsState.municipio = 1
               newCompBtnsState.estado = 1
               newCompBtnsState.regiao = 1
               newCompBtnsState.pais = 1
               store.dispatch({
                  type: actions.justRemoveParentChartData,
                  payload: [showingChart[0], showingChart[1]]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            } else {
               newCompBtnsState.municipio = 2
               newCompBtnsState.estado = 1
               newCompBtnsState.regiao = 1
               newCompBtnsState.pais = 1
               if (showingChart.length > 2) {
                  store.dispatch({
                     type: actions.removeBeforeAddParentChartData,
                     payload: [showingChart[0], showingChart[1]]
                  })
               }
               store.dispatch({
                  type: actions.addParentChartData,
                  payload: exportData[0]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            }
            break
         case 'est':
            if (newCompBtnsState.estado == 2) {
               newCompBtnsState.estado = 1
               newCompBtnsState.municipio = 1
               newCompBtnsState.regiao = 1
               newCompBtnsState.pais = 1
               store.dispatch({
                  type: actions.justRemoveParentChartData,
                  payload: [showingChart[0], showingChart[1]]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            } else {
               newCompBtnsState.estado = 2
               newCompBtnsState.municipio = 1
               newCompBtnsState.regiao = 1
               newCompBtnsState.pais = 1
               if (showingChart.length > 2) {
                  store.dispatch({
                     type: actions.removeBeforeAddParentChartData,
                     payload: [showingChart[0], showingChart[1]]
                  })
               }
               store.dispatch({
                  type: actions.addParentChartData,
                  payload: exportData[0]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            }
            break
         case 'reg':
            if (newCompBtnsState.regiao == 2) {
               newCompBtnsState.regiao = 1
               newCompBtnsState.estado = 1
               newCompBtnsState.municipio = 1
               newCompBtnsState.pais = 1
               store.dispatch({
                  type: actions.justRemoveParentChartData,
                  payload: [showingChart[0], showingChart[1]]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            } else {
               newCompBtnsState.regiao = 2
               newCompBtnsState.estado = 1
               newCompBtnsState.municipio = 1
               newCompBtnsState.pais = 1
               if (showingChart.length > 2) {
                  store.dispatch({
                     type: actions.removeBeforeAddParentChartData,
                     payload: [showingChart[0], showingChart[1]]
                  })
               }
               store.dispatch({
                  type: actions.addParentChartData,
                  payload: exportData[0]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            }
            break
         case 'pais':
            if (newCompBtnsState.pais == 2) {
               newCompBtnsState.pais = 1
               newCompBtnsState.regiao = 1
               newCompBtnsState.estado = 1
               newCompBtnsState.municipio = 1
               store.dispatch({
                  type: actions.justRemoveParentChartData,
                  payload: [showingChart[0], showingChart[1]]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            } else {
               newCompBtnsState.pais = 2
               newCompBtnsState.regiao = 1
               newCompBtnsState.estado = 1
               newCompBtnsState.municipio = 1
               if (showingChart.length > 2) {
                  store.dispatch({
                     type: actions.removeBeforeAddParentChartData,
                     payload: [showingChart[0], showingChart[1]]
                  })
               }
               store.dispatch({
                  type: actions.addParentChartData,
                  payload: exportData[0]
               })
               .then(
                  store.dispatch({type: actions.showChart})
               )
            }
            break
      }

      // Colocando os zeros nos botões que não devem aparecer
      Object.keys(showCompareBtns).map(key => {
         if (showCompareBtns[key] === 0) {
            newCompBtnsState[key] = 0
         }
      })

   }

   store.dispatch({ type: actions.newCompBtnStateDefined, payload: newCompBtnsState })

}

export default idebShListenerCompBtns
