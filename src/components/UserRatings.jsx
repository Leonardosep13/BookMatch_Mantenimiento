
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserRatings = ({ userId }) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const response = await axios.get(`/api/calificaciones/${userId}`);
                setRatings(response.data);
            } catch (error) {
                console.error('Error al obtener las calificaciones:', error);
            }
        };

        fetchRatings();
    }, [userId]);

    return (
        <div>
       <h3>Calificacion promedio del Usuario</h3>
{ratings.length > 0 ? (
    <ul>
        {/* Mostrar cada calificación */}
        
        {/* Mostrar el promedio de las calificaciones con estrellas */}
        <li>
            <strong>Calificacion: </strong>
            <span>
                {(ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length).toFixed(3)}
            </span>
            <div>
                {/* Mostrar estrellas */}
                {[...Array(5)].map((_, index) => {
                    const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
                    return (
                        <span key={index} className={index < Math.round(averageRating) ? "active" : "inactive"}>
                            ★
                        </span>
                    );
                })}
            </div>
        </li>
    </ul>
) : (
    <p>No hay calificaciones disponibles.</p>
)}


        </div>
    );
};

export default UserRatings;

