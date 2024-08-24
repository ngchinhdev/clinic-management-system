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
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useLocation, useNavigate } from "react-router-dom";
const AppointmentHistory = () => {


  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page")) || 1;
  const handleViewDetail = (id) => {
    navigate(`detail/${id}`);
  };
  const handlePageChange = (page) => {
    navigate(`/user-profile/appointment-history?page=${page}`);
  };
  const records = [
    {
      id: 1,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 2,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 3,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 4,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 5,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 6,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
    {
      id: 7,
      service: "Tầm soát ung thư...",
      appointmentTime: "13:00 02/07/2024",
      status: "Đã khám",
      payment: "Đã thanh toán",
    },
  ];

  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(records.length / recordsPerPage);


  return (
    <div className="p-3 md:p-6">
      <h2 className="mb-6 text-xl font-bold">Dịch vụ đã đặt</h2>
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
        <div className="flex items-center">
          <Select>
            <SelectTrigger className="w-full md:w-[170px]">
              <SelectValue placeholder="Chọn chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-3 md:flex-row">
          <div className="relative items-center justify-center md:flex">
            <span className="mr-2 text-sm md:text-base">Từ ngày</span>
            <Input className="md:w-40" type="date" />
          </div>
          <div className="relative items-center justify-center md:flex">
            <span className="mx-2 text-sm md:text-base">Đến ngày</span>
            <Input className="md:w-40" type="date" />
          </div>
        </div>
      </div>
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              #
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
             Dịch vụ
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
            Thời gian khám
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
            Trạng thái
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Thanh toán
            </TableHead>
            <TableHead className="text-xs font-semibold text-black whitespace-nowrap md:text-sm">
              Thao tác
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs md:text-sm">{record.id}</TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                {record.service}
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                {record.appointmentTime}
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                {record.status}
              </TableCell>
              <TableCell className="text-xs whitespace-nowrap  md:text-sm">
                {record.payment}
              </TableCell>
              <TableCell>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleViewDetail(record.id)}
                  className="bg-primary-500 p-1 text-[9px] text-white md:p-3 md:text-xs"
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

export default AppointmentHistory;
