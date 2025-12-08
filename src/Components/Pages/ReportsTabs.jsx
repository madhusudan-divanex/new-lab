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
import { useEffect, useRef, useState } from "react";
import { FaSquarePlus } from "react-icons/fa6";
import { getSecureApiData, securePostData, updateApiData } from "../../services/api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import Barcode from "react-barcode";
import { Tab } from "bootstrap/dist/js/bootstrap.bundle.min";

function ReportsTabs() {
    const [hasLRx, setHasLRx] = useState(false);
    const reportRef = useRef()
    const compenentRef = useRef()
    const [appointmentId, setAppointmentId] = useState(null)
    const [inputPtId, setInputPtId] = useState(null)
    const [patData, setPatData] = useState(null)
    const userId = localStorage.getItem('userId')
    const [payData, setPayData] = useState({ appointmentId: null, paymentStatus: 'due' })
    const [actData, setActData] = useState({ appointmentId: null, status: '' })
    const [appointmentData, setAppointmentData] = useState({})
    const [demoData, setDemoData] = useState()
    const [testId, setTestId] = useState([]);
    const [testData, setTestData] = useState([]);
    const [allComponentResults, setAllComponentResults] = useState({});
    const [allComments, setAllComments] = useState({});
    const [reportMeta, setReportMeta] = useState({});
    const [selectedTest, setSelectedTest] = useState([''])
    const [allTest, setAllTest] = useState([])
    const { isOwner, permissions } = useSelector(state => state.user)
    const { profiles, labPerson, labAddress, labImg,
        rating, avgRating, labLicense, isRequest } = useSelector(state => state.user)
    const fetchAppointmentData = async (e) => {
        e.preventDefault()
        try {
            const response = await getSecureApiData(`lab/appointment-data/${appointmentId}`)
            if (response.success) {
                toast.success("Appointment Fetched successfully")
                setTestId(response.data.testId)
                handleBack(e, "#profile-tab");
                setAppointmentData(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
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
    const subtotal = appointmentData?.testId
        ?.reduce((acc, item) => acc + Number(item?.price || 0), 0) || 0;

    const gst = subtotal * 0.05;
    const total = subtotal + gst;
    const fetchPtData = async () => {
        if (!appointmentData?.patientId?._id) {
            return
        }
        try {
            const response = await getSecureApiData(`patient/demographic/${appointmentData?.patientId?._id}`)
            if (response.success) {
                setDemoData(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchPtData()
    }, [appointmentData])
    const fetchTestReport = async (testId) => {
        try {
            const payload = { testId, appointmentId: appointmentData?._id };
            const response = await securePostData('lab/test-report-data', payload);

            if (response.success && response.data) {
                setReportMeta(prev => ({
                    ...prev,
                    [testId]: {
                        id: response.data?._id,
                        createdAt: response.data.createdAt
                    }
                }));
                return response.data;
            } else {
                return null;
            }
        } catch (err) {
            console.error(`Error fetching report for test ${testId}:`, err);
            return null;
        }
    };
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
                                    status: comp?.status || "",
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
        };

        fetchTestsOneByOne();
    }, [testId]);
    const handleDownload = () => {
        const element = invoiceRef.current;
        document.body.classList.add("hide-buttons");
        const opt = {
            margin: 0.5,
            filename: "invoice.pdf",
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
        };

        html2pdf().from(element).set(opt).save().then(() => {
            document.body.classList.remove("hide-buttons");
        });
    };
    const reportDownload = () => {
        const element = reportRef.current;

        document.body.classList.add("hide-buttons");

        const opt = {
            margin: [0.2, 0.2, 0.2, 0.2],
            filename: "report.pdf",
            image: { type: "jpeg", quality: 1 },
            html2canvas: { scale: 3, useCORS: true },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        html2pdf()
            .from(element)
            .set(opt)
            .save()
            .then(() => {
                document.body.classList.remove("hide-buttons");
            });
    };
    const labelDownload = () => {
        if (!compenentRef.current) {
            console.error('print area not found');
            return;
        }

        const printContents = compenentRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload(); // optional if needed

    };
    const appointmentAction = async (e, type, status) => {
        e.preventDefault()
        let data = {}
        if (type == 'status') {
            data = { type, labId: userId, appointmentId: appointmentData?._id, status }
        }
        else if (type == 'payment') {
            data = { type, labId: userId, appointmentId: appointmentData?._id, paymentStatus: status }
        }
        try {
            const response = await updateApiData(`appointment/lab-action`, data);
            if (response.success) {
                const res = await getSecureApiData(`lab/appointment-data/${appointmentId}`)
                if (res.success) {
                    setTestId(res.data.testId)
                    setAppointmentData(res.data)
                } else {
                    toast.error(res.message)
                }
                if(type==='payment'){
                    handleBack(e, "#upload-tab");
                }
                if(type==='status'){
                    handleBack(e, "#contact-tab");
                }
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }
    const fetchInputPtData = async () => {
        if (inputPtId?.length < 4) {
            return
        }
        if (patData && inputPtId?.length > 4) {
            return
        }
        try {
            const response = await getSecureApiData(`patient/${inputPtId}`)
            if (response.success) {

                setPatData(response.data)
            } else {
                toast.error(response.message)
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        if (inputPtId) {
            fetchInputPtData()
        }
    }, [inputPtId])
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
    const handleSave = async (e) => {
        e.preventDefault();
        if (!isOwner && !permissions?.addReport) {
            toast.error('You do not have permission to add a report ')
            return
        }
        // Loop through each test (key is testId)
        for (const testId in allComponentResults) {
            // Find the test details (component titles, units, etc.)
            const testItem = testData.find(t => t._id === testId);
            if (!testItem) continue;

            // Build components array for API
            const components = testItem.component.map((comp, index) => ({
                cmpId: comp._id,
                result: allComponentResults[testId]?.[index]?.result || "",
                status: allComponentResults[testId]?.[index]?.status || ""
            }));
            const payload = {
                labId: userId,
                patientId: appointmentData.patientId,
                testId,
                appointmentId: appointmentData._id,
                component: components,
                comment: allComments?.[testId] || ""
            };
            try {
                const response = await securePostData("lab/test-report", payload);

                if (response.success) {

                    // toast.success(`Report saved for test ID: ${testId}`);
                } else {
                    toast.error(response.message);
                }
            } catch (err) {
                console.error("Error saving report:", err);
                toast.error("Failed to save report.");
            }
        }
        handleBack(e, "#person-tab");
        toast.success('Report saved') // refresh data
    };
    const sendReport = async (appointmentId, email, type) => {
        const data = { appointmentId, email, type }
        try {
            const response = await securePostData(`lab/send-report`, data);
            if (response.success) {
                toast.success("Report sent")
            } else {
                toast.error(response.message)
            }
        } catch (err) {
            console.error("Error creating lab:", err);
        }
    }

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
    const handleBack = (e, name) => {
        e.preventDefault(); // prevent page reload
        const tabTrigger = document.querySelector(name); // the tab button for "contact"
        const tab = new Tab(tabTrigger);
        tab.show();
    };
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
                            <button className="patient-thm-btn nw-thm-btn"><FontAwesomeIcon icon={faDownload} /> Download PDF</button>
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
                                            className={`nav-link ${Object.keys(appointmentData).length === 0 ? "disabled" : ""}`}
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
                                            className={`nav-link ${Object.keys(appointmentData).length === 0 ? "disabled" : ""}`}
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
                                            className={`nav-link ${Object.keys(appointmentData).length === 0 ? "disabled" : ""}`}
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
                                            className={`nav-link ${Object.keys(appointmentData).length === 0 ? "disabled" : ""}`}
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
                                            className={`nav-link ${Object.keys(appointmentData).length === 0 ? "disabled" : ""}`}
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
                                                                                value={appointmentId}
                                                                                onChange={(e) => setAppointmentId(e.target.value)}
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
                                                                            <label>Patient Id</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Patient Id"
                                                                                value={inputPtId}
                                                                                onChange={(e) => {
                                                                                    setInputPtId(e.target.value)
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Patient Name</label>
                                                                            <input
                                                                                type="text"
                                                                                disabled
                                                                                value={patData?.name}
                                                                                className="form-control"
                                                                                placeholder="Enter Patient Name"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Phone Number</label>
                                                                            <input
                                                                                type="text"
                                                                                disabled
                                                                                value={patData?.contactNumber}

                                                                                className="form-control"
                                                                                placeholder="Enter Phone Number"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>DOB</label>

                                                                            <input type="date" disabled
                                                                                value={patData?.dob ? new Date(patData.dob).toISOString().split("T")[0] : ""}
                                                                                className="form-control" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-4 col-md-6 col-sm-12">
                                                                        <div className="custom-frm-bx">
                                                                            <label>Gender</label>
                                                                            <select
                                                                                value={patData?.gender}
                                                                                disabled className="form-select">
                                                                                <option value="">Select Gender</option>
                                                                                <option value="male">Male</option>
                                                                                <option value="female">Female</option>
                                                                                <option value="other">Other</option>

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
                                                                                disabled
                                                                                className="form-control"
                                                                                placeholder="Enter Doctor Name"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-lg-12">
                                                                        <h6 className="qrcode-title fw-700 fz-20">Lab Test</h6>
                                                                    </div>

                                                                    {/* <div className="col-lg-12">
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
                                                                    </div> */}
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
                                                                    <div className="d-flex align-items-center gap-2 justify-content-end">
                                                                        <button onClick={handleAddTest}
                                                                            type="button"
                                                                            className="fz-16 fw-700 " style={{ color: "#34A853" }}><FaSquarePlus /> Add </button>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}


                                                        <div className="text-end pt-3" >
                                                            <button onClick={(e) => hasLRx ? fetchAppointmentData(e) : appointmentSubmit(e)} className="nw-thm-btn rounded-4">Proceed</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="profile" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                                    {appointmentData && <div className="new-invoice-card">
                                                        <div className="d-flex align-items-center justify-content-between mb-3">
                                                            <div>
                                                                <h5 className="first_para fw-700 fz-20 mb-0">Invoice</h5>
                                                            </div>
                                                            <div>
                                                                <button className="print-btn" onClick={handleDownload}> <FontAwesomeIcon icon={faDownload} /> Download PDF</button>
                                                            </div>
                                                        </div>

                                                        <div className="laboratory-header mb-4">
                                                            <div className="laboratory-name">
                                                                <h5>{profiles?.name || 'Advance Lab Tech'}</h5>
                                                                <p><span className="laboratory-title">GSTIN :</span> {profiles?.gstNumber}</p>
                                                            </div>
                                                            <div className="invoice-details">
                                                                <p><span className="laboratory-invoice">Invoice :</span> IN{appointmentData?.customId}</p>
                                                                <p><span className="laboratory-invoice">Date :</span> {new Date().toLocaleDateString()}</p>
                                                            </div>
                                                        </div>

                                                        <div className="laboratory-bill-crd">
                                                            <div className="laboratory-bill-bx">
                                                                <h6>Bill To</h6>
                                                                <h4>{appointmentData?.patientId?.name}</h4>
                                                                <p><span className="laboratory-phne">Phone :</span> {appointmentData?.patientId?.contactNumber}</p>
                                                            </div>
                                                            <div className="laboratory-bill-bx">
                                                                <h6>Order</h6>
                                                                <h4>{appointmentData?.patientId?.name}</h4>
                                                                <p><span className="laboratory-phne">Phone :</span> {appointmentData?.patientId?.contactNumber}</p>
                                                            </div>
                                                        </div>
                                                        <div className="laboratory-report-bx">
                                                            <ul className="laboratory-report-list">
                                                                <li className="laboratory-item"><span>Test</span> <span>Price</span></li>
                                                                {appointmentData?.testId?.map((item, key) =>
                                                                    <li className="laboratory-item border-0" key={key}>
                                                                        <span>{item?.shortName}</span> <span>{item?.price}</span></li>)}
                                                            </ul>
                                                            <div className="lab-amount-bx">
                                                                <ul className="lab-amount-list">
                                                                    <li className="lab-amount-item">Subtotal : <span className="price-title">{subtotal}</span></li>
                                                                    <li className="lab-amount-item lab-divider">GST (5%) :  <span className="price-title">{gst}</span></li>
                                                                    <li className="lab-amount-item">Total :  <span className="price-title">{total}</span></li>
                                                                </ul>
                                                            </div>
                                                            {appointmentData?.paymentStatus ==='due' &&<div className="text-end mt-5" >
                                                                <button className="nw-thm-btn rounded-4" onClick={()=>appointmentAction(appointmentData?._id,'paid','payment')}>Collect payment</button>
                                                            </div>}
                                                        </div>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="upload" role="tabpanel">
                                        <div className="sub-tab-brd ">
                                            {appointmentData && <div className="new-invoice-card">
                                                <div className="row">
                                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                                        <div>
                                                            <h5 className="first_para fw-700 fz-20 mb-0">Preview</h5>
                                                        </div>
                                                        <div>
                                                            <button onClick={labelDownload} className="print-btn no-print"> <FontAwesomeIcon icon={faPrint} /> Print</button>
                                                        </div>
                                                    </div>

                                                    <div ref={compenentRef} className="row">
                                                        {testData?.map((item, key) =>
                                                            <div className="col-lg-3 col-md-4 col-sm-12 mb-3" key={key}>
                                                                <div className=" barcd-scannr" >
                                                                    <div className="barcd-content">
                                                                        <h4 className="my-3">SP-{item?._id?.slice(-5)}</h4>
                                                                        <ul className="qrcode-list">
                                                                            <li className="qrcode-item">Test  <span className="qrcode-title">: {item?.shortName}</span></li>
                                                                            <li className="qrcode-item">Draw  <span className="qrcode-title"> : {new Date(reportMeta[item._id]?.createdAt)?.toLocaleDateString()}</span> </li>
                                                                        </ul>

                                                                        {/* <img src="/barcode.png" alt="" /> */}
                                                                        <Barcode value={reportMeta[item._id]?.id} width={1} displayValue={false}
                                                                            height={60} />
                                                                    </div>
                                                                    <div className="barcode-id-details">
                                                                        <div>
                                                                            <h6>Patient Id </h6>
                                                                            <p>PS-{appointmentData?.patientId?.customId}</p>
                                                                        </div>


                                                                        <div>
                                                                            <h6>Appointment ID </h6>
                                                                            <p>OID-{appointmentData?.customId}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>)}

                                                    </div>
                                                </div>
                                                <div className="text-end mt-3" >
                                                    <button className="nw-thm-btn rounded-4" onClick={(e)=>handleBack(e, "#collection-tab")}>Pressed</button>
                                                </div>
                                            </div>}
                                        </div>
                                    </div>

                                    {appointmentData && <div className="tab-pane fade" id="collection" role="tabpanel">
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
                                                                    {testData?.map((item, key) =>
                                                                        <li key={key} className="appoint-item sample-item "> {item?.precautions}</li>)}
                                                                    {/* <li className="appoint-item sample-item"> Confirm fasting/time, anticoagulants</li> */}
                                                                    <li className="appoint-item sample-item"> Sample : {testData?.map((item, key) => item?.sampleType + ', ')}</li>
                                                                    {/* <li className="appoint-item sample-item"> Record pre-analytic conditions (hemolysis, volume, temp)</li> */}
                                                                </ul>

                                                                {appointmentData?.status == 'approved' && <div className="mt-3" >
                                                                    <button onClick={(e) => appointmentAction(e, 'status', 'pending-report')} className="collected-btn">Mark Collected</button>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                                                        <div className="new-invoice-card">
                                                            <div>
                                                                <h5 className="first_para fw-700 fz-20">Specimen Plan</h5>
                                                            </div>
                                                            <div className="row">
                                                                {testData?.map((item, key) =>
                                                                    <div className="col-lg-6 mb-3" key={key}>
                                                                        <div className="laboratory-bill-bx">
                                                                            <h4>SP-{item?._id?.slice(-5)}</h4>
                                                                            <p><span className="laboratory-phne">Test :</span> {item?.shortName}</p>
                                                                            <p><span className="laboratory-phne text-capitalize">Category :</span> {item?.testCategory}</p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {/* <div className="col-lg-6">
                                                                    <div className="laboratory-bill-bx">
                                                                        <h4>SP-9879</h4>
                                                                        <p><span className="laboratory-phne">Test :</span> LFT</p>
                                                                        <p><span className="laboratory-phne">Tube :</span> SST</p>
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-end mt-3" >
                                            <button className="nw-thm-btn rounded-4" onClick={(e)=>handleBack(e, "#contact-tab")}>Pressed</button>
                                        </div>
                                    </div>}
                                    {appointmentData &&
                                        <form onSubmit={handleSave} className="tab-pane fade" id="contact" role="tabpanel">
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
                                                            {testData.map((item, key) =>
                                                                <div className="sub-tab-brd mb-3" key={key}>
                                                                    <div className="custom-frm-bx">
                                                                        <label htmlFor="">{item?.shortName}</label>
                                                                        <input type="text" className="form-control" placeholder={item?.shortName} />
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
                                                                        <textarea value={allComments[item?._id]}
                                                                            onChange={(e) =>
                                                                                setAllComments(prev => ({
                                                                                    ...prev,
                                                                                    [item?._id]: e.target.value
                                                                                }))
                                                                            }
                                                                            name="comment" id="" className="form-control"></textarea>
                                                                    </div>
                                                                </div>)}
                                                            {/* <div className="sub-tab-brd mb-3">
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
                                                            </div> */}
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

                                                                    {appointmentData?.doctorId && <div className="laboratory-bill-bx laboratory-sub-bx">
                                                                        <h6 className="my-0">Doctor </h6>
                                                                        <h4>Dr. Ravi Kumar</h4>
                                                                        <p><span className="laboratory-phne"> ID :</span> OID-7C1B48  </p>
                                                                    </div>}
                                                                </div>
                                                            </div>
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
                                                                            {testData.map((item) =>
                                                                                item.component.map((c, i) => (
                                                                                    <tr key={i}>
                                                                                        <td>{item?.shortName} - {c?.title}</td>
                                                                                        <td>{c?.unit}</td>
                                                                                        <td>{c?.referenceRange}</td>
                                                                                        <td >
                                                                                            <div className="custom-frm-bx mb-0">
                                                                                                <input type="text" name="" id=""
                                                                                                    className="form-control"
                                                                                                    value={allComponentResults[item?._id]?.[i]?.result || ""}
                                                                                                    onChange={(e) =>
                                                                                                        setAllComponentResults(prev => ({
                                                                                                            ...prev,
                                                                                                            [item?._id]: {
                                                                                                                ...prev[item?._id],
                                                                                                                [i]: {
                                                                                                                    ...prev[item?._id]?.[i],
                                                                                                                    result: e.target.value
                                                                                                                }
                                                                                                            }
                                                                                                        }))
                                                                                                    }
                                                                                                    placeholder="Enter" />
                                                                                            </div>
                                                                                        </td>
                                                                                        <td>
                                                                                            <div className="custom-frm-bx ms-2 mb-0">
                                                                                                <select name="" id="" className="form-select"
                                                                                                    value={allComponentResults[item?._id]?.[i]?.status || ""}
                                                                                                    onChange={(e) =>
                                                                                                        setAllComponentResults(prev => ({
                                                                                                            ...prev,
                                                                                                            [item?._id]: {
                                                                                                                ...prev[item?._id],
                                                                                                                [i]: {
                                                                                                                    ...prev[item?._id]?.[i],
                                                                                                                    status: e.target.value
                                                                                                                }
                                                                                                            }
                                                                                                        }))
                                                                                                    }>
                                                                                                    <option value="">Select</option>
                                                                                                    <option value="pass">Pass</option>
                                                                                                    <option value="fail">Fail</option>
                                                                                                </select>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>)))}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                            <div className="report-remark mt-3">
                                                                <h6>Remark <a href="javascript:void(0)" className="edit-btn text-black"><FontAwesomeIcon icon={faPen} /></a></h6>
                                                                {/* <textarea rows={5} /> */}
                                                                <p>-</p>
                                                            </div>

                                                            {appointmentData?.doctorId && <div className="laboratory-bill-bx">
                                                                <h6>Lab tests prescribed by the doctor</h6>
                                                                <h4>Dr.James Harris</h4>
                                                                <p><span className="laboratory-phne">ID :</span>DO-7668</p>
                                                            </div>}
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
                                                <button type="submit" className="nw-thm-btn rounded-4">Submit</button>
                                            </div>



                                        </form>}



                                    <div className="tab-pane fade" id="person" role="tabpanel">
                                        <div className="sub-tab-brd">
                                            <div className="">
                                                <div className="row">


                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">

                                                        <div className="new-invoice-card h-100">
                                                            <div className="">
                                                                <ul className="appointment-booking-list">
                                                                    <li className="appoint-item"> Appointment Book Date : <span className="appoint-title">{new Date(appointmentData?.date)?.toLocaleDateString()}</span></li>
                                                                    <li className="appoint-item"> Visited  date : <span className="appoint-title">25-11-03</span></li>
                                                                    <li className="appoint-item"> Appointment Completed date : <span className="appoint-title">25-11-03</span></li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3" ref={reportRef}>
                                                        <div className="new-invoice-card">
                                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                                <div>
                                                                    <h5 className="first_para fw-700 fz-20 mb-0">Final Diagnostic Report</h5>
                                                                </div>
                                                                <div className="d-flex align-items-center gap-2" >
                                                                    <button onClick={reportDownload} className="print-btn no-print"> <FontAwesomeIcon icon={faDownload} /> Download PDF</button>
                                                                    {/* <button className="print-btn"> <FontAwesomeIcon icon={faPaperPlane} /> Send</button> */}
                                                                    <div class="dropdown no-print">
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
                                                                                <button onClick={() => sendReport(appointmentId, appointmentData?.patientId?.email, 'patient')} class="nw-dropdown-item report-nav" href="#">
                                                                                    Send Patient
                                                                                </button>
                                                                            </li>

                                                                            {appointmentData?.doctorId && <li className="report-item">
                                                                                <a class="nw-dropdown-item report-nav" href="#">
                                                                                    Send Doctor
                                                                                </a>
                                                                            </li>}

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
                                                                    <h5>{profiles?.name || 'Advance Lab Tech'}</h5>
                                                                    <p><span className="laboratory-title">GSTIN :</span> {profiles?.gstNumber}</p>
                                                                </div>
                                                                <div className="invoice-details">
                                                                    <p><span className="laboratory-invoice">Invoice :</span> IN{appointmentData?.customId}</p>
                                                                    <p><span className="laboratory-invoice">Date :</span> {new Date(appointmentData?.createdAt)?.toLocaleDateString()}</p>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-lg-6 mb-3">
                                                                    <div className="laboratory-bill-bx laboratory-nw-box">
                                                                        <h6>Patient </h6>
                                                                        <h4>{appointmentData?.patientId?.name}</h4>
                                                                        <p><span className="laboratory-phne">ID :</span> {appointmentData?.patientId?.customId}</p>
                                                                        <p><span className="laboratory-phne">DOB:</span> {new Date(demoData?.dob)?.toLocaleDateString()}</p>
                                                                        <p><span className="laboratory-phne">Gender:</span> {appointmentData?.patientId?.gender?.toUpperCase()}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6">
                                                                    <div className="laboratory-bill-bx mb-2 laboratory-sub-bx">
                                                                        <h6>Order </h6>
                                                                        <p><span className="laboratory-phne">Appointment ID :</span> OID-{appointmentData?.customId}  </p>
                                                                    </div>

                                                                    {appointmentData?.doctorId && <div className="laboratory-bill-bx laboratory-sub-bx">
                                                                        <h6 className="my-0">Doctor </h6>
                                                                        <h4>Aarav Mehta</h4>
                                                                        <p><span className="laboratory-phne"> ID :</span> OID-7C1B48  </p>
                                                                    </div>}

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

                                                                            {testData.map((test) => (
                                                                                test.component.map((cmp, index) => {
                                                                                    const resultObj = allComponentResults[test._id]?.[index] || {};
                                                                                    return (
                                                                                        <tr key={test._id + index}>
                                                                                            <td>{test.shortName} - {cmp.name}</td>
                                                                                            <td>{cmp.unit || "-"}</td>
                                                                                            <td>{cmp.referenceRange || "-"}</td>
                                                                                            <td>{resultObj.result || "-"}</td>
                                                                                            <td className="text-capitalize">{resultObj.status || "-"}</td>
                                                                                        </tr>
                                                                                    );
                                                                                })
                                                                            ))}
                                                                            {/* <tr>
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
                                                                            </tr> */}


                                                                        </tbody>
                                                                    </table>

                                                                </div>
                                                            </div>

                                                            <div className="report-remark mt-3">
                                                                <h6>Remark</h6>
                                                                {testData.map((test) => (
                                                                    <p key={test._id}>{allComments[test._id] || "-"}</p>
                                                                ))}
                                                            </div>

                                                            <div className="row  mt-3">
                                                                {testData?.map((item, key) =>
                                                                    <div className="col-lg-6">
                                                                        <div className=" barcd-scannr" key={key}>
                                                                            <div className="barcd-content">
                                                                                <h4 className="my-3">SP-{item?._id?.slice(-5)}</h4>
                                                                                <ul className="qrcode-list">
                                                                                    <li className="qrcode-item">Test  <span className="qrcode-title">: {item?.shortName}</span></li>
                                                                                    <li className="qrcode-item">Draw  <span className="qrcode-title"> : {new Date(reportMeta[item._id]?.createdAt)?.toLocaleDateString()}</span> </li>
                                                                                </ul>
                                                                                {/* <img src="/barcode.png" alt="" /> */}
                                                                                {/* {console.log(reportMeta[item._id]?.id)} */}
                                                                                <Barcode value={reportMeta[item._id]?.id} width={1} displayValue={false}
                                                                                    height={60} />

                                                                            </div>
                                                                        </div>

                                                                    </div>)}


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