import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGear,
  faPen,
  faSearch,

} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { getSecureApiData } from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import base_url from "../../../baseUrl";

function TestReportsAppoiments() {
  const userId = localStorage.getItem('userId')
  const [allTest, setAllTest] = useState([])
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
                              {item?.testId?.map((item, key) =>
                                <li className="admin-test-item" key={key}>{item?.shortName}</li>)}
                              {/* <li className="admin-test-item">Haemoglobin</li> */}
                            </ul>
                          </td>
                          <td>
                            <ul className="admin-paid-list">
                              <li>

                                <span className="paid">Paid</span>
                              </li>
                              <li>
                                <a
                                  href="javascript:void(0)"
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
                                class="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
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
                                  <NavLink to="/label" className="nw-dropdown-item" href="#">
                                    <img src="/barcd-icon.png" alt="" />
                                    Labels
                                  </NavLink>
                                </li>

                                <li className="drop-item">
                                  <NavLink to="/report-view" className="nw-dropdown-item" href="#">
                                    <img src="/file.png" alt="" />
                                    Report  view
                                  </NavLink>
                                </li>
                                <li className="drop-item">
                                  <NavLink to="/new-invoice" className="nw-dropdown-item" href="#">
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
                                  <a className="nw-dropdown-item" href="#">
                                    <img src="/report-mail.png" alt="" />
                                    Send  Report Patient
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>)}
                    <tr>
                      <td>01.</td>
                      <td>
                        <div className="admin-table-bx">
                          <div className="admin-table-sub-bx">
                            <img src="/table-avatar.jpg" alt="" />
                            <div className="admin-table-sub-details">
                              <h6>Sunil </h6>
                              <p>ID: SUNIL3320</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ul className="admin-appointment-list">
                          <li className="admin-appoint-item">
                            <span className="admin-appoint-id">
                              Appointment ID : #0959595
                            </span>
                          </li>
                          <li className="admin-appoint-item">
                            Appointment Book Date : 20 jun 2025
                          </li>
                          <li className="admin-appoint-item">
                            Total Amount : $25
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-test-list">
                          <li className="admin-test-item">CBC</li>
                          <li className="admin-test-item">Haemoglobin</li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-paid-list">
                          <li>

                            <span className="paid">Paid</span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                            <span className="paid">
                              Deliver Report
                            </span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                        <div className="dropdown">
                          <a
                            href="javascript:void(0)"
                            className="attendence-edit-btn"
                            id="acticonMenu1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {/* <i className="fas fa-pen"></i> */}
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                            aria-labelledby="acticonMenu1"
                          >
                            <li className="drop-item">
                              <NavLink
                                to="/lab-test-reports"
                                className="nw-dropdown-item"
                              >
                                <img src="/flask-report.png" alt="" />
                                Edit Report
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/patient-details" className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/appointment-details" className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/report-tabs" className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/label" className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/report-view" className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/new-invoice" className="nw-dropdown-item" href="#">
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
                              <a className="nw-dropdown-item" href="#">
                                <img src="/report-mail.png" alt="" />
                                Send  Report Patient
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>02.</td>
                      <td>
                        <div className="admin-table-bx">
                          <div className="admin-table-sub-bx">
                            <img src="/table-avatar.jpg" alt="" />
                            <div className="admin-table-sub-details">
                              <h6>Sunil </h6>
                              <p>ID: SUNIL3320</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ul className="admin-appointment-list">
                          <li className="admin-appoint-item">
                            <span className="admin-appoint-id">
                              Appointment ID : #0959595
                            </span>
                          </li>
                          <li className="admin-appoint-item">
                            Appointment Book Date : 20 jun 2025
                          </li>
                          <li className="admin-appoint-item">
                            Total Amount : $25
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-test-list">
                          <li className="admin-test-item">CBC</li>
                          <li className="admin-test-item">Haemoglobin</li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-paid-list">
                          <li>

                            <span className="paid due">Due</span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                            <span className="paid pending">
                              Visit Pending
                            </span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                        <div className="dropdown">
                          <a
                            href="javascript:void(0)"
                            className="attendence-edit-btn"
                            id="acticonMenu1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {/* <i className="fas fa-pen"></i> */}
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                            aria-labelledby="acticonMenu1"
                          >
                            <li className="drop-item">
                              <NavLink
                                to="/lab-test-reports"
                                className="nw-dropdown-item"
                              >
                                <img src="/flask-report.png" alt="" />
                                Edit Report
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/patient-details" className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/appointment-details" className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/report-tabs" className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/label" className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/report-view" className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/new-invoice" className="nw-dropdown-item" href="#">
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
                              <a className="nw-dropdown-item" href="#">
                                <img src="/report-mail.png" alt="" />
                                Send  Report Patient
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>03.</td>
                      <td>
                        <div className="admin-table-bx">
                          <div className="admin-table-sub-bx">
                            <img src="/table-avatar.jpg" alt="" />
                            <div className="admin-table-sub-details">
                              <h6>Sunil </h6>
                              <p>ID: SUNIL3320</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ul className="admin-appointment-list">
                          <li className="admin-appoint-item">
                            <span className="admin-appoint-id">
                              Appointment ID : #0959595
                            </span>
                          </li>
                          <li className="admin-appoint-item">
                            Appointment Book Date : 20 jun 2025
                          </li>
                          <li className="admin-appoint-item">
                            Total Amount : $25
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-test-list">
                          <li className="admin-test-item">CBC</li>
                          <li className="admin-test-item">Haemoglobin</li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-paid-list">
                          <li>

                            <span className="paid due">Due</span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                            <span className="paid visited">
                              Visited
                            </span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                        <div className="dropdown">
                          <a
                            href="javascript:void(0)"
                            className="attendence-edit-btn"
                            id="acticonMenu1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {/* <i className="fas fa-pen"></i> */}
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                            aria-labelledby="acticonMenu1"
                          >
                            <li className="drop-item">
                              <NavLink
                                to="/lab-test-reports"
                                className="nw-dropdown-item"
                              >
                                <img src="/flask-report.png" alt="" />
                                Edit Report
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/patient-details" className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/appointment-details" className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/report-tabs" className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/label" className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/report-view" className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/new-invoice" className="nw-dropdown-item" href="#">
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
                              <a className="nw-dropdown-item" href="#">
                                <img src="/report-mail.png" alt="" />
                                Send  Report Patient
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>04.</td>
                      <td>
                        <div className="admin-table-bx">
                          <div className="admin-table-sub-bx">
                            <img src="/table-avatar.jpg" alt="" />
                            <div className="admin-table-sub-details">
                              <h6>Sunil </h6>
                              <p>ID: SUNIL3320</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <ul className="admin-appointment-list">
                          <li className="admin-appoint-item">
                            <span className="admin-appoint-id">
                              Appointment ID : #0959595
                            </span>
                          </li>
                          <li className="admin-appoint-item">
                            Appointment Book Date : 20 jun 2025
                          </li>
                          <li className="admin-appoint-item">
                            Total Amount : $25
                          </li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-test-list">
                          <li className="admin-test-item">CBC</li>
                          <li className="admin-test-item">Haemoglobin</li>
                        </ul>
                      </td>
                      <td>
                        <ul className="admin-paid-list">
                          <li>

                            <span className="paid due">Due</span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                            <span className="paid visited">
                              Visited
                            </span>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
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

                        <div className="dropdown">
                          <a
                            href="javascript:void(0)"
                            className="attendence-edit-btn"
                            id="acticonMenu1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            {/* <i className="fas fa-pen"></i> */}
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                            aria-labelledby="acticonMenu1"
                          >
                            <li className="drop-item">
                              <NavLink
                                to="/lab-test-reports"
                                className="nw-dropdown-item"
                              >
                                <img src="/flask-report.png" alt="" />
                                Edit Report
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/patient-details" className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/appointment-details" className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/report-tabs" className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/label" className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/report-view" className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <NavLink to="/new-invoice" className="nw-dropdown-item" href="#">
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
                              <a className="nw-dropdown-item" href="#">
                                <img src="/report-mail.png" alt="" />
                                Send  Report Patient
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>

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
                <div className="col-lg-12 mt-5">
                  <div className="custom-frm-bx">
                    <label htmlFor="">Status</label>
                    <select className="form-select nw-control-frm">
                      <option>Due</option>
                    </select>
                  </div>

                  <div>
                    <button type="submit" className="nw-thm-btn w-100"> Submit</button>
                  </div>

                </div>
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
            <div className="modal-body p-0">
              <div className="row ">
                <div className="col-lg-12 mt-3">
                  <div className="custom-frm-bx">
                    <label htmlFor="">Status</label>
                    <select className="form-select nw-control-frm">
                      <option>Visit Pending</option>
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
                    <button type="submit" className="nw-thm-btn w-100"> Submit</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Appointment Popup End */}
    </>
  )
}

export default TestReportsAppoiments