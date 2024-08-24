import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import NewsItem from "../product/News";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ContentNews({
  news,
  allNews,
  isLoading,
  isLoadingAllNews,
}) {
  const [newsBySpecialty, setNewsBySpecialty] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    if (!isLoadingAllNews && news?._id && news?.specialtyID) {
      setNewsBySpecialty(
        allNews.filter(
          (item) =>
            item.specialtyID === news.specialtyID && item._id !== news._id,
        ),
      );
      setLatestNews(allNews.reverse().filter((item) => item._id !== news._id));
    }
  }, [allNews, isLoadingAllNews, news?._id, news?.specialtyID]);

  return (
    <div className="mx-auto max-w-screen-xl p-4 md:p-5">
      <div className="flex gap-10">
        {isLoading || isLoadingAllNews ? (
          <div className="mx-auto min-w-[800px]">
            <div className="text-center">
              <Skeleton className="mx-auto my-4 h-[40px] w-[300px] md:w-[500px]" />
            </div>
            <div className="my-5 mb-[6px] flex items-center justify-center gap-2 text-[14px]">
              <Skeleton className="h-4 w-24" />
              <div className="font-semibold">
                <Skeleton className="h-4 w-32" />
              </div>
              <div>|</div>
              <div className="font-semibold">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="w-full">
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <div className="h-[200px] w-full rounded-md bg-gray-200"></div>
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <div className="h-[200px] w-full rounded-md bg-gray-200"></div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-center text-[30px] font-semibold md:text-[40px]">
              {news.title}
            </h2>
            <div className="my-5 mb-[6px] flex items-center justify-center gap-2 text-[14px]">
              <div className="font-bold text-primary-700">Tin Tức</div>
              <div className="font-semibold">
                {new Date(news.createdAt).toLocaleDateString()}
              </div>
              <div>|</div>
              <div className="font-semibold">{news.author}</div>
              <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news.viewCount}</div>
              </div>
            </div>

            <div
              className="content-news w-full"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
          </div>
        )}

        <div className="mt-10 hidden h-fit flex-col items-center gap-3 lg:flex sticky top-28">
          <h2 className="w-fit border-b border-b-black p-2 text-center text-xl font-bold">
            Tin tức mới
          </h2>

          {isLoading || isLoadingAllNews
            ? Array.from({ length: 3 }).map((_, index) => (
                <div className="flex" key={index}>
                  <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-lg sm:h-[150px] sm:flex-row">
                    <div className="h-full min-w-[145px] max-w-[145px] bg-gray-200">
                      <Skeleton className="h-full w-full" />
                    </div>
                    <div className="p-3">
                      <div className="mb-[6px] flex gap-2 text-[12px]">
                        <Skeleton className="h-4 w-12" />
                        <div className="font-semibold">
                          <Skeleton className="h-4 w-14" />
                        </div>
                        <div>|</div>
                        <div className="font-semibold">
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <h2 className="my-1 text-[14px] font-bold">
                        <Skeleton className="h-6 w-48" />
                      </h2>
                      <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="my-2 h-4 w-full" />
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                        <Skeleton className="h-4 w-6" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : latestNews.slice(0, 3).map((news, index) => (
                <div className="flex" key={index}>
                  <Link
                    to={`/news-detail/${news._id}`}
                    className="flex flex-col overflow-hidden rounded-md bg-white shadow-lg sm:h-[150px] sm:flex-row"
                  >
                    <div className="h-full min-w-[145px] max-w-[145px]">
                      <img
                        className="h-full w-full object-cover"
                        src={news.image}
                      />
                    </div>
                    <div className="p-3">
                      <div className="mb-[6px] flex gap-2 text-[12px]">
                        <div className="font-bold text-primary-700">
                          Tin Tức
                        </div>
                        <div className="font-semibold">
                          {new Date(news.createdAt).toLocaleDateString()}
                        </div>
                        <div>|</div>
                        <div className="font-semibold">
                          {news.author || "Admin"}
                        </div>
                      </div>
                      <h2 className="my-1 text-[14px] font-bold">
                        {news.title}
                      </h2>
                      <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                        {news.shortDescription}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                        <FaRegEye />
                        <div>{news.viewCount}</div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
      <div className="my-10">
        <h2 className="relative flex text-[24px] font-bold uppercase">
          <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
          <span className="sm:text-md pl-5 text-[18px] uppercase">
            Tin tức liên quan
          </span>
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="my-4 w-full"
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
        >
          <CarouselContent>
            {isLoading
              ? [...Array(3)].map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="h-full overflow-hidden rounded-xl bg-white shadow-sm">
                      <div className="block gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid">
                        <div className="h-[250px] w-full">
                          <Skeleton className="block h-full w-full object-cover" />
                        </div>
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
                    </div>
                  </CarouselItem>
                ))
              : newsBySpecialty.map((items, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <NewsItem {...items} />
                  </CarouselItem>
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

ContentNews.propTypes = {
  news: PropTypes.object,
  isLoading: PropTypes.bool,
  allNews: PropTypes.array,
  isLoadingAllNews: PropTypes.bool,
};
