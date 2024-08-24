import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { Skeleton } from "@/components/ui/Skeleton";
import PropTypes from "prop-types";
import { Checkbox } from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";

const MedicalPackageService = ({ medicalPackage, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl pb-10">
        <div className="mx-auto max-w-7xl">
          <Skeleton className="mb-4 h-8 w-3/4" />
          {Array(7)
            .fill()
            .map((_, index) => (
              <Skeleton key={index} className="mb-4 h-6 w-full" />
            ))}
        </div>
      </div>
    );
  }

  const { allServices, services, name } = medicalPackage;
  const levelNames = services.map((service) => service.levelName).reverse();
  const servicesByLevel = services.reduce((acc, service) => {
    acc[service.levelName] = service.servicesID || [];
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-screen-2xl pb-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="my-4 font-semibold">
          Hiện tại, Phòng Khám Đa Khoa Diamond cung cấp dịch vụ{" "}
          {name.toLowerCase()} gồm:
        </h1>
        <div className="overflow-x-auto rounded-lg border bg-white">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-primary-500 text-white hover:bg-primary-500">
                <TableCell className="whitespace-nowrap p-3 text-center font-semibold">
                  STT
                </TableCell>
                <TableCell className="whitespace-nowrap p-3 text-left font-semibold">
                  Danh mục khám
                </TableCell>
                {levelNames.map((levelName, index) => (
                  <TableCell
                    key={index}
                    className="whitespace-nowrap p-3 text-center font-semibold"
                  >
                    {levelName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {allServices &&
              
                allServices.map((row, i) => (
                  
                  <TableRow key={i}>
                    <TableCell className="text-center font-normal">
                      {i + 1}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-left font-normal hover:underline">
                      <Link to={`/detail-service/${row._id}`}>
                      {row.name}</Link>
                     
                    </TableCell>
                    {levelNames.map((levelName, index) => (
                      <TableCell
                        key={index}
                        className="whitespace-nowrap text-center font-normal"
                      >
                        <div className="">
                            <Checkbox
                              checked={servicesByLevel[levelName].includes(
                                row._id,
                              )}
                              className="h-8 w-8 rounded-lg  transition-all duration-500 ease-in-out"
                              type="checkbox"
                              readOnly
                              checkIconSize="h-8 w-8" 
                            />
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                  <TableRow className="bg-white">
                <TableCell colSpan={2} className="text-right font-semibold">
                  Giá:
                </TableCell>
                {levelNames.map((levelName, index) => {
                  const service = services.find(
                    (service) => service.levelName === levelName
                  );
                  return (
                    <TableCell
                      key={index}
                      className="whitespace-nowrap text-center font-semibold"
                    >
                      {service.price.toLocaleString()} VNĐ
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow className="bg-primary-100 ">
                <TableCell colSpan={2} className="text-right font-semibold p-3">
                  Giá khuyến mãi:
                </TableCell>
                {levelNames.map((levelName, index) => {
                  const service = services.find(
                    (service) => service.levelName === levelName
                  );
                  return (
                    <TableCell
                      key={index}
                      className="whitespace-nowrap text-center font-semibold p-3"
                    >
                      {service.discountPrice.toLocaleString()} VNĐ
                    </TableCell>
                  );
                })}
              </TableRow>
            
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

MedicalPackageService.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.object,
};

export default MedicalPackageService;
