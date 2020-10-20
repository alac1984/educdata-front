import React, { Fragment, useState, useEffect } from 'react'
import { css, cx } from 'emotion'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../Store/action/variables'
import {
   activeEtAndDepChanged,
   chartDataRequestReceiveAndProcess,
   chartDataProjRequestReceiveAndProcess,
   compareBtnClicked,
   parentDataRequestReceiveAndProcess
} from '../../../Store/action/idebShActions'
import { bindActionCreators } from 'redux';

const btnBackImg = require('../../../img/btn_no_click.png')

const dynBtnStyle = ({ isActive, showBtn }) => css`
   border: none;
   background-color: #b85d7d;
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

  ${showBtn === false &&
   `
      display: none
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
   const dispatch = useDispatch()
   const showBtn = props.showBtn
   const isActive = props.isActive

   return (
      <button className={cx('btn', dynBtnStyle({ isActive, showBtn }))}
         onClick={() => {
            dispatch(activeEtAndDepChanged(props.et, props.dep, props.changeOnEt))
         }}>
         {props.name}
      </button>
   )
}

const CompButton = props => {

   const dispatch = useDispatch()
   const showBtn = props.showBtn
   const isActive = props.isActive
   const btn = props.btn

   return (
      <button className={cx('btn', dynBtnStyle({ isActive, showBtn }))}
         onClick={() => {
            dispatch({type: actions.parentBtnClicked, payload: {btn: props.btn}})
         }}>
         {props.name}
      </button>
   )
}

const ReportButtons = (props) => {
   const dispatch = useDispatch()

   const etsState = useSelector(state => state.idebSh.etsState)
   const depsState = useSelector(state => state.idebSh.depsState)
   const activeEtAndDep = useSelector(state => state.idebSh.activeEtAndDep)
   const showEts = useSelector(state => state.idebSh.showEts)
   const showDeps = useSelector(state => state.idebSh.showDeps)
   const showCompareBtns = useSelector(state => state.idebSh.showCompareBtns)
   const unidadePai = useSelector(state => state.selectedUnidade.basicInfo.id_unidade_pai)

   return (
      <Fragment>
         <div className={css`
            display: grid;
            grid-template-columns: 60px auto;
            align-content: center;
            grid-row-gap: 8px;
            grid-column-gap: 15px;
            padding: 20px;
         `}>
            <p className={css`margin: 0; grid-column: 1 / 1; grid-row: 1 / 1;`}>Etapa: </p>
            {showEts ? (
               <div className={css`margin: 0; grid-column: 2/ 2; grid-row: 1 / 1; display: flex;`}>
                  <Button id={props.id} name='Anos Iniciais'
                     showBtn={etsState.anosIniciais >= 1} isActive={activeEtAndDep[0] === 1}
                     et={1} dep={activeEtAndDep[1]} changeOnEt={true} />
                  <Button id={props.id} name='Anos Finais'
                     showBtn={etsState.anosFinais >= 1} isActive={activeEtAndDep[0] === 2}
                     et={2} dep={activeEtAndDep[1]} changeOnEt={true} />
                  <Button id={props.id} name='Ensino Médio'
                     showBtn={etsState.ensinoMedio >= 1} isActive={activeEtAndDep[0] === 3}
                     et={3} dep={activeEtAndDep[1]} changeOnEt={true} />
               </div>
            ) : null}
            <p className={css`grid-column: 1 / 1; grid-row: 2 / 2;`}>Rede: </p>
            {showDeps ? (
               <div className={css`grid-column: 2/ 2; grid-row: 2 / 2;display: flex;`}>
                  <Button id={props.id} name='Total' showBtn={depsState.total >= 1}
                     isActive={activeEtAndDep[1] === 0} et={activeEtAndDep[0]} dep={0}
                     changeOnEt={false} />
                  <Button id={props.id} name='Federal' showBtn={depsState.federal >= 1}
                     isActive={activeEtAndDep[1] === 1} et={activeEtAndDep[0]} dep={1}
                     changeOnEt={false} />
                  <Button id={props.id} name='Estadual' showBtn={depsState.estadual >= 1}
                     isActive={activeEtAndDep[1] === 2} et={activeEtAndDep[0]} dep={2}
                     changeOnEt={false} />
                  <Button id={props.id} name='Municipal' showBtn={depsState.municipal >= 1}
                     isActive={activeEtAndDep[1] === 3} et={activeEtAndDep[0]} dep={3}
                     changeOnEt={false} />
                  <Button id={props.id} name='Privado' showBtn={depsState.privado >= 1}
                     isActive={activeEtAndDep[1] === 4} et={activeEtAndDep[0]} dep={4}
                     changeOnEt={false} />
                  <Button id={props.id} name='Público' showBtn={depsState.publico >= 1}
                     isActive={activeEtAndDep[1] === 5} et={activeEtAndDep[0]} dep={5}
                     changeOnEt={false} />
               </div>
            ) : null}
            <p className={css`grid-column: 1 / 1; grid-row: 3 / 3;`}>Compare: </p>
            <div className={css`grid-column: 2/ 2; grid-row: 3 / 3;display: flex;`}>
               <CompButton btn='mun' showBtn={showCompareBtns.municipio > 0} 
               name='Com o Município' et={activeEtAndDep[0]} dep={activeEtAndDep[1]}
               parentId={unidadePai} isActive={showCompareBtns.municipio > 1}
               />
               <CompButton btn='est' showBtn={showCompareBtns.estado > 0} 
               name='Com o Estado' et={activeEtAndDep[0]} dep={activeEtAndDep[1]}
               parentId={Number(String(props.id).substring(0,2))} isActive={showCompareBtns.estado > 1}
               />
               <CompButton btn='reg' showBtn={showCompareBtns.regiao > 0} 
               name='Com a Região' et={activeEtAndDep[0]} dep={activeEtAndDep[1]}
               parentId={Number(String(props.id).charAt(0))} isActive={showCompareBtns.regiao> 1}
               />
               <CompButton btn='pais' showBtn={showCompareBtns.pais > 0} 
               name='Com o país' et={activeEtAndDep[0]} dep={activeEtAndDep[1]}
              parentId={1} isActive={showCompareBtns.pais > 1}
               />
            </div>
         </div>
      </Fragment>
   )
}


export default ReportButtons