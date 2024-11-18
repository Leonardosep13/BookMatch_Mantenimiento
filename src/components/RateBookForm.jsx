import React, { useState } from 'react';
import axios from 'axios';

const RateBookForm = ({ id_libro }) => {
    const [rating, setRating] = useState(1); // Valor predeterminado de calificación
    const [comentario, setComentario] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Enviar los datos al backend
            const response = await axios.post('/api/calificar_libro', {
                id_libro,
                rating,
                comentario
            });
            alert(response.data.message); // Mensaje de éxito
        } catch (error) {
            // Manejo detallado de errores
            if (error.response) {
                // Errores del servidor (como un status 500 o 400)
                alert(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                // Error de red
                alert('Error de red: No se pudo conectar con el servidor');
            } else {
                // Otros errores
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="rating">Calificación:</label>
            <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>

            <label htmlFor="comentario">Comentario:</label>
            <textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Deja un comentario (opcional)"
            ></textarea>

            <button type="submit">Enviar Calificación</button>
        </form>
    );
};

export default RateBookForm;
