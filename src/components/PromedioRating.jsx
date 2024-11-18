import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PromedioRating = ({ userId }) => {
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        const fetchAverageRating = async () => {
            try {
                const response = await axios.get(`/api/calificaciones/${userId}`);
                if (response.data.length > 0) {
                    const total = response.data.reduce((acc, rating) => acc + rating.rating, 0);
                    const avg = total / response.data.length;
                    setAverageRating(avg);
                } else {
                    setAverageRating(0); // Si no hay calificaciones, el promedio es 0
                }
            } catch (error) {
                console.error('Error al obtener las calificaciones:', error);
            }
        };

        fetchAverageRating();
    }, [userId]);

    return (
        <div>
            <h3>Promedio de Calificaciones</h3>
            <span>{averageRating.toFixed(3)}</span>
            <div>
                {/* Mostrar estrellas */}
                {[...Array(5)].map((_, index) => (
                    <span key={index} className={index < Math.round(averageRating) ? "active" : "inactive"}>
                        ★
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PromedioRating;
