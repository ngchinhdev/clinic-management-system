import BannerContact from "../../components/client/contact/Banner";
import ContactForm from "../../components/client/contact/ContactForm";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Contact() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7]">
      <BannerContact />
      <ContactForm />
    </div>
  );
}
