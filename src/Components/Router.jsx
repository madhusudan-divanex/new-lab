import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import TestRequest from "./Pages/TestRequest";
import Tests from "./Pages/Tests";
import LabReports from "./Pages/LabReports";
import AppLayout from "./Layouts/AppLayout";
import Invoices from "./Pages/Invoices";
import Permission from "./Pages/Permission";
import EmployeeList from "./Pages/EmployeeList.JSX";
import ChangePassword from "./Pages/ChangePassword";
import PatientDetails from "./Pages/PatientDetails";
import Profile from "./Pages/Profile";
import PermissionCheck from "./Pages/PermissionCheck";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/ForgotPassword";
import Otp from "./Auth/Otp";
import SetPassword from "./Auth/SetPassword";
import CreateAccount from "./Auth/CreateAccount";
import AddEmployee from "./Pages/AddEmployee";
import ViewEmployee from "./Pages/ViewEmployee";
import TestReports from "./Pages/LabTestReports";
import EditProfile from "./Pages/EditProfile";
import AppointmentDetails from "./Pages/AppointmentDetails";
import LabTestReports from "./Pages/LabTestReports";
import Reports from "./Pages/Reports";
import InvoiceDetails from "./Pages/InvoiceDetails";
import Chat from "./Pages/Chat";
import CreateAccountImage from "./Auth/CreateAccountImage";
import CreateAccountAddress from "./Auth/CreateAccountAddress";
import CreateAccountPerson from "./Auth/CreateAccountPerson";
import Error from "./Pages/Error";
import CreateAccountUpload from "./Auth/CreateAccountUpload";
import ApproveProfile from "./Pages/ApproveProfile";
import PatientsView from "./Pages/PatientsView";
import Labels from "./Pages/Labels";
import ReportsTabs from "./Pages/ReportsTabs";
import AppointmentRequest from "./Pages/AppointmentRequest";
import TestReportsAppoiments from "./Pages/TestReportsAppoiments";
import NewInvoice from "./Pages/NewInvoice";
import ReportView from "./Pages/ReportView";
import Notification from "./Pages/Notification";
import EditTest from "./Pages/EditTest";
import ProtectedRoute from "./ProtectedRoute";


function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        // Protected Routes
        {
          index: true,
          element: <ProtectedRoute component={Dashboard} />,
        },
        {
          path: "/dashboard",
          element: <ProtectedRoute component={Dashboard} />,
        },
        {
          path: "/test-request",
          element: <ProtectedRoute component={TestRequest} />,
        },
        {
          path: "/tests",
          element: <ProtectedRoute component={Tests} />,
        },
        {
          path: "/lab-report",
          element: <ProtectedRoute component={LabReports} />,
        },
        {
          path: "/invoice",
          element: <ProtectedRoute component={Invoices} />,
        },
        {
          path: "/permission",
          element: <ProtectedRoute component={Permission} />,
        },
        {
          path: "/employee-list",
          element: <ProtectedRoute component={EmployeeList} />,
        },
        {
          path: "/change-password",
          element: <ProtectedRoute component={ChangePassword} />,
        },
        {
          path: "/patient-details",
          element: <ProtectedRoute component={PatientDetails} />,
        },
        {
          path: "/profile",
          element: <ProtectedRoute component={Profile} />,
        },
        {
          path: "/permission-check/:name/:id",
          element: <ProtectedRoute component={PermissionCheck} />,
        },
        {
          path: "/employee-data",
          element: <ProtectedRoute component={AddEmployee} />,
        },
        {
          path: "/view-employee/:name/:id",
          element: <ProtectedRoute component={ViewEmployee} />,
        },
        {
          path: "/lab-test-reports",
          element: <ProtectedRoute component={LabTestReports} />,
        },
        {
          path: "/edit-profile/:id",
          element: <ProtectedRoute component={EditProfile} />,
        },
        {
          path: "/appointment-details",
          element: <ProtectedRoute component={AppointmentDetails} />,
        },
        {
          path: "/reports",
          element: <ProtectedRoute component={Reports} />,
        },
        {
          path: "/invoice-details",
          element: <ProtectedRoute component={InvoiceDetails} />,
        },
        {
          path: "/chat",
          element: <ProtectedRoute component={Chat} />,
        },
        {
          path: "/approve-profile",
          element: <ProtectedRoute component={ApproveProfile} />,
        },
        {
          path: "/patient-view/:id",
          element: <ProtectedRoute component={PatientsView} />,
        },
        {
          path: "/label",
          element: <ProtectedRoute component={Labels} />,
        },
        {
          path: "/report-tabs",
          element: <ProtectedRoute component={ReportsTabs} />,
        },
        {
          path: "/appointment-request",
          element: <ProtectedRoute component={AppointmentRequest} />,
        },
        {
          path: "/test-reports-appointment",
          element: <ProtectedRoute component={TestReportsAppoiments} />,
        },
        {
          path: "/new-invoice",
          element: <ProtectedRoute component={NewInvoice} />,
        },
        {
          path: "/report-view",
          element: <ProtectedRoute component={ReportView} />,
        },
        {
          path: "/notification",
          element: <ProtectedRoute component={Notification} />,
        },
        {
          path: "/edit-test/:id",
          element: <ProtectedRoute component={EditTest} />,
        },

        // Public Routes (No Protection)
        { path: "/login", element: <Login /> },
        { path: "/forgot-password", element: <ForgotPassword /> },
        { path: "/otp", element: <Otp /> },
        { path: "/set-password", element: <SetPassword /> },
        { path: "/create-account", element: <CreateAccount /> },
        { path: "/create-account-image", element: <ProtectedRoute component={CreateAccountImage} /> },
        { path: "/create-account-address", element: <ProtectedRoute component={CreateAccountAddress} /> },
        { path: "/create-account-person", element: <ProtectedRoute component={CreateAccountPerson} /> },
        { path: "/create-account-upload", element: <ProtectedRoute component={CreateAccountUpload} /> },
      ],
    },
  ]);



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default Router