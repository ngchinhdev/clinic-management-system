import { z } from "zod";

export const accountSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Số điện thoại phải có ít nhất 10 ký tự")
    .regex(/^\d+$/, "Số điện thoại chỉ được chứa các ký tự số")
    .max(11, "Số điện thoại không được vượt quá 11 ký tự"),

  password: z.string().min(1, "Mật khẩu không được để trống!"),
});
