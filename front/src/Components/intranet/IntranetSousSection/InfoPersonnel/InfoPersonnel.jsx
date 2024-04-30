import React from "react";
import "./InfoPersonnel.css"; 
import { FaUser } from 'react-icons/fa';

const InfoPersonnel = () => {
  return (


    <>


<div className="centered-content">
      <h2 className="title">Informations utilisateur</h2>
      <p className="description">
        Pour toute demande de modification, veuillez contactez le support
      </p>
    </div>


      <div className="info-1-container">
      <h2 className="info-title"><FaUser className="user-icon" /> </h2>
      </div>

      <div className="flex">
        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Nom:</span> Youssef
          </div>
        </div>

        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Prénom:</span> MEKOUAR
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Date de naissance:</span> 13/03/1998
          </div>
        </div>

        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Pays d'origine:</span> Maroc
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Numéro CNE du BAC:</span> BACFRMK073299
          </div>
        </div>

        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Numéro de carte d'identité:</span>{" "}
            CD472234
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Sexe:</span> Masculin
          </div>
        </div>

        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Email:</span>{" "}
            youssef.mekouar98@gmail.com
          </div>
        </div>
      </div>

      <div className="flex"></div>

      <div className="flex">
        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Téléphone mobile:</span> 0603020551
          </div>
        </div>

        <div className="info-personnel-container">
          <div className="info-item">
            <span className="info-label">Num Passport:</span> RG5E1G5RE15ER1
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPersonnel;
