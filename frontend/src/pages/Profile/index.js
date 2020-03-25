import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import history from "../../services/history";

import logoImage from "../../assets/logo.svg";
import "./styles.css";

export default function Profile() {
  const ong_name = localStorage.getItem("ong_name");
  const ong_id = localStorage.getItem("ong_id");
  const [incidents, setIncidents] = useState();

  async function getIncidents() {
    try {
      const response = await api.get("/profile", {
        headers: {
          Authorization: ong_id
        }
      });

      const { data } = response;

      setIncidents(data);
    } catch (error) {
      console.error("Incidents", error);
    }
  }
  useEffect(() => {
    getIncidents();
  }, []);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`/incidents/${id}`, {
        headers: {
          Authorization: ong_id
        }
      });
      await getIncidents();
    } catch (error) {
      console.error("Delete Incident", error);
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImage} alt="Be The Hero" />

        <span>Bem vindo(a), {ong_name ? ong_name : "Loading..."}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {!incidents
          ? "Loading..."
          : incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>
                <strong>DESCRIÇÃO:</strong>
                <p>{incident.description}.</p>
                <strong>VALOR:</strong>
                <p>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(incident.value)}
                </p>

                <button
                  onClick={() => handleDeleteIncident(incident.id)}
                  type="button"
                >
                  <FiTrash2 size={20} color="#a8a8b3" />
                </button>
              </li>
            ))}
      </ul>
    </div>
  );
}
