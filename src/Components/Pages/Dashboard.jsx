import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Chart from "react-apexcharts";
import { faGear, faPen } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
function Dashboard() {
  const labReports = {
    series: [45, 30, 25], // Delivered, Pending, Visited
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Delivered", "Pending", "Visited"],
      colors: ["#34A853", "#FEB052", "#4285F4"],
      legend: {
        position: "right",
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  // Test Request chart data
  const testRequest = {
    series: [70, 30], // Total Request, Pending
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Total Request", "Pending"],
      colors: ["#052F59", "#FEB052"],
      legend: {
        position: "right",
      },
      dataLabels: {
        enabled: false,
      },
    },
  };

  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <div className="row">
          <div>
            <h3 className="innr-title">Dashboard</h3>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div>
              <div className="dashboard-main-card">
                <div className="attendence-content-bx">
                  <div className="attendence-content-first">
                    <img src="/admin-check.png" alt="" />
                  </div>
                  <div>
                    <h6 className="">68</h6>
                    <p>Test Request</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div>
              <div className="dashboard-main-card">
                <div className="attendence-content-bx">
                  <div className="attendence-content-first admin-crd-two">
                    <img src="/admin-lab.png" alt="" />
                  </div>
                  <div>
                    <h6 className="">20</h6>
                    <p>Tests </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div>
              <div className="dashboard-main-card">
                <div className="attendence-content-bx">
                  <div className="attendence-content-first admin-crd-three">
                    <img src="/admin-test-yellow.png" alt="" />
                  </div>
                  <div>
                    <h6 className="">20</h6>
                    <p>Pending Report </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <div>
              <div className="dashboard-main-card">
                <div className="attendence-content-bx">
                  <div className="attendence-content-first admin-crd-four">
                    <img src="/admin-test-green.png" alt="" />
                  </div>
                  <div>
                    <h6 className="">3456</h6>
                    <p>Delivered Report</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="lab-chart-crd">
              <div className="lab-tp-title">
                <h6>
                  
                  <img src="/lab-test.png" alt="" /> Lab Reports
                </h6>
              </div>
              <div className="p-3">
                <Chart
                  options={labReports.options}
                  series={labReports.series}
                  type="donut"
                  height={300}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <div className="lab-chart-crd">
              <div className="lab-tp-title">
                <h6>
                  
                  <img src="/reqest-test.png" alt="" /> Test Request
                </h6>
              </div>
              <div className="p-3">
                <Chart
                  options={testRequest.options}
                  series={testRequest.series}
                  type="donut"
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="lab-chart-crd ">
              <div className="lab-tp-title d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0">
                    
                    <img src="/lab-test.png" alt="" /> Lab Reports List
                  </h6>
                </div>

                <div>
                  <NavLink to="/test-reports-appointment" href="javascript:void(0)" className="thm-btn">
                    View all
                  </NavLink>
                </div>
              </div>

              <div className="lab-admin-main-bx">
                <div className="table-section">
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
                                  className="edit-btn"
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
                                  className="edit-btn"
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
                              <NavLink className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/invoices.png" alt="" />
                                Invoice
                              </a>
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
                                  <h6>Sunil</h6>
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
                                  className="edit-btn"
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
                                  className="edit-btn"
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
                              <NavLink className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/invoices.png" alt="" />
                                Invoice
                              </a>
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
                                  <h6>Sunil</h6>
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
                                  className="edit-btn"
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
                                  Visit Pending
                                </span>
                              </li>
                              <li>
                                <a
                                  href="javascript:void(0)"
                                  className="edit-btn"
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
                              <NavLink className="nw-dropdown-item" href="#">
                                <img src="/add-user.png" alt="" />
                                Patient Details
                              </NavLink>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/flask-report.png" alt="" />
                                Appointment Details
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/reprt-icon.png" alt="" />
                                Generate Report
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/barcd-icon.png" alt="" />
                                Labels
                              </a>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/file.png" alt="" />
                                Report  view
                              </a>
                            </li>
                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <img src="/invoices.png" alt="" />
                                Invoice
                              </a>
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
        </div>
      </div>
    </>
  );
}

export default Dashboard;
