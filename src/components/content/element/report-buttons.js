import React, { Fragment, useEffect } from 'react'
import { css, cs, cx } from 'emotion'
import { etsAndDepsRequested } from '../../../Store/action/idebActions';
import { useDispatch, useSelector } from 'react-redux';

const ClickableButton = (props) => {
   return (
      <button className='btn btn-outline-primary btn-sm'>{props.name}</button>
   )
}

const NoClickableButton = (props) => {
   return (
      <button className={cx('btn btn-outline-primary btn-sm', css`
         margin: 0 2px;
         color: #d3d3d3; 
         border-color: #d3d3d3; 

         &:hover, &:active, &:focus {
            color: #d3d3d3;
            background-color: #d3d3d3;
            border-color: #d3d3d3; 
         }
      `)}>{props.name}</button>
   )
}

const ActiveButton = (props) => {
   return (
      <button className={cx('btn btn-outline-primary btn-sm', css`
            color: white; 
            margin: 0 2px;
            background-color: #f5548e; 
      `)}>{props.name}</button>
   )
}

const Button = (props) => {
   const renderBtn = () => {
      if(props.active === 'yes') {
         return <ActiveButton name={props.name}></ActiveButton>
      } else if(props.clickable === 'no') {
         return <NoClickableButton name={props.name}></NoClickableButton>
      } else {
         return <ClickableButton name={props.name}></ClickableButton>
      }
   }
   return (
      <Fragment>
         {renderBtn()}
      </Fragment>
   )
}

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
               <Button name='Total' clickable={deps.includes(0) ? 'yes' : 'no'} active={activeDep === 0 ? 'yes' : 'no'}/>
               <Button name='Federal' clickable={deps.includes(1) ? 'yes' : 'no'} active={activeDep === 1 ? 'yes' : 'no'} />
               <Button name='Estadual' clickable={deps.includes(2) ? 'yes' : 'no'} active={activeDep === 2 ? 'yes' : 'no'}/>
               <Button name='Municipal' clickable={deps.includes(3) ? 'yes' : 'no'} active={activeDep === 3 ? 'yes' : 'no'}/>
               <Button name='Privado' clickable={deps.includes(4) ? 'yes' : 'no'} active={activeDep === 4 ? 'yes' : 'no'}/>
               <Button name='Público' clickable={deps.includes(5) ? 'yes' : 'no'} active={activeDep === 5 ? 'yes' : 'no'}/>
            </div>
            <p className={css`grid-column: 1 / 1; grid-row: 2 / 2;`}>Etapa: </p>
            <div className={css`grid-column: 2/ 2; grid-row: 2 / 2;display: flex;`}>
               <Button name='Anos Iniciais' clickable={ets.includes(1) ? 'yes' : 'no'} active={activeEt === 1 ? 'yes' : 'no'} />
               <Button name='Anos Finais' clickable={ets.includes(2) ? 'yes' : 'no'} active={activeEt === 2 ? 'yes' : 'no'}/>
               <Button name='Ensino Médio' clickable={ets.includes(3) ? 'yes' : 'no'} active={activeEt === 3 ? 'yes' : 'no'}/>
            </div>
         </div>

      </Fragment>

   )

}

export default ReportButtons