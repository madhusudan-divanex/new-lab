import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faChartColumn, faCheckCircle, faClose, faFlask, faFlaskVial, faKey, faLock, faMessage, faRightFromBracket, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import base_url from "../../../baseUrl";
import { useEffect } from "react";
import { fetchUserDetail } from "../../redux/features/userSlice";

function LeftSidebar() {
  const dispatch = useDispatch()
  const { profiles, labPerson, labAddress, labImg,
    rating, avgRating, labLicense, isRequest } = useSelector(state => state.user)
  useEffect(()=>{
    dispatch(fetchUserDetail())
  },[dispatch])
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
                <img src={profiles?.logo ? `${base_url}/${profiles?.logo}` : "/user-avatar.png"} alt="" />
                <div>
                  <h6 className="new_title fw-500 mb-0">{labPerson?.name}</h6>
                  <p>#{profiles?._id?.slice(-10)}</p>
                </div>
              </div>
            </NavLink>
          </div>

          <div className="left-navigation flex-grow-1 overflow-auto">
            <ul className="nav flex-column mt-lg-3">
              <h6>Navigation</h6>
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  <FontAwesomeIcon icon={faBorderAll} /> Dashboard
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/appointment-request" className="nav-link  nav-active">
                  <FontAwesomeIcon icon={faCheckCircle} /> Appointment Request
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/tests" className="nav-link ">
                  <FontAwesomeIcon icon={faFlask} /> Tests
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/test-reports-appointment" className="nav-link ">
                  <FontAwesomeIcon icon={faFlaskVial} /> Lab Reports
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink to="/invoice" className="nav-link ">
                  <img src="/invoice.png" alt="" /> Invoices
                </NavLink>
              </li> */}

              <li className="nav-item">
                <NavLink to="/chat" className="nav-link ">
                  <FontAwesomeIcon icon={faMessage} /> Chat
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/report-tabs" className="nav-link ">
                  <FontAwesomeIcon icon={faChartColumn} /> Report
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/employee-list" className="nav-link ">
                  <FontAwesomeIcon icon={faUsers} /> Employees/Doctor
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/permission" className="nav-link ">
                  <FontAwesomeIcon icon={faKey} /> Permission
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={profiles?.status == 'pending' ? "/profile" : '/approve-profile'} className="nav-link ">
                  <FontAwesomeIcon icon={faUserCircle} /> Profile
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/change-password" className="nav-link ">
                  <FontAwesomeIcon icon={faLock} /> Change Password
                </NavLink>
              </li>

              {/* <li><hr /></li> */}

              <li className="nav-item">
                <NavLink to="/login" className="nav-link ">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
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
