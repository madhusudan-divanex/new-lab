import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCopy,
    faDownload,
    faPaperPlane,
    faPen,
    faPrint,
   
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";

function ReportsTabs() {
    const [hasLRx, setHasLRx] = useState(false);
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <div className="row mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div>
                            <h3 className="innr-title">Report</h3>
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
                                            Reports
                                        </li>
                                    </ol>
                                </nav>
                            </div>

                           
                        </div>

                         <div>
                                <button className="patient-thm-btn nw-thm-btn"><FontAwesomeIcon icon={faDownload}/> Download PDF</button>
                            </div>

                    </div>
                </div>

                <div className="lab-chart-crd">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="lab-tp-title patient-bio-tab lab-profile-bio-tab">
                                <div>
                                    <h6 className="mb-0">Report</h6>
                                </div>
                            </div>

                            <div className="patient-bio-tab patient-edit-bio-tab employee-tabs">
                                <ul className="nav nav-tabs gap-3 rounded-0" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link active"
                                            id="home-tab"
                                            data-bs-toggle="tab"
                                            href="#home"
                                            role="tab"
                                        >
                                            Intake
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
                                            Billing
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
                                            Labels
                                        </a>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <a
                                            className="nav-link"
                                            id="collection-tab"
                                            data-bs-toggle="tab"
                                            href="#collection"
                                            role="tab"
                                        >
                                            Collection
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
                                            Add report upload
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
                                            Report
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
                                            <div className="new-invoice-card">
                                                <form action="">
                                                    <div className="">
                                                        <div>
                                                            <h6 className="qrcode-title fw-700 fz-20 mb-0">Intake</h6>
                                                        </div>
                                                        <div className="form-check custom-check">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id="reportsList"
                                                                checked={hasLRx}
                                                                onChange={(e) => setHasLRx(e.target.checked)}
                                                            />
                                                            <label className="form-check-label" htmlFor="reportsList">
                                                                Has L-Rx
                                                            </label>
                                                        </div>

                                                        {/* When checkbox is checked — show only one input */}
                                                        {hasLRx ? (
                                                            <div className="row">
                                                                <div className="border-bottom">
                                                                    <div className="col-lg-4 col-md-4 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label htmlFor="">Appointment ID </label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Appointment ID "
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        ) : (
                                                            // When unchecked — show full form
                                                            <>
                                                                <div className="row">
                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Phone Number</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Phone Number"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Patient Id</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Patient Id"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Patient Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Patient Name"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>DOB</label>
                                                                            <input type="date" className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Gender</label>
                                                                            <select className="form-select">
                                                                                <option value="">Select Gender</option>
                                                                                <option>Male</option>
                                                                                <option>Female</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Doctor Id</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Doctor Id"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Doctor Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter Doctor Name"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                     <div className="col-lg-12">
                                                            <h6 className="qrcode-title fw-700 fz-20">Lab Test</h6>
                                                        </div>
                                                                    <div className="col-lg-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label htmlFor=""> Add lab Test</label>
                                                                             <div className="d-flex align-items-center gap-2">
                                                                                <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder=" Add lab Test"
                                                                            />

                                                                            <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                             </div>
                                                                            
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label htmlFor=""> Add lab Test</label>
                                                                             <div className="d-flex align-items-center gap-2">
                                                                                <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder=" Add lab Test"
                                                                            />

                                                                            <a href="javascript:void(0)" className="text-black"><FontAwesomeIcon icon={faTrash} /></a>
                                                                             </div>
                                                                            
                                                                        </div>
                                                                    </div>

                                                                    <div className="d-flex align-items-center gap-2 justify-content-end">
                                                                        <a href="javascript:void(0)" className="fz-16 fw-700 " style={{color : "#34A853"}}><FaSquarePlus /> Add </a>
                                                                    </div>

                                                                </div>
                                                            </>
                                                        )}


                                                        <div className="text-end pt-3" >
                                                            <button className="nw-thm-btn rounded-4">Proceed</button>
                                                        </div>


                                                    </div>

                                                    {/* <div className="row">
                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Doctor  Id</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Doctor Id"
                                                                    value=""
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-4 col-md-6 col-sm-12">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Doctor  Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Doctor Name"
                                                                    value=""
                                                                />
                                                            </div>
                                                        </div>



                                                        <div className="col-lg-12">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Clinical Notes </label>
                                                                <textarea name="" id="" className="form-control" placeholder=""></textarea>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-12">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor=""> Add lab Test</label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control "
                                                                    placeholder="Enter Doctor Name"
                                                                    value=""
                                                                />

                                                            </div>
                                                        </div>

                                                        <div className="d-flex justify-content-end gap-3">
                                                            <button type="submit" className="nw-thm-btn rounded-3">Proceed</button>
                                                        </div>

                                                    </div> */}


                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <div className="row">


                                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                    <div className="new-invoice-card">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <div>
                                                                <h5 className="first_para fw-700 fz-20 mb-0">Invoice</h5>
                                                            </div>
                                                            <div>
                                                                <button className="print-btn"> <FontAwesomeIcon icon={faDownload} /> Download PDF</button>
                                                            </div>
                                                        </div>

                                                        <div className="laboratory-header mb-4">
                                                            <div className="laboratory-name">
                                                                <h5>Advance Lab Tech</h5>
                                                                <p><span className="laboratory-title">GSTIN :</span> 09897886454</p>
                                                            </div>
                                                            <div className="invoice-details">
                                                                <p><span className="laboratory-invoice">Invoice :</span> IN89767</p>
                                                                <p><span className="laboratory-invoice">Date :</span> 03/11/2025</p>
                                                            </div>
                                                        </div>

                                                        <div className="laboratory-bill-crd">
                                                            <div className="laboratory-bill-bx">
                                                                <h6>Bill To</h6>
                                                                <h4>Aarav Mehta</h4>
                                                                <p><span className="laboratory-phne">Phone :</span> +91-9876543210</p>
                                                            </div>
                                                            <div className="laboratory-bill-bx">
                                                                <h6>Order</h6>
                                                                <h4>Aarav Mehta</h4>
                                                                <p><span className="laboratory-phne">Phone :</span> +91-9876543210</p>
                                                            </div>
                                                        </div>

                                                        <div className="laboratory-report-bx">
                                                            <ul className="laboratory-report-list">
                                                                <li className="laboratory-item"><span>Test</span> <span>Price</span></li>
                                                                <li className="laboratory-item border-0"><span>CBC</span> <span>200.00</span></li>
                                                                <li className="laboratory-item"><span>LFT</span> <span>200.00</span></li>
                                                            </ul>

                                                            <div className="lab-amount-bx">
                                                                <ul className="lab-amount-list">
                                                                    <li className="lab-amount-item">Subtotal : <span className="price-title">400.00</span></li>
                                                                    <li className="lab-amount-item lab-divider">GST (5%) :  <span className="price-title">68.00</span></li>
                                                                    <li className="lab-amount-item">Total :  <span className="price-title">468.00</span></li>
                                                                </ul>
                                                            </div>

                                                            <div className="text-end mt-5" >
                                                                <button className="nw-thm-btn rounded-4">Collect payment</button>
                                                            </div>

                                                        </div>






                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>

                                       <div className="tab-pane fade" id="upload" role="tabpanel">
                                        <div className="sub-tab-brd ">
                                            <div className="new-invoice-card">
                                                <div className="row">
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div>
                                                            <h5 className="first_para fw-700 fz-20 mb-0">Preview</h5>
                                                        </div>
                                                        <div>
                                                            <button className="print-btn"> <FontAwesomeIcon icon={faPrint} /> Print</button>
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                                                        <div className="barcd-scannr">
                                                            <div className="barcd-content">
                                                                <h4 className="my-3">SP-9879</h4>
                                                                <ul className="qrcode-list">
                                                                    <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                    <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                </ul>

                                                                <img src="/barcode.png" alt="" />
                                                            </div>

                                                            <div className="barcode-id-details">
                                                                <div>
                                                                    <h6>Patient Id </h6>
                                                                    <p>PS-9001</p>
                                                                </div>


                                                                <div>
                                                                    <h6>Appointment ID </h6>
                                                                    <p>OID-8876</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                                                        <div className="barcd-scannr">
                                                            <div className="barcd-content">
                                                                <h4 className="my-3">SP-9879</h4>
                                                                <ul className="qrcode-list">
                                                                    <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                    <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                </ul>

                                                                <img src="/barcode.png" alt="" />
                                                            </div>

                                                            <div className="barcode-id-details">
                                                                <div>
                                                                    <h6>Patient Id </h6>
                                                                    <p>PS-9001</p>
                                                                </div>


                                                                <div>
                                                                    <h6>Appointment ID </h6>
                                                                    <p>OID-8876</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-end mt-3" >
                                                    <button className="nw-thm-btn rounded-4">Pressed</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="collection" role="tabpanel">
                                                       <div className="sub-tab-brd">
                                            <div className="">
                                                <div className="row">

                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="new-invoice-card">
                                                            <div>
                                                                    <h5 className="first_para fw-700 fz-20">Collect Samples</h5>
                                                                </div>
                                                            <div className="">
                                                                <ul className="appointment-booking-list">
                                                                    <li className="appoint-item sample-item "> Verify identity: Name + DOB + Photo ID</li>
                                                                    <li className="appoint-item sample-item"> Confirm fasting/time, anticoagulants</li>
                                                                    <li className="appoint-item sample-item"> Label immediately after draw; confirm SPIDs</li>
                                                                    <li className="appoint-item sample-item"> Record pre-analytic conditions (hemolysis, volume, temp)</li>
                                                                </ul>

                                                                <div className="mt-3">
                                                                    <button className="collected-btn">Mark Collected</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="new-invoice-card">
                                                             <div>
                                                                    <h5 className="first_para fw-700 fz-20">Specimen Plan</h5>
                                                                </div>

                                                            <div className="row">
                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="laboratory-bill-bx">
                                                                        <h4>SP-9879</h4>
                                                                        <p><span className="laboratory-phne">Test :</span> CBC</p>
                                                                        <p><span className="laboratory-phne">Tube :</span> EDTC</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                   <div className="laboratory-bill-bx">
                                                                        <h4>SP-9879</h4>
                                                                        
                                                                        <p><span className="laboratory-phne">Test :</span> LFT</p>
                                                                        <p><span className="laboratory-phne">Tube :</span> SST</p>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            {/* <div className="laboratory-bill-crd">
                          

                            <div className="laboratory-bill-bx">
                                <h6>Patient </h6>
                                <h4>Aarav Mehta</h4>
                                <p><span className="laboratory-phne">ID :</span> PID-7668</p>
                                <p><span className="laboratory-phne">DOB:</span> 30 june, 2000</p>
                                <p><span className="laboratory-phne">Gender:</span> Male</p>
                            </div>
                           <div className="">
                             <div className="laboratory-bill-bx">
                                <h6>Order </h6>
                                <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                            </div>

                            <div className="laboratory-bill-bx">
                                <h6 className="mb-0">Doctor </h6>
                                <h5 className="fz-16">Dr. Ravi Kumar</h5>
                                 
                                <p><span className="laboratory-phne">ID :</span> DID-7668</p>
                            </div>
                           </div>
                        </div> */}

                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                        </div>

                                        <div className="text-end mt-3" >
                                                    <button className="nw-thm-btn rounded-4">Pressed</button>
                                                </div>

                                    </div>




                                    <div className="tab-pane fade" id="contact" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="new-invoice-card mb-3">
                                                            <div className="">
                                                                <ul className="appointment-booking-list">
                                                                    <li className="appoint-item"> Appointment Book Date : <span className="appoint-title">25-11-03</span></li>
                                                                    <li className="appoint-item"> Visited  date : <span className="appoint-title">25-11-03</span></li>
                                                                    <li className="appoint-item"> Appointment Completed date : <span className="appoint-title">25-11-03</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    <div className="new-invoice-card">
                                                        <div className="sub-tab-brd mb-3">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Test Name</label>
                                                                <input type="text" className="form-control" placeholder="CBC" />
                                                            </div>

                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Upload certificate</label>
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

                                                             <div className="custom-frm-bx">
                                                                <label htmlFor="">  Note                                                           
                                                                </label>
                                                                <textarea name="" id="" className="form-control"></textarea>
                                                            </div>

                                                           

                                                        </div>

                                                        <div className="sub-tab-brd mb-3">
                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Test Name</label>
                                                                <input type="text" className="form-control" placeholder="LFT" />
                                                            </div>

                                                            <div className="custom-frm-bx">
                                                                <label htmlFor="">Upload certificate</label>
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

                                                             <div className="custom-frm-bx">
                                                                <label htmlFor="">  Note                                                           
                                                                </label>
                                                                <textarea name="" id="" className="form-control"></textarea>
                                                            </div>

                                                        </div>

                                                       
                                                    </div>

                                                </div>

                                                 <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="new-invoice-card">
                                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                                <div>
                                                                    <h5 className="first_para fw-700 fz-20 mb-0">Final Diagnostic Report</h5>
                                                                </div>
                                                               
                                                            </div>

                                                            <div className="laboratory-header mb-4">
                                                                <div className="laboratory-name">
                                                                    <h5>Advance Lab Tech</h5>
                                                                    <p><span className="laboratory-title">GSTIN :</span> 09897886454</p>
                                                                </div>
                                                                <div className="invoice-details">
                                                                    <p className="text-end"><span className="laboratory-invoice">Report ID :</span> RE-89767</p>
                                                                    <p className="text-end"><span className="laboratory-invoice">Generated ID :</span> 25-11-03  08:07</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="laboratory-bill-bx laboratory-nw-box">
                                                                        <h6>Patient </h6>
                                                                        <h4>Aarav Mehta</h4>
                                                                        <p><span className="laboratory-phne">ID :</span> PID-7668</p>
                                                                        <p><span className="laboratory-phne">DOB:</span> 30 june, 2000</p>
                                                                        <p><span className="laboratory-phne">Gender:</span> Male</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="laboratory-bill-bx laboratory-sub-bx mb-2">
                                                                        <h6>Order </h6>
                                                                        <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                                                                    </div>

                                                                    <div className="laboratory-bill-bx laboratory-sub-bx">
                                                                        <h6 className="my-0">Doctor </h6>
                                                                        <h4>Dr. Ravi Kumar</h4>
                                                                        <p><span className="laboratory-phne"> ID :</span> OID-7C1B48  </p>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            {/* <div className="laboratory-bill-crd">
                          

                            <div className="laboratory-bill-bx">
                                <h6>Patient </h6>
                                <h4>Aarav Mehta</h4>
                                <p><span className="laboratory-phne">ID :</span> PID-7668</p>
                                <p><span className="laboratory-phne">DOB:</span> 30 june, 2000</p>
                                <p><span className="laboratory-phne">Gender:</span> Male</p>
                            </div>
                           <div className="">
                             <div className="laboratory-bill-bx">
                                <h6>Order </h6>
                                <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                            </div>

                            <div className="laboratory-bill-bx">
                                <h6 className="mb-0">Doctor </h6>
                                <h5 className="fz-16">Dr. Ravi Kumar</h5>
                                 
                                <p><span className="laboratory-phne">ID :</span> DID-7668</p>
                            </div>
                           </div>
                        </div> */}

                                                            <div className="laboratory-report-table mt-3">
                                                                <div className="table table-responsive mb-0 reprt-table">
                                                                    <table className="table mb-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Test</th>
                                                                                <th>Unit</th>
                                                                                <th>Reference</th>
                                                                                <th>Result</th>
                                                                                <th>Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                                <td >
                                                                                    <div className="custom-frm-bx mb-0">
                                                                                        <input type="text" name="" id="" className="form-control" placeholder="Enter" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="custom-frm-bx ms-2 mb-0">
                                                                                        <select name="" id="" className="form-select">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                               <td >
                                                                                    <div className="custom-frm-bx mb-0">
                                                                                        <input type="text" name="" id="" className="form-control" placeholder="Enter" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="custom-frm-bx ms-2 mb-0">
                                                                                        <select name="" id="" className="form-select">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                                <td >
                                                                                    <div className="custom-frm-bx mb-0">
                                                                                        <input type="text" name="" id="" className="form-control" placeholder="Enter" />
                                                                                    </div>
                                                                                </td>
                                                                                <td>
                                                                                    <div className="custom-frm-bx ms-2 mb-0">
                                                                                        <select name="" id="" className="form-select">
                                                                                            <option value="">Select</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>


                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>

                                                            <div className="report-remark mt-3">
                                                                <h6>Remark <a href="javascript:void(0)" className="edit-btn text-black"><FontAwesomeIcon icon={faPen}/></a></h6>
                                                                <p>-</p>
                                                            </div>

                                                             <div className="laboratory-bill-bx">
                                                                        <h6>Lab tests prescribed by the doctor</h6>
                                                                        <h4>Dr.James Harris</h4>
                                                                        <p><span className="laboratory-phne">ID :</span>DO-7668</p>
                                                                    </div>



                                                            <div className="reprt-barcd mt-3">
                                                                <div className="barcd-scannr">
                                                                    <div className="barcd-content">
                                                                        <h4 className="my-3">SP-9879</h4>
                                                                        <ul className="qrcode-list">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>

                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>


                                                                </div>

                                                                <div className="barcd-scannr">
                                                                    <div className="barcd-content">
                                                                        <h4 className="my-3">SP-9879</h4>
                                                                        <ul className="qrcode-list">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>

                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>


                                                                </div>
                                                            </div>

                                                            <div className="reprt-signature mt-5">
                                                                <h6>Signature:</h6>
                                                                <span className="reprt-mark"></span>
                                                            </div>

                                                        </div>
                                                    </div>

                                            </div>
                                        </div>

                                        <div className="text-end mt-3" >
                                                    <button className="nw-thm-btn rounded-4">Submit</button>
                                                </div>



                                    </div>

                                 

                                    <div className="tab-pane fade" id="person" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <div className="">
                                                <div className="row">


                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">

                                                        <div className="new-invoice-card h-100">
                                                            <div className="">
                                                                <ul className="appointment-booking-list">
                                                                    <li className="appoint-item"> Appointment Book Date : <span className="appoint-title">25-11-03</span></li>
                                                                    <li className="appoint-item"> Visited  date : <span className="appoint-title">25-11-03</span></li>
                                                                    <li className="appoint-item"> Appointment Completed date : <span className="appoint-title">25-11-03</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="new-invoice-card">
                                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                                <div>
                                                                    <h5 className="first_para fw-700 fz-20 mb-0">Final Diagnostic Report</h5>
                                                                </div>
                                                                 <div className="d-flex align-items-center gap-2" >
                                                                    <button className="print-btn"> <FontAwesomeIcon icon={faDownload} /> Download PDF</button>
                                                                    {/* <button className="print-btn"> <FontAwesomeIcon icon={faPaperPlane} /> Send</button> */}
                                                                    <div class="dropdown">
                                                            <a
                                                                href="javascript:void(0)"
                                                                class="attendence-edit-btn print-btn"
                                                                id="acticonMenu1"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <FontAwesomeIcon icon={faPaperPlane} /> Send
                                                            </a>
                                                            <ul
                                                                class="dropdown-menu dropdown-menu-end user-dropdown tble-action-menu"
                                                                aria-labelledby="acticonMenu1"
                                                            >
                                                                <li className="report-item">
                                                                    <a class="nw-dropdown-item report-nav" href="#">
                                                                        Send to All
                                                                    </a>
                                                                </li>
                                                                <li className="report-item">
                                                                    <a class="nw-dropdown-item report-nav" href="#">
                                                                        Send Patient
                                                                    </a>
                                                                </li>

                                                                <li className="report-item">
                                                                    <a class="nw-dropdown-item report-nav" href="#">
                                                                        Send Doctor
                                                                    </a>
                                                                </li>

                                                                <li className="report-item">
                                                                    <a class="nw-dropdown-item report-nav" href="#">
                                                                        Send Hospital
                                                                    </a>
                                                                </li>

                                                             
                                                            </ul>
                                                        </div>
                                                                </div>
                                                            </div>

                                                            <div className="laboratory-header mb-4">
                                                                <div className="laboratory-name">
                                                                    <h5>Advance Lab Tech</h5>
                                                                    <p><span className="laboratory-title">GSTIN :</span> 09897886454</p>
                                                                </div>
                                                                <div className="invoice-details">
                                                                    <p><span className="laboratory-invoice">Invoice :</span> IN89767</p>
                                                                    <p><span className="laboratory-invoice">Date :</span> 03/11/2025</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="laboratory-bill-bx laboratory-nw-box">
                                                                        <h6>Patient </h6>
                                                                        <h4>Aarav Mehta</h4>
                                                                        <p><span className="laboratory-phne">ID :</span> PID-7668</p>
                                                                        <p><span className="laboratory-phne">DOB:</span> 30 june, 2000</p>
                                                                        <p><span className="laboratory-phne">Gender:</span> Male</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="laboratory-bill-bx mb-2 laboratory-sub-bx">
                                                                        <h6>Order </h6>
                                                                        <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                                                                    </div>

                                                                    <div className="laboratory-bill-bx laboratory-sub-bx">
                                                                        <h6 className="my-0">Doctor </h6>
                                                                        <h4>Aarav Mehta</h4>
                                                                        <p><span className="laboratory-phne"> ID :</span> OID-7C1B48  </p>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                            {/* <div className="laboratory-bill-crd">
                          

                            <div className="laboratory-bill-bx">
                                <h6>Patient </h6>
                                <h4>Aarav Mehta</h4>
                                <p><span className="laboratory-phne">ID :</span> PID-7668</p>
                                <p><span className="laboratory-phne">DOB:</span> 30 june, 2000</p>
                                <p><span className="laboratory-phne">Gender:</span> Male</p>
                            </div>
                           <div className="">
                             <div className="laboratory-bill-bx">
                                <h6>Order </h6>
                                <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                            </div>

                            <div className="laboratory-bill-bx">
                                <h6 className="mb-0">Doctor </h6>
                                <h5 className="fz-16">Dr. Ravi Kumar</h5>
                                 
                                <p><span className="laboratory-phne">ID :</span> DID-7668</p>
                            </div>
                           </div>
                        </div> */}

                                                            <div className="laboratory-report-table mt-3">
                                                                <div className="table table-responsive mb-0 reprt-table">
                                                                    <table className="table mb-0">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Test</th>
                                                                                <th>Unit</th>
                                                                                <th>Reference</th>
                                                                                <th>Result</th>
                                                                                <th>Status</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>

                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                                <td>50</td>
                                                                                <td></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                                <td>50</td>
                                                                                <td></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>CBC - Lymphocyte</td>
                                                                                <td>mm/dl</td>
                                                                                <td>50-60%</td>
                                                                                <td>50</td>
                                                                                <td></td>
                                                                            </tr>


                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>

                                                            <div className="report-remark mt-3">
                                                                <h6>Remark</h6>
                                                                <p>-</p>
                                                            </div>

                                                            <div className="reprt-barcd mt-3">
                                                                <div className="barcd-scannr">
                                                                    <div className="barcd-content">
                                                                        <h4 className="my-3">SP-9879</h4>
                                                                        <ul className="qrcode-list">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>

                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>


                                                                </div>

                                                                <div className="barcd-scannr">
                                                                    <div className="barcd-content">
                                                                        <h4 className="my-3">SP-9879</h4>
                                                                        <ul className="qrcode-list">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: CBC</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : 25-11-03  08:07</span> </li>
                                                                        </ul>

                                                                        <img src="/barcode.png" alt="" />
                                                                    </div>


                                                                </div>
                                                            </div>

                                                            <div className="reprt-signature mt-5">
                                                                <h6>Signature:</h6>
                                                                <span className="reprt-mark"></span>
                                                            </div>







                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

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

export default ReportsTabs