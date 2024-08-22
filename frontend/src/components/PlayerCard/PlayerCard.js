import { Link } from "react-router-dom";
import iconProfile from "../../assets/images/icon-user.png";
import estrellaBlanca from "../../assets/images/estrella-blanca.png";
import availableCheck from "../../assets/images/green-check-mark.png"
import notAvailableCross from "../../assets/images/red-cross-mark.png"
import "./PlayerCard.css";

function PlayerCard({
  name,
  profileImage,
  lolUsername,
  lolRank,
  region,
  discordUsername,
  roles,
  hoursPlayed,
  valoracionDeJugadorPromedio,
  disponibility
}) {
  roles = roles.join("- ");
  const estrellas = Array(5).fill(estrellaBlanca);

  const resaltarEstrella = (index) => {
    let cssClass = `estrella-home`;
    if (estrellas.length - index <= valoracionDeJugadorPromedio) {
      cssClass = cssClass.concat(" estrella-marcada");
    } else {
      cssClass = cssClass.concat(" estrella-desmarcada ");
    }
    return cssClass;
  };

  return (
    <Link to={"/user"} style={{ textDecoration: "none" }}>
      <div className="home-card-box">
        <div className="home-photo-section">
          <img src={profileImage ? profileImage : iconProfile} alt="Profile" className="home-profile-image" />
        </div>
        <div className="home-content-section">
          <div className="top-content-section">
            <h1 style={{ color: "#d1d1d1" }} className="home-username-title">
              {name}
            </h1>
            <div className="home-game-section">
              {estrellas.map((estrella, index) => (
                <img
                  key={index}
                  src={estrella}
                  alt="Estrella"
                  className={resaltarEstrella(index)}
                />
              ))}
            </div>

          </div>
          <div className="home-info-columns">
            <div className="home-info-subsection">
              <p className="home-info-field">
                Usuario de lol:{" "}
                <span style={{ color: "#d43b4d" }}>{lolUsername}</span>
              </p>
              <p className="home-info-field">
                Rango: <span style={{ color: "#d43b4d" }}>{lolRank}</span>
              </p>
              <p className="home-info-field">
                Región: <span style={{ color: "#d43b4d" }}>{region}</span>
              </p>
            </div>
            <div className="home-info-subsection">
              <p className="home-info-field-2">
                Usuario de discord:{" "}
                <span style={{ color: "#d43b4d" }}>{discordUsername}</span>
              </p>
              <p className="home-info-field-2">
                Roles: <span style={{ color: "#d43b4d" }}>{roles}</span>
              </p>
              <p className="home-info-field-2">
                Horas jugadas:{" "}
                <span style={{ color: "#d43b4d" }}>{hoursPlayed}</span>
              </p>
            </div>

            <div className="home-info-subsection">
              {disponibility ? 
                <img src={availableCheck} alt="available player" className="check-icon"/>
                :
                <img src={notAvailableCross} alt="not available player" className="check-icon" />
              }
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}

export default PlayerCard;
/*
<div className="home-game-section">
          {estrellas.map((estrella, index) => (
            <img
              key={index}
              src={estrella}
              alt="Estrella"
              className={resaltarEstrella(index)}
            />
          ))}
        </div>
*/
