import api from "../axios/api"
import { useState } from "react"
import {toast} from "react-toastify"
import "./ResetPassword.css"
import {useLocation} from "react-router-dom";
import error from "../imgs/errorsvg.svg"


const ResetPassword = () => {

  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
 const tokenFromURL = new URLSearchParams(location.search).get("token");
 const [showPassword, setShowPassword] = useState(false);


   

  const handleResetPassword = async (e) => {
    e.preventDefault();
  const newPassword = {
  newpassword,
  confirmpassword
};

setLoading(true);
    try {
      const response = await api.post("user/resetpassword", newPassword, {
        headers: {
          Authorization: `Bearer ${tokenFromURL}`
        }
       
      })


      if(response) {
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setLoading(false);
    }
  }


 return ( 
  <div className='forgot-password-container'>
    {tokenFromURL ? (
      <>
        <h2>Realize a atualização da Senha</h2>
        <form onSubmit={handleResetPassword}>
          <div className="reset-form">
            <label htmlFor="newpassword">Nova senha:</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Insira a nova senha' 
              name="newpassword" 
              value={newpassword} 
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="confirmpassword">Confirmação da nova senha:</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder='Confirme a nova senha' 
              name="confirmpassword" 
              value={confirmpassword} 
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <input 
              type="submit" 
              value={loading ? "Alterando..." : "Alterar senha"} 
              className="reset-btn"
            />
          </div>
        </form>
        <div className="showpassword-container">
          <input 
            type="checkbox" 
            checked={showPassword} 
            onChange={() => setShowPassword((prev) => !prev)}
          />
          <p>Mostrar senha</p>
        </div>
      </>
    ) : (
      <div className="token-error">
      <h2>Não há um Token válido para realizar a alteração da senha</h2>
      <p>Clique na opção "Esqueceu senha" para acessar corretamente esta página.</p>
      <img src={error} alt="error" className="error-svg"/>
      </div>
    )}
  </div>
);

}

export default ResetPassword