import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Typewriter from 'typewriter-effect';
import { loadUnidades } from '../../../Store/slices/search'
const noAction = e => e.preventDefault();

let searchTerm = ''

class AdvSearch extends Component {
    state = {
        searching: false
    }

    handleChange = (e) => {
        this.searching = true
        console.log(this.searching)
        searchTerm = e.target.value
        this.props.dispatch(loadUnidades(searchTerm))
        if (searchTerm === '') {
            this.searching = false
            console.log(this.searching)
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
                                        <div className="atbd_submit_btn">
                                            <button type="submit" onClick={noAction} className="btn btn-block btn-gradient btn-gradient-one btn-md btn_search">Buscar</button>
                                        </div>
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
        results: state.search.unidades
    }
}

export default connect(mapStateToProps)(AdvSearch);