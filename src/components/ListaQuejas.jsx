import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListaQuejas = ({ libroId }) => {
    const [quejas, setQuejas] = useState([]);

    useEffect(() => {
        const fetchQuejas = async () => {
            try {
                const response = await axios.get(`/api/quejas/libro/${libroId}`);
                setQuejas(response.data);
            } catch (error) {
                console.error('Error al obtener las quejas:', error);
            }
        };

        fetchQuejas();
    }, [libroId]);

    return (
        <div>
            <h3>Reportes sobre este libro:</h3>
            {quejas.length > 0 ? (
                <ul>
                    {quejas.map((queja) => (
                        <li key={queja.id_queja}>
                            <strong>{queja.nombres} {queja.apellidos}</strong>
                            <p>{queja.detalle}</p>
                            <small>{new Date(queja.fecha_creacion).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay reportes para este libro.</p>
            )}
        </div>
    );
};

export default ListaQuejas;
