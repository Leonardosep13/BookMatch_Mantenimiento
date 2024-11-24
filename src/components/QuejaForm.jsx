import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuejaForm = ({ usuarioId }) => {
    const [libros, setLibros] = useState([]);
    const [selectedLibro, setSelectedLibro] = useState('');
    const [detalleQueja, setDetalleQueja] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' }); // Para mensajes dinámicos

    useEffect(() => {
        const fetchLibros = async () => {
            try {
                const response = await axios.get('/api/libros');
                setLibros(response.data);
            } catch (error) {
                console.error('Error al obtener libros:', error);
            }
        };

        fetchLibros();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/quejas', {
                id_usuario: usuarioId,
                id_libro: selectedLibro,
                detalle: detalleQueja,
            });

            // Mostrar notificación de éxito
            setNotification({ message: 'Reporte registrado con éxito.', type: 'success' });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);

            // Limpiar el formulario
            setSelectedLibro('');
            setDetalleQueja('');
        } catch (error) {
            // Mostrar notificación de error
            setNotification({
                message: 'Debes seleccionar el dueño del libro para enviar el reporte.',
                type: 'error',
            });
            setTimeout(() => setNotification({ message: '', type: '' }), 3000);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="libro">Selecciona un libro:</label>
                <select
                    id="libro"
                    value={selectedLibro}
                    onChange={(e) => setSelectedLibro(e.target.value)}
                    required
                >
                    <option value="">Selecciona un libro</option>
                    {libros.map((libro) => (
                        <option key={libro.id_libro} value={libro.id_libro}>
                            {libro.titulo}
                        </option>
                    ))}
                </select>

                <label htmlFor="detalle">Reporte:</label>
                <textarea
                    id="detalle"
                    value={detalleQueja}
                    onChange={(e) => setDetalleQueja(e.target.value)}
                    required
                ></textarea>

                <button type="submit">Enviar reporte</button>
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

export default QuejaForm;
