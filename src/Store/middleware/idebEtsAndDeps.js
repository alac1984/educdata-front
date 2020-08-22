import * as actions from '../action/variables'
import { etsAndDepsCalculated } from '../action/idebActions'

const idebEtsAndDeps = ({ dispatch }) => next => action => {

   if (action.type !== actions.etsAndDepsRequested) {
      return next(action)
   }
   
   next(action)

   let values = {
      deps: [],
      ets: [],
      etsForDeps: [
         [],[],[],[],[],[],[]
      ],
      firstDep: -1,
      firstEt: -1,
   }

   action.payload.map((value, idx )=> {
      if (!values.deps.includes(value.cd_tipo_dependencia)) {
         values.deps.push(value.cd_tipo_dependencia)
      }

      values.deps.sort((a,b) => a-b)

      if (!values.ets.includes(value.cd_etapa_ideb)) {
         values.ets.push(value.cd_etapa_ideb)
      }


      values.ets.sort((a,b) => a-b)
   })

   action.payload.map(value => {
      for(let i = 0; i <= 5; i++) {
         if(values.deps.includes(i) && !values.etsForDeps[i].includes(value.cd_etapa_ideb)) {
            values.etsForDeps[i].push(value.cd_etapa_ideb)
             
         }
      }
   })

   for(let i = 0; i <= 5; i++) {
      if(values.firstDep === -1 && values.etsForDeps[i].length > 0) {     
         values.firstDep = i
      }
   }

   values.firstEt = values.etsForDeps[values.firstDep][1]
   
   dispatch(etsAndDepsCalculated(values))

}

export default idebEtsAndDeps