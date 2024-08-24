export default function BannerAboutUs() {
  return (
    <div className="relative w-full text-primary-500 md:h-[30vw]">
      <img
        src="https://cdn-pkh.longvan.net/prod-partner/39e48679-daa4-427a-b56f-69c4c0dd6a30-banner_contact.webp"
        alt="Banner"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <div className="mr-14 hidden w-[200px] lg:block">
          <img
            src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fbg_phone.svg&w=256&q=75"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-col border-l-2 px-5 lg:border-black">
          <p className="text-center text-[21px] font-normal sm:text-[31px] lg:text-left">
            Chào mừng bạn đến với
          </p>
          <h1 className="text-[23px] font-bold uppercase sm:text-[39px]">
            Hệ thống y khoa diamond
          </h1>
        </div>
      </div>
    </div>
  );
}
