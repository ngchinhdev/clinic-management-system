import { useEffect, useState } from "react";
import { useMatch, useLocation, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAllServices } from "@/services/servicesApi";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
import { useQuery } from "@tanstack/react-query";
import notFoundImg from "@/assets/images/undraw_Empty_re_opql.png";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import PackageItem from "../product/Package";
import ServiceItem from "../product/Service";
import SidebarFilter from "../categoryService/SidebarFilter";

const ServicesContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const currentLimit = parseInt(queryParams.get("limit")) || 3;

  const [filters, setFilters] = useState({
    page: currentPage,
    limit: currentLimit,
    sort: "",
    specialtyID: [],
    branch: [],
    gender: [],
  });



  const handleFilterApply = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: +filters.page, limit: +filters.limit };
    console.log(8);
    console.log(updatedFilters);
    window.history.replaceState(null, '', location.pathname + '?' + Object.entries(updatedFilters)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&'));
    setFilters(updatedFilters);
  };

  const handlePageChange = (newPage) => {
    const updatedFilters = { ...filters, page: +newPage, limit: +filters.limit };
    window.history.replaceState(null, '', location.pathname + '?' + Object.entries(updatedFilters)
      .filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&');
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&'));
    setFilters(updatedFilters);
    
  };

  const isServiceRoute = useMatch("/services/:specialtyId?");
  const isPackageRoute = useMatch("/packages/:specialtyId?");
  const type = isServiceRoute ? "service" : isPackageRoute ? "package" : null;

  const { data, error, isLoading } = useQuery({
    queryKey: [type, filters],
    queryFn: async () => {
      if (type === "service") {
        return await getAllServices(filters);
      } else if (type === "package") {
        return await getAllMedicalPackages(filters);
      }
    },
    enabled: !!type,
  });

  const totalItems = data?.totalRecords?.[0]?.totalRecords || 0;
  const limit = filters.limit;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-[83rem] px-4 md:px-0">
        <div className="grid grid-cols-12 md:gap-7">
          <div className="col-span-12 mt-7 md:col-span-3">
            <SidebarFilter onFilterApply={ handleFilterApply } parentFilters={ filters } />
          </div>

          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              { isLoading ? (
                <>
                  { Array(12)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={ index } className="h-80 w-full" />
                    )) }
                </>
              ) : error ? (
                <div className="col-span-3 flex flex-col items-center justify-center p-4">
                  <img
                    src={ notFoundImg }
                    alt="Not Found"
                    className="w-full max-w-xs rounded-md md:max-w-md lg:max-w-lg"
                  />
                  <h1 className="mt-4 text-center text-lg font-semibold text-gray-700">
                    { type === "package"
                      ? "Gói khám không tồn tại"
                      : "Dịch vụ không tồn tại" }
                  </h1>
                </div>
              ) : (
                <>
                  { type === "package"
                    ? data.data.map((item) => (
                      <PackageItem key={ item._id } { ...item } />
                    ))
                    : data.data.map((item) => (
                      <ServiceItem key={ item._id } { ...item } />
                    )) }
                </>
              ) }
            </div>
          </div>
        </div>
        <Pagination className="py-5">
          <PaginationContent className="hover:cursor-pointer">
            <PaginationItem>
              <PaginationPrevious
                onClick={ () =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                className={
                  filters.page === 1 ? "opacity-50 hover:cursor-default" : ""
                }
              />
            </PaginationItem>
            { Array.from({ length: totalPages }).map((_, index) => {
              
              return (
                <PaginationItem key={ index }>
                  <PaginationLink
                    onClick={() => handlePageChange(index + 1)}
                    isActive={filters.page === index + 1}
                  >
                    { index + 1 }
                  </PaginationLink>
                </PaginationItem>
              );
            }) }
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={ () =>
                  handlePageChange(
                    currentPage + 1 > totalPages ? totalPages : currentPage + 1,
                  )
                }
                className={
                  filters.page === totalPages
                    ? "opacity-50 hover:cursor-default"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default ServicesContainer;