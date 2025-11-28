import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


function EditTest() {
      const [selectedOption, setSelectedOption] = useState("select");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
     <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <div className="row mb-3">
          <div className="d-flex align-items-center justify-content-between tp-sub-main-bx">
            <div>
              <h3 className="innr-title">Edit Test</h3>
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
                      Edit Test
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
            {/* <div className="add-nw-bx d-flex gap-2">
              <a href="javascript:void(0)" className="add-nw-btn nw-thm-btn patient-thm-btn">
                <FontAwesomeIcon icon={faEye} /> Patient Details
              </a>

              <a href="javascript:void(0)" className="add-nw-btn nw-meeting-thm-btn " data-bs-toggle="modal" data-bs-target="#edit-Request" >
                <FaPlusCircle /> Print
              </a>
            </div> */}
          </div>
        </div>

        <div className="lab-chart-crd">
          <div className="row">
            <div className="col-lg-12">
              <div className="lab-tp-title patient-bio-tab report-profile-tp">
                <div>
                  <h6 className="mb-0 text-white">Test</h6>
                </div>
              </div>

              <div className="patient-bio-tab">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Select Test Category</label>
                      <select name="" id="" className="form-select nw-control-frm">
                        <option value="">---Select Categories---</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Short Name</label>
                      <input type="text" className="form-control nw-control-frm" value="CBC" />
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Sample Type</label>
                      <input type="text" className="form-control nw-control-frm" value="Blood" />
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Price</label>
                      <input type="text" className="form-control nw-control-frm" value="25" />

                      <div className="reprt-price-bx">
                        <a href="javascript:void(0)" className="reprt-price-btn">$</a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Precautions</label>
                      <textarea name="" id="" className="form-control nw-control-frm" placeholder="8 hours fasting"></textarea>
                    </div>
                  </div>

                </div>


                <div className="lab-chart-crd reporting-crd-bx">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="lab-tp-title patient-bio-tab report-bio-tp d-flex align-items-center justify-content-between py-3 sub-header-bx gap-2">
                        <div>
                          <h6 className="mb-0 text-black">Test Components</h6>
                        </div>

                        <div className="add-nw-bx d-flex gap-2">
                          <a href="javascript:void(0)" className="add-nw-btn thm-btn">
                            <img src="/plus-icon.png" alt="" /> Title
                          </a>

                          <a href="javascript:void(0)" className="add-nw-btn thm-btn">
                            <img src="/plus-icon.png" alt="" /> component
                          </a>

                        </div>

                      </div>

                      <div className="patient-bio-tab">
                        <div className="table-section mega-table-section reporting-table-section">
                          <div className="table table-responsive mb-0">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Unit</th>
                                  <th>Result</th>
                                  <th>Reference Range</th>
                                  <th>Status</th>
                                  <th>Action</th>

                                </tr>
                              </thead>
                              <tbody>

                                <tr>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="Lymphocyte" />
                                    </div>
                                  </td>

                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="mm/dl" />
                                    </div>
                                  </td>

                                  <td>
                                    <div className="custom-radio-group">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionType"
                                          id="textOption"
                                          value="text"
                                          defaultChecked
                                        />
                                        <label className="form-check-label" htmlFor="textOption">
                                          Text
                                        </label>
                                      </div>

                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionType"
                                          id="selectOption"
                                          value="select"
                                        />
                                        <label className="form-check-label" htmlFor="selectOption">
                                          Select
                                        </label>
                                      </div>
                                    </div>
                                  </td>

                                  <td>
                                    <textarea name="" id="" className="form-control" placeholder="20-100" style={{ resize: "auto", height: "100px" }}></textarea>
                                  </td>
                                  <td>
                                    <div className="form-check custom-check pt-0">
                                      <input className="form-check-input" type="checkbox" value="" id="addTests" />

                                    </div>
                                  </td>

                                  <td>
                                    <a href="javascript:void(0)" className="text-black"> <FontAwesomeIcon icon={faTrash} /> </a>
                                  </td>
                                </tr>


                                <tr>
                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="Lymphocyte" />
                                    </div>
                                  </td>

                                  <td>
                                    <div className="custom-frm-bx mb-0">
                                      <input type="text" name="" id="" className="form-control" placeholder="mm/dl" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="custom-radio-group">
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionTypes"
                                          id="textOption1"
                                          value="text"
                                          checked={selectedOption === "text"}
                                          onChange={handleRadioChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="textOption1"
                                        >
                                          Text
                                        </label>
                                      </div>

                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionTypes"
                                          id="selectOption2"
                                          value="select"
                                          checked={selectedOption === "select"}
                                          onChange={handleRadioChange}
                                        />
                                        <label
                                          className="form-check-label"
                                          htmlFor="selectOption2"
                                        >
                                          Select
                                        </label>
                                      </div>
                                    </div>

                                    {selectedOption === "select" && (
                                      <div
                                        className="report-droping-bx"
                                      >
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          <h5 className="optin-title">Option</h5>
                                          <button className="option-rep-add-btn">
                                            <FaPlusCircle />
                                          </button>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <div className="custom-frm-bx mb-0 flex-grow-1">
                                            <input type="text" name="" id="" className="form-control" placeholder="Negative" />
                                          </div>
                                          <div>
                                            <a href="javascript:void(0)" className="text-black"><FaTrash /></a>
                                          </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                          <div className="custom-frm-bx mb-0 flex-grow-1">
                                            <input type="text" name="" id="" className="form-control" placeholder="Positive" />
                                          </div>
                                          <div>
                                            <a href="javascript:void(0)" className="text-black"><FaTrash /></a>
                                          </div>
                                        </div>


                                      </div>
                                    )}
                                  </td>

                                  <td>
                                    <textarea name="" id="" className="form-control resize-auto" placeholder="20-100" style={{ resize: "auto", height: "100px" }}></textarea>
                                  </td>
                                  <td>
                                    <div className="form-check custom-check pt-0">
                                      <input className="form-check-input" type="checkbox" value="" id="addTests" />

                                    </div>
                                  </td>

                                  <td>
                                    <a href="javascript:void(0)" className="text-black"> <FontAwesomeIcon icon={faTrash} /> </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            
                          </div>

                          <div className="custom-frm-bx my-3 mx-3">
                                      <input type="text" name="" id="" className="form-control nw-control-frm" placeholder="Blood details" />
                                    </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <NavLink  to="/tests" className="nw-thm-btn sub-nw-brd-tbn">Save</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default EditTest