import { Button } from "@/components/ui/Button";
import { ToastAction } from "@/components/ui/Toast";
import { useToast } from "@/hooks/useToast";
import { AiOutlineSchedule } from "react-icons/ai";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";

const ServiceDetail = ({ medicalPackage, service, isLoading }) => {
  
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (medicalPackage?.services?.length > 0) {
      setSelectedService(medicalPackage.services[0]);
    }
  }, [medicalPackage]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl pb-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
          <div className="container flex items-center justify-center">
            <Skeleton className="h-[400px] w-[400px] overflow-hidden rounded-md" />
          </div>
          <div className="flex flex-col items-start justify-center text-start">
            <Skeleton className="mb-4 h-8 w-3/4 md:h-12" />
            <div className="my-4 flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-6 h-8 w-1/2" />
            <div className="mb-4 flex w-full items-center gap-3">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderServiceDetails = () => (
    <>
      <h3 className="mb-4 text-xl font-bold md:text-3xl">{service.name}</h3>
      <div className="my-4 flex items-center gap-2">
        <AiOutlineSchedule size={25} />
        <span className="text-sm font-bold !text-gray-700">
          {service.orderCount} lượt đặt lịch
        </span>
      </div>
      <p className="mb-4 text-justify text-sm font-normal leading-[27px] text-gray-600">
        {service.shortDescription}
      </p>
      <span className="mb-6 block text-lg font-medium">
        <strong className="font-semibold">Giá:</strong>{" "}
        {service.price.toLocaleString()} đ
      </span>
    </>
  );

  const renderMedicalPackageDetails = () => (
    <>
      <h3 className="mb-4 text-xl font-bold md:text-3xl">
        {medicalPackage.name}
      </h3>
      <div className="my-4 flex items-center gap-2">
        <AiOutlineSchedule size={25} />
        <span className="text-sm font-bold !text-gray-700">
          {medicalPackage.orderCount} lượt đặt lịch
        </span>
      </div>
      <p className="mb-4 text-justify text-sm font-normal leading-[27px] text-gray-600">
        {medicalPackage.shortDescription}
      </p>
      <div className="mb-3">
        <h2 className="mb-4 font-medium">Chọn gói khám:</h2>
        <div className="my-3 flex items-center justify-center gap-3">
          {medicalPackage.services
            .slice()
            .reverse()
            .map((service) => (
              <div key={service._id} className="relative">
                <input
                  className="peer hidden"
                  id={`radio_${service._id}`}
                  type="radio"
                  name="radio"
                  onChange={() => setSelectedService(service)}
                  value={service._id}
                  checked={selectedService?._id === service._id}
                />
                <label
                  className="cursor-pointer select-none rounded-lg border border-gray-300 p-2 peer-checked:border-primary-600 peer-checked:bg-gray-50 peer-checked:outline-2"
                  htmlFor={`radio_${service._id}`}
                >
                  <span className="text-base font-medium">
                    {service.levelName}
                  </span>
                </label>
              </div>
            ))}
        </div>
      </div>
      <span className="mb-6 block text-lg font-medium">
        <strong className="font-semibold">Giá:</strong>{" "}
        {selectedService?.price
          ? selectedService.price.toLocaleString()
          : "N/A"}{" "}
        đ
      </span>
    </>
  );

  return (
    <div className="mx-auto max-w-screen-2xl pb-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
        <div className="container flex items-center justify-center">
          <img
            src={service?.image || medicalPackage?.image}
            alt={service?.name || medicalPackage?.name}
            className="h-auto w-9/12"
          />
        </div>
        <div className="flex flex-col items-start justify-center text-start">
          {service ? renderServiceDetails() : renderMedicalPackageDetails()}
          <div className="mb-4 flex w-full items-center gap-3">
            <Button
              className="w-full"
              size="lg"
              variant="custom"
              onClick={() => {
                toast({
                  variant: "success",
                  title: "Đặt lịch thành công!",
                  description: "Chúng tôi sẽ liên hệ với bạn sớm nhất.",
                  action: <ToastAction altText="Đóng">Đóng</ToastAction>,
                });
              }}
            >
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceDetail.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackage: PropTypes.object,
  service: PropTypes.object,
};

export default ServiceDetail;
