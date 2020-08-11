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
    align-items: flex-start;
    padding-left: 15px;
    height: 120px;
`

const infoItemContent = css`
    display: flex;
    flex-direction: column;
    font-size: 17px;
    width: 100%;
    height: 65%;
    color: #272b41;
    border-right: 1px solid #272b41;
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
                                `}>
                                    {showPainelInfo ? (
                                        <Fragment>
                                            <div className={infoItem}>
                                                <div className={infoItemContent}>
                                                    <div className={css`font-weight: bold;`}>{painelInfo[3].ds_indicador}</div>
                                                    <div className={css`font-size: 22px;`}>{painelInfo[3].nr_valor.replace('.0', '')}</div>
                                                    <div className={css`font-size: 10px;`}>Fonte:{painelInfo[0].ds_fonte}</div>
                                                </div>
                                            </div>
                                            <div className={infoItem}>
                                                <div className={infoItemContent}>
                                                    <div className={css`font-weight: bold;`}>{painelInfo[2].ds_indicador}</div>
                                                    <div className={css`font-size: 22px;`}>{painelInfo[2].nr_valor}</div>
                                                    <div className={css`font-size: 10px;`}>Fonte:{painelInfo[0].ds_fonte}</div>
                                                </div>
                                            </div>
                                            <div className={infoItem}>
                                                <div className={cx(infoItemContent, noBorderRight)}>
                                                    <div className={css`font-weight: bold;`}>{painelInfo[0].ds_indicador}</div>
                                                    <div className={css`font-size: 22px;`}>{painelInfo[0].nr_valor}{painelInfo[0].ds_medida}</div>
                                                    <div className={css`font-size: 10px;`}>Fonte:{painelInfo[0].ds_fonte}</div>
                                                </div>
                                            </div>
                                        </Fragment>
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
                                                zoom={15} />
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