const { errorValidator, sendEmail } = require("../utils/helper.util");

const contactUs = async (req, res, next) => {
    try {
        errorValidator(req, res);

        const { fullName, email, phoneNumber, note } = req.body;

        await sendEmail(
            email,
            'Email mới từ E-Booking HealthCare',
            `<h1>Thông tin từ khách hàng muốn liên hệ:</h1>
             <h5>Họ và tên: ${fullName} </h5>
             <h5>Email:  ${email} </h5>
             <h5>Số điện thoại:  ${phoneNumber} </h5>
             <h5>Chi tiết:  ${note}</h5>`
        );

        return res.status(200).json({
            message: 'Email sent successfully.',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    contactUs
};