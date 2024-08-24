import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function ServiceItem({
  image,
  name,
  price,
  discountPrice,
  orderCount,
  _id,
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-custom">
      <Link
        to={`/detail-service/${_id}`}
        className="group block min-h-[125px] w-full overflow-hidden sm:min-h-[210px]"
      >
        <img
          src={image}
          alt={name}
          className="ease h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-[1.15]"
        />
      </Link>
      <div className="flex h-full flex-col p-3 md:p-5 md:pt-2">
        <Link
          to={`/detail-service/${_id}`}
          className="grow py-2 text-sm font-bold md:text-xl"
        >
          {name}
        </Link>
        <hr className="mb-1" />
        <div className="flex items-center space-x-2 py-1">
          <span className="text-xs font-semibold text-primary-500 sm:text-lg">
            {price.toLocaleString()} ₫
          </span>
          <span className="text-[10px] text-gray-400 line-through sm:text-sm">
            {discountPrice.toLocaleString()}₫
          </span>
        </div>

        <hr className="mb-1" />
        <div className="flex items-center justify-between sm:mt-2">
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

ServiceItem.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  discountPrice: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  orderCount: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
};
