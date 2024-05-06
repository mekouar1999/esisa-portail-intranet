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

  const fetchAndGeneratePDF = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("_id");
      const firstname = sessionStorage.getItem("firstname");
      const lastname = sessionStorage.getItem("lastname");

      const groupe = sessionStorage.getItem("groupe");
      const AnneeScolaireEnCours = sessionStorage.getItem("AnneeScolaireEnCours");

      const response = await axios.get(
        // `http://localhost:4000/api/user/${userId}`, 
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
      doc.text(`J'atteste par la présente que M. ${lastname} ${firstname} est inscrit à l'Ecole supérieur en ingénierie`, 20, 140);
      doc.text(` et en sciences appliquées ( ESISA) pour l'année universitaire 2023/2024.`, 20, 150);
      doc.text(`L'étudiant de l'ESISA ${firstname} est inscrit en ${AnneeScolaireEnCours} et est dans le groupe ${groupe}. Cette attestation`, 20, 160);

      doc.text(" est conforme aux droits et règlements de l'ESISA.", 20, 170);

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