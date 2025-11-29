import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PiTagChevronFill } from "react-icons/pi";
import { securePostData, updateApiData } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

function PermissionCheck() {
    const userId = localStorage.getItem('userId')
    const permission = JSON.parse(sessionStorage.getItem('permission'))
    const { id: permissionId, name } = useParams();
    const [formData, setFormData] = useState({
        permissionId, labId: userId,
        name: name,
        testRequest: false,
        addTest: false,
        editTest: false,
        viewTest: false,
        viewReport: false,
        export: false,
        editReport: false,
        patientDetails: false,
        appointmentDetails: false,
        sendReportMail: false,
        printReport: false,
        addReport: false,
        patientCall: false,
        patientMail: false,
        paymentStatus: false,
        appointmentStatus: false,
        chat: false,
    })
    const navigate = useNavigate()
    const updateLabPermission = async (e) => {
        e.preventDefault()
        try {
            const response = await updateApiData(`lab/permission`, formData);
            if (response.success) {
                sessionStorage.removeItem('permission')
                toast.success("Permission updated")
                navigate(-1)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked,
        });
    };
    useEffect(() => {
    if (Object.keys(permission).length > 0) {
        setFormData(prev => ({
            ...prev,
            permissionId,
            ...permission
        }));
    }
}, []);

    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <form action="">
                    <div className="row mb-3">
                        <div className="d-flex align-items-center justify-content-between">
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
                        </div>
                    </div>
                </form>
                <div className="submega-main-bx">
                    <form onSubmit={updateLabPermission}>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">

                                {/* Test Request */}
                                <div className="permission-check-main-bx">
                                    <h4><PiTagChevronFill className="test-requst-icon" /> Test Request Management</h4>
                                    <div className="form-check custom-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="testRequest"
                                            checked={formData.testRequest}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Test Request</label>
                                    </div>
                                </div>

                                {/* Test Management */}
                                <div className="permission-check-main-bx my-4">
                                    <h4><PiTagChevronFill className="test-requst-icon" /> Tests Management</h4>
                                    <ul className="permision-check-list">
                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="addTest"
                                                    checked={formData.addTest}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Add Tests</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="editTest"
                                                    checked={formData.editTest}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Edit Test</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="viewTest"
                                                    checked={formData.viewTest}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">View Test</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* Lab Reports */}
                                <div className="permission-check-main-bx my-4">
                                    <h4><PiTagChevronFill className="test-requst-icon" /> Lab Reports Management</h4>
                                    <ul className="permision-check-list">

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="viewReport"
                                                    checked={formData.viewReport}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">View Lab Reports List</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="export"
                                                    checked={formData.export}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Export</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="editReport"
                                                    checked={formData.editReport}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Edit Report</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="patientDetails"
                                                    checked={formData.patientDetails}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Patient Details</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="appointmentDetails"
                                                    checked={formData.appointmentDetails}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Appointment Details</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="sendReportMail"
                                                    checked={formData.sendReportMail}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Send Report Email</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="printReport"
                                                    checked={formData.printReport}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Print Report</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="addReport"
                                                    checked={formData.addReport}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Add Report</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="patientCall"
                                                    checked={formData.patientCall}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Patient Call</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="patientMail"
                                                    checked={formData.patientMail}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Patient Email</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="paymentStatus"
                                                    checked={formData.paymentStatus}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Payment Status</label>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="form-check custom-check">
                                                <input className="form-check-input" type="checkbox"
                                                    name="appointmentStatus"
                                                    checked={formData.appointmentStatus}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Appointment Status</label>
                                            </div>
                                        </li>

                                    </ul>
                                </div>

                                {/* Chat */}
                                <div className="permission-check-main-bx">
                                    <h4><PiTagChevronFill className="test-requst-icon" /> Chat Management</h4>
                                    <div className="form-check custom-check">
                                        <input className="form-check-input" type="checkbox"
                                            name="chat"
                                            checked={formData.chat}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">Chat</label>
                                    </div>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="nw-filtr-thm-btn">Save</button>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default PermissionCheck