import React, { useState, useContext } from "react";
import logo from "../../assets/images/logo_fair_play.png";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import Modal from "../Modal/Modal";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../UserContext";

const mensajeDeError = {
  title: "",
  text: "E-mail o contraseña incorrecta",
};

function LoginForm() {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Default Title");
  const [modalText, setModalText] = useState("Default Text");
  const [modalType, setModalType] = useState("success");
  const { setAuth, isLogged, changeLogin } = useContext(UserContext);

  const validateEmail = (email) => {
    // Expresión regular para validar el correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar campos obligatorios
    const errors = {};
    if (!form.email) {
      errors.email = "El nombre de usuario es obligatorio";
    } else if (!validateEmail(form.email)) {
      errors.email = "El email es invalido";
    }
    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      e.preventDefault();
      console.log(form);

      fetch("http://localhost:8080/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      })
        .then((response) => {
          if (!response.ok) {
            setModalType("error");
            setModalTitle(mensajeDeError.title);
            setModalText(mensajeDeError.text);
            setModalOpen(true);
            throw new Error("Error en la solicitud: " + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          setAuth(data.token);
          changeLogin();
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      {isLogged && <Navigate to="/home" replace={true} />}
      <img src={logo} alt="logo" className="loginFairPlayLogo"></img>
      <h1 className="loginTitle">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button type="submit">Ingresar</button>
        <span>
          <Link className="forgetPassword" to="/forgetPassword">
            Olvidé mi contraseña
          </Link>
        </span>
      </form>
      <Modal
        isOpen={isModalOpen}
        toggleModal={() => setModalOpen(!isModalOpen)}
        title={modalTitle}
        text={modalText}
        modalType={modalType}
      />
    </div>
  );
}

export default LoginForm;

