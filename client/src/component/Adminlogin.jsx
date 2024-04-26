import { Box, Button, Container, Link, TextField } from '@mui/material'
import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { MuiOtpInput } from 'mui-one-time-password-input';


export default function Adminogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    hostel:"",
    password: "",
    cpassword: ""
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
      setOpen(false);
  };

  const handleInputs = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
      setOpen(true);
      setShowOtp(true);
      e.preventDefault();
  };

  const loginUser = async (e) => {
      setOpen(true);
      e.preventDefault();
  };

  const handleToggle = () => {
      setIsLogin(!isLogin); 
  };

  const handleChange = (newValue) => {
      setOtp(newValue);
  };

  return (
      <Container maxWidth="sm">
          <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="register-form" style={{ width: "100vh" }}>
                  {!showOtp ? (
                      <>
                          <h1 style={{textAlign:"center",color: "#b6b2b2"}}>{isLogin ? 'Login' : 'Register'}</h1>
                          {isLogin ? (
                            <form method='POST' className="register-form-inside">
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="text" name="email" value={user.email} onChange={handleInputs} label="Email" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="password" name="password" value={user.password} onChange={handleInputs} label="Password" autoComplete="off" fullWidth/>
                              </Box>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button className="button" type="submit" onClick={loginUser} style={{borderRadius:"10px",marginTop:"7px"}}>Login</Button>
                                <Backdrop
                                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                  open={open}
                                  onClick={handleClose}
                                >
                                  <CircularProgress color="inherit" />
                                </Backdrop>
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",cursor:"pointer"}}>or <Link onClick={handleToggle}>Register</Link></div>
                            </form>
                          ) : (
                            <form method='POST' className="register-form-inside">
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="text" name="name" value={user.name} onChange={handleInputs} label="Name" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="text" name="email" value={user.email} onChange={handleInputs} label="Email" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <PhoneIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="text" name="phone" value={user.phone} onChange={handleInputs} label="Phone" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <BusinessCenterIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="text" name="hostel" value={user.hostel} onChange={handleInputs} label="Hostel" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LockOpenIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="password" name="password" value={user.password} onChange={handleInputs} label="Password" autoComplete="off" fullWidth/>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LockIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField variant="standard" type="password" name="cpassword" value={user.cpassword} onChange={handleInputs} label="Confirm Password" autoComplete="off" fullWidth/>
                              </Box>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                                <Button className="button" type="submit" onClick={postData} style={{borderRadius:"10px",marginTop:"7px"}}>Register</Button>
                                {/* <Backdrop
                                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                  open={open}
                                  onClick={handleClose}
                                >
                                  <CircularProgress color="inherit" />
                                </Backdrop> */}
                              </div>
                              <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",cursor:"pointer"}}>or <Link onClick={handleToggle}>Login</Link></div>
                            </form>
                          )}
                      </>
                  ) : (
                    <>
                      <h1 style={{ textAlign: "center", color: "#b6b2b2" }}>Enter otp</h1>
                      <MuiOtpInput value={otp} onChange={handleChange} numInputs={6} isInputNum={true} separator={<span>-</span>} />
                    </>
                  )}
              </div>
          </Box>
      </Container>
  );
}

























// export default function Adminogin() {
//     const [isLogin, setIsLogin] = useState(true);
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         hostel:"",
//         password: "",
//         cpassword: ""
//       });
      
//       const [open, setOpen] = React.useState(false);
//       const handleClose = () => {
//         setOpen(false);
//       };

//       const handleInputs = (e) => {
//         setUser({ ...user, [e.target.name]: e.target.value });
//       };

//     const PostData = async (e) => {
//       setOpen(true);
//       e.preventDefault();
//     }
//     const LoginUser=async (e)=>{
//       setOpen(true);
//         e.preventDefault();
//     }

//     const handleToggle = () => {
//         setIsLogin(!isLogin); 
//       };
//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <div className="register-form" style={{width:"100vh"}}>
//           <h1 style={{textAlign:"center",color: "#b6b2b2"}}>{isLogin ? 'Login' : 'Register'}</h1>
//           {isLogin ? (
//             <form method='POST' className="register-form-inside">
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="text" name="email" value={user.email} onChange={handleInputs} label="Email" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <LockOpenIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="password" name="password" value={user.password} onChange={handleInputs} label="Password" autoComplete="off" fullWidth/>
//               </Box>
//               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//                 <Button className="button" type="submit" onClick={LoginUser} style={{borderRadius:"10px",marginTop:"7px"}}>Login</Button>
//                 <Backdrop
//                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                   open={open}
//                   onClick={handleClose}
//                 >
//                   <CircularProgress color="inherit" />
//                 </Backdrop>
//               </div>
//               <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",cursor:"pointer"}}>or <Link onClick={handleToggle}>Register</Link></div>
//             </form>
//           ) : (
//             <form method='POST' className="register-form-inside">
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <AccountCircle  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="text" name="name" value={user.name} onChange={handleInputs} label="Name" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <EmailIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="text" name="email" value={user.email} onChange={handleInputs} label="Email" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <PhoneIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="text" name="phone" value={user.phone} onChange={handleInputs} label="Phone" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <BusinessCenterIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="text" name="hostel" value={user.hostel} onChange={handleInputs} label="Hostel" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <LockOpenIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="password" name="password" value={user.password} onChange={handleInputs} label="Password" autoComplete="off" fullWidth/>
//               </Box>
//               <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
//                 <LockIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
//                 <TextField variant="standard" type="password" name="cpassword" value={user.cpassword} onChange={handleInputs} label="Confirm Password" autoComplete="off" fullWidth/>
//               </Box>
//               <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
//                 <Button className="button" type="submit" onClick={PostData} style={{borderRadius:"10px",marginTop:"7px"}}>Register</Button>
//                 <Backdrop
//                   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
//                   open={open}
//                   onClick={handleClose}
//                 >
//                   <CircularProgress color="inherit" />
//                 </Backdrop>
//               </div>
//               <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",cursor:"pointer"}}>or <Link onClick={handleToggle}>Login</Link></div>
//             </form>
//           )}
//         </div>
//       </Box>
//     </Container>
//   )
// }
