import React, { useContext, useState, useEffect } from "react";
import logo from "../../assets/images/logo_fair_play.png";
import goBack from "../../assets/images/go-back-white.png";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom/dist";
import UserContext from "../UserContext";

const Header = ({ arrayDeBotones = [] }) => {
  const location = useLocation();
  const { setAuth, changeLogin } = useContext(UserContext)
  const [userLogged, setUserLogged] = useState("")

  const hideBackButton = ["/", "/register", "/home"].includes(
    location.pathname
  );
  const navigate = useNavigate();

  const handleUserLogOff = () => {
    handleDisponibilityLogOff()
    setAuth('')
    changeLogin()
    navigate("/")
  }

  useEffect(() => {
    const authToken = localStorage.getItem("Authorization");
    fetch("http://localhost:8080/usuario/actual", {
      headers: {
        Authorization: authToken,
      },
    })
      .then((response) => response.json())
      .then((userData) => setUserLogged(userData))
      .catch((error) => {
        console.error("Current user error", error);
      });
  }, []);

  const handleDisponibilityLogOff = () => {
  
      const data = {
        userName: userLogged.userName,
        disponibility: false,
        disponibilityType: userLogged.disponibilityType
      };
  
      const response = fetch('http://localhost:8080/usuario/updateDisponibility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })      
      .catch(error => {
        console.error("Update on log off failure" ,error);
      })
  }


  return (
    <header style={headerStyle}>
      <div style={leftContainerStyle}>
        {!hideBackButton && (
          <button onClick={() => navigate("/home")} style={buttonGoBackStyle}>
            <img src={goBack} alt="Go back" style={imgStyle} />
          </button>
        )}
        <img src={logo} alt="Fair Play Logo" style={logoStyle} />
        <h1 style={companyNameStyle}>Fair Play</h1>
      </div>
      <div style={rightContainerStyle}>
        {arrayDeBotones.map((boton, index) => (
          <>
            {boton.texto === "Cerrar Sesión" ? 
            <button  className="button-style" onClick={handleUserLogOff}>{boton.texto}</button>
            :
            <Link key={index} to={boton.link}>
              <button className="button-style">{boton.texto}</button>
            </Link>
            }
          </>
        ))}
      </div>
    </header>
  );
};


const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#0a0b12",
  color: "#d43b4d",
};

const leftContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const logoStyle = {
  width: "50px",
  marginLeft: "105px",
  marginRight: "2rem",
};

const companyNameStyle = {
  margin: 0,
};

const rightContainerStyle = {
  display: "flex",
  marginRight: "105px",
};

const buttonGoBackStyle = {
  marginTop: "5px",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
};

const imgStyle = {
  width: "30%",
  height: "30%",
  cursor: "pointer",
};

export default Header;
