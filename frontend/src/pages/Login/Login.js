import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import Tagline from "../../components/TagLine/Tagline";
import "./Login.css";
import { Link } from "react-router-dom";

const texto =
  "¿Todavía nos eres parte de la mejor y más competitiva comunidad de LOL";

function Login() {
  return (
    <div className="pageBackground">
      <div className="container">
        <Header
          arrayDeBotones={[{ texto: "Registrarse", link: "/register" }]}
          false
        />
        <div className="registerContent">
          <div className="column">
            <LoginForm></LoginForm>
          </div>
          <div className="column">
            <Tagline texto2={texto}></Tagline>
            <Link to="/register">
              <button className="registerNow">¡Registrate ahora!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
