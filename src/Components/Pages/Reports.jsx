import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSecureApiData, securePostData } from "../../services/api";
import { useSelector } from "react-redux";

function Reports() {
  const navigate = useNavigate()
  const { isOwner, permissions } = useSelector(state => state.user)
  const userId = localStorage.getItem('userId')
  const [selectedOption, setSelectedOption] = useState("select");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const [testData, setTestData] = useState({
    labId: userId,
    precautions: "",
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
      title: '',
      optionType: "text",
      textResult:'',
      result: [{value:'',note:''}],
      referenceRange: "",
      status: false,
    },
  ]);



  const handleComponentChange = (index, e) => {
  const { name, value, type, checked } = e.target;
  const updated = [...components];

  // checkbox handling
  updated[index][name] = type === "checkbox" ? checked : value;

  // optionType switch handling
  if (name === "optionType") {
    if (value === "text") {
      updated[index].textResult = "";
    } else if (value === "select") {
      updated[index].result = [{ value: "", note: "" }];
    }
  }

  setComponents(updated);
};




  // -------------------- Add Component --------------------
  const addComponent = () => {
    setComponents([
      ...components,
      { name: "", unit: "", optionType: "text", textResult: [""],result:[{value:'',note:''}], referenceRange: "", status: false },
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

  const handleAddOption = (componentIndex) => {
    const updated = [...components];
    updated[componentIndex].result.push({ value: "", note: "" });
    setComponents(updated);
  };


  const handleOptionChange = (componentIndex, optionIndex, field, value) => {
    const updated = [...components];
    updated[componentIndex].result[optionIndex][field] = value;
    setComponents(updated);
  };


  const handleRemoveOption = (componentIndex, optionIndex) => {
    const updated = [...components];
    updated[componentIndex].result.splice(optionIndex, 1);
    setComponents(updated);
  };

  const testSubmit = async (e) => {
    e.preventDefault()
    // if (!isOwner && !permissions.addTest) {
    //   toast.error('You do not have permission to add test ')
    //   return
    // }
    const data = { ...testData, component: components }
    try {
      const response = await securePostData(`lab/test`, data)
      if (response.success) {
        toast.success('Test data saved successfully')
        navigate('/tests')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }

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

              <form onSubmit={testSubmit} className="patient-bio-tab">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="custom-frm-bx">
                      <label htmlFor="">Select Test Category</label>
                      <select name="testCategory" value={testData.testCategory} onChange={handleChange} id="" className="form-select nw-control-frm">
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
                      <textarea name="precautions" value={testData.precautions} onChange={handleChange} id="" className="form-control nw-control-frm" placeholder="8 hours fasting"></textarea>
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
                          {/* <button type="button" onClick={addTitle} className="add-nw-btn thm-btn">
                            <img src="/plus-icon.png" alt="" /> Title
                          </button> */}

                          <button type="button" onClick={addComponent} className="add-nw-btn thm-btn">
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
                                  <React.Fragment key={index}>
                                    <tr >
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
                                            checked={component.optionType == "text"}
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
                                            checked={component.optionType == "select"}
                                            onChange={(e) => handleComponentChange(index, e)}
                                          />
                                          <label htmlFor="optionType" className="form-check-label">Select</label>
                                        </div>
                                        {component.optionType === "select" ? (
                                          <div className="report-droping-bx">

                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                              <h5 className="optin-title">Options</h5>

                                              {/* ADD OPTION BUTTON */}
                                              <button
                                                type="button"
                                                className="option-rep-add-btn"
                                                onClick={() => handleAddOption(index)}
                                              >
                                                <FaPlusCircle />
                                              </button>
                                            </div>

                                            {/* RENDER ALL OPTIONS */}
                                            {component.result.map((opt, optIndex) => (
                                              <div className="d-flex align-items-center gap-2 mb-2" key={optIndex}>

                                                {/* OPTION VALUE */}
                                                <div className="custom-frm-bx mb-0 flex-grow-1">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Option"
                                                    value={opt.value}
                                                    onChange={(e) =>
                                                      handleOptionChange(index, optIndex, "value", e.target.value)
                                                    }
                                                  />
                                                </div>

                                                {/* OPTION NOTE */}
                                                <div className="custom-frm-bx mb-0 flex-grow-1">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Note"
                                                    value={opt.note}
                                                    onChange={(e) =>
                                                      handleOptionChange(index, optIndex, "note", e.target.value)
                                                    }
                                                  />
                                                </div>

                                                {/* REMOVE */}
                                                <button
                                                  type="button"
                                                  className="text-black"
                                                  onClick={() => handleRemoveOption(index, optIndex)}
                                                >
                                                  <FaTrash />
                                                </button>

                                              </div>
                                            ))}


                                          </div>
                                        ) : (
                                          <div className="custom-frm-bx mb-0 flex-grow-1">
                                            <textarea
                                              rows={5}
                                              type="text"
                                              name="textResult"
                                              value={component.textResult}
                                              onChange={(e) => handleComponentChange(index, e)}
                                              className="form-control"
                                            />
                                          </div>
                                        )}

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
                                    <div className="  my-3 mx-3 w-100">
                                      <input type="text" name="title" value={component.title}
                                        onChange={(e) => handleComponentChange(index, e)} id="" className="form-control nw-control-frm" placeholder="Blood details" />

                                    </div>
                                  </React.Fragment>
                                ))}

                              </tbody>
                            </table>

                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-end mt-3">
                  <button to="submit" className="nw-thm-btn sub-nw-brd-tbn">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Reports