import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo from '../../images/image.png'; // Import du logo
import "./interfaceco.css"; // Import des styles CSS


const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5rem 2rem; /* Padding général pour les appareils mobiles */
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;

  @media (min-width: 768px) { /* Media Query pour les écrans de bureau */
    padding: 5rem 15rem; /* Padding spécifique pour les écrans de bureau */
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999; /* Place l'overlay juste derrière la modal */
`;
const LogoImage = styled.img`
  width: 100%; /* Utilisez 100% pour couvrir toute la largeur de l'écran */
  height: 100vh; /* Utilisez 100vh pour occuper 100% de la hauteur de l'écran */
  object-fit: cover; /* Ajuste l'image pour remplir l'espace tout en conservant les proportions */
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.h2`
  font-size: 1.2rem;
  color: #555;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;


const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color:blue;
  margin-top:3rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

function InterfaceDeConnexion({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

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
      const response = await axios.post('/api/auth/signin', formData);
      console.log(response.data);
      setIsLoggedIn(true);
      setFormData({
        username: '',
        password: '',
      });
      sessionStorage.setItem('isLoggedIn', true);
    } catch (error) {
      console.error('Error:', error);
      setError('Identifiant ou mot de passe incorrect');
    }
  };

  return (
    <>
      <Overlay />
      <ModalContainer>
      <Title> ESISA INTRANET</Title>

        <Form onSubmit={handleOnSubmit}>
          <InputWrapper>
            <InputLabel>Identifiant :</InputLabel>
            <InputField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Mot de passe :</InputLabel>
            <InputField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <SubmitButton type="submit">Se connecter</SubmitButton>
        </Form>
      </ModalContainer>
      <LogoImage src={logo} alt="Logo" />
    </>
  );
}

export default InterfaceDeConnexion;
