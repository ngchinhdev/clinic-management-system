import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton";
import { FaRegEye } from "react-icons/fa";

export default function NewsAbove({ news, isLoading }) {
  return (
    <div className="mx-auto max-w-screen-xl p-3 md:p-5 md:py-10">
      <div className="w-full text-center text-[23px] font-bold uppercase md:text-[35px]">
        Tin tức
      </div>
      <div className="my-3 flex items-center justify-center text-2xl text-[#797676]">
        <img src="https://benhviennamsaigon.com.vn/skins/default/images/line.png" />
      </div>

      {isLoading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-1">
          <div className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid">
            <Skeleton className="h-[200px] w-full md:h-[300px]" />
            <div className="p-5">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <div>|</div>
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
              <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
            <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <div>|</div>
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
              <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
            <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <div>|</div>
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
              <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
            <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <Skeleton className="h-full w-full" />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <div>|</div>
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
              <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-1">
          <Link
            to={`/news-detail/${news[0]._id}`}
            className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid"
          >
            <img src={news[0].image} alt="" />
            <div className="p-5">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <div className="font-bold text-primary-700">Tin Tức</div>
                <div className="font-semibold">
                  {new Date(news[0].createdAt).toLocaleDateString()}
                </div>
                <div>|</div>
                <div className="font-semibold">{news[0].author}</div>
              </div>
              <h2 className="my-2 text-[14px] font-bold sm:text-[18px]">
                {news[0].title}
              </h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] sm:text-[14px]">
                {news[0].shortDescription}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news[0].viewCount}</div>
              </div>
            </div>
          </Link>
          <Link
            to={`/news-detail/${news[1]._id}`}
            className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
          >
            <div className="h-full w-full sm:min-w-[155px] sm:max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <img className="h-full w-full object-cover" src={news[1].image} />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <div className="font-bold text-primary-700">Tin Tức</div>
                <div className="font-semibold">
                  {new Date(news[1].createdAt).toLocaleDateString()}
                </div>
                <div>|</div>
                <div className="font-semibold">{news[1].author}</div>
              </div>
              <h2 className="my-2 text-[14px] font-bold">{news[1].title}</h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                {news[1].shortDescription}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news[1].viewCount}</div>
              </div>
            </div>
          </Link>
          <Link
            to={`/news-detail/${news[2]._id}`}
            className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
          >
            <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <img className="h-full w-full object-cover" src={news[2].image} />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <div className="font-bold text-primary-700">Tin Tức</div>
                <div className="font-semibold">
                  {new Date(news[2].createdAt).toLocaleDateString()}
                </div>
                <div>|</div>
                <div className="font-semibold">Admin</div>
              </div>
              <h2 className="my-2 text-[14px] font-bold">{news[2].title}</h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                {news[2].shortDescription}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news[2].viewCount}</div>
              </div>
            </div>
          </Link>
          <Link
            to={`/news-detail/${news[3]._id}`}
            className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row"
          >
            <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
              <img
                className="h-full w-full object-cover"
                src="https://img.ykhoadiamond.com/uploads/avatar/12072024/b7e64860-6ce1-4909-bcb2-b564f4a15845_M.jpg"
              />
            </div>
            <div className="p-3">
              <div className="mb-[6px] flex gap-2 text-[12px]">
                <div className="font-bold text-primary-700">Tin Tức</div>
                <div className="font-semibold">
                  {new Date().toLocaleDateString()}
                </div>
                <div>|</div>
                <div className="font-semibold">{news[3].author}</div>
              </div>
              <h2 className="my-2 text-[14px] font-bold">{news[3].title}</h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                {news[3].shortDescription}
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news[3].viewCount}</div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

NewsAbove.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
};
