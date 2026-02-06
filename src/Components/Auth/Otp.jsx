import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { postApiData, securePostData } from "../../services/api";
import { toast } from "react-toastify";


function Otp() {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(30);
  const contactNumber = sessionStorage.getItem('contactNumber')
  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take last character in case of typing multiple
    setOtp(newOtp);

    // Move focus to next input if filled
    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move to previous input if current is empty
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);

    // Focus last input
    const lastIndex = newOtp.length - 1;
    if (lastIndex >= 0) inputsRef.current[lastIndex].focus();
  };

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await postApiData('lab/resend-otp', { contactNumber })
      if (response.success) {
        toast.success('Otp sent successfully')
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
    setTimer(30); // reset timer after resend
  }
  const handleVerify = async (e) => {
    e.preventDefault();
    const data = { contactNumber, code: otp?.join('') ,type:sessionStorage.getItem('forgotId')?'forgot':'login'}
    try {
      const response = await securePostData('lab/verify-otp', data)
      if (response.success) {
        if(sessionStorage.getItem('forgotId')){          
          localStorage.setItem('otoken', response.token)
          return navigate('/set-password')
        }
        localStorage.setItem('token', response.token)
        localStorage.setItem('userId', response.userId)
        localStorage.setItem('isOwner', response.isOwner);
        if (!response.isOwner) {
          localStorage.setItem('staffId', response.staffId)

          localStorage.setItem('permissions', JSON.stringify(response.user.permissionId))
          dispatch(fetchEmpDetail(response.staffId))
        }


        toast.success('Login successfully')
        if (response.nextStep) {
          navigate(response.nextStep)
          return
        }
        if (response.user.status == 'pending') {
          navigate('/wating-for-approval')
          return
        } else {
          navigate('/')
        }
        // sessionStorage.clear()
        // localStorage.setItem('otoken', response.token)
        // navigate('/set-password')
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      console.error("Error creating lab:", err);
    }
    setTimer(30); // reset timer after resend
  }
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
                      <h3>Verify OTP</h3>
                      <p>We’ve sent a 6-digit code to your mobile number. Please enter it below to reset your password.</p>
                    </div>
                    <form onSubmit={handleVerify}>
                      <div className="custom-frm-bx admin-frm-bx lab-login-frm-bx" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="form-control admin-frm-control lab-login-frm-control"
                            placeholder="0"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el)}
                          />
                        ))}
                      </div>
                      <div className='mt-3'>
                        <button type="submit" className="admin-lg-btn">
                          Verify
                        </button>
                      </div>
                      <div className='text-center mt-5'>
                        <p className='do-account-title text-black'>Didn’t receive any code?</p>
                        <p className='do-account-title py-4'>
                          Request new code in <span className="otp-timing">{timer}s</span>
                        </p>
                        <button
                          className='lab-login-forgot-btn'
                          onClick={handleResendCode}
                          type="button"
                          disabled={timer > 0} // prevent clicking before timer ends
                        >
                          Resend
                        </button>
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

export default Otp