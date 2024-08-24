import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "@/services/doctorsApi";
import { getAllSpecialties } from "@/services/specialtiesApi";
import DoctorItem from "../product/Doctor";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ListDoctors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [specialtyMap, setSpecialtyMap] = useState({});
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentRecords, setCurrentRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;

  const {
    data: doctors,
    error: errorDoctors,
    isLoading: loadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: getAllDoctors,
  });

  const {
    data: specialties,
    error: errorSpecialties,
    isLoading: loadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });

  useEffect(() => {
    if (specialties) {
      const map = {};
      specialties.forEach((specialty) => {
        map[specialty._id] = specialty.name;
      });
      setSpecialtyMap(map);
    }
  }, [specialties]);

  useEffect(() => {
    if (doctors) {
      const filtered = doctors.filter((doctor) => {
        const matchesSpecialty =
          selectedSpecialty === "" || doctor.specialtyID === selectedSpecialty;
        const matchesGender =
          selectedGender === "" || doctor.userID.gender === selectedGender;
        return matchesSpecialty && matchesGender;
      });
      setFilteredDoctors(filtered);
    }
  }, [doctors, selectedSpecialty, selectedGender]);

  useEffect(() => {
    if (filteredDoctors) {
      const recordsPerPage = 4;
      const indexOfLastRecord = currentPage * recordsPerPage;
      const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
      const current = filteredDoctors.slice(
        indexOfFirstRecord,
        indexOfLastRecord,
      );
      setCurrentRecords(current);
      setTotalPages(Math.ceil(filteredDoctors.length / recordsPerPage));
    }
  }, [filteredDoctors, currentPage]);

  if (loadingDoctors || loadingSpecialties) {
    return (
      <div className="mx-auto w-full max-w-screen-xl p-5 md:p-5">
        <div className="flex flex-col items-center justify-between space-y-3 md:flex-row lg:space-y-0">
          <h2 className="text-xl font-semibold">
            <Skeleton className="h-[24px] w-[250px]" />
          </h2>
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="w-[170px] sm:w-[180px]">
              <Skeleton className="h-[36px]" />
            </div>
            <div className="w-[170px] sm:w-[180px]">
              <Skeleton className="h-[36px]" />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white p-6 shadow md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              className="flex flex-col overflow-hidden rounded-lg border"
              key={index}
            >
              <div className="group flex w-full items-center justify-center !bg-white">
                <Skeleton className="ease h-[200px] w-full transform overflow-hidden p-2 transition-transform duration-500 sm:h-[300px] sm:p-4" />
              </div>
              <div className="flex h-full flex-col bg-white px-3 pb-3 pt-3">
                <Skeleton className="h-4 w-[80px] text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]" />
                <Skeleton className="h-6 w-[120px] grow py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl" />
                <hr className="mb-1 md:mb-3" />
                <div className="flex h-4 w-[60px] items-center justify-between text-[10px] font-medium sm:text-[14px]">
                  <Skeleton className="h-4 w-[60px]" />
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-[#918e8e] py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
                  <Skeleton className="h-4 w-[80px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (errorDoctors || errorSpecialties) {
    return <div>Error loading doctors</div>;
  }

  const handleSpecialtyChange = (value) => {
    setSelectedSpecialty(value);
    navigate(`/doctors?page=1`);
  };

  const handleDoctorChange = (value) => {
    setSelectedGender(value);
    navigate(`/doctors?page=1`);
  };

  const handlePageChange = (page) => {
    navigate(`/doctors?page=${page}`);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 md:p-5">
      <div className="mb-7 flex flex-col items-center justify-between space-y-3 md:flex-row lg:space-y-0">
        <h2 className="text-xl font-semibold">Tìm kiếm bác sĩ phù hợp theo:</h2>
        <div className="flex flex-row items-center justify-center gap-3">
          <Select
            value={selectedSpecialty}
            onValueChange={handleSpecialtyChange}
          >
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              {specialties?.map((specialty) => (
                <SelectItem key={specialty._id} value={specialty._id}>
                  {specialty.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedGender} onValueChange={handleDoctorChange}>
            <SelectTrigger className="w-[170px] border border-black focus:ring-0 sm:w-[180px]">
              <SelectValue placeholder="Chọn giới tính" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nam">Nam</SelectItem>
              <SelectItem value="Nữ">Nữ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {currentRecords.length === 0 ? (
        <div className="p-6 text-center">Không có dữ liệu.</div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 rounded-md bg-white p-6 shadow md:grid-cols-3 lg:grid-cols-4">
          {currentRecords.map((doctor) => {
            return (
              <DoctorItem
                key={doctor._id}
                {...doctor}
                specialtyName={specialtyMap[doctor.specialtyID]}
              />
            );
          })}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination className="py-5">
          <PaginationContent className="hover:cursor-pointer">
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
                }
                className={
                  currentPage === 1 ? "opacity-50 hover:cursor-default" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  handlePageChange(
                    currentPage + 1 > totalPages ? totalPages : currentPage + 1,
                  )
                }
                className={
                  currentPage === totalPages
                    ? "opacity-50 hover:cursor-default"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
