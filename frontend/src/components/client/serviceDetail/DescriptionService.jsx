import { Skeleton } from "@/components/ui/Skeleton";
import PropTypes from "prop-types";

const DescriptionService = ({ medicalPackage, isLoading, service }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl">
        <div className="mx-auto max-w-7xl py-0 md:py-4">
          <div className="container rounded-md border bg-white p-5">
            <Skeleton className="mb-4 h-8 w-3/4" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
          </div>
        </div>
      </div>
    );
  }
  const { details, name } = service || medicalPackage || {};

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="mx-auto max-w-7xl py-0 md:py-4">
        <div className="container rounded-md border bg-white p-5">
          <h2 className="mb-4 text-2xl font-bold">CHI TIẾT VỀ {name} </h2>
          <div
            dangerouslySetInnerHTML={{ __html: details }}
            className="render-details"
          />
        </div>
      </div>
    </div>
  );
};

DescriptionService.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.object,
  service: PropTypes.object,
};

export default DescriptionService;
