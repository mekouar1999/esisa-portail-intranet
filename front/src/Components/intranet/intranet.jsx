import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaUser, FaEnvelope, FaFileAlt, FaBook, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import InfoPersonnel from './IntranetSousSection/InfoPersonnel/InfoPersonnel';
import ContactezNous from './IntranetSousSection/ContactezNous/contactezNous';
import AttestationScolarite from './IntranetSousSection/attestationScolarite/AttestationScolarite';
import ReleveDeNotes from './IntranetSousSection/RelevedeNotes/relevedeNotes';
import Event from './IntranetSousSection/Events/event';
import Documents from './IntranetSousSection/documents/documents'; 
import './intranet.css'; 
import EmploiDuTemps from './IntranetSousSection/EmploiduTemps/emploidutemps';

const Intranet = () => {
  const [selectedComponent, setSelectedComponent] = useState("infoPersonnel");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate(); 

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Afficher la modal de déconnexion
  };

  const confirmLogout = () => {
    // Supprimer toutes les données du localStorage
    localStorage.clear();
    // Supprimer toutes les données du sessionStorage
    sessionStorage.clear();
    // Rediriger vers la page de connexion
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Masquer la modal de déconnexion
  };

  let componentToDisplay;
  switch (selectedComponent) {
    case "infoPersonnel":
      componentToDisplay = <InfoPersonnel />;
      break;
    case "contactezNous":
      componentToDisplay = <ContactezNous />;
      break;
    case "attestationScolarite":
      componentToDisplay = <AttestationScolarite />;
      break;
    case "releveDeNotes":
      componentToDisplay = <ReleveDeNotes />;
      break;
    case "emploidutemps":
      componentToDisplay = <EmploiDuTemps />;
      break;
    case "documents":
      componentToDisplay = <Documents />;
      break; // Ajout du cas "documents"
    case "evenements":
      componentToDisplay = <Event />;
      break;
    default:
      componentToDisplay = <InfoPersonnel />;
  }

  return (
    <div className="intranet-container">
      <nav className="nav">
        <div onClick={() => handleComponentChange("infoPersonnel")} className={`sub-nav-link ${selectedComponent === "infoPersonnel" && "active"}`}>
          <FaUser className="nav-icon" />
          <span className="nav-text">Informations </span>
        </div>
        <div onClick={() => handleComponentChange("contactezNous")} className={`sub-nav-link ${selectedComponent === "contactezNous" && "active"}`}>
          <FaEnvelope className="nav-icon" />
          <span className="nav-text">Nous contacter</span>
        </div>
        <div className="sub-nav">
          <div onClick={() => handleComponentChange("attestationScolarite")} className={`sub-nav-link ${selectedComponent === "attestationScolarite" && "active"}`}>
            <FaFileAlt className="sub-nav-icon" />
            <span className="sub-nav-text">Attestations</span>
          </div>
          <div onClick={() => handleComponentChange("releveDeNotes")} className={`sub-nav-link ${selectedComponent === "releveDeNotes" && "active"}`}>
            <FaBook className="sub-nav-icon" />
            <span className="sub-nav-text">Relevé de notes</span>
          </div>
          <div onClick={() => handleComponentChange("emploidutemps")} className={`sub-nav-link ${selectedComponent === "emploidutemps" && "active"}`}>
            <FaCalendarAlt className="sub-nav-icon" />
            <span className="sub-nav-text">EDT</span>
          </div>
          <div onClick={() => handleComponentChange("documents")} className={`sub-nav-link ${selectedComponent === "documents" && "active"}`}> {/* Ajout de la gestion de la section Documents */}
            <FaFileAlt className="sub-nav-icon" />
            <span className="sub-nav-text">Documents</span>
          </div>
          <div onClick={() => handleComponentChange("evenements")} className={`sub-nav-link ${selectedComponent === "evenements" && "active"}`}>
            <FaCalendarAlt className="sub-nav-icon" />
            <span className="sub-nav-text">Événements</span>
          </div>
          <div onClick={handleLogout} className={`sub-nav-link`}>
            <FaSignOutAlt className="sub-nav-icon" />
            <span className="sub-nav-text">Déconnexion</span>
          </div>
        </div>
      </nav>
      <div className="content">
        {componentToDisplay}
      </div>
      {/* Modal de confirmation de déconnexion */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Voulez-vous vraiment vous déconnecter ?</h2>
            <button onClick={confirmLogout}>Oui</button>
            <button onClick={cancelLogout}>Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Intranet;
