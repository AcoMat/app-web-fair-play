import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import logo from "../../assets/images/FairPlayLogo.png";
import "./UserProfile.css";
import discordLogo from "../../assets/images/discordLogo.png";
import ironImage from "../../assets/images/ranks/iron.png";
import bronzeImage from "../../assets/images/ranks/bronze.png";
import silverImage from "../../assets/images/ranks/silver.png";
import goldImage from "../../assets/images/ranks/gold.png";
import platinumImage from "../../assets/images/ranks/platinum.png";
import emeraldImage from "../../assets/images/ranks/emerald.png";
import diamondImage from "../../assets/images/ranks/diamond.png";
import masterImage from "../../assets/images/ranks/master.png";
import grandmasterImage from "../../assets/images/ranks/grand_master.png";
import challengerImage from "../../assets/images/ranks/challenger.png";
import unRankedImage from "../../assets/images/ranks/unranked.png";
import UserValoration from "../../components/UserValoration/UserValoration";
import iconProfile from "../../assets/images/icon-user.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';

function UserProfile() {
  const pathSegments = window.location.pathname.split("/");
  const userName = pathSegments[pathSegments.length - 1];
  const [user, setUser] = useState(null);
  const [copied, setCopied] = useState(false);
  const onCopyToCipboard = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 5000);
  }
  const rankImages = {
    Iron: ironImage,
    Bronze: bronzeImage,
    Silver: silverImage,
    Gold: goldImage,
    Platinum: platinumImage,
    Emerald: emeraldImage,
    Diamond: diamondImage,
    Master: masterImage,
    Grandmaster: grandmasterImage,
    Challenger: challengerImage,
    "": unRankedImage,
  };

  useEffect(() => {
    fetch(`http://localhost:8080/usuario/${userName}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userName]);

  return (
    <div>
      <Header arrayDeBotones={[]} />
      {user && (
        <>
          <div className="profile-container">
            <img src={user.profileImage ? user.profileImage : iconProfile} alt="Profile" className="profile-image" />
            <div>
              <h2>{user.userName}</h2>
              <CopyToClipboard text={user.discordUser}
          onCopy={() => onCopyToCipboard()}>
              <div className="discord-container">
                  <p>
                    {user.discordUser}{" "}
                    <img
                      src={discordLogo}
                      alt="Discord logo"
                      className="discord-logo"
                      />

                  </p>
                    {copied && <p style={{fontSize: ".8rem", alignSelf:'center'}}>Agregado al portapapeles</p>}
              </div>
              </CopyToClipboard>
              <UserValoration user={user} />
            </div>
          </div>
          <hr className="separator-line" />
          <div className="content-container">
            <div className="info-box">
              <p>
                <span>Usuario de LoL:</span>{" "}
                <span style={{ color: "#D43B4D" }}>{user.lolUser}</span>
              </p>
              <p>
                <span>Roles preferidos:</span>{" "}
                <span style={{ color: "#D43B4D" }}>
                  {user.lolRole.join(" - ")}
                </span>
              </p>
              <p>
                <span>Región:</span>{" "}
                <span style={{ color: "#D43B4D" }}>{user.region}</span>
              </p>
              <p>
                <span>Horas jugadas:</span>{" "}
                <span style={{ color: "#D43B4D" }}>{user.hoursPlayed}</span>
              </p>
            </div>
            <div className="right-content">
              <h2 className="title">Máximo rango</h2>
              <img
                className="rank-image"
                src={rankImages[user.lolRank] || rankImages[""]}
                alt="ImagenDeRango"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserProfile;
