import React, { Fragment, useState, useEffect } from 'react';
import Header from '../layout/header';
import { Footer } from '../layout/footer';
import { BreadcrumbSingle } from '../content/element/breadcrumb';
import Map1 from '../content/element/map';
import { EscolaInfo } from '../content/element/widget';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock } from '@fortawesome/free-solid-svg-icons'
import { 
    selectedUnidadeRequested,
    schoolInfoRequested,
    painelInfoRequested
} from '../../Store/action/searchActions';
import { css, cx } from 'emotion';

const noAction = e => e.preventDefault();
const infoItem = css`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 200px;
    justify-content: center;
    align-items: center;
    background-color: #EDEDED;
    height: 200px;
    border: 1px solid #B0BEA9;
`
const noBorderRight = css`
    border-right: none;
`

const ReportEscola = (props) => {
    const dispatch = useDispatch();
    const logoUrl = useSelector(state => state.logo[0].light)
    const unidade = useSelector(state => state.selectedUnidade.unidade)
    const basicInfo = useSelector(state => state.selectedUnidade.basicInfo)
    const showEscInfo = useSelector(state => state.selectedUnidade.showEscInfo)
    const painelInfo = useSelector(state => state.selectedUnidade.painelInfo.results)
    const showPainelInfo = useSelector(state => state.selectedUnidade.showPainelInfo)
    const [logo, setLogo] = useState('')
    const id = props.match.params.id

    useEffect(() => {
        dispatch(selectedUnidadeRequested(id));
        dispatch(schoolInfoRequested(id));
        dispatch(painelInfoRequested(id));
    }, [])

    useEffect(() => {
        setLogo('../../' + logoUrl)
    }, [logo])

    return (
        <Fragment>
            {/* Header section start */}
            <section className={cx("listing-details-wrapper bgimage", css`
                height: 300px; 
            `)}>
                <div className="bg_image_holder"><img src={require('../../img/reports_header.png')} alt="" />
                </div>
                <div className="mainmenu-wrapper">
                    <Header logo={logo} class="menu--light" />
                </div>
                {/* <!-- ends: .mainmenu-wrapper --> */}
                <div className={cx("listing-info content_above", css`
                    margin-top: 25px;
                `)}>
                    <div className="container">
                        <div className="row">
                            <BreadcrumbSingle filter={unidade} />
                        </div>
                    </div>
                </div>
            </section>
            {/* Header section end */}
            <section className="directory_listiing_detail_area single_area section-bg section-padding-strict">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">

                            <div className="atbd_content_module atbd_faqs_module">
                                <div className="atbd_content_module__tittle_area">
                                    <div className="atbd_area_title">
                                        <h4><span className="la la-question-circle"></span>Indicadores</h4>
                                    </div>
                                </div>
                                <div className={css`
                                    display: flex; 
                                    flex-wrap: wrap;
                                    justify-content: center;
                                `}>
                                    {showPainelInfo ? (
                                        painelInfo.map(indicador => (
                                            <div className={infoItem} key={indicador.id_painel_indicadores}>
                                                <div className={css`
                                                    font-size: 17px;
                                                    font-weight: bold;
                                                `}>{indicador.ds_indicador}</div>
                                                <div className={css`
                                                    font-size: 13px;
                                                `}>{indicador.ds_complemento ? indicador.ds_complemento : null}</div>
                                                <div className={css`
                                                    font-size: 30px;
                                                    font-weight: 700;
                                                `}>{indicador.nr_valor}{indicador.ds_medida ? indicador.ds_medida : null}</div>
                                                <div className={css`
                                                    font-size: 15px;
                                                `}>{indicador.nr_diferenca_meta ? `Para a meta: ${indicador.nr_diferenca_meta}` : null}</div>
                                                <div className={css`
                                                    justify-self: end;
                                                    font-size: 11px;
                                                `}>Fonte: {indicador.ds_fonte}</div>
                                                <div className={css`
                                                    justify-self: end;
                                                    font-size: 11px;
                                                `}>Edição: {indicador.ds_edicao}</div>
                                            </div>
                                        ))
                                    ) : null}
                                </div>
                            </div>

                            <div className="atbd_content_module">
                                <div className="atbd_content_module__tittle_area">
                                    <div className="atbd_area_title">
                                        <h4><span className="la la-map-o"></span>Localização</h4>
                                    </div>
                                </div>
                                <div className="atbdb_content_module_contents">
                                    {showEscInfo ? (
                                        <div className="map" id="map-one" style={{ position: 'relative' }}>
                                            <Map1 
                                            lat={basicInfo.nr_latitude} 
                                            long={basicInfo.nr_longitude} 
                                            zoom={15}/>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            {/* Map end */}

                        </div>
                        <div className="col-lg-4">
                            <div className="widget atbd_widget widget-card">
                                <div className="atbd_widget_title">
                                    <h4><span className="la la-user"></span>Informações Gerais</h4>
                                </div>
                                {/* <!-- ends: .atbd_widget_title --> */}
                                <EscolaInfo 
                                name={basicInfo.nm_unidade} 
                                type='Município' 
                                address={basicInfo.ds_endereco} 
                                phone={basicInfo.ds_telefone} />
                            </div>
                            {/* end seller info */}

                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Fragment>
    )
}

export default ReportEscola;