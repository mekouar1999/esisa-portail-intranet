import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import "./InfoPersonnel.css";

const InfoPersonnel = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('_id');
    axios.get(`http://localhost:4000/api/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setUserInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
    });
  }, []); 

  // Liste des clés à exclure
  const excludedKeys = ["isBlocked", "uploadedDocuments" , "password", "numPassport", "_id", "createdAt","updatedAt", "__v", "refreshToken","passwordResetToken", "passwordResetExpires"];

  // Mapping des noms de propriétés en anglais vers leurs équivalents en français
  const frenchPropertyNames = {
    firstname: 'Prénom',
    lastname: 'Nom',
    datedeNaissance: 'Date de Naissance',
    PaysOrigine: 'Pays d\'Origine',
    NumCneBac: 'Numéro CNE Bac',
    NumCardId: 'Numéro Carte d\'Identité',
    role: 'Rôle',
    Sexe: 'Sexe',
    email: 'Email',
    mobile: 'Téléphone'
    // Ajoutez les autres propriétés au besoin
  };

  // Fonction pour diviser le tableau en sous-tableaux de deux éléments chacun
  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) {
        acc.push(arr.slice(i, i + size));
      }
      return acc;
    }, []);
  };

  const userInfoChunks = userInfo ? chunkArray(Object.entries(userInfo).filter(([key, _]) => !excludedKeys.includes(key)), 2) : [];

  return (
    <>
      <div className="centered-content">
        <h2 className="title">Informations utilisateur</h2>
        <p className="description">
          Pour toute demande de modification, veuillez contacter le support
        </p>
      </div>

      <div className="info-1-containerPicture">
        <h2 className="info-containerPicture">
          <FaUser className="user-icon" />{" "}
        </h2>
      </div>

      {userInfoChunks.map((chunk, index) => (
        <div key={index} className="flex">
          {chunk.map(([key, value]) => (
            <div key={key} className="info-personnel-container">
              <div className="info-item">
                <span className="info-label">{frenchPropertyNames[key] || key}:</span> {value}
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default InfoPersonnel;
