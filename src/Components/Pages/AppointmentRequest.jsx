import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSecureApiData, updateApiData } from "../../services/api";
import base_url from "../../../baseUrl";

function AppointmentRequest() {
    const userId = localStorage.getItem('userId')
    const [appointments, setAppointments] = useState([])
    const [allTest,setAllTest]=useState([])
    const fetchLabAppointment = async () => {
        try {
            const response = await getSecureApiData(`lab/appointment/${userId}`);
            if (response.success) {
                // setCurrentPage(response.pagination.page)
                // setTotalPage(response.pagination.totalPages)
                setAppointments(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
     const appointmentAction = async (id,status) => {
        const data={labId:userId,appointmentId:id,status}
        try {
            const response = await updateApiData(`appointment/lab-action`,data);
            if (response.success) {
                // setCurrentPage(response.pagination.page)
                // setTotalPage(response.pagination.totalPages)
                fetchLabAppointment()
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    const fetchLabTest = async () => {
        try {
            const response = await getSecureApiData(`lab/test/${userId}`);
            if (response.success) {
                // setCurrentPage(response.pagination.page)
                // setTotalPage(response.pagination.totalPages)
                setAllTest(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    useEffect(() => {
        fetchLabAppointment()
        fetchLabTest()
    }, [])
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <form action="">
                    <div className="row mb-3">
                        <div>
                            <h3 className="innr-title">Appointment Request</h3>
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
                                            Appointment Request
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>





                        {/* 
                                <div className="col-lg-2">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Status </label>
                                        <select className="form-select ">
                                            <option>All</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="custom-frm-bx">
                                        <select className="form-select ">
                                            <option>All</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="custom-frm-bx">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="custom-frm-bx">
                                        <input type="date" className="form-control" />
                                    </div>
                                </div> */}

                        <div className="filters">
                            <div className="field custom-frm-bx mb-0">
                                <label className="label">Status:</label>
                                <select>
                                    <option>All</option>
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            <div className="field custom-frm-bx mb-0">
                                <label className="label">Test:</label>
                                <select>
                                    <option>All</option>
                                    {allTest?.length>0 && 
                                    allTest?.map((item,key)=><option value={item._id} key={key}>{item?.shortName}</option>)}
                                    
                                </select>
                            </div>

                            <div className="field custom-frm-bx mb-0">
                                <label className="label">Date from:</label>
                                <input type="date" className="" />
                            </div>

                            <div className="field custom-frm-bx mb-0">
                                <label className="label">Date to:</label>
                                <input type="date" />
                            </div>

                            <div>
                                <a href="javascript:void(0)" className="nw-thm-btn" >Filter</a>
                            </div>

                        </div>


                    </div>
                </form>

                <div className="row justify-content-between">
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
                                            <th>Patient Name</th>
                                            <th>Date</th>
                                            <th>Test</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments?.length > 0 &&
                                            appointments?.map((item, key) =>
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>
                                                        <div className="admin-table-bx">
                                                            <div className="admin-table-sub-bx">
                                                                <img src={item?.patientId?.profileImage? `${base_url}/${item?.patientId?.profileImage}`:"/table-avatar.jpg"} alt="" />
                                                                <div className="admin-table-sub-details">
                                                                    <h6>{item?.patientId?.name} </h6>
                                                                    <p>ID: {item?.patientId?._id?.slice(-10)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{new Date(item?.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })}
                                                    </td>
                                                    <td>{item?.testId?.map((item)=>item?.shortName+',')}</td>
                                                    <td>
                                                        {item?.status=='rejected'&& <span className="approved reject">Reject</span>}
                                                        {(item?.status!=='rejected' && item?.status!=='pending')&& 
                                                        <span className="text-capitalize">{item?.status}</span>}

                                                        {item?.status=='pending' &&<ul className="test-action-list">
                                                            <li className="test-action-item">
                                                                <button
                                                                    onClick={()=>appointmentAction(item._id,'approved')}
                                                                    className="test-right-btn"
                                                                >
                                                                    <FontAwesomeIcon icon={faCheck} />
                                                                </button>
                                                            </li>
                                                            <li className="test-action-item">
                                                                <button
                                                                    onClick={()=>appointmentAction(item._id,'rejected')}
                                                                    className="test-right-btn test-close-btn"
                                                                >
                                                                    <FontAwesomeIcon icon={faClose} />
                                                                </button>
                                                            </li>
                                                        </ul>}
                                                    </td>
                                                </tr>)}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AppointmentRequest