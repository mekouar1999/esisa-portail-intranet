import React, { useEffect, useState } from "react";
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import logo from "../../../../images/logo.png"; // Importez le logo
import axios from "axios";
import { TextField, Button, Box, Container, Typography } from "@mui/material";

const Diplomes = () => {
  const [relevesDeNotes, setRelevesDeNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);
  const [donneesRecues, setDonneesRecues] = useState({});
  const [person1, setPerson1] = useState({ nom: '', prenom: '', cin: '' });
  const [person2, setPerson2] = useState({ nom: '', prenom: '', cin: '' });

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
         // `http://localhost:4000/api/student/${cin}`,
          `https://esisa-portail-intranet-back.vercel.app/api/student/${cin}`,

          

          {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const qrData = `${person1.nom}, ${person1.prenom}, ${person1.cin}\n${person2.nom}, ${person2.prenom}, ${person2.cin}`;

    try {
      const qrDataURL = await QRCode.toDataURL(qrData);
      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.text('Listes des invités', 105, 145, { align: 'center' ,   fontSize: 16 });

      doc.setFontSize(14);
      doc.text(`Nom: ${person1.nom}`, 120, 180);
      doc.text(`Prénom: ${person1.prenom}`, 120, 190);
      doc.text(`CIN: ${person1.cin}`, 120, 200);

      doc.text(`Nom: ${person2.nom}`, 50, 180);
      doc.text(`Prénom: ${person2.prenom}`, 50, 190);
      doc.text(`CIN: ${person2.cin}`, 50, 200);

      doc.addImage(qrDataURL, 'PNG', 10, 220, 50, 50);

      const pageWidth = doc.internal.pageSize.width;
      const today = new Date();
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const imgWidth = 50; 
      const imgHeight = 50; 
      const margin = 0;
      const x = (pageWidth - imgWidth) / 2;
      const y = margin;
      doc.addImage(logo, "PNG", x, y, imgWidth, imgHeight);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Ecole Supérieure d'Ingénierie en Sciences Appliquées", 60, 50, { fontSize: 16 });

      let yPosition = 90; 
      doc.text(`Fait à Fès, le : ${date}`, 150, 20);      
      doc.text(`Cette attestation est dédiée aux invités de l'étudiant${donneesRecues.Sexe === "F" ? "e" : ""} ${donneesRecues.Prénom} ${donneesRecues.Nom}, né${donneesRecues.Sexe === "F" ? "e" : ""} le ${donneesRecues.Date_Naissance} à ${donneesRecues.Lieu_Naissance}.`, 20, 75);
      doc.text("Cette attestation sera demandé à l'entrée afin de confirmer que les invités sont bien les personnes invités \n", 20, 85);
      doc.text("par le diplomé de l'année scolaire 2022-2023. \n", 20, 95);
      doc.text("Les invités qui se présenteront à l'entrée sans cette attestation ne pourront pas avoir accès à la cérémonie.", 20, 105);
      doc.text("Pour toute autre demandes, nous vous prions de contacter le service administrative l'ESISA.", 20, 115);

      doc.setFont("helvetica");
      doc.text("Attesté par", 150, 280);
      doc.setFont("helvetica", "normal");
      doc.text("Président et Directeur Pédagogique de l'ESISA", 120, 285); 
      doc.text("Khalid Mekouar", 150, 290); 
      doc.save('invitation_diplomes.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du QR code ou du PDF :', error);
    }
  };

  return (
 
    <>
      <div className="centered-content">
        <h2 className="title"> Invitation à la cérémonie de remise de diplomes</h2>
      </div>
      <div className="info-contact-container">
        <div className="response-time">
          Nous vous invitons à remplir ce formulaire avec les informations complètes des deux personnes que vous souhaitez inviter à la remise des diplômes. Cela nous aidera à préparer les documents nécessaires pour cette occasion spéciale. Si vous avez des questions ou des préoccupations, n'hésitez pas à nous contacter. Notre équipe est là pour vous aider et vous accompagner tout au long du processus.
        </div>
      </div>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <form onSubmit={handleFormSubmit}>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Personne 1
              </Typography>
              <div style={{ marginBottom: "3rem" }}>
                <TextField
                  label="Nom"
                  fullWidth
                  value={person1 && person1.nom ? person1.nom : ''}
                  onChange={(e) => setPerson1({ ...person1, nom: e.target.value })}
                  required
                />
                <TextField
                  label="Prénom"
                  fullWidth
                  value={person1 && person1.prenom ? person1.prenom : ''}
                  onChange={(e) => setPerson1({ ...person1, prenom: e.target.value })}
                  required
                />
                <TextField
                  label="CIN"
                  fullWidth
                  value={person1 && person1.cin ? person1.cin : ''}
                  onChange={(e) => setPerson1({ ...person1, cin: e.target.value })}
                  required
                />
              </div>
              <div>
                <Typography variant="h6" gutterBottom>
                  Personne 2
                </Typography>
                <TextField
                  label="Nom"
                  fullWidth
                  value={person2 && person2.nom ? person2.nom : ''}
                  onChange={(e) => setPerson2({ ...person2, nom: e.target.value })}
                  required
                />
                <TextField
                  label="Prénom"
                  fullWidth
                  value={person2 && person2.prenom ? person2.prenom : ''}
                  onChange={(e) => setPerson2({ ...person2, prenom: e.target.value })}
                  required
                />
                <TextField
                  label="CIN"
                  fullWidth
                  value={person2 && person2.cin ? person2.cin : ''}
                  onChange={(e) => setPerson2({ ...person2, cin: e.target.value })}
                  required
                />
              </div>
            </Box>
            <Button variant="contained" type="submit" sx={{ mt: 2 }}>
              Générer l'invitation
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Diplomes;
