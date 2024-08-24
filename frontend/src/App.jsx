import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/client/AppLayout";
import Home from "./pages/client/Home";
import SpecialtiesCategory from "./pages/client/Specialties";
import CategoryService from "./pages/client/CategoryService";
import DetailService from "./pages/client/DetailService";
import News from "./pages/client/News";
import AboutUs from "./pages/client/AboutUs";
import Contact from "./pages/client/Contact";
import Doctors from "./pages/client/Doctors";
import DoctorDetail from "./pages/client/DoctorDetail";
import NewsDetail from "./pages/client/NewsDetail";
import TablePriceService from "./pages/client/TablePriceService";
import UserProfileLayout from "./pages/client/UserProfile";
import MedicalRecords from "./components/client/infomationUser/MedicalRecords";
import UserInfoForm from "./components/client/infomationUser/UserInfoForm";
import AppointmentHistory from "./components/client/infomationUser/AppointmentHistory";
import Login from "./pages/client/Login";
import Register from "./pages/client/Register";
import Accurancy from "./pages/client/Accuracy";
import ForgetPassword from "./pages/client/ForgetPassWord";
import ChangePassAccuracy from "./pages/client/ChangePassAccuracy";
import ChangePass from "./pages/client/ChangePass";
import ChangePassword from "./components/client/infomationUser/ChangePassword";
import AppointmentDetail from "./components/client/infomationUser/AppointmentDetail";
import MedicalRecordDetail from "./components/client/infomationUser/MedicalRecordDetail";
import NotFound from "@/components/client/notFound";
import PackageBooking from "./pages/client/PackageBooking";
import ServicesBooking from "./pages/client/ServicesBooking";
import PKCheckOut from "./pages/client/PKBookingPayment";
import SVCheckOut from "./pages/client/SVBookingPayment";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "specialties",
        element: <SpecialtiesCategory />,
      },
      {
        path: "services/:specialtyId?",
        element: <CategoryService />,
      },
      {
        path: "packages/:specialtyId?",
        element: <CategoryService />,
      },
      {
        path: "detail-service/:serviceId",
        element: <DetailService />,
      },
      {
        path: "detail-package/:packageId",
        element: <DetailService />,
      },
      {
        path: "price-service",
        element: <TablePriceService />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "news-detail/:id",
        element: <NewsDetail />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "doctor-detail/:id",
        element: <DoctorDetail />,
      },
      {
        path: "user-profile",
        element: <UserProfileLayout />,
        children: [
          {
            path: "",
            element: <UserInfoForm />,
          },
          {
            path: "medical-records",
            element: <MedicalRecords />,
          },
          {
            path: "medical-records/detail/:id",
            element: <MedicalRecordDetail />,
          },
          {
            path: "appointment-history",
            element: <AppointmentHistory />,
          },
          {
            path: "appointment-history/detail/:id",
            element: <AppointmentDetail />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "package-booking",
        element: <PackageBooking/>
      },
      {
        path: "services-booking",
        element: <ServicesBooking/>
      },
      {
        path: "package-booking-checkout",
        element: <PKCheckOut/>
      },
      {
        path: "services-booking-checkout",
        element: <SVCheckOut/>
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/accuracy",
        element: <Accurancy />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/changepassword-accuracy",
        element: <ChangePassAccuracy />,
      },
      {
        path: "/change-password",
        element: <ChangePass />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
}

export default App;
