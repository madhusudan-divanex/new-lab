import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ChangePassword() {
  return (
       <>
      <div className="main-content flex-grow-1 p-3 overflow-auto">
        <form action="">
          <div className="row mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h3 className="innr-title">Change Password</h3>
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
                        Change Password
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </form>

        <form action="">
          <div className="submega-main-bx">
            <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="custom-frm-bx">
                <label htmlFor="">Current Password</label>
                <input
                  type="text"
                  className="form-control pe-5"
                  placeholder="Enter Current Password"
                />

                <div className="search-item-bx">
                  <a href="javascript:void(0)" className="search-item-btn">
                    <FontAwesomeIcon icon={faEyeSlash} className="text-black"/>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="custom-frm-bx">
                <label htmlFor="">New Password</label>
                <input
                  type="text"
                  className="form-control pe-5"
                  placeholder="Enter New Password"
                />

                <div className="search-item-bx">
                  <a href="javascript:void(0)" className="search-item-btn">
                    <FontAwesomeIcon icon={faEyeSlash} className="text-black"/>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="custom-frm-bx">
                <label htmlFor="">Confirm New Password</label>
                <input
                  type="text"
                  className="form-control pe-5"
                  placeholder="Confirm New Password"
                />

                <div className="search-item-bx">
                  <a href="javascript:void(0)" className="search-item-btn">
                    <FontAwesomeIcon icon={faEyeSlash} className="text-black"/>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-end">
            <button type="submit" className="nw-thm-btn sub-nw-brd-tbn">Change Password</button>
            </div>

          </div>
          </div>
        </form>

        
      </div>
    </>
  )
}

export default ChangePassword