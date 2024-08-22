import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header.js";
import PlayerBigCard from "../components/PlayerBigCard/PlayerBigCard.js";

function User() {
  const [userLogged, setUserLogged] = useState("");

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

  return (
    <div>
      <Header arrayDeBotones={[]} />
      <div className="edit-container">
        <h1 className="title">Edita tu perfil</h1>
        <PlayerBigCard />
      </div>
    </div>
  );
}

export default User;

