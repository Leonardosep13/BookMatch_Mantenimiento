import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuejaForm = ({ usuarioId }) => {
    const [libros, setLibros] = useState([]);
    const [selectedLibro, setSelectedLibro] = useState('');
    const [detalleQueja, setDetalleQueja] = useState('');

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
            const response = await axios.post('/api/quejas', {
                id_usuario: usuarioId,
                id_libro: selectedLibro,
                detalle: detalleQueja
            });

            alert(`Reporte registrado con exito (CAMBIAR ESTO QUE SE VE FEO SIUUUUUUU)`);
            setSelectedLibro('');
            setDetalleQueja('');
        } catch (error) {
            alert('Debes de seleccionar el usuario que subio el libro (MODIFICAR ESTO QUE SE VE FEO WAAAAAA)');
        }
    };

    return (
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
    );
};

export default QuejaForm;
