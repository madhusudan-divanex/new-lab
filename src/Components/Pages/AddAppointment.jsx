import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPlusCircle } from "react-icons/fa";
import { getSecureApiData, securePostData } from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddAppointment() {
    const userId = localStorage.getItem('userId')
    const [allTest, setAllTest] = useState([])
    const [aptDate,setAptDate]=useState({date:null,time:null})
    const [selectedTest, setSelectedTest] = useState([''])
    const fetchLabTest = async () => {
        try {
            const response = await getSecureApiData(`lab/test/${userId}`);
            if (response.success) {
                setAllTest(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    useEffect(() => {
        if (userId) {
            fetchLabTest()
        }
    }, [userId])
    const handleAddTest = () => {
        setSelectedTest([...selectedTest, ""]);
    };
    const handleRemoveTest = (index) => {
        const updatedTests = selectedTest.filter((_, i) => i !== index);
        setSelectedTest(updatedTests);
    };
    const handleChange = (index, value) => {
        const updatedTests = [...selectedTest];
        updatedTests[index] = value;
        setSelectedTest(updatedTests);
    };
    const appointmentSubmit = async (e) => {
        e.preventDefault()
        if (selectedTest[0] === '') {
            return
        }
        const selectedTestsDetails = allTest.filter((test) =>
            selectedTest.includes(test._id)
        );
        const totalFee = selectedTestsDetails.reduce(
            (acc, item) => acc + Number(item?.price),
            0
        );
        const data = {
            patientId: patData?._id, status: 'approved',
            testId: selectedTest,
            date: new Date(), labId: userId, fees: totalFee
        }
        try {
            const response = await securePostData(`appointment/lab`, data)
            if (response.success) {

                handleBack(e, "#profile-tab");
                // setTestId(response.data.testId)
                // setAppointmentData(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div>
                        <h3 className="innr-title mb-2 gradient-text">Add Appointment</h3>
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
                                            Appointment
                                        </a>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page"
                                    >
                                        Add Appointment
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <form onSubmit={appointmentSubmit} className='new-panel-card'>

                    <div className="new-panel-card mb-3">
                        <form action="">
                            <div className="row">
                                <div>
                                    <h4 className="fz-18 fw-700 text-black">Appointment Details</h4>
                                    <p className="fw-400 fz-16">Enter the details for the new appointment.</p>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Appointment Date</label>
                                        <input onChange={(e)=>setAptDate({...aptDate,date:e.target.value})}
                                        min={new Date().toISOString().split("T")[0]}
                                         type="date" className="form-control nw-frm-select" />
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="custom-frm-bx">
                                        <label htmlFor="">Appointment Time</label>
                                        <input 
                                        min={new Date().toISOString().split("T")[0]}
                                        onChange={(e)=>setAptDate({...aptDate,time:e.target.value})} type="time" className="form-control nw-frm-select" />
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>


                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                            <div className="new-panel-card">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div>
                                        <h4 className="fz-18 fw-700 text-black">Select Patient</h4>
                                        <p className="fw-400 fz-16">select a patient for this appointment.</p>
                                    </div>

                                    {/* <div>
                                        <button className="nw-exprt-btn">
                                            <FaPlusCircle />  Add Patient
                                        </button>
                                    </div> */}

                                </div>

                                <div className="custom-frm-bx">
                                    <label htmlFor="">Patient</label>
                                    <div class="select-wrapper">
                                        <select class="form-select nw-control-frm">
                                            <option>---Select Patient ---</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                            <div className="new-panel-card">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div>
                                        <h4 className="fz-18 fw-700 text-black">Select Doctor</h4>
                                        <p className="fw-400 fz-16">Choose a doctor for this appointment.</p>
                                    </div>

                                    {/* <div>
                                        <button className="nw-exprt-btn">
                                            <FaPlusCircle />  Add Doctor
                                        </button>
                                    </div> */}

                                </div>

                                <div className="custom-frm-bx">
                                    <label htmlFor="">Doctor</label>
                                    <div class="select-wrapper">
                                        <select class="form-select nw-control-frm">
                                            <option>---Select Doctor ---</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="new-panel-card">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div>
                                        <h4 className="fz-18 fw-700 text-black">Lab Test</h4>
                                        <p className="fw-400 fz-16">Select lab test and book appointment.</p>
                                    </div>


                                </div>
                                {selectedTest?.map((item, key) => (
                                    <div className="col-lg-12" key={key}>
                                        <div className="custom-frm-bx">
                                            <label htmlFor="">Add Lab Test</label>
                                            <div className="d-flex align-items-center gap-2">
                                                <select
                                                    value={item}
                                                    required
                                                    onChange={(e) => handleChange(key, e.target.value)}
                                                    className="form-select"
                                                >
                                                    <option value="">Select Test</option>
                                                    {allTest
                                                        ?.filter(
                                                            (t) =>
                                                                // Allow tests that are not already selected OR the current one (to allow reselecting it)
                                                                !selectedTest.includes(t._id) || t._id === item
                                                        )
                                                        .map((t) => (
                                                            <option key={t._id} value={t._id}>
                                                                {t.shortName}
                                                            </option>
                                                        ))}
                                                </select>

                                                <button
                                                    className="text-black"
                                                    disabled={selectedTest?.length === 1}
                                                    onClick={() => handleRemoveTest(key)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                    <div className="text-end mt-4">
                        <button className="nw-thm-btn" type="submit" >Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddAppointment