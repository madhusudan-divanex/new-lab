import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FaPlusCircle } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { getSecureApiData, securePostData } from "../../services/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function LabTestReports() {
  const params = useParams();
  const appointMentId = params.id;
  const [selectedTab, setSelectedTab] = useState(null)
  const userId = localStorage.getItem('userId');

  const [appointmentData, setAppointmentData] = useState(null);
  const [testId, setTestId] = useState([]);
  const [testData, setTestData] = useState([]);

  // Fetch appointment data
  const fetchLabAppointment = async () => {
    try {
      const response = await getSecureApiData(`lab/appointment-data/${appointMentId}`);
      if (response.success) {
        setAppointmentData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error fetching appointment:", err);
    }
  };

  // Extract test IDs from appointment data
  useEffect(() => {
    fetchLabAppointment();
  }, [userId]);

  useEffect(() => {
    if (appointmentData?.testId) {
      const ids = appointmentData.testId.map(item => item);
      setTestId(ids);
    }
  }, [appointmentData]);

  // Fetch each test one by one
  useEffect(() => {
    const fetchTestsOneByOne = async () => {
      if (testId.length === 0) return;
      console.log(testId)
      const allTests = [];
      for (const id of testId) {
        try {
          const response = await getSecureApiData(`lab/test-data/${id}`);
          if (response.success) {

            setSelectedTab(response.data._id)
            allTests.push(response.data);
          } else {
            toast.error(response.message);
          }
        } catch (err) {
          console.error(`Error fetching test ${id}:`, err);
        }
      }
      setTestData(allTests);
    };

    fetchTestsOneByOne();
  }, [testId]);
  const [reportData, setReportData] = useState([]);
  const [componentResults, setComponentResults] = useState({});
  const [comment, setComment] = useState("");
  const handleSave = async () => {
    const item = testData.find((t) => t._id === selectedTab);

    const components = item.component.map((c, i) => ({
      cmpId: c._id,
      result: componentResults[i]?.result || "",
      status: componentResults[i]?.status || "",
    }));

    const payload = {
      labId: userId,
      patientId: appointmentData.patientId,
      testId: selectedTab,
      appointmentId: appointMentId,
      component: components,
      comment: document.querySelector("#comment").value,
    };
    try {
      const response = await securePostData('lab/test-report', payload)
      if (response.success) {
        fetchLabAppointment()
      }
    } catch (error) {

    }
  };
  const fetchTestReport = async () => {
    const data={appointmentId:appointMentId,testId:''}
    try {
      const response = await getSecureApiData(`lab/report-data/${appointMentId}`);
      if (response.success) {
        setAppointmentData(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error fetching appointment:", err);
    }
  };

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
                <ul className="nav nav-tabs gap-3">
                  {testData?.map((item) => (
                    <li className="nav-item" key={item._id}>
                      <a
                        className={`nav-link ${selectedTab === item._id ? "active" : ""
                          } text-capitalize`}
                        onClick={() => setSelectedTab(item._id)}
                        role="button"
                      >
                        {item.shortName}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="tab-content mt-4">
                  {testData
                    ?.filter((t) => t._id === selectedTab)
                    .map((item) => (
                      <div className="tab-pane fade show active" key={item._id}>
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
                                    <td colSpan={5}>
                                      <span className="reprt-title text-capitalize">
                                        {item.title}
                                      </span>
                                    </td>
                                  </tr>

                                  {item.component.map((c, i) => (
                                    <tr key={i}>
                                      <td>{c.name}</td>
                                      <td>{c.unit}</td>
                                      <td>{c.referenceRange}%</td>

                                      <td>
                                        <input
                                          type="text"
                                          className="form-control patient-frm-control"
                                          placeholder="50"
                                          value={componentResults[i]?.result || ""}
                                          onChange={(e) =>
                                            setComponentResults(prev => ({
                                              ...prev,
                                              [i]: {
                                                ...prev[i],
                                                result: e.target.value
                                              }
                                            }))
                                          }
                                        />
                                      </td>

                                      <td>
                                        <select
                                          className="form-select patient-frm-control"
                                          value={componentResults[i]?.status || ""}
                                          onChange={(e) =>
                                            setComponentResults(prev => ({
                                              ...prev,
                                              [i]: {
                                                ...prev[i],
                                                status: e.target.value
                                              }
                                            }))
                                          }
                                        >
                                          <option>---Select status---</option>
                                          <option value="pass">Pass</option>
                                          <option value="fail">Fail</option>
                                        </select>
                                      </td>
                                    </tr>
                                  ))}

                                </tbody>
                              </table>

                              <div>
                                <div className="custom-frm-bx cbc-commnt-bx">
                                  <textarea
                                    className="form-control"
                                    placeholder="Comment"
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            <div className="text-end pe-3">
                              <button onClick={() => handleSave()} className="nw-thm-btn sub-nw-brd-tbn">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
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
                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close" style={{ color: "#00000040" }}>
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