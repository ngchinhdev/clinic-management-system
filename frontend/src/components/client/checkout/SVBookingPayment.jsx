import { Button } from '@/components/ui/Button';

export default function Form() {
  return (
    <div className='mx-auto mt-5 max-w-screen-xl px-4 py-3 md:px-5 md:py-5 md:mt-10'>
      <div className='container mx-auto gap-5 px-10 py-5 pb-10 border shadow-gray rounded-md'>
        <div>
          <div className='flex flex-col md:flex-row justify-between items-center my-6'>
            <h1 className='font-bold text-[22px] md:text-[32px]'>Thông tin đặt lịch khám</h1>
            <span className='text-[16px] md:text-[20px] mt-4 md:mt-0'><strong>Tổng dịch vụ:</strong> 1 dịch vụ</span>
          </div>
          <div className='flex flex-col md:flex-row justify-between text-[16px] md:text-[18px] mb-7'>
            <div className='mb-4 md:mb-0'>
              <p className='mb-1 text-[16px] md:text-[20px]'><strong>Chi nhánh: </strong>ĐA KHOA DIAMOND</p>
              <p className='mb-1'><strong>Ngày khám: </strong>18/08/2024</p>
              <p className='mb-1'><strong>Giờ khám: </strong>08:30</p>

            </div>
            <div className='w-full md:w-[50%]'>
              <p>Dịch vụ của bạn:</p>
              {/* Services list */}
              <div className='px-2 py-2 md:px-3 md:py-2 border border-primary-500 rounded-lg relative mb-3 max-w-full'>
                <div className='flex flex-row md:flex-row items-center'>
                  <img
                    src='https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg'
                    className='w-[60px] md:w-[110px] sm:w-[80px]'
                    alt='Sức Khỏe Hậu COVID-19'
                  />
                  <div className='ml-3 flex flex-col'>
                    <a href='/' className='font-bold text-[12px] sm:text-[16px] md:text-[18px] '>SỨC KHỎE HẬU COVID-19</a>
                  </div>
                </div>
              </div>
              <div className='px-2 py-2 md:px-3 md:py-2 border border-primary-500 rounded-lg relative mb-3 max-w-full'>
                <div className='flex flex-row md:flex-row items-center'>
                  <img
                    src='https://img.ykhoadiamond.com/uploads/package/12042023/57f12ac8-2eaf-4bbc-a9ed-2038d671f63a.jpg'
                    className='w-[60px] md:w-[100px] sm:w-[75px]'
                    alt='Sức Khỏe Hậu COVID-19'
                  />
                  <div className='ml-3 flex flex-col'>
                    <a href='/' className='font-bold text-[13px] sm:text-[16px] md:text-[18px] '>SỨC KHỎE HẬU COVID-19</a>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <hr />
        <h1 className='font-bold text-[24px] md:text-[32px] my-6'>Thông tin người đặt</h1>
        <div className='flex flex-col md:flex-row justify-between mb-7'>
          <div className='text-[16px] md:text-[20px] w-full md:w-[48%] mb-0 md:mb-4'>
            <p className='mb-2'><strong>Họ tên: </strong>Nguyễn Văn A</p>
            <p className='mb-2'><strong>Email: </strong>vinh@gmail.com</p>
            <p className='mb-2'><strong>Số điện thoại: </strong>0325717890</p>
            <p className='mb-2'><strong>Giới tính: </strong>Nam</p>
            <p className='mb-2'><strong>Ngày sinh: </strong>25/01/2004</p>
            <p className='mb-2'><strong>Địa chỉ: </strong>328-329 Chung cư Tô Kí</p>
          </div>
          <div className='text-[16px] md:text-[20px] w-full md:w-[48%]'>
            <p className='mb-2'><strong>Nghề nghiệp: </strong>Công nhân</p>
            <p className='mb-2'><strong>Dân tộc: </strong>Kinh</p>
            <p className='mb-2'><strong>Số CCCD: </strong>0325717890</p>
            <p className='mb-2'><strong>Số BHYT: </strong>1041846121</p>
          </div>
        </div>
        <hr />
        {/* Thanh toán */}
        <div className='mt-6'>
          <h1 className='font-bold text-[24px] md:text-[32px] mb-5'>Phương thức thanh toán</h1>
          <div className='flex flex-col md:flex-row justify-between gap-4'>
            <div className='flex flex-col gap-4 w-full md:w-[48%]'>
              <label className="flex items-center border border-gray-500 rounded-md p-4">
                <img
                  src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán qua MOMO</span>
                <input type="radio" name="payment" value="momo" className="ml-auto" />
              </label>
              <label className="flex items-center border border-gray-500 rounded-md p-4">
                <img
                  src='https://cdn-icons-png.flaticon.com/512/1019/1019607.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán tại phòng khám</span>
                <input type="radio" name="payment" value="clinic" className="ml-auto" />
              </label>
            </div>
            <div className='flex flex-col gap-4 w-full md:w-[48%]'>
              <label className="flex items-center border border-gray-500 rounded-md p-4">
                <img
                  src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png'
                  className='w-[10%] mr-4'
                />
                <span>Thanh toán qua ZaloPay</span>
                <input type="radio" name="payment" value="zalopay" className="ml-auto" />
              </label>
              <label className="flex items-center border border-gray-500 rounded-md p-4">
                <img
                  src='https://cdn-icons-png.flaticon.com/512/6963/6963703.png'
                  className='w-[10%] mr-4'
                />
                <span>Bankking</span>
                <input type="radio" name="payment" value="bank" className="ml-auto" />
              </label>
            </div>
          </div>
        </div>
        <hr />
        <p className='text-red-600 italic mt-4 text-[16px] md:text-xl'>
          ! Trường hợp khách hàng có người thân hỗ trợ đặt lịch, bệnh án sẽ không được cập nhật liên tục.
        </p>
        {/* Nút tiếp tục */}
        <div className='mt-7'>
          <p className='flex justify-end text-xl md:text-2xl'>
            Tổng tiền:
            <strong className='ml-3 text-red-500'>
              1.999.999VND
            </strong>
          </p>
          <div className='mt-6 flex flex-row justify-end gap-3'>
            <Button className='sm:h-10 rounded-md sm:px-8' size="default" variant="outline">
              Trở lại
            </Button>
            <Button className='sm:h-10 rounded-md sm:px-8' size="default" variant="primary">
              Tiến hành thanh toán
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
