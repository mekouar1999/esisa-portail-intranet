import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, TextField, Snackbar } from '@mui/material';
import { PDFDocument } from "pdf-lib";
import "./documents.css"

const Documents = () => {
  const [files, setFiles] = useState({
    releveBac: null,
    diplomeBac: null,
    cin: null,
    photo: null,
    attestationHebergement: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const token = sessionStorage.getItem("token");

  const handleFileChange = (event, fileType) => {
    const newFiles = { ...files };
    newFiles[fileType] = event.target.files[0];
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }

    try {
      const response = await axios.post(
       //  "https://esisa-portail-intranet-back.vercel.app/api/upload",
        "http://localhost:4000/api/upload",

        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const uploadedFiles = response.data;
      await associateDocuments(uploadedFiles);
      setUploadedFiles(uploadedFiles);
      setSnackbarOpen(true); // Afficher la notification de succès
    } catch (error) {
      console.error("Erreur lors du téléchargement des fichiers : ", error);
    }
  };
  const associateDocuments = async (files) => {
    try {
      const userId = sessionStorage.getItem("_id");

      if (!token || !userId) {
        throw new Error("Token d'authentification ou ID utilisateur manquant.");
      }

      const filesArray = Object.keys(files).map((fileType) => ({
        user: userId,
        fileType,
        fileData: files[fileType],
      }));

      const response = await axios.post(
        // "https://esisa-portail-intranet-back.vercel.app/api/upload/associate-documents",
        "http://localhost:4000/api/upload/associate-documents",

        { uploadedFiles: filesArray },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Documents associés avec succès :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'association des documents :", error.message);
    }
  };

  const handleDownload = async () => {
    try {
      const combinedPdf = await PDFDocument.create();
      
      for (const file of uploadedFiles) {
        const pdfBytes = await PDFDocument.load(file.fileData);
        const copiedPages = await combinedPdf.copyPages(pdfBytes, pdfBytes.getPageIndices());
        copiedPages.forEach(page => combinedPdf.addPage(page));
      }

      const combinedPdfBytes = await combinedPdf.save();
      const blob = new Blob([combinedPdfBytes], { type: 'application/pdf' });
      const href = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "combined_documents.pdf");
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(href);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier combiné : ", error);
    }
  };

  return (
    <>
      <div className="centered-content">
        <h2 className="title">Documents universitaires</h2>
        <p className="description">
          Mettez à jour vos documents au format PDF en cliquant sur les liens ci-dessous :
        </p>
      </div>

      <div className="upload-page-container">
        <div className="file-inputs">
          {Object.keys(files).map((fileType) => (
            <div className="file-input" key={fileType}>
              <div className="divtitleDoc">
                <label className="titleDoc">
                  {fileType === "releveBac"
                    ? "Relevé de bac"
                    : fileType === "diplomeBac"
                    ? "Diplôme de bac"
                    : fileType === "attestationHebergement"
                    ? "Attestation d'hébergement"
                    : fileType.toUpperCase()}
                </label>
                {files[fileType] && (
                  <Button style={{marginLeft:"1rem"}} variant="contained" onClick={handleUpload}>Envoyer</Button>
                )}
              </div>
              <div style={{ textAlign: "center" }}>
                <TextField
                  className="inputDoc"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => handleFileChange(event, fileType)}
                />
              </div>
            </div>
          ))}
        </div>

        {uploadedFiles.length > 0 && (
          <div style={{textAlign:"center" , marginTop:"2rem"}} className="combine-and-download">
            <Button variant="contained" onClick={handleDownload}>
              Télécharger le PDF combiné contenant tous les documents envoyés
            </Button>
          </div>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Les documents ont été associés à l'utilisateur avec succès."
      />
    </>
  );
};

export default Documents;
