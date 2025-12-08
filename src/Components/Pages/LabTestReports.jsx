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
import { useSelector } from "react-redux";

function LabTestReports() {
  const params = useParams();
  const appointMentId = params.id;
  const userId = localStorage.getItem('userId');
  const [selectedTab, setSelectedTab] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [testId, setTestId] = useState([]);
   const {isOwner,permissions}=useSelector(state=>state.user)
  const [testData, setTestData] = useState([]);
  const [allComponentResults, setAllComponentResults] = useState({});
  const [allComments, setAllComments] = useState({});
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

  useEffect(() => {
    fetchLabAppointment();
  }, [userId]);

  useEffect(() => {
    if (appointmentData?.testId) {
      const ids = appointmentData.testId.map(item => item);
      setTestId(ids);
    }
  }, [appointmentData]);

  useEffect(() => {
    const fetchTestsOneByOne = async () => {
      if (testId.length === 0) return;
      const allTests = [];

      for (const id of testId) {
        try {
          const response = await getSecureApiData(`lab/test-data/${id._id}`);
          if (response.success) {
            const test = response.data;

            // Fetch report for this test
            const report = await fetchTestReport(test._id);

            if (report) {
              const mergedResults = {};
              test.component.forEach((c, i) => {
                const comp = report.component.find(rc => rc.cmpId === c._id);
                mergedResults[i] = {
                  result: comp?.result || "",
                  status: comp?.status || ""
                };
              });
              // Set results and comments keyed by test._id
              setAllComponentResults(prev => ({ ...prev, [test._id]: mergedResults }));
              setAllComments(prev => ({ ...prev, [test._id]: report.comment || "" }));
            } else {
              // If no report found, initialize empty for this test
              setAllComponentResults(prev => ({ ...prev, [test._id]: {} }));
              setAllComments(prev => ({ ...prev, [test._id]: "" }));
            }

            allTests.push(test);
          } else {
            toast.error(response.message);
          }
        } catch (err) {
          console.error(`Error fetching test ${id}:`, err);
        }
      }

      setTestData(allTests);
      if (allTests.length > 0) setSelectedTab(allTests[0]._id);
    };

    fetchTestsOneByOne();
  }, [testId]);
  const handleSave = async () => {
     if(!isOwner && !permissions?.editReport){
      toast.error('You do not have permission to edit a report ')
      return
    }
    const item = testData.find(t => t._id === selectedTab);
    if (!item) return;

    const components = item.component.map((c, i) => ({
      cmpId: c._id,
      result: allComponentResults[selectedTab]?.[i]?.result || "",
      status: allComponentResults[selectedTab]?.[i]?.status || ""
    }));

    const payload = {
      labId: userId,
      patientId: appointmentData.patientId,
      testId: selectedTab,
      appointmentId: appointMentId,
      component: components,
      comment: allComments[selectedTab] || ""
    };

    try {
      const response = await securePostData('lab/test-report', payload);
      if (response.success) {
        toast.success("Report saved successfully");
        fetchLabAppointment(); // Refresh appointment data if needed
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error("Error saving report:", err);
    }
  };

  const fetchTestReport = async (testId) => {
    try {
      const payload = { testId, appointmentId: appointMentId };
      const response = await securePostData('lab/test-report-data', payload);

      if (response.success && response.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (err) {
      console.error(`Error fetching report for test ${testId}:`, err);
      return null;
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
                                  {item.component.map((c, i) => (
                                    <React.Fragment key={i}>
                                      <tr>
                                        <td colSpan={5}>
                                          <span className="reprt-title text-capitalize">
                                            {c.title}
                                          </span>
                                        </td>
                                      </tr>

                                      <tr >
                                        <td>{c.name}</td>
                                        <td>{c.unit}</td>
                                        <td>{c.referenceRange}%</td>

                                        <td>
                                          <input
                                            type="text"
                                            className="form-control patient-frm-control"
                                            placeholder="50"
                                            value={allComponentResults[selectedTab]?.[i]?.result || ""}
                                            onChange={(e) =>
                                              setAllComponentResults(prev => ({
                                                ...prev,
                                                [selectedTab]: {
                                                  ...prev[selectedTab],
                                                  [i]: {
                                                    ...prev[selectedTab]?.[i],
                                                    result: e.target.value
                                                  }
                                                }
                                              }))
                                            }
                                          />
                                        </td>

                                        <td>
                                          <select
                                            className="form-select patient-frm-control"
                                            value={allComponentResults[selectedTab]?.[i]?.status || ""}
                                            onChange={(e) =>
                                              setAllComponentResults(prev => ({
                                                ...prev,
                                                [selectedTab]: {
                                                  ...prev[selectedTab],
                                                  [i]: {
                                                    ...prev[selectedTab]?.[i],
                                                    status: e.target.value
                                                  }
                                                }
                                              }))
                                            }
                                          >
                                            <option value="">---Select status---</option>
                                            <option value="pass">Pass</option>
                                            <option value="fail">Fail</option>
                                          </select>
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  ))}

                                </tbody>
                              </table>

                              <div>
                                <div className="custom-frm-bx cbc-commnt-bx">
                                  <textarea
                                    className="form-control"
                                    placeholder="Comment"
                                    id="comment"
                                    value={allComments[selectedTab] || ""}
                                    onChange={(e) =>
                                      setAllComments(prev => ({
                                        ...prev,
                                        [selectedTab]: e.target.value
                                      }))
                                    }
                                  ></textarea>
                                </div>
                              </div>
                            </div>

                            <div className="text-end pe-3">
                              <button onClick={handleSave} className="nw-thm-btn sub-nw-brd-tbn">Save</button>
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
      <div className="modal step-modal" id="edit-Request" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
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
                          <label className="form-check-label tests-reprt-label" htmlFor="addTests">
                            CBC Report
                          </label>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="custom-frm-bx">
                        <div className="form-check custom-check form-control tests-reprt-frm">
                          <input className="form-check-input" type="checkbox" value="" id="haemoglobin" />
                          <label className="form-check-label tests-reprt-label" htmlFor="haemoglobin">
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

    </>
  )
}

export default LabTestReports;
