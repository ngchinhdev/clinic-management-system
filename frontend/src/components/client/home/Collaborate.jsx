import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Collaborate() {
  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-5 py-5 md:mt-10">
      <div className="mb-4 w-full text-center text-[23px] font-bold md:text-[35px]">
        Đối tác y khoa Diamond
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 1500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 12 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <img
                src="https://img.ykhoadiamond.com/uploads/banner/27032023/c724a189-0b42-4183-9911-422ec76267f7.jpg"
                className="rounded-sm border border-gray-300"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
