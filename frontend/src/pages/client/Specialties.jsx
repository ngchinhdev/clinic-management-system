import { getAllSpecialties } from "@/services/specialtiesApi";
import SpecialtiesBanner from "../../components/client/specialties/SpecialtiesBanner";
import SpecialtiesList from "../../components/client/specialties/SpecialtiesList";
import Safe from "../../components/client/specialties/TrustedSafety";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
const Specialties = () => {
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useScrollToTop();
  const {
    data: specialties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
  });

  if (error) return <NotFound />;

  return (
    <div className="bg-bg-gray">
      <SpecialtiesBanner />
      <SpecialtiesList specialties={specialties} isLoading={isLoading} />
      <Safe />
    </div>
  );
};

export default Specialties;
