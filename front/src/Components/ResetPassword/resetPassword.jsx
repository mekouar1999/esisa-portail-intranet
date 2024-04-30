


import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../images/image.png';

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
`;

const ResetPasswordContainer = styled.div`
  background-color: #f4f4f4;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const ResetPasswordForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Message = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

// Component
function ResetPassword() {
    const [formData, setFormData] = useState({
      email: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Ici, vous pouvez envoyer les données à votre API pour réinitialiser le mot de passe
      // et gérer la réponse
      // Par exemple :
      // resetPassword(formData.email).then(response => {
      //   setMessage(response.data.message);
      // }).catch(error => {
      //   setMessage('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
      // });
    };

  return (
    <Container>
      <ResetPasswordContainer>
        <ResetPasswordForm onSubmit={handleSubmit}>
          <Title>Réinitialisation du mot de passe</Title>
          <FormGroup>
            <Label htmlFor="email">Adresse e-mail :</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit">Réinitialiser</Button>
          {message && <Message error={error}>{message}</Message>}
        </ResetPasswordForm>
      </ResetPasswordContainer>
    </Container>
  );
}

export default ResetPassword;
