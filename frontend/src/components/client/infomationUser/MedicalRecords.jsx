import { useLocation, useNavigate } from "react-router-dom";
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

const MedicalRecords = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const handleViewDetail = (id) => {
    navigate(`detail/${id}`);
  };
  const handlePageChange = (page) => {
    navigate(`/user-profile/medical-records?page=${page}`);
  };

  let count = 1;
  const records = [
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },

    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
    {
      id: count++,
      date: "13:00 02/07/2024",
      status: "Tái khám",
      payment: "Bảo hiểm",
      doctor: "Võ Thanh Phương",
      service: "Tiền sử sau khi sinh",
    },
  ];

  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-xl font-bold">Hồ sơ bệnh án</h2>
      <Table>
        <TableHeader className="!rounded-2xl bg-bg-gray">
          <TableRow>
            <TableHead className="text-black">ID</TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Ngày giờ khám
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Tình trạng
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Thanh toán
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Bác sĩ phụ trách
            </TableHead>
            <TableHead className="whitespace-nowrap font-bold text-black">
              Dịch vụ/ Gói khám
            </TableHead>
            <TableHead className="whitespace-normal font-bold text-black">
              Chi tiết bệnh án
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">{record.id}</TableCell>
              <TableCell className="whitespace-nowrap">{record.date}</TableCell>
              <TableCell className="whitespace-nowrap">
                {record.status}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.payment}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.doctor}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {record.service}
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleViewDetail(record.id)}
                  className="bg-primary-500 px-6 text-white"
                >
                  Xem chi tiết
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

export default MedicalRecords;
