import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { forgotSchema } from "@/zods/forgot";
import { sendOtpForgotPassword } from "@/services/authApi";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { useMutation } from "@tanstack/react-query";

export default function ForgetComponent() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const mutation = useMutation({
    mutationFn: sendOtpForgotPassword,
    onSuccess: (data) => {
      toast({
        variant: "success",
        title: "Thành công!",
        description: "Mã OTP đã được gửi đến số điện thoại của bạn.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      sessionStorage.setItem("otpTokenForgot", data.otpToken);
      const currentTime = new Date().getTime();
      sessionStorage.setItem("otpSentTimeForgot", currentTime);
      navigate("/changepassword-accuracy");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast({
        variant: "destructive",
        title: "Thất bại!",
        description: errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      sessionStorage.removeItem("phoneNumberForgot");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data.phoneNumber);
    sessionStorage.setItem("phoneNumberForgot", data.phoneNumber);
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100 px-2 py-20 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white px-5 py-16 shadow-lg md:px-11 md:py-20">
            <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
              Quên mật khẩu
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Đặt lại mật khẩu của bạn
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="relative">
              <div className="relative mb-2">
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

              <div className="my-2 text-right text-sm italic">
                <Link
                  to={"/login"}
                  className="text-base font-bold italic text-primary-500 hover:underline"
                >
                  Quay lại
                </Link>
              </div>

              <button
                className="my-4 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-xl font-semibold text-white hover:bg-primary-500"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Đang xử lí" : "Xác nhận"}
                {mutation.isPending && (
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                )}
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
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-4 py-3 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 md:flex-1 md:px-1"
                >
                  <img
                    src="https://t3.ftcdn.net/jpg/05/18/09/32/360_F_518093233_bYlgthr8ZLyAUQ3WryFSSSn3ruFJLZHM.jpg"
                    className="mr-2 w-7 md:mr-2"
                    alt="Google icon"
                  />
                  <span className="mr-4 block md:mr-0">Tài khoản Google</span>
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
