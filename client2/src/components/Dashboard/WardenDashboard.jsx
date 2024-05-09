import React, { useState } from 'react';
// import Navbar from './Navbar';
import defaultProfilePic from '../../images/user.png';
// import Footer from './Footer';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux'
import { add_complaint,get_all_complaints,get_my_complaints } from '../../redux/complaintSlice';
import { menu_uploaded } from '../../redux/wardenSlice';
import axios from 'axios';
import Error from '../Error';
import Complaintcard from '../Complaintcard';
import { toast } from 'react-toastify';
import { Typography } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import Char from '../Char';



const WardenDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [updateMenu, setUpdateMenu] = useState(false);
  const [messMenuImageUrl, setMessMenuImageUrl] = useState('');
  const [showFeedback,setShowFeedback] = useState(false);
  const wardenData = useSelector((state) => state.wardens);
  const [showAllComplaints, setShowAllComplaints] = useState(true);
  const [fromDate, setFromDate] = useState(new Date().toISOString().split('T')[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);

  // const myComplaints = useSelector((state) => state.complaints.myComplaints);
  const allComplaints = useSelector((state) => state.complaints.complaints);
  // console.log("allcomplaints-",allComplaints.complaints);
  // console.log(myComplaints.myComplaints);

  const authToken = localStorage.getItem('token');



  // const [complaintlist,setComplaintlist] = useState(true);

  // const openList =()=> {
  //   setComplaintlist(!complaintlist);
  // }


  const [title,settitle] = useState('');
  const [description,setDescription] = useState('');
  const [proofImage,setProofImage] = useState();
  const [file,setFile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const studentName = wardenData.name;
  const dispatch = useDispatch();

  // console.log(wardenData);

  //Menu updatation
  const uploadImg = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/fileUpload/`, formData)
      .then(res => {
        dispatch(menu_uploaded(res.data.data.url));
        setUpdateMenu(false);
        toast.success('Menu updated successfully');
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
  const [feedBacks,setFeedBacks]=useState([]);
  const handleFetchFeedback = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/getFeedback`,
      fromDate,
      toDate
    ).then( res =>{
      setFeedBacks(res.data.data.feedbacks);
      console.log("respond",feedBacks);
    })
  };

  const pageStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#001F3F',
    color: 'white',
  };

  const heading = {
    display:'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '5px',
    borderRadius: '10px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
  };

  const profilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  };


  const openMenu = () => {
    setShowMenu(true);
    console.log(wardenData.menu);
    setMessMenuImageUrl(wardenData.menu);
  };
  const closeMenu = () => setShowMenu(false);
  const openFeedback = () => setShowFeedback(true);
  const closeFeedback = () => setShowFeedback(false);
  const openUpdateMenu = () => setUpdateMenu(true);
  const closeUpdateMenu = () => setUpdateMenu(false);
  const openBill = () => setShowBill(true);
  const closeBill = () => setShowBill(false);
  const [billAmount, setBillAmount] = useState("");
  const [billFile, setBillFile] = useState();

  // Function to handle bill upload
  const uploadBill = (e) => {
    e.preventDefault();
    if (!billFile || !billAmount) {
        toast.error("Please enter all bill details.");
        return;
    }

    setIsLoading(true);

    // Step 1: Upload the file first
    const formData = new FormData();
    formData.append('file', billFile);

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/fileUpload/`, formData)
        .then(res => {
            console.log(res.data.data);
            const fileUrl = res.data.data; 

            // console.log("fileurl",fileUrl.url);
            
            const billData = {
                billFile: fileUrl.url,
                billAmount: billAmount
            };

            console.log("bill-",billData);
            return axios.post(`${process.env.REACT_APP_BACK_END_URL}/warden/uploadBill`, billData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
        })
        .then(response => {
          console.log(response);
            toast.success('Bill added successfully');
            setBillFile(null);
            setBillAmount("");
            setShowBill(false);
        })
        .catch(err => {
            console.error(err);
            toast.error('Error uploading bill');
        })
        .finally(() => {
            setIsLoading(false);
        });
};


  

  return (
    <div style={pageStyle}>
      <div className="container mt-5" style={heading}>
          <div className="col-md-6 mt-2">
            <span style={{ fontSize: '30px' }}>Hostel Name : {wardenData.hostel}</span> 

          </div>
          <div className="col-md-5 mt-3" align="right">
                       <h3>Warden Name: {wardenData.name}</h3>
          </div>
          <div className="col-md-1  d-flex justify-content-center align-items-center">
            <img src={defaultProfilePic} alt="Profile" style={profilePicStyle} />
          </div>
      </div>

      <div className="container">
        <div className="row justify-content-left">
            <div className="col-md-6 p-2 m-2">
                <button className='btn btn-primary m-1' onClick={openMenu}>View Mess Menu</button>
                <button className='btn btn-primary m-1' onClick={openUpdateMenu}>Update Mess Menu</button>
                <button className='btn btn-primary m-1' onClick={openFeedback}>Feedbacks</button>
                <button className='btn btn-primary m-1' onClick={openBill}>Bill Add</button>
            </div>
        </div>
      </div>

      <div className="container mb-5">
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <p style={{fontWeight:500,fontSize:'20px',borderBottom:'1px solid white'}}>All Complaints</p>
        </div>
        <div className="row">
          {showAllComplaints && allComplaints && allComplaints.allComplaints
            ? allComplaints.allComplaints.map((complaint, index) => (
                <div key={index} className="col-md-6">
                  <Complaintcard complaint={complaint} allComplaints={allComplaints} />
                </div>
              ))
            : allComplaints && allComplaints.complaints
            ? allComplaints.complaints.map((complaint, index) => (
                <div key={index} className="col-md-6">
                  <Complaintcard complaint={complaint} allComplaints={allComplaints} />
                </div>
              ))
            : <p>No complaints to display</p>
          }
        </div>
      </div>
      <div className="flex-grow-1"></div>

      <Modal show={showMenu} onHide={closeMenu}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title>Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
          {messMenuImageUrl ? <img src={messMenuImageUrl} alt="Mess Menu" style={{ width: '100%' }} /> : <p>No image available</p>}
        </Modal.Body>
      </Modal>

      <Modal show={updateMenu} onHide={closeUpdateMenu}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title className='text-center'>Update Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
          <label>Upload image of new mess menu</label><br /><br />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{backgroundColor:'#0a487f',color:'white'}}>
          <Button disabled={isLoading} onClick={uploadImg}>Update</Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showFeedback} onHide={closeFeedback}>
        <form onSubmit={handleFetchFeedback}>
          <Modal.Header closeButton style={{ backgroundColor: 'rgb(10, 91, 145)', color: 'white' }}>
            <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Daily Ratings:</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#087bb3d4'}}>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <label>From: </label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                style={{ marginRight: 10 }}
              />
              <label>To: </label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
              />
            </div>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <Button type="submit" className="mt-2">Show Ratings</Button>
            </div>
            <Char feedbacks={feedBacks} />
          </Modal.Body>
        </form>
      </Modal>
      
      <Modal show={showBill} onHide={closeBill}>
      <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
        <Modal.Title className='text-center'>Add Bill</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
        <form onSubmit={uploadBill}>
          <label>Bill Amount</label><br />
          <input
            type="number"
            value={billAmount}
            onChange={e => setBillAmount(e.target.value)}
            placeholder="Enter amount"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <label>Upload Bill Image</label><br />
          <input type="file" accept="image/*" onChange={e => setBillFile(e.target.files[0])} style={{marginBottom:'5px'}}/>
          {isLoading && (
            <div className="text-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          <Modal.Footer style={{backgroundColor:'#0a487f',color:'white'}}>
            <Button type="submit" disabled={isLoading}>Add Bill</Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
    </div>
  );
};

export default WardenDashboard;