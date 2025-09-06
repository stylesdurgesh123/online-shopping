const { model } = require("mongoose");

const verificationEmail = (username, otp) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
              text-align: center;
              margin-bottom: 20px;
          }
          .otp-box {
              font-size: 24px;
              font-weight: bold;
              color: #1a73e8;
              background: #eef3fd;
              padding: 15px;
              border-radius: 6px;
              text-align: center;
              margin: 20px 0;
              letter-spacing: 4px;
          }
          .footer {
              margin-top: 30px;
              font-size: 13px;
              text-align: center;
              color: #777;
          }
         </style>
         </head>
        <body>
        <div class="container">
          <div class="header">
              <h2>Email Verification</h2>
          </div>
          <p>Hi <strong>${username}</strong>,</p>
          <p>Thank you for registering with us. Please use the OTP below to verify your email address:</p>
          <div class="otp-box">${otp}</div>
          <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
          <p>Best regards,<br/>Your E-commerce Team</p>
          <div class="footer">
              &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
      </div>
  </body>
  </html>
  `;
};

module.exports={
  verificationEmail
}
