import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faKey,
  faPen,
  faSearch,
  faTrash,

} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Permission() {
  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <form action="">
          <div className="row mb-3">
            <div className="d-flex align-items-center justify-content-between sub-header-bx">
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

              <div className="add-nw-bx">
                <a href="javascript:void(0)" className="add-nw-btn thm-btn" data-bs-toggle="modal" data-bs-target="#permission-Name">
                  <img src="/plus-icon.png" alt="" /> Permission Name
                </a>
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
                      <th>Permission Name</th>
                      <th>Permission</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>

                    <tr>
                      <td>01.</td>
                      <td>
                        Full  access
                      </td>
                      <td>
                        <span><NavLink to="/permission-check" className="admin-sub-dropdown"> <FontAwesomeIcon icon={faKey} /> Permission</NavLink></span>
                      </td>
                      <td>
                        <ul className="d-flex gap-2">
                          <li><a href="javascript:void(0)" className="text-black" data-bs-toggle="modal" data-bs-target="#permission-Name"><FontAwesomeIcon icon={faPen} /></a></li>
                          <li><a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a></li>
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>02.</td>
                      <td>
                        Full  access
                      </td>
                      <td>
                        <span><NavLink to="/permission-check" className="admin-sub-dropdown"> <FontAwesomeIcon icon={faKey} /> Permission</NavLink></span>
                      </td>
                      <td>
                        <ul className="d-flex gap-2">
                          <li><a href="javascript:void(0)" className="text-black" data-bs-toggle="modal" data-bs-target="#permission-Name"><FontAwesomeIcon icon={faPen} /></a></li>
                          <li><a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a></li>
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>03.</td>
                      <td>
                        Full  access
                      </td>
                      <td>
                        <span><NavLink to="/permission-check" className="admin-sub-dropdown"> <FontAwesomeIcon icon={faKey} /> Permission</NavLink></span>
                      </td>
                      <td>
                        <ul className="d-flex gap-2">
                          <li><a href="javascript:void(0)" className="text-black" data-bs-toggle="modal" data-bs-target="#permission-Name"><FontAwesomeIcon icon={faPen} /></a></li>
                          <li><a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a></li>
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>04.</td>
                      <td>
                        Full  access
                      </td>
                      <td>
                        <span><NavLink to="/permission-check" className="admin-sub-dropdown"> <FontAwesomeIcon icon={faKey} /> Permission</NavLink></span>
                      </td>
                      <td>
                        <ul className="d-flex gap-2">
                          <li><a href="javascript:void(0)" className="text-black" data-bs-toggle="modal" data-bs-target="#permission-Name"><FontAwesomeIcon icon={faPen} /></a></li>
                          <li><a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a></li>
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td>05.</td>
                      <td>
                        Full  access
                      </td>
                      <td>
                        <span><NavLink to="/permission-check" className="admin-sub-dropdown"> <FontAwesomeIcon icon={faKey} /> Permission</NavLink></span>
                      </td>
                      <td>
                        <ul className="d-flex gap-2">
                          <li><a href="javascript:void(0)" className="text-black" data-bs-toggle="modal" data-bs-target="#permission-Name"><FontAwesomeIcon icon={faPen} /></a></li>
                          <li><a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a></li>
                        </ul>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* <!-- Client Member Alert Popup Start --> */}
      {/* <!--  data-bs-toggle="modal" data-bs-target="#permission-Name" --> */}
      <div className="modal step-modal" id="permission-Name" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content rounded-5">
            <div className="d-flex align-items-center justify-content-between popup-nw-brd px-4 py-3">
              <div>
                <h6 className="lg_title mb-0">Permission Name</h6>
              </div>
              <div>
                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close" style={{ color: "#00000040" }}>
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
            </div>
            <div className="modal-body px-4">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="text-center ">
                    <div className="model-permission-bx">
                      <img src="/model-permission-icon.png" alt="" />
                    </div>
                  </div>

                  <div className="custom-frm-bx">
                    <label htmlFor="">Role Name</label>
                    <input type="text" className="form-control" placeholder="Enter Role Name" />
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

      {/* <!-- Meeting Alert Popup End --> */}

    </>
  )
}

export default Permission