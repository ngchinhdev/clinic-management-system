export default function ServicePhilosophy() {
  return (
    <div className="mx-auto my-5 mt-5 max-w-screen-xl px-5 md:mt-10 md:px-7">
      <div className="mb-5 flex items-center justify-center">
        <img
          src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fphilohosi.45c09a3b.png&w=64&q=75"
          className="w-14"
        />
      </div>
      <div className="w-full text-center text-[23px] font-bold text-primary-500 md:text-[35px]">
        Triết lý sản phẩm - dịch vụ
      </div>
      <p className="mx-auto max-w-[750px] text-center text-[#646464]">
        Với triết lý lấy người dùng làm trung tâm, giải pháp MedPro được thiết
        kế mang trải nghiệm tốt nhất cho người dùng thông qua việc sử dụng các
        tài nguyên và đặc điểm của nhiều công nghệ số
      </p>

      <div className="max-sm: relative mx-auto my-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:my-0 md:h-[721px] md:w-[380px]">
        <div className="absolute inset-0 hidden items-center justify-center md:flex">
          <img src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FEllipse.4780e071.png&w=640&q=75" />
        </div>
        <div className="absolute inset-0 hidden items-center justify-center md:flex">
          <img src="https://medpro.vn/_next/image?url=https%3A%2F%2Fbo-api.medpro.com.vn%2Fstatic%2Fimages%2Fmedpro%2Fweb%2Fbg_phone.svg&w=384&q=75" />
        </div>
        <div className="-left-56 top-28 flex gap-3 rounded-2xl bg-white p-3 md:absolute">
          <p className="h-[35px] w-[35px] rounded-full bg-[#ffb54a] text-center text-[22px] font-bold text-white">
            1
          </p>
          <div>
            <h3 className="text-[18px] font-semibold">Vì sức khỏe cộng đồng</h3>
            <p className="max-w-[250px] text-[15px]">
              Mục đích chăm sóc sức khỏe là mang lại cho mỗi người lối sống lành
              mạnh, sức khỏe tốt
            </p>
          </div>
        </div>
        <div className="-right-56 top-56 flex gap-3 rounded-2xl bg-white p-3 md:absolute">
          <p className="h-[35px] w-[35px] rounded-full bg-[#ffb54a] text-center text-[22px] font-bold text-white">
            2
          </p>
          <div>
            <h3 className="text-[18px] font-semibold">Rộng mở</h3>
            <p className="max-w-[250px] text-[15px]">
              Mọi người đều có quyền bình đẳng về tiếp cận dịch vụ chăm sóc sức
              khoẻ
            </p>
          </div>
        </div>
        <div className="-left-56 bottom-56 flex gap-3 rounded-2xl bg-white p-3 md:absolute">
          <p className="h-[35px] w-[35px] rounded-full bg-[#ffb54a] text-center text-[22px] font-bold text-white">
            3
          </p>
          <div>
            <h3 className="text-[18px] font-semibold">Thực tiễn</h3>
            <p className="max-w-[250px] text-[15px]">
              Người dùng được tiếp cận với các dịch vụ chăm sóc sức khoẻ phù hợp
            </p>
          </div>
        </div>
        <div className="-right-56 bottom-28 flex gap-3 rounded-2xl bg-white p-3 md:absolute">
          <p className="h-[35px] w-[35px] rounded-full bg-[#ffb54a] text-center text-[22px] font-bold text-white">
            4
          </p>
          <div>
            <h3 className="text-[18px] font-semibold">Hợp tác</h3>
            <p className="max-w-[250px] text-[15px]">
              Trong tiến trình chuyển đổi số hiện nay các CSYT cần hợp tác, mở
              rộng dịch vụ tiện ích phục vụ người dùng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
