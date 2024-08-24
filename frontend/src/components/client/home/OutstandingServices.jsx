import { useEffect, useState } from "react";
import ServiceItem from "../product/Service";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "@/services/servicesApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function OutstandingServices() {
  const [OutstandingMedicalPackages, setOutstandingMedicalPackages] = useState(
    [],
  );

  const {
    data: medicalServices,
    error,
    isLoading: loadingMedicalService,
  } = useQuery({
    queryKey: ["medical-services"],
    queryFn: getAllServices,
  });

  useEffect(() => {
    if (!loadingMedicalService) {
      const sortedMedicalPackages = medicalServices.data.sort(
        (a, b) => b.orderCount - a.orderCount,
      );
      setOutstandingMedicalPackages(sortedMedicalPackages.slice(0, 8));
    }
  }, [loadingMedicalService, medicalServices]);
console.log(OutstandingMedicalPackages);

  return (
    <div className="mx-auto my-5 max-w-screen-xl md:my-10">
      <div className="w-full text-center text-[23px] font-bold md:text-[35px]">
        Dịch vụ khám nổi bật
      </div>
      <span className="mx-auto my-2 block w-full max-w-[90%] text-center text-[14px] text-[#6D7280] md:max-w-[800px] md:text-[16px]">
        Danh sách dịch vụ khám nổi bật, được khách hàng yêu thích nhất.
      </span>

      {loadingMedicalService ? (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 px-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-custom"
                key={index}
              >
                <div className="group block h-full w-full overflow-hidden">
                  <div className="h-[210px] w-full">
                    <Skeleton className="block h-full w-full object-cover" />
                  </div>
                </div>
                <div className="flex h-full flex-col p-3 md:p-5">
                  <Skeleton className="mb-2 h-[16px] w-3/4 rounded-md" />
                  <hr className="mb-2" />
                  <div className="flex items-center space-x-2 py-2">
                    <Skeleton className="h-[24px] w-1/4 rounded-md" />
                    <Skeleton className="h-[24px] w-1/4 rounded-md opacity-50" />
                  </div>
                  <hr className="mb-2" />
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-[3px] text-[8px] opacity-35 md:text-[10px]">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-5 w-5 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold md:gap-2 md:text-[12px]">
                      <Skeleton className="h-5 w-5 rounded-full" />
                      <Skeleton className="h-[12px] w-1/5 rounded-md" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-gray-500 py-1 text-[10px] font-semibold hover:cursor-pointer md:py-2 md:text-[13px]">
                    <Skeleton className="h-[18px] w-24 rounded-md" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto my-5 mt-10 flex w-[50%] cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-gray-500 py-2 text-[12px] font-semibold uppercase md:w-[40%] md:text-[14px]">
            <Skeleton className="h-[18px] w-24 rounded-md" />
          </div>
        </>
      ) : error ? (
        <div>Error loading specialties</div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-4 px-5 md:grid-cols-3 lg:grid-cols-4">
            {OutstandingMedicalPackages.map((medicalPackage) => {
              return (
                <ServiceItem key={medicalPackage._id} {...medicalPackage} />
              );
            })}
          </div>
          <Link
            to="/services"
            className="mx-auto my-5 mt-10 flex w-[50%] items-center justify-center gap-2 rounded-md border border-primary-500 py-2 text-[12px] font-semibold uppercase text-primary-500 hover:bg-primary-500 hover:text-white md:w-[40%] md:text-[14px]"
          >
            Xem tất cả <AiOutlineDoubleRight />
          </Link>
        </>
      )}
    </div>
  );
}
