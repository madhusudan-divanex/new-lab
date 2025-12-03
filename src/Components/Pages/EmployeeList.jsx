import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faGear,
  faPen,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteApiData, getSecureApiData, securePostData } from "../../services/api";
import base_url from "../../../baseUrl";

function EmployeeList() {
  const userId = localStorage.getItem('userId')
  const [employees, setEmployees] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const fetchLabStaff = async () => {
    try {
      const response = await getSecureApiData(`lab/staff/${userId}`);
      console.log(response)
      if (response.success) {
        setEmployees(response.data)
        setTotalPage(response.pagination.totalPages)
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
  useEffect(() => {
    fetchLabStaff()
  }, [userId])
  const staffAction = async (e, id, status) => {
    e.preventDefault()
    const data = { empId: id, status }
    try {
      const response = await securePostData(`lab/staff-action`, data);
      if (response.success) {
        toast.success('Status updated')
        fetchLabStaff()
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  }
  const deleteStaff = async (id) => {
    try {
      const response = await deleteApiData(`lab/staff/${id}`);
      if (response.success) {
        toast.success('Staff deleted')
        fetchLabStaff()
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
                <h3 className="innr-title">Employee List</h3>
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
                        Employee list
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>

              <div className="add-nw-bx">
                <NavLink
                  to="/employee-data"
                  className="add-nw-btn thm-btn"

                >
                  <img src="/plus-icon.png" alt="" /> Add
                </NavLink>
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
                      <th>Name</th>
                      <th>Mobile Number</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Permission</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.length > 0 &&
                      employees?.map((item, key) =>
                        <tr key={key}>
                          <td>01.</td>
                          <td>
                            <div className="admin-table-bx">
                              <div className="admin-table-sub-bx">
                                <img src={item?.profileImage ? `${base_url}/${item?.profileImage}` : "/user-icon.png"} alt="" />
                                <div className="admin-table-sub-details">
                                  <h6>{item?.name}</h6>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{item?.contactInformation?.contactNumber}</td>
                          <td>{item?.contactInformation?.email}</td>
                          <td>Staff</td>
                          <td>{item?.permissionId?.name}</td>
                          <td>
                            <div className="switch">
                              <input
                                type="checkbox"
                                id={`toggle-${item._id}`} // unique id for each item
                                checked={item.status === "active"} // checked if status is active
                                onChange={(e) =>
                                  staffAction(e,item._id, e.target.checked ? "active" : "inactive")
                                }
                              />
                              <label htmlFor={`toggle-${item._id}`}></label>
                            </div>

                          </td>
                          <td>
                            <NavLink
                              href="#"
                              className=" admin-sub-dropdown dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FontAwesomeIcon icon={faGear} /> Action
                            </NavLink>

                            <div className="dropdown">
                              <NavLink
                                href="#"
                                className="attendence-edit-btn"
                                id="acticonMenu1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="fas fa-pen"></i>
                              </NavLink>
                              <ul
                                className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                                aria-labelledby="acticonMenu1"
                              >
                                <li className="drop-item">
                                  <NavLink to={`/view-employee/${item?.name}/${item?._id}`} className="nw-dropdown-item" href="#">
                                    <FontAwesomeIcon icon={faEye} className="" />
                                    View
                                  </NavLink>
                                </li>

                                <li className="drop-item">
                                  <NavLink to={`/employee-data?id=${item?._id}`}
                                    className="nw-dropdown-item"

                                  >
                                    <FontAwesomeIcon icon={faPen} className="" />
                                    Edit
                                  </NavLink>
                                </li>

                                <li className="drop-item">
                                  <button className="nw-dropdown-item" type="button" onClick={()=>deleteStaff(item?._id)}>
                                    <FontAwesomeIcon icon={faTrash} className="" />
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      )}
                    {/* <tr>
                      <td>02.</td>
                      <td>
                        <div className="admin-table-bx">
                          <div className="admin-table-sub-bx">
                            <img src="/user-icon.png" alt="" />
                            <div className="admin-table-sub-details">
                              <h6>Albert Flores</h6>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>+91-9876543210</td>
                      <td>debbie.baker@example.com</td>
                      <td>Staff</td>
                      <td>Full access</td>
                      <td>
                        <div className="switch">
                          <input type="checkbox" id="toggle6" />
                          <label for="toggle6"></label>
                        </div>
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
                            <i className="fas fa-pen"></i>
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                            aria-labelledby="acticonMenu1"
                          >
                            <li className="drop-item">
                              <NavLink to="/view-employee" className="nw-dropdown-item" href="#">
                                <FontAwesomeIcon icon={faEye} className="" />
                                View
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <NavLink to="/employee-data"
                                className="nw-dropdown-item"

                              >
                                <FontAwesomeIcon icon={faPen} className="" />
                                Edit
                              </NavLink>
                            </li>

                            <li className="drop-item">
                              <a className="nw-dropdown-item" href="#">
                                <FontAwesomeIcon icon={faTrash} className="" />
                                Delete
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
    </>
  );
}

export default EmployeeList;
