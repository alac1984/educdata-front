import React, { Fragment, useEffect } from 'react'
import { css } from 'emotion'
import { useDispatch, useSelector } from 'react-redux';

const ReportButtons = (props) => {
   const dispatch = useDispatch()
   const ets = useSelector(state => state.ideb.ets)
   const deps = useSelector(state => state.ideb.deps)
   const showIdeb = useSelector(state => state.ideb.showIdeb)
   const idebInfo = useSelector(state => state.ideb.idebInfo)
   const activeDep = useSelector(state => state.ideb.activeDep)
   const activeEt = useSelector(state => state.ideb.activeEt)

   return (
      <Fragment>
         <div className={css`
            display: grid;
            grid-template-columns: 60px auto;
            align-content: center;
            grid-row-gap: 8px;
            padding: 20px;
         `}>
            <p className={css`margin: 0; grid-column: 1 / 1; grid-row: 1 / 1;`}>Rede: </p>
            <div className={css`margin: 0; grid-column: 2/ 2; grid-row: 1 / 1; display: flex;`}>
            </div>
            <p className={css`grid-column: 1 / 1; grid-row: 2 / 2;`}>Etapa: </p>
            <div className={css`grid-column: 2/ 2; grid-row: 2 / 2;display: flex;`}>
            </div>
         </div>

      </Fragment>

   )

}

export default ReportButtons