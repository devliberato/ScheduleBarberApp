import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../axios/api";
import "./EditProfile.css"
const EditProfile = () => {


const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmpassword, setConfirmpassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

const token = localStorage.getItem("token")

useEffect(() => {
  const getUser = async () => {

  try {
      const response = await api.get("user/checkuser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
        
      });
      const data = await response.data;
      console.log(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);

    }
   catch (error) {
    toast.error(error.response.data.message)
    
  }
}

getUser();

}, [])

const handleSubmitEdit = async(e) => {
 e.preventDefault();

 const editedUser = {
  name,
  email,
  phone,
  password,
  confirmpassword
 }

 try {
  const response = await api.patch("user/edituser", editedUser, {
    headers: {
      Authorization: `Bearer ${token}`
    }
    
  }
)
console.log(response);
if(response) {
  toast.success(response.data.message);

}
  
 } catch (error) {
  toast.error(error.response.data.message);
 }

}



  return (
    <div>
        <div className="edit-container">
        <div className="edit-form">
          <h2>Edite sua conta:</h2>
        
      <form onSubmit={handleSubmitEdit}>
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
          <input type="text" name='phone' placeholder='Insira o número de telefone' value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
           <div className="form-control">
          <label htmlFor="password">Senha:</label>
          <input type={showPassword ? "text" : "password"}  name='password' placeholder='Insira uma senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
           <div className="form-control">
          <label htmlFor="confirmpassword">Confirmação de Senha:</label>
          <input type={showPassword ? "text" : "password"} name='confirmpassword' placeholder='Faça a confirmação da senha ' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
          
        </div>
        
        <input type="submit" value="Editar Conta" className="btn"/>
      </form>
      <div className="showpassword-container">
        <input type="checkbox" className="showpassword-btn" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)}/>
      <p>Mostrar senha</p>
      </div>
     </div>
         </div>
    </div>
  )
}

export default EditProfile