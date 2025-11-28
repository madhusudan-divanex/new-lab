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

function EditProfile() {
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
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="lab-profile-mega-bx">
                                                            <div className="lab-profile-avatr-bx">
                                                                <img src="/profile-tab-avatar.png" alt="" />
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
                                                                <h4 className="lg_title ">Advance Lab Tech</h4>
                                                                <p className="first_para">ID : #94969548</p>
                                                            </div>



                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Laboratory Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="Advance Lab Tech"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Mobile Number</label>
                                                            <input
                                                                type="number"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="9665190183"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Email Number</label>
                                                            <input
                                                                type="email"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="advancelab68gmail.com "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Gst Number</label>
                                                            <input
                                                                type="number"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="9704789479247"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">About</label>
                                                            <textarea name="" id="" className="form-control nw-frm-control" placeholder="Advance Lab Tech, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, "></textarea>
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
                                            <form action="">
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
                                                                        <h6 ><FontAwesomeIcon icon={faImage} /> advancelab-logo.jpeg</h6>
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
                                                            <li>
                                                                <div className="custom-frm-bx ">
                                                                    <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                        <div className="lablcense-bx">
                                                                            <div>
                                                                                <h6 ><FontAwesomeIcon icon={faImage} /> advancelab-logo.jpeg</h6>
                                                                            </div>
                                                                            <div className="">
                                                                                <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-frm-bx ">
                                                                    <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                        <div className="lablcense-bx">
                                                                            <div>
                                                                                <h6 ><FontAwesomeIcon icon={faImage} /> advancelab-logo.jpeg</h6>
                                                                            </div>
                                                                            <div className="">
                                                                                <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="custom-frm-bx ">
                                                                    <div className="form-control lablcense-frm-control align-content-center border-0">
                                                                        <div className="lablcense-bx">
                                                                            <div>
                                                                                <h6 ><FontAwesomeIcon icon={faImage} /> advancelab-logo.jpeg</h6>
                                                                            </div>
                                                                            <div className="">
                                                                                <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
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
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Full Address</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control "
                                                                placeholder=""
                                                                value="123 Oak Street, Jaipur"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Country</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control "
                                                                placeholder=""
                                                                value="India "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">State</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control "
                                                                placeholder=""
                                                                value="Rajasthan "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">City</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control "
                                                                placeholder=""
                                                                value="Jaipur"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Pin Code</label>
                                                            <input
                                                                type="text"
                                                                className="form-control patient-frm-control "
                                                                placeholder=""
                                                                value="302028"
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
                                                    <form action="">
                                                        <div className="row">

                                                            <div className="col-lg-5">
                                                                <div className="custom-frm-bx">
                                                                    <label htmlFor="">Lab License Number</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control nw-frm-control"
                                                                        placeholder=""
                                                                        value="LIC98r37894789"
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
                                                                                <h6 ><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Lablcense.pdf</h6>
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
                                                        <div className="row">

                                                            <div className="col-lg-5">
                                                                <div className="custom-frm-bx">
                                                                    <label htmlFor="">Certified Name</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control nw-frm-control"
                                                                        placeholder=""
                                                                        value="ISO Certified"
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
                                                                                <h6 ><FontAwesomeIcon icon={faFilePdf} style={{ color: "#EF5350" }} /> Lablcense.pdf</h6>
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

                                                        </div>
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
                                            <form action="">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="lab-profile-mega-bx">
                                                            <div className="lab-profile-avatr-bx lab-contact-prson">
                                                                <img src="/user-avatar.png" alt="" />
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
                                                                <h4 className="lg_title ">Jonh Smith</h4>
                                                            </div>



                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Name</label>
                                                            <input
                                                                type="text"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="Jonh Smith"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Mobile Number</label>
                                                            <input
                                                                type="number"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="9665190183"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Email Number</label>
                                                            <input
                                                                type="email"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="advancelab68gmail.com "
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-6">
                                                        <div className="custom-frm-bx">
                                                            <label htmlFor="">Gender</label>
                                                            <input
                                                                type="text"
                                                                className="form-control nw-frm-control"
                                                                placeholder=""
                                                                value="Male"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-end gap-3">
                                                    <button type="submit" className="nw-filtr-thm-btn outline">Cancel</button>
                                                    <button type="submit" className="nw-filtr-thm-btn" data-bs-toggle="modal" data-bs-target="#edit-Request" >Save</button>
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