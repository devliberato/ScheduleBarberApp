import api from "../axios/api"
import { useState } from "react"
import {toast} from "react-toastify"

import "./ForgotPassword.css"


const ForgotPassword = () => {

const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);


const handleForgotPasswordSubmit = async (e) => {
e.preventDefault();
const user = {
  email: email
}

setLoading(true);
 try {

  const response = await api.post(`user/forgotpassword`, user);
  if(response) {
    setEmail("");
    toast.success(response.data.message)
    setLoading(false);
  }
  
 } catch (error) {
  toast.error(error.response.data.message)
  setLoading(false);
 }


}


  return (
    <div className='forgot-password-container'>
      <h2>Insira o e-mail para a recuperação de senha</h2>
    <form onSubmit={handleForgotPasswordSubmit}>
        <div className="forgot-form">
            <input type="text" placeholder='Insira seu e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="submit" value={loading ? "Enviando..." : "Enviar"} className="forgot-btn"/>
        </div>
    </form>
    </div>
  )
}

export default ForgotPassword