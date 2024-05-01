import React from 'react';
import './AttestationScolarite.css'; // Importation du fichier CSS
import logoAttestation from "../../../../images/attestation.jpeg"

const Attestation = () => (
  <div className="attestation-container">
    <h2 className="title">Attestations de Scolarité</h2>
    <p className="description">
      Vous pouvez télécharger vos attestations en cliquant sur les liens ci-dessous :
    </p>
    <div className="year-container">
      <div className="year">
        <h3 className="annee-link">Licence 1</h3>
        <ul>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-1-semestre-1.pdf" className="download-link" download>Attestation - Semestre 1</a></li>
          </div>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-1-semestre-2.pdf" className="download-link" download>Attestation - Semestre 2</a></li>
          </div>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 2</h3>
        <ul>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-2-semestre-1.pdf" className="download-link" download>Attestation - Semestre 1</a></li>
          </div>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-2-semestre-2.pdf" className="download-link" download>Attestation - Semestre 2</a></li>
          </div>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 3</h3>
        <ul>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-3-semestre-1.pdf" className="download-link" download>Attestation - Semestre 1</a></li>
          </div>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-3-semestre-2.pdf" className="download-link" download>Attestation - Semestre 2</a></li>
          </div>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 1</h3>
        <ul>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-4-semestre-1.pdf" className="download-link" download>Attestation - Semestre 1</a></li>
          </div>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-4-semestre-2.pdf" className="download-link" download>Attestation - Semestre 2</a></li>
          </div>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 2</h3>
        <ul>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-5-semestre-1.pdf" className="download-link" download>Attestation - Semestre 1</a></li>
          </div>
          <div className="semester">
            <img src={logoAttestation} alt="Attestation" className="semester-image" />
            <li><a href="/attestation-annee-5-semestre-2.pdf" className="download-link" download>Attestation - Semestre 2</a></li>
          </div>
        </ul>
      </div>
    </div>
  </div>
);

export default Attestation;
