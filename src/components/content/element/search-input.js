import React, { useState, useEffect, useRef } from 'react'
import { css, cx } from 'emotion'
import { Link } from 'react-router-dom';
import {
   unidadesRequested,
   userTyped,
   userErasedAll,
   escKeyHitted,
   unidadeChosed
} from '../../../Store/action/searchActions'
import { useDispatch, useSelector } from 'react-redux'
import { debounce } from 'lodash'
import axios from 'axios'

const ulStyle = css`
   list-style: none;
   background-color: white;
   padding: 0;
   padding-top: 10px;
`

const itemStyle = css`
   text-align: left;
   text-transform: uppercase;
   font-size: 14px;
   font-weight: bold;
   &:hover {
      background-color: #f5f7fc;
   }
`
const itemContainerStyle = css`
   display: grid;
   grid-template-columns: 2fr 1fr;
   align-items: center;
   min-height: 60px;
   border-bottom: 1px solid #D3D3D3;
   
   @media (max-width: 767.98px) {
   }

   @media (max-width: 460.98px) {
   }

`
const unidadeStyle = css`
   margin: 0;
   font-size: 15px;

   @media (max-width: 767.98px) {
      font-size: 15px;
   }

   @media (max-width: 460.98px) {
      font-size: 12px;
   }
`
const informationStyle = css`
   grid-column: 2 / 2;
   font-size: 13px;
   list-style: none;
   align-self: center;
   display: flex;
   flex-direction: column;
   align-items: flex-end;

   @media (max-width: 767.98px) {
      font-size: 11px;
   }
    
   @media (max-width: 460.98px) {
      font-size: 9px;
      padding: 0;
   }
`

const idSpanStyle = css`
   font-style: italic;
   font-size: 12px;
`

const SearchInput = () => {
   const dispatch = useDispatch()
   const unidades = useSelector(state => state.search.unidades.results)
   const showResults = useSelector(state => state.search.showResults)
   const isFetching = useSelector(state => state.search.isFetching)

   const [query, setQuery] = useState('')
   const [key, setKey] = useState('')
   const debouncedUnidadesRequested = useRef(
      debounce(
         (query, cancelToken) => dispatch(unidadesRequested(query, cancelToken)),
         150
      )
   ).current

   useEffect(() => {
      if(key !== 27) {
         if (query !== '' || query.length >= 3) {
            dispatch(userTyped(query))
         }
         const { cancel, token } = axios.CancelToken.source()
         
         if(query !== '') {
            debouncedUnidadesRequested(query, token)
         } else {
            dispatch(userErasedAll())
         }
         return () => cancel('Tá tudo cancelado') || debouncedUnidadesRequested.cancel()

      } else {
         dispatch(escKeyHitted())
         document.getElementById('search-input').blur()
      }

   }, [debouncedUnidadesRequested, query, key])

   return (
      <div className="atbd_seach_fields_wrapper">
         <div className="single_search_field search_query">
            <input className="form-control search_fields" type="text" id="search-input"
               placeholder="Digite o nome de uma escola, município, estado ou região"
               onChange={e => setQuery(e.target.value)}
               onKeyDown={e => setKey(e.keyCode)} 
               />
            {isFetching ? (
               <img className={css`
                  width: 45px;
                  height: 45px; 
               `} src={require('../../../img/spinner.gif')}/>
            ) : null}
         </div>
         {showResults ? (
            <ul className={ulStyle}>
               {typeof unidades === 'object' && unidades !== null ? (
                  unidades.map((unidade, index) => (
                     <li className={itemStyle} key={index}>
                        <div className={itemContainerStyle}>
                           {/* Link if it is ESCOLA */}
                           {unidade.cd_tipo_unidade === 5 ? (
                              <Link className={css`grid-column: 1 / 1;`} to={'/unidade/escola/' + unidade.id_unidade}>
                                 <div className={css`display: flex; flex-direction: column;`}>
                                    {unidade.nm_unidade}
                                    <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                 </div>
                              </Link>
                           ) : null}
                           {/* Link if it is MUNICÍPIO */}
                           {unidade.cd_tipo_unidade === 4 ? (
                              <Link className={css`grid-column: 1 / 1;`} to={'/unidade/municipio/' + unidade.id_unidade}
                              onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                 <div className={css`display: flex; flex-direction: column;`}>
                                    {unidade.nm_unidade}
                                    <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                 </div>
                              </Link>
                           ) : null}
                           {/* Link if it is ESTADO */}
                           {unidade.cd_tipo_unidade === 3 ? (
                              <Link className={css`grid-column: 1 / 1;`} to={'/unidade/estado/' + unidade.id_unidade}>
                                 <div className={css`display: flex; flex-direction: column;`}>
                                    {unidade.nm_unidade}
                                    <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                 </div>
                              </Link>
                           ) : null}
                           {/* Link if it is REGIÃO*/}
                           {unidade.cd_tipo_unidade === 2 ? (
                              <Link className={css`grid-column: 1 / 1;`} to={'/unidade/regiao/' + unidade.id_unidade}>
                                 <div className={css`display: flex; flex-direction: column;`}>
                                    {unidade.nm_unidade}
                                    <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                 </div>
                              </Link>
                           ) : null}
                           {/* Link if it is BRASIL */}
                           {unidade.cd_tipo_unidade === 1 ? (
                              <Link className={css`grid-column: 1 / 1;`} to={'/unidade/brasil/' + unidade.id_unidade}>
                                 <div className={css`display: flex; flex-direction: column;`}>
                                    {unidade.nm_unidade}
                                    <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                 </div>
                              </Link>
                           ) : null}
                           {/* Mostrar mais resultados */}
                           <ul className={informationStyle}>
                              <li><span className='badge badge-secondary'>{unidade.nm_tipo}</span></li>
                              <li><span className='badge badge-primary'>{unidade.nm_unidade_pai}</span></li>
                           </ul>
                        </div>
                     </li>
                  ))
               ) : null}
               <Link to={'/mais-resultados?busca=' + query}>
                  Mostrar mais resultados
               </Link>
            </ul>
         ) : null}
      </div>

   )
}

export default SearchInput