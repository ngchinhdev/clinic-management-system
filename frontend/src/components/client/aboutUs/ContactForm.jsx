import { Link } from "react-router-dom";

export default function ContactForm() {
  return (
    <div className="mx-auto mt-5 max-w-screen-xl px-5 md:mt-10 md:px-7">
      <div className="relative h-[400px] overflow-hidden rounded-2xl border-2 border-white lg:h-[250px]">
        <img
          src="https://cdn-pkh.longvan.net/prod-partner/0f04db66-ff2a-49b5-9f63-e18f4c7ef354-bg-contact-desktop.webp"
          className="block h-full w-full object-cover"
        />
        <div className="absolute inset-0 h-full w-full bg-[#006aa75b]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 sm:px-10 lg:flex-row lg:justify-between lg:gap-0">
          <div className="hidden lg:block"></div>
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-white">
              <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmobile.650ea615.svg&w=1920&q=75" />
            </div>
            <div className="flex flex-col items-center text-white">
              <p className="text-[20px] uppercase sm:text-[30px]">
                Các hình thức hỗ trợ
              </p>
              <span className="text-[30px] font-bold sm:text-[49px]">
                1900-2115
              </span>
            </div>
          </div>
          <div className="flex gap-5">
            <Link
              to="/none"
              className="flex w-[150px] items-center justify-center gap-3 rounded-xl bg-white py-2 text-[14px] font-semibold"
            >
              <img
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FIconFb.ee1019d5.svg&w=640&q=75"
                alt=""
              />
              Facebook
            </Link>
            <Link
              to="/none"
              className="flex w-[150px] items-center justify-center gap-3 rounded-xl bg-white py-2 text-[14px] font-semibold"
            >
              <img
                src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FIconZalo.c6909113.svg&w=640&q=75"
                alt=""
              />
              Zalo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
