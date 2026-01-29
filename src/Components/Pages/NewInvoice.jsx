import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useRef, useState } from "react"
import { getSecureApiData } from "../../services/api"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import html2canvas from "html2canvas"
import html2pdf from "html2pdf.js"


function NewInvoice() {
  const params = useParams()
  const invoiceRef = useRef(null);
  const appointmentId = params.id
  const { profiles, labPerson, labAddress, labImg,
    rating, avgRating, labLicense, isRequest } = useSelector(state => state.user)
  const [appointmentData, setAppointmentData] = useState({})
  const fetchAppointmentData = async () => {
    try {
      const response = await getSecureApiData(`lab/appointment-data/${appointmentId}`)
      if (response.success) {
        setAppointmentData(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchAppointmentData()
  }, [appointmentId])
  // Calculate subtotal, GST and total
  const subtotal = appointmentData?.testId
    ?.reduce((acc, item) => acc + Number(item?.price || 0), 0) || 0;

  const gst = subtotal * 0.05;
  const total = subtotal + gst;
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

  return (
    <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <form action="">
          <div className="row mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="innr-title">Invoices</h3>
                <div className="admin-breadcrumb">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb custom-breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#" className="breadcrumb-link">
                          Dashboard
                        </a>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Invoices
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
            <div className="col-lg-12 col-md-12 col-sm-12 mb-3" ref={invoiceRef}>
              <div className="new-invoice-card">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h5 className="first_para fw-700 fz-20 mb-0">Invoice</h5>
                  </div>
                  <div>
                    <button className="print-btn no-print" onClick={handleDownload}> <FontAwesomeIcon icon={faDownload} /> Download PDF</button>
                  </div>
                </div>

                <div className="laboratory-header mb-4">
                  <div className="laboratory-name">
                    <h5>{profiles?.name || 'Advance Lab Tech'}</h5>
                    <p><span className="laboratory-title">GSTIN :</span> {profiles?.gstNumber || '09897886454'}</p>
                  </div>
                  <div className="invoice-details">
                    <p><span className="laboratory-invoice">Invoice :</span> {appointmentData?.customId}</p>
                    <p><span className="laboratory-invoice">Date :</span>{"  "}{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="laboratory-bill-crd">
                  <div className="laboratory-bill-bx">
                    <h6>Bill To</h6>
                    <h4>{appointmentData?.patientId?.name}</h4>
                    <p><span className="laboratory-phne">Phone :</span> {appointmentData?.patientId?.patientId?.contactNumber}</p>
                  </div>
                  <div className="laboratory-bill-bx">
                    <h6>Order</h6>
                    <h4>{appointmentData?.patientId?.name}</h4>
                    <p><span className="laboratory-phne">Phone :</span> {appointmentData?.patientId?.patientId?.contactNumber}</p>
                  </div>
                </div>

                <div className="laboratory-report-bx">
                  <ul className="laboratory-report-list">
                    <li className="laboratory-item"><span>Test</span> <span>Price</span></li>
                    {appointmentData?.testId?.map((item, key) =>
                      <li className="laboratory-item border-0" key={key}><span>{item?.shortName}</span> <span>{item?.price}</span></li>)}
                  </ul>

                  <div className="lab-amount-bx">
                    <ul className="lab-amount-list">
                      <li className="lab-amount-item">Subtotal : <span className="price-title">{subtotal}</span></li>
                      <li className="lab-amount-item lab-divider">GST (5%) :  <span className="price-title">{gst}</span></li>
                      <li className="lab-amount-item">Total :  <span className="price-title">{total}</span></li>
                    </ul>
                  </div>
                  <div className="text-end mt-5" >
                    <button className="nw-thm-btn rounded-3 py-2 no-print">Collect payment</button>
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

export default NewInvoice