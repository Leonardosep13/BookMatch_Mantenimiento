import React from "react";

function CommentsList({ comments }) {
  const baseUrl = "../uploads/"; 

  return (
    <div>
      <h3>Comentarios</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comments.map((comment) => (
          <div key={comment.id_com} className="comment" style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {comment.profile_pic ? (
              <img
                src={`${baseUrl}${comment.profile_pic}`}  
                alt="Foto de perfil"
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}  
              />
            ) : (
              <img
                src="/uploads/default-profile.png"  
                alt="Foto de perfil"
                style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              />
            )}
            <div>
              <p>
                <strong>
                  {comment.nombres} {comment.apellidos}
                </strong>
                : {comment.comentario}
              </p>
              <p>{new Date(comment.fechuki).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentsList;