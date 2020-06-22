import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
export class NavItem extends Component {
    render() {
        return (
            <Fragment>            
                <ul className="navbar-nav">
                    <li>
                        <NavLink to="/">Início</NavLink>
                    </li>
                    <li className="dropdown has_dropdown">
                        <a href="# " className="dropdown-toggle" id="drop3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dados</a>
                        <ul className="dropdown-menu" aria-labelledby="drop3">
                            <li><NavLink to="/all-listings-grid">Pesquisas</NavLink></li>
                            <li><NavLink to="/all-listings-list">Metodologia</NavLink></li>
                        </ul>
                    </li>
                    <li className="dropdown has_dropdown">
                        <a href="# " className="dropdown-toggle" id="drop4" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Downloads</a>
                        <ul className="dropdown-menu" aria-labelledby="drop4">
                            <li><NavLink to="/all-categories">IDEB</NavLink></li>
                            <li><NavLink to="/all-locations">SAEB</NavLink></li>
                            <li><NavLink to="/all-locations">ENEM</NavLink></li>
                        </ul>
                    </li>
                    <li> 
                        <a className="dropdown-toggle" href="# " id="drop2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Contato
                        </a>
                    </li>
                    <li className="dropdown has_dropdown">
                        <NavLink to="/">Blog</NavLink>
                    </li>
                </ul>
            </Fragment>
        )
    }
}