import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useAlert } from "react-alert";

import api from "../../services/api";
import history from "../../services/history";

import logoImage from "../../assets/logo.svg";
import "./styles.css";

export default function NewIncident() {
  const alert = useAlert();
  const ong_id = localStorage.getItem("ong_id");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();

  async function handleCreateIncident(e) {
    e.preventDefault();

    try {
      const data = { title, description, value };

      await api.post("/incidents", data, {
        headers: {
          Authorization: ong_id
        }
      });
      alert.success("All done!");
      history.push("/profile");
    } catch (error) {
      alert.error("Incident delete error");
      console.error("Incident Delete", error);
    }
  }
  return (
    <div className="new-incidents">
      <div className="content">
        <section>
          <img src={logoImage} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleCreateIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
