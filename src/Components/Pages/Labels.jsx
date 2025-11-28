import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Labels() {
    return (
        <>
            <div className="main-content flex-grow-1 p-3 overflow-auto">
                <form action="">
                    <div className="row mb-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h3 className="innr-title">Labels</h3>
                                <div className="admin-breadcrumb">
                                    <nav aria-label="breadcrumb">
                                        <ol class="breadcrumb custom-breadcrumb">
                                            <li className="breadcrumb-item">
                                                <a href="#" className="breadcrumb-link">
                                                    Dashboard
                                                </a>
                                            </li>

                                            <li className="breadcrumb-item">
                                                <a href="#" className="breadcrumb-link">
                                                    Test  Request
                                                </a>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Labels
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
                        <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                            <h5 className="first_para fw-700 fz-20 mb-0">Preview</h5>
                        </div>
                        <div>
                            <button className="print-btn"> <FontAwesomeIcon icon={faPrint}/> Print</button>
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
                </div>
            </div>
        </>
    )
}

export default Labels