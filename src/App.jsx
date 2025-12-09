import { ToastContainer } from "react-toastify"
import Router from "./Components/Router"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'antd/dist/reset.css';  // for Ant Design v5+

function App() {

  return (
    <>
    <Router/>
    <ToastContainer/>
    </>
  )
}

export default App
