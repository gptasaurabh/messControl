import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import { motion } from "framer-motion"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import Navheader from './Navheader';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate=useNavigate();
  const handleLoginClick = () => {
    // navigate("/login");
    // navigate("/userprofile");
    navigate("/adminprofile");
  };

  return (
    <>
    <Navheader/>
    <Container maxWidth="sm" className='content'>
        <div className='container-data'>
          <Card sx={{ minWidth: 500, height:300, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column",borderRadius:"57px", boxShadow: "0px 4px 8px rgba(11, 10, 10, 0.52)" }}>
            <CardContent>
              <div style={{display: "flex" , justifyContent:"center",alignItems:"center"}}>
                <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom style={{alignItems:'center'}}>
                  Wellcome user
                </Typography>
              </div>
              <Typography variant="h5" component="div">
              </Typography>
              <div style={{display: "flex" , justifyContent:"center",alignItems:"center"}}>
                <Typography sx={{ fontSize: 28 }} color="text.secondary" gutterBottom style={{alignItems:'center'}}>
                  Let Us Know Your Problems
                </Typography>
              </div>
            </CardContent>
            <motion.div className='button-to-go' whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} whileTap={{ scale: 0.9 }}>
            <CardActions>
              <Button variant="contained" endIcon={<SendIcon />} onClick={handleLoginClick}>
                Drop complaint
              </Button>
            </CardActions>
            </motion.div>
          </Card>
        </div>
    </Container>
  </>
  )
}
