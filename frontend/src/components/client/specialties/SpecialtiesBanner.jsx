import banner from "../../../assets/images/young-asia-female-doctor-white-medical-uniform-using-clipboard-is-delivering-great-news-talk-discuss-results.jpg";

const specialtiesBanner = () => {
  return (
    <>
      <div className="relative h-[40vw] w-full sm:h-[25vw] lg:h-[16vw]">
        <img
          src={banner}
          alt="Doctor delivering great news"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-9 text-center">
  <h1 className="mb-3 text-2xl font-bold text-primary-500 sm:text-3xl">
    Chuyên khoa Diamond
  </h1>
  <h4 className="px-5 text-sm font-medium sm:px-20 sm:text-base">
    Chọn chuyên khoa phù hợp với bạn nhất để được tư vấn và chăm sóc
  </h4>
</div>
        </div>
      </div>
    </>
  );
};

export default specialtiesBanner;
