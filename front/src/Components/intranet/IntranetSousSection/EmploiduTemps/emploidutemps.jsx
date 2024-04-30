import React from 'react';
import "./emploidutemps.css";
import emploiDuTempsImage from '../../../../images/edt1.png';
import emploiDuTempsImage2 from '../../../../images/edt2.png';


const EmploiDuTemps = () => {
  return (
    <div className="bulletins-container">
      <div className="emploi-du-temps-container">
        <h2 className="title">Emploi du temps</h2>
        <p className="description">
          Consultez votre emploi du temps en cliquant sur les liens ci-dessous :
        </p>
        <ul className='edt'>
          <li>
            <img src={emploiDuTempsImage} alt="Emploi du temps" className="emploi-du-temps-image" />
            <a href="/emploi-du-temps-semestre-1.pdf" className="download-link" download>Emploi du temps - Semestre 1</a>
          </li>
          <li>
            <img src={emploiDuTempsImage2} alt="Emploi du temps" className="emploi-du-temps-image" />
            <a href="/emploi-du-temps-semestre-2.pdf" className="download-link" download>Emploi du temps - Semestre 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default EmploiDuTemps;
