import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton"; // Ensure you import the Skeleton component correctly

const SpecialtiesList = ({ specialties, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-screen-xl py-5 lg:py-10 ">
        <div className="mx-auto w-full ">
          <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
            Chọn một chuyên khoa:
          </h1>
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-xl py-5 lg:py-10 md:px-4">
      <div className="mx-auto w-full ">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Chọn một chuyên khoa:
        </h1>
        <div className="grid grid-cols-1 gap-4 rounded-lg border bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
          {specialties.map((item) => (
            <div
              key={item._id}
              className="group relative h-48 max-w-full rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="absolute inset-0 flex cursor-pointer items-center z-50 justify-center gap-2 px-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Link
                 to={`/services?specialtyID=${item._id}`}
                  className="flex h-8 w-24  cursor-pointer items-center justify-center rounded-md bg-primary-500 px-7 text-center text-[10px] text-white shadow transition duration-500 hover:scale-105"
                >
                  Dịch vụ
                </Link>
                <Link
                   to={`/packages?specialtyID=${item._id}`}
                  className="flex h-8 w-24 cursor-pointer items-center justify-center rounded-md bg-primary-500 px-3 text-center text-[10px] text-white shadow transition duration-500 hover:scale-105"
                >
                 Gói khám
                </Link>
              </div>
              <img
                className="h-full w-full rounded-lg object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="absolute inset-0 top-28 flex items-center justify-center md:top-24">
                <h5 className="w-full bg-white bg-opacity-10 py-1 text-center text-sm font-semibold tracking-tight text-white backdrop-blur md:text-2xl">
                  {item.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
SpecialtiesList.propTypes = {
  specialties: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default SpecialtiesList;
