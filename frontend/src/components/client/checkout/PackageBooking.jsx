import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FaSearch } from "react-icons/fa";
import { Input } from '@/components/ui/Input';
import InputCustom from "@/components/ui/InputCustom";
import { bookingSchema } from "@/zods/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectDoctor from './select/doctor';
import SelectTime from './select/time';
import SelectRoom from './select/room';
import SelectDepartment from './select/department';
import SelectDate from './select/date';
import SelectBirthDate from './select/birthday';
import SelectGender from './select/gender';
const packages = [
  {
    title: "GÓI KHÁM TỔNG QUÁT NAM",
    image: "https://img.ykhoadiamond.com/Uploads/PackageBox/05082023/a96a507c-8fee-493b-b7c2-53a710af9135.jpg",
    price: "2.000.000VND",
    description:"Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI KHÁM TỔNG QUÁT NỮ",
    image: "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:"Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI TẦM SOÁT UNG THƯ",
    image: "https://img.ykhoadiamond.com/uploads/package/28032023/2f3b7bea-caeb-4e42-a3e8-fa85007a9408.jpg",
    price: "2.000.000VND",
    description:"Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "SỨC KHỎE HẬU COVID-19",
    image: "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:"Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  },
  {
    title: "GÓI KHÁM TỔNG QUÁT NAM",
    image: "https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg",
    price: "2.000.000VND",
    description:"Medpro trở thành công ty cung cấp giải pháp công nghệ hàng đầu tại Việt Nam giúp kết nối các dịch vụ y tế đến rộng...",
  }
];
export default function Form() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      job: "",
      nation: "",
      cccd: "",
      bhyt: "",
      address: "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date:"",
      birthDate:"",
      gender:"",
    },
  });
  return (
    <div className='flex flex-col mx-auto mt-5 max-w-screen-xl px-0 py-3 md:px-5 md:py-5 md:mt-10'>
      <div className='container mx-auto flex flex-col md:flex-row gap-5 px-5 py-5 border shadow-gray rounded-md'>
        {/* Select Services */}
        <div className='flex flex-col gap-[20px] w-full px-2'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Chọn gói khám</p>
            <p className='font-light'>Đã chọn 1 gói khám</p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input className="pl-10" placeholder="Tìm kiếm gói khám..." />
          </div>

          {/* Package List with Scroll */}
          <div className='overflow-y-auto h-[340px] md:h-[750px]'>
            {packages.map((pkg, index) => (
              <label key={index}>
                <div className='px-4 py-3 border border-primary-500 rounded-lg relative mb-3'>
                  <Checkbox id={`checkbox-gt-${index}`} className="absolute top-1/2 right-5" />
                  <div className='flex mb-2'>
                    <img
                      src={pkg.image}
                      className='w-[98px] h-[51px]'
                      alt={`Image of ${pkg.title}`}
                    />
                    <div className='ml-2'>
                      <p className='font-bold text-[13px] md:text-[17px]'>{pkg.title}</p>
                      <span className='text-[12px] md:text-sm'>Tiêu chuẩn</span>
                    </div>
                  </div>
                  <div>
                    <p>
                      Giá: <span>{pkg.price}</span>
                    </p>
                    <p className='w-full max-w-[330px] font-light text-[12px] md:text-[15px] text-justify'>
                      {pkg.description}
                    </p>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className='w-full md:ml-auto p-4 pt-0'>
          <p className='text-xl font-bold mb-4'>Thông tin đặt lịch khám</p>
          <form onSubmit={handleSubmit()}>
            <div className='flex flex-col gap-4'>
              {/* Hàng đầu tiên */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                  />
                </div>
                <div className='flex-1'>
                  <SelectDoctor
                   control={control}
                   name="doctor"
                   errors={errors}
                  />
                </div>
              </div>

              {/* Selet time */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                  <SelectTime
                   control={control}
                   name="time"
                   errors={errors}
                  />
                </div>
                {/* Select room */}
                <div className='flex-1'>
                  <SelectRoom
                   control={control}
                   name="room"
                   errors={errors}
                  />
                </div>
              </div>

              {/* Date */}
              <div className='flex-1'>
                <SelectDate
                control={control}
                name="date"
                errors={errors}
                />
              </div>

              {/* Thông tin người khám */}
              <p className='text-xl font-bold mt-2'>Thông tin người khám</p>
              <div className='bg-gray-500/30 px-5 py-6 pt-2 rounded-md'>
                {/* Hàng 1 */}
                <div className='mb-4'>
                  <label htmlFor="hoten" className='block mb-1'>Họ và tên:</label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập tên của bạn"
                    name="fullName"
                    type="text"
                    id="fullName"
                    control={control}
                    errors={errors}
                  />
                </div>

                {/* Hàng 2 */}
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="email" className='block mb-1'>Email:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập email của bạn"
                      name="email"
                      type="email"
                      id="email"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="phone" className='block mb-1'>Số điện thoại:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập số điện thoại của bạn"
                      name="phoneNumber"
                      type="text"
                      id="phoneNumber"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="gioitinh" className='block mb-1'>Giới tính</label>
                    <SelectGender
                      control={control}
                      name="gender"
                      errors={errors}
                    />
                  </div>
                  <div className='flex-1'>
                  <label htmlFor="ngaysinh" className='block mb-1'>Ngày sinh</label>
                  <SelectBirthDate
                    control={control}
                    name="birthDate"
                    errors={errors}
                  />
                  </div>
                </div>
                {/* Hàng 3 */}
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="job" className='block mb-1'>Nghề nghiệp:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập nghề nghiệp của bạn"
                      name="job"
                      type="text"
                      id="job"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="nation" className='block mb-1'>Quốc tịch:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập quốc tịch của bạn"
                      name="nation"
                      type="text"
                      id="nation"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                {/* Hàng 4 */}
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="cccd" className='block mb-1'>CCCD/CMND:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập CCCD/CMND của bạn"
                      name="cccd"
                      type="text"
                      id="cccd"
                      control={control}
                      errors={errors}
                    />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="bhyt" className='block mb-1'>Bảo hiểm y tế:</label>
                    <InputCustom
                      className="col-span-1 sm:col-span-1"
                      placeholder="Nhập BHYT của bạn"
                      name="bhyt"
                      type="text"
                      id="bhyt"
                      control={control}
                      errors={errors}
                    />
                  </div>
                </div>

                {/* Hàng 5 */}
                <div className='mb-4'>
                  <label htmlFor="address" className='block mb-1'>Địa chỉ:</label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập địa chỉ của bạn"
                    name="address"
                    type="text"
                    id="address"
                    control={control}
                    errors={errors}
                  />
                </div>

                {/* Button */}
              </div>
                <div className='mt-3 flex justify-end gap-3'>
                <Button size="lg" variant="outline">
                  Trở lại
                </Button>
                <button className='h-10 rounded-md px-8 bg-primary-500 text-white hover:bg-primary-600 '>
                  Tiếp tục
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
