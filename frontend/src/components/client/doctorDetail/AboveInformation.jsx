import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaMapLocationDot } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/Skeleton";
export default function AboveInformation({ doctor, isLoading }) {
  if (isLoading)
    return (
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-10 md:px-10">
          <Skeleton className="block h-[400px] w-[400px] overflow-hidden rounded-full" />
          <div className="flex flex-col space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <Skeleton className="h-8 w-1/2 text-3xl" />
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="flex flex-col space-y-3 rounded-md bg-white p-5 lg:min-w-[550px]">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
        </div>
      </div>
    );

  const { yearsExperience } = doctor;
  const { fullName, phoneNumber, gender, avatar } = doctor.userID;
  const { street, ward, district, province } = doctor.userID.address;

  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-10 md:px-10">
          <div className="block overflow-hidden rounded-full">
            <img src={avatar} />
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Chi nhánh:
              </strong>
              {province}
            </div>
            <div className="text-3xl font-semibold uppercase">{fullName}</div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Chức vụ:
              </strong>
              Trưởng khoa Tai Mũi Họng
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Kinh nghiệm:
              </strong>
              {yearsExperience} năm kinh nghiệm
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Giới tính:
              </strong>
              {gender}
            </div>
            <button className="rounded-md bg-primary-500 p-3 text-white duration-500 hover:bg-orange-500">
              Đặt lịch hẹn
            </button>
            <div className="flex flex-col space-y-3 rounded-md bg-white p-5 lg:min-w-[550px]">
              <div className="flex text-[14px] md:text-[15px]">
                <strong className="block min-w-[80px] whitespace-nowrap pr-2 md:pr-0">
                  Đặt lịch:
                </strong>
                {phoneNumber}
              </div>
              <div className="flex text-[14px] md:text-[15px]">
                <strong className="block min-w-[80px] whitespace-nowrap pr-2 md:pr-0">
                  Địa chỉ:
                </strong>
                {`${street} - ${ward} - ${district} - ${province}`}
              </div>
              <Link
                to="/none"
                className="flex items-center justify-center gap-2 text-primary-500 underline"
              >
                Xem bản đồ <FaMapLocationDot />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

AboveInformation.propTypes = {
  doctor: PropTypes.object,
  isLoading: PropTypes.bool,
};
