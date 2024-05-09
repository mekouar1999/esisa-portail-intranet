import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Button } from "@mui/material";
import Spinner from "../../../Spinner"; // Importez le composant Spinner
import jsPDF from "jspdf";
import logo from "../../../../images/logo.png"; // Importez le logo
import signature from "../../../../images/signature.png"; // Importez la signature

const AttestationScolarite = () => {
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);


    // State variables
    const [relevesDeNotes, setRelevesDeNotes] = useState([]);
    const [donneesRecues, setDonneesRecues] = useState({});

  const fetchAndGeneratePDF = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("_id");
      const Prénom = sessionStorage.getItem("Prénom");
      const Nom = sessionStorage.getItem("Nom");
      const Sexe = sessionStorage.getItem("Sexe");


      const groupe = sessionStorage.getItem("groupe");
      const AnneeScolaireEnCours = sessionStorage.getItem("AnneeScolaireEnCours");

      const response = await axios.get(
      //   `http://localhost:4000/api/user/${userId}`, 
         `https://esisa-portail-intranet-back.vercel.app/api/user/${userId}`, 

        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Générer le PDF
      const doc = new jsPDF();

      // Ajouter le logo ESISA centré avec la date
      const today = new Date();
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const imgWidth = 80; // Largeur de l'image
      const imgHeight = 80; // Hauteur de l'image
      const margin = 10;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const x = (pageWidth - imgWidth) / 2;
      const y = margin;
      doc.addImage(logo, "PNG", x, y, imgWidth, imgHeight);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Attestation de Scolarité", 70, 100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Fait à Fès, le : ${date}`, 150, 20);

      // Contenu de l'attestation
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
    
      // Texte d'attestation
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
   // Vérifie si le sexe est féminin
if (Sexe === "F") {
  doc.text(`J'atteste par la présente que Madame ${Nom} ${Prénom} est inscrite à l'École supérieure `, 20, 140);
} else {
  doc.text(`J'atteste par la présente que Monsieur ${Nom} ${Prénom} est inscrit à l'École supérieure `, 20, 140);
}

doc.text(`en ingénierie et en sciences appliquées (ESISA) pour l'année universitaire 2023/2024.`, 20, 150);
doc.text(`L'étudiant${Sexe === "F" ? "e" : ""} ${Prénom} est inscrit${Sexe === "F" ? "e" : ""} en ${donneesRecues.annee}${donneesRecues.annee === "1" ? "ère" : "ème"} année, dans le groupe ${groupe}. `, 20, 160);

      doc.text("Cette attestation est conforme aux droits et règlements de l'ESISA.", 20, 170);

      // Signature
      doc.setFont("helvetica", "bold");
      doc.text("Attesté par", 20, 210);
      doc.line(20, 215, 100, 215); // Ligne de signature
      doc.setFont("helvetica", "normal");
      doc.text("Khalid Mekouar", 20, 225); // Nom du signataire
      doc.text("Président et Directeur Pédagogique de l'ESISA", 20, 235); // Fonction du signataire
      doc.addImage(signature, "PNG", 20, 235, 80, 40); // Ajoutez la signature en image

      // Sauvegarde du PDF dans un fichier
      doc.save("attestation_scolarite.pdf");

      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'utilisateur :", error);
      setResponseError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRelevesDeNotes = async () => {
      try {
        const userId = sessionStorage.getItem("_id");
        const Prénom = sessionStorage.getItem("Prénom");
        const Nom = sessionStorage.getItem("Nom");
        const groupe = sessionStorage.getItem("groupe");
        const AnneeScolaireEnCours = sessionStorage.getItem("AnneeScolaireEnCours");
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
        setDonneesRecues(response.data);
        setRelevesDeNotes(response.data.ESISA || []);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des relevés de notes de l\'utilisateur :', error);
        setResponseError(error.message);
        setLoading(false);
      }
    };

    fetchRelevesDeNotes();
  }, []);


  const handleGeneratePDF = () => {
    fetchAndGeneratePDF(); // Appeler la fonction de génération du PDF uniquement lors du clic sur le bouton
  };

  return (
    <div className="attestation-container">
      {responseError && (
        <div>
          <Typography variant="body1" color="error">
            Une erreur s'est produite lors de la récupération des données de l'utilisateur : {responseError}
          </Typography>
        </div>
      )}
      <h2 className="title">Attestations de Scolarité</h2>
      <p className="description">
        Vous pouvez télécharger votre attestation de scolarité pour l'année universitaire en cours en cliquant sur les liens ci-dessous :
      </p>
      {/* Affichez le Spinner pendant le chargement */}
      {loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div style={{ textAlign: "center", marginTop: "2rem" }} className="pdf-button-container">
          <Button variant="contained" onClick={handleGeneratePDF}>
            Générer l'attestation de scolarité
          </Button>
        </div>
      )}
    </div>
  );
};

export default AttestationScolarite;