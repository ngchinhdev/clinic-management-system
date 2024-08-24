import { useEffect, useState } from "react";
import PackageItem from "../product/Package";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
import { Skeleton } from "@/components/ui/Skeleton";

export default function OutstandingPackages() {
  const [OutstandingMedicalPackages, setOutstandingMedicalPackages] = useState(
    [],
  );

  const {
    data: medicalPackages,
    error,
    isLoading: loadingMedicalPackages,
  } = useQuery({
    queryKey: ["medical-packages"],
    queryFn: getAllMedicalPackages,
  });
  

  useEffect(() => {
    if (!loadingMedicalPackages) {
      const sortedMedicalPackages = medicalPackages.data.sort(
        (a, b) => b.orderCount - a.orderCount,
      );
      setOutstandingMedicalPackages(sortedMedicalPackages.slice(0, 8));
    }
  }, [loadingMedicalPackages, medicalPackages]);

  return (
    <div className="mx-auto my-5 max-w-screen-xl md:my-10">
      <div className="w-full text-center text-[23px] font-bold md:text-[35px]">
        Gói khám nổi bật
      </div>
      <span className="mx-auto my-2 block w-full max-w-[90%] text-center text-[14px] text-[#6D7280] md:max-w-[800px] md:text-[16px]">
        Danh sách gói khám nổi bật, được khách hàng yêu thích nhất.
      </span>

      {loadingMedicalPackages ? (
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
                  <Skeleton className="mb-1 h-[12px] w-2/5 rounded-md" />
                  <Skeleton className="h-[20px] w-full grow rounded-md" />
                  <hr className="md:mt-3" />
                  <Skeleton className="my-2 h-[30px] w-full rounded-md" />
                  <hr className="mb-1 md:mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-[3px] text-[8px] opacity-70 md:text-[10px]">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-2 w-2 rounded-full" />
                    </div>
                    <div className="flex items-center gap-1 text-[9px] font-semibold md:gap-2 md:text-[12px]">
                      <Skeleton className="h-3 w-3 rounded-full" />
                      <span className="text-gray-200">0</span>
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
                <PackageItem key={medicalPackage._id} {...medicalPackage} />
              );
            })}
          </div>
          <Link
            to="/packages"
            className="mx-auto my-5 mt-10 flex w-[50%] items-center justify-center gap-2 rounded-md border border-primary-500 py-2 text-[12px] font-semibold uppercase text-primary-500 hover:bg-primary-500 hover:text-white md:w-[40%] md:text-[14px]"
          >
            Xem tất cả <AiOutlineDoubleRight />
          </Link>
        </>
      )}
    </div>
  );
}
