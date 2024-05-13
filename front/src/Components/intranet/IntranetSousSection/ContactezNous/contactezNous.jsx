import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import axios from "axios";
import "./ContactezNous.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../../Spinner"; // Assurez-vous que le chemin vers le composant Spinner est correct

const ContactezNous = () => {
  const [responseError, setResponseError] = useState(null);
  const [donneesRecues, setDonneesRecues] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
  const [submitting, setSubmitting] = useState(false); // Etat de soumission du formulaire

  useEffect(() => {
    if (!dataFetched) {
      const fetchRelevesDeNotes = async () => {
        try {
          const token = sessionStorage.getItem("token");
          const cin = sessionStorage.getItem("cin");
          const response = await axios.get(
          //  `http://localhost:4000/api/student/${cin}`,
            `https://esisa-portail-intranet-back.vercel.app/api/student/${cin}`,


            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
         
          setDonneesRecues(response.data.annee);
          setDataFetched(true);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des relevés de notes de l'utilisateur :",
            error
          );
          setResponseError(error.message);
        }
      };

      fetchRelevesDeNotes();
    }
  }, [dataFetched]);

  const groupe = sessionStorage.getItem("groupe");
  const annee = donneesRecues;


  const anneeText = {
    1: "2ème année",
    2: "3ème année",
    3: "4ème année",
    4: "5ème année",
  }[annee];

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (anneeText) {
      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("_id");

      setLoading(true); // Définir le chargement sur true avant la requête

      axios
        .get(
         // `http://localhost:4000/api/user/${userId}`
          ` https://esisa-portail-intranet-back.vercel.app/api/user/${userId}`

         
          , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setLoading(false); // Définir le chargement sur false après la réception de la réponse
          setFormData({
            subject: "",
            Nom: response.data.Nom,
            Prénom: response.data.Prénom,
            classe: anneeText,
            groupe: response.data.groupe,
            message: "",
          });
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          setLoading(false); // Définir le chargement sur false en cas d'erreur
        });
    }
  }, [anneeText]);

  const [formData, setFormData] = useState({
    subject: "",
    Nom: "",
    Prénom: "",
    classe: "",
    groupe: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bloquer le bouton et définir l'état de soumission sur true
    setSubmitting(true);

    try {
      const response = await axios.post(
      //  "http://localhost:4000/contact",
        " https://esisa-portail-intranet-back.vercel.app/contact",


       
        formData
      );

      toast.success("Message transmis avec succès!");

      // Réinitialiser le formulaire et l'état de soumission une fois la réponse reçue
      setFormData({
        subject: "",
        Nom: "",
        Prénom: "",
        classe: "",
        groupe: "",
        message: "",
      });
      setSubmitting(false);
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      toast.error(
        "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer."
      );

      // Réinitialiser l'état de soumission en cas d'erreur
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="centered-content">
        <h2 className="title"> ESISA SUPPORT</h2>
        <p className="description">Service disponible 24/24 7/7</p>
      </div>
      <div className="info-contact-container">
        <div className="response-time">
          ESISA est là pour répondre à vos questions et vous accompagner. Nous
          nous engageons à vous fournir une assistance rapide et efficace.
          N'hésitez pas à nous contacter pour toute demande ou préoccupation,
          nous sommes là pour vous aider.
        </div>
      </div>
      <div className="info-contact-container">
        <div className="modal-header">
          <FaEnvelope className="contact-icon" />
          <h2>Contactez-nous</h2>
        </div>
        {loading ? ( // Afficher le spinner lorsque le chargement est en cours
          <Spinner />
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Objet de la demande"
                value={formData.subject}
                onChange={handleChange}
                className="input"
                required // Champ requis
              />
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="textarea"
                required // Champ requis
              ></textarea>
            </div>
            <div className="modal-buttons">
            <button type="submit" className="button" disabled={submitting}>
  {submitting ? <Spinner /> : "Envoyer"}
</button>

            </div>
          </form>
        )}
      </div>
      <ToastContainer />
      <div className="medias-contact-container">
        <div className="social-icons">
          <a
            href="https://web.facebook.com/profile.php?id=100069321947366"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://www.youtube.com/@esisafesofficiel3275"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/esisa.ac.ma/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/school/esisa/mycompany/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>

      <br />
    </>
  );
};

export default ContactezNous;
