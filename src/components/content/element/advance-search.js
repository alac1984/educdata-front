import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Typewriter from 'typewriter-effect';
import { loadUnidades } from '../../../Store/slices/search'
const noAction = e => e.preventDefault();


const ulStyle = css`
   list-style: none;
   background-color: white;
   padding: 0;
   padding-top: 10px;
`

const itemStyle = css`
   text-align: left;

   &:hover {
      background-color: #f5f7fc;
   }
`
const itemContainerStyle = css`
   display: grid;
   min-height: 60px;
   border-bottom: 1px solid #D3D3D3;
   grid-template-columns: 2fr 1fr;
   
   @media (max-width: 767.98px) {
   }

   @media (max-width: 460.98px) {
   }

`
const unidadeStyle = css`
   grid-column: 1 / 1;
   margin: 0;
   align-self: center;
   font-size: 17px;

   @media (max-width: 767.98px) {
      font-size: 15px;
   }

   @media (max-width: 460.98px) {
      font-size: 12px;
   }
`
const informationStyle = css`
   font-size: 13px;
   list-style: none;
   align-self: center;

   @media (max-width: 767.98px) {
      font-size: 11px;
   }
    
   @media (max-width: 460.98px) {
      font-size: 9px;
      padding: 0;
   }
`

let searchTerm = ''

class AdvSearch extends Component {
   state = {
      searching: false
   }

   handleChange = (e) => {
      this.searching = true
      searchTerm = e.target.value
      this.props.dispatch(loadUnidades(searchTerm))
      if (searchTerm === '') {
         this.searching = false
      }
   }
   render() {
      return (
         <Fragment>
            <div className={`directory_content_area ${this.searching ? "align-items-start" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-lg-10 offset-lg-1">
                        <div className="search_title_area">
                           {!this.searching ? (
                              <div>
                                 <h2 className="title mr-2">Dados educacionais para</h2>
                                 <h2 className="title ml-1 title-typewriter"><Typewriter options={{ loop: 'true' }} onInit={(typewriter) => {
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

                           ) : null}
                        </div>{/* ends: .search_title_area */}
                        <form action="/" className="search_form">
                           <div className="atbd_seach_fields_wrapper">
                              <div className="single_search_field search_query">
                                 <input className="form-control search_fields" type="text"
                                    placeholder="Digite o nome de uma escola, município, estado ou região"
                                    onChange={this.handleChange} />
                              </div>
                              {this.searching ? (
                                 <ul className={ulStyle}>
                                    {typeof this.props.results === 'object' && this.props.results !== null ? (
                                       this.props.results.map(unidade => (
                                          <li className={itemStyle} key={unidade.id_unidade}>
                                             <div className={itemContainerStyle}>
                                                <div className={unidadeStyle}>
                                                   <Link to={'/unidade/' + unidade.id_unidade}>
                                                      {unidade.nm_unidade}
                                                   </Link>
                                                </div>
                                                <ul className={informationStyle}>
                                                   <li>ID: {unidade.id_unidade}</li>
                                                   <li>Tipo: {unidade.nm_tipo}</li>
                                                   <li>Local: {unidade.nm_unidade_pai}</li>
                                                </ul>
                                             </div>
                                          </li>
                                       ))
                                    ) : console.log('não')}
                                 </ul>
                              ) : null}
                           </div>
                        </form>{/* ends: .search_form */}
                     </div>{/* ends: .col-lg-10 */}
                  </div>
               </div>
            </div>{/* ends: .directory_search_area */}
         </Fragment>
      )
   }
}

const mapStateToProps = state => {
   return {
      results: state.search.unidades.results
   }
}

export default connect(mapStateToProps)(AdvSearch);