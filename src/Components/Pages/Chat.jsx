import { faPaperclip, faPaperPlane, faPhone, faSearch, faVideo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function Chat() {
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title"> Chat</h3>
                            <div className="admin-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb custom-breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#" className="breadcrumb-link">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Chat
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-3 pe-lg-0">
                        <div className="chat-left-usr-bx">
                          <div>
                              <h6>Message</h6>
                            <div className="custom-frm-bx">
                                <input
                                    type="email"
                                    className="form-control px-5"
                                    id="email"
                                    placeholder="Message"
                                    required
                                />
                                <div className="chat-search-bx">
                                    <a href="#" className="chat-search-btn">
                                        <FontAwesomeIcon icon={faSearch} />
                                    </a>
                                </div>
                            </div>

                            <a href="javascript:void(0)">
                                <div className="chat-usr-card">
                                <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>
                            </div>
                            </a>

                           <a href="javascript:void(0)">
                             <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx new-chat-usr-avatr-bx">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                                <div className="chat-count-bx me-lg-3">
                                    <a href="javascript:void(0)"><span className="chat-count-title">1</span></a>
                                </div>

                               </div>
                            </div>
                           </a>

                            <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx new-chat-usr-avatr-bx">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                               </div>
                            </div>

                            <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx ">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                               </div>
                            </div>

                            <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx new-chat-usr-avatr-bx">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                               </div>
                            </div>

                            <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx new-chat-usr-avatr-bx">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                               </div>
                            </div>

                              <div className="chat-usr-card nw-chat-usr-card">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx ">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5>Jerome Bell</h5>
                                            <p>Pesquisar chat</p>
                                        </div>
                                </div>

                               </div>
                            </div>
                          </div>




                        </div>
                    </div>
                    <div className="col-lg-9 ps-lg-0">
                        <div className="right-chat-card chat-tp-header">
                            <div className="lab-tp-title patient-bio-tab  d-flex align-items-center justify-content-between py-2">
                          <div className="">
                               <div className="d-flex align-items-center justify-content-between">
                                 <div className="chat-usr-avatr-crd">
                                        <div className="chat-usr-avatr-bx ">
                                        <img src="/chat-logo.jpg" alt="" />
                                    </div>

                                    <div className="chat-usr-info">
                                            <h5 className="mb-0">Jerome Bell</h5>
                                        </div>
                                </div>

                               </div>
                            </div>

                        <div className="add-nw-bx d-flex gap-3">
                          <button  className="text-black calling-btn">
                            <FontAwesomeIcon icon={faPhone} style={{color : "#AC39D4"}}/>
                          </button>

                          <button className="text-black calling-btn">
                            <FontAwesomeIcon icon={faVideo} style={{color : "#AC39D4"}}/>
                          </button>

                        </div>

                      </div>

                      <div className="all-chating-content-bx">
                          <div className="chat-container">
                        <div className="d-flex align-items-start mb-4">
                            <img src="chat-logo.jpg" className="chat-avatar me-2 " alt="user" />
                            <div>
                            <div className="chat-bubble nw-left">
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </div>
                            <div className="chat-time">8:00 PM</div>
                            </div>
                        </div>

                        <div className="d-flex align-items-start justify-content-end mb-4">
                            <div>
                            <div className="chat-bubble nw-right">
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </div>
                            <div className="chat-time text-end">8:00 PM</div>
                            </div>
                            <img src="chat-logo.jpg" className="chat-avatar ms-2 " alt="user"  />
                        </div>
                        </div>



                         <div className="">
                              <div className="custom-frm-bx mb-0">
                                <input type="text" className="form-control px-5" placeholder="Digite a mensagem" />

                                <div className="chat-papperclip-bx">
                                    <a href="" className="papperclip-btn"><FontAwesomeIcon icon={faPaperclip} className="paper-clip-icon"/></a>
                                </div>

                                <div className="chat-papper-plane-bx">
                                    <button className="chat-papper-plane-btn"><FontAwesomeIcon icon={faPaperPlane} className="paper-plane-icon"/></button>
                                </div>


                           </div>
                         </div>
                      </div>

                        </div>
                    </div>
                </div>



            </div>
        </>
    )
}

export default Chat