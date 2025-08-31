import { createContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export const UserContext = createContext();

export const UserContextProvider = ({children}) => {

const [authenticated, setAuthenticaded] = useState(false);
const [decoded, setDecoded] = useState(false);


useEffect(() => {
const token = localStorage.getItem("token");


if(!token) {
    setAuthenticaded(false);
    setDecoded(false);
    return
}
  try {
     if(token) {
         const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
     }
   
    } catch (error) {
 
      setAuthenticated(false);
      setDecoded(null);

    }




}, [])





const login = (token) => {
    localStorage.setItem("token", token)
    if(token) {
    setAuthenticaded(true);
         const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
    }
}




const logout = () => {
    localStorage.removeItem("token");
    setAuthenticaded(false);
    setDecoded(false);
}

return (
    <UserContext.Provider value={{authenticated, login, logout, decoded}}>
        {children}
    </UserContext.Provider>
)

}