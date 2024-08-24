import BannerDoctor from "../../components/client/doctors/Banner";
import ListDoctors from "../../components/client/doctors/ListDoctors";
import useScrollToTop from "@/hooks/useScrollToTop";
export default function Doctors() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7]">
      <BannerDoctor />
      <ListDoctors />
    </div>
  );
}
