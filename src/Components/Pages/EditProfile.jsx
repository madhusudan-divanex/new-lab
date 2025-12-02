import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faFilePdf,
    faImage,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserDetail } from "../../redux/features/userSlice";
import base_url from "../../../baseUrl";
import { securePostData } from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")
    const { profiles, labPerson, labAddress, labImg,
        rating, avgRating, labLicense, isRequest } = useSelector(state => state.user)

    //   Lab Data 
    const [labData, setLabData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        gstNumber: "",
        about: "",
        logo: ""
    });
    const labChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === 'file') {
            setLabData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setLabData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const [logoPreview, setLogoPreview] = useState(null);
    const handleFilePreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        } else {
            setLogoPreview(null);
        }
    };

    // Submit form
    const labSubmit = async (e) => {
        e.preventDefault();
        if (labData.password !== labData.confirmPassword) {
            toast.error("Password was not matched")
            return
        }
        const payload = new FormData();
        for (let key in labData) {
            payload.append(key, labData[key]);
        }

        try {
            const response = await postApiData('lab', payload)
            if (response.success) {
                toast.success('Signup successfully')
                localStorage.setItem('token', response.token)
                localStorage.setItem('userId', response.userId)
                // navigate('/create-account-image') 
            } else {
                toast.error(response.message)
            }
            console.log("Lab created:", response.data);
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    };

    //   Lab Image 
    const [thumbnail, setThumbnail] = useState(null);
    const [labImages, setLabImages] = useState([]);
    const [previewThumb, setPreviewThumb] = useState(null);
    const [previewLabImages, setPreviewLabImages] = useState([]);
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setThumbnail(file);
        setPreviewThumb(URL.createObjectURL(file));
    };

    const handleLabImagesChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 3); // max 3
        setLabImages(files);
        setPreviewLabImages(files.map(file => URL.createObjectURL(file)));
    };

    const imageSubmit = async (e) => {
        e.preventDefault()
        if (!thumbnail) return alert('Thumbnail required!');
        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        labImages.forEach(file => formData.append('labImg', file));
        formData.append('userId', localStorage.getItem('userId'));

        try {
            const res = await securePostData('lab/image', formData);
            if (res.success) {
                toast.success("Images saved successfully")
                // navigate('/create-account-address')
            } else {
                toast.error(res.message)
            }
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    //   Person 
    const [personData, setPersonData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        gender: "",
        about: "",
        photo: "",
        userId
    });
    const personChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === 'file') {
            setPersonData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setPersonData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };


    const [photoPreview, setPhotoPreview] = useState(null);
    const handlePhotoPreview = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setPhotoPreview(null);
        }
    };

    // Submit form
    const personSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();
        for (let key in personData) {
            if (key == 'photo') continue
            payload.append(key, personData[key]);
        }
        if (personData.photo) {
            payload.append('photo', personData.photo)
        }

        try {
            const response = await securePostData('lab/person', payload)
            if (response.success) {
                toast.success('Contact person data saved successfully')
                // navigate('/create-account-upload')
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    };
    //   Address
    const [addressData, setAddressData] = useState({
        fullAddress: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        userId
    });
    const addressChange = (e) => {
        const { type, name, value, files } = e.target;
        if (type === 'file') {
            setAddressData(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setAddressData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    const addressSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await securePostData('lab/about', addressData)
            if (response.success) {
                toast.success('Address saved successfully')
                // navigate('/create-account-person')
            } else {
                toast.error(response.message)
            }
            console.log("Lab created:", response.data);
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    };
    //   license 
    const [licenseData, setLicenseData] = useState({
        labLicenseNumber: "",
        licenseFile: null,
        labCert: [{ certName: "", certFile: null }]
    });
    const handleLicenseInput = (e) => {
        setLicenseData({ ...licenseData, labLicenseNumber: e.target.value });
    };

    const handleLicenseFile = (e) => {
        setLicenseData({ ...licenseData, licenseFile: e.target.files[0] });
    };

    // ⬆ Handle Certificate Inputs
    const handleCertChange = (key, e) => {
        const { name, value } = e.target;
        const list = [...licenseData.labCert];
        console.log(key,e.target,name,value)
        list[key][name] = value;
        setLicenseData({ ...licenseData, labCert: list });
    };

    const handleCertFile = (key, e) => {
        const file = e.target.files[0];
        const list = [...licenseData.labCert];
        list[key].certFile = file;
        setLicenseData({ ...licenseData, labCert: list });
    };

    // Add/Remove Certificates
    const addCertificate = () => {
        setLicenseData({
            ...licenseData,
            labCert: [...licenseData.labCert, { certName: "", certFile: null }]
        });
    };

    const removeCertificate = (key) => {
        const list = [...licenseData.labCert];
        list.splice(key, 1);
        setLicenseData({ ...licenseData, labCert: list });
    };
    const licenseSubmit = async (e) => {
        e.preventDefault();

        // --- Basic Validation ---
        if (!licenseData.labLicenseNumber) {
            return alert("Please enter lab license number.");
        }

        if (!licenseData.licenseFile) {
            return alert("Please upload license file.");
        }

        for (let i = 0; i < licenseData.labCert.length; i++) {
            const cert = licenseData.labCert[i];
            if (!cert.certName) return alert(`Please enter certificate name for Certificate #${i + 1}`);
            if (!cert.certFile) return alert(`Please upload certificate file for Certificate #${i + 1}`);
        }

        // --- Create licenseData ---
        const dataToSend = new licenseData();
        dataToSend.append("userId", userId);      // Make sure this exists
        dataToSend.append("labLicenseNumber", licenseData.labLicenseNumber);

        // Send JSON meta data for certificates
        const certMeta = licenseData.labCert.map(c => ({ certName: c.certName }));
        dataToSend.append("labCert", JSON.stringify(certMeta));

        // Append certificate files (backend expects: certFiles[])
        licenseData.labCert.forEach((item) => {
            dataToSend.append("certFiles", item.certFile);
        });

        // Append license file (backend expects: licenseFile)
        dataToSend.append("licenseFile", licenseData.licenseFile);

        const result = await securePostData("lab/license", dataToSend);

        if (result.success) {
            toast.success("Lab license data saved successfully");
            setIsShow(true);
        } else {
            toast.error(result.message);
        }
    };
    useEffect(() => {
        dispatch(fetchUserDetail())
    }, [dispatch])

    useEffect(() => {
        if (profiles) {
            setLabData(profiles)
        }
        if (labAddress) {
            setAddressData(labAddress)
        }
        if (labImages) {
            setLabImages(labImages)
        }
        if (labLicense) {
            setLicenseData(labLicense)
        }
        if (labPerson) {
            setPersonData(labPerson)
        }

    }, [profiles, labAddress, labImages, labLicense, labPerson])
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title">Edit Profile</h3>
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
                                                Edit Profile
                                            </a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Profile
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lab-chart-crd">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="lab-tp-title patient-bio-tab lab-profile-bio-tab">
                                <div>
                                    <h6 className="mb-0">Profile</h6>
                                </div>
                            </div>

                            <div className="patient-bio-tab patient-edit-bio-tab">
                                <ul className="nav nav-tabs gap-3" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-bs-toggle="tab"
                                            href="#home"
                                            role="tab"
                                        >
                                            Lab Profile
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
                                            Lab Images
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
                                            Lab Address
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
                                            Upload License And Certificate
                                        </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            id="person-tab"
                                            data-bs-toggle="tab"
                                            href="#person"
                                            role="tab"
                                        >
                                            Contact Person
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content mt-4" id="myTabContent">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                    >
                                        <div className="sub-tab-brd">
                                            <form onSubmit={labSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="lab-profile-mega-bx">
                                                            <div className="lab-profile-avatr-bx">
                                                                <img src={profiles?.logo ? `${base_url}/${profiles?.logo}` : "/profile-tab-avatar.png"} alt="" />
                                                                <div className="lab-profile-edit-avatr">
                                                                    <a href="javascript:void(0)" className="edit-btn cursor-pointer">
                                                                        <FontAwesomeIcon icon={faPen} />
                                                                    </a>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    accept=""
                                                                    className="lab-profile-file-input"
                                                                />
                                                            </div>

                                                            <div>
                                                                <h4 className="lg_title ">{profiles?.name}</h4>
                                                                <p className="first_para">ID : #{profiles?._id?.slice(-10)}</p>
                                                            </div>



                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Laboratory Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="name"
                                                                onChange={labChange}
                                                                value={labData?.name}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Mobile Number</label>
                                                            <input
                                                                type="number"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="contactNumber"
                                                                onChange={labChange}
                                                                value={labData?.contactNumber}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Email Number</label>
                                                            <input
                                                                type="email"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="email"
                                                                onChange={labChange}
                                                                value={labData?.email}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Gst Number</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="gstNumber"
                                                                onChange={labChange}
                                                                value={labData?.gstNumber}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">About</label>
                                                            <textarea name="about" required
                                                                onChange={labChange} id="" className="form-control patient-frm-control" value={labData?.about}></textarea>
                                                        </div>
                                                    </div>

                                                    <div className="d-flex justify-content-end gap-3">
                                                        <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                        <button type="submit" className="nw-filtr-thm-btn">Save</button>
                                                    </div>


                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel">
                                        <div className="sub-tab-brd lab-thumb-bx">
                                            <form onSubmit={imageSubmit}>
                                                <div className="row justify-content-between">
                                                    <div className="col-lg-5">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Upload  Thumbnail image</label>
                                                            <div className="upload-box nw-upload-bx  p-3 justify-content-center">
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
                                                                        id="fileInput1"
                                                                        accept=".png,.jpg,.jpeg"
                                                                    />

                                                                    <div id="filePreviewWrapper" className="d-none mt-3">
                                                                        <img src="" alt="Preview" className="img-thumbnail" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="custom-frm-bx ">
                                                            <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                <div className="lablcense-bx">
                                                                    <div>
                                                                        <h6 ><FontAwesomeIcon icon={faImage} /> {labImg?.thumbnail.split("\\").pop().split("-").slice(1).join("-")}</h6>
                                                                    </div>
                                                                    <div className="">
                                                                        <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-5">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Upload  Laboratory images(max 3 images)</label>
                                                            <div className="upload-box p-3 nw-upload-bx   justify-content-center ">
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
                                                                        id="fileInput1"
                                                                        accept=".png,.jpg,.jpeg"
                                                                    />

                                                                    <div id="filePreviewWrapper" className="d-none mt-3">
                                                                        <img src="" alt="Preview" className="img-thumbnail" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <ul>
                                                            {labImg?.labImg?.length > 0 && labImg?.labImg?.map((item, key) =>
                                                                <li key={key}>
                                                                    <div className="custom-frm-bx ">
                                                                        <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                            <div className="lablcense-bx">
                                                                                <div>
                                                                                    <h6 ><FontAwesomeIcon icon={faImage} /> {item?.split("\\").pop().split("-").slice(1).join("-")}</h6>
                                                                                </div>
                                                                                <div className="">
                                                                                    <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>)}
                                                        </ul>

                                                    </div>

                                                    <div className="d-flex justify-content-end gap-3">
                                                        <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                        <button type="submit" className="nw-filtr-thm-btn">Save</button>
                                                    </div>

                                                </div>
                                            </form>

                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="contact" role="tabpanel">
                                        <div className="sub-tab-brd ">
                                            <form onSubmit={addressSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Full Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="fullAddress"
                                                                onChange={addressChange}
                                                                value={addressData?.fullAddress}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Country</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="country"
                                                                onChange={addressChange}
                                                                value={addressData?.country}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">State</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                required
                                                                name="state"
                                                                onChange={addressChange}
                                                                value={addressData?.state}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">City</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                required
                                                                name="city"
                                                                onChange={addressChange}
                                                                value={addressData?.city}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Pin Code</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                required
                                                                name="pinCode"
                                                                onChange={addressChange}
                                                                value={addressData?.pinCode}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end gap-3">
                                                        <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                        <button type="submit" className="nw-filtr-thm-btn">Save</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="upload" role="tabpanel">
                                        <div className="sub-tab-brd lab-thumb-bx edit-thumb">
                                            <div className="mb-3">
                                                <h5 className="fz-18">License</h5>
                                                <div className="border border-black p-3">
                                                    <form onSubmit={licenseSubmit}>
                                                        <div className="row">

                                                            <div className="col-lg-5">
                                                                <div className="custom-frm-bx">
                                                                    <label htmlFor="">Lab License Number</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control nw-frm-control"
                                                                        placeholder=""
                                                                        value={licenseData?.labLicenseNumber}
                                                                        name="labLicenseNumber"
                                                                        required
                                                                        onChange={handleLicenseInput}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-5">
                                                                <div className="custom-frm-bx">
                                                                    <label htmlFor="">Upload License</label>
                                                                    <div className="upload-box p-3 nw-upload-bx  justify-content-center">
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
                                                                                id="fileInput1"
                                                                                accept=".png,.jpg,.jpeg"
                                                                            />

                                                                            <div id="filePreviewWrapper" className="d-none mt-3">
                                                                                <img src="" alt="Preview" className="img-thumbnail" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="custom-frm-bx ">
                                                                    <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                        <div className="lablcense-bx">
                                                                            <div>
                                                                                <h6 ><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> {labLicense?.licenseFile.split("\\").pop().split("-").slice(1).join("-")}</h6>
                                                                            </div>
                                                                            <div className="">
                                                                                <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <h5 className="fz-18 my-3">Certificate</h5>
                                                <div className="border edit-licence-tp-box border-black p-3">
                                                    <form action="">
                                                        {labLicense?.labCert?.length > 0 &&
                                                            labLicense?.labCert?.map((item, key) =>
                                                                <div className="row" key={key}>

                                                                    <div className="col-lg-5">
                                                                        <div className="custom-frm-bx">
                                                                            <label htmlFor="">Certified Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control nw-frm-control"
                                                                                placeholder=""
                                                                                value={item?.certName}
                                                                                name="certName"
                                                                                required
                                                                                onChange={(e)=>handleCertChange(key,e)}
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-5">
                                                                        <div className="custom-frm-bx">
                                                                            <label htmlFor="">Upload License</label>
                                                                            <div className="upload-box p-3 nw-upload-bx  justify-content-center">
                                                                                <div className="upload-icon mb-2">
                                                                                    <IoCloudUploadOutline />
                                                                                </div>

                                                                                <div>
                                                                                    <p className="fw-semibold mb-1">
                                                                                        <label htmlFor={`certInput${key}`} className="file-label file-select-label">
                                                                                            Choose a file or drag & drop here
                                                                                        </label>
                                                                                    </p>

                                                                                    <small className="format-title">JPEG Format</small>


                                                                                    <div className="mt-3">
                                                                                        <label htmlFor={`certInput${key}`} className="browse-btn">
                                                                                            Browse File
                                                                                        </label>
                                                                                    </div>

                                                                                    <input
                                                                                        type="file"
                                                                                        className="d-none"
                                                                                        id={`certInput${key}`}
                                                                                        name="certFile"
                                                                                        required
                                                                                        onChange={(e)=>handleCertFile(key,e)}
                                                                                        accept=".png,.jpg,.jpeg"
                                                                                    />

                                                                                    <div id="filePreviewWrapper" className="d-none mt-3">
                                                                                        <img src="" alt="Preview" className="img-thumbnail" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="custom-frm-bx ">
                                                                            <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                                <div className="lablcense-bx">
                                                                                    <div>
                                                                                        <h6 ><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> {item?.certFile.split("\\").pop().split("-").slice(1).join("-")}</h6>
                                                                                    </div>
                                                                                    <div className="">
                                                                                        <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-2 d-flex align-items-center justify-content-end">
                                                                        <div>
                                                                            <a href="javascript:void(0)" className=""><FaPlusCircle style={{ color: "#34A853", fontSize: "20px" }} /></a>
                                                                        </div>
                                                                    </div>

                                                                </div>)}
                                                    </form>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-end gap-3">
                                                <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                <button type="submit" className="nw-filtr-thm-btn">Save</button>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="person" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <form onSubmit={personSubmit}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="lab-profile-mega-bx">
                                                            <div className="lab-profile-avatr-bx lab-contact-prson">
                                                                <img
                                                                    src={
                                                                        labPerson?.photo
                                                                            ? typeof labPerson.photo === "string"
                                                                                ? (labPerson.photo.startsWith("uploads")
                                                                                    ? `${base_url}/${labPerson.photo}`
                                                                                    : labPerson.photo
                                                                                )
                                                                                : URL.createObjectURL(labPerson.photo) // File object
                                                                            : ""
                                                                    }
                                                                    alt=""
                                                                />

                                                                <div className="lab-profile-edit-avatr">
                                                                    <a href="javascript:void(0)" className="edit-btn cursor-pointer">
                                                                        <FontAwesomeIcon icon={faPen} />
                                                                    </a>
                                                                </div>
                                                                <input
                                                                    type="file"
                                                                    accept=""
                                                                    name="photo"
                                                                    onChange={personChange}
                                                                    className="lab-profile-file-input"
                                                                />
                                                            </div>

                                                            <div>
                                                                <h4 className="lg_title ">{labPerson?.name}</h4>
                                                            </div>



                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="name"
                                                                onChange={personChange}
                                                                value={personData?.name}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Mobile Number</label>
                                                            <input
                                                                type="number"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="contactNumber"
                                                                onChange={personChange}
                                                                value={personData?.contactNumber}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Email Number</label>
                                                            <input
                                                                type="email"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="email"
                                                                onChange={personChange}
                                                                value={personData?.email}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Gender</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control"
                                                                placeholder=""
                                                                required
                                                                name="gender"
                                                                onChange={personChange}
                                                                value={personData?.gender}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end gap-3">
                                                        <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                        <button type="submit" className="nw-filtr-thm-btn">Save</button>
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
            </div>

            {/*Edit Profile Popup Start  */}
            {/* data-bs-toggle="modal" data-bs-target="#edit-Request" */}
            <div className="modal step-modal" id="edit-Request" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content edit-modal-content rounded-5 p-5">
                        {/* <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close">
                                    <FontAwesomeIcon icon={faClose} />
                                </button>
                            </div>
                        </div> */}
                        <div className="modal-body p-0">
                            <div className="row justify-content-center">
                                <div className="col-lg-9">
                                    <div className="text-center your-document-mega-dv">
                                        <div className="submit-document-bx">
                                            <FontAwesomeIcon icon={faCopy} className="document-icon" />
                                            <div className="timr-bx">
                                                <img src="/timer.png" alt="" />
                                            </div>
                                        </div>

                                        <p className="mt-4">Your documents have been submitted for verification. This may take up to 48 hours. You’ll be notified once approved.</p>

                                        <div className="mt-5">
                                            <a href="javascript:void(0)" className="thm-btn w-75" data-bs-dismiss="modal">OK</a>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  Edit Profile Popup End */}

        </>
    )
}

export default EditProfile