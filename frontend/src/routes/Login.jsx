import "./Login.css"

import api from "../axios/api"
import { useState, useContext} from "react"

import {toast} from "react-toastify";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();


  const { login}= useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

 const user = {
  email, 
  password
 }

 setLoading(true);

 try {
  const response = await api.post("user/login", user)
  const token = response.data.token
  
  if(response && token) {
    login(token);
    toast.success(response.data.message)
    navigate("/appointments")
    setLoading(false);
  }
  
 } catch (error) {
  toast.error(error.response.data.message);
  if(error) setLoading(false);
  
 }


}


  return (
    <div>
   <div className="login-container">
      <div className="login-banner">
          <div className="banner-layer">
            <h1>Seja bem-vindo</h1>
          </div>
          
        </div>
        <div className="login-form">
          <h2>Realize o seu login</h2>
         
      <form onSubmit={handleSubmit}>
        
           <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="text"  name='email' placeholder='Insira um email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
    
           <div className="form-control">
          <label htmlFor="password">Senha:</label>
          <input type={showPassword ? "text" : "password"} name='password' placeholder='Insira uma senha'value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
           <p className="no-account"><Link to={"/"}>Não tem uma conta?</Link></p>
               <p className="forgot-password"><Link to={"/forgotpassword"}>Esqueceu a senha?</Link></p>
        <input type="submit" value={loading ? "Carregando..." : "Entrar"}className="btn-login"/>
      </form>
      <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)}/>
      <p>Mostrar senha</p>
   
     </div>
         </div>
    </div>
  )
}

export default Login