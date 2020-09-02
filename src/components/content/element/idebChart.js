import React, { Fragment, useEffect } from 'react'
import { css, cs, cx } from 'emotion'
import { idebSerieHistoricaRequested } from '../../../Store/action/idebActions'
import { useDispatch, useSelector } from 'react-redux';
import MyResponsiveLine from './chart'
import { chartDataReceived } from '../../../Store/action/idebActions';

const IdebChart = () => {
   const dispatch = useDispatch();
   const showSerieHistorica = useSelector(state => state.ideb.showSerieHistorica)
   const showIdeb = useSelector(state => state.ideb.showIdeb)
   const ets = useSelector(state => state.ideb.etsForThisDep)
   const deps = useSelector(state => state.ideb.deps)
   const dataForChart = useSelector(state => state.ideb.serieHistorica)
   const activeDep = useSelector(state => state.ideb.activeDep)
   const activeEt = useSelector(state => state.ideb.activeEt)

   useEffect(() => {
      if(showIdeb) {
         dispatch(idebSerieHistoricaRequested());
      }
   }, [showIdeb])

   const getActiveDepName = dep => {
      switch(dep) {
         case 0:
            return 'Total'
            break;
         case 1:
            return 'Federal'
            break;
         case 2:
            return 'Estadual'
            break;
         case 3:
            return 'Municipal'
            break;
         case 4:
            return 'Privado'
            break;
         case 5:
            return 'Público'
            break;
      }
   }

   const getActiveEtName = et => {
      switch(et) {
         case 1:
            return 'Anos Iniciais'
            break;
         case 2:
            return 'Anos Finais'
            break;
         case 3:
            return 'Ensino Médio'
            break;
      }
   }

   return (
      <Fragment>
         {showSerieHistorica ? (
            <Fragment>
               {dataForChart[0] ? (
                  <div className={css`position: relative;`}>
                     {dataForChart[0].data.length === 0 ? (
                        <div className={css`
                           position: absolute; 
                           top: 110px;
                           left: 50%;
                           transform: translateX(-50%);
                           z-index: 1000000 !important;
                           border: 1px solid black;
                           border-radius: 10px;
                           background-color: white;
                           padding: 10px;
                        `}>
                           <p>Não há dados para a rede {getActiveDepName(activeDep)} e etapa {getActiveEtName(activeEt)}</p>
                           <p>Entenda como o IDEB é calculado</p>
                        </div>
                     ) : null}
                  </div>
               ) : null}
               <MyResponsiveLine data={dataForChart} />
            </Fragment>
         ) : null}
      </Fragment>
   )
}

export default IdebChart