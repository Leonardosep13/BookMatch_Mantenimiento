import React, { useState } from "react";
import swal from "sweetalert";
import '../styles/comments.css'; 

function AddComment({ fetchComments }) {
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token id");

    try {
      const response = await fetch("/api/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_profile: localStorage.getItem("id propietario"),
          comentario: comment,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo agregar el comentario");
      }

      const data = await response.json();
      swal("Éxito", "Comentario agregado con éxito", "success");
      setComment(""); 
      
      fetchComments();
    } catch (error) {
      swal("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder=" Deja un comentario "
        rows="6"
        required
        className="comment-textarea"
      />
      <button type="submit" className="comment-button">  Enviar  </button>

    </form>
  );
}

export default AddComment;