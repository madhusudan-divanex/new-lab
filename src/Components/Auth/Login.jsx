import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { postApiData } from '../../services/api'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { setOwner, setPermissions } from '../../redux/features/userSlice'
import { useDispatch } from 'react-redux'


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false)
  const userId = localStorage.getItem('userId')
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postApiData('lab/signin', formData)
      if (response.success) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('userId', response.userId)
        console.log(response.isOwner)
        localStorage.setItem('isOwner', response.isOwner);
        if(!response.isOwner){

          localStorage.setItem('permissions', JSON.stringify(response.user.permissionId))
        }


        toast.success('Login successfully')
        if (response.user.status == 'pending') {
          navigate('/wating-for-approval')
          return
        } else {

          navigate('/')
        }
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
  };
  return (
    <>
      <section className="admin-login-section ">
        <div className="container-fluid ">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 px-0 mb-sm-3 mb-lg-0">
              <div className="admin-pisture-bx">
                <img src="login-bnnr.png" alt="" />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 d-flex flex-column justify-content-center">
              <div>
                <div className="admin-frm-vendor-bx">
                  <div className="admin-lg-title">
                    <h4 className="mb-0"><a href="javascript:void(0)" className="dash-hp-title">
                      <img src="/logo.png" alt="" />
                    </a></h4>
                  </div>

                  <div className="admin-vendor-login">
                    <div className="admin-vndr-login">
                      <h3>Laboratory Login</h3>
                      <p>Secure access to the Laboratory Information System.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="custom-frm-bx admin-frm-bx">
                        <label htmlFor="">Email Address</label>
                        <input
                          type="email"
                          className="form-control admin-frm-control"
                          placeholder="Enter Email Address"
                          name='email'
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div className="custom-frm-bx admin-frm-bx">
                        <label htmlFor="">Password</label>
                        <input
                          type={isShow ? "text" : "password"}
                          className="form-control admin-frm-control pe-5"
                          placeholder="*******"
                          name='password'
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />

                        <div className="pass-eye-bx">
                          <a href="#" onClick={() => setIsShow(!isShow)} className="pass-eye-slash-btn">
                            <FontAwesomeIcon icon={isShow ? faEyeSlash : faEye} />
                          </a>
                        </div>
                      </div>
                      <div className='text-end'>
                        <NavLink to="/forgot-password" className='lab-login-forgot-btn fs-6'>Forgot Password</NavLink>
                      </div>


                      <div className='mt-3'>
                        <button type="submit" className="admin-lg-btn">
                          Login
                        </button>
                      </div>

                      <div className='text-center mt-5'>
                        <span className='do-account-title'>don't have an account?  <Link to="/create-account" className='lab-login-forgot-btn'>Register here</Link></span>
                      </div>

                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login