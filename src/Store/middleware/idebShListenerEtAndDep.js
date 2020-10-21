import * as actions from '../action/variables'
import { 
   activeEtAndDepChanged, 
} from '../action/idebShActions'

const idebShListenerEtAndDep = store => next => async action => {

   if (action.type !== actions.activeEtAndDepChanged) {
      return next(action)
   }

   next(action)

   const etsAndDeps = store.getState().idebSh.etsAndDeps
   const unidadeChartData = store.getState().idebSh.unidadeChartData
   const unidadeProjData = store.getState().idebSh.unidadeProjData

   let depsState = {
         total: 0,
         federal: 0,
         estadual: 0,
         municipal: 0,
         publico: 0,
         privado: 0,
   }

   // Definindo os showableDeps
   if(action.payload.changeOnEt) {
      etsAndDeps[action.payload.et - 1].deps.map(value => {
         if (value === 0) {
            Object.assign(depsState, { total: 1 })
         }
         if (value === 1) {
            Object.assign(depsState, { federal: 1 })
         }
         if (value === 2) {
            Object.assign(depsState, { estadual: 1 })
         }
         if (value === 3) {
            Object.assign(depsState, { municipal: 1 })
         }
         if (value === 4) {
            Object.assign(depsState, { privado: 1 })
         }
         if (value === 5) {
            Object.assign(depsState, { publico: 1 })
         }
      })

      // E enviando pra store os mesmos
      store.dispatch({
         type: actions.showableDepsDefined,
         payload: {
            total: depsState.total,
            federal: depsState.federal,
            estadual: depsState.estadual,
            municipal: depsState.municipal,
            publico: depsState.publico,
            privado: depsState.privado,
         }
      })
   }

   // Se o clique foi numa etapa
   if(action.payload.changeOnEt) {
      // Se a dependência selecionada não estiver presente nas deps possíveis
      const possibleDeps = etsAndDeps[action.payload.et - 1].deps
      if(!possibleDeps.includes(action.payload.dep)) {
         // Despache uma ação com a primeira dependência possível
         store.dispatch(activeEtAndDepChanged(action.payload.et, etsAndDeps[action.payload.et - 1].deps[0], false))
      }
   } 

   store.dispatch({
      type: actions.chartCreationRequested,
      payload: {
         et: action.payload.et,
         dep: action.payload.dep,
         datatype: '',
         data: unidadeChartData
      }
   })

   store.dispatch({
      type: actions.chartCreationRequested,
      payload: {
         et: action.payload.et,
         dep: action.payload.dep,
         datatype: 'Projeção',
         data: unidadeProjData
      }
   })

}

export default idebShListenerEtAndDep
