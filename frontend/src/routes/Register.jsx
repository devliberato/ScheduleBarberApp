import "./Register.css"
import api from "../axios/api"
import { useState } from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom"

const Register = () => {


const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmpassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  const user = {
    name,
    email,
    phone, 
    password,
    confirmpassword
  }
 setLoading(true);


 
  try {
    const response = await api.post("user/register", user);

    if(response) {

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmpassword("");
      toast.success(response.data.message);
      setLoading(false);
    } 

    
   

    
  }

  
  catch (error) {
    toast.error(error.response.data.message || "Não foi possivel realizar o registro!");
    if(error) setLoading(false);
    
  }


}



  return (
    <div>
      <div className="register-container">
      <div className="register-banner">
          <div className="banner-layer">
            <h1>Seja bem-vindo</h1>
          </div>
          
        </div>
        <div className="register-form">
          <h2>Crie agora a sua conta</h2>
          <p>E faça seu primeiro agendamento</p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Nome:</label>
          <input type="text" name='name' placeholder='Insira o seu nome' value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
           <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' placeholder='Insira um email' value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
          <div className="form-control">
          <label htmlFor="phone">Telefone:</label>
          <input type="text" name='phone' placeholder='Número de telefone, exemplo: 7190000-0000' value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
           <div className="form-control">
          <label htmlFor="password">Senha:</label>
          <input type={showPassword ? "text" : "password"}  name='password' placeholder='Insira uma senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
           <div className="form-control">
          <label htmlFor="confirmpassword">Confirmação de Senha:</label>
          <input type={showPassword ? "text" : "password"} name='confirmpassword' placeholder='Faça a confirmação da senha ' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
          
        </div>
        <p className="account-already"><Link to={"/login"}>Já possui cadastro?</Link></p>
        <input type="submit" value={loading ? "Carregando..." : "Registrar"} className="register-btn"/>
        
      </form>
      <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)}/>
      <p>Mostrar senha</p>
     </div>
         </div>
    </div>
  )
}

export default Register