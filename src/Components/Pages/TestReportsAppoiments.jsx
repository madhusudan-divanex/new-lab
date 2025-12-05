import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGear,
  faPen,
  faSearch,

} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { getSecureApiData, securePostData, updateApiData } from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../../../baseUrl";

function TestReportsAppoiments() {
  const userId = localStorage.getItem('userId')
  const [allTest, setAllTest] = useState([])
  const [payData, setPayData] = useState({ appointmentId: null, paymentStatus: 'due' })
  const [actData, setActData] = useState({ appointmentId: null, status: '' })
  const fetchLabTest = async () => {
    try {
      const response = await getSecureApiData(`lab/test/${userId}`);
      if (response.success) {
        // setCurrentPage(response.pagination.page)
        // setTotalPage(response.pagination.totalPages)
        setAllTest(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
  useEffect(() => {
    fetchLabTest()
    fetchLabAppointment()
  }, [userId])
  const [appointments, setAppointments] = useState([])
  const fetchLabAppointment = async () => {
    try {
      const response = await getSecureApiData(`lab/appointment/${userId}?type=approved`);
      if (response.success) {
        // setCurrentPage(response.pagination.page)
        // setTotalPage(response.pagination.totalPages)
        setAppointments(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
  const appointmentAction = async (e, type) => {
    e.preventDefault()
    let data = {}
    if (type == 'status') {
      data = { type, labId: userId, appointmentId: actData.appointmentId, status: actData?.status }
    }
    else if (type == 'payment') {
      data = { type, labId: userId, appointmentId: payData.appointmentId, paymentStatus: payData.paymentStatus }
    }
    try {
      const response = await updateApiData(`appointment/lab-action`, data);
      if (response.success) {
        fetchLabAppointment()
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
   const sendReport = async (appointmentId,email,type) => {
    const data={appointmentId,email,type}
    try {
      const response = await securePostData(`lab/send-report`,data);
      if (response.success) {
        toast.success("Report sent")
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <form action="">
          <div className="row mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="innr-title">Test Reports / Appoiments</h3>
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
                        Test Reports / Appoiments
                      </li>
                    </ol>
                  </nav>



                </div>
              </div>

              <div className="add-nw-bx">
                <a
                  href="javascript:void(0)"
                  className="add-nw-btn nw-filtr-thm-btn "
                >
                  <img src="/export.png" alt="" /> Export
                </a>
              </div>
            </div>



            <div className="filters">
              <div className="field custom-frm-bx mb-0">
                <label className="label">A. Status:</label>
                <select>
                  <option>All</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>

              <div className="field custom-frm-bx mb-0">
                <label className="label">Payment Status :</label>
                <select>
                  <option>All</option>
                  <option>Test 1</option>
                  <option>Test 2</option>
                </select>
              </div>

              <div className="field custom-frm-bx mb-0">
                <label className="label">Test :</label>
                <select>
                  <option>All</option>
                  <option>Test 1</option>
                  <option>Test 2</option>
                </select>
              </div>

              <div className="field custom-frm-bx mb-0">
                <label className="label">Date from:</label>
                <input type="date" className="" />
              </div>

              <div className="field custom-frm-bx mb-0">
                <label className="label">Date to:</label>
                <input type="date" />
              </div>

              <div>
                <a href="javascript:void(0)" className="nw-thm-btn" >Filter</a>
              </div>

            </div>

          </div>
        </form>

        <div className="row ">
          <div className="d-flex align-items-center justify-content-between">
            <div className="custom-frm-bx">
              <input type="text" className="form-control pe-5" placeholder="Search " />

              <div className="search-item-bx">
                <button className="search-item-btn"><FontAwesomeIcon icon={faSearch} /></button>
              </div>

            </div>

            <div>
              <div className="page-selector d-flex align-items-center">

                <div className="custom-frm-bx">
                  <select className="form-select custom-page-dropdown nw-custom-page ">
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                  </select>
                </div>

              </div>
            </div>
          </div>



        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="table-section mega-table-section">
              <div className="table table-responsive mb-0">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>S.no.</th>
                      <th>Patient Details</th>
                      <th>Appointment ID</th>
                      <th>Test</th>
                      <th>Payment Status</th>
                      <th>Appointment Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {appointments?.length > 0 &&
                      appointments?.map((item, key) =>
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>
                            <div className="admin-table-bx">
                              <div className="admin-table-sub-bx">
                                <img src={item?.patientId?.profileImage ? `${base_url}/${item?.patientId?.profileImage}` : "/table-avatar.jpg"} alt="" />
                                <div className="admin-table-sub-details">
                                  <h6>{item?.patientId?.name} </h6>
                                  <p>ID: {item?.patientId?._id?.slice(-10)}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <ul className="admin-appointment-list">
                              <li className="admin-appoint-item">
                                <span className="admin-appoint-id">
                                  Appointment ID : #{item?._id?.slice(-10)}
                                </span>
                              </li>
                              <li className="admin-appoint-item">
                                Appointment Book Date : {item?.date ? new Date(item?.date)?.toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric'
                                }) : '-'}
                              </li>
                              <li className="admin-appoint-item">
                                Total Amount : ${item?.fees}
                              </li>
                            </ul>
                          </td>
                          <td>
                            <ul className="admin-test-list">
                              {item?.testId?.map((test, key) =>
                                <li className="admin-test-item" key={key}>{test?.shortName}</li>)}
                              {/* <li className="admin-test-item">Haemoglobin</li> */}
                            </ul>
                          </td>
                          <td>
                            <ul className="admin-paid-list ">
                              <li>

                                <span className="paid text-capitalize">{item?.paymentStatus}</span>
                              </li>
                              <li>
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => setPayData({ appointmentId: item?._id, paymentStatus: item?.paymentStatus })}
                                  className="edit-btn" data-bs-toggle="modal" data-bs-target="#payment-Status"
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </a>
                              </li>
                            </ul>
                          </td>
                          <td>
                            <ul className="admin-paid-list">
                              <li>

                                <span className="paid text-capitalize">
                                  {item?.status}
                                </span>
                              </li>
                              <li>
                                <a
                                  href="javascript:void(0)"
                                  onClick={() => {



                                    setActData({ appointmentId: item?._id, status: item?.status })
                                  }}
                                  className="edit-btn" data-bs-toggle="modal" data-bs-target="#appointment-Status"
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </a>
                              </li>
                            </ul>
                          </td>
                          <td>
                            <a
                              href="javascript:void(0)"
                              className=" admin-sub-dropdown dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >

                              <FontAwesomeIcon icon={faGear} /> Action
                            </a>

                            <div class="dropdown">
                              <a
                                href="javascript:void(0)"
                                class="attendence-edit-btn"
                                id="acticonMenu1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                {/* <i class="fas fa-pen"></i> */}
                              </a>
                              <ul
                                class="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu "
                                aria-labelledby="acticonMenu1"
                              >
                                <li className="drop-item">
                                  <Link
                                    class="nw-dropdown-item"
                                    to={`/lab-test-reports/${item._id}`}
                                  >
                                    <img src="/flask-report.png" alt="" />
                                    Edit Report
                                  </Link>
                                </li>
                                <li className="drop-item">
                                  <Link class="nw-dropdown-item" to={`/patient-view/${item?.patientId?._id}`}>
                                    <img src="/add-user.png" alt="" />
                                    Patient Details
                                  </Link>
                                </li>
                                <li className="drop-item">
                                  <Link class="nw-dropdown-item" to={`/appointment-details/${item?._id}`}>
                                    <img src="/flask-report.png" alt="" />
                                    Appointment Details
                                  </Link>
                                </li>

                                <li className="drop-item">
                                  <NavLink to="/report-tabs" className="nw-dropdown-item" href="#">
                                    <img src="/reprt-icon.png" alt="" />
                                    Generate Report
                                  </NavLink>
                                </li>

                                <li className="drop-item">
                                  <NavLink to={`/label/${item?._id}`} className="nw-dropdown-item" href="#">
                                    <img src="/barcd-icon.png" alt="" />
                                    Labels
                                  </NavLink>
                                </li>

                                <li className="drop-item">
                                  <NavLink to={`/report-view/${item?._id}`} className="nw-dropdown-item" href="#">
                                    <img src="/file.png" alt="" />
                                    Report  view
                                  </NavLink>
                                </li>
                                <li className="drop-item">
                                  <NavLink to={`/new-invoice/${item?._id}`} className="nw-dropdown-item" href="#">
                                    <img src="/invoices.png" alt="" />
                                    Invoice
                                  </NavLink>
                                </li>
                                <li className="drop-item">
                                  <a className="nw-dropdown-item" href="#">
                                    <img src="/dc-usr.png" alt="" />
                                    Send  Report Doctor
                                  </a>
                                </li>
                                <li className="drop-item">
                                  <button className="nw-dropdown-item" onClick={()=>sendReport(item?._id,item?.patientId?.email,'patient')}>
                                    <img src="/report-mail.png" alt="" />
                                    Send  Report Patient
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>)}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/*Payment Status Popup Start  */}
      {/* data-bs-toggle="modal" data-bs-target="#payment-Status" */}
      <div className="modal step-modal" id="payment-Status" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content rounded-5 p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="lg_title mb-0">Payment Status</h6>
              </div>
              <div>
                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close">
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
            <div className="modal-body p-0">
              <div className="row ">
                <form onSubmit={(e) => appointmentAction(e, 'payment')} className="col-lg-12 mt-5">
                  <div className="custom-frm-bx">
                    <label htmlFor="">Status</label>
                    <select name="paymentStatus" value={payData.paymentStatus}
                      onChange={(e) => setPayData({ ...payData, paymentStatus: e.target.value })} className="form-select nw-control-frm">
                      <option value="due">Due</option>
                      <option value="paid">Paid</option>

                    </select>
                  </div>

                  <div>
                    <button type="submit" className="nw-thm-btn w-100" data-bs-dismiss="modal"> Submit</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Payment Status Popup End */}


      {/*Appointment Popup Start  */}
      {/* data-bs-toggle="modal" data-bs-target="#appointment-Status" */}
      <div className="modal step-modal" id="appointment-Status" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content rounded-5 p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="lg_title mb-0">Appointment Status</h6>
              </div>
              <div>
                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close">
                  <FontAwesomeIcon icon={faClose} />
                </button>
              </div>
            </div>
            <form onSubmit={(e) => appointmentAction(e, 'status')} className="modal-body p-0">
              <div className="row ">
                <div className="col-lg-12 mt-3">
                  <div className="custom-frm-bx">
                    <label htmlFor="">Status</label>
                    <select name="status" value={actData.status} onChange={(e) => setActData({ ...actData, status: e.target.value })} className="form-select nw-control-frm">
                      <option value="pending" disabled>Pending</option>
                      <option value="cancel" disabled>Cancel</option>
                      <option value="approved" disabled>Approved</option>
                      <option value="rejected" disabled>Rejected</option>
                      <option value="report-pending">Pending Report</option>
                      <option value="deliver-report">Deliver Report</option>
                    </select>
                  </div>


                </div>

                <div className="col-lg-12">
                  <div className="custom-frm-bx">
                    <label htmlFor="">Select Doctor</label>
                    <select className="form-select nw-control-frm">
                      <option>Dr. Ravi Kumar</option>
                    </select>
                  </div>

                  <div>
                    <button type="submit" data-bs-dismiss="modal" className="nw-thm-btn w-100"> Submit</button>
                  </div>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Appointment Popup End */}
    </>
  )
}

export default TestReportsAppoiments