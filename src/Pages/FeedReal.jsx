import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderReal from '../components/HeaderReal';
import Footer from '../components/Footer';
import BooksFeed from '../components/BooksFeed';
import RatingForm from '../components/RatingForm'; // Componente de calificación de usuarios
import UserRatings from '../components/UserRatings'; // Mostrar las calificaciones de los usuarios
import QuejaForm from '../components/QuejaForm'; // Componente de queja

function FeedReal() {
    const [users, setUsers] = useState([]);
    const [books, setBooks] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [quejas, setQuejas] = useState([]); // Para almacenar las quejas del libro seleccionado

    // Cargar la lista de usuarios y libros
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/usuarios');
                setUsers(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de usuarios:', error);
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/libros');
                setBooks(response.data);
            } catch (error) {
                console.error('Error al obtener la lista de libros:', error);
            }
        };

        fetchUsers();
        fetchBooks();
    }, []);

    // Cargar las quejas del libro seleccionado
    useEffect(() => {
        if (selectedBookId) {
            const fetchQuejas = async () => {
                try {
                    const response = await axios.get(`/api/quejas/libro/${selectedBookId}`); // Endpoint para obtener las quejas de un libro
                    setQuejas(response.data);
                } catch (error) {
                    console.error('Error al obtener las quejas:', error);
                }
            };

            fetchQuejas();
        }
    }, [selectedBookId]); // Solo ejecuta esto cuando el libro seleccionado cambie

    const handleUserChange = (event) => {
        setSelectedUserId(event.target.value);
    };

    const handleBookChange = (event) => {
        setSelectedBookId(event.target.value);
    };

    return (
        <div>
            <div className="divHeader">
                <HeaderReal />
            </div>

            <div style={{ padding: "20px" }}>
                <div style={{ marginBottom: "40px" }}>
                    <BooksFeed />
                </div>

                {/* Sección para calificar usuarios */}
                <div className="calificar-container" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
                    <h2>Calificaciones de los usuarios</h2>

                    {/* Select para elegir el usuario */}
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="user-select">Seleccione el usuario del que quiere saber su calificación:</label>
                        <select
                            id="user-select"
                            value={selectedUserId || ''}
                            onChange={handleUserChange}
                            className="user-select"
                            style={{ marginLeft: "10px" }} // Espacio entre el label y el select
                        >
                            <option value="">-- Seleccionar Usuario --</option>
                            {users.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nombres}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mostrar formulario de calificación y calificaciones del usuario seleccionado */}
                    {selectedUserId && (
                        <div className="calificar-form" style={{ marginTop: "20px" }}>
                            <RatingForm toUserId={selectedUserId} />
                            <div className="calificaciones-container" style={{ marginTop: "20px" }}>
                                <UserRatings userId={selectedUserId} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Sección para quejas del libro */}
                <div className="quejas-container" style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9", marginTop: "40px" }}>
                    <h2>Enviar reporte sobre un Libro</h2>

                    {/* Select para elegir el libro */}
                    <div style={{ marginBottom: "20px" }}>
                        <label htmlFor="book-select">Selecciona un libro para conocer sus reportes:</label>
                        <select
                            id="book-select"
                            value={selectedBookId || ''}
                            onChange={handleBookChange}
                            style={{ marginLeft: "10px" }}
                        >
                            <option value="">-- Seleccionar Libro --</option>
                            {books.map((libro) => (
                                <option key={libro.id_libro} value={libro.id_libro}>
                                    {libro.titulo}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Mostrar las quejas del libro seleccionado */}
                    {selectedBookId && quejas.length > 0 && (
                        <div className="quejas-lista" style={{ marginTop: "20px" }}>
                            <h3>Reportes de este libro:</h3>
                            <ul>
                                {quejas.map((queja) => (
                                    <li key={queja.id_quejas}>
                                        <strong>Detalle:</strong> {queja.detalle} <br />
                                        <em>Fecha: {new Date(queja.fecha_creacion).toLocaleDateString()}</em>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Mostrar el formulario de queja si se selecciona un libro */}
                    {selectedBookId && (
                        <QuejaForm usuarioId={selectedUserId} selectedLibro={selectedBookId} />
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default FeedReal;
