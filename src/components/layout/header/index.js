import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../navbar/navItem';
import { connect } from 'react-redux';
import { LogOut } from '../../../Store/action/logoutAction';
const noAction = e => e.preventDefault();
class Header extends Component {    
    render() {
                      
        const logdIn = () => {
            return this.props.login
        }
       const logOut = (e) => {
            e.preventDefault();
            this.props.logOutdata(null);
       }
        return (
            <Fragment>
            
                <div className={"menu-area menu1 "+this.props.class}>
                    <div className="top-menu-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="menu-fullwidth d-flex justify-content-between">
                                        <div className="logo-wrapper order-lg-0 order-sm-1">
                                            <div className="logo logo-top">
                                                <NavLink to="/"><img src={this.props.logo} alt="logoImage" className="img-fluid"/></NavLink>
                                            </div>
                                        </div>{/*<!-- ends: .logo-wrapper -->*/}
                                        <div className="menu-container">
                                            <div className="d_menu">
                                                <nav className="navbar navbar-expand-lg mainmenu__menu">
                                                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#direo-navbar-collapse" aria-controls="direo-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                                                        <span className="navbar-toggler-icon icon-menu"><i className="la la-reorder"></i></span>
                                                    </button>
                                                    {/*<!-- Collect the nav links, forms, and other content for toggling -->*/}
                                                    <div className="collapse navbar-collapse" id="direo-navbar-collapse">
                                                        <NavItem />
                                                    </div>
                                                    {/*<!-- /.navbar-collapse -->*/}
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- end /.row --> */}
                        </div>
                        {/* <!-- end /.container --> */}
                    </div>
                    {/* <!-- end  --> */}
                </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        login : state.login
    }
}
const mapDispatchToProp = dispatch => {
    return {
        logOutdata : (login) => dispatch(LogOut(login))
    }
}
export default connect(mapStateToProps, mapDispatchToProp)(Header)