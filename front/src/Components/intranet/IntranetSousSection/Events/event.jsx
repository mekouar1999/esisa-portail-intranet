import React from 'react';
import './event.css';

const Event = () => {
  return (
    <div className="event-container">
    
    <div className="centered-content">
  <h2 className="title">Événements à venir</h2>
  <p className="description">
    Pour toute demande d'affichage de votre événement ici, veuillez contacter l'équipe parascolaire.
  </p>
</div>

      <div className="event-card">
        <h2>ESISA ON AIR</h2>
        <p>Rencontrez les intervenants de l'événement ESISA ON AIR et découvrez les dernières tendances en matière de technologie.</p>
        <p>Date et heure : 10 juin 2024, 14h00</p>
        <button>En savoir plus</button>
      </div>
      <div className="event-card">
        <h2>CLUB DEBAT</h2>
        <p>Participez à des débats passionnants et échangez des idées avec d'autres membres du Club Débat.</p>
        <p>Date et heure : 15 juin 2024, 16h00</p>
        <button>En savoir plus</button>
      </div>
      <div className="event-card">
        <h2>FINAL TOURNOI BASKET</h2>
        <p>Assistez à la finale du tournoi de basket et soutenez votre équipe favorite dans ce match intense.</p>
        <p>Date et heure : 20 juin 2024, 18h00</p>
        <button>En savoir plus</button>
      </div>
    </div>
  );
}

export default Event;
