import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


import {ToastContainer} from "react-toastify";

import "react-toastify/dist/ReactToastify.css"

function App() {


  return (
    <div>
      <Navbar/>
      <ToastContainer
      position='top-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      
      />
      <div className="container">
     <Outlet/>
     </div>
     <Footer/>
    </div>
  )
}

export default App
