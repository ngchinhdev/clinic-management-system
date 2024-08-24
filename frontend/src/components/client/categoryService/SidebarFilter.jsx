import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import { getAllSpecialties } from "@/services/specialtiesApi";
import { useQuery } from "@tanstack/react-query";

import PropTypes from "prop-types";
import { getAllBranches } from "@/services/branchesApi";
import { useLocation, useSearchParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";

const SidebarFilter = ({ onFilterApply, parentFilters }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    sort: "",
    specialtyID: [],
    branch: [],
    gender: [],
  });

  const handleResetFilters = () => {
    const resetFilters = {
      sort: "",
      specialtyID: [],
      branch: [],
      gender: [],
    };
    setFilters(resetFilters);
    setSearchParams({});
    onFilterApply(resetFilters);
  };

  useEffect(() => {
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 3;
    const specialties = searchParams.getAll("specialtyID");
    const branches = searchParams.getAll("branch");
    const gender = searchParams.getAll("gender").map(decodeURIComponent);
    const sort = searchParams.get("sort") || "";

    const newFilters = {
      page,
      limit,
      sort,
      specialtyID: specialties[0] || !specialties.length ? specialties : [],
      branch: branches[0] || !branches.length ? branches : [],
      gender: gender[0] || !gender.length ? gender : [],
    };

    console.log('new', newFilters);

    if (specialties.length > 0 && specialties[0]) {
      const updatedFilters = {
        ...newFilters,
        specialtyID: [...new Set(specialties)],
      };

      setFilters(updatedFilters);
      onFilterApply(updatedFilters);
    } else {
      console.log(newFilters);
      setFilters(newFilters);
      onFilterApply(newFilters);
    }
  }, [location.search, searchParams]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleBranchChange = (branch) => {
    setFilters((prev) => {
      const newBranches = prev.branch.includes(branch)
        ? prev.branch.filter((b) => b !== branch)
        : [...prev.branch, branch];
      return { ...prev, branch: newBranches };
    });
  };

  const handleSortChange = (sort) => {
    setFilters((prev) => {
      const newSort = prev.sort === sort ? "" : sort;
      return { ...prev, sort: newSort };
    });
  };

  const handleGenderChange = (gender) => {
    setFilters((prev) => {
      const newGender = prev.gender.includes(gender)
        ? prev.gender.filter((g) => g !== gender)
        : [...prev.gender, gender];
      return { ...prev, gender: newGender };
    });
  };

  const handleSpecialtyChange = (specialty) => {
    setFilters((prev) => {
      const newSpecialties = prev.specialtyID.includes(specialty)
        ? prev.specialtyID.filter((s) => s !== specialty)
        : [...prev.specialtyID, specialty];
      return { ...prev, specialtyID: newSpecialties };
    });
  };

  const handleFilterApply = () => {
    console.log(filters);
    const appliedFilters = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (
          (Array.isArray(value) && value.length > 0) ||
          (!Array.isArray(value) && value)
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          updatedParams.delete(key);
          if (value.length > 0) {
            value.forEach((v) => updatedParams.append(key, v));
          }
        } else {
          if (value) {
            updatedParams.set(key, value);
          } else {
            updatedParams.delete(key);
          }
        }
      });
      return updatedParams;
    });
    onFilterApply(appliedFilters);


    console.log(appliedFilters);
  };

  const {
    data: specialties,
    error: specialtiesError,
    isLoading: specialtiesLoading,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: () => getAllSpecialties(),
  });

  const {
    data: branches,
    error: branchesError,
    isLoading: branchesLoading,
  } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getAllBranches(),
  });
  if (specialtiesLoading || branchesLoading)
    return (
      <div className="col-span-12 w-full max-md:mx-auto max-md:max-w-md md:col-span-3 ">
        <div className="box w-full rounded-xl border border-gray-300 bg-white p-6">
          <div className="mb-7 flex w-full items-center justify-between border-b border-gray-200 pb-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>

          <div className="mb-3 gap-2 border-b pb-1">
            <Skeleton className="mb-5 h-5 w-32" />
            <div className="box mb-3 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          <div className="mb-3 w-full border-b pb-2">
            <div className="grid grid-cols-1 gap-5 sm:gap-9">
              <div className="accordion">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-4" />
                </div>
                <div
                  className={ ` ${isOpen ? "max-h-screen" : "max-h-0"} w-full overflow-hidden px-0 pr-4 transition-[max-height] duration-500 ease-in-out` }
                >
                  <div className="box mt-5 flex flex-col gap-2">
                    { Array.from({ length: 5 }).map((_, index) => (
                      <div key={ index } className="flex items-center space-x-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    )) }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 border-b pb-1">
            <Skeleton className="mb-5 h-5 w-24" />
            <div className="box mb-3 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>

          <div className="mb-3 border-b pb-1">
            <Skeleton className="mb-5 h-5 w-20" />
            <div className="box mb-3 flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>

          <Skeleton className="h-10 w-full rounded-full" />
        </div>
      </div>
    );

  if (specialtiesError || branchesError) return <div>Error loading data</div>;
  return (
    <div className="col-span-12 w-full max-md:mx-auto max-md:max-w-md md:col-span-3 ">
      <div className="box w-full rounded-xl border border-gray-300 bg-white p-6">
        <div className="mb-7 flex w-full items-center justify-between border-b border-gray-200 pb-3">
          <p className="text-base font-medium leading-7 text-black">Lọc</p>
          <p
            onClick={ handleResetFilters }
            className="cursor-pointer text-sm font-medium text-gray-500 transition-all duration-500 hover:text-primary-600"
          >
            Làm mới
          </p>
        </div>
        <div className="mb-3 gap-2 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Lọc theo giá
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-lowest"
                checked={ filters.sort === "discountPrice" }
                onCheckedChange={ () => handleSortChange("discountPrice") }
              />
              <label
                htmlFor="checkbox-lowest"
                className="text-sm font-normal text-gray-600"
              >
                Thấp nhất
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-highest"
                checked={ filters.sort === "-discountPrice" }
                onCheckedChange={ () => handleSortChange("-discountPrice") }
              />
              <label
                htmlFor="checkbox-highest"
                className="text-sm font-normal text-gray-600"
              >
                Cao nhất
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 w-full border-b pb-2">
          <div className="grid grid-cols-1 gap-5 sm:gap-9">
            <div className="accordion">
              <button
                className="inline-flex w-full items-center justify-between leading-8 text-gray-600 transition duration-500 hover:text-primary-600 active:text-primary-600"
                onClick={ toggleAccordion }
              >
                <h5 className="text-base font-medium text-gray-900">
                  Chuyên khoa
                </h5>
                <svg
                  className={ `text-gray-900 transition duration-500 group-hover:text-primary-600 ${isOpen ? "rotate-180" : ""}` }
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                className={ ` ${isOpen ? "max-h-screen" : "max-h-0"} w-full overflow-hidden px-0 pr-4 transition-[max-height] duration-500 ease-in-out` }
              >
                <div className="box mt-5 flex flex-col gap-2">
                  { specialties.map((specialty) => (
                    <div
                      key={ specialty._id }
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={ filters.specialtyID.includes(specialty._id) }
                        onCheckedChange={ () =>
                          handleSpecialtyChange(specialty._id)
                        }
                        id={ `checkbox-${specialty._id}` }
                      />
                      <label
                        htmlFor={ `checkbox-${specialty._id}` }
                        className="text-sm font-normal text-gray-600"
                      >
                        { specialty.name }
                      </label>
                    </div>
                  )) }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Chi nhánh
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            { branches.map((branch) => (
              <div key={ branch._id } className="flex items-center space-x-2">
                <Checkbox
                  id={ `checkbox-${branch._id}` }
                  checked={ filters.branch.includes(branch._id) }
                  onCheckedChange={ () => handleBranchChange(branch._id) }
                />
                <label
                  htmlFor={ `checkbox-${branch._id}` }
                  className="text-sm font-normal leading-4 text-gray-600"
                >
                  { branch.name }
                </label>
              </div>
            )) }
          </div>
        </div>
        <div className="mb-3 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Giới tính
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-male"
                checked={ filters.gender.includes("Nam") }
                onCheckedChange={ () => handleGenderChange("Nam") }
              />
              <label
                htmlFor="checkbox-male"
                className="text-sm font-normal text-gray-600"
              >
                Nam
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="checkbox-female"
                checked={ filters.gender.includes("Nữ") }
                onCheckedChange={ () => handleGenderChange("Nữ") }
              />
              <label
                htmlFor="checkbox-female"
                className="text-sm font-normal text-gray-600"
              >
                Nữ
              </label>
            </div>
          </div>
        </div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-primary-700 hover:shadow-sm"
          onClick={ handleFilterApply }
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Lọc
        </button>
      </div>
    </div>
  );
};

SidebarFilter.propTypes = {
  onFilterApply: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func,
};

export default SidebarFilter;
