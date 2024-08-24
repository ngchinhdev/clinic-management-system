import AdsProduct from "../product/Ads";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import InputCustom from "@/components/ui/InputCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/zods/account";
import { API_LOGIN_GOOGLE } from "@/configs/varibles";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authApi";

export default function LoginComponent() {
  const { toast } = useToast();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      location.href = `/user-profile?accessToken=${data.accessToken}`;
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast({
        variant: "destructive",
        title: "Đăng nhập thất bại!",
        description: errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const handleLoginGoogle = async () => {
    window.location.href = API_LOGIN_GOOGLE;
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100 px-2 py-20 md:px-3">
      <div className="w-full max-w-screen-xl px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ADS BANNER */}
          <div className="hidden bg-gray-200 shadow-lg md:block">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                }),
              ]}
            >
              <CarouselContent>
                {Array.from({ length: 12 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-4">
                    <AdsProduct />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
          {/* FORM */}
          <div className="bg-white px-5 py-16 shadow-lg md:px-11 md:py-20 border-l">
            <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
              Đăng nhập
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Đăng nhập với số điện thoại và mật khẩu
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Số điện thoại:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    icon={<FaPhoneAlt></FaPhoneAlt>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-700"
                >
                  Mật khẩu:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Mật khẩu"
                    name="password"
                    type="password"
                    id="password"
                    icon={<FaLock></FaLock>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ghi nhớ tôi
                  </label>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm font-bold italic text-primary-500 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <button
                className="my-5 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-xl font-semibold text-white hover:bg-primary-500"
                // disabled={mutation.isPending}
              >
                {/* {mutation.isPending ? "Đang xử lí" : "Đăng ký"}
                {mutation.isPending && (
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                )} */}
                Đăng nhập
              </button>
              <div className="my-2 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-800">
                  Hoặc tiếp tục với
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {/* GG - FB LOGIN */}
              <div className="block justify-center md:flex md:space-x-2">
                <button
                  onClick={handleLoginGoogle}
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-4 py-3 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 md:flex-1 md:px-1"
                >
                  <img 
                  src="https://t3.ftcdn.net/jpg/05/18/09/32/360_F_518093233_bYlgthr8ZLyAUQ3WryFSSSn3ruFJLZHM.jpg" 
                  className="w-7 mr-2 md:mr-2" alt="Google icon" />
                  <span className="block mr-4 md:mr-0">
                    Tài khoản Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-2 py-1 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 md:flex-1 md:px-1 md:py-1"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
                    className="mr-0 w-12 md:mr-0"
                    alt="Facebook icon"
                  />
                  <span className="block">Tài khoản Facebook</span>
                </button>
              </div>
              <div className="mb-10 mt-3 flex flex-col items-center">
                <p className="text-center">
                  Bạn chưa có tài khoản?
                  <Link
                    to={"/register"}
                    className="ml-1 block font-medium text-primary-500 hover:font-semibold hover:text-primary-800 md:inline"
                  >
                    Đăng kí ngay!
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
