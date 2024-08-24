import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FaSearch } from "react-icons/fa";
import { Input } from '@/components/ui/Input';
import InputCustom from "@/components/ui/InputCustom";
import { bookingSchema } from "@/zods/booking";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectTime from './select/time';
import SelectDepartment from './select/department';
import SelectDate from './select/date';
import SelectBirthDate from './select/birthday';
import SelectGender from './select/gender';
const services = [
  {
    title: 'Điện tim thường'
  },
  {
    title: 'Siêu âm tuyến giáp'
  },
  {
    title: 'Lấy dị vật tai'
  },
  {
    title: 'Khâu vết rách vành tai'
  },
  {
    title: 'Khám tổng quát'
  },
  {
    title: 'Kiểm tra huyết áp'
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
    <div className='mx-auto mt-5 max-w-screen-xl px-0 py-3 md:px-5 md:py-5 md:mt-10 '>

      <div className='container mx-auto flex flex-col md:flex-row gap-5 px-5 py-5 border shadow-gray rounded-md'>
        {/* Select Services */}
        <div className='flex flex-col gap-[20px] w-full px-2'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Chọn dịch vụ</p>
            <p className='font-light'>Đã chọn 1 dịch vụ</p>
          </div>
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input className="pl-10" placeholder="Tìm kiếm dịch vụ..." />
          </div>

          {/* Services List */}
          <div className='overflow-y-auto h-[185px] sm:h-[215px] md:h-[680px]'>
            {services.map((svc, index) => (
              <label key={index}>
              <div className='px-3 py-2 md:py-3 mb-1 border border-primary-500 rounded-lg relative flex items-center'>
                <div className='flex items-center gap-4'>
                  <img
                    src='https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg'
                    className='md:w-[100px] sm:w-[75px] w-[60px]'
                    alt={`Image of ${svc.title}`}
                  />
                  <p className='font-bold text-[13px] sm:text-[16px] md:text-[18px]'>{svc.title}</p>
                </div>
                <Checkbox id={`checkbox-svc-${index}`} className="absolute right-5 top-1/2 transform -translate-y-1/2" />
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
                <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                  />
                </div>
              </div>

              {/* Hàng thứ hai */}
              <div className='flex flex-col md:flex-row gap-4'>
                <div className='flex-1'>
                <SelectTime
                  control={control}
                  name="time"
                  errors={errors}
                  />
                </div>
                <div className='flex-1'>
                <SelectDate
                  control={control}
                  name="date"
                  errors={errors}
                />
                </div>
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
                    {/* <input type="email" id="email" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập email của bạn"
                    name="email"
                    type="text"
                    id="email"
                    control={control}
                    errors={errors}
                  />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="sdt" className='block mb-1'>Số điện thoại</label>
                    {/* <input type="tel" id="sdt" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    control={control}
                    errors={errors}
                  />
                  </div>
                </div>

                {/* Hàng 3 */}
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

                {/* Hàng 4 */}
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="nghenghiep" className='block mb-1'>Nghề nghiệp:</label>
                    {/* <input type="text" id="nghenghiep" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nghề nghiệp"
                    name="job"
                    type="text"
                    id="job"
                    control={control}
                    errors={errors}
                  />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="dantoc" className='block mb-1'>Dân tộc</label>
                    {/* <input type="text" id="dantoc" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Dân tộc"
                    name="nation"
                    type="text"
                    id="nation"
                    control={control}
                    errors={errors}
                  />
                  </div>
                </div>

                {/* Hàng 5 */}
                <div className='flex flex-col md:flex-row gap-4 mb-4'>
                  <div className='flex-1'>
                    <label htmlFor="so-cccd" className='block mb-1'>Số CCCD</label>
                    {/* <input type="text" id="so-cccd" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số CCCD"
                    name="cccd"
                    type="text"
                    id="cccd"
                    control={control}
                    errors={errors}
                  />
                  </div>
                  <div className='flex-1'>
                    <label htmlFor="so-bhyt" className='block mb-1'>Số BHYT</label>
                    {/* <input type="text" id="so-bhyt" className='w-full p-2 border rounded' /> */}
                    <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số BHYT"
                    name="bhyt"
                    type="text"
                    id="bhyt"
                    control={control}
                    errors={errors}
                  />
                  </div>
                </div>

                {/* Hàng 6 */}
                <div className='mb-2'>
                  <label htmlFor="diachi" className='block mb-1'>Địa chỉ</label>
                  {/* <input type="text" id="diachi" className='w-full p-2 border rounded' /> */}
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập địa chỉ"
                    name="address"
                    type="text"
                    id="address"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>

              {/* Nút tiếp tục */}
              <div className='mt-3 flex justify-end gap-3'>
                <Button size="lg" variant="outline">
                  Trở lại
                </Button>
                <button className='h-10 px-8 bg-primary-500 text-white  rounded-md hover:bg-primary-600 '>
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
