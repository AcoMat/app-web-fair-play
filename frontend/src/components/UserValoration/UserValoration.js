import React, { useEffect, useState } from "react";
import "./UserValoration.css";
import estrellaBlanca from "../../assets/images/estrella-blanca.png";
import ConfirmValidateModal from "../ConfirmValidateModal/ConfirmValidateModal";

const UserValoration = ({ user }) => {
  const estrellas = Array(5).fill(estrellaBlanca);
  const authToken = localStorage.getItem("Authorization");
  const [isModalOpen, setModalOpen] = useState(false);
  const [userVote, setUserVote] = useState();
  const [calification, setCalification] = useState(0);

  useEffect(() => {
    a();
  });

  const a = async () => {
    try {
      const a = await fetch(
        "http://localhost:8080/valoracion/" + user.userName,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      const data = await a.json();
      setUserVote(data.puntaje);
    } catch (e) {
      console.error("Error:", e);
    }
  };

  const resaltarEstrella = (index) => {
    let cssClass = `userValoration_estrella`;
    if (estrellas.length - index <= user.valoracionDeJugadorPromedio) {
      cssClass = cssClass.concat(" estrella-marcada");
    } else {
      cssClass = cssClass.concat(" estrella-desmarcada ");
    }
    return cssClass;
  };

  const validateUser = () => {
    fetch("http://localhost:8080/valoracion/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        usernameVotado: user.userName,
        puntaje: calification,
      }),
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setModalOpen(false);
  };

  const openModal = (value) => {
    setCalification(estrellas.length - value);
    setModalOpen(true);
  };

  const svg = () => {
    return (
      <svg
        width="83"
        height="24"
        viewBox="0 0 83 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.939344 10.9393C0.353559 11.5251 0.353559 12.4749 0.939344 13.0607L10.4853 22.6066C11.0711 23.1924 12.0208 23.1924 12.6066 22.6066C13.1924 22.0208 13.1924 21.0711 12.6066 20.4853L4.12133 12L12.6066 3.51472C13.1924 2.92893 13.1924 1.97919 12.6066 1.3934C12.0208 0.807612 11.0711 0.807612 10.4853 1.3934L0.939344 10.9393ZM83 10.5L2 10.5V13.5L83 13.5V10.5Z"
          fill="#D43B4D"
        />
      </svg>
    );
  };

  return (
    <div className="userValoration">
      <p className="userValoration__color">
        {user.valoracionDeJugadorPromedio} ({user.cantVotosTotal} votos)
      </p>
      <div className="userValoration__stars-section">
        <span className="userValoration__stars">
          {estrellas.map((estrella, index) => (
            <img
              key={index}
              src={estrella}
              alt="Estrella"
              className={resaltarEstrella(index)}
              onClick={() => openModal(index)}
            />
          ))}
        </span>

        <div className="a">
          <span className="flecha-svg">{svg()}</span>

          {!userVote ? (
            <span className="userValoration__color">Votá ahora</span>
          ) : (
            <span className="userValoration__color">
              Votaste a este jugador con {userVote} <br /> estrellas ¿Deseas
              cambiarlo?
            </span>
          )}
        </div>
      </div>

      <ConfirmValidateModal
        isOpen={isModalOpen}
        onClickSucces={() => validateUser()}
        onClickCancel={() => setModalOpen((prev) => !prev)}
        playerName={user.userName}
      />
    </div>
  );
};

export default UserValoration;

//TODO hacer bien la flechita
