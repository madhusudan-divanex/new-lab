import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faGear, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Tests() {
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                        <div className="row">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h3 className="innr-title"> Tests</h3>
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
                                                    Tests
                                                </li>
                                            </ol>
                                        </nav>
                                    </div>
                                </div>

                                <div className="add-nw-bx">
                                    <NavLink to="/reports" className="add-nw-btn thm-btn">
                                        <img src="/plus-icon.png" alt="" /> Add Tests
                                    </NavLink>
                                </div>
                            </div>
                        </div>

                            <div className="row">
                              <div className="d-flex align-items-center justify-content-between">
                                 <div className="custom-frm-bx">
                                        <input type="text" className="form-control" placeholder="Search " />

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
                                                    <th>Test Categories Name</th>
                                                    <th>Short Name</th>
                                                    <th>Sample Type</th>
                                                    <th>Price</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>01.</td>
                                                    <td>Complete Blood Count</td>
                                                    <td>CBC</td>
                                                    <td>Blood</td>
                                                    <td>$25</td>
                                                    <td>
                                                        <div className="switch">
                                                            <input type="checkbox" id="toggle7"/>
                                                            <label for="toggle7"></label>
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
                                                                    <NavLink to="/edit-test" className="nw-dropdown-item" href="#">
                                                                          <FontAwesomeIcon
                                                                            icon={faPen}
                                                                            className=""
                                                                        />
                                                                        View / Edit
                                                                    </NavLink>
                                                                </li>


                                                                <li className="drop-item">
                                                                    <a className="nw-dropdown-item" href="#">
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className=""
                                                                        />
                                                                        Delete
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>02.</td>
                                                    <td>Haemoglobin</td>
                                                    <td></td>
                                                    <td>Blood</td>
                                                    <td>$25</td>
                                                    <td>
                                                        <div className="switch">
                                                            <input type="checkbox" id="toggle6"/>
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
                                                                    <NavLink to="/edit-test" className="nw-dropdown-item" href="#">
                                                                          <FontAwesomeIcon
                                                                            icon={faPen}
                                                                            className=""
                                                                        />
                                                                        View / Edit
                                                                    </NavLink>
                                                                </li>


                                                                <li className="drop-item">
                                                                    <a className="nw-dropdown-item" href="#">
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className=""
                                                                        />
                                                                        Delete
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>03.</td>
                                                    <td>Urine R/N</td>
                                                    <td>urn</td>
                                                    <td>Urine</td>
                                                    <td>$25</td>
                                                    <td>
                                                        <div className="switch">
                                                            <input type="checkbox" id="toggle5"/>
                                                            <label for="toggle5"></label>
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
                                                                    <NavLink to="/edit-test" className="nw-dropdown-item" href="#">
                                                                          <FontAwesomeIcon
                                                                            icon={faPen}
                                                                            className=""
                                                                        />
                                                                        View / Edit
                                                                    </NavLink>
                                                                </li>


                                                                <li className="drop-item">
                                                                    <a className="nw-dropdown-item" href="#">
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className=""
                                                                        />
                                                                        Delete
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>04.</td>
                                                    <td>COVID-19 ELISA</td>
                                                    <td>urn</td>
                                                    <td>Urine</td>
                                                    <td>$25</td>
                                                    <td>
                                                        <div className="switch">
                                                            <input type="checkbox" id="toggle4"/>
                                                            <label for="toggle4"></label>
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
                                                                    <NavLink to="/edit-test" className="nw-dropdown-item" href="#">
                                                                          <FontAwesomeIcon
                                                                            icon={faPen}
                                                                            className=""
                                                                        />
                                                                        View / Edit
                                                                    </NavLink>
                                                                </li>


                                                                <li className="drop-item">
                                                                    <a className="nw-dropdown-item" href="#">
                                                                        <FontAwesomeIcon
                                                                            icon={faTrash}
                                                                            className=""
                                                                        />
                                                                        Delete
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
        </>
    );
}

export default Tests;
