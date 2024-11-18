import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ id_usuario_comentado, id_usuario }) => {
    const [comentario, setComentario] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/comentarios_usuarios', {
                id_usuario,
                id_usuario_comentado,
                comentario,
            });
            setComentario('');
            // Aquí podrías agregar lógica para mostrar el nuevo comentario sin refrescar la página
        } catch (error) {
            console.error('Error al enviar comentario', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu comentario"
                required
            />
            <button type="submit">Enviar Comentario</button>
        </form>
    );
};

export default CommentForm;
