import { useMatch } from "react-router-dom";
import banner from "../../../assets/images/healthcare-workers-preventing-virus-quarantine-campaign-concept-smiling-asian-female-nurse-doctor-wi.jpg";

const ServiceBanner = () => {
  const isPackageRoute = useMatch("/packages/*");
  const isServiceRoute = useMatch("/services/*");

  const title = isPackageRoute
    ? "Gói khám sức khỏe"
    : isServiceRoute
    ? "Dịch vụ khám sức khỏe"
    : "Dịch vụ";
    
  const des = isPackageRoute
  ? " Đăng ký gói khám sức khỏe để nhận ưu đãi hấp dẫn từ chúng tôi"
  : isServiceRoute
  ? "  Đăng ký dịch vụ khám sức khỏe để nhận ưu đãi hấp dẫn từ chúng tôi"
  : "Dịch vụ";


  return (
    <div className="relative h-[50vw] w-full sm:h-[30vw] lg:h-[20vw]">
      <img
        src={banner}
        alt="Doctor delivering great news"
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-[37px] text-center">
          <h1 className="mb-3 text-[30px] font-bold text-primary-500 sm:text-[39px]">
            {title}
          </h1>
          <h4 className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
           {des}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ServiceBanner;