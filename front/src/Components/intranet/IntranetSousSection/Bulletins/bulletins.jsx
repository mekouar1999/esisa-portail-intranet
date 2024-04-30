import React from 'react'
import "./bulletins.css"

const bulletins = () => {
  return (
    <div className="releve-de-notes-container">
    <h2 className="title">Téléchargement des Bulletins</h2>
    <p className="description">
      Vous pouvez télécharger vos relevés de notes en cliquant sur les liens ci-dessous :
    </p>
    <ul>
      <li><a href="/releve-note-semestre-1.pdf" className="download-link" download>Relevé de notes - Semestre 1</a></li>
      <li><a href="/releve-note-semestre-2.pdf" className="download-link" download>Relevé de notes - Semestre 2</a></li>
    </ul>
  </div>
  )
}

export default bulletins
