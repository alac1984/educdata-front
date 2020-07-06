import React, { Component, Fragment } from 'react';
const noAction = e => e.preventDefault();
export class Subscribe extends Component {

    render() {
        return (
            <Fragment>
                <section className="subscribe-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <h1>Entre em contato conosco</h1>
                                <p>Para falar conosco, informe-nos seu email para contato.</p>
                                <form action="/" className="subscribe-form m-top-40">
                                    <div className="form-group">
                                        <span className="la la-envelope-o"></span>
                                        <input type="text" placeholder="Digite seu email" required />
                                    </div>
                                    <button className="btn btn-gradient btn-gradient-one" onClick={noAction}>Enviar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

