import React from 'react';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Container } from 'react-bootstrap';

export default function Verify() {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div style={{
        width: '50vh', 
        padding: '20px',
        backgroundColor: 'white', 
        borderRadius: '10px',
        border: '1px solid rgb(122, 115, 207)',
        boxShadow: 'rgba(15, 19, 226, 0.66) 0px 4px 8px'
      }}>
        <MyComponent />
      </div>
    </Container>
  );
}

const MyComponent = () => {
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <MuiOtpInput value={otp} onChange={handleChange} style={{ width: '100%', padding: '10px' }}/>
  );
}
