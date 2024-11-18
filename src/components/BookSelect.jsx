import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSelect = ({ onSelectBook }) => {
    const [libros, setLibros] = useState([]);

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

    return (
        <select onChange={(e) => onSelectBook(e.target.value)}>
            <option value="">Selecciona un libro</option>
            {libros.map((libro) => (
                <option key={libro.id_libro} value={libro.id_libro}>
                    {libro.titulo}
                </option>
            ))}
        </select>
    );
};

export default BookSelect;
