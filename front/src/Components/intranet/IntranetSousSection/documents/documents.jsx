import React, { useState } from 'react';
import axios from 'axios';
import './documents.css'; // Assurez-vous de créer le fichier CSS pour le style

const UploadPage = () => {
  const [files, setFiles] = useState({
    releveBac: null,
    diplomeBac: null,
    cin: null,
    photo: null,
    attestationHebergement: null
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event, fileType) => {
    setFiles({
      ...files,
      [fileType]: event.target.files[0]
    });
  };

  const handleUpload = async () => {
    const formData = new FormData();

    for (const key in files) {
      if (files[key]) {
        formData.append(key, files[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:4000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedFiles(response.data);
    } catch (error) {
      console.error('Error uploading files: ', error);
    }
  };

  return (

    
<>


<h2 className="title">Documents universitaires</h2>
<p className="description">
  Mettez à jour vos documents en cliquant sur les liens ci-dessous :
</p>

<div className="upload-page-container">
      <div className="file-inputs">
        <div className="file-input">
        <div className='divtitleDoc'>  
          <label className='titleDoc'>Relevé de bac</label>

        </div>
        <div style={{textAlign:"center"}}>
        <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => handleFileChange(event, 'releveBac')} />

        </div>
        </div>
        <div className="file-input">
        <div className='divtitleDoc'>  
<label className='titleDoc'>Diplôme de bac</label>

</div>          <div style={{textAlign:"center"}}>
    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => handleFileChange(event, 'diplomeBac')} />
</div>
        </div>
        <div className="file-input">
        <div>
        <div className='divtitleDoc'>  
<label className='titleDoc'>CIN</label>

</div>
        </div>
        <div style={{textAlign:"center"}}>
    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => handleFileChange(event, 'cin')} />
</div>        </div>
        <div className="file-input">
        <div className='divtitleDoc'>        <label className='titleDoc'>Photo</label>
</div>


<div style={{textAlign:"center"}}>
    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => handleFileChange(event, 'photo')} />
</div>
        </div>
        <div className="file-input">
<div className='divtitleDoc'>          <label className='titleDoc'>Attestation d'hébergement</label>
</div>         



<div style={{textAlign:"center"}}>
    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(event) => handleFileChange(event, 'attestationHebergement')} />
</div>
        </div>
      </div>
      <button className="upload-button" onClick={handleUpload}>Upload</button>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h2 className="uploaded-title">Documents téléchargés :</h2>
          <ul className="file-list">
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                <a href={file.url} target="_blank" rel="noopener noreferrer">{file.originalname}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
</>
  );
};

export default UploadPage;
