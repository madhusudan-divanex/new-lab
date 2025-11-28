import { faBell, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function Notification() {
  return (
     <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row ">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title mb-2 gradient-text">Notification</h3>
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
                                        > Notification
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="nw-thm-btn ">All  Delete </button>
                        </div>

                    </div>
                </div>

                <div className='lab-chart-crd patient-bio-tab lab-profile-bio-tab'>
                    <div className="row">
                        <div className="col-lg-12 col-dm-12 col-sm-12">
                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <span><a href="javascript:void(0)" className="notifi-remv-btn"><FontAwesomeIcon icon={faTrash}/></a></span>
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <span><a href="javascript:void(0)" className="notifi-remv-btn"><FontAwesomeIcon icon={faTrash}/></a></span>
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <span><a href="javascript:void(0)" className="notifi-remv-btn"><FontAwesomeIcon icon={faTrash}/></a></span>
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <h6>1h</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="notification-card">
                                <div className="notification-parent-card">
                                    <div className="notification-sub-card">
                                        <div>
                                            <span className="notifi-icon-bx"><FontAwesomeIcon icon={faBell} /></span>
                                        </div>
                                        <div className="notification-content">
                                            <h5>Appointment Confirmed</h5>
                                            <p>[Doctor Name]  consultation with [Patient Name] is confirmed for [Date, Time].</p>
                                        </div>
                                    </div>
                                    <div className="notification-timing">
                                        <span><a href="javascript:void(0)" className="notifi-remv-btn"><FontAwesomeIcon icon={faTrash}/></a></span>
                                        <h6>1h</h6>
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

export default Notification