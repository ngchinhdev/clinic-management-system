import SupportService from "@/components/client/categoryService/SupportService";
import ServiceBanner from "../../components/client/categoryService/ServiceBanner";
import useScrollToTop from "@/hooks/useScrollToTop";
import ServicesContainer from "@/components/client/categoryService/ServicesContainer";

const CategoryService = () => {
  useScrollToTop();

  return (
    <div className="bg-bg-gray">
      <ServiceBanner />
      <SupportService />
      <ServicesContainer />
    </div>
  );
};

export default CategoryService;
