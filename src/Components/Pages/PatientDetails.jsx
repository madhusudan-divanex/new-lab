import { faEnvelope,  faMessage,  faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { NavLink } from "react-router-dom"
import { getSecureApiData } from "../../services/api"
import { useEffect, useState } from "react"
import base_url from "../../../baseUrl"


function PatientDetails() {
  const userId = localStorage.getItem('userId')
    const [appointments, setAppointments] = useState([])
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
    useEffect(()=>{
        fetchLabAppointment()
    },[userId])
  return (
   <>
     <div className="main-content flex-grow-1 p-3 overflow-auto">
        <form action="">
          <div className="row mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="innr-title">Patient Details</h3>
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
                          Test  Request
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Patient Details
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </form>

          <div className="submega-main-bx">
            <div className="row">
                <div className="col-lg-12">
                    {appointments?.length>0&& 
                    appointments?.map((item,key)=>
                    <div key={key} className="patient-main-bx">
                        <h5>Patient Details</h5>
                         <div className="admin-table-bx">
                             <div className=" patient-details-bx mb-3">
                                 <div className="admin-table-sub-bx patient-avartr-bx gap-3">
                                <img src={item?.profileImage? `${base_url}/${item?.profileImage}` :"/table-avatar.jpg"} alt="" />
                                <div className="admin-table-sub-details patient-bio-content">
                                  <h6>{item?.patientId?.name}</h6>
                                  <p>ID: {item?.patientId?.customId}</p>
                                </div>
                              </div>

                              <div className="patient-social-bx">
                                <button type="button" className="patient-social-btn animate-btn"><FontAwesomeIcon icon={faPhone}/></button>
                                <a href="javascript:void(0)" className="patient-social-btn"><FontAwesomeIcon icon={faEnvelope}/></a>
                                <button href="javascript:void(0)" className="patient-social-btn"><FontAwesomeIcon icon={faMessage}/></button>
                              </div>
                             </div>

                             <div className="d-flex align-items-center justify-content-between flex-wrap">
                              <ul className="patient-bio-list">
                                <li className="patient-bio-item"><img src="/person.png" alt="" /> Age :<span className="patient-bio-title"> 18</span> </li>
                                <li className="patient-bio-item"><img src="/gender.png" alt="" /> Gender :<span className="patient-bio-title"> {item?.patientId?.gender}</span> </li>
                                <li className="patient-bio-item"><img src="/height.png" alt="" /> Height :<span className="patient-bio-title"> 6 fit </span> </li>
                                <li className="patient-bio-item"><img src="/weight.png" alt="" /> Weight :<span className="patient-bio-title"> 50 Kg</span> </li>
                                <li className="patient-bio-item"><img src="/blood.png" alt="" /> Blood Group :<span className="patient-bio-title"> B+</span> </li>
                             </ul>
                              <div>
                              <NavLink to={`/patient-view/${item?.patientId?._id}`} className="option-rep-add-btn">View More</NavLink>
                             </div>
                             </div>

                            

                            </div>
                    </div>)}
                </div>
            </div>
          </div>

        
      </div>
   </>
  )
}

export default PatientDetails