import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import Button from '@mui/material/Button';

function convertArrayBufferToString(arrayBuffer) {
  return new TextDecoder().decode(new Uint8Array(arrayBuffer));
}

const Binary = {
  createFromBase64: function(base64) {
    let base64String = base64.data;
    if (typeof base64 === 'object' && base64.data && base64.data.data) {
      base64String = convertArrayBufferToString(base64.data.data);
    }
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

const displayPDF = (base64Data) => {
  const binary = Binary.createFromBase64(base64Data);
  const byteArray = new Uint8Array(binary);
  const blob = new Blob([byteArray], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
};


const EmploiDuTemps = () => {
  const [userEmploisDuTemps, setUserEmploisDuTemps] = useState([]);
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    const fetchUserEmploisDuTemps = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('_id');
        const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Réponse des emplois du temps de l'utilisateur :", response.data);
        setUserEmploisDuTemps(response.data.ESISA || []);
      } catch (error) {
        console.error('Erreur lors de la récupération des emplois du temps de l\'utilisateur :', error);
        setResponseError(error.message);
      }
    };

    fetchUserEmploisDuTemps();
  }, []); 

  return (
    <div className="bulletins-container">
      <div className="emploi-du-temps-container">
        <div style={{ textAlign: "center" }}>
          <h2 className="title">Emploi du temps</h2>
          <p className="description">
            Consultez votre emploi du temps en cliquant sur les liens ci-dessous :
          </p>
        </div>
        <Grid container spacing={2}>
          {userEmploisDuTemps.map((emploiDuTemps, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card style={{ textAlign: "center" }}>
                <CardContent style={{ backgroundColor: "rgb(193, 187, 216)" }}>
                  <Typography style={{ marginBottom: "1rem" }} variant="h6" gutterBottom className="annee-link">
                   Groupe {emploiDuTemps.groupe}
                  </Typography>
                  <Grid container spacing={1}>
                    {[1, 2].map((semestre) => (
                      <Grid item xs={12} key={semestre}>
                        
                          <CardContent>
                            <Typography variant="h6" gutterBottom>
                              Semestre {semestre}
                            </Typography>
                            <Typography variant="body2">
                            <Button variant="contained" onClick={() => displayPDF(emploiDuTemps[`emploiDuTempsSemestre${semestre}`])}>
  Ouvrir
</Button>
                            </Typography>
                          </CardContent>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default EmploiDuTemps;
