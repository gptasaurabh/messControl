import './App.css';
import Home from './component/Home';
import Navheader from './component/Navheader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userprofile from './component/Userprofile';
import Admindashboard from './component/Admindashboard';
import Login from './component/Login';
import Adminlogin from './component/Adminlogin';
import { Route, Routes } from 'react-router-dom';
import Char from './Char';

function App() {
  return (
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Char />} />
          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<Adminlogin/>} />
          <Route path="/userprofile" element={<Userprofile />} />
          <Route path="/adminprofile" element={<Admindashboard />} />
        </Routes>
      </div>
    // <div className="App">
    //   <div className="Home">
    //     <Home/>
    //   </div>
    //   {/* <Navheader/> */}
    //   {/* <Login/> */}
    //   {/* <Userprofile/> */}
    // </div>
  );
}

export default App;
