import React from 'react';
import './AttestationScolarite.css'; // Importation du fichier CSS

const AttestationScolarite = () => (
  <div className="attestation-container">
    <h2 className="title">Attestations de scolarité</h2>
    <p className="description">
      Vous pouvez télécharger vos attestations de scolarité en cliquant sur les liens ci-dessous :
    </p>
    <div className="year-container">
      <div className="year">
        <h3 className="annee-link">Licence 1</h3>
        <ul>
          <li><a href="/attestation-scolarite-annee-1-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
          <li><a href="/attestation-scolarite-annee-1-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 2</h3>
        <ul>
          <li><a href="/attestation-scolarite-annee-2-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
          <li><a href="/attestation-scolarite-annee-2-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 3</h3>
        <ul>
          <li><a href="/attestation-scolarite-annee-3-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
          <li><a href="/attestation-scolarite-annee-3-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 1</h3>
        <ul>
          <li><a href="/attestation-scolarite-annee-4-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
          <li><a href="/attestation-scolarite-annee-4-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 2</h3>
        <ul>
          <li><a href="/attestation-scolarite-annee-5-semestre-1.pdf" className="download-link" download>Attestation de scolarité - Semestre 1</a></li>
          <li><a href="/attestation-scolarite-annee-5-semestre-2.pdf" className="download-link" download>Attestation de scolarité - Semestre 2</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default AttestationScolarite;
