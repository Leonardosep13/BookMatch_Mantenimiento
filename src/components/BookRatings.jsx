import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookRatings = ({ id_libro }) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`/api/calificaciones_libros/${id_libro}`);
                setRatings(response.data);
            } catch (error) {
                console.error('Error al obtener calificaciones', error);
            }
        };

        fetchRatings();
    }, [id_libro]);

    return (
        <div>
            <h3>Calificaciones de este libro</h3>
            {ratings.length > 0 ? (
                ratings.map((rating) => (
                    <div key={rating.id}>
                        <p>Usuario {rating.id_usuario}: {rating.calificacion} estrellas</p>
                        {rating.comentario && <p>Comentario: {rating.comentario}</p>}
                    </div>
                ))
            ) : (
                <p>No hay calificaciones aún.</p>
            )}
        </div>
    );
};

export default BookRatings;
