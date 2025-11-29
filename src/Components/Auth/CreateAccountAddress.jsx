import { FaFlask } from "react-icons/fa6";
import { BsFillFileImageFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postApiData, securePostData } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDetail } from "../../redux/features/userSlice";


function CreateAccountAddress() {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const userId = localStorage.getItem('userId')
    const { labAddress } = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        fullAddress: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        userId
    });
    const handleChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await securePostData('lab/about', formData)
            if (response.success) {
                toast.success('Address saved successfully')
                navigate('/create-account-person')
            } else {
                toast.error(response.message)
            }
            console.log("Lab created:", response.data);
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    };
    useEffect(()=>{
        dispatch(fetchUserDetail())
    },[dispatch])
    useEffect(() => {
        if (labAddress) {
            navigate('/create-account-person')
        }
    }, [labAddress])
    return (
        <>
            <section className="admin-login-section account-lg-section nw-create-account-section">
                <div className="container-fluid px-lg-0">
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-8">
                            <div className="account-step-main-bx">
                                <NavLink to="/create-account">
                                    <div className="account-step-crd account-step-one account-progress-done">
                                        <div className="account-step-bx account-step-complete">
                                            <FaFlask className="account-step-icon" />
                                        </div>
                                        <h6>Laboratory Details</h6>
                                    </div>
                                </NavLink>

                                <NavLink to="/create-account-image">
                                    <div className="account-step-crd account-step-one account-progress-done">
                                        <div className="account-step-bx  account-step-complete">
                                            <BsFillFileImageFill className="account-step-icon" />
                                        </div>
                                        <h6>Images</h6>
                                    </div>
                                </NavLink>

                                <NavLink to="/create-account-address">
                                    <div className="account-step-crd account-step-one">
                                        <div className="account-step-bx  ">
                                            <FaMapMarkerAlt className="account-step-icon" />
                                        </div>
                                        <h6>Address</h6>
                                    </div>
                                </NavLink>

                                <NavLink to="/create-account-person">
                                    <div className="account-step-crd account-step-one">
                                        <div className="account-step-bx account-unstep-card">
                                            <FaUser className="account-step-icon" />
                                        </div>
                                        <h6>Contact Person</h6>
                                    </div>
                                </NavLink>

                                <NavLink to="/create-account-upload">
                                    <div className="account-step-crd">
                                        <div className="account-step-bx account-unstep-card">
                                            <FaCloudUploadAlt className="account-step-icon" />
                                        </div>
                                        <h6>Upload</h6>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div>
                                {/* <img src="/footer-bnner.png" alt="" /> */}
                            </div>
                        </div>

                    </div>

                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-5 col-md-6 col-sm-12">
                            <form onSubmit={handleSubmit}>
                                <div className="">
                                    <div className="neo-health-frm-card">
                                        <div className="admin-vndr-login">
                                            <h3>Laboratory Address</h3>
                                            <p>Enter  Laboratory  Address </p>
                                        </div>
                                        <div className="custom-frm-bx">
                                            <label htmlFor="">Full Address</label>
                                            <input type="text" className="form-control" name="fullAddress" value={formData.fullAddress} onChange={handleChange} placeholder="Enter Full Address" />
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label htmlFor="">Country</label>
                                            <select name="country" value={formData.country} onChange={handleChange} id="" className="form-select">
                                                <option value="">---Select Country---</option>
                                                <option value="India">India</option>
                                            </select>
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label htmlFor="">State</label>
                                            <select name="state" value={formData.state} onChange={handleChange} id="" className="form-select">
                                                <option value="">---Select State---</option>
                                                <option value="Rajasthan">Rajasthan</option>
                                            </select>
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label htmlFor="">City</label>
                                            <select name="city" value={formData.city} onChange={handleChange} id="" className="form-select">
                                                <option value="">---Select City---</option>
                                                <option value="Jaipur">Jaipur</option>
                                            </select>
                                        </div>

                                        <div className="custom-frm-bx">
                                            <label htmlFor="">Pin Code</label>
                                            <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} className="form-control" placeholder="Enter Pin code" />
                                        </div>


                                        <div className='mt-4'>
                                            <button type="submit" className="admin-lg-btn">
                                                Next
                                            </button>
                                        </div>

                                        <div className='text-center mt-5'>
                                            <span className='do-account-title'>Already have an account? <NavLink to="/login" className='lab-login-forgot-btn'>Login here</NavLink></span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <div>
                                <img src="/footer-bnner.png" alt="" />
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default CreateAccountAddress