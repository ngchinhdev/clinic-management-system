import { useQuery } from "@tanstack/react-query";
import ListServiceBanner from "../../components/client/priceListService/ListServiceBanner";
import PriceServiceContainer from "../../components/client/priceListService/PriceServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";

import { getAllSpecialtiesWithServices } from "@/services/specialtiesApi";

const TablePriceService = () => {
  useScrollToTop();

  const {
    data: specialtyWithService,
    error: specialtyError,
    isLoading: specialtyLoading,
  } = useQuery({
    queryKey: ["specialtyWithService"],
    queryFn: getAllSpecialtiesWithServices,
  });

  if (specialtyError) return <NotFound />;

  return (
    <div>
      <ListServiceBanner />
      <PriceServiceContainer
        specialtyWithService={specialtyWithService}
        isLoading={specialtyLoading}
      />
    </div>
  );
};

export default TablePriceService;
