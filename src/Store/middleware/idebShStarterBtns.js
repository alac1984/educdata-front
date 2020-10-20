import * as actions from '../action/variables'
import { 
   activeEtAndDepChanged, 
} from '../action/idebShActions'

const idebShStarterBtns = store => next => async action => {

   if (action.type !== actions.btnsReceived) {
      return next(action)
   }

   next(action)

   const id = store.getState().selectedUnidade.basicInfo.id_unidade
   let etsState = store.getState().idebSh.etsState

   // Definindo os showableEts
   action.payload.results.map(value => {
      if (value.et === 1) {
         Object.assign(etsState, {
            anosIniciais: 1,
         })
      } else if (value.et === 2) {
         Object.assign(etsState, {
            anosFinais: 1,
         })
      } else {
         Object.assign(etsState, {
            ensinoMedio: 1,
         })
      }
   })

   store.dispatch({
      type: actions.showableEtsDefined,
      payload: {
         anosIniciais: etsState.anosIniciais,
         anosFinais: etsState.anosFinais,
         ensinoMedio: etsState.ensinoMedio,
      }
   })

   // Inicializando os botões de comparação
   if(id > 9999999) {
      store.dispatch({
         type: actions.escolaCompBtnsDefined
      })
   } else if(id > 999999) {
      store.dispatch({
         type: actions.municipioCompBtnsDefined
      })
   } else if(id > 9) {
      store.dispatch({
         type: actions.estadoCompBtnsDefined
      })
   } else if(id > 1) {
      store.dispatch({
         type: actions.regiaoCompBtnsDefined
      })
   }

   // Primeira atribuição de activeEtAndDep
   store.dispatch(activeEtAndDepChanged(
      action.payload.results[0].et, 
      action.payload.results[0].deps[0],
      false))
}

export default idebShStarterBtns
