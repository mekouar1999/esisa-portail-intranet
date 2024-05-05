import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card, CardContent , Button } from "@mui/material";
import Spinner from "../../../Spinner"; // Importez le composant Spinner

function convertArrayBufferToString(arrayBuffer) {
  return new TextDecoder().decode(new Uint8Array(arrayBuffer));
}

const Binary = {
  createFromBase64: function(base64) {
    let base64String = base64.data;
    console.log('Données base64 reçues :', convertArrayBufferToString(base64String)); // Log pour afficher les données base64

    base64String = convertArrayBufferToString(base64String);

    console.log('Chaîne base64 reçue :', base64String); // Log pour afficher la chaîne base64
    if (!this.isBase64Encoded(base64String)) {
      throw new Error('La chaîne base64 fournie n\'est pas correctement encodée.');
    }

    const binaryData = atob(base64String);
    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }
    return byteArray.buffer;
  },

  isBase64Encoded: function(str) {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }
};

const displayPDF = (base64String) => {
  const binary = Binary.createFromBase64(base64String);
  const byteArray = new Uint8Array(binary);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
};

const ReleveDeNotes = () => {
  const [relevesDeNotes, setRelevesDeNotes] = useState([]);
  const [loading, setLoading] = useState(true); // Ajoutez un état pour gérer le chargement des données
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    const fetchRelevesDeNotes = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('_id');
        const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Réponse des relevés de notes de l'utilisateur :", response.data);
        setRelevesDeNotes(response.data.ESISA || []);
        setLoading(false); // Mettez fin au chargement lorsque les données sont récupérées
      } catch (error) {
        console.error('Erreur lors de la récupération des relevés de notes de l\'utilisateur :', error);
        setResponseError(error.message);
        setLoading(false); // Mettez fin au chargement en cas d'erreur
      }
    };

    fetchRelevesDeNotes();
  }, []); 

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
      {/* Affichez le Spinner pendant le chargement */}
      {loading ? (
        <Spinner />
      ) : (
        <Grid style={{ justifyContent: "center" , marginTop:"2rem" }} container spacing={2}>
          {relevesDeNotes.map((releve, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent style={{ backgroundColor: "rgb(193, 187, 216)" }}>
                  <Typography style={{ color: "white", fontWeight: "bold" }} variant="h6" gutterBottom className="title">
                    Relevé de notes {releve.annee}
                  </Typography>
                  <Grid  container spacing={1}>
                    {[1, 2].map((semestre) => (
                      <Grid item xs={12} key={semestre}>
                        <Card style={{ margin: "auto" }} sx={{ marginBottom: 2 }}>
                          <CardContent>
                            <Typography style={{ marginBottom: "1rem" }} variant="h6" gutterBottom>
                            Relevé de notes du Semestre {semestre}
                            </Typography>
                            <Button variant="contained" onClick={() => displayPDF(releve[`releveNotesSemestre${semestre}`].data)}>
                              Ouvrir le PDF
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default ReleveDeNotes;
