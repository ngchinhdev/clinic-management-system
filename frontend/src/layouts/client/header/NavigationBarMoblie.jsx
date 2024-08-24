import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp, IoNewspaperOutline } from "react-icons/io5";
import { FaNotesMedical } from "react-icons/fa";
import { FaBriefcaseMedical, FaUserDoctor } from "react-icons/fa6";
import { IoMdContacts } from "react-icons/io";
import { LiaInfoSolid } from "react-icons/lia";
import { NavbarContext } from "../../../contexts/NavBarContext";
import { useSelector } from "react-redux";
export default function NavigationBarMobile() {
  const { isNavbarVisible, setIsNavbarVisible, toggleNavbar } =
    useContext(NavbarContext);
  const userProfile = useSelector((state) => state.auth.userProfile);

  const menuItems = [
    {
      icon: <FaNotesMedical className="h-6 w-6" />,
      label: "Gói khám",
      link: "/category-service",
    },
    {
      icon: <FaBriefcaseMedical className="h-6 w-6" />,
      label: "Chuyên khoa",
      link: "/specialties",
    },
    {
      icon: <FaUserDoctor className="h-6 w-6" />,
      label: "Bác sĩ",
      link: "/doctors",
    },
    {
      icon: <IoNewspaperOutline className="h-6 w-6" />,
      label: "Tin tức",
      link: "/news",
    },
    {
      icon: <IoMdContacts className="h-6 w-6" />,
      label: "Liên hệ",
      link: "/contact",
    },
    {
      icon: <LiaInfoSolid className="h-6 w-6" />,
      label: "Về chúng tôi",
      link: "/about-us",
    },
  ];

  return (
    <>
      {isNavbarVisible && (
        <div
          className="fixed z-40 h-screen w-screen bg-black opacity-80"
          onClick={() => setIsNavbarVisible(false)}
        ></div>
      )}
      <nav
        className={`${isNavbarVisible && "navBarMoblie"} fixed -right-[1000px] top-0 z-50 h-full w-full bg-white duration-500 sm:w-[500px]`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex w-full items-center justify-between">
            <Link
              onClick={() => setIsNavbarVisible(false)}
              to={"/"}
              className="relative w-44 items-center"
            >
              <img
                src="https://ykhoadiamond.com/images/icons/logo.png"
                alt="Logo"
                className="w-full"
              />
            </Link>
            <span className="cursor-pointer" onClick={toggleNavbar}>
              <IoCloseSharp className="text-3xl" />
            </span>
          </div>
        </div>
        <div id="mobile-menu">
          <div className="bg-white py-5">
            {userProfile ? (
              <div className="m-4 mt-0 flex flex-col items-center justify-between space-x-3">
                <span className="text-sm mb-4">Xin chào, <strong>{userProfile.fullName}</strong> </span>
                <div className="flex w-full items-center justify-center space-x-3">
                <Link
                    onClick={() => setIsNavbarVisible(false)}
                    to="/user-profile"
                    className="w-full rounded bg-blue-500 px-4 py-2 text-center text-white"
                  >
                    Thông tin
                  </Link>
                  <Link
                    onClick={() => setIsNavbarVisible(false)}
                    to="/logout"
                    className="w-full rounded px-4 py-2 text-center text-blue-500 shadow-sm shadow-zinc-400"
                  >
                   Đăng xuất
                  </Link>
                 
                </div>
              </div>
            ) : (
              <div className="m-4 mt-0 flex items-center justify-between space-x-3">
                <Link
                  onClick={() => setIsNavbarVisible(false)}
                  to="/register"
                  className="w-full rounded px-4 py-2 text-center text-blue-500 shadow-sm shadow-zinc-400"
                >
                  Đăng ký
                </Link>
                <Link
                  onClick={() => setIsNavbarVisible(false)}
                  to="/login"
                  className="w-full rounded bg-blue-500 px-4 py-2 text-center text-white"
                >
                  Đăng nhập
                </Link>
              </div>
            )}

            <ul className="my-1 divide-y divide-slate-200 sm:my-4">
              {menuItems.map((item, index) => (
                <li className="py-4" key={index}>
                  <Link
                    onClick={() => setIsNavbarVisible(false)}
                    to={item.link}
                    className="ml-4 flex items-center space-x-4"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <div className="ml-4 flex items-center space-x-4">
                  <img
                    src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FCSKH.6a35e2c2.svg&w=1920&q=75"
                    alt=""
                  />
                  <span>Hỗ trợ đặt khám: 02839307575</span>
                </div>
              </li>
              <li className="py-4">
                <div className="ml-4 flex items-center space-x-4">
                  <img
                    src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FGmail.0b198fd4.svg&w=1920&q=75"
                    alt=""
                  />
                  <span>Email: cskh@ykhoadiamond.com</span>
                </div>
              </li>
            </ul>
            <div className="m-4 mt-0 flex items-center justify-between space-x-3">
              <Link
                onClick={() => setIsNavbarVisible(false)}
                to="/none"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-400 bg-white py-2 text-[14px] font-semibold hover:border-primary-500 hover:bg-primary-500 hover:text-white"
              >
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFacebook.5a7382d8.svg&w=1920&q=75"
                  alt=""
                  className="w-[25px]"
                />
                Facebook
              </Link>
              <Link
                onClick={() => setIsNavbarVisible(false)}
                to="/none"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-400 bg-white py-2 text-[14px] font-semibold hover:border-primary-500 hover:bg-primary-500 hover:text-white"
              >
                <img
                  src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FZalo.6941174c.svg&w=1920&q=75"
                  alt=""
                  className="w-[25px]"
                />
                Zalo
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
