import React, { useEffect, useState } from "react";
import axios from "axios";
import emploiDuTempsJSON from './edt.json';
import { Container, Typography, Button } from '@mui/material';
import './emploidutemps.css'; // Fichier CSS pour les styles personnalisés
import { saveAs } from 'file-saver'; // Importer la fonction saveAs pour le téléchargement
import jsPDF from 'jspdf'; // Importer jsPDF pour la création du PDF
import html2canvas from 'html2canvas'; // Importer html2canvas pour capturer l'image au format PDF

// Importer les images directement
import edt1A from '../../../../images/edt/1A.png';
import edt1B from '../../../../images/edt/1B.png';
import edt1C from '../../../../images/edt/1C.png';
import edt1D from '../../../../images/edt/1D.png';
import edt2A from '../../../../images/edt/2A.png';
import edt2B from '../../../../images/edt/2B.png';
import edt2C from '../../../../images/edt/2C.png';
import edt2D from '../../../../images/edt/2D.png';
import edt3A from '../../../../images/edt/3A.png';
import edt3B from '../../../../images/edt/3B.png';
import edt3C from '../../../../images/edt/3C.png';
import edt3D from '../../../../images/edt/3D.png';
import edt4A from '../../../../images/edt/4A.png';
import edt4B from '../../../../images/edt/4B.png';
import edt4C from '../../../../images/edt/4C.png';
import edt4D from '../../../../images/edt/4D.png';
import edt5A from '../../../../images/edt/5A.png';
import edt5B from '../../../../images/edt/5B.png';
import edt5C from '../../../../images/edt/5C.png';
import edt5D from '../../../../images/edt/5D.png';

const EmploiDuTemps = () => {

  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);
  const [donneesRecues, setDonneesRecues] = useState(null); // Initialize with null
  useEffect(() => {
    const fetchRelevesDeNotes = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const cin = sessionStorage.getItem('cin');
        const response = await axios.get(
          `http://localhost:4000/api/student/${cin}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("Réponse des relevés de notes de l'utilisateur :", response.data);
        // Assuming response.data.annee contains the expected value
        setDonneesRecues(response.data.annee);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des relevés de notes de l\'utilisateur :', error);
        setResponseError(error.message);
        setLoading(false);
      }
    };

    fetchRelevesDeNotes();
  }, []);
  
  // Récupérer le groupe et l'année du stockage de session
  const groupe = sessionStorage.getItem('groupe');
  const annee = donneesRecues;
  
  // Console pour vérifier le groupe et l'année
  console.log("Groupe :", groupe);
  console.log("Année :", annee);

  // Vérifier si le groupe et l'année sont définis
  if (!groupe || !annee) {
    return (
      <Container>
        <Typography variant="h6" align="center">Veuillez sélectionner le groupe et l'année scolaire.</Typography>
      </Container>
    );
  }
// Vérifier si le groupe et l'année existent dans le JSON
const anneeText = {
  1: "1ère année",
  2: "2ème année",
  3: "3ème année",
  4: "4ème année",
  5: "5ème année"
}[annee];

const emploiAnnee = emploiDuTempsJSON[anneeText];
const emploiGroupe = emploiAnnee[groupe];
if (!emploiGroupe || !emploiGroupe.hasOwnProperty("chemin")) {
  return (
    <Container>
      <Typography variant="h6" align="center">Impossible de trouver l'emploi du temps pour le groupe et l'année sélectionnés.</Typography>
    </Container>
  );
}


// Récupérer le chemin de l'image à partir du JSON
const cheminImage = emploiGroupe.chemin;

// Utiliser les images directement
let imageSrc;
switch (cheminImage) {
  case '../../../../images/edt/1A.png':
    imageSrc = edt1A;
    break;
  case '../../../../images/edt/1B.png':
    imageSrc = edt1B;
    break;
  case '../../../../images/edt/1C.png':
    imageSrc = edt1C;
    break;
  case '../../../../images/edt/1D.png':
    imageSrc = edt1D;
    break;
  case '../../../../images/edt/2A.png':
    imageSrc = edt2A;
    break;
  case '../../../../images/edt/2B.png':
    imageSrc = edt2B;
    break;
  case '../../../../images/edt/2C.png':
    imageSrc = edt2C;
    break;
  case '../../../../images/edt/2D.png':
    imageSrc = edt2D;
    break;
  case '../../../../images/edt/3A.png':
    imageSrc = edt3A;
    break;
  case '../../../../images/edt/3B.png':
    imageSrc = edt3B;
    break;
  case '../../../../images/edt/3C.png':
    imageSrc = edt3C;
    break;
  case '../../../../images/edt/3D.png':
    imageSrc = edt3D;
    break;
  case '../../../../images/edt/4A.png':
    imageSrc = edt4A;
    break;
  case '../../../../images/edt/4B.png':
    imageSrc = edt4B;
    break;
  case '../../../../images/edt/4C.png':
    imageSrc = edt4C;
    break;
  case '../../../../images/edt/4D.png':
    imageSrc = edt4D;
    break;
  case '../../../../images/edt/5A.png':
    imageSrc = edt5A;
    break;
  case '../../../../images/edt/5B.png':
    imageSrc = edt5B;
    break;
  case '../../../../images/edt/5C.png':
    imageSrc = edt5C;
    break;
  case '../../../../images/edt/5D.png':
    imageSrc = edt5D;
    break;
  default:
    imageSrc = null;
}

// Utilisation de imageSrc pour afficher l'image correspondante...


const handleDownloadPDF = () => {
  // Récupérer l'élément contenant l'image de l'emploi du temps
  const edtImage = document.querySelector('.edt-image');

  // Vérifier si l'élément existe
  if (edtImage) {
    // Capturer l'élément au format PDF
    html2canvas(edtImage).then(canvas => {
      // Créer un objet jsPDF
      const pdf = new jsPDF('l', 'mm', 'a4'); // Landscape orientation

      // Ajouter l'image capturée au PDF
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Largeur de la page A4 en mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Télécharger le PDF
      pdf.save('emploi_du_temps.pdf');
    });
  } else {
    console.error('Erreur: Impossible de trouver l\'élément contenant l\'image de l\'emploi du temps.');
  }
};

  return (
    <Container className="edt-container">
      {/* Titre et description */}
      <h2 className="title">Emploi du Temps</h2>
      <p className="description">
        Vous pouvez télécharger votre emploi du temps en cliquant sur le bouton ci-dessous :
      </p>
      
      {/* Affichage de l'image de l'emploi du temps */}
      {imageSrc && <img src={imageSrc} alt="Emploi du temps" className="edt-image" />}

      <div style={{textAlign:"center"}}>
        <Button style={{marginTop:"2rem"}} variant="contained" onClick={handleDownloadPDF}>Télécharger l'emploi du temps (PDF)</Button>
      </div>
      
    </Container>
  );
}


export default EmploiDuTemps;