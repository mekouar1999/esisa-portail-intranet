import React from 'react';
import './AttestationScolarite.css'; // Importation du fichier CSS

const AttestationScolarite = () => (
  <div className="attestation-container">
    <h2 className="title">Téléchargement des attestations de scolarité</h2>
    <p className="description">
      Vous pouvez télécharger vos attestations de scolarité en cliquant sur les liens ci-dessous :
    </p>
    <ul>
      <li><a href="/attestation-scolarite-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
      <li><a href="/attestation-scolarite-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
    </ul>
  </div>
);

export default AttestationScolarite;
