// src/components/BookDetailPage.js

import React from 'react';
import ComplaintForm from './ComplaintForm';
import ComplaintList from './ComplaintList';

const BookDetailPage = ({ libro, usuarioId }) => {
    return (
        <div>
            <h2>Detalles del Libro: {libro.titulo}</h2> {/* Muestra el nombre del libro */}
            {/* Aquí podrías incluir otros detalles del libro */}
            <ComplaintForm libroId={libro.id} usuarioId={usuarioId} />
            <ComplaintList libroId={libro.id} />
        </div>
    );
};

export default BookDetailPage;
