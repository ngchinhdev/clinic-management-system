import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";

export default function NewsProduct({
  _id,
  title,
  author,
  viewCount,
  createdAt,
  image,
  shortDescription,
}) {
  return (
    <div className="h-full overflow-hidden rounded-xl bg-white shadow-sm">
      <Link
        to={`/news-detail/${_id}`}
        className="block gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid"
      >
        <div className="h-[250px] w-full rounded-lg">
          <img
            src={image}
            alt=""
            className="block h-full w-full rounded-lg object-cover"
          />
        </div>
        <div className="p-5">
          <div className="mb-[6px] flex gap-2 text-[12px]">
            <div className="font-bold text-primary-700">Tin Tức</div>
            <div className="font-semibold">
              {new Date(createdAt).toLocaleDateString()}
            </div>
            <div>|</div>
            <div className="font-semibold">{author}</div>
          </div>
          <h2 className="my-2 text-[14px] font-bold sm:text-[18px]">{title}</h2>
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] sm:text-[14px]">
            {shortDescription}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
            <FaRegEye />
            <div>{viewCount}</div>
          </div>
        </div>
      </Link>
    </div>
  );
}

NewsProduct.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  viewCount: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
};
