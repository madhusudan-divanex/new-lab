import { IoCloudUploadOutline } from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faEnvelope, faFilePdf, faHome, faLocationDot, faMoneyBill, faPhone } from "@fortawesome/free-solid-svg-icons";

function ViewEmployee() {
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title">View  Employee</h3>
                            <div className="admin-breadcrumb">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb custom-breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#" className="breadcrumb-link">
                                                Dashboard
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#" className="breadcrumb-link">
                                                Employee List
                                            </a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            View  Employee
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>


                    </div>
                </div>



                <div className="view-employee-bx">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="view-employee-bx">
                                <div>
                                    <div className="view-avatr-bio-bx text-center">
                                        <img src="/view-avatr.png" alt="" />
                                        <h4>Robert Davis</h4>
                                        <p><span className="vw-id">ID:</span> STC7654</p>
                                        <h6 className="vw-activ">Active</h6>

                                    </div>

                                    <div>
                                        <ul className="vw-info-list">
                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faCalendar} /></span>
                                                <div>
                                                    <p className="vw-info-title">Join Date</p>
                                                    <p className="vw-info-value">20 July, 2025</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faCalendar} /></span>
                                                <div>
                                                    <p className="vw-info-title">Date of Birth</p>
                                                    <p className="vw-info-value">20 July, 2025</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faCalendar} /></span>
                                                <div>
                                                    <p className="vw-info-title">Gender </p>
                                                    <p className="vw-info-value">Male</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faHome} /></span>
                                                <div>
                                                    <p className="vw-info-title">Role </p>
                                                    <p className="vw-info-value">Head Nurse</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                                                <div>
                                                    <p className="vw-info-title">Email </p>
                                                    <p className="vw-info-value">david.patel @medixpro.com</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faPhone} /></span>
                                                <div>
                                                    <p className="vw-info-title">Phone </p>
                                                    <p className="vw-info-value">+91-9876543210</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faPhone} /></span>
                                                <div>
                                                    <p className="vw-info-title">Emergency Contact Name </p>
                                                    <p className="vw-info-value"><span className="fw-700">(Ravi Patel) </span> +91-9876543210</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                                                <div>
                                                    <p className="vw-info-title">Address</p>
                                                    <p className="vw-info-value">23 Medical Center Blvd, Suite 45,  jaipur,  india</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faClock} /></span>
                                                <div>
                                                    <p className="vw-info-title">Experience</p>
                                                    <p className="vw-info-value">8 years</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faMoneyBill} /></span>
                                                <div>
                                                    <p className="vw-info-title">Salary</p>
                                                    <p className="vw-info-value">$25</p>
                                                </div>
                                            </li>

                                        </ul>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-12">
                            <div className="view-employee-bx">
                                <div className="employee-tabs">
                                    <ul className="nav nav-tabs gap-3" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a
                                                className="nav-link active"
                                                id="home-tab"
                                                data-bs-toggle="tab"
                                                href="#home"
                                                role="tab"
                                            >
                                                Overview
                                            </a>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <a
                                                className="nav-link"
                                                id="profile-tab"
                                                data-bs-toggle="tab"
                                                href="#profile"
                                                role="tab"
                                            >
                                                Qualifications
                                            </a>
                                        </li>

                                        <li className="nav-item" role="presentation">
                                            <a
                                                className="nav-link"
                                                id="contact-tab"
                                                data-bs-toggle="tab"
                                                href="#contact"
                                                role="tab"
                                            >
                                                Access
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="">
                                    <div className="patient-bio-tab">
                                        <div className="tab-content" id="myTabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                            >
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">About</h4>
                                                            <p className="">Robert Davis is a board-certified cardiologist with over 8 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management.</p>
                                                        </div>

                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Specialization </h4>
                                                            <p className="">Neurology </p>
                                                        </div>

                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Contract Details </h4>
                                                            <div className="vw-contract-bx">
                                                                <div>
                                                                    <h6 className="">Contract Start </h6>
                                                                    <p>20 July, 2025</p>
                                                                </div>

                                                                <div>
                                                                    <h6 className="">Contract end</h6>
                                                                    <p>6 July, 2026</p>
                                                                </div>
                                                            </div>
                                                            <div className="vw-contract-bx mt-3">
                                                                <div>
                                                                    <h6 className="">Note</h6>
                                                                    <p>-</p>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Other </h4>
                                                            <div className="vw-contract-bx">
                                                                <div>
                                                                    <h6 className="">Employment Type</h6>
                                                                    <p>Full Time</p>
                                                                </div>

                                                                <div>
                                                                    <h6 className="">Reporting To</h6>
                                                                    <p><span className="reprting-name">Rajesh Kumar</span></p>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="profile" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-12 ps-0">
                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Education</h4>
                                                        </div>

                                                        <div className="ovrview-bx vw-qualification-main-bx mb-3">
                                                            <div className="vw-contract-bx vw-qualification-bx">
                                                                <div>
                                                                    <h6 className="vw-qualification-title">MBBS</h6>
                                                                    <p>Massachusetts General Hospital</p>
                                                                </div>

                                                                <div>
                                                                    <p>2012 to 2015</p>
                                                                </div>
                                                            </div>

                                                            <div className="vw-contract-bx vw-qualification-bx">
                                                                <div>
                                                                    <h6 className="vw-qualification-title">MBBS</h6>
                                                                    <p>Massachusetts General Hospital</p>
                                                                </div>

                                                                <div>
                                                                    <p>2012 to 2015</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Certificate </h4>
                                                            <div className="vw-contract-bx vw-qualification-main-bx">
                                                                <div>
                                                                    <h6 className="vw-qualification-title my-3">Board Certification in Cardiology</h6>
                                                                </div>
                                                            </div>
                                                            <div className="vw-contract-bx d-block vw-qualification-main-bx">
                                                                <div className="custom-frm-bx">
                                                                    <div className="form-control border-0 lablcense-frm-control">
                                                                        <div className="lablcense-bx">
                                                                            <div>
                                                                                <h6 ><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> board-certification.pdf</h6>
                                                                            </div>
                                                                            <div className="">
                                                                                <button type="" className="pdf-download-tbn">Download</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="contact" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-12 ps-0">
                                                        <div className="ovrview-bx mb-3">
                                                            <h4 className="new_title">Access</h4>
                                                        </div>

                                                        <div className="ovrview-bx  mb-3">
                                                            <div className="vw-contract-bx vw-qualification-bx">
                                                                <div>
                                                                    <h6 className="">Username</h6>
                                                                    <p>robert78</p>
                                                                </div>

                                                                <div>
                                                                    <h6 className="">Email for Access</h6>
                                                                    <p>david.patel @medixpro.com</p>
                                                                </div>

                                                                <div>
                                                                    <h6 className="">Password</h6>
                                                                    <p>robert78</p>
                                                                </div>


                                                            </div>
                                                        </div>

                                                        <div className="ovrview-bx  mb-3">
                                                            <h4 className="new_title">Permission</h4>
                                                            <div className="vw-contract-bx vw-qualification-bx">
                                                                <div>
                                                                    <h6 className="">Permission  Type</h6>
                                                                    <p>Full Permission</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

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

export default ViewEmployee