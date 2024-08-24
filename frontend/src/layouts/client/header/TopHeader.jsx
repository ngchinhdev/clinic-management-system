import { MdAddLocation } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { TiLocationArrowOutline } from "react-icons/ti";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export default function TopHeader() {
  return (
    <div className="hidden bg-primary-500 md:block">
      <div className="mx-auto flex h-8 max-w-screen-xl items-center justify-between px-3 text-white sm:px-5">
        <div className="group relative flex h-full items-center gap-2 bg-orange-500 px-3 text-sm hover:cursor-pointer">
          <MdAddLocation className="text-xl" /> Hệ thống phòng khám
          <FaAngleDown />
          <div className="absolute inset-x-0 top-8 z-10 hidden w-full bg-white text-black shadow-[0_10px_20px_rgba(0,0,0,0.25)] group-hover:block">
            <ul>
              <li>
                <Link
                  to="/none"
                  className="flex w-full items-center gap-2.5 p-2 hover:text-orange-500"
                >
                  <TiLocationArrowOutline /> ĐA KHOA DIAMOND
                </Link>
              </li>
              <li>
                <Link
                  to="/none"
                  className="flex w-full items-center gap-2.5 p-2 hover:text-orange-500"
                >
                  <TiLocationArrowOutline /> ĐA KHOA 179
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between gap-10 text-sm">
          <div className="flex items-center gap-2">
            <MdEmail className="text-xl" />{" "}
            <span className="text-sm font-normal">
              Email: cskh@ykhoadiamond.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone />
            <span className="text-sm font-normal"> Đặt hẹn: 02839307575</span>
          </div>
        </div>
      </div>
    </div>
  );
}
