import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/zods/password";
import InputCustom from "@/components/ui/InputCustom";
import { changePasswordForgot } from "@/services/authApi";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { useMutation } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";

export default function ChangePassComponent() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [otp, setOTP] = useState("");
  const [otpToken, setOtpToken] = useState("");

  useEffect(() => {
    const otpValue = sessionStorage.getItem("otpForgot");
    setOTP(otpValue);
    const otpToken = sessionStorage.getItem("otpTokenForgot");
    setOtpToken(otpToken);
  }, []);

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const mutation = useMutation({
    mutationFn: changePasswordForgot,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Thành công!",
        description: "Mật khẩu đã được thay đổi thành công.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      sessionStorage.removeItem("otpForgot");
      sessionStorage.removeItem("otpTokenForgot");
      sessionStorage.removeItem("otpSentTimeForgot");
      navigate("/login");
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
    },
  });

  const onSubmit = (data) => {
    const dataSend = {
      OTP: otp,
      otpToken: otpToken,
      password: data.password,
    };
    mutation.mutate(dataSend);
  };

  if (!otp || !otpToken) {
    return <NotFound />;
  }

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100 px-2 py-20 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white px-5 py-16 shadow-lg md:px-11 md:py-20">
            <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
              Đặt lại mật khẩu
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Đặt mật khẩu mới cho tài khoản của bạn
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Mật khẩu mới:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập mật khẩu"
                    name="password"
                    type="password"
                    id="password"
                    icon={<FaLock></FaLock>}
                    control={control}
                    errors={errors}
                  />

                  {/* <input placeholder="Mật khẩu mới" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  /> */}
                </div>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Nhập lại mật khẩu:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    icon={<FaLock></FaLock>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              <button
                className="my-5 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-xl font-semibold text-white hover:bg-primary-500"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Đang xử lí" : "Xác nhận"}
                {mutation.isPending && (
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
