import { Table, TableBody, TableCell, TableRow } from "@/components/ui/Table";

const AppointmentDetail = ({props}) => {
  const appointmentData = {
    serviceName: "Dịch vụ Tầm soát ung thư phổi",
    doctor: "Ths.Bs Trần Thị Hồng Lê",
    specialty: "Phổi - Hô hấp",
    clinic: "Phòng khám 234",
    hospital: "Bệnh viện 175, Gò Vấp, Hồ Chí Minh",
    date: "13:00 02/07/2024",
    type: "Tái khám",
    status: "Đã khám",
    payment: "Chuyển khoản ngân hàng",
    result: "Ung thư giai đoạn giữa",
  };

  return (
    <div className="p-3 md:p-6">
      <h2 className="mb-6 text-xl font-bold">{appointmentData.serviceName}</h2>
      <Table className="rounded-md border">
        <TableBody>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Người khám
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.doctor}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Chuyên khoa
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.specialty}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Phòng khám
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.clinic}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Bệnh viện
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.hospital}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Ngày giờ khám
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.date}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Loại khám
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Trạng thái
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.status}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Phương thức thanh toán
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.payment}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/5 whitespace-nowrap border-r">
              Kết quả khám
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {appointmentData.result}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentDetail;
