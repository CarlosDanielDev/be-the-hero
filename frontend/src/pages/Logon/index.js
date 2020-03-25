import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import history from "../../services/history";

import "./styles.css";
import heroesImage from "../../assets/heroes.png";
import logoImage from "../../assets/logo.svg";

export default function Logon() {
  const [id, setId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { id: id.toLowerCase() });

      const { name } = response.data;

      localStorage.setItem("ong_id", id);
      localStorage.setItem("ong_name", name);
      history.push("/profile");
    } catch (error) {
      console.error("Login", error);
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImage} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImage} alt="Heroes" />
    </div>
  );
}
