import React from "react";
import logo from "../../assets/images/lollogo.png";

function Tagline({texto1, texto2}) {
    return (
        <div>
            <img src={logo} alt="logo" style={lolLogo}></img>
            <h1 style={redText}>{texto1}</h1>
            <h1 style={whiteText}>{texto2}</h1>
        </div>
    );
}

const redText = {
    color: '#d43b4d',
}

const whiteText = {
    color: 'white',
}

const lolLogo = {
    width: '150px',
    height: '150px',
    marginBottom: '50px'
}

export default Tagline;
