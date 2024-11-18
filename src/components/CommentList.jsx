import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ id_usuario_comentado }) => {
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const fetchComentarios = async () => {
            try {
                const response = await axios.get(`/api/comentarios_usuarios/${id_usuario_comentado}`);
                setComentarios(response.data);
            } catch (error) {
                console.error('Error al obtener comentarios', error);
            }
        };

        fetchComentarios();
    }, [id_usuario_comentado]);

    return (
        <div>
            <h3>Comentarios</h3>
            {comentarios.length > 0 ? (
                comentarios.map((comentario) => (
                    <div key={comentario.id}>
                        <p>{comentario.comentario}</p>
                        <p><small>{new Date(comentario.fecha).toLocaleString()}</small></p>
                    </div>
                ))
            ) : (
                <p>No hay comentarios aún.</p>
            )}
        </div>
    );
};

export default CommentList;
