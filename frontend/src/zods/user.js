import { z } from "zod";

export const userInfoSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
  occupation: z.string().min(1, "Nghề nghiệp không được để trống"),
  birthDate: z.string().min(1, "Ngày sinh không được để trống"),
  ethnicity: z.string().min(1, "Dân tộc không được để trống"),
  idNumber: z.string().min(1, "Số CMND/CCCD không được để trống"),
  insuranceNumber: z.string().min(1, "Số thẻ BH không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  avatar: z.string().min(1, "Ảnh đại diện không được để trống"),
});
