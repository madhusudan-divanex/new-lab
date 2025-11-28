import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function LeftSidebar() {
  return (
    <>
      <div className="dashboard-left-side  min-vh-100 flex-shrink-0">
        <div className="text-end admn-mob-close-bx">
          <NavLink
            to="#"
            className="d-lg-none tp-mobile-close-btn mb-3 fs-6 text-black">
            <FontAwesomeIcon icon={faClose} />
          </NavLink>
        </div>

        <div className="task-vendr-left-title-bx">
          <div className="dashboard-logo-tp d-flex justify-content-center align-items-center">
            <h4 className="mb-0">
              <NavLink to="/" className="dash-hp-title">
                <img src="/logo.png" alt="" />
              </NavLink>
            </h4>
          </div>
        </div>

        <div className="d-flex flex-column p-3">
          <div className="task-vendor-profile-crd">
            <NavLink to="#">
              <div className="task-vendor-profile-bx">
              <img src="/user-avatar.png" alt="" />
              <div>
                <h6 className="new_title fw-500 mb-0">Jonh Smith</h6>
                <p>#94969548</p>
              </div>
            </div>
            </NavLink>
          </div>

          <div className="left-navigation flex-grow-1 overflow-auto">
            <ul className="nav flex-column mt-lg-3">
              <h6>Navigation</h6>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  <img src="/dashboard.png" alt="" /> Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/appointment-request" className="nav-link  nav-active">
                  <img src="/check-two.png" alt="" /> Appointment Request
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/tests" className="nav-link ">
                  <img src="/lab.png" alt="" /> Tests
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/test-reports-appointment" className="nav-link ">
                  <img src="/tests.png" alt="" /> Lab Reports
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink to="/invoice" className="nav-link ">
                  <img src="/invoice.png" alt="" /> Invoices
                </NavLink>
              </li> */}

              <li className="nav-item">
                <NavLink to="/chat" className="nav-link ">
                  <img src="/chat.png" alt="" /> Chat
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/report-tabs" className="nav-link ">
                  <img src="/report.png" alt="" /> Report
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/employee-list" className="nav-link ">
                  <img src="/employe.png" alt="" /> Employees/Doctor
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/permission" className="nav-link ">
                  <img src="/permission.png" alt="" /> Permission
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/profile" className="nav-link ">
                  <img src="/profile.png" alt="" /> Profile
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/change-password" className="nav-link ">
                  <img src="/password.png" alt="" /> Change Password
                </NavLink>
              </li>

              {/* <li><hr /></li> */}

              <li className="nav-item">
                <NavLink to="/login" className="nav-link ">
                  <img src="/logout.png" alt="" /> Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftSidebar;
