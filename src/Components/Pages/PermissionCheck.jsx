import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiTagChevronFill } from "react-icons/pi";

function PermissionCheck() {
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <form action="">
                    <div className="row mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h3 className="innr-title">Permission</h3>
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
                                                Permission
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>



                <div className="submega-main-bx">
                  <form action="">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="permission-check-main-bx">
                                <h4> <PiTagChevronFill className="test-requst-icon" />Test  Request Management</h4>
                                <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="checkSingle" />
                                    <label className="form-check-label" for="checkSingle">
                                        Test  Request
                                    </label>
                                </div>

                            </div>

                            <div className="permission-check-main-bx my-4">
                                <h4> <PiTagChevronFill className="test-requst-icon" />Tests Management</h4>
                               <div>
                                <ul className="permision-check-list">
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="addTests" />
                                    <label className="form-check-label" for="addTests">
                                        Add  Tests
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="editTests" />
                                    <label className="form-check-label" for="editTests">
                                        Edit  Test
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="viewTests" />
                                    <label className="form-check-label" for="viewTests">
                                        View  Test
                                    </label>
                                </div>
                                    </li>
                                </ul>
                               </div>

                            </div>

                            <div className="permission-check-main-bx my-4">
                                <h4> <PiTagChevronFill className="test-requst-icon" />Lab Reports Management</h4>
                               <div>
                                <ul className="permision-check-list">
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="reportsList" />
                                    <label className="form-check-label" for="reportsList">
                                        View  Lab Reports List
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="export" />
                                    <label className="form-check-label" for="export">
                                        Export
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="editReport" />
                                    <label className="form-check-label" for="editReport">
                                        Edit Report
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="patientDetails" />
                                    <label className="form-check-label" for="patientDetails">
                                        Patient Details
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="appointment" />
                                    <label className="form-check-label" for="appointment">
                                        Appointment Details
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="reportEmail" />
                                    <label className="form-check-label" for="reportEmail">
                                        Send  Report  Email
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="printReport" />
                                    <label className="form-check-label" for="printReport">
                                        Print Report
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="addReport" />
                                    <label className="form-check-label" for="addReport">
                                        Add Report
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="patientCall" />
                                    <label className="form-check-label" for="patientCall">
                                        Patient Call
                                    </label>
                                </div>
                                    </li>

                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="patientEmail" />
                                    <label className="form-check-label" for="patientEmail">
                                        Patient Email
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="paymentStatus" />
                                    <label className="form-check-label" for="paymentStatus">
                                        Payment Status
                                    </label>
                                </div>
                                    </li>
                                    <li>
                                         <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="appointmentStatus" />
                                    <label className="form-check-label" for="appointmentStatus">
                                        Appointment Status
                                    </label>
                                </div>
                                    </li>
                                </ul>
                               </div>

                            </div>

                            <div className="permission-check-main-bx">
                                <h4> <PiTagChevronFill className="test-requst-icon" />Chat Management</h4>
                                <div className="form-check custom-check">
                                    <input className="form-check-input" type="checkbox" value="" id="chat" />
                                    <label className="form-check-label" for="chat">
                                        Chat 
                                    </label>
                                </div>

                            </div>

                            <div className="text-end">
                                <button className="nw-filtr-thm-btn ">Save </button>
                            </div>



                        </div>
                    </div>
                  </form>
                </div>
            </div>
        </>
    )
}

export default PermissionCheck