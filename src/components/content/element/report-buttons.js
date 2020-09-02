import React, { Fragment, useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import { useDispatch, useSelector } from 'react-redux';
import { idebSerieHistoricaRequested } from '../../../Store/action/idebActions'

const btnBackImg = require('../../../img/btn_no_click.png')

const dynBtnStyle = ({ isActive, isPossible }) => css`
   border: none;
   background-image: url(${btnBackImg});
   color: white;
   margin-left: 5px;

   &:active {
      /* box-shadow: 0px 0px 2px 2px rgba(171,171,171,0.15); */
   }

   &:focus {
      box-shadow: none;
   }

   &:hover {
      color: white;
   }

   ${isPossible === true &&
   `
      background-image: none;
      background-color: #fa7faa; 
      &:hover {
         background-color: #f5548e;
      }
      `
   }

   ${isActive === true &&
   `
      background-image: none;
      background-color: #f5548e; 
      `
   }
`

const Button = props => {
   const isPossible = props.isPossible
   const isActive = props.isActive

   return (
      <button className={cx('btn', dynBtnStyle({ isActive, isPossible })) } onClick={props.function}>{props.name}</button>

   )
}

const ReportButtons = (props) => {
   const dispatch = useDispatch()
   const ets = useSelector(state => state.ideb.etsForActiveDep)
   const deps = useSelector(state => state.ideb.deps)
   const showSerieHistorica = useSelector(state => state.ideb.showSerieHistorica)
   const idebInfo = useSelector(state => state.ideb.idebInfo)
   const activeDep = useSelector(state => state.ideb.activeDep)
   const activeEt = useSelector(state => state.ideb.activeEt)

   const handleClick = (dep, et) => {
      return dispatch(idebSerieHistoricaRequested(dep, et))
   }

   return (
      <Fragment>
         {showSerieHistorica ? (
            <div className={css`
            display: grid;
            grid-template-columns: 60px auto;
            align-content: center;
            grid-row-gap: 8px;
            padding: 20px;
         `}>
               <p className={css`margin: 0; grid-column: 1 / 1; grid-row: 1 / 1;`}>Rede: </p>
               <div className={css`margin: 0; grid-column: 2/ 2; grid-row: 1 / 1; display: flex;`}>
                  {console.log('deps.includes(0)', deps.includes(0))}
                  {console.log('deps.includes(1)', deps.includes(1))}
                  {console.log('deps.includes(2)', deps.includes(2))}
                  {console.log('deps.includes(3)', deps.includes(3))}
                  {console.log('deps.includes(4)', deps.includes(4))}
                  <Button name='Total' isPossible={deps.includes(0)} isActive={activeDep === 0} function={() => deps.includes(0) ? handleClick(0, activeEt) : console.log('not clickable')} />
                  <Button name='Federal' isPossible={deps.includes(1)} isActive={activeDep === 1}  function={() => deps.includes(1) ? handleClick(1, activeEt) : console.log('not clickable')} />
                  <Button name='Estadual' isPossible={deps.includes(2)} isActive={activeDep === 2} function={() => deps.includes(2) ? handleClick(2, activeEt) : console.log('not clickable')} />
                  <Button name='Municipal' isPossible={deps.includes(3)} isActive={activeDep === 3} function={() => deps.includes(3) ? handleClick(3, activeEt) : console.log('not clickable')}  />
                  <Button name='Privado' isPossible={deps.includes(4)} isActive={activeDep === 4} function={() => deps.includes(4) ? handleClick(4, activeEt) : console.log('not clickable')} />
                  <Button name='Público' isPossible={deps.includes(5)} isActive={activeDep === 5} function={() => deps.includes(5) ? handleClick(5, activeEt) : console.log('not clickable')}  />
               </div>
               <p className={css`grid-column: 1 / 1; grid-row: 2 / 2;`}>Etapa: </p>
               <div className={css`grid-column: 2/ 2; grid-row: 2 / 2;display: flex;`}>
                  <Button name='Anos Iniciais' isPossible={ets.includes(1)} isActive={activeEt === 1} function={() => deps.includes(5) ? handleClick(activeDep, 1) : console.log('not clickable')} />
                  <Button name='Anos Finais' isPossible={ets.includes(2)} isActive={activeEt === 2} function={() => deps.includes(5) ? handleClick(activeDep, 2) : console.log('not clickable')} />
                  <Button name='Ensino Médio' isPossible={ets.includes(3)} isActive={activeEt === 3} function={() => deps.includes(5) ? handleClick(activeDep, 3) : console.log('not clickable')} />
               </div>
            </div>

         ) : null}

      </Fragment>

   )

}

export default ReportButtons