import PropTypes from "prop-types";
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

export default function NewsBelow({ news, isLoading }) {
  return (
    <div className="mx-auto max-w-screen-xl p-4 lg:p-6">
      <h2 className="relative flex text-[24px] font-bold uppercase">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="sm:text-md pl-5 text-[18px]">Tin tức khác</span>
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
            : news.slice(4).map((newsItem, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                >
                  <NewsItem {...newsItem} />
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

NewsBelow.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
};
