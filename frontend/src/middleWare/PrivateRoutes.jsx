import { useContext } from "react"
import {UserContext} from "../context/UserContext"
import { Navigate } from "react-router-dom"

const PrivateRoutes = ({children}) => {

const {authenticated} = useContext(UserContext)

if(!authenticated) {
return <Navigate to="/login"/>
}

  return children
  
}

export default PrivateRoutes