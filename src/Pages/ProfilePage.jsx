
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeaderReal from "../components/HeaderReal";
import ProfileInfo from "../components/ProfileInfo";
import DisplayBooks from "../components/DisplayBooks";
import '../styles/profile.css'; 

function ProfilePage() {
  const [comments, setComments] = useState([]); 
 
  const fetchMyComments = async () => {
    try {
      const response = await fetch("/api/getMyComments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token id")}`, 
        },
      });
      if (!response.ok) {
        throw new Error("No se pudieron cargar los comentarios");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  
  useEffect(() => {
    fetchMyComments();
  }, []);

  return (
    <div>
      <HeaderReal />
      <div className="profile-layout">
        <div className="profile-info-container">
          <ProfileInfo comments={comments} /> {}
        </div>
        <div className="books-container">
          <DisplayBooks />
        </div>
      </div>
   
    </div>
  );
}

export default ProfilePage;

