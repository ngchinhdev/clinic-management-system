import banner from "../../../assets/images/homeBanner.webp";
import { CiSearch } from "react-icons/ci";

export default function Banner() {
  return (
    <div className="relative h-[55vw] w-full text-primary-500 md:h-[36vw]">
      <img src={banner} alt="Banner" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
        <div className="mb-2 font-medium text-primary-500 sm:mb-0 md:text-[25px]">
          Nền tảng công nghệ
        </div>
        <div className="flex max-w-[260px] flex-col text-center text-[20px] md:gap-[10px] text-primary-950 md:flex-row md:max-w-full md:text-left sm:text-[25px] md:text-[36px]">
          <p className="font-bold whitespace-nowrap">Kết nối người dân với </p>
          <p className="font-bold whitespace-nowrap"> Cơ sở - Dịch vụ Y tế</p>
        </div>
        <div className="mt-3 flex w-[65%] max-w-[835px] items-center rounded-full bg-white p-2 px-5 sm:mt-6 md:w-[55%]">
          <CiSearch className="text-2xl" />
          <input
            type="text"
            className="w-full bg-transparent p-1 text-[16px] text-black outline-none md:p-3"
            placeholder="Tìm kiếm cơ sở y tế, dịch vụ y tế..."
          />
        </div>
        <div className="my-5 hidden font-medium text-primary-900 md:block md:text-[20px]">
          Đặt khám nhanh - Tiện ích toàn diện - Nhanh chóng dễ dàng
        </div>
      </div>
    </div>
  );
}
