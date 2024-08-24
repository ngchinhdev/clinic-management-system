import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import PropTypes from "prop-types";
import NotFound from "../notFound";
import { Skeleton } from "@/components/ui/Skeleton";

const PriceServiceContainer = ({ specialtyWithService, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mx-auto my-7 max-w-7xl">
        <div className="mb-7 overflow-x-auto rounded-lg border bg-white p-4">
          <Skeleton className="h-8 w-full mb-2" />

          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex mb-4">
              <Skeleton className="h-6 w-12 mr-4" />
              <Skeleton className="h-6 flex-1 mr-4" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />

            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!specialtyWithService || specialtyWithService.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto my-7 max-w-7xl">
      {specialtyWithService.map((specialty) => (
        <div
          key={specialty._id}
          className="mb-7 overflow-x-auto rounded-lg border bg-white"
        >
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="bg-primary-500 text-center text-2xl font-semibold text-white"
                >
                  {specialty.name}
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableHeader>
              <TableRow>
                <TableCell className="text-left font-semibold">STT</TableCell>
                <TableCell className="text-left font-semibold">
                  Tên dịch vụ
                </TableCell>
                <TableCell className="text-center font-semibold">Giá</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {specialty.services.map((service, idx) => (
                <TableRow key={service._id} className="last:border-0">
                  <TableCell
                    className="w-12 text-left font-normal"
                    component="th"
                    scope="row"
                  >
                    {idx + 1}
                  </TableCell>
                  <TableCell className="min-w-[170px] max-w-[200px] text-left font-normal">
                    {service.name}
                  </TableCell>
                  <TableCell className="w-40 text-center font-normal">
                    {service.price.toLocaleString()} VNĐ
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

PriceServiceContainer.propTypes = {
  isLoading: PropTypes.bool,
  specialtyWithService: PropTypes.array,
};

export default PriceServiceContainer;
