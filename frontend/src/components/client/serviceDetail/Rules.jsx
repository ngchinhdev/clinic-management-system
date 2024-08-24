import doctorImage from "../../../assets/images/doctor.png";

const Rules = () => {
    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="relative mx-auto my-5 flex w-full max-w-7xl justify-end overflow-hidden rounded-lg bg-primary-500 md:p-9 p-4 shadow-md">
                <div className="absolute -top-10 left-0 w-auto">
                    <img
                        src={ doctorImage }
                        alt="Doctor"
                        className="hidden h-auto object-cover md:block md:w-3/6"
                    />
                </div>
                <div className="w-full rounded-lg bg-white p-4 text-justify text-black md:w-3/5 md:rounded-br-3xl md:rounded-tl-3xl md:p-6">
                    <h2 className="mb-4 text-2xl font-bold">
                        Điều kiện sử dụng gói khám:
                    </h2>
                    <ul className="space-y-1">
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>
                                Để phục vụ được tốt nhất, vui lòng đặt hẹn qua Hotline: (028) 39
                                30 75 75.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>
                                Thời hạn sử dụng gói khám: Trong vòng 30 ngày kể từ ngày thanh
                                toán.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>Chi phí đã thanh toán không hoàn trả.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>
                                Đề xuất hoá đơn giá trị gia tăng, cung cấp trực tiếp thông tin
                                tại quầy dịch vụ trong ngày khám.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>
                                Các quy định sử dụng gói khám theo quy định của Hệ Thống Y Khoa
                                Diamond.
                            </span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">-</span>
                            <span>
                                Gói khám được thực hiện tại Phòng Khám Đa Khoa Diamond.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Rules;
