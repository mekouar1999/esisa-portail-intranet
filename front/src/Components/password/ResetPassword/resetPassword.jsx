import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../..//images/attestation.jpeg';
import './resetPassword.css'; 

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: '',
      },
      message: '',
      error: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:4000/api/user/forgot-Password-Token', this.state.formData)
      .then(response => {
        const { token } = response.data;
        this.setState({ message: response.data.message, token: token });
        // Vous pouvez également stocker le token dans le local storage ici si nécessaire
      })
      .catch(error => {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'erreur
          const responseData = error.response.data;
          if (responseData.status === "fail") {
            // Cas où l'utilisateur n'est pas trouvé
            this.setState({ message: responseData.message });
          } else {
            // Gestion d'autres erreurs du serveur
            this.setState({ message: 'Une erreur s\'est produite lors de la réinitialisation du mot de passe.' });
          }
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.log(error.request);
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.log('Error', error.message);
        }
      });
  }
  

  render() {
    const { formData, message, error } = this.state;
    return (
      <div className="Container">
        <div className="ResetPasswordContainer">
          <form className="ResetPasswordForm" onSubmit={this.handleSubmit}>
            <h1 className="Title">Réinitialisation du mot de passe</h1>
            <div className="FormGroup">
              <label htmlFor="email" className="Label">Adresse e-mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={this.handleChange}
                className="Input"
                required
              />
            </div>
            <button type="submit" className="Button">Réinitialiser</button>
            {message && <p className={error ? 'Message error' : 'Message'}>{message}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default ResetPassword;


