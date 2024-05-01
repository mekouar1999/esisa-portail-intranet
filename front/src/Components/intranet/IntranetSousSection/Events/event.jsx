// Event.js

import React, { useState } from 'react';
import './event.css';
import { FaCheckCircle } from 'react-icons/fa';
import basketImage from '../../../../images/event/basket.jpeg';
import voyageImage from '../../../../images/event/voyage.jpeg';
import debatImage from '../../../../images/event/debat.jpeg';
import filmImage from '../../../../images/event/film.jpeg';
import musiqueImage from '../../../../images/event/musique.jpeg';
import esisaOnAirImage from '../../../../images/event/esisaOnAir.jpeg';
import fifaImage from '../../../../images/event/fifa.jpeg';
import footImage from '../../../../images/event/foot.jpeg';

const Event = () => {
  const [showModal, setShowModal] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    imageUrl: '',
    funnyPhrase: '',
    validated: false,

  });

  const handleModalOpen = (details) => {
    setShowModal(true);
    setEventDetails(details);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEventDetails({
      title: '',
      description: '',
      date: '',
      time: '',
      imageUrl: '',
      funnyPhrase: '',
      validated: false,

    });
  };

  const events = [
    {
      title: 'FINAL TOURNOI FOOT',
      date: '20 Avril 2024',
      time: '18h00',
      description: 'Assistez à la finale du tournoi de Football et soutenez votre équipe favorite dans ce match spectaculaire.',
      imageUrl: footImage,
      funnyPhrase: 'Préparez vos crampons, ça va chauffer !',
      validated: true,

    },
    {
      title: 'ESISA ON AIR',
      date: '25 Mai 2024',
      time: '14h30',
      description: 'Rencontrez les intervenants de l\'événement ESISA ON AIR et découvrez les dernières tendances en matière de technologie.',
      imageUrl: esisaOnAirImage,
      funnyPhrase: 'On va faire fumer les circuits !',
      validated: false,

    },
    {
      title: 'CLUB DEBAT',
      date: '10 Juin 2024',
      time: '16h00',
      description: 'Participez à des débats passionnants et échangez des idées avec d\'autres membres du Club Débat.',
      imageUrl: debatImage,
      funnyPhrase: 'Vos arguments vont faire des étincelles !',
      validated: true,

    },
    {
      title: 'FINAL TOURNOI BASKET',
      date: '15 Juin 2024',
      time: '19h00',
      description: 'Assistez à la finale du tournoi de basket et soutenez votre équipe favorite dans ce match intense.',
      imageUrl: basketImage,
      funnyPhrase: 'Préparez-vous pour des dunks spectaculaires !',
      validated: true,

    },
    {
      title: 'TOURNOI FIFA',
      date: '20 Juin 2024',
      time: '20h00',
      description: 'Participez au tournoi FIFA et affrontez d\'autres joueurs pour remporter le titre.',
      imageUrl: fifaImage,
      funnyPhrase: 'Préparez vos manettes, ça va chauffer !',
      validated: true,

    },
    {
      title: 'MUSIC CLUB ESISA',
      date: '25 Juin 2024',
      time: '21h00',
      description: 'Venez découvrir les nouveaux talents de l\'ESISA lors de la soirée du Music Club.',
      imageUrl: musiqueImage,
      funnyPhrase: 'Préparez-vous à danser toute la nuit !',
      validated: false,

    },
    {
      title: 'REST & RECREATION CLUB ESISA',
      date: '30 Juin 2024',
      time: '14h00',
      description: 'Détendez-vous et profitez d\'un moment de loisirs avec le Rest & Recreation Club.',
      imageUrl: voyageImage,
      funnyPhrase: 'Préparez-vous à vous amuser comme jamais !',
      validated: false,

    },
    {
      title: 'ESISA MOVIE CLUB',
      date: '5 Juillet 2024',
      time: '20h30',
      description: 'Rejoignez-nous pour une séance de cinéma passionnante avec le ESISA Movie Club.',
      imageUrl: filmImage,
      funnyPhrase: 'Préparez les pop-corns et installez-vous confortablement !',
      validated: false,

    },
  ];

  return (
    <div className="event-container">
      <div className="centered-content">
        <h2 className="title">Événements à venir</h2>
        <p className="description">
          Pour toute demande d'affichage de votre événement ici, veuillez contacter l'équipe parascolaire.
        </p>
      </div>

      <div className="event-grid">
        {events.map((event, index) => (
          <div className="event-card" key={index}>
            {event.validated && (
              <div className="validation-icon">
                <FaCheckCircle />
              </div>
            )}
            <h2>{event.title}</h2>
            <p>{event.description}</p>
            <button onClick={() => handleModalOpen(event)}>En savoir plus</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{eventDetails.title}</h2>
            <p>{eventDetails.description}</p>
            <p>Date: {eventDetails.date}</p>
            <p>Heure: {eventDetails.time}</p>
            <p>{eventDetails.funnyPhrase}</p>
            <img src={eventDetails.imageUrl} alt={eventDetails.title} className="modal-image" />
            <button onClick={handleModalClose}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;