
import React, { useState, useEffect } from "react";
import HeaderReal from "../components/HeaderReal";
import ProfileUserInfo from "../components/ProfileUserInfo";
import DisplayUserBooks from "../components/DisplayUserBooks";
import AddComment from "../components/AddComment";
import CommentsList from "../components/CommentsList";
import Tabs from "../components/Tabs";  
import '../styles/comments.css'; 

function UserProfilePage() {
  const [comments, setComments] = useState([]);
  const [idProfile, setIdProfile] = useState(null);

  
  useEffect(() => {
    const storedIdProfile = localStorage.getItem("id propietario");
    if (storedIdProfile) {
      setIdProfile(storedIdProfile);
    } else {
      console.error("No se encontró el id_profile en localStorage");
    }
  }, []);

  
  const fetchComments = async () => {
    if (idProfile) {
      try {
        const response = await fetch(`/api/getComments/${idProfile}`);
        if (!response.ok) {
          throw new Error("No se pudieron cargar los comentarios");
        }

        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (idProfile) {
      fetchComments();
    }
  }, [idProfile]);

  return (
    <div>
      <HeaderReal />

      {}
      <ProfileUserInfo />

      {}
      <Tabs>
        {}
        <div title="Libros">
          <div style={{ display: "flex" }}>
            <div className="profile-info-container">
              <DisplayUserBooks />
            </div>
          </div>
        </div>

        {}
        <div title="Comentarios">
        <div className="comments-container">
            <AddComment fetchComments={fetchComments} /> {}
            <CommentsList comments={comments} /> {}
          </div>
        </div>
      </Tabs>
    </div>
  );
}

export default UserProfilePage;
