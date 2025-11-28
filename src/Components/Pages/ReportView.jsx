import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function ReportView() {
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
                        <div>
                            <button className="print-btn"> <FontAwesomeIcon icon={faDownload}/> Download PDF</button>
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
                                  <div className="laboratory-bill-bx laboratory-sub-bx mb-2">
                                <h6>Order </h6>
                                <p><span className="laboratory-phne">Appointment ID :</span> OID-7C1B48  </p>
                            </div>

                            <div className="laboratory-bill-bx laboratory-sub-bx">
                                <h6 className="my-0">Doctor</h6>
                                <h4 >Aarav Mehta</h4>
                                <p><span className="laboratory-phne">ID :</span> OID-7C1B48  </p>
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
    </>
  )
}

export default ReportView