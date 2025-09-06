const { sendEmail } = require("./emailService");

 const sendEmailFun = async (to, subject, text, html) => {
    const result = await sendEmail(to, subject, text, html);
  if(result.success){
    return true;
  }
  else{
    return false;
  }
};

module.exports= { 
    sendEmailFun
    };
