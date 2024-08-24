export default function UsageSteps() {
  return (
    <div className="mx-auto my-5 mt-5 max-w-screen-xl px-5 md:mt-10 md:px-7">
      <div className="grid grid-cols-1 items-center lg:grid-cols-70-30">
        <div className="md:pr-[30px]">
          <h2 className="text-center text-[25px] font-bold text-primary-500 sm:text-[39px] md:text-left">
            Giới thiệu về Diamond
          </h2>
          <p className="my-4 text-center text-[15px] text-[#646464] sm:mb-10 sm:text-left">
            Ứng dụng này giúp người bệnh và thân nhân người bệnh có thể thực
            hiện trực tuyến quá trình đăng ký khám bệnh tại bệnh viện ở mọi lúc
            mọi nơi mà không cần phải đến trực tiếp bệnh viện.
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 px-5">
              <p className="text-[60px] font-bold text-[#ffb54a]">1</p>
              <h3 className="flex flex-col text-xl">
                <strong className="text-primary-300">
                  Đăng ký và chọn ngày,
                </strong>
                <span className="font-semibold">giờ khám bệnh</span>
              </h3>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 px-5">
              <p className="text-[60px] font-bold text-[#ffb54a]">2</p>
              <h3 className="flex flex-col text-xl">
                <strong className="text-primary-300">Thanh toán chi phí</strong>
                <span className="font-semibold">không dùng tiền mặt</span>
              </h3>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 px-5">
              <p className="text-[60px] font-bold text-[#ffb54a]">3</p>
              <h3 className="flex flex-col text-xl">
                <strong className="text-primary-300">Quản lý cuộc hẹn</strong>
                <span className="font-semibold">khám bệnh và tái khám</span>
              </h3>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white p-3 px-5">
              <p className="text-[60px] font-bold text-[#ffb54a]">4</p>
              <h3 className="flex flex-col text-xl">
                <strong className="text-primary-300">Quản lý thông tin,</strong>
                <span className="font-semibold">dữ liệu của người bệnh</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FGroup%2056260.d46edcda.png&w=1920&q=75" />
        </div>
      </div>
    </div>
  );
}
