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

   return (
      <Fragment>
         {showSerieHistorica ? (
            <Fragment>
               {console.log('showSerieHistorica', showSerieHistorica)}
               {console.log('dataForChart', dataForChart)}
               <MyResponsiveLine data={dataForChart} />
            </Fragment>
         ) : null}
      </Fragment>
   )
}

export default IdebChart