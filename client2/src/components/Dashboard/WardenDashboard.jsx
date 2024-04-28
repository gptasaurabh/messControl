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



const WardenDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [updateMenu, setUpdateMenu] = useState(false);
  const [messMenuImageUrl, setMessMenuImageUrl] = useState('');
  const wardenData = useSelector((state) => state.wardens);
  const [showMyComplaints, setShowMyComplaints] = useState(true);
  const myComplaints = useSelector((state) => state.complaints.myComplaints);
  const allComplaints = useSelector((state) => state.complaints.complaints);
  console.log(allComplaints.complaints);
  console.log(myComplaints.myComplaints);

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

  console.log(wardenData);

  const handleComplaint = (e)=> {
    e.preventDefault();
    axios.post('http://localhost:5500/student/addComplaint',{
      title,
      description,
      proofImage,
      studentName,
      
    }).then((res)=>{
      console.log(res);
      // toast.success('complaint added successfully')
      dispatch(add_complaint(res.data));
      
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }

  const uploadImg = (e) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5500/fileUpload/', formData)
      .then(res => {
        dispatch(menu_uploaded(res.data));
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

  const openUpdateMenu = () => setUpdateMenu(true);
  const closeUpdateMenu = () => setUpdateMenu(false);

  return (
    <div style={pageStyle}>
      {/* <Navbar /> */}
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
                <button className='btn btn-primary m-1' onClick={() => setShowMyComplaints(true)}>All Complaints</button>
                <button className='btn btn-primary m-1' onClick={openMenu}>View Mess Menu</button>
                <button className='btn btn-primary m-1' onClick={openUpdateMenu}>Update Mess Menu</button>
            </div>
        </div>
      </div>

      
      
      
      <div className="container mt-5 mb-5">
  <div className="row">
    {showMyComplaints
      ? myComplaints.myComplaints.map((complaint, index) => (
          <div key={index} className="col-md-6">
            <Complaintcard complaint={complaint} showMyComplaints={showMyComplaints} />
          </div>
        ))
      : allComplaints.complaints.map((complaint, index) => (
          <div key={index} className="col-md-6">
            <Complaintcard complaint={complaint} showMyComplaints={showMyComplaints} />
          </div>
        ))}
        
  </div>
</div>
      
      

      <div className="flex-grow-1"></div>

      

      {/* <Footer /> */}

     

      <Modal show={showMenu} onHide={closeMenu}>
        <Modal.Header closeButton>
          <Modal.Title>Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messMenuImageUrl ? <img src={messMenuImageUrl} alt="Mess Menu" style={{ width: '100%' }} /> : <p>No image available</p>}
        </Modal.Body>
      </Modal>

      <Modal show={updateMenu} onHide={closeUpdateMenu}>
        <Modal.Header closeButton>
          <Modal.Title className='text-center'>Update Mess Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        <Modal.Footer>
          <Button disabled={isLoading} onClick={uploadImg}>Update</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
};

export default WardenDashboard;