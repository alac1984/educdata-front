import React, { Fragment, useEffect } from 'react'
import { css, cs, cx } from 'emotion'
import { etsAndDepsRequested } from '../../../Store/action/idebActions';
import { idebSerieHistoricaRequested } from '../../../Store/action/idebActions'
import { useDispatch, useSelector } from 'react-redux';
import MyResponsiveLine from './chart'

const IdebSerieHistorica = () => {
   const dispatch = useDispatch();
   const showIdebSerieHistorica = useSelector(state => state.idebSerieHistorica.showIdebSerieHistorica)
   const ets = useSelector(state => state.idebBtns.ets)
   const deps = useSelector(state => state.idebBtns.deps)
   const dataForChart = useSelector(state => state.idebSerieHistorica.forChart)
   const activeDep = useSelector(state => state.idebBtns.activeDep)
   const activeEt = useSelector(state => state.idebBtns.activeEt)

   useEffect(() => {
      if (ets.length > 0) {
         dispatch(idebSerieHistoricaRequested(activeDep, activeEt));
      }
   }, [ets.length])

   return (
      <Fragment>
         {showIdebSerieHistorica ? (
            <MyResponsiveLine data={dataForChart} />
         ) : null}
      </Fragment>
   )
}

export default IdebSerieHistorica