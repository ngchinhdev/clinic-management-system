import { z } from "zod";

export const passwordSchema = z.object({
  password: z.string().min(1, "Mật khẩu không được để trống!"),
  confirmPassword: z.string().min(1, "Nhập lại mật khẩu không được để trống!"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp!",
  path: ["confirmPassword"],
});
