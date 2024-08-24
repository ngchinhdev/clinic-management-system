import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { useLocation, useNavigate } from "react-router-dom";

const MedicalRecordDetail = () => {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;


    const navigate = useNavigate();
  const records = Array(9).fill({
    service: "Khám thai ngoài giờ",
    diagnosis: "Viêm đường ruột",
    note: "Viêm đường ruột cấp tính (chuyển lên tuyến trên)",
    image: "Xem chi tiết",
  });
  const handlePageChange = (page) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page);
    navigate(`${location.pathname}?${params.toString()}`);
  };
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);
  return (
    <div className="p-6">
      <h2 className="mb-6 text-xl font-bold">Hồ sơ bệnh án chi tiết</h2>
      <Table>
        <TableHeader className="!rounded-2xl bg-bg-gray">
          <TableRow>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Dịch vụ khám
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Chuẩn đoán
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Ghi chú
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Hình ảnh
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">
                {record.service}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.diagnosis}
              </TableCell>
              <TableCell className="whitespace-nowrap">{record.note}</TableCell>
              <TableCell className="whitespace-nowrap">
              <Button
                  variant="primary"
                  size="sm"
                  className="bg-primary-500 px-6 text-white"
                >
                 {record.image}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
    </div>
  );
};

export default MedicalRecordDetail;
