import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../images/image.png"; // Import du logo
import "./InterfaceDeConnexion.css"; // Importation du fichier CSS

function InterfaceDeConnexion({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    NumCardId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/login",
        formData
      );
      console.log("Response from server:", response); // Log de la réponse du serveur

      // Après la vérification de l'identifiant et du mot de passe
      if (response.data && response.data.token) {
        setIsLoggedIn(true);
        setFormData({
          NumCardId: "",
          password: "",
        });
        // Stocke le token dans sessionStorage
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("_id", response.data._id);
        sessionStorage.setItem("firstname", response.data.firstname);
        sessionStorage.setItem("groupe", response.data.groupe);
        sessionStorage.setItem("AnneeScolaireEnCours", response.data.AnneeScolaireEnCours);

        

console.log("response data " , response.data)
        sessionStorage.setItem("isLoggedIn", true);
        navigate("/intranet");
      } else {
        setError("Identifiant ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error); // Log de l'erreur survenue lors de la connexion
      if (error.response && error.response.data) {
        // Si le backend a renvoyé un message d'erreur spécifique
        console.error("Error response from server:", error.response); // Log de la réponse d'erreur du serveur
        setError(error.response.data.message);
      } else {
        // Si une erreur s'est produite mais aucun message d'erreur spécifique n'a été retourné
        setError("Une erreur s'est produite lors de la connexion.");
      }
    }
  };

  return (
    <>
      <div className="overlay" />
      <div className="modal-container">
        <h1 className="title">ESISA INTRANET</h1>
        <form className="form" onSubmit={handleOnSubmit}>
          <div className="input-wrapper">
            <h2 className="input-label">Identifiant :</h2>
            <input
              type="text"
              name="NumCardId"
              value={formData.NumCardId}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          <div className="input-wrapper">
            <h2 className="input-label">Mot de passe :</h2>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <a href="/reset-password" className="forgot-password-link">
            Mot de passe oublié ?
          </a>

          <div style={{ margin: "auto" }}>
            <button type="submit" className="submit-button">
              Se connecter
            </button>
          </div>
        </form>
      </div>
      <img src={logo} alt="Logo" className="logo-image" />
    </>
  );
}

export default InterfaceDeConnexion;
