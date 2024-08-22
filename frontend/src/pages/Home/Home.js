import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header.js";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "../Register/Register.css";
import PlayerCard from "../../components/PlayerCard/PlayerCard.js";
import Select from "react-select";

const textoTítulo = "¡Encontrá a tus compañeros!";
const textoSubtitulo = "Los usuarios están ordenados por la valoración de juego limpio";
const textoPerfil =
  "Compartí tus datos con la comunidad para aparecer en las búsquedas de otros jugadores";

function Home() {
  const navigate = useNavigate();
  const [userLogged, setUserLogged] = useState("");
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [rangos, setRangos] = useState([]);
  const [region, setRegion] = useState("");
  const [partida, setPartida] = useState("Any");
  const [partidaType, setPartidaType] = useState("Any");
  const [disponibilidad, setDisponibilidad] = useState(false)
  const [filtroDisponibilidad, setFiltroDisponibilidad] = useState(false)

  const rangosList = [
    { value: "Iron", label: "Iron" },
    { value: "Bronze", label: "Bronze" },
    { value: "Silver", label: "Silver" },
    { value: "Gold", label: "Gold" },
    { value: "Platinum", label: "Platinum" },
    { value: "Emerald", label: "Emerald" },
    { value: "Diamond", label: "Diamond" },
    { value: "Master", label: "Master" },
    { value: "Grandmaster", label: "Grandmaster" },
    { value: "Challenger", label: "Challenger" },
  ];

  const regionList = [
    { value: "", label: "Todas" },
    { value: "BR", label: "BR" },
    { value: "LAS", label: "LAS" },
    { value: "LAN", label: "LAN" },
    { value: "NA", label: "NA" },
    { value: "EUW", label: "EUW" },
    { value: "EUNE", label: "EUNE" },
    { value: "OCE", label: "OCE" },
    { value: "RU", label: "RU" },
    { value: "TR", label: "TR" },
    { value: "JP", label: "JP" },
    { value: "KR", label: "KR" },
  ];

  const partidaList = [
    { value: "Ranked", label: "Ranked"},
    { value: "Casual", label: "Casual"},
    { value: "Any", label: "Cualquiera"}
  ]

  useEffect(
    () => {
      const authToken = localStorage.getItem("Authorization");
      fetchUsers();
      fetch("http://localhost:8080/usuario/actual", {
        headers: {
          Authorization: authToken,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUserLogged(userData)
          setDisponibilidad(userData.disponibility)
        }
      )
        .catch((error) => {
          console.error("Current user error", error);
        });
    },
    [],
    []
  );

  useEffect(() => {
    if (!userLogged) return

    const data = {
      userName: userLogged.userName,
      disponibility: disponibilidad,
      disponibilityType: partida
    };

    const response = fetch('http://localhost:8080/usuario/updateDisponibility', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })      
    .catch(error => {
      console.error("Defining availability failure" ,error);
    })
  }, [partida, disponibilidad]);


  const fetchUsers = () => {
    const rolesDeBusqueda = roles.join(",");
    const rangosDeBusqueda = rangos.join(",");
    const regionDeBusqueda = region;
    const disponibility = filtroDisponibilidad

    fetch(
      `http://localhost:8080/usuario/usuarios/multFilt?rolesDeBusqueda=${rolesDeBusqueda}&rangosDeBusqueda=${rangosDeBusqueda}&regionDeBusqueda=${regionDeBusqueda}&disponibility=${disponibility}&disponibilityType=${partidaType}`
    )
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const applyFilters = () => {
    fetchUsers();
  };

  const handleCardClick = (userName) => {
    console.log(userName);
    navigate(`/profile/${userName}`);
  };

  const handleMyProfileClick = () => {
    navigate("/user");
  };

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setRoles((prevRoles) => [...prevRoles, value]);
    } else {
      setRoles((prevRoles) => prevRoles.filter((item) => item !== value));
    }
  };

  const handleMultiSelectChange = (rangos) => {
    const values = rangos.map((option) => option.value);
    setRangos(values);
  };

  const handleRegionChange = (region) => {
    console.log(region);
    setRegion(region.value);
  };

  const handlePartidaChange = (type) => {
    console.log(type);
    setPartidaType(type.value);
  };

  const handleMatchChange = (partida) => {
    setPartida(partida.value)
  }

  const handleCheckboxAvailability = () => {
    setDisponibilidad(!disponibilidad)
  };

  const handleFilterAvailability = () => {
    setFiltroDisponibilidad(!filtroDisponibilidad)
  }
  console.log("acaa")
  console.log("users")

  return (
    <div className="pageBackground">
      <div className="container">
        {userLogged === "" || userLogged.datosCompletados ? 
          <Header arrayDeBotones={[{"texto":"Editar perfil","link":"/user"}, {"texto": "Cerrar Sesión", "link":"/"}]}/>
          : 
          <Header arrayDeBotones={[{"texto": "Cerrar Sesión", "link":"/"}]}></Header> 
        }
        <div className="homeContent">
          <div className="mainContent column-main">
            <h1 style={{ color: "white" }} className="titleHome">
              {textoTítulo}{" "}
            </h1>
            <h2 className="subTitleHome">
              {textoSubtitulo}
            </h2>
            {users
              .filter((user) => user.userName !== userLogged.userName)
              .map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleCardClick(user.userName)}
                >
                  <PlayerCard
                    key={user.id}
                    name={user.userName}
                    profileImage={user.profileImage}
                    lolUsername={user.lolUser}
                    lolRank={user.lolRank}
                    region={user.region}
                    discordUsername={user.discordUser}
                    roles={user.lolRole.map((rol) => rol + "  ")}
                    hoursPlayed={user.hoursPlayed}
                    valoracionDeJugadorPromedio={
                      user.valoracionDeJugadorPromedio
                    }
                    disponibility={user.disponibility}
                  />
                </div>
              ))}
          </div>
          <div className="sideContent column-side">

            {userLogged === "" || userLogged.datosCompletados ? (
              <>
                <div className="complete-profile">
                  <h3 style={{ color: "#676767", textAlign: "center" }}>¿Te encuentras disponible para jugar ahora?</h3>
                  <label className="availability-checkbox">
                    <input type="checkbox" checked={disponibilidad} onChange={handleCheckboxAvailability} className="checkbox-available"/>
                  </label>
                  <h3 style={{ color: "#676767", textAlign: "center" }}>¿Para que tipo de partida?</h3>

                  <div className="filter-list-field availability-filter">
                    <Select
                      options={partidaList}
                      onChange={handleMatchChange}
                      placeholder="Cualquier partida..."
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor: "#0A0B12",
                          borderRadius: "15px",
                          borderColor: "#ccc",
                          padding: "14px",
                          color: "#D43B4D",
                          fontWeight: "bold",
                          fontSize: "15px",
                          width: "90%",
                          boxSizing: "border-box",
                        }),
                        singleValue: (styles) => ({
                          ...styles,
                          color: "white",
                        }),
                      }}
                    />
                  </div>
                </div>
                
              </>
            ) : (
              <>
                <div className="complete-profile">
                  <h3 style={{ color: "white", textAlign: "center" }}>
                    {textoPerfil}
                  </h3>
                  <button className="button-complete-profile" onClick={handleMyProfileClick}>
                    Completá tu perfil
                  </button>
                </div>
              </>
            )}
            

            <h1 style={{ color: "white", textAlign: "center", marginBottom: "5px" }}>
              Filtros:
            </h1>
            <div>
              <p className="filter-info-field">Roles:</p>
              <div className="filter-checkbox-row">
                <div className="filter-checkbox-group">
                  <input
                    type="checkbox"
                    id="top"
                    name="lolRole"
                    value="TOP"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="top">Top</label>
                </div>
                <div className="filter-checkbox-group">
                  <input
                    type="checkbox"
                    id="adc"
                    name="lolRole"
                    value="ADC"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="adc">ADC</label>
                </div>
                <div className="filter-checkbox-group">
                  <input
                    type="checkbox"
                    id="mid"
                    name="lolRole"
                    value="MID"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="mid">Mid</label>
                </div>
              </div>
              <div className="filter-checkbox-row below">
                <div className="filter-checkbox-group">
                  <input
                    type="checkbox"
                    id="jungle"
                    name="lolRole"
                    value="JUNGLA"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="jungle">Jungle</label>
                </div>
                <div className="filter-checkbox-group">
                  <input
                    type="checkbox"
                    id="support"
                    name="lolRole"
                    value="SUPPORT"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="support">Support</label>
                </div>
              </div>
              <div className="filter-list-field">
                <p className="filter-info-field">Rango:</p>
                <Select
                  options={rangosList}
                  isMulti
                  onChange={handleMultiSelectChange}
                  placeholder="Cualquier rango..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#0A0B12",
                      borderRadius: "15px",
                      borderColor: "#ccc",
                      padding: "14px",
                      color: "#D43B4D",
                      fontWeight: "bold",
                      fontSize: "15px",
                      width: "90%",
                      boxSizing: "border-box",
                    }),
                  }}
                />
              </div>

              <div className="filter-list-field">
                <p className="filter-info-field">Region:</p>
                <Select
                  options={regionList}
                  onChange={handleRegionChange}
                  placeholder="Cualquier region..."
                  styles={{
                    control: (base) => ({
                      ...base,
                      backgroundColor: "#0A0B12",
                      borderRadius: "15px",
                      padding: "14px",
                      fontWeight: "bold",
                      fontSize: "15px",
                      width: "90%",
                      color: "white",
                      boxSizing: "border-box",
                    }),
                    singleValue: (styles) => ({
                      ...styles,
                      color: "white",
                    }),
                  }}
                />
                </div>
                <div className="filter-list-field">
                  <p className="filter-info-field">Tipo de partida:</p>
                  <Select
                    options={partidaList}
                    onChange={handlePartidaChange}
                    placeholder="Cualquiera..."
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#0A0B12",
                        borderRadius: "15px",
                        padding: "14px",
                        fontWeight: "bold",
                        fontSize: "15px",
                        width: "90%",
                        color: "white",
                        boxSizing: "border-box",
                      }),
                      singleValue: (styles) => ({
                        ...styles,
                        color: "white",
                      }),
                    }}
                  />
                </div>


              <div className="filter-checkbox-solo">
                <p className="filter-info-field" style={{ textAlign:'center', marginBottom:'10px'}}>Jugadores disponibles:</p>
                <label className="availability-checkbox">
                    <input type="checkbox" checked={filtroDisponibilidad} onChange={handleFilterAvailability} className="checkbox-available"/>
                </label>
              </div>

              <button className="button-apply-filter" onClick={applyFilters}>
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
