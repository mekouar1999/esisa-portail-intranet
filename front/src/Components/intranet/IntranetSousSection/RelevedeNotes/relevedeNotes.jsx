import React from 'react';
import './ReleveDeNotes.css'; // Importation du fichier CSS

const ReleveDeNotes = () => (
  <div className="releve-de-notes-container">
    <h2 className="title">Relevés de notes</h2>
    <p className="description">
      Vous pouvez télécharger vos relevés de notes en cliquant sur les liens ci-dessous :
    </p>
    <div className="year-container">
      <div className="year">
        <h3 className="annee-link">Licence 1</h3>
        <ul>
          <li><a href="/releve-note-annee-1-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
          <li><a href="/releve-note-annee-1-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 2</h3>
        <ul>
          <li><a href="/releve-note-annee-2-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
          <li><a href="/releve-note-annee-2-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Licence 3</h3>
        <ul>
          <li><a href="/releve-note-annee-3-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
          <li><a href="/releve-note-annee-3-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 1</h3>
        <ul>
          <li><a href="/releve-note-annee-4-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
          <li><a href="/releve-note-annee-4-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
        </ul>
      </div>
      <div className="year">
        <h3 className="annee-link">Master 2</h3>
        <ul>
          <li><a href="/releve-note-annee-5-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
          <li><a href="/releve-note-annee-5-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
        </ul>
      </div>
    </div>
  </div>
);

export default ReleveDeNotes;
