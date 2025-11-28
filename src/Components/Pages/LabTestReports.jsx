import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function LabTestReports() {
  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <div className="row mb-3">
          <div className="d-flex align-items-center justify-content-between tp-sub-main-bx">
            <div>
              <h3 className="innr-title">Test Reports</h3>
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
                        Test Categories
                      </a>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      Reports
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="add-nw-bx d-flex gap-2">
              <NavLink to="/patient-details" className="add-nw-btn nw-thm-btn patient-thm-btn">
                <FontAwesomeIcon icon={faEye} /> Patient Details
              </NavLink>

              <a href="javascript:void(0)" className="add-nw-btn nw-meeting-thm-btn " data-bs-toggle="modal" data-bs-target="#edit-Request" >
                <FaPlusCircle /> Print
              </a>
            </div>
          </div>
        </div>

        <div className="lab-chart-crd">
          <div className="row">
            <div className="col-lg-12">
              <div className="lab-tp-title patient-bio-tab lab-profile-bio-tab">
                <div>
                  <h6 className="mb-0">Test</h6>
                </div>
              </div>

              <div className="patient-bio-tab">
                <ul className="nav nav-tabs gap-3" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      CBC Report
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
                      Haemoglobin
                    </a>
                  </li>


                </ul>

                <div className="tab-content mt-4" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                  >
                    <div className="sub-tab-brd">
                      <div className="table-section mega-table-section">
                        <div className="table table-responsive mb-0">
                          <table className="table mb-0">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Unit</th>
                                <th>Reference Range</th>
                                <th>Result</th>
                                <th>Status</th>

                              </tr>
                            </thead>
                            <tbody>

                              <tr>
                                <td><span className="reprt-title">Diffrential Count</span></td>
                              </tr>


                              <tr>
                                <td>Lymphocyte</td>
                                <td>
                                  mm/dl
                                </td>
                                <td>
                                  50-60%
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <input type="text" name="" id="" className="form-control patient-frm-control" placeholder="50" />
                                  </div>
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <select name="" id="" className="form-select patient-frm-control">
                                      <option value="">---Select status---</option>
                                    </select>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Monocyte</td>
                                <td>
                                  mm/dl
                                </td>
                                <td>
                                  50-60%
                                </td>
                                <td>

                                </td>
                                <td>

                                </td>
                              </tr>

                              <tr>
                                <td><span className="reprt-title">Blood details</span></td>
                              </tr>
                              <tr>
                                <td>Monocyte</td>
                                <td>
                                  mm/dl
                                </td>
                                <td>
                                  50-60%
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <input type="text" name="" id="" className="form-control patient-frm-control" placeholder="50" />
                                  </div>
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <select name="" id="" className="form-select patient-frm-control">
                                      <option value="">---Select status---</option>
                                    </select>
                                  </div>
                                </td>
                              </tr>

                              <tr>
                                <td>Monocyte</td>
                                <td>
                                  mm/dl
                                </td>
                                <td>
                                  50-60%
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <input type="text" name="" id="" className="form-control patient-frm-control" placeholder="50" />
                                  </div>
                                </td>
                                <td>
                                  <div className="custom-frm-bx mb-0">
                                    <select name="" id="" className="form-select patient-frm-control">
                                      <option value="">---Select status---</option>
                                    </select>
                                  </div>
                                </td>
                              </tr>
                            </tbody>


                          </table>
                          <div>
                            <div className="custom-frm-bx cbc-commnt-bx">
                              <textarea name="" id="" className="form-control" placeholder="Comment"></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="text-end pe-3">
                          <a href="javascript:void(0)" className="nw-thm-btn sub-nw-brd-tbn">Save</a>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="tab-pane fade" id="profile" role="tabpanel">
                    <div
                      className="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                    >
                      <div className="sub-tab-brd">
                        <div className="table-section mega-table-section">
                          <div className="table table-responsive mb-0">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Unit</th>
                                  <th>Reference Range</th>
                                  <th>Result</th>
                                  <th>Status</th>

                                </tr>
                              </thead>
                              <tbody>

                                <tr>
                                  <td><span className="reprt-title">Diffrential Count</span></td>
                                </tr>

                                <tr>
                                  <td>Lymphocyte</td>
                                  <td>
                                    mm/dl
                                  </td>
                                  <td>
                                    50-60%
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="50" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <select name="" id="" className="form-select">
                                        <option value="">---Select status---</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Monocyte</td>
                                  <td>
                                    mm/dl
                                  </td>
                                  <td>
                                    50-60%
                                  </td>
                                  <td>

                                  </td>
                                  <td>

                                  </td>
                                </tr>

                                <tr>
                                  <td><span className="reprt-title">Blood details</span></td>
                                </tr>
                                <tr>
                                  <td>Monocyte</td>
                                  <td>
                                    mm/dl
                                  </td>
                                  <td>
                                    50-60%
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="50" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <select name="" id="" className="form-select">
                                        <option value="">---Select status---</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>

                                <tr>
                                  <td>Monocyte</td>
                                  <td>
                                    mm/dl
                                  </td>
                                  <td>
                                    50-60%
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="50" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <select name="" id="" className="form-select">
                                        <option value="">---Select status---</option>
                                      </select>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>


                            </table>
                            <div>
                              <div className="custom-frm-bx cbc-commnt-bx">
                                <textarea name="" id="" className="form-control" placeholder="Comment"></textarea>
                              </div>
                            </div>
                          </div>

                          <div className="text-end pe-3">
                            <a href="javascript:void(0)" className="nw-thm-btn">Save</a>
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

      {/*Print Popup Start  */}
      {/* data-bs-toggle="modal" data-bs-target="#edit-Request" */}
      <div className="modal step-modal" id="edit-Request" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content rounded-5 ">
            <div className="d-flex align-items-center justify-content-between popup-nw-brd px-4 py-3">
              <div>
                <h6 className="lg_title mb-0">Print</h6>
              </div>
              <div>
                 <button type="button" className="" data-bs-dismiss="modal" aria-label="Close" style={{color: "#00000040"}}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
              </div>
            </div>
            <div className="modal-body px-4">
              <div className="row ">
                <div className="col-lg-12">
                  <div className="text-center my-4">
                    <div className="model-permission-bx">
                      <img src="/flask.png" alt="" />
                    </div>
                  </div>

                  <ul className="">
                    <li>
                      <div className="custom-frm-bx">
                        <div className="form-check custom-check form-control tests-reprt-frm">
                          <input className="form-check-input" type="checkbox" value="" id="addTests" />
                          <label className="form-check-label tests-reprt-label" for="addTests">
                            CBC Report
                          </label>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className="custom-frm-bx">
                        <div className="form-check custom-check form-control tests-reprt-frm">
                          <input className="form-check-input" type="checkbox" value="" id="haemoglobin" />
                          <label className="form-check-label tests-reprt-label" for="haemoglobin">
                            Haemoglobin
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>

                  <div>
                    <button type="submit" className="nw-thm-btn w-100"> Print now</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  Print Popup End */}

    </>
  )
}

export default LabTestReports