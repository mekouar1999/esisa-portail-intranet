import React, { useState } from 'react';
import InfoPersonnel from './IntranetSousSection/InfoPersonnel/InfoPersonnel';
import ContactezNous from './IntranetSousSection/ContactezNous/contactezNous';
import AttestationScolarite from './IntranetSousSection/Inscriptions/Inscriptions';
import ReleveDeNotes from './IntranetSousSection/RelevedeNotes/relevedeNotes';
import './intranet.css'; // Importation du fichier CSS

const Intranet = () => {
  const [selectedComponent, setSelectedComponent] = useState("infoPersonnel");

  const handleComponentChange = (component) => {
    setSelectedComponent(component);
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
    default:
      componentToDisplay = <InfoPersonnel />;
  }

  return (
    <div className="intranet-container">
      <nav className="nav">
        <div onClick={() => handleComponentChange("infoPersonnel")} className={`nav-link ${selectedComponent === "infoPersonnel" && "active"}`}>Informations personnelles</div>
        <div onClick={() => handleComponentChange("contactezNous")} className={`nav-link ${selectedComponent === "contactezNous" && "active"}`}>Nous contacter</div>
        <div className="sub-nav">
          <div onClick={() => handleComponentChange("attestationScolarite")} className={`sub-nav-link ${selectedComponent === "attestationScolarite" && "active"}`}>Attestation de scolarité</div>
          <div onClick={() => handleComponentChange("releveDeNotes")} className={`sub-nav-link ${selectedComponent === "releveDeNotes" && "active"}`}>Relevé de notes</div>
        </div>
      </nav>
      <div className="content">
        {componentToDisplay}
      </div>
    </div>
  );
}

export default Intranet;
