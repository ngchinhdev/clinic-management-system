import { Outlet } from "react-router-dom";
import Sidebar from "../../components/client/infomationUser/Sidebar";
import useScrollToTop from "@/hooks/useScrollToTop";
const UserProfileLayout = () => {
  useScrollToTop();
  return (
    <div className="mx-auto max-w-screen-2xl bg-bg-gray pb-6">
      <div className="mx-auto grid max-w-7xl grid-cols-12 md:gap-7">
        <div className="col-span-12 w-full max-md:mx-auto max-md:max-w-md md:col-span-3 md:max-w-72">
          <div className="box mt-7 w-full rounded-xl border-gray-300 bg-white p-6">
            <Sidebar />
          </div>
        </div>
        <div className="col-span-12 mt-7 md:col-span-9">
          <div className="grid grid-cols-1 gap-5 rounded-xl bg-white sm:grid-cols-1 lg:grid-cols-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
