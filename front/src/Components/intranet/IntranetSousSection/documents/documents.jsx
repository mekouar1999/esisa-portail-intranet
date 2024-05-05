import React, { useState, useEffect } from "react";
import axios from "axios";
import "./documents.css";
import { Button } from '@mui/material';

const Documents = () => {
  const [files, setFiles] = useState({
    releveBac: null,
    diplomeBac: null,
    cin: null,
    photo: null,
    attestationHebergement: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfData, setPdfData] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleFileChange = (event, fileType) => {
    const newFiles = { ...files };
    newFiles[fileType] = event.target.files[0];
    setFiles(newFiles);
  };


  
  const associateDocuments = async (files) => {
    try {
      console.log("Tentative d'association des documents :", files);
  
      const token = sessionStorage.getItem("token");
      console.log("Token récupéré depuis sessionStorage :", token);
  
      const userId = sessionStorage.getItem("_id");
      console.log("ID utilisateur récupéré depuis sessionStorage :", userId);
  
      if (!token || !userId) {
        throw new Error("Token d'authentification ou ID utilisateur manquant.");
      }
  
      const filesArray = Object.keys(files).map((fileType) => ({
        user: userId,
        fileType,
        fileData: files[fileType],
      }));
      console.log("Fichiers convertis en tableau d'objets :", filesArray);
  
      const response = await axios.post(
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
  
  const handleUpload = async () => {
    const formData = new FormData();

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }

    try {
      const response = await axios.post(
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
      console.log("response.data:", uploadedFiles);

      await associateDocuments(uploadedFiles);
      setUploadedFiles(uploadedFiles);
    } catch (error) {
      console.error("Erreur lors du téléchargement des fichiers : ", error);
    }
  };

  const handleDownload = async (file, selectedIndex) => {
    try {
      const selectedFile = file[selectedIndex];
      if (!selectedFile) {
        throw new Error("Indice sélectionné invalide.");
      }
  
      let base64Data;
      if (selectedFile.fileData) {
        base64Data = selectedFile.fileData;
      } else {
        throw new Error("La base64 n'est pas présente dans l'objet file.");
      }
  
      // Créer un Blob à partir des données base64
      const blob = base64toBlob(base64Data);
  
      // Générer une URL à partir du Blob
      const href = window.URL.createObjectURL(blob);
  
      // Créer un lien de téléchargement pour le fichier
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", selectedFile.originalname);
      document.body.appendChild(link);
      link.click();
  
      // Nettoyer l'URL après le téléchargement
      window.URL.revokeObjectURL(href);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier : ", error);
    }
  };
  
  // Fonction pour convertir une chaîne base64 en Blob
  const base64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: 'application/pdf' });
  };
  
  useEffect(() => {
    setFiles({
      releveBac: null,
      diplomeBac: null,
      cin: null,
      photo: null,
      attestationHebergement: null,
    });
  }, [uploadedFiles]);

  const handlePreviewPDF = async (file) => {
    try {
      if (!file || !file.url) {
        throw new Error("L'URL du fichier PDF est manquante.");
      }
      const response = await axios.get(file.url, {
        responseType: "arraybuffer", // Demandez les données au format ArrayBuffer
      });
      const base64Data = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      setPdfData(`data:application/pdf;base64,${base64Data}`);
    } catch (error) {
      console.error("Erreur lors du chargement du fichier PDF :", error);
    }
  };
  

  return (
 
    <>
  <div className="centered-content">
    <h2 className="title">Documents universitaires</h2>
    <p className="description">
      Mettez à jour vos documents en cliquant sur les liens ci-dessous :
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
              <Button style={{marginLeft:"1rem"}} variant="contained" onClick={handleUpload}>Envoyer</Button>            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <input
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
      <div className="uploaded-files">
        <h2 className="uploaded-title">Documents téléchargés :</h2>
        <ul className="file-list">
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file.originalname}
              </a>
          
              <div style={{textAlign:"center"}}>
              <Button variant="contained"  onClick={() => handleDownload(uploadedFiles, index)}>
                Télécharger le fichier uploadé
                </Button>

              </div>
              {/* <button onClick={() => file.url && handlePreviewPDF(file)}>
  Voir PDF
</button> */}

            </li>
          ))}
        </ul>
      </div>
    )}

    {pdfData && (
      <div className="pdf-preview">
        <embed
          src={pdfData}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      </div>
    )}
  </div>
</>

  );
};

export default Documents;
