export default function Mission() {
  return (
    <div className="mx-auto my-5 mt-5 max-w-screen-xl md:px-7 px-5 md:mt-10">
      <div className="relative grid grid-cols-1 gap-5 rounded-2xl bg-white px-3 pb-10 pt-24 md:grid-cols-2 md:py-14 md:pt-14 lg:gap-0">
        <div className="absolute inset-x-0 flex justify-center">
          <img
            src="https://medpro.vn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFrame%201000002170.8488ec4f.png&w=1920&q=75"
            className="block w-9 object-cover"
          />
        </div>
        <div className="flex flex-col border-2 border-dotted border-b-black pb-5 md:border-0 md:pb-0 lg:px-14">
          <h2 className="mb-4 text-center text-3xl font-bold text-primary-300">
            Tầm nhìn
          </h2>
          <p className="text-center text-[#646464]">
            Diamond trở thành website cung cấp giải pháp công nghệ hàng đầu tại
            Việt Nam giúp kết nối các dịch vụ y tế đến rộng rãi người dân, mang
            lại hiệu quả đột phá cho đơn vị y tế, cũng như những trải nghiệm
            tiện nghi, hài lòng cho bệnh nhân trong khám chữa bệnh và chăm sóc
            sức khỏe cá nhân.
          </p>
        </div>
        <div className="flex flex-col lg:px-14">
          <h2 className="mb-4 text-center text-3xl font-bold text-primary-300">
            Sứ mệnh
          </h2>
          <p className="text-center text-[#646464]">
            Diamond cung cấp nền tảng tiếp cận y tế thông minh mang đến cho
            người dùng những phương thức chăm sóc sức khỏe mới, ở bất cứ không
            gian - thời gian nào thông qua nền tảng trực tuyến tương tác cao,
            kết nối các cơ sở y tế hàng đầu cùng đội ngũ chuyên gia y tế tận
            tình, giàu kinh nghiệm.
          </p>
        </div>
      </div>
    </div>
  );
}
