import * as actions from '../action/variables'

const idebShListenerCompBtns = store => next => async action => {

   if (action.type !== actions.parentBtnClicked) {
      return next(action)
   }

   next(action)

   const showCompareBtns = store.getState().idebSh.showCompareBtns
   let newCompBtnsState = {...showCompareBtns}

   switch(action.payload.btn) {
      case 'mun':
         if(newCompBtnsState.municipio == 2) {
            newCompBtnsState.municipio = 1
            newCompBtnsState.estado = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({type: actions.eraseParentData})
         } else {
            newCompBtnsState.municipio = 2
            newCompBtnsState.estado = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
         }
         break
      case 'est':
         if(newCompBtnsState.estado == 2) {
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
            store.dispatch({type: actions.eraseParentData})
         } else {
            newCompBtnsState.estado = 2
            newCompBtnsState.municipio = 1
            newCompBtnsState.regiao = 1
            newCompBtnsState.pais = 1
         }
         break
      case 'reg':
         if(newCompBtnsState.regiao == 2) {
            newCompBtnsState.regiao = 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.pais = 1
            store.dispatch({type: actions.eraseParentData})
         } else {
            newCompBtnsState.regiao= 2
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            newCompBtnsState.pais = 1
         }
         break
      case 'pais':
         if(newCompBtnsState.pais == 2) {
            newCompBtnsState.pais = 1
            newCompBtnsState.regiao= 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
            store.dispatch({type: actions.eraseParentData})
         } else {
            newCompBtnsState.pais = 2
            newCompBtnsState.regiao= 1
            newCompBtnsState.estado = 1
            newCompBtnsState.municipio = 1
         }
         break
   }

   // Colocando os zeros nos botões que não devem aparecer
   Object.keys(showCompareBtns).map(key => {
      if(showCompareBtns[key] === 0) {
         newCompBtnsState[key] = 0
      }
   })
   

   store.dispatch({type: actions.newCompBtnStateDefined, payload: newCompBtnsState})
}

export default idebShListenerCompBtns
