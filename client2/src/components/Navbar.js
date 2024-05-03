import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { logoutStudent } from '../redux/studentSlice';
import { logoutWarden } from '../redux/wardenSlice';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});




const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [morningRating, setMorningRating] = useState(2);
  const [lunchRating, setLunchRating] = useState(2);
  const [eveningRating, setEveningRating] = useState(2);
  const [dinnerRating, setDinnerRating] = useState(2);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleComplaint = (e) => {
    e.preventDefault();
    //send data to server
    console.log({
      morningRating,
      lunchRating,
      eveningRating,
      dinnerRating
    });
    closeModal();
  }

  useSelector((state)=>{
    console.log(state);
  })

  const wToken = useSelector((state)=> state.wardens);
  console.log(wToken);
  const isAuthenticatedStudent = useSelector((state) => state.students.token !== null);
  const isAuthenticatedWarden = useSelector((state) => state.wardens.token !== null);

  const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = undefined;
    localStorage.removeItem('token');
    axios.post('http://localhost:5500/logout')
    .then((res) => {
      console.log("Logged out successfully");
      if (isAuthenticatedStudent) {
        dispatch(logoutStudent());
      }
      if (isAuthenticatedWarden) {
        dispatch(logoutWarden());
      }
      navigate('/');
    })
    .catch((err) => {
      console.error("Error logging out:", err);
    });
  };

  const [isHovered, setIsHovered] = React.useState(null);

  const handleMouseEnter = (link) => {
    setIsHovered(link);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <>
      <div style={displayNavbar}>
        <nav style={navbarStyle} className="text-light">
          <div className="logo">
            <h2>
              <span>MESS</span>
              <span style={{ backgroundColor: 'skyblue', color: 'black', borderRadius: '8px', marginLeft: '4px' }}>BLITZ</span>
            </h2>
          </div>
          <div className="nav-links p-2 text-light">
            {((location.pathname === '/dashboard' && isAuthenticatedStudent) || (location.pathname==='/warden') && isAuthenticatedWarden) ? (
              // If on the dashboard, show Logout tab
              <>
              <button className="text-light" style={logoutStyle} onClick={handleLogout}>
                Logout
              </button>
              <button className="text-light" style={logoutStyle} onClick={openModal}>
              Feedback
            </button>
            </>
            ) : (
              // If not authenticated or not on the dashboard, show Home, Register, and Login tabs
              <>
                {/* <Link to="/" style={linkStyle}>
                  Home
                </Link>
                <Link to="/contributors" style={linkStyle}>
                  Contributors
                </Link>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link> */}

                <Link
        to="/"
        style={{
          ...linkStyle,
          color: isHovered === '/' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/')}
        onMouseLeave={handleMouseLeave}
      >
        Home
      </Link>
      <Link
        to="/contributors"
        style={{
          ...linkStyle,
          color: isHovered === '/contributors' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/contributors')}
        onMouseLeave={handleMouseLeave}
      >
        Contributors
      </Link>
      <Link
        to="/register"
        style={{
          ...linkStyle,
          color: isHovered === '/register' ? linkStyle.hover.color : linkStyle.color,
        }}
        onMouseEnter={() => handleMouseEnter('/register')}
        onMouseLeave={handleMouseLeave}
      >
        Register
      </Link>
                
                <select
                  style={selectStyle}
                  onChange={(e) => (window.location.href = e.target.value)}
                  className="text-center"
                >
                  <option value="#login" disabled selected hidden>
                    Login
                  </option>
                  <option className="text-light" style={optionStyle}>
                    <Link to="/admin">Admin</Link>
                  </option>
                  <option className="text-light" style={optionStyle}>
                    <Link to="/student">Student</Link>
                  </option>
                </select>
              </>
            )}
          </div>
        </nav>
      </div>
      <div style={{ paddingTop: '80px' }}>{/*  */}</div>

      <Modal show={showModal} onHide={closeModal}>
        <form onSubmit={handleComplaint}>
          <Modal.Header closeButton style={{ backgroundColor: '#3498db', color: 'white' }}>
            <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Give your feedback:</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#2d4e6b',color:'whitesmoke'}}>
            <Typography component="legend">Morning Breakfast:</Typography>
            <StyledRating
              name="morning"
              value={morningRating}
              onChange={(event, newValue) => {
                setMorningRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Lunch:</Typography>
            <StyledRating
              name="lunch"
              value={lunchRating}
              onChange={(event, newValue) => {
                setLunchRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Evening Breakfast:</Typography>
            <StyledRating
              name="evening"
              value={eveningRating}
              onChange={(event, newValue) => {
                setEveningRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            /><br/>
            <Typography component="legend">Dinner:</Typography>
            <StyledRating
              name="dinner"
              value={dinnerRating}
              onChange={(event, newValue) => {
                setDinnerRating(newValue);
              }}
              icon={<FavoriteIcon fontSize="inherit" />}
              emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
            />
          </Modal.Body>
          <Modal.Footer style={{backgroundColor:'#285780'}}>
            <Button variant="success" type="submit" style={{ borderRadius: '5px',backgroundColor:'#042645' }}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

    </>
  );
};

const displayNavbar = {
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '80px',
  backgroundColor: '#001F3F',
  opacity: 1,
  zIndex: 1,
};

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
};


const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  fontSize: '18px',
  padding: '10px',

  hover: {
    color : 'skyblue'
  },
};

const selectStyle = {
  color: 'white',
  backgroundColor: '#001F3F',
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  marginLeft: '20px',
  marginRight: '20px',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
};

const optionStyle = {
  color: 'black',
};

const logoutStyle = {
  color: 'white',
  backgroundColor: '#001F3F',
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  marginLeft: '20px',
  marginRight: '20px',
  cursor: 'pointer',
};

export default Navbar;
