import React, { useEffect, useState } from "react";
import ProfilePic from "./ProfilePic";
import TagProfileInfo from "./TagProfileInfo";
import CommentsList from "../components/CommentsList";
import "../styles/profile.css";

function ProfileInfo({ comments }) {
  const [profileName, setProfileName] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // Nuevo estado para el archivo seleccionado
  const [fileName, setFileName] = useState(""); // Estado para el nombre del archivo

  useEffect(() => {
    getTags();
  }, []);

  useEffect(() => {
    getProfileName();
  }, []);

  async function getTags() {
    try {
      const userId = localStorage.getItem("token id");
      const tagsFetched = await fetch("/api/getTags", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      const tagsResponse = await tagsFetched.json();
      setTags(tagsResponse.sentTags);
    } catch (error) {
      console.error("No se pudieron obtener los tags", error);
    }
  }

  async function getProfileName() {
    try {
      const userId = localStorage.getItem("token id");
      const response = await fetch("/api/getName", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      const data = await response.json();
      setProfileName(data.fullName);
    } catch (err) {
      console.error(err);
    }
  }

  // Manejo de la carga de archivos
  const handleUploadProfilePic = (event) => {
    const imageFile = event.target.files[0];
    setSelectedFile(imageFile);
    setFileName(imageFile.name); // Guarda el nombre del archivo seleccionado
  };

  const handleUploadSubmit = async () => {
    try {
      const imageToSend = new FormData();
      imageToSend.append("image", selectedFile);
      const userId = localStorage.getItem("token id");
      const updateProfilePic = await fetch("/api/profile/updatePic", {
        method: "POST",
        body: imageToSend,
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      });
      if (updateProfilePic.ok) {
        console.log("La foto se actualizó con éxito");
        window.location.reload(); // Recargar la página después de la subida
      }
    } catch (error) {
      console.error("No se pudo actualizar la foto de perfil!");
    }
  };

  return (
    <div className="profile-info">
      <div className="profile-pic-container">
        <ProfilePic className="Profile-Pic" />
      </div>
      <div>
        <p className="profile-name">{profileName}</p>
      </div>

      {/* Botones debajo del nombre del perfil */}
      <div className="profile-buttons-container">
        {/* Botón para cargar nueva imagen de perfil */}
        <label htmlFor="fileInput" style={{ position: "relative" }}>
          <input
            type="file"
            id="fileInput"
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              cursor: "pointer",
            }}
            onChange={handleUploadProfilePic}
            accept="image/*"
          />
          <button className="upload-button">Subir nueva foto de perfil</button>
        </label>

        {/* Botón para añadir un nuevo libro */}
        <button
          className="upload-button"
          onClick={() => (window.location.href = "/feed.html")}
        >
          Añadir nuevo libro
        </button>

        {/* Botón para añadir un nuevo tag */}
        <button
          className="upload-button"
          onClick={() => (window.location.href = "/customizeTags.html")}
        >
          Añadir nuevo tag
        </button>
      </div>

      {selectedFile && (
        <div>
          <p className="fileName">{fileName}</p>
          <button className="submit-button" onClick={handleUploadSubmit}>
            Guardar
          </button>
        </div>
      )}

      {/* Mostrar tags del usuario */}
      <div className="tag-container">
        {tags.map((tag, index) => (
          <TagProfileInfo
            className="tag-entry"
            key={index}
            tagname={tag.tagname}
          />
        ))}
      </div>

      {/* Mostrar comentarios debajo de los tags */}
      <div className="comments-section-inside">
        <h3>Comentarios recibidos</h3>
        <div className="comments-scroll-container-inside">
          <CommentsList comments={comments} /> {/* Mostramos los comentarios */}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
