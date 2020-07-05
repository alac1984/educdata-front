import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Chart from '../../custom/landing-page-chart';
import { css } from 'emotion';
const noAction = e => e.preventDefault();
const data = require('../../custom/data.json')
const chartStyle = css`
    width: 51vw;
    max-width: 700px;
    height: 72vh;
    max-height: 590px;
    margin-left: -3vw;
    margin-top: -5vh;

    @media (max-width: 1300px) {
        width: 53vw;
    }

    @media (max-width: 1200px) {
        width: 50vw;
    }

    @media (max-width: 991px) {
        width: 40vw;
    }

    @media (max-width: 767px) {
        width: 96vw;
    }
`

export class ContentBlockHome extends Component {

    render() {
        return (
            <Fragment>
                <section className="cta section-padding border-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title">
                                    <h2>Faça <span>comparações</span> e encontre soluções</h2>
                                    <p>Há várias formas de utilizar nossa plataforma. Vamos à algumas delas:</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row align-items-center">
                                    <div className="col-lg-6 col-md-6">
                                        <div className={chartStyle}>
                                            <Chart data={data}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 offset-lg-1 col-md-6 mt-5 mt-md-0">
                                        <ul className="feature-list-wrapper list-unstyled">
                                            <li>
                                                <div className="icon"><span className="circle-secondary"><i className="la la-check-circle"></i></span></div>
                                                <div className="list-content">
                                                    <h4>Use o site assim</h4>
                                                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon"><span className="circle-success"><i className="la la-money"></i></span></div>
                                                <div className="list-content">
                                                    <h4>Outra forma de fazer</h4>
                                                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="icon"><span className="circle-primary"><i className="la la-line-chart"></i></span></div>
                                                <div className="list-content">
                                                    <h4>Um terceiro jeito</h4>
                                                    <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                </div>
                                            </li>
                                        </ul>{/*<!-- ends: .feature-list-wrapper -->*/}
                                        <ul className="action-btns list-unstyled">
                                            <li><NavLink onClick={noAction} to="/at_demo" className="btn btn-success">Comparar do jeito 1</NavLink></li>
                                            <li><NavLink onClick={noAction} to="/at_demo" className="btn btn-primary">Comparar do jeito 2</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export class ContentBlockAbout extends Component {

    render() {
        return (
            <Fragment>
                <section className="about-contents section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 contents-wrapper">
                                <div className="contents">
                                    <div className="row align-items-center">
                                        <div className="col-lg-5 col-sm-6">
                                            <img src="./assets/img/about-img1.png" alt="" />
                                        </div>
                                        <div className="col-lg-6 offset-lg-1 col-sm-6 mt-5 mt-md-0">
                                            <h1>About Our Community and Our Expertise</h1>
                                            <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia
                                                runmollit anim laborum occaecat cupidatat proident. Cupidatat non
                                                proident sunt in culpa officia deserunt.</p>
                                        </div>
                                    </div>
                                </div>{/*<!-- ends: .contents -->*/}
                                <div className="contents">
                                    <div className="row align-items-center">
                                        <div className="col-lg-5 col-sm-6">
                                            <h1>Why List on <span>Direo</span></h1>
                                            <ul className="list-unstyled list-features p-top-15">
                                                <li>
                                                    <div className="list-count"><span>1</span></div>
                                                    <div className="list-content">
                                                        <h4>Easy Registration</h4>
                                                        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="list-count"><span>2</span></div>
                                                    <div className="list-content">
                                                        <h4>Promote your Listing</h4>
                                                        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="list-count"><span>3</span></div>
                                                    <div className="list-content">
                                                        <h4>Great Sales Benefits</h4>
                                                        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa officia deserunt mollit.</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 offset-lg-1 text-right col-sm-6 mt-5 mt-md-0">
                                            <img src="./assets/img/about-img2.png" alt="" />
                                        </div>
                                    </div>
                                </div>{/*<!-- ends: .contents -->*/}
                            </div>{/*<!-- ends: .content-block -->*/}
                        </div>
                    </div>
                </section>
                
            </Fragment>
        )
    }
}

