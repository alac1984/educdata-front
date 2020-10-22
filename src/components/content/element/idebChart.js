import React, { Fragment, useEffect } from 'react'
import { css, cs, cx } from 'emotion'
import { idebSerieHistoricaRequested } from '../../../Store/action/idebShActions'
import { useDispatch, useSelector } from 'react-redux';
import MyResponsiveLine from './chart'
import { chartDataReceived } from '../../../Store/action/idebShActions';

const IdebChart = () => {
   // const dispatch = useDispatch();
   const canShowChart = useSelector(state => state.idebSh.canShowChart)
   const showingChart = useSelector(state => state.idebSh.showingChart)

   return (
      <Fragment>
         {canShowChart? (
            <MyResponsiveLine data={showingChart} />
         ) : null}
      </Fragment>
   )
}

export default IdebChart