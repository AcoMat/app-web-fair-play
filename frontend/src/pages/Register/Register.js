import Header from "../../components/Header/Header.js";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.js";
import Tagline from "../../components/TagLine/Tagline.js";
import "./Register.css";

const texto1 =
  "¿Cansado de no disfrutar tu juego favorito por culpa de tus compañeros? Llega Fair Play para que encuentres a tu equipo ideal";
const texto2 =
  "¡Buscá por tu rango, por posiciones o incluso por valoración de otros jugadores!";

function Register() {
  return (
    <div className="pageBackground">
      <div className="container">
        <Header
          arrayDeBotones={[{ texto: "Iniciar Sesión", link: "/" }]}
        ></Header>
        <div className="registerContent">
          <div className="column">
            <RegistrationForm></RegistrationForm>
          </div>
          <div className="column">
            <Tagline texto1={texto1} texto2={texto2}></Tagline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
