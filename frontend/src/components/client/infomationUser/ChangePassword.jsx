import InputCustom from "@/components/ui/InputCustom";
import { changePasswordSchema } from "@/zods/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted");
    console.log(data);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="mb-6 text-xl font-bold">Thay đổi mật khẩu</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="oldPassword"
            label="Mật khẩu cũ"
            type="text"
            control={control}
            errors={errors}
            placeholder="**************"
          />
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            control={control}
            errors={errors}
            placeholder="**************"
          />
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            control={control}
            errors={errors}
            placeholder="**************"
          />
        </div>
        <div className="flex w-full items-end justify-end">
          <button
            type="submit"
            className="md:w-2/12 mt-4 h-fit w-4/12 rounded bg-primary-500 p-3 text-white"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
