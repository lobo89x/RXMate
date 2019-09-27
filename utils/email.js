var nodemailer = require('nodemailer');
// for nodemailer self signed cerificate
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


console.log('trying to send email');
//set up nodemailer transporter
var transporter = nodemailer.createTransport(
  {
    service: 'yahoo',
    auth:
    {
      user: "bgroup3project1@yahoo.com",
      pass: "Grp#3Prj1"
    }
  });




function sendEmail(mailOptions) {
  // send email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = {
    sendEmail: sendEmail
}