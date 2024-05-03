import React, { useState, useEffect } from "react";
import axios from "axios";
import "./documents.css";

const Documents = () => {
  const [files, setFiles] = useState({
    releveBac: null,
    diplomeBac: null,
    cin: null,
    photo: null,
    attestationHebergement: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const token = sessionStorage.getItem("token"); // Récupérer le token de sessionStorage

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
        "http://localhost:4000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Utiliser le token dans l'en-tête Authorization
          },
        }
      );
      setUploadedFiles(response.data);

      // Assurez-vous d'envoyer l'ID de l'utilisateur avec les documents téléchargés
      await axios.post(
        "http://localhost:4000/api/upload/associate-documents",
        {
          uploadedFiles: response.data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Utiliser le token dans l'en-tête Authorization
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors du téléchargement des fichiers : ", error);
    }
  };

  const handleDownload = async (file) => {
    try {
      const response = await axios.get(file.url, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.originalname);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier : ", error);
    }
  };

  useEffect(() => {
    // Nettoyer les fichiers téléchargés lorsqu'un nouveau fichier est téléchargé
    setFiles({
      releveBac: null,
      diplomeBac: null,
      cin: null,
      photo: null,
      attestationHebergement: null,
    });
  }, [uploadedFiles]);

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
                  <button onClick={handleUpload}>Télécharger</button>
                )}
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
                  <button onClick={() => handleDownload(file)}>
                    Télécharger
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Documents;
