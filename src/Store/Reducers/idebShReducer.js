import * as actions from '../action/variables'

export default function idebShReducer(state = {
   unidadeChartData: [],
   unidadeProjData: [],
   parentMunChartData: [],
   parentEstChartData: [],
   parentRegChartData: [],
   paisChartData: [],
   etsAndDeps: [],
   // Não mostrar: 0, Mostrar: 1, Ativo: 2
   etsState: {
      anosIniciais: 0,
      anosFinais: 0,
      ensinoMedio: 0,
   },
   depsState: {
      total: 0,
      federal: 0,
      estadual: 0,
      municipal: 0,
      publico: 0,
      privado: 0,
   },
   showEts: false,
   showDeps: false,
   activeEtAndDep: [0, 0],
   showingChart: [],
   canShowChart: false,
   showCompareBtns: {
      municipio: 0,
      estado: 0,
      regiao: 0,
      pais: 0,
   }
   // Dados que estão sendo mostrados
},
   action
) {
   switch (action.type) {
      case actions.chartDataReceived:
         return Object.assign({}, state, {
            unidadeChartData: action.payload.results,
         })
      case actions.chartDataProjReceived:
         return Object.assign({}, state, {
            unidadeProjData: action.payload.results,
         })
      case actions.parentMunChartDataReceived:
         return Object.assign({}, state, {
            parentMunChartData: action.payload.results,
         })
      case actions.parentEstChartDataReceived:
         return Object.assign({}, state, {
            parentEstChartData: action.payload.results,
         })
      case actions.parentRegChartDataReceived:
         return Object.assign({}, state, {
            parentRegChartData: action.payload.results,
         })
      case actions.paisChartDataReceived:
         return Object.assign({}, state, {
            paisChartData: action.payload.results,
         })
      case actions.btnsReceived:
         return Object.assign({}, state, {
            etsAndDeps: action.payload.results,
         })
      case actions.showableEtsDefined:
         return Object.assign({}, state, {
            etsState: {
               anosIniciais: action.payload.anosIniciais,
               anosFinais: action.payload.anosFinais,
               ensinoMedio: action.payload.ensinoMedio,
            },
            showEts: true,
         })
      case actions.activeEtAndDepChanged:
         return Object.assign({}, state, {
            activeEtAndDep: [action.payload.et, action.payload.dep]
         })
      case actions.showableDepsDefined:
         return Object.assign({}, state, {
            depsState: {
               total: action.payload.total,
               federal: action.payload.federal,
               estadual: action.payload.estadual,
               municipal: action.payload.municipal,
               privado: action.payload.privado,
               publico: action.payload.publico,
            },
            showDeps: true,
         })
      case actions.chartDataProcessed:
         return Object.assign({}, state, {
            showingChart: action.payload,
            canShowChart: true,
        })
      case actions.escolaCompBtnsDefined:
         return Object.assign({}, state, {
            showCompareBtns: {
               ...state.showCompareBtns,
               municipio: 1,
               estado: 1,
               regiao: 1,
               pais: 1,
            }
        })
      case actions.municipioCompBtnsDefined:
         return Object.assign({}, state, {
            showCompareBtns: {
               ...state.showCompareBtns,
               estado: 1,
               regiao: 1,
               pais: 1,
            }
        })
      case actions.estadoCompBtnsDefined:
         return Object.assign({}, state, {
            showCompareBtns: {
               ...state.showCompareBtns,
               regiao: 1,
               pais: 1,
            }
        })
      case actions.regiaoCompBtnsDefined:
         return Object.assign({}, state, {
            showCompareBtns: {
               ...state.showCompareBtns,
               pais: 1,
            }
        })
      case actions.newCompBtnStateDefined:
         return Object.assign({}, state, {
            showCompareBtns: {
               ...action.payload,
            }
        })
      default:
         return state
   }
}