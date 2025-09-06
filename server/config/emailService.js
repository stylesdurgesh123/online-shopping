const http= require('http');
const nodemailer= require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'durgeshyadav4325626@gmail.com',
    pass: 'wukikxrdbwyromak'
  },
});

 async function sendEmail(to, subject, text, html) {
 try {
   const info= await transporter.sendMail({
    from: 'durgeshyadav4325626@gmail.com',
    to,
    subject,
    text,
    html
   });
   return {success: true, messageId: info.messageId};  
 } catch (error) {
   console.log('Error sending email:',error)
   return {success: false, error: error.message};
 }   
}

module.exports={
   sendEmail 
};