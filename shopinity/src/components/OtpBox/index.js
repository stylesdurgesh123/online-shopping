import React, { useState } from 'react';

function OtpBox({ length, onChange }) {
  const [otp, setOtp] = useState(new Array(length).fill(''));

  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return;

    // Update OTP value
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join('')); 

    // Focus on next input
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }} className='otpBox'>
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-input-${index}`}
          type='text'
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          style={{
            width: '45px',
            height: '45px',
            textAlign: 'center',
            fontSize: '17px',
          }}
        />
      ))}
    </div>
  );
}

export default OtpBox;
