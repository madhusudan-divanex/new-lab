import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";


function Reports() {
  const userId = localStorage.getItem('userId')

  const [selectedOption, setSelectedOption] = useState("select");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [testData, setTestData] = useState({
    labId: userId,
    title: [""],
    category: "",
    precautions: "",
    component: [{ name: "", unit: "", result: "", referenceRange: "", status: false }],
    shortName: "",
    testCategory: "",
    sampleType: "",
    price: "",
    status: "inactive",
  });
  const [components, setComponents] = useState([
    {
      name: "",
      unit: "",
      optionType: "text", // 'text' or 'select'
      referenceRange: "",
      status: false, // checkbox
    },
  ]);

  const addTitle = () => {
    setTestData((prev) => ({
      ...prev,
      title: [...prev.title, ""],
    }));
  };

  // Remove a title by index
  const removeTitle = (index) => {
    setTestData((prev) => ({
      ...prev,
      title: prev.title.filter((_, i) => i !== index),
    }));
  };

  // Handle input change for a specific title
  const handleTitleChange = (index, value) => {
    const newTitles = [...testData.title];
    newTitles[index] = value;
    setTestData((prev) => ({
      ...prev,
      title: newTitles,
    }));
  };
  const handleComponentChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedComponents = [...components];
    updatedComponents[index][name] = type === "checkbox" ? checked : value;
    setComponents(updatedComponents);
  };

  // -------------------- Add Component --------------------
  const addComponent = () => {
    setComponents([
      ...components,
      { name: "", unit: "", optionType: "text", referenceRange: "", status: false },
    ]);
  };

  // -------------------- Remove Component --------------------
  const removeComponent = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <div className="row mb-3">
          <div className="d-flex align-items-center justify-content-between tp-sub-main-bx">
            <div>
              <h3 className="innr-title">Add Test</h3>
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
                      Add Test
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
                      <select name="category" value={testData.category} onChange={handleChange} id="" className="form-select nw-control-frm">
                        <option value="">---Select Categories---</option>
                        <option value="hematology">Hematology</option>
                        <option value="biochemistry">Biochemistry</option>
                        <option value="microbiology">Microbiology</option>
                        <option value="immunology">Immunology</option>
                        <option value="pathology">Pathology</option>
                        <option value="serology">Serology</option>
                        <option value="urinalysis">Urinalysis</option>
                        <option value="molecular_diagnostics">Molecular Diagnostics</option>
                        <option value="toxicology">Toxicology</option>
                        <option value="genetics">Genetics</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Short Name</label>
                      <input type="text" className="form-control nw-control-frm" name="shortName" value={testData.shortName} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Sample Type</label>
                      <input type="text" className="form-control nw-control-frm" name="sampleType" value={testData.sampleType} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Price</label>
                      <input type="text" className="form-control nw-control-frm" name="price" value={testData.price} onChange={handleChange} />

                      <div className="reprt-price-bx">
                        <a href="javascript:void(0)" className="reprt-price-btn">$</a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Precautions</label>
                      <textarea name="precaution" value={testData.precaution} onChange={handleChange} id="" className="form-control nw-control-frm" placeholder="8 hours fasting"></textarea>
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
                          <button onClick={addTitle} className="add-nw-btn thm-btn">
                            <img src="/plus-icon.png" alt="" /> Title
                          </button>

                          <button onClick={addComponent} className="add-nw-btn thm-btn">
                            <img src="/plus-icon.png" alt="" /> component
                          </button>

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

                                {components.map((component, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Lymphocyte"
                                        value={component.name}
                                        onChange={(e) => handleComponentChange(index, e)}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        name="unit"
                                        className="form-control"
                                        placeholder="mm/dl"
                                        value={component.unit}
                                        onChange={(e) => handleComponentChange(index, e)}
                                      />
                                    </td>
                                    <td>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionType"
                                          value="text"
                                          checked={component.optionType === "text"}
                                          onChange={(e) => handleComponentChange(index, e)}
                                        />
                                        <label className="form-check-label">Text</label>
                                      </div>
                                      <div className="form-check form-check-inline">
                                        <input
                                          className="form-check-input"
                                          type="radio"
                                          name="optionType"
                                          value="select"
                                          checked={component.optionType === "select"}
                                          onChange={(e) => handleComponentChange(index, e)}
                                        />
                                        <label className="form-check-label">Select</label>
                                      </div>
                                    </td>
                                    <td>
                                      <textarea
                                        name="referenceRange"
                                        className="form-control"
                                        style={{ resize: "auto", height: "100px" }}
                                        value={component.referenceRange}
                                        onChange={(e) => handleComponentChange(index, e)}
                                        placeholder="20-100"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        name="status"
                                        checked={component.status}
                                        onChange={(e) => handleComponentChange(index, e)}
                                      />
                                    </td>
                                    <td>
                                      <button
                                        type="button"
                                        className="text-black"
                                        onClick={() => removeComponent(index)}
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
                                      </button>
                                    </td>
                                  </tr>
                                ))}


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
                          {testData.title.map((t, index) => (
                            <div className="custom-frm-bx my-3 mx-3">
                              <input type="text" name="" value={t}
                                onChange={(e) => handleTitleChange(index, e.target.value)} id="" className="form-control nw-control-frm" placeholder="Blood details" />
                              {index !== 0 && <button
                                onClick={() => removeTitle(index)}
                                style={{ marginLeft: "8px" }}
                                className="thm-btn"
                              >
                                Remove
                              </button>}
                            </div>))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <NavLink to="/tests" className="nw-thm-btn sub-nw-brd-tbn">Save</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Reports