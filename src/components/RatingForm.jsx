import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingForm = () => {
    const [rating, setRating] = useState(1);
    const [usuarios, setUsuarios] = useState([]); // Lista de usuarios
    const [toUserId, setToUserId] = useState(''); // Usuario seleccionado
    const [notification, setNotification] = useState({ message: '', type: '' }); // Para mensajes dinámicos

    // Cargar la lista de usuarios al montar el componente
    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Función para obtener la lista de usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('/api/usuarios'); // Ruta para obtener usuarios
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/calificaciones', { toUserId, rating });

            // Configurar la notificación de éxito
            setNotification({ message: response.data.message, type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Limpiar el mensaje después de 3 segundos

            setToUserId(''); // Resetear el usuario seleccionado
            setRating(1); // Resetear la calificación
            await fetchUsuarios(); // Actualizar la lista de usuarios
        } catch (error) {
            // Configurar la notificación de error
            setNotification({ message: 'Error al enviar la calificación', type: 'error' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000); // Limpiar el mensaje después de 3 segundos
        }
    };

    return (
        <div>
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

            {/* Notificación dinámica */}
            {notification.message && (
                <div
                    style={{
                        marginTop: '10px',
                        padding: '10px',
                        color: notification.type === 'success' ? '#155724' : '#721c24',
                        backgroundColor: notification.type === 'success' ? '#d4edda' : '#f8d7da',
                        border: `1px solid ${
                            notification.type === 'success' ? '#c3e6cb' : '#f5c6cb'
                        }`,
                        borderRadius: '5px',
                    }}
                >
                    {notification.message}
                </div>
            )}
        </div>
    );
};

export default RatingForm;
