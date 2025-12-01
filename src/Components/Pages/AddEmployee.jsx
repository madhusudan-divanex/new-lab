import { IoCloudUploadOutline } from "react-icons/io5";
import { FaPlusSquare } from "react-icons/fa";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSecureApiData, securePostData } from "../../services/api";
import { Tab } from "bootstrap";
import { useSearchParams } from "react-router-dom";
import base_url from "../../../baseUrl";

function AddEmployee() {
    const [searchParams] = useSearchParams()
    const [staffId, setStaffId] = useState(searchParams.get('id'))
    const userId = localStorage.getItem('userId')
    const [permisions, setPermissions] = useState([])
    const [userInfo, setUserInfo] = useState({
        name: '',
        address: '',
        dob: '',
        state: '',
        city: '',
        pinCode: '',
        contactInformation: { contactNumber: "", email: "", emergencyContactName: "", emergencyContactNumber: "" },
        profileImage: null,
        status: 'active',
        labId: userId,
    });

    // 2. Professional Info state
    const [professionalInfo, setProfessionalInfo] = useState({
        labCert: [{ certName: "", certFile: null }], // array of certificates
        profession: '',
        specialization: '',
        totalExperience: '',
        professionalBio: '',
        education: [{ university: "", degree: "", yearFrom: "", yearTo: "" }], // array of education objects
        empId: staffId,
    });

    // 3. Employment Info state
    const [employmentInfo, setEmploymentInfo] = useState({
        position: '',
        joinDate: '',
        onLeaveDate: '',
        contractStart: '',
        contractEnd: '',
        salary: '',
        note: '',
        labId: userId
    });

    // 4. Access Info state
    const [accessInfo, setAccessInfo] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        permissionId: '', // ref to lab-permission
        labId: userId
    });
    const handleUserChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            setUserInfo((prev) => ({
                ...prev,
                [name]: files[0],
            }));
            return;
        }
        if (name.startsWith("contactInformation.")) {
            const key = name.split(".")[1];
            setUserInfo((prev) => ({
                ...prev,
                contactInformation: {
                    ...prev.contactInformation,
                    [key]: value,
                },
            }));

            return;
        }
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // 2. Professional Info
    const handleProfessionalChange = (e, index = null, section = null) => {
        const { name, value, files } = e.target;

        // Handle File upload (certFile)
        if (files) {
            const file = files[0];

            // Allow only PDF or Image
            const validTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            if (!validTypes.includes(file.type)) {
                return alert("Only images or PDF allowed");
            }

            setProfessionalInfo(prev => ({
                ...prev,
                labCert: prev.labCert.map((item, i) =>
                    i === index ? { ...item, certFile: file } : item
                )
            }));
            return;
        }

        // Handle nested arrays like education[index]
        if (section === "education") {
            setProfessionalInfo(prev => ({
                ...prev,
                education: prev.education.map((item, i) =>
                    i === index ? { ...item, [name]: value } : item
                )
            }));
            return;
        }

        // Handle nested certificate name update
        if (section === "labCert") {
            setProfessionalInfo(prev => ({
                ...prev,
                labCert: prev.labCert.map((item, i) =>
                    i === index ? { ...item, [name]: value } : item
                )
            }));
            return;
        }

        // Normal fields
        setProfessionalInfo(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    const addEducation = () => {
        setProfessionalInfo(prev => ({
            ...prev,
            education: [...prev.education, { university: "", degree: "", yearFrom: "", yearTo: "" }]
        }));
    };

    const addCertificate = () => {
        setProfessionalInfo(prev => ({
            ...prev,
            labCert: [...prev.labCert, { certName: "", certFile: null }]
        }));
    };
    const removeEducation =async (index,item) => {
        if(item && item._id){
            const data={empId:staffId,id:item._id,type:'education'}
            await securePostData('lab/sub-professional',data)
        }
        setProfessionalInfo(prev => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }));
    };

    const removeCertificate = async(index,item) => {
        if(item && item._id){
            const data={empId:staffId,id:item._id,type:'cert'}
            await securePostData('lab/sub-professional',data)
        }
        setProfessionalInfo(prev => ({
            ...prev,
            labCert: prev.labCert.filter((_, i) => i !== index)
        }));
    };
    // 3. Employment Info
    const handleEmploymentChange = (e) => {
        const { name, value } = e.target;
        setEmploymentInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    // 4. Access Info
    const handleAccessChange = (e) => {
        const { name, value } = e.target;
        setAccessInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const fetchLabPermission = async () => {
        try {
            const response = await getSecureApiData(`lab/permission/${userId}`);
            if (response.success) {
                setPermissions(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    useEffect(() => {
        fetchLabPermission()
    }, [])
    const handleBack = (e, name) => {
        e.preventDefault(); // prevent page reload
        const tabTrigger = document.querySelector(name); // the tab button for "contact"
        const tab = new Tab(tabTrigger);
        tab.show();
    };
    const userInfoSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        for (let key in userInfo) {
            if (key == 'contactInformation' || key == 'profileImage') continue
            data.append(key, userInfo[key])
        }
        const cdata = JSON.stringify(userInfo.contactInformation)
        data.append('contactInformation', cdata)
        if (userInfo.profileImage) {
            data.append('profileImage', userInfo.profileImage)
        }
        if (staffId) {
            data.append('empId', staffId)
        }
        try {
            const response = await securePostData(`lab/staff`, data);
            if (response.success) {
                toast.success("Personal Info was saved")
                setStaffId(response.empId)
                handleBack(e, '#profile-tab')
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    const professionalSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Basic fields
        for (let key in professionalInfo) {
            if (key === 'labCert' || key === 'education') continue;
            data.append(key, professionalInfo[key]);
        }

        // Education
        data.append("education", JSON.stringify(professionalInfo.education));

        // Certificate metadata
        const certMeta = professionalInfo.labCert.map(i => ({
            certName: i.certName
        }));
        data.append("labCert", JSON.stringify(certMeta));

        // Certificate files
        professionalInfo.labCert.forEach(i => {
            if (i.certFile) {
                data.append("certFile", i.certFile);
            }
        });

        try {
            const response = await securePostData(`lab/professional`, data);
            if (response.success) {
                toast.success("Professional data was saved")
                handleBack(e, "#contact-tab");
            } else {
                toast.error(response.message);
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    };

    const employmentSubmit = async (e) => {
        e.preventDefault()
        // const data = new FormData()
        // for (let key in employmentInfo) {
        //     data.append(key, employmentInfo[key])
        // }
        if (!staffId) return
        const data = { ...employmentInfo, empId: staffId }
        try {
            const response = await securePostData(`lab/employment`, data);
            if (response.success) {
                toast.success("Employment data was saved")
                handleBack(e, '#upload-tab')
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    const accessSubmit = async (e) => {
        e.preventDefault()
        if (!staffId) return
        if (accessInfo.password !== accessInfo.confirmPassword) {
            toast.error('Password not matched')
        }
        const data = { ...accessInfo, empId: staffId }
        try {
            const response = await securePostData(`lab/access`, data);
            if (response.success) {
                toast.success("Data updated")
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }

    const [empData, setEmpData] = useState()
    const fetchStaffData = async () => {
        if (!staffId) return
        try {
            const response = await getSecureApiData(`lab/staff-data/${staffId}`);
            if (response.success) {
                setUserInfo(prev => ({
                    ...prev,
                    ...response.employee,
                    dob: response.employee.dob?.split("T")[0]
                }));
                setEmploymentInfo(prev => ({
                    ...prev,
                    ...response.employment,
                    joinDate: response?.employment?.joinDate ? response.employment.joinDate.split("T")[0] : "",
                    contractEnd: response?.employment?.contractEnd ? response.employment.contractEnd.split("T")[0] : "",
                    contractStart: response?.employment?.contractStart ? response.employment.contractStart.split("T")[0] : "",
                    onLeaveDate: response?.employment?.onLeaveDate ? response.employment.onLeaveDate.split("T")[0] : ""
                }))

                setAccessInfo(prev => ({
                    ...prev,
                    ...response.empAccess
                }))
                setProfessionalInfo(prev => ({
                    ...prev,
                    ...response.professional
                }))

            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    useEffect(() => {
        fetchStaffData()
    }, [staffId])
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title">Add Employee</h3>
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
                                                Employee List
                                            </a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Add Employee
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="employee-tabs mb-4">
                            <ul className="nav nav-tabs gap-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a
                                        className="nav-link active"
                                        id="home-tab"
                                        data-bs-toggle="tab"
                                        href="#home"
                                        role="tab"
                                    >
                                        Personal Info
                                    </a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a
                                        className="nav-link"
                                        id="profile-tab"
                                        data-bs-toggle="tab"
                                        href="#profile"
                                        role="tab"
                                    >
                                        Professional
                                    </a>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <a
                                        className="nav-link"
                                        id="contact-tab"
                                        data-bs-toggle="tab"
                                        href="#contact"
                                        role="tab"
                                    >
                                        Employment
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        className="nav-link"
                                        id="upload-tab"
                                        data-bs-toggle="tab"
                                        href="#upload"
                                        role="tab"
                                    >
                                        Access
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="lab-chart-crd">
                            <div className="patient-bio-tab">
                                <div className="tab-content" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                    >
                                        <form onSubmit={userInfoSubmit}>
                                            <div className="row">
                                                <div className="d-flex align-items-center gap-3">
                                                    <h4 className="lg_title text-black">Personal Information</h4>
                                                    <div className="switch">
                                                        <input type="checkbox" id="toggle7" />
                                                        <label for="toggle7"></label>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="custom-frm-bx">
                                                        <div className="upload-box  p-3">
                                                            <div className="upload-icon mb-2">
                                                                <IoCloudUploadOutline />
                                                            </div>

                                                            <div>
                                                                <p className="fw-semibold mb-1">
                                                                    <label htmlFor="fileInput1" className="file-label file-select-label">
                                                                        Choose a file or drag & drop here
                                                                    </label>
                                                                </p>

                                                                <small className="format-title">JPEG Format</small>


                                                                <div className="mt-3">
                                                                    <label htmlFor="fileInput1" className="browse-btn">
                                                                        Browse File
                                                                    </label>
                                                                </div>

                                                                <input
                                                                    type="file"
                                                                    className="d-none"
                                                                    onChange={handleUserChange}
                                                                    id="fileInput1"
                                                                    name="profileImage"
                                                                    accept=".png,.jpg,.jpeg"
                                                                />

                                                                {userInfo.profileImage instanceof File && (
                                                                    <div id="filePreviewWrapper" className="mt-3">
                                                                        <img
                                                                            src={URL.createObjectURL(userInfo.profileImage)}
                                                                            alt="Preview"
                                                                            className="img-thumbnail"
                                                                        />
                                                                    </div>
                                                                )}{typeof userInfo.profileImage === "string" &&
                                                                    userInfo.profileImage.startsWith("uploads") && (
                                                                        <div id="filePreviewWrapper" className="mt-3">
                                                                            <img
                                                                                src={`${base_url}/${userInfo.profileImage}`}
                                                                                alt="Preview"
                                                                                className="img-thumbnail"
                                                                            />
                                                                        </div>
                                                                    )}

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="row">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter name"
                                                            value={userInfo.name}
                                                            name="name"
                                                            onChange={handleUserChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Date of Birth</label>
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder=""
                                                            value={userInfo.dob}
                                                            name="dob"
                                                            max={new Date().toISOString().split("T")[0]}
                                                            onChange={handleUserChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Gender</label>
                                                        <select className="form-select nw-frm-control" value={userInfo.gender}
                                                            name="gender"
                                                            onChange={handleUserChange}
                                                            required>
                                                            <option>---Select Gender---</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">other</option>

                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Address</label>
                                                        <textarea value={userInfo.address}
                                                            name="address"
                                                            onChange={handleUserChange}
                                                            required id="" className="form-control" placeholder="Enter Address"></textarea>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">State</label>
                                                        <select className="form-select nw-frm-control" value={userInfo.state}
                                                            name="state"
                                                            onChange={handleUserChange}
                                                            required>
                                                            <option>---Select State---</option>
                                                            <option value="rajasthan">Rajasthan</option>
                                                            <option value="gujrat">Gujrat</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">City</label>
                                                        <select className="form-select nw-frm-control" value={userInfo.city}
                                                            name="city"
                                                            onChange={handleUserChange}
                                                            required>
                                                            <option>---Select City---</option>
                                                            <option value="jaipur">Jaipur</option>
                                                            <option value="ahemdabad">Ahemdabad</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Pin code</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Pin code"
                                                            value={userInfo.pinCode}
                                                            name="pinCode"
                                                            onChange={handleUserChange}
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-lg-12 my-3">
                                                    <div className="">
                                                        <h5 className="add-contact-title">Contact Information</h5>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Mobile Number</label>
                                                        <input
                                                            type="number"
                                                            className="form-control "
                                                            placeholder="Enter  mobile number"
                                                            value={userInfo.contactInformation.contactNumber}
                                                            name="contactInformation.contactNumber"
                                                            onChange={handleUserChange}
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter  Email"
                                                            value={userInfo.contactInformation.email}
                                                            name="contactInformation.email"
                                                            onChange={handleUserChange}
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Emergency Contact Name</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter  Emergency Contact Name"
                                                            value={userInfo.contactInformation.emergencyContactName}
                                                            name="contactInformation.emergencyContactName"
                                                            onChange={handleUserChange}
                                                            required
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Emergency Contact Phone</label>
                                                        <input
                                                            type="number"
                                                            className="form-control "
                                                            placeholder="Enter  Emergency Contact Phone"
                                                            value={userInfo.contactInformation.emergencyContactNumber}
                                                            name="contactInformation.emergencyContactNumber"
                                                            onChange={handleUserChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="text-end">
                                                    <button type="submit" className="nw-thm-btn">Save & Continue</button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel">
                                        <form onSubmit={professionalSubmit}>
                                            <div className="row">
                                                <h4 className="lg_title text-black">Professional Information</h4>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Profession</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="e.g. Pharmacist, Nurse, etc."
                                                            value={professionalInfo.profession}
                                                            name="profession"
                                                            onChange={handleProfessionalChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Specialization</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="e.g. Cardiology, Pediatrics, etc."
                                                            value={professionalInfo.specialization}
                                                            name="specialization"
                                                            onChange={handleProfessionalChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Total Experience</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter  Total Experience"
                                                            value={professionalInfo.totalExperience}
                                                            name="totalExperience"
                                                            onChange={handleProfessionalChange}
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Professional Bio</label>
                                                        <textarea value={professionalInfo.professionalBio}
                                                            name="professionalBio"
                                                            onChange={handleProfessionalChange}
                                                            required id="" className="form-control" placeholder="Enter professional biography and experience"></textarea>
                                                    </div>
                                                </div>


                                                <div className="col-lg-12 my-3">
                                                    <div className="">
                                                        <h5 className="add-contact-title">Education</h5>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="education-frm-bx mb-4">
                                                {professionalInfo.education.map((item, index) => (
                                                    <div className="row" key={index}>

                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label>University / Institution</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter University / Institution"
                                                                    value={item.university}
                                                                    name="university"
                                                                    onChange={(e) => handleProfessionalChange(e, index, "education")}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label>Degree / Qualification</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter Degree / Qualification"
                                                                    value={item.degree}
                                                                    name="degree"
                                                                    onChange={(e) => handleProfessionalChange(e, index, "education")}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label>Year From</label>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    placeholder="Enter Year From"
                                                                    value={item.yearFrom}
                                                                    name="yearFrom"
                                                                    onChange={(e) => handleProfessionalChange(e, index, "education")}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                                            <div className="return-box">
                                                                <div className="custom-frm-bx flex-column flex-grow-1">
                                                                    <label>Year To</label>
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        placeholder="Enter Year To"
                                                                        value={item.yearTo}
                                                                        name="yearTo"
                                                                        onChange={(e) => handleProfessionalChange(e, index, "education")}
                                                                        required
                                                                    />
                                                                </div>

                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        disabled={professionalInfo.education.length === 1}
                                                                        className="text-black"
                                                                        onClick={() => removeEducation(index,item)}
                                                                    >
                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                ))}

                                            </div>

                                            <div className="text-end my-3">
                                                <button onClick={() => addEducation()} className="employee-data-btn"><FaPlusSquare /> Add More</button>
                                            </div>

                                            <div className="col-lg-12 my-3">
                                                <div className="">
                                                    <h5 className="add-contact-title">Certificate</h5>
                                                </div>
                                            </div>
                                            <div className="education-frm-bx mt-4 mb-4">
                                                {professionalInfo.labCert.map((item, index) => (
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Certificate</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Certificate Name"
                                                                    value={item.certName}
                                                                    name="certName"
                                                                    onChange={(e) => handleProfessionalChange(e, index, "labCert")}
                                                                    required
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                                            <div className="return-box">
                                                                <div className="custom-frm-bx mb-3 flex-column flex-grow-1">
                                                                    <label className="">Certificate Upload</label>

                                                                    <div className="custom-file-wrapper">
                                                                        <span className="em-browse-btn">Browse File</span>
                                                                        <span className="em-file-name">{item.certFile ? (item.certFile.name || item?.certFile.split("\\").pop().split("-").slice(1).join("-")) : "No Choose file"}</span>
                                                                        <input type="file" name="certFile" onChange={(e) => handleProfessionalChange(e, index, "labCert")} className="real-file-input" />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <button className="text-black"
                                                                        disabled={professionalInfo?.labCert?.length === 1}
                                                                        onClick={() => removeCertificate(index,item)}><FontAwesomeIcon icon={faTrash} /></button>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>))}


                                            </div>
                                            <div className="text-end my-3">
                                                <button onClick={() => addCertificate()} className="employee-data-btn"><FaPlusSquare /> Add More</button>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-end gap-3">
                                                <button type="button" onClick={(e) => handleBack(e, '#home-tab')} className="nw-thm-btn outline rounded-3">Back </button>
                                                <button type="submit" className="nw-thm-btn rounded-3" >Save & Continue</button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="tab-pane fade" id="contact" role="tabpanel">
                                        <form onSubmit={employmentSubmit}>
                                            <div className="row">

                                                <div className="d-flex align-items-center gap-3">
                                                    <h4 className="lg_title text-black">Employment Details</h4>
                                                    <div className="switch">
                                                        <input type="checkbox" id="toggle8" />
                                                        <label for="toggle8"></label>
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Employee ID</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            disabled
                                                            placeholder="Enter Employee ID"
                                                            value={staffId}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Position/Role</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Position/Role"
                                                            value={employmentInfo?.position}
                                                            required
                                                            name="position"
                                                            onChange={handleEmploymentChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Join Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter  Total Experience"
                                                            value={employmentInfo?.joinDate}
                                                            required
                                                            name="joinDate"
                                                            onChange={handleEmploymentChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">On Leave Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter  Total Experience"
                                                            value={employmentInfo?.onLeaveDate}
                                                            required
                                                            name="onLeaveDate"
                                                            onChange={handleEmploymentChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Salary($)</label>
                                                        <input type="number" value={employmentInfo?.salary}
                                                            required
                                                            name="salary"
                                                            onChange={handleEmploymentChange} id="" className="form-control"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 my-3">
                                                    <div className="">
                                                        <h5 className="add-contact-title">Contract Details</h5>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Contract Start</label>
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter  Total Experience"
                                                            value={employmentInfo?.contractStart}
                                                            required
                                                            name="contractStart"
                                                            onChange={handleEmploymentChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Contract End</label>
                                                        <input
                                                            type="date"
                                                            className="form-control "
                                                            placeholder="Enter  Total Experience"
                                                            value={employmentInfo?.contractEnd}
                                                            required
                                                            name="contractEnd"
                                                            onChange={handleEmploymentChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-12 mt-5">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Note</label>
                                                        <textarea value={employmentInfo?.note}
                                                            required
                                                            name="note"
                                                            onChange={handleEmploymentChange} id="" className="form-control" placeholder="Enter Note"></textarea>
                                                    </div>
                                                </div>



                                            </div>


                                            <div className="d-flex align-items-center justify-content-end gap-3">
                                                <button type="button" className="nw-thm-btn outline rounded-3" onClick={(e) => handleBack(e, '#profile-tab')}>Back </button>
                                                <button type="submit" className="nw-thm-btn rounded-3" >Save & Continue</button>
                                            </div>

                                        </form>
                                    </div>


                                    <div className="tab-pane fade" id="upload" role="tabpanel">
                                        <form onSubmit={accessSubmit}>
                                            <div className="row">
                                                <h4 className="lg_title text-black">Access</h4>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Username</label>
                                                        <input
                                                            type="text"
                                                            className="form-control "
                                                            placeholder="Enter Username"
                                                            value={accessInfo.userName}
                                                            onChange={handleAccessChange}
                                                            name="userName"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Email for Access</label>
                                                        <input
                                                            type="email"
                                                            className="form-control "
                                                            placeholder="Enter Email  Address"
                                                            value={accessInfo.email}
                                                            onChange={handleAccessChange}
                                                            name="email"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Temporary Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control "
                                                            placeholder="Enter Password"
                                                            value={accessInfo.password}
                                                            onChange={handleAccessChange}
                                                            name="password"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Confirm Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control "
                                                            placeholder="Enter Confirm Password"
                                                            value={accessInfo.confirmPassword}
                                                            onChange={handleAccessChange}
                                                            name="confirmPassword"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 my-3">
                                                    <div className="">
                                                        <h5 className="add-contact-title">Permission</h5>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                    <div className="custom-frm-bx">
                                                        <label htmlFor="">Permission  Type</label>
                                                        <select name="permissionId" onChange={handleAccessChange} value={accessInfo?.permissionId} id="" className="form-select nw-frm-control">
                                                            <option value="">---Select Permission Type---</option>
                                                            {permisions?.length > 0 &&
                                                                permisions?.map((item, key) =>
                                                                    <option value={item?._id} key={key}>{item?.name}</option>)}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="d-flex align-items-center justify-content-end gap-3">
                                                    <button className="nw-thm-btn outline rounded-3" onClick={(e) => handleBack(e, '#contact-tab')}
                                                    >Back </button>
                                                    <button type="submit" className="nw-thm-btn rounded-3" >Submit</button>
                                                </div>


                                            </div>
                                        </form>
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

export default AddEmployee