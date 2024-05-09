import React, { useEffect, useState } from "react";
import defaultProfilePic from "../images/user.png";
import { Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { add_complaint, get_all_complaints, get_my_complaints } from "../redux/complaintSlice";
import axios from "axios";
import { toast } from "react-toastify";
import Complaintcard from "./Complaintcard";
import Error from "./Error";
import { redirect_to_dashboard } from "../redux/studentSlice";
// import menu from "../images/menu.png"
import Footer from "./Footer";
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


const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFeedBack, setShowFeedback] = useState(false);
  const [ShowPayment, setShowPayment] = useState(false);
  const [ShowBill, setShowBill] = useState(false);
  const studentData = useSelector((state) => state.students);
  const wardenData = useSelector((state) => state.wardens);
  const [showMyComplaints, setShowMyComplaints] = useState(true);
  const [morningRating, setMorningRating] = useState(2);
  const [lunchRating, setLunchRating] = useState(2);
  const [eveningRating, setEveningRating] = useState(2);
  const [dinnerRating, setDinnerRating] = useState(2);
  const [amount,setAmount] = useState();
  const [stAmount,setstAmount] = useState();
  const menu = wardenData.menu;
  const myComplaints = useSelector((state) => state.complaints.myComplaints);
  const allComplaints = useSelector((state) => state.complaints.complaints);

  console.log("allcomplaints",allComplaints);
  console.log(myComplaints);

  const dispatch = useDispatch();

  const [title, settitle] = useState("");
  const [description, setDescription] = useState("");
  const [proofImage, setProofImage] = useState();
  const studentName = studentData.name;
  const studentEmail = studentData.email;
  const studentAmount = studentData.Amount;
  console.log("dashboard-",studentAmount);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const openFeedback = () => setShowFeedback(true);
  const closeFeedback = () => setShowFeedback(false);

  //give feedback
  const handleFeedback = (e) => {
    e.preventDefault();
    
    const adjustedRatings = [
        morningRating - 1,
        lunchRating - 1,
        eveningRating - 1,
        dinnerRating - 1
    ];

    console.log("Adjusted Ratings:", adjustedRatings);

    axios.post(`${process.env.REACT_APP_BACK_END_URL}/student/giveFeedback`, {
        ratings: adjustedRatings
    },{
      headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
      }
  })
    .then((res) => {
        console.log(res.data);
        if(res.data.status===200)
          toast.success("Feedback successfully submitted!");
        else
          toast.error(res.data.data.message)
    })
    .catch((err) => {
        console.error(err);
        toast.error("Failed to submit feedback");
    });
    closeFeedback();
};


  const openPayment = () => setShowPayment(true);
  const closePayment = () => setShowPayment(false);

  const [bills,setBills] = useState([]);
  const [date,setDate] = useState("");
  const openBill = () => setShowBill(true);
  const closeBill = () => setShowBill(false);

  const handleBills = (e) =>{
    e.preventDefault();
    console.log(date)
    console.log(typeof date)
    axios.post(`${process.env.REACT_APP_BACK_END_URL}/student/getBills`,
      {date: date},
    ).then(res => {
      setBills(res.data.data);
      console.log("Response:", res.data.data);
  })
  .catch(err => {
      console.error("Error fetching bills:", err);
  });
  }
  

  useEffect(() => {
    fetchComplaintData();
    const intervalId = setInterval(fetchComplaintData, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const fetchComplaintData = () => {
    const authToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = authToken;

    axios
      .get(`${process.env.REACT_APP_BACK_END_URL}/student/dashboard`)
      .then((response) => {
        // console.log(response);
        // console.log("IOJSIOJFPOAJPOSJ")
        // console.log(response)
        if (response.data.status === 200) {
          const studentData = response.data.data;
          // console.log(studentData.name,studentData.email,studentData.regNo,studentData.hostelName);
          if(studentData.feePaid===true){
            axios.get(`${process.env.REACT_APP_BACK_END_URL}/student/hostelExpensePerPerson`).then((response)=>{
              setstAmount(studentData.feeAmount-response.data.data.expense)
            }).catch((error)=>{
              setstAmount(undefined)
              console.log("error"+error);
            })
          }
          else{
            setstAmount(undefined);
          }
          dispatch(
            redirect_to_dashboard({
              name : studentData.name,
              email: studentData.email,
              regNo: studentData.regNo,
              hostelName: studentData.hostelName,
              roomNo: studentData.roomNo,
              token: localStorage.getItem('token')
            })
          )
          dispatch(
            get_all_complaints({
              complaints: studentData.complaints,
            })
          );
          dispatch(
            get_my_complaints({
              myComplaints: studentData.myComplaints,
            })
          );
        } else {
          toast.error("Can't log in!");
          console.log("Error occured on refreshing");
        }
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        toast.error("Error fetching student data");
      });
  };


  const handleComplaint = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/student/addComplaint`, {
        title,
        description,
        proofImage,
        studentName,
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(add_complaint(res.data.data));
        toast.success("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handlePayment = async (e) => {
    e.preventDefault();
    const { data: { key } } = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/getkey`);
    // console.log("amount",amount);
    const { data: { order } } = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/checkout`, {
        amount
    })
    // console.log("KEY:",key)
    // console.log(order);
    const options = {
        key:key,
        amount: order.amount,
        currency: "INR",
        name: "Mess Payment",
        description: "Mess Fees Payment",
        order_id: order.id,
        // callback_url: "http://localhost:5500/paymentverification",
        handler: async function(response) {
          
          const body = {...response,}

          const validateResponse = await fetch(`${process.env.REACT_APP_BACK_END_URL}/paymentverification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          },
          body: JSON.stringify(body)
          })

          const jsonResponse = await validateResponse.json();

          console.log('jsonResponse', jsonResponse);
          if(jsonResponse.status===200){
            toast.success("Payment successfull");
          }
        },
        prefill: {
            name: {studentName},
            email: {studentEmail},
            contact: "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#001F3F",
    color: "white",
  };

  const heading = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "20px",
    borderRadius: "10px",
    // border: "2px solid rgba(255, 255, 255, 0.3)",
  };

  const profilePicStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const inputStyle = {
    border: "none",
    borderBottom: "2px solid #001F3F",
    backgroundColor: "transparent",
    color: "black",
    outline: "none",
    width: "100%",
    marginBottom: "10px",
    paddingTop: "5px",
  };

  useSelector((state)=>{
    // console.log(state);
  })
  const isAuthenticatedStudent = useSelector(
    (state) => state.students.token!==null
  );

  const authToken = localStorage.getItem('token');
  // console.log("Localstorage : "+authToken);
  // console.log("store : "+isAuthenticatedStudent);

    
    if(localStorage.getItem('token')!==null && isAuthenticatedStudent)
    return (
      <div style={pageStyle}>
        <div className="container mt-3 shadow-lg" style={heading}>
          <div className="row">
            <div className="col-md-6" align="left">
            {/* <div className="col-md-1 d-flex justify-content-center align-items-center"> */}
              <img
                src={defaultProfilePic}
                alt="Profile"
                style={profilePicStyle}
              />
            {/* </div> */}
              <p style={{marginTop:'2px',marginBottom:'2px'}}>Name: {studentData.name}</p>
              <p>Registration Number: {studentData.regNo}</p>
            </div>
            <div className="col-md-6" align="right">
              <span style={{ fontSize: "25px" }}>
                Hostel Name : {studentData.hostelName}{" "}
                <p style={{ fontSize: "18px" }}>
                  Room No: {studentData.roomNo}
                </p>
                <p style={{ fontSize: "18px" }}>
                  Amount left: <b style={{color:'Highlight'}}>{stAmount?stAmount:"NA"}</b>
                </p>
              </span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="justify-content-left m-2">
            {/* <div className="col-md-6 p-2 m-2"> */}
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={() => setShowMyComplaints(false)}
              >
                All Complaints
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={() => setShowMyComplaints(true)}
              >
                My Complaints
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                onClick={openMenu}
              >
                View Mess Menu
              </button>
              <button
                className="btn btn-primary m-1 shadow-lg"
                style={{ bottom: "180px", right: "20px" }}
                onClick={openModal}
              >
                Add Complaint
              </button>
              <button className="btn btn-primary m-1 shadow-lg"
                style={{ bottom: "180px", right: "20px" }} onClick={openFeedback}>
               Add Feedback
              </button>
              <button className="btn btn-primary m-1 shadow-lg"
                style={{ bottom: "180px", right: "20px" }} onClick={openPayment}>
               Make Payment
              </button>
              <button className="btn btn-primary m-1 shadow-lg"
                style={{ bottom: "180px", right: "20px" }} onClick={openBill}>
               See Bill 
              </button>
            {/* </div> */}
          </div>
        </div>

        <div className="container mt-5 mb-5">
          <div className="row">
            <h2 className="text-center" style={{ color: "skyblue" }}>
              {showMyComplaints ? "My Complaints" : "All Complaints"}
            </h2>

            {showMyComplaints
              ? myComplaints.myComplaints &&
                myComplaints.myComplaints.length > 0
                ? myComplaints.myComplaints.map((complaint, index) => (
                    <div key={index} className="col-md-6">
                      <Complaintcard
                        complaint={complaint}
                        showMyComplaints={showMyComplaints}
                        // onDelete={handleDelete(complaint.id)}
                      />
                    </div>
                  ))
                : <p className='text-warning text-center'>You have made no complaints yet</p>
              : allComplaints.complaints &&
                allComplaints.complaints.length > 0
              ? allComplaints.complaints.map((complaint, index) => (
                  <div key={index} className="col-md-6">
                    <Complaintcard
                      complaint={complaint}
                      showMyComplaints={showMyComplaints}
                    />
                  </div>
                ))
              : <p className='text-warning text-center'>No complaints available</p>}
          </div>
        </div>

        <div className="flex-grow-1"></div>

        
    <Modal show={showModal} onHide={closeModal}>
      <form onSubmit={handleComplaint} style={{backgroundColor:'#0a487f',color:'white'}}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Add new complaint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ display: 'block', marginBottom: '10px' }}>Title:</label>
          <input
            type="text"
            placeholder="Title"
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
            onChange={(e) => settitle(e.target.value)}
          />

          <label style={{ display: 'block', marginBottom: '10px' }}>Description:</label>
          <textarea
            type="text"
            placeholder="Description"
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="imageUpload" style={{ display: 'block', marginBottom: '10px' }}>Upload image if any:</label>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            style={{ marginBottom: '15px' }}
            onChange={(e) => setProofImage(e.target.files[0])}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" onClick={closeModal} style={{ borderRadius: '5px',backgroundColor:'#042645' }}>
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>

    <Modal show={showMenu} onHide={closeMenu} size="lg" >
      <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
        <Modal.Title className="text-center" style={{ fontSize: '20px' }}>Mess Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{backgroundColor:'#0a487f',color:'white'}}>
        <p style={{ marginBottom: '15px', fontSize: '16px' }}>Mess Menu for {studentData.hostelName} Hostel</p>
        <img src={menu} alt="Hostel Image" style={{ width: '100%', height: 'auto', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
      </Modal.Body>
    </Modal>
    <Footer/>
    <Modal show={showFeedBack} onHide={closeFeedback}>
        <form onSubmit={handleFeedback}>
          <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
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

      <Modal show={ShowPayment} onHide={closePayment}>
      <form onSubmit={handlePayment} style={{backgroundColor:'#0a487f',color:'white'}}>
        <Modal.Header closeButton style={{backgroundColor:'rgb(30, 6, 97)',color:'white'}}>
          <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label style={{ display: 'block', marginBottom: '10px' }}>Amount:</label>
          <input
            type="number"
            placeholder="Amount"
            style={{ width: '100%', padding: '8px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ddd' }}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" type="submit" style={{ borderRadius: '5px',backgroundColor:'#042645' }}>
            Submit
          </Button>
        </Modal.Footer>
      </form>
    </Modal>

    <Modal show={ShowBill} onHide={closeBill}>
    <form onSubmit={handleBills}>
          <Modal.Header closeButton style={{ backgroundColor: 'rgb(10, 91, 145)', color: 'white' }}>
            <Modal.Title style={{ textAlign: 'center', fontSize: '20px' }}>See Bills:</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{backgroundColor:'#087bb3d4'}}>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <label>Date: </label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                style={{ marginRight: 10 }}
              />
            </div>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',margin:'2px'}}>
              <Button type="submit" className="mt-2">Show Bills</Button>
            </div>
            <div style={{ margin: '10px 0' }}>
            {bills.length > 0 ? (
                bills.map((bill, index) => (
                  <div key={index} style={{ padding: '10px', backgroundColor: '#fff', marginBottom: '5px', borderRadius: '5px' }}>
                    <p><strong>Amount:</strong> ${bill.amount}</p>
                    <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
                    <p><strong>Receipt:</strong> <a href={bill.image_url} target="_blank" rel="noopener noreferrer">View Image</a></p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', padding: '20px' }}>No bills found for the selected date.</p>
              )}
            </div>
          </Modal.Body>
        </form>
    </Modal>
      </div>
    );
    return <Error/>
};
export default Dashboard;