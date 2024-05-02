import React from "react";
import "./ReleveDeNotes.css"; // Importation du fichier CSS
import logoReleve from "../../../../images/releve.png";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReleveDeNotes = () => (
  <div className="releve-de-notes-container">
    <h2 className="title">Relevés de notes</h2>
    <p className="descriptionrelevenotes">
      Vous pouvez télécharger vos relevés de notes en cliquant sur les liens
      ci-dessous
    </p>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Année</TableCell>
            <TableCell>Semestre</TableCell>
            <TableCell>Télécharger</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {relevesDeNotes.map((releve) => (
            <TableRow key={releve.id}>
              <TableCell>{releve.annee}</TableCell>
              <TableCell>{releve.semestre}</TableCell>
              <TableCell>
                <a
                  href={releve.link}
                  className="download-link-releve"
                  download
                >
                  Télécharger
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
);

const relevesDeNotes = [
  { id: 1, annee: "Licence 1", semestre: "Semestre 1", link: "/releve-note-annee-1-semestre-1.pdf" },
  { id: 2, annee: "Licence 1", semestre: "Semestre 2", link: "/releve-note-annee-1-semestre-2.pdf" },
  { id: 3, annee: "Licence 2", semestre: "Semestre 1", link: "/releve-note-annee-2-semestre-1.pdf" },
  { id: 4, annee: "Licence 2", semestre: "Semestre 2", link: "/releve-note-annee-2-semestre-2.pdf" },
  { id: 5, annee: "Licence 3", semestre: "Semestre 1", link: "/releve-note-annee-3-semestre-1.pdf" },
  { id: 6, annee: "Licence 3", semestre: "Semestre 2", link: "/releve-note-annee-3-semestre-2.pdf" },
  { id: 7, annee: "Master 1", semestre: "Semestre 1", link: "/releve-note-annee-4-semestre-1.pdf" },
  { id: 8, annee: "Master 1", semestre: "Semestre 2", link: "/releve-note-annee-4-semestre-2.pdf" },
  { id: 9, annee: "Master 2", semestre: "Semestre 1", link: "/releve-note-annee-5-semestre-1.pdf" },
  { id: 10, annee: "Master 2", semestre: "Semestre 2", link: "/releve-note-annee-5-semestre-2.pdf" },
  // Ajoutez d'autres données de relevés de notes selon vos besoins
];


export default ReleveDeNotes;
