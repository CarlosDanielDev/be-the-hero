import React from "react";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";
import heroesImage from "../../assets/heroes.png";
import logoImage from "../../assets/logo.svg";

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Logo" />
        <form>
          <h1>Faça seu Logon</h1>

          <input placeholder="Sua ID" />
          <button className="button" type="submit">
            Entrar
          </button>
          <a href="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </a>
        </form>
      </section>

      <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
