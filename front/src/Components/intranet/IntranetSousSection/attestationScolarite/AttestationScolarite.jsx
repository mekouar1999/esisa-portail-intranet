import React from "react";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import logoAttestation from "../../../../images/attestationScolarite.png";

const AttestationScolarite = () => (
  <div style={{ textAlign: "center" }} className="attestation-container">
    <h2 className="title">Attestations de Scolarité</h2>
    <p className="description">
      Vous pouvez télécharger vos attestations en cliquant sur les liens ci-dessous :
    </p>
    <Grid container spacing={2}>
      {["Licence 1", "Licence 2", "Licence 3", "Master 1", "Master 2"].map((level, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card >
          <CardContent style={{ backgroundColor: "rgb(193, 187, 216)" }}>
              <Typography style={{color:"white", fontWeight:"bold"}} variant="h6" gutterBottom className="title">
                {level}
              </Typography>
              <Grid container spacing={1}>
                {Array.from({ length: 2 }, (_, j) => (
                  <Grid item xs={12} key={j}>
                    <Card style={{margin:"auto"}} sx={{ marginBottom: 2 }}>
                      <CardMedia style={{height:"100%"}}
                        component="img"
                        height="140"
                        image={logoAttestation}
                        alt="Attestation"
                      /> 
                              <CardContent>
                        <Typography style={{marginBottom:"1rem"}} variant="h6" gutterBottom>
                          Semestre {j + 1}
                        </Typography>
                        <Typography variant="body2">
                          <a
                            href={`/attestation-${level.replace(" ", "").toLowerCase()}-semestre-${j + 1}.pdf`}
                            className="download-link"
                            download
                          >
                            Attestation - Semestre {j + 1}
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
);

export default AttestationScolarite;
