import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function PackageItem({
  image,
  services,
  name,
  orderCount,
  _id,
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-custom">
      <Link
        to={`/detail-package/${_id}`}
        className="group block min-h-[125px] w-full overflow-hidden sm:min-h-[210px]"
      >
        <img
          src={image}
          alt={name}
          className="ease h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-[1.15]"
        />
      </Link>

      <div className="flex h-full flex-col p-3 md:p-5">
        <Link
          to={`/detail-package/${_id}`}
          className="mb-1 text-[9px] font-bold uppercase text-[#7a7a7a] md:text-[11px]"
        >
          {services.length > 1
            ? services[0].levelName + " / " + services[1].levelName
            : services[0].levelName}
        </Link>
        <Link
          to={`/detail-package/${_id}`}
          className="grow py-1 text-xs font-bold md:text-xl"
        >
          {name}
        </Link>
        <hr className="mb-1" />
        <div className="flex items-center space-x-2 py-1">
          <span className="text-xs font-semibold text-primary-500 sm:text-lg">
            {services[0].discountPrice.toLocaleString()} ₫
          </span>
          <span className="text-[10px] text-gray-400 line-through sm:text-sm">
            {services[0].price.toLocaleString()} ₫
          </span>
        </div>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between">
          <div className="flex gap-[3px] text-[8px] opacity-35 md:text-[10px]">
            <FaHeart />
            <FaHeart />
            <FaHeart />
            <FaHeart />
            <FaHeart />
          </div>
          <div className="flex items-center gap-1 text-[9px] font-semibold md:gap-2 md:text-[12px]">
            <SiTicktick /> {orderCount}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}

PackageItem.propTypes = {
  image: PropTypes.string.isRequired,
  services: PropTypes.arrayOf(
    PropTypes.shape({
      levelName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPrice: PropTypes.number.isRequired,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  orderCount: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};
