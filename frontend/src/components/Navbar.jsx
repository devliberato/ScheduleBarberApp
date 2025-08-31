import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { authenticated, logout, decoded } = useContext(UserContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  

  const isBarber = decoded.role === "barber"



  const [menuActive, setMenuActive] = useState(false);

  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <nav className="navbar">
      <h2>Barbearia</h2>
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
           <span className="bar"></span>
           <span className="bar"></span>
      </div>
      <ul className={menuActive ? "active" : ""}>
        {!authenticated ? (
          <>
               <li><Link to={"/barber/login"}>Sou Barbeiro</Link></li>
            <li>
              <Link to={"/"}>Registrar</Link>
            </li>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
       
          </>
        ) : (
          <>
          {isBarber ? (
            <>
            <li>
              <Link to={"/barber/appointments"}>Ver Agendamentos</Link>
            </li>
            <li>
              <Link to={"/barber/schedulecontrol"}>Controle de Agenda</Link>
            </li>
           
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
            </>
          ) : (
            <>
              <li>
              <Link to={"/appointments"}>Agendamentos</Link>
            </li>
            <li>
              <Link to={"/bookappointment"}>Fazer Agendamento</Link>
            </li>
            <li>
              <Link to={"/edit"}>Editar Perfil</Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
            </>
          )}
          </>
        )}
       
      </ul>
    </nav>
  );
};

export default Navbar;
