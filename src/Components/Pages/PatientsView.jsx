import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDroplet, faEnvelope, faEye, faFilePdf, faLocationDot, faPerson, faPhone, faPrint } from "@fortawesome/free-solid-svg-icons";
import { TbGridDots } from "react-icons/tb";
import { useEffect, useState } from "react";
import { getSecureApiData } from "../../services/api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import base_url from "../../../baseUrl";

function PatientsView() {
    const params = useParams()
    const patientId = params.id
    const userId = localStorage.getItem('userId')
    const [appointments, setAppointments] = useState([])
    const [ptData, setPtData] = useState()
    const [medicalHistory, setMedicalHistory] = useState()
    const [demographicData, setDemographicData] = useState()
    const [prescriptionData, setPrescriptionData] = useState()
    const [labAppointments, setLabAppointments] = useState([])
    const fetchPatient = async () => {
        try {
            const response = await getSecureApiData(`patient/detail/${patientId}`);
            if (response.success) {
                setPtData(response.user)
                setMedicalHistory(response.medicalHistory)
                setDemographicData(response.demographic)
                setPrescriptionData(response.prescription)
                setLabAppointments(response.labAppointment)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    useEffect(() => {
        fetchPatient()
    }, [userId])
    const calculateAge = (dob) => {
        if (!dob) return "";

        const birthDate = new Date(dob);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; // haven't had birthday yet this year
        }

        return age;
    };

    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title">Test Request</h3>
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
                                            Test Request
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>


                    </div>
                </div>



                <div className="view-employee-bx patient-view-bx">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="view-employee-bx patient-vw-main">
                                <div>
                                    <div className="view-avatr-bio-bx text-center">
                                        <img src={ptData?.profileImage ? `${base_url}/${ptData?.profileImage}` : "/view-avatr.png"} alt="" />
                                        <h4>{ptData?.name}</h4>
                                        <p><span className="vw-id">ID:</span> {ptData?._id?.slice(-10)}</p>
                                        <h6 className="vw-activ text-capitalize">{ptData?.status}</h6>

                                    </div>

                                    <div>
                                        <ul className="vw-info-list">
                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faPerson} /></span>
                                                <div>
                                                    <p className="vw-info-title">Age</p>
                                                    <p className="vw-info-value">{calculateAge(demographicData?.dob)} Years</p>
                                                </div>

                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faCalendar} /></span>
                                                <div>
                                                    <p className="vw-info-title">Gender </p>
                                                    <p className="vw-info-value text-capitalize">{ptData?.gender}</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faDroplet} /></span>
                                                <div>
                                                    <p className="vw-info-title">Blood  Group </p>
                                                    <p className="vw-info-value">{demographicData?.bloodGroup}</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                                                <div>
                                                    <p className="vw-info-title">Email </p>
                                                    <p className="vw-info-value">{ptData?.email}</p>
                                                </div>
                                            </li>

                                            <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faPhone} /></span>
                                                <div>
                                                    <p className="vw-info-title">Phone </p>
                                                    <p className="vw-info-value">{ptData?.contactNumber}</p>
                                                </div>
                                            </li>

                                            {/* <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faPhone} /></span>
                                                <div>
                                                    <p className="vw-info-title">Emergency Contact Name </p>
                                                    <p className="vw-info-value"><span className="fw-700">(Ravi Patel) </span> +91-9876543210</p>
                                                </div>
                                            </li> */}

                                            {/* <li className="vw-info-item">
                                                <span className="vw-info-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                                                <div>
                                                    <p className="vw-info-title">Address</p>
                                                    <p className="vw-info-value">{23 Medical Center Blvd, Suite 45,  jaipur,  india}</p>
                                                </div>
                                            </li> */}

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
                                                Lab Appointments
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
                                                Lab Reports
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
                                                Other Personal Details
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="">
                                    <div className="patient-bio-tab px-0">
                                        <div className="tab-content" id="myTabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                            >
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="table-section admin-mega-section">
                                                            <div className="table table-responsive mb-0">
                                                                <table className="table mb-0">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Appointment  Id</th>
                                                                            <th>Patient Details</th>
                                                                            <th>Appointment  </th>
                                                                            <th>Status</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>

                                                                        {labAppointments?.length > 0 &&
                                                                            labAppointments?.map((item, key) =>
                                                                                <tr key={key}>
                                                                                    <td>{key + 1}</td>
                                                                                    <td>  #{item?._id?.slice(-10)}</td>
                                                                                    <td>
                                                                                        <div className="admin-table-bx">
                                                                                            <div className="admin-table-sub-bx">
                                                                                                <img src={ptData?.profileImage ? `${base_url}/${ptData?.profileImage}` : "/admin-tb-logo.png"} alt="" />
                                                                                                <div className="admin-table-sub-details">
                                                                                                    <h6>{ptData?.name}</h6>
                                                                                                    <p>ID: {ptData?._id?.slice(-10)}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td>
                                                                                        <ul className="ad-info-list">
                                                                                            <li className="ad-info-item patient-report-item"><span className="ad-info-title"></span>Appointment ID : #{item?._id?.slice(-10)}</li>
                                                                                            <li className="ad-info-item"><span className="ad-info-title">Appointment Book Date : {item?.date && new Date(item?.date)?.toLocaleDateString("en-GB", {
                                                                                                day: "2-digit",
                                                                                                month: "short",
                                                                                                year: "numeric"
                                                                                            })}</span></li>
                                                                                            <li className="ad-info-item"><span className="ad-info-title">Total Amount  :  ${item?.fees}</span></li>
                                                                                        </ul>
                                                                                    </td>

                                                                                    <td ><span className="approved approved-active fw-400 text-capitalize">{item?.status}</span></td>
                                                                                    {/* <td>
                                                                                <a
                                                                                    href="javascript:void(0)"
                                                                                    className="grid-dots-btn"
                                                                                >
                                                                                    <TbGridDots />
                                                                                </a>
                                                                            </td> */}

                                                                                    <td>
                                                                                        <a
                                                                                            href="javascript:void(0)"
                                                                                            className="grid-dots-btn "
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"
                                                                                        >

                                                                                            <TbGridDots />
                                                                                        </a>

                                                                                        <div class="dropdown">
                                                                                            <a
                                                                                                href="javascript:void(0)"
                                                                                                class="attendence-edit-btn"
                                                                                                id="acticonMenu1"
                                                                                                data-bs-toggle="dropdown"
                                                                                                aria-expanded="false"
                                                                                            >
                                                                                            </a>
                                                                                            <ul
                                                                                                class="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                                                                                                aria-labelledby="acticonMenu1"
                                                                                            >
                                                                                                <li className="drop-item">
                                                                                                    <a
                                                                                                        class="nw-dropdown-item"
                                                                                                        href="#"
                                                                                                        data-bs-toggle="modal"
                                                                                                        data-bs-target="#attendance-edit"
                                                                                                    >
                                                                                                        <img src="/flask-report.png" alt="" />
                                                                                                        Edit Report
                                                                                                    </a>
                                                                                                </li>
                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/add-user.png" alt="" />
                                                                                                        Patient Details
                                                                                                    </a>
                                                                                                </li>
                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/flask-report.png" alt="" />
                                                                                                        Appointment Details
                                                                                                    </a>
                                                                                                </li>

                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/reprt-icon.png" alt="" />
                                                                                                        Generate Report
                                                                                                    </a>
                                                                                                </li>

                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/barcd-icon.png" alt="" />
                                                                                                        Labels
                                                                                                    </a>
                                                                                                </li>

                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/file.png" alt="" />
                                                                                                        Report  view
                                                                                                    </a>
                                                                                                </li>
                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/file.png" alt="" />
                                                                                                        Invoice
                                                                                                    </a>
                                                                                                </li>
                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/dc-usr.png" alt="" />
                                                                                                        Send  Report Doctor
                                                                                                    </a>
                                                                                                </li>



                                                                                                <li className="drop-item">
                                                                                                    <a class="nw-dropdown-item" href="#">
                                                                                                        <img src="/add-user.png" alt="" />
                                                                                                        Send  Report Patient
                                                                                                    </a>
                                                                                                </li>
                                                                                            </ul>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>)}

                                                                        {/* <tr>
                                                                            <td>02.</td>
                                                                            <td>  #89324879</td>
                                                                            <td>
                                                                                <div className="admin-table-bx">
                                                                                    <div className="admin-table-sub-bx">
                                                                                        <img src="/admin-tb-logo.png" alt="" />
                                                                                        <div className="admin-table-sub-details">
                                                                                            <h6>Sunil</h6>
                                                                                            <p>ID: SU3320</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <ul className="ad-info-list">
                                                                                    <li className="ad-info-item patient-report-item"><span className="ad-info-title"></span>Appointment ID : #0959595</li>
                                                                                    <li className="ad-info-item"><span className="ad-info-title">Appointment Book Date : 20 jun 2025</span></li>
                                                                                    <li className="ad-info-item"><span className="ad-info-title">Total Amount  :  $25</span></li>
                                                                                </ul>
                                                                            </td>

                                                                            <td ><span className="approved approved-active fw-400">Deliver Report</span></td>
                                                                            <td>
                                                                                <a
                                                                                    href="javascript:void(0)"
                                                                                    className="grid-dots-btn "
                                                                                    data-bs-toggle="dropdown"
                                                                                    aria-expanded="false"
                                                                                >

                                                                                    <TbGridDots />
                                                                                </a>

                                                                                <div class="dropdown">
                                                                                    <a
                                                                                        href="javascript:void(0)"
                                                                                        class="attendence-edit-btn"
                                                                                        id="acticonMenu1"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"
                                                                                    >
                                                                                    </a>
                                                                                    <ul
                                                                                        class="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                                                                                        aria-labelledby="acticonMenu1"
                                                                                    >
                                                                                        <li className="drop-item">
                                                                                            <a
                                                                                                class="nw-dropdown-item"
                                                                                                href="#"
                                                                                                data-bs-toggle="modal"
                                                                                                data-bs-target="#attendance-edit"
                                                                                            >
                                                                                                <img src="/flask-report.png" alt="" />
                                                                                                Edit Report
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/add-user.png" alt="" />
                                                                                                Patient Details
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/flask-report.png" alt="" />
                                                                                                Appointment Details
                                                                                            </a>
                                                                                        </li>

                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/reprt-icon.png" alt="" />
                                                                                                Generate Report
                                                                                            </a>
                                                                                        </li>

                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/barcd-icon.png" alt="" />
                                                                                                Labels
                                                                                            </a>
                                                                                        </li>

                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/file.png" alt="" />
                                                                                                Report  view
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/file.png" alt="" />
                                                                                                Invoice
                                                                                            </a>
                                                                                        </li>
                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/dc-usr.png" alt="" />
                                                                                                Send  Report Doctor
                                                                                            </a>
                                                                                        </li>



                                                                                        <li className="drop-item">
                                                                                            <a class="nw-dropdown-item" href="#">
                                                                                                <img src="/add-user.png" alt="" />
                                                                                                Send  Report Patient
                                                                                            </a>
                                                                                        </li>
                                                                                    </ul>
                                                                                </div>
                                                                            </td>
                                                                        </tr> */}




                                                                    </tbody>
                                                                </table>
                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="profile" role="tabpanel">
                                                <div className="row">

                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="qrcode-prescriptions-bx">
                                                            <div className="admin-table-bx d-flex align-items-center justify-content-between qr-cd-headr">
                                                                <div className="admin-table-sub-details final-reprt d-flex align-items-center gap-2">
                                                                    <img src="/reprt-plus.png" alt="" className="rounded-0" />
                                                                    <div>
                                                                        <h6 className="fs-16 fw-600 text-black">Final Diagnostic Report</h6>
                                                                        <p>RE-89767</p>

                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="barcode-active-bx">
                                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                                    <div className="admin-table-bx">
                                                                        <div className="">
                                                                            <div className="admin-table-sub-details d-flex align-items-center gap-2 doctor-title ">
                                                                                <div>
                                                                                    <h6 className="reprting-name">Advance Lab Tech</h6>
                                                                                    <p className="fs-14 fw-500">DO-4001</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex align-items gap-2">
                                                                        <button type="button" className="card-sw-btn"><FontAwesomeIcon icon={faPrint} /></button>
                                                                        <button type="button" className="card-sw-btn"><FontAwesomeIcon icon={faEye} /></button>
                                                                    </div>
                                                                </div>

                                                                <div className="barcd-scannr barcde-scnnr-card">
                                                                    <div className="barcd-content">
                                                                        <h4 className="fw-700 mb-2">SP-9879</h4>
                                                                        <ul className="qrcode-list mb-2">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>


                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>

                                                                    <div className="barcode-id-details mt-2">
                                                                        <div>
                                                                            <h6>Patient Id </h6>
                                                                            <p>PS-9001</p>
                                                                        </div>


                                                                        <div>
                                                                            <h6>Appointment ID </h6>
                                                                            <p>OID-8876</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="text-start mt-3">
                                                                    <button className="pdf-download-tbn py-2"><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Download Report</button>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="qrcode-prescriptions-bx">
                                                            <div className="admin-table-bx d-flex align-items-center justify-content-between qr-cd-headr">
                                                                <div className="admin-table-sub-details final-reprt d-flex align-items-center gap-2">
                                                                    <img src="/reprt-plus.png" alt="" className="rounded-0" />
                                                                    <div>
                                                                        <h6 className="fs-16 fw-600 text-black">Final Diagnostic Report</h6>
                                                                        <p>RE-89767</p>

                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="barcode-active-bx">
                                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                                    <div className="admin-table-bx">
                                                                        <div className="">
                                                                            <div className="admin-table-sub-details d-flex align-items-center gap-2 doctor-title ">
                                                                                <div>
                                                                                    <h6 className="reprting-name">Advance Lab Tech</h6>
                                                                                    <p className="fs-14 fw-500">DO-4001</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                </div>

                                                                <div className="barcd-scannr barcde-scnnr-card">
                                                                    <div className="barcd-content">
                                                                        <h4 className="fw-700 mb-2">SP-9879</h4>
                                                                        <ul className="qrcode-list mb-2">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>


                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>

                                                                    <div className="barcode-id-details mt-2">
                                                                        <div>
                                                                            <h6>Patient Id </h6>
                                                                            <p>PS-9001</p>
                                                                        </div>


                                                                        <div>
                                                                            <h6>Appointment ID </h6>
                                                                            <p>OID-8876</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="text-start mt-3">
                                                                    <button className="pdf-download-tbn py-2"><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Download Report</button>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="qrcode-prescriptions-bx">
                                                            <div className="admin-table-bx d-flex align-items-center justify-content-between qr-cd-headr">
                                                                <div className="admin-table-sub-details final-reprt d-flex align-items-center gap-2">
                                                                    <img src="/reprt-plus.png" alt="" className="rounded-0" />
                                                                    <div>
                                                                        <h6 className="fs-16 fw-600 text-black">Final Diagnostic Report</h6>
                                                                        <p>RE-89767</p>

                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="barcode-active-bx">
                                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                                    <div className="admin-table-bx">
                                                                        <div className="">
                                                                            <div className="admin-table-sub-details d-flex align-items-center gap-2 doctor-title ">
                                                                                <div>
                                                                                    <h6 className="reprting-name">Advance Lab Tech</h6>
                                                                                    <p className="fs-14 fw-500">DO-4001</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                </div>

                                                                <div className="barcd-scannr barcde-scnnr-card">
                                                                    <div className="barcd-content">
                                                                        <h4 className="fw-700 mb-2">SP-9879</h4>
                                                                        <ul className="qrcode-list mb-2">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>


                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>

                                                                    <div className="barcode-id-details mt-2">
                                                                        <div>
                                                                            <h6>Patient Id </h6>
                                                                            <p>PS-9001</p>
                                                                        </div>


                                                                        <div>
                                                                            <h6>Appointment ID </h6>
                                                                            <p>OID-8876</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="text-start mt-3">
                                                                    <button className="pdf-download-tbn py-2"><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Download Report</button>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="qrcode-prescriptions-bx">
                                                            <div className="admin-table-bx d-flex align-items-center justify-content-between qr-cd-headr">
                                                                <div className="admin-table-sub-details final-reprt d-flex align-items-center gap-2">
                                                                    <img src="/reprt-plus.png" alt="" className="rounded-0" />
                                                                    <div>
                                                                        <h6 className="fs-16 fw-600 text-black">Final Diagnostic Report</h6>
                                                                        <p>RE-89767</p>

                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="barcode-active-bx">
                                                                <div className="d-flex align-items-center justify-content-between mb-3">
                                                                    <div className="admin-table-bx">
                                                                        <div className="">
                                                                            <div className="admin-table-sub-details d-flex align-items-center gap-2 doctor-title ">
                                                                                <div>
                                                                                    <h6 className="reprting-name">Advance Lab Tech</h6>
                                                                                    <p className="fs-14 fw-500">DO-4001</p>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>


                                                                </div>

                                                                <div className="barcd-scannr barcde-scnnr-card">
                                                                    <div className="barcd-content">
                                                                        <h4 className="fw-700 mb-2">SP-9879</h4>
                                                                        <ul className="qrcode-list mb-2">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>


                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>

                                                                    <div className="barcode-id-details mt-2">
                                                                        <div>
                                                                            <h6>Patient Id </h6>
                                                                            <p>PS-9001</p>
                                                                        </div>


                                                                        <div>
                                                                            <h6>Appointment ID </h6>
                                                                            <p>OID-8876</p>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="text-start mt-3">
                                                                    <button className="pdf-download-tbn py-2"><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Download Report</button>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>



                                                </div>
                                            </div>

                                            <div className="tab-pane fade" id="contact" role="tabpanel">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="">
                                                            <div className="ovrview-bx mb-3">
                                                                <h4 className="new_title">Medical History</h4>
                                                                {/* <p className="">Robert Davis is a board-certified cardiologist with over 8 years of experience in diagnosing and treating heart conditions. She specializes in preventive cardiology and heart failure management.</p> */}
                                                            </div>

                                                            <div className="medical-history-content">
                                                                <div>
                                                                    <h4 className="fz-16 fw-700">Do you have any chronic conditions?</h4>
                                                                    <h5 className="hearth-disese">{medicalHistory?.chronicCondition}</h5>
                                                                </div>

                                                                <div className="mt-3">
                                                                    <h4 className="fz-16 fw-700">Are you currently on any medications?</h4>
                                                                    <h5 className="hearth-disese">{medicalHistory?.onMedication ? 'Yes' : 'No'}</h5>
                                                                </div>

                                                            </div>

                                                            <div className="medical-history-content my-3">
                                                                <div>
                                                                    <h4 className="fz-16 fw-700">Medication Details</h4>
                                                                    <p>ACE Inhibitors (Twice daily)</p>
                                                                    <p>Beta Blockers  (Once daily)</p>
                                                                </div>

                                                                <div className="mt-3">
                                                                    <h4 className="fz-16 fw-700">Allergies</h4>
                                                                    <p>Penicillin</p>
                                                                    <p>Peanuts</p>
                                                                </div>

                                                            </div>

                                                            <div className="ovrview-bx mb-3">
                                                                <h4 className="new_title">Family Medical History</h4>
                                                            </div>
                                                            <div className="medical-history-content my-3">
                                                                <div>
                                                                    <h4 className="fz-16 fw-700">Any family history of chronic disease?</h4>
                                                                    <h5 className="hearth-disese">{medicalHistory?.familyHistory?.chronicHistory}</h5>

                                                                </div>

                                                                <div className="mt-3">
                                                                    <h4 className="fz-16 fw-700">Chronic Diseases in Family</h4>
                                                                    <p> {medicalHistory?.familyHistory?.diseasesInFamiy}</p>
                                                                    {/* <p>Mother: Osteoarthritis</p>
                                                                    <p>Maternal Grandfather: Heart Disease</p>
                                                                    <p>Paternal Grandmother: Stroke</p> */}
                                                                </div>

                                                            </div>

                                                            <div className="ovrview-bx mb-3">
                                                                <h4 className="new_title">Prescriptions and Reports</h4>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="prescription-patients-card">
                                                                        <div className="prescription-patients-picture">
                                                                            <img src="/patient-card-one.png" alt="" />
                                                                        </div>
                                                                        <div className="card-details-bx">
                                                                            <div className="card-info-title">
                                                                                <h3>CBC Report 8/21/2025</h3>
                                                                                <p>8/21/2025</p>
                                                                            </div>

                                                                            <div className="">
                                                                                <button type="button" className="card-sw-btn"><FontAwesomeIcon icon={faEye} /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="col-lg-6">
                                                                    <div className="prescription-patients-card">
                                                                        <div className="prescription-patients-picture">
                                                                            <img src="/patient-card-two.png" alt="" />
                                                                        </div>
                                                                        <div className="card-details-bx">
                                                                            <div className="card-info-title">
                                                                                <h3>Prescriptions 8/21/2025</h3>
                                                                                <p>8/21/2025</p>
                                                                            </div>

                                                                            <div className="">
                                                                                <button type="button" className="card-sw-btn"><FontAwesomeIcon icon={faEye} /></button>
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
                    </div>
                </div>

            </div>
        </>
    )
}

export default PatientsView