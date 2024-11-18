import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingForm = () => {
    const [rating, setRating] = useState(1);
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [toUserId, setToUserId] = useState(''); // Usuario seleccionado

    // Cargar la lista de usuarios al montar el componente
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await axios.get('/api/usuarios'); // Ruta para obtener usuarios
                setUsuarios(response.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/calificaciones', { toUserId, rating });
            alert(response.data.message); // Mostrar mensaje de éxito
            window.location.reload(); // Recargar la página después de enviar la calificación
        } catch (error) {
            alert('Error al enviar la calificación');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="usuario">Seleccionar un usuario a calificar:</label>
            <select
                id="usuario"
                value={toUserId}
                onChange={(e) => setToUserId(e.target.value)}
                required
            >
                <option value="">Selecciona un usuario</option>
                {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                        {usuario.nombres}
                    </option>
                ))}
            </select>

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

            <button type="submit">Enviar Calificación</button>
        </form>
    );
};

export default RatingForm;
