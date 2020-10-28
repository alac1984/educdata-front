import React, { Fragment } from 'react';
import { useSelector } from 'react-redux'
import { cx, css } from 'emotion'
import Typewriter from 'typewriter-effect';
import SearchInput from './search-input'

const AdvSearch = () => {

   return (
      <Fragment>
         <div className="directory_content_area">
            <div className="container">
               <div className="row">
                  <div className={cx("col-lg-10 offset-lg-1", css`
                     padding-bottom: 120px;
                  `)}>
                     <div className="search_title_area">
                        <div>
                           <h2 className="title mr-2">Dados educacionais para</h2>
                           <h2 className="title ml-1 primary-color title-typewriter"><Typewriter options={{ loop: 'true' }} onInit={(typewriter) => {
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
                        <SearchInput />
                     </form>{/* ends: .search_form */}
                  </div>{/* ends: .col-lg-10 */}
               </div>
            </div>
         </div>{/* ends: .directory_search_area */}
      </Fragment>
   )
}

export default AdvSearch;