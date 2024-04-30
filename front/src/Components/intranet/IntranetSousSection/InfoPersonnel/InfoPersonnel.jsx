import React from 'react';
import './InfoPersonnel.css'; // Importation du fichier CSS

const InfoPersonnel = () => {
  return (
    <div className="info-personnel-container">
      <h2 className="info-title">Informations personnelles</h2>
      <ul className="info-list">
        <li><span className="info-label">Nom:</span> Youssef</li>
        <li><span className="info-label">Prénom:</span> MEKOUAR</li>
        <li><span className="info-label">Date de naissance:</span> 13/03/1998</li>
        <li><span className="info-label">Pays d'origine:</span> Maroc</li>
        <li><span className="info-label">Numéro CNE du BAC:</span> BACFRMK073299</li>
        <li><span className="info-label">Numéro de carte d'identité:</span> CD472234</li>
        <li><span className="info-label">Sexe:</span> Masculin</li>
        <li><span className="info-label">Email:</span> youssef.mekouar98@gmail.com</li>
        <li><span className="info-label">Téléphone mobile:</span> 0603020551</li>
      </ul>
    </div>
  );
}

export default InfoPersonnel;
