import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {createBrowserRouter, RouterProvider, Route} from "react-router-dom";
import Register from './routes/Register.jsx';
import Login from './routes/Login.jsx';

import {UserContextProvider} from "./context/UserContext.jsx"
import Appointments from './routes/Appointments.jsx';
import BookAppointment from './routes/BookAppointment.jsx';
import EditProfile from './routes/EditProfile.jsx';
import EditBook from './routes/EditBook.jsx';

//middleware
import PrivateRoutes from './middleWare/PrivateRoutes.jsx';


import ForgotPassword from './routes/ForgotPassword.jsx';
import ResetPassword from './routes/ResetPassword.jsx';
import BarberLogin from './routes/BarberLogin.jsx';
import BarberAppointments from './routes/BarberAppointments.jsx';
import ScheduleControl from './routes/ScheduleControl.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [ 
      {
        path: "/",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
       {
        path: "/appointments",
        element: <PrivateRoutes><Appointments/></PrivateRoutes>,
      },
       {
        path: "/bookappointment",
        element: <PrivateRoutes><BookAppointment/></PrivateRoutes>,
      },
       {
        path: "/edit",
        element: <PrivateRoutes><EditProfile/></PrivateRoutes>,
      },
       {
        path: "/editbook/:id",
        element: <PrivateRoutes><EditBook/></PrivateRoutes>,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPassword/>
      },
       {
        path: "/resetpassword",
        element: <ResetPassword/>
      }, 
      {
        path: "/barber/login",
        element: <BarberLogin/>
      },
        {
        path: "/barber/appointments",
        element: <PrivateRoutes><BarberAppointments/></PrivateRoutes>
      },
        {
        path: "/barber/schedulecontrol",
        element: <PrivateRoutes><ScheduleControl/></PrivateRoutes>
      }



    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
  </StrictMode>,
)
