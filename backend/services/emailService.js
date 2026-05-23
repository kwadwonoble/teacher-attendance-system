const nodemailer = require("nodemailer");

const sendAttendanceEmail = async (pdfBuffer, date) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.PROPRIETOR_EMAIL,
    subject: `Attendance Report - ${date}`,

    text: `Attached is the attendance report for ${date}.`,

    attachments: [
      {
        filename: `attendance-${date}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendAttendanceEmail;