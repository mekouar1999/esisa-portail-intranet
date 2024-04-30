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
        'http://localhost:4000/api/user/login',
        formData
      );
      if (response.data && response.data.token) {
        setIsLoggedIn(true);
        setFormData({
          NumCardId: '',
          password: '',
        });
        sessionStorage.setItem('isLoggedIn', true);
        navigate('/intranet');
      } else {
        setError('Identifiant ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Identifiant ou mot de passe incorrect');
      navigate('/intranet');
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
          <button type="submit" className="submit-button">Se connecter</button>
        </form>
      </div>
      <img src={logo} alt="Logo" className="logo-image" />
    </>
  );
}

export default InterfaceDeConnexion;
