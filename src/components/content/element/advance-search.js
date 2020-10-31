import React, { Fragment, useState, useRef, useEffect } from 'react';
import { cx, css } from 'emotion'
import Typewriter from 'typewriter-effect';
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
   position: relative;
   margin: 0 auto;
   top: -185px;
   z-index: 10;
   list-style: none;
   background-color: white;
   padding: 0;
   border-left: 1px solid #b3b5b3;
   border-bottom: 1px solid #b3b5b3;
   border-right: 1px solid #b3b5b3;

   @media (min-width: 992px) {
      top: -155px;
   }

   @-moz-document url-prefix() {
      top: -210px;

   }

`

const itemStyle = css`
   padding-left: 15px;
   padding-right: 15px;
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
   grid-template-rows: 40px 40px;
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
   grid-column: 1 / 1;
   grid-row: 2 / 2;
   list-style: none;
   align-self: start;
   display: flex;
   border-radius: 2px;
   padding: 0;

   @media (max-width: 767.98px) {
      font-size: 11px;
   }
    
   @media (max-width: 460.98px) {
      font-size: 9px;
      padding: 0;
   }
`

const idSpanStyle = css`
   margin-left: 8px;
   color: #C0C0C0;
   font-style: italic;
   font-size: 12px;
`
const nomeSpanStyle = css`
   display: flex;
   align-items: center;
   font-size: 15px;
`

const AdvSearch = () => {
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
      if (key !== 27) {
         if (query !== '' || query.length >= 3) {
            dispatch(userTyped(query))
         }
         const { cancel, token } = axios.CancelToken.source()

         if (query !== '') {
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
      <Fragment>
         <div className="directory_content_area">
            <div className={cx("container", css`
               height: 100%; 
               margin-top:260px;

               @media (max-width: 991px) {
                  margin-top:100px;
                  margin-bottom:100px;
               }
            `)}>
               <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                     <div className="search_title_area">
                        <div>
                           <h2 className={cx("title mr-2", css`
                              @media (min-width: 576px) and (max-width: 768px) {
                                 font-size: 2rem !important;
                              }

                              @media (min-width: 200px) and (max-width: 768px) {
                                 font-size: 1.6rem !important;
                              }
                           
                           `)}>Dados educacionais para</h2>
                           <h2 className={cx("title ml-1 title-typewriter", css`
                              @media (min-width: 576px) and (max-width: 768px) {
                                 font-size: 2rem !important;
                              }

                              @media (min-width: 200px) and (max-width: 768px) {
                                 font-size: 1.6rem !important;
                              }
                           
                           `)}><Typewriter options={{ loop: 'true' }} onInit={(typewriter) => {
                                 typewriter.typeString(' professores.')
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .typeString(' jornalistas.')
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .typeString(' gestores.')
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .typeString(' estudantes.')
                                    .pauseFor(2500)
                                    .deleteAll()
                                    .start()
                              }} /></h2>
                           <p className="sub_title">Bem-vindo ao educDATA. Nosso trabalho é fornecer dados sobre a educação brasileira.</p>
                        </div>
                     </div>{/* ends: .search_title_area */}
                     <form action="/" className="search_form">

                        <div className="atbd_seach_fields_wrapper">
                           <div className="single_search_field search_query">
                              <input className="form-control search_fields" type="text" id="search-input"
                                 placeholder="Digite o nome de uma escola, município, estado ou região"
                                 onChange={e => setQuery(e.target.value)}
                                 onKeyDown={e => setKey(e.keyCode)}
                              />
                              {isFetching ? (
                                 <div className={css`display: flex; margin-top: 10px;`}>
                                 <img className={css`
                                    width: 30px;
                                    height: 30px; 
                                 `} src={require('../../../img/spinner.gif')} />
                                 <p className={css`padding-left: 6px;`}>Aguarde enquanto carregamos os dados...</p>
                                 </div>
                              ) : null}
                           </div>
                        </div>

                     </form>{/* ends: .search_form */}
                  </div>{/* ends: .col-lg-10 */}

               </div>

            </div>
         </div>{/* ends: .directory_search_area */}

         {showResults ? (
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-10 offset-lg-1'>
                     <ul className={ulStyle}>
                        {typeof unidades === 'object' && unidades !== null ? (
                           unidades.map((unidade, index) => (
                              <li className={itemStyle} key={index}>
                                 <div className={itemContainerStyle}>
                                    {/* Link if it is ESCOLA */}
                                    {unidade.cd_tipo_unidade === 5 ? (
                                       <Fragment>
                                          <Link className={css`grid-column: 1 / 1;`} to={'/unidade/escola/' + unidade.id_unidade}
                                             onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                             <div className={nomeSpanStyle}>
                                                <p className={css`margin-bottom: 0;`}>{unidade.nm_unidade}</p>
                                                <span className={idSpanStyle}>ID: {unidade.id_unidade}</span>
                                             </div>
                                          </Link>
                                          <ul className={css`
                                             width: 100%;
                                             padding: 0;
                                             list-style: none; 
                                             display: flex;
                                             grid-column: 2 / 2;
                                             grid-row: 1 / span 2;
                                             align-self: center;
                                             justify-self: center;
                                             display: flex;
                                             flex-direction: row-reverse;
                                             flex-wrap: wrap;
                                             justify-content: end;
                                          `}>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>IDEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SAEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SPAECE</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>INFRA</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>ENEM</span>
                                             </li>
                                          </ul>
                                       </Fragment>
                                    ) : null}
                                    {/* Link if it is MUNICÍPIO */}
                                    {unidade.cd_tipo_unidade === 4 ? (
                                       <Fragment>
                                          <Link className={css`grid-column: 1 / 1;`} to={'/unidade/municipio/' + unidade.id_unidade}
                                             onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                             <div className={nomeSpanStyle}>
                                                <p className={css`margin-bottom: 0;`}>{unidade.nm_unidade}</p>
                                                <div className={idSpanStyle}>ID: {unidade.id_unidade}</div>
                                             </div>
                                          </Link>
                                          <ul className={css`
                                             width: 100%;
                                             padding: 0;
                                             list-style: none; 
                                             display: flex;
                                             grid-column: 2 / 2;
                                             grid-row: 1 / span 2;
                                             align-self: center;
                                             justify-self: center;
                                             display: flex;
                                             flex-direction: row-reverse;
                                             flex-wrap: wrap;
                                             justify-content: end; 
                                          `}>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>IDEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SAEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SPAECE</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>INFRA</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>ENEM</span>
                                             </li>
                                          </ul>
                                       </Fragment>
                                    ) : null}
                                    {/* Link if it is ESTADO */}
                                    {unidade.cd_tipo_unidade === 3 ? (
                                       <Fragment>
                                          <Link className={css`grid-column: 1 / 1;`} to={'/unidade/estado/' + unidade.id_unidade}
                                             onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                             <div className={nomeSpanStyle}>
                                                <p className={css`margin-bottom: 0;`}>{unidade.nm_unidade}</p>
                                                <div className={idSpanStyle}>ID: {unidade.id_unidade}</div>
                                             </div>
                                          </Link>
                                          <ul className={css`
                                             width: 100%;
                                             padding: 0;
                                             list-style: none; 
                                             display: flex;
                                             grid-column: 2 / 2;
                                             grid-row: 1 / span 2;
                                             align-self: center;
                                             justify-self: center;
                                             display: flex;
                                             flex-direction: row-reverse;
                                             flex-wrap: wrap;
                                             justify-content: end;
                                          `}>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>IDEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SAEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SPAECE</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>INFRA</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>ENEM</span>
                                             </li>
                                          </ul>
                                       </Fragment>
                                    ) : null}
                                    {/* Link if it is REGIÃO*/}
                                    {unidade.cd_tipo_unidade === 2 ? (
                                       <Fragment>
                                          <Link className={css`grid-column: 1 / 1;`} to={'/unidade/regiao/' + unidade.id_unidade}
                                             onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                             <div className={css`display: flex; flex-direction: column;`}>
                                                <p className={css`margin-bottom: 0;`}>{unidade.nm_unidade}</p>
                                                <div className={idSpanStyle}>ID: {unidade.id_unidade}</div>
                                             </div>
                                          </Link>
                                          <ul className={css`
                                             width: 100%;
                                             padding: 0;
                                             list-style: none; 
                                             display: flex;
                                             grid-column: 2 / 2;
                                             grid-row: 1 / span 2;
                                             align-self: center;
                                             justify-self: center;
                                             display: flex;
                                             flex-direction: row-reverse;
                                             flex-wrap: wrap;
                                             justify-content: end;
                                          `}>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>IDEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SAEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SPAECE</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>INFRA</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>ENEM</span>
                                             </li>
                                          </ul>
                                       </Fragment>
                                    ) : null}
                                    {/* Link if it is BRASIL */}
                                    {unidade.cd_tipo_unidade === 1 ? (
                                       <Fragment>
                                          <Link className={css`grid-column: 1 / 1;`} to={'/unidade/brasil/' + unidade.id_unidade}
                                             onClick={() => dispatch(unidadeChosed(unidades[index]))}>
                                             <div className={nomeSpanStyle}>
                                                <p className={css`margin-bottom: 0;`}>{unidade.nm_unidade}</p>
                                                <div className={idSpanStyle}>ID: {unidade.id_unidade}</div>
                                             </div>
                                          </Link>
                                          <ul className={css`
                                             width: 100%;
                                             padding: 0;
                                             list-style: none; 
                                             display: flex;
                                             grid-column: 2 / 2;
                                             grid-row: 1 / span 2;
                                             align-self: center;
                                             justify-self: center;
                                             display: flex;
                                             flex-direction: row-reverse;
                                             flex-wrap: wrap;
                                             justify-content: end;
                                          `}>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>IDEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SAEB</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>SPAECE</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>INFRA</span>
                                             </li>
                                             <li className={css`margin-top: 2px; margin-left: 2px;`}>
                                                <span className={cx('badge badge-primary', css`font-size: 10px; line-height: 14px;`)}>ENEM</span>
                                             </li>
                                          </ul>
                                       </Fragment>
                                    ) : null}
                                    {/* Mostrar mais resultados */}
                                    <ul className={informationStyle}>
                                       <li><span className={cx('badge badge-pill badge-info', css`
                                             font-size: 10px !important;
                                             line-height: 18px;
                                             color: white;
                                             width: 100px;
                                             `
                                       )}>{unidade.nm_tipo}</span></li>
                                       <li><span className={cx('badge badge-pill badge-primary', css`
                                             font-size: 10px !important;
                                             line-height: 18px;
                                             `
                                       )}>{unidade.nm_unidade_pai}</span></li>
                                    </ul>
                                 </div>
                              </li>
                           ))
                        ) : null}
                        <div className={css`
                           padding-top: 15px; 
                           padding-left: 15px;
                           padding-bottom: 15px; 
                        `}>
                           <Link to={'/mais-resultados?busca=' + query}>
                              Mostrar mais resultados
                           </Link>
                        </div>
                     </ul>

                  </div>
               </div>
            </div>
         ) : null}
      </Fragment>
   )
}

export default AdvSearch;