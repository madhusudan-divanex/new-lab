import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function NewInvoice() {
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
                        

                        <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                       <div className="new-invoice-card">
                             <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <h5 className="first_para fw-700 fz-20 mb-0">Invoice</h5>
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
                            <button className="nw-thm-btn rounded-3 py-2">Collect payment</button>
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