import * as actions from '../action/variables'

export default function idebBtnsReducer(state = {
   deps: [],
   ets: [],
   activeDep: 0,
   activeEt: 0,
   etsForDeps: [],
},
   action
) {
   switch (action.type) {
      case actions.etsAndDepsCalculated:
         return Object.assign({}, state, {
            ets: action.payload.ets,
            deps: action.payload.deps,
            etsForDeps: action.payload.etsForDeps,
            activeDep: action.payload.firstDep,
            activeEt: action.payload.firstEt,
         })
      default:
         return state
   }
}