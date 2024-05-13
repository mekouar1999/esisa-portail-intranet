import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card, CardContent, Button } from "@mui/material";
import Spinner from "../../../Spinner";
import jsPDF from "jspdf"; // Importez jsPDF ici
import logo from "../../../../images/logo.png"; // Importez le logo
import signature from "../../../../images/signature.png"; // Importez la signature

const ReleveDeNotes = () => {
  // State variables
  const [relevesDeNotes, setRelevesDeNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseError, setResponseError] = useState(null);
  const [donneesRecues, setDonneesRecues] = useState({});

  // Effect hook to fetch data
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
          `https://esisa-portail-intranet-back.vercel.app/api/student/${cin}`,
        //  `http://localhost:4000/api/student/${cin}`,

          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
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

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      const data = donneesRecues;
      const { Nom, Prénom, groupe, AnneeScolaireEnCours } = data; // Destructuring des données
      
      // Assurez-vous que les données nécessaires sont définies
      if (!Nom || !Prénom || !groupe ) {
        throw new Error('Certaines informations requises sont manquantes.');
      }
    
      // Définir le contenu du PDF avec une mise en forme moderne
      let content = `
          
  
       `;
    
      // Sélectionner les bonnes notes en fonction de l'année
      let notes;
      switch (data.annee) {
        case "1":
          notes = [
            { matiere: "Module S1.M1 : Algorithmique I", note: data.Algo_I },
            { matiere: "Module S1.M2: Programmation C I", note: data.Prog_C_I },
            { matiere: "Module S1.M3: Archi I", note: data.Archi_I },
            { matiere: "Module S1.M4 : Electronique Numérique", note: data.Elec_N },
            { matiere: "Sous-Module S1.M6.1 : Comptabilité I", note: data.Compta_I },
            { matiere: "Sous-Module S1.M6.2 : Bureautique ", note: data.Bureaut },
            { matiere: "Module S1.M6 : Moyenne Comptabilité I et Bureautique ", note: data.Moy },
            { matiere: "Sous-Module S1.M5.1 : Mathématiques I", note: data.Math_I },
            { matiere: "Sous-Module S1.M5.2: Statistiques I", note: data.Stat_I },
            { matiere: "Module S1.M5 : Moyenne Mathématiques I et Statistiques I", note: data.Moy__1 },
            { matiere: "Sous-Module S1.M7.1: TEC I", note: data.TEC_I },
            { matiere: "Sous-Module S1.M7.2: Anglais I", note: data.Anglais_I },
            { matiere: "Module : Moyenne TEC I Anglais I", note: data.Moyenne_TEC_II_Anglais_II },
            { matiere: "Resultat Semestre S1", note: data.Resultat_Semestre_S1 },
            { matiere: "Classement au niveau du groupe", note: data.Classement_groupe },
            { matiere: "Classement au niveau de la promotion", note: data.Classement_promotion },
            { matiere: "Moyenne Semestre 1", note: data.Moyenne_Semestre_2 },
            { matiere: "Module S2.M1: Algorithmique II", note: data.Algo_II },
            { matiere: "Module S2.M2 : Programmation C II", note: data.Prog_C_II },
            { matiere: "Module S2.M3 : Archi II", note: data.Archi_II },
            { matiere: "Module S2.M4 : Electronique Analogique II", note: data.Elec_A_II },
            { matiere: "Module S2.M6 : Comptabilité II", note: data.Compta_I__1 },
            { matiere: "Sous-Module S2.M5.1 : Mathématiques II", note: data.Math_II },
            { matiere: "Sous-Module S2.M5.2 : Statistiques II", note: data.Stat_II },
            { matiere: "Module S2.M5 : Moyenne Mathématiques II et Statistiques II", note: data.Moy__2 },
            { matiere: "Sous-Module S2.M7.1 : TEC II", note: data.TEC_II },
            { matiere: "Sous-Module S2.M7.2 : Anglais II", note: data.Anglais_II },
            { matiere: "Module : Moyenne TEC II Anglais II", note: data.Moyenne_TEC_II_Anglais_II },
            { matiere: "Resultat Semestre S2", note: data.Resultat_Semestre_S2 },
            { matiere: "Moyenne Semestre 1", note: data.Moyenne_Semestre_1 },
            { matiere: "Moyenne Semestre 2", note: data.Moyenne_Semestre_2__1 },
            { matiere: "Moyenne annuel", note: data.Moyenne_année },
            { matiere: "Classement au niveau du groupe", note: data.Classement_groupe__1 },
            { matiere: "Classement au niveau de la promotion", note: data.Classement_promotion__1 },
            { matiere: "Resultat Année Scolaire", note: data.resultat_année_scolaire },
            { matiere: "Mention", note: data.mention }
          ];
          break;
        case "2":
          notes = [
            { matiere: "Module S3.M1 : Algorithmique et Structures de données I", note: data.Algo_STR_I },
            { matiere: "Module S3.M2.1 : Programmation C++", note: data.Prog_C_++ },
            { matiere: "Module S3.M2.1 : Unix", note: data.Unix },
            { matiere: "Module S3.M2 : Moyenne Programmation C++ et Unix", note: data.Moy },
            { matiere: "Sous-Module S3.M3.1 : TS", note: data.TS },
            { matiere: "Sous-Module S3.M3.2 : Systèmes Embarquées", note: data.Sys_Emb },
            { matiere: "Module S3.M3 : Moyenne TS et Systèmes Embarquées", note: data.Moy__1 },
            { matiere: "Sous-Module S3.M4.1 : Mathématiques", note: data.Math },
            { matiere: "Sous-Module S3.M4.2 : Statistiques I", note: data.Stat },
            { matiere: "Module S3.M4 : Moyenne MAthématiques et Statistiques", note: data.Moy__2 },
            { matiere: "Module S3.M5 : Bases de Données I", note: data.Init_BD },
            { matiere: "Sous-Module S3.M6.1 : TEC 3", note: data.TEC },
            { matiere: "Sous-Module S3.M6.2 : Anglais 3", note: data.Anglais },
            { matiere: "Module S3.M6 : Moyenne TEC 3 et Anglais 3", note: data.Moy_TEC_ANGLAIS },
            { matiere: "Resultat Semestre S3", note: data["Resultat_Semestre_S3"] },
            { matiere: "Moyenne Semestre 3", note: data["Moyenne_Semestre_3"] },
            { matiere: "Module S4.M1 : Algorithmique et Structures de données II", note: data["Algo_STR_I__1"] },
            { matiere: "Module S4.M2 : Programmation C++", note: data["Prog_CPlusPlus___1"] },
            { matiere: "Module S4.M3 : Programmation Impérative Python", note: data.Python },
            { matiere: "Sous-Module S4.M4.1 : Analyse Numérique", note: data.Ana_Num },
            { matiere: "Sous-Module S4.M4.2 : Statistiques II ", note: data.Stat__1 },
            { matiere: "Module S4.M4 : Moyenne Analyse Numérique et Statistique", note: data["Moyenne_Analyse_Numérique_et_Statistique"] },
            { matiere: "Sous-Module S4.M5.1 : Bases de Données II", note: data.BD_II },
            { matiere: "Sous-Module S4.M5.2 : Introduction au développement Web", note: data.WEB },
            { matiere: "Module S4.M5 : Moyenne Bases de Données II et Introduction au développement Web ", note: data["Moyenne_BD_II_et_Web"] },
            { matiere: "Sous-Module S4.M6.1 : TEC 4", note: data.TEC__1 },
            { matiere: "Sous-Module S4.M6.2 : Anglais 4", note: data.Anglais__1 },
            { matiere: "Module S4.M6 : Moyennne TEC 4 et Anglais 4", note: data.Moyennne_TEC_et_anglais },
            { matiere: "Resultat Semestre 2 S4", note: data["Resultat_Semestre_2_S4"] },
            { matiere: "Moyenne Semestre 1", note: data["Moyenne_Semestre_1"] },
            { matiere: "Moyenne Semestre 2", note: data["Moyenne_Semestre_2"] },
            { matiere: "Moyenne annuelle", note: data["Moyenne_annuelle"] },
            { matiere: "Résultat année", note: data["Résultat_année"] },
            { matiere: "Mention", note: data.Mention }     
          ];
          break;
        case "3":
          notes = [
            { matiere: "Sous-Module S5.M1.1: JAVA I", note: data.JAVA },
            { matiere: "Sous-Module S5.M1.2 : C#", note: data["C#"] },
            { matiere: "Module S5.M1 : Moyenne_JAVA_et_C#", note: data["Moyenne_JAVA_et_C#"] },
            { matiere: "Module S5.M2 : SI", note: data.SI },
            { matiere: "Module S5.M3 : RO", note: data.RO },
            { matiere: "Module S5.M4.1 : Ana_Don_I", note: data.Ana_Don_I },
            { matiere: "Module S5.M4.2 : Ana_Num_II", note: data.Ana_Num_II },
            { matiere: "Module S5.M4 : Moyenne_Ana_Don_I_et_Ana Num_U", note: data["Moyenne_Ana_Don_I_et_Ana Num_U"] },
            { matiere: "Module S5.M5.1 : Systèmes d'exploitations", note: data.Sys_Exp },
            { matiere: "Module S5.M5.2 : Python Avancée", note: data.Python_avancé },
            { matiere: "Module : Moyenne Systèmes d'exploitations et Python Avancée", note: data["Moyenne_Sys_Exp_et_Python_avancé"] },
            { matiere: "Module : TEC 5", note: data.TEC_V },
            { matiere: "Module : Anglais 5", note: data.Anglais_V },
            { matiere: "Module : Moyenne TEC 5 et Anglais_5", note: data["Moyenne_TEC_5_et_Anglais_5"] },
            { matiere: "Resultat Semestre S5", note: data["Resultat_Semestre_S5"] },
            { matiere: "Moyenne Semestre S5", note: data["Moyenne_Semestre_S5"] },
            { matiere: "Classement", note: data.Classement },
            { matiere: "Sous-Module S6.M1.1: JAVA II", note: data["JAVA__1"] },
            { matiere: "Sous-Module S6.M1.2 : Dot_Net", note: data.Dot_Net },
            { matiere: "Module S6.M1 : Moyenne Java et Dot Net", note: data["Moyenne_Java_et_Dot_Net"] },
            { matiere: "Sous-Module S6.M2.1 : UML", note: data.UML },
            { matiere: "Sous-Module S6.M2.2 : WEB", note: data.WEB },
            { matiere: "Module S6.M2 : Moyenne_UML et WEB", note: data["Moyenne_UML_et_WEB"] },
            { matiere: "Sous-Module  S6.M3.1: Ana D II", note: data.Ana_D_II },
            { matiere: "Sous-Module S6.M3.2 : BI", note: data.BI },
            { matiere: "Module S6.M3: Moyenne Ana D. II et BI", note: data["Moyenne_Ana_D_II_et_BI"] },
            { matiere: "Module S6.M4  : Int. Reseaux", note: data.Int_Res },
            { matiere: "Module S6.M5 : Adm. Unix", note: data.Adm_Unix },
            { matiere: "Sous-Module S6.M6.1 : Insertion Professionel", note: data.Ins_Pro },
            { matiere: "Sous-Module S6.M6.2: Stage", note: data.Stage },
            { matiere: "Sous-Module S6.M6.3 : Moyenne_Mod_Stage", note: data["Moyenne_Mod_Stage"] },
            { matiere: "Resultat Semestre S6", note: data["Resultat_Semestre_S6"] },
            { matiere: "Moyenne Semestre S5 ", note: data["Moyenne_Semestre_S5__1"] },
            { matiere: "Moyenne Semestre S6", note: data["Moyenne_Semestre_S6"] },
            { matiere: "Moyenne Annuel", note: data["Moyenne_Annuel"] },
            { matiere: "Resultat Annéee", note: data["Resultat_Annéee"] },
            { matiere: "Mention", note: data.Mention }
          ];
          break;
        default:
          notes = [];
      }

      // Générer le tableau des notes
      notes.forEach(item => {
        content += `${item.matiere} : ${item.note}\n`;
      });
    
      // Appliquer un style moderne
      doc.setFont("helvetica");
      doc.setFontSize(12);
      doc.setTextColor(36, 41, 46); // Couleur de texte : Noir
    
      // Ajouter le titre centré
      const pageWidth = doc.internal.pageSize.width;
      const today = new Date();
      const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      const imgWidth = 50; // Largeur de l'image
      const imgHeight = 50; // Hauteur de l'image
      const margin = 0;
      const x = (pageWidth - imgWidth) / 2;
      const y = margin;
      doc.addImage(logo, "PNG", x, y, imgWidth, imgHeight);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Relevé de notes", 90, 45, { fontSize: 16 }); // Increase font size to 16
      // doc.text(` Nom : ${Nom}`, 85, 85);
// Générer le tableau des notes
let yPosition = 90; // Initial Y position
notes.forEach(item => {
  // Convert note value to string
  const noteValue = item.note.toString();
  // Add padding and set font style
  doc.setFont("helvetica", "normal");
  doc.text(item.matiere, 20, yPosition); // Note name
  doc.text(noteValue, 170, yPosition); // Note value
  yPosition += 5; // Increase Y position for padding
});

      doc.text(`Fait à Fès, le : ${date}`, 150, 20);      
  
      doc.text(`L'étudiant${data.Sexe === "F" ? "e" : ""} ${Prénom} ${Nom}, né${data.Sexe === "F" ? "e" : ""} le ${data.Date_Naissance} à ${data.Lieu_Naissance}, est inscrit${data.Sexe === "F" ? "e" : ""} en ${parseInt(donneesRecues.annee) + 1}${donneesRecues.annee === "1" ? "ère" : "ème"} année, groupe ${groupe} à l'ESISA. `, 20, 60);
      doc.text("Ce relevé comprends les résultats obtenus pour le Semestre 1 et 2 de l'année scolaire 2022-2023.\n", 20, 65);
      doc.text("Ce document est conforme aux droits et règlements de l'ESISA.", 20, 70);
      doc.text("Pour toute autre demandes, nous vous prions de contacter le service administrative l'ESISA.", 20, 75);
      

      

        doc.setFont("helvetica", "bold");
        doc.text("Attesté par", 150, 280);
        // doc.line(150, 215, 100, 215); // Ligne de signature
        doc.setFont("helvetica", "normal");
        doc.text("Président et Directeur Pédagogique de l'ESISA", 120, 285); // Fonction du signataire
        doc.text("Khalid Mekouar", 150, 290); // Nom du signataire
        // doc.addImage(signature, "PNG", 150, 265, 80, 40); // Ajoutez la signature en image

        
        
      // Sauvegarder le PDF
      doc.save("releve_de_notes.pdf");
    } catch (error) {
      console.error('Erreur lors de la génération du PDF du relevé de notes :', error);
    }
  };


  return (
    <div style={{ textAlign: "center" }} className="releve-de-notes-container">
      {responseError && (
        <div>
          <Typography variant="body1" color="error">
            Une erreur s'est produite lors de la récupération des relevés de notes : {responseError}
          </Typography>
        </div>
      )}
      <h2 className="title">Relevés de notes</h2>
      <p className="description">
        Vous pouvez télécharger vos relevés de notes en cliquant sur les liens ci-dessous :
      </p>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Grid style={{ justifyContent: "center", marginTop: "2rem" }} container spacing={2}>
            {relevesDeNotes.map((releve, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardContent style={{ backgroundColor: "rgb(193, 187, 216)" }}>
                    <Typography style={{ color: "white", fontWeight: "bold" }} variant="h6" gutterBottom className="title">
                      Relevé de notes {releve.annee}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={handleDownloadPDF}>Relevé de notes - Année universitaire 2022-2023 </Button>
          </div>
          <div style={{ marginTop: "20px" }}>
  <Button variant="contained" disabled>
    Relevé de notes - Année universitaire 2023-2024
  </Button>
</div>

        </div>
      )}
    </div>
  );
};

export default ReleveDeNotes;
