import React from "react";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import emploiDuTempsImage from "../../../../images/edt1.png";
import emploiDuTempsImage2 from "../../../../images/edt2.png";

const EmploiDuTemps = () => {
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
          {["Groupe A", "Groupe B", "Groupe C", "Groupe D"].map((groupe, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
              <CardContent style={{ backgroundColor: "rgb(193, 187, 216)" }}>

                  <Typography variant="h6" gutterBottom className="annee-link">
                    {groupe}
                  </Typography>
                  <Grid container spacing={1}>
                    {[1, 2].map((semestre) => (
                      <Grid item xs={12} key={semestre}>
                        <Card sx={{ marginBottom: 2 }}>
                          <CardMedia
                            component="img"
                            height="140"
                            image={semestre === 1 ? emploiDuTempsImage : emploiDuTempsImage2}
                            alt={`Emploi du temps - Semestre ${semestre}`}
                          />
                          <CardContent>
                            <Typography variant="h4" gutterBottom>
                              Semestre {semestre}
                            </Typography>
                            <Typography variant="body2">
                              <a
                                href={`/emploi-du-temps-semestre-${semestre}.pdf`}
                                className="download-link"
                                download
                              >
                                Emploi du temps - Semestre {semestre}
                              </a>
                            </Typography>
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
      </div>
    </div>
  );
};

export default EmploiDuTemps;
