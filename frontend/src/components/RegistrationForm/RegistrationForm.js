import React, { useState } from "react";
import "./RegistrationForm.css";
import logo from "../../assets/images/logo_fair_play.png";
import Modal from "../Modal/Modal";

const mensajeDeError = {
  title: "Ooops!",
  text: "Algo salió mal. No se ha podido registrar el usuario",
};

const mensajeDeExito = {
  title: "Registro satisfactorio!",
  text: "Su cuenta ha sido creada",
};

function RegistrationForm() {
  const [form, setForm] = useState({
    userName: "",
    password: "",
    lolUser: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Default Title");
  const [modalText, setModalText] = useState("Default Text");
  const [modalType, setModalType] = useState("success");

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
    if (!form.userName) {
      errors.userName = "El nombre de usuario es obligatorio";
    }
    if (!form.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (form.password.length < 8) {
      errors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (!form.lolUser) {
      errors.lolUser = "El usuario de LOL es obligatorio";
    }
    if (!form.email) {
      errors.email = "El email es obligatorio";
    } else if (!validateEmail(form.email)) {
      errors.email = "El email es invalido";
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log(form);

      fetch("http://localhost:8080/usuario/register", {
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
          setModalType("success");
          setModalTitle(mensajeDeExito.title);
          setModalText(mensajeDeExito.text);
          setModalOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div>
      <img src={logo} alt="logo" className="registerFairPlayLogo"></img>
      <h1 className="registerTitle">Registrate ahora</h1>
      <form onSubmit={handleSubmit} className="registration-form">
        <input
          name="userName"
          value={form.userName}
          onChange={handleChange}
          placeholder="Nombre de usuario"
        />
        {errors.userName && <span className="error">{errors.userName}</span>}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <input
          name="lolUser"
          value={form.lolUser}
          onChange={handleChange}
          placeholder="Usuario de LOL"
        />
        {errors.lolUser && <span className="error">{errors.lolUser}</span>}
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <button type="submit">Registrar</button>
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

export default RegistrationForm;
