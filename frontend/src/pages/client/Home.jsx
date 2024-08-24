import Banner from "../../components/client/home/Banner";
import OutstandingPackage from "../../components/client/home/OutstandingPackages";
import OutstandingService from "../../components/client/home/OutstandingServices";
import Specialty from "../../components/client/home/Specialty";
import Introduce from "../../components/client/home/Introduce";
import News from "../../components/client/home/News";
import Collaborate from "../../components/client/home/Collaborate";
import useScrollToTop from "@/hooks/useScrollToTop";

export default function Home() {
  useScrollToTop();
  return (
    <div className="bg-[#E8F2F7]">
      <Banner />
      <OutstandingPackage />
      <OutstandingService />
      <Specialty />
      <Introduce />
      <News />
      <Collaborate />
    </div>
  );
}
