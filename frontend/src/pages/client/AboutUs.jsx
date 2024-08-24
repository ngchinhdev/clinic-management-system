import BannerAboutUs from "../../components/client/aboutUs/Banner";
import UsageSteps from "../../components/client/aboutUs/UsageSteps";
import Mission from "../../components/client/aboutUs/Mission";
import ServicePhilosophy from "../../components/client/aboutUs/ServicePhilosophy";
import ContactForm from "../../components/client/aboutUs/ContactForm";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function AboutUs() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7] pb-10">
      <BannerAboutUs />
      <UsageSteps />
      <Mission />
      <ServicePhilosophy />
      <ContactForm />
    </div>
  );
}
