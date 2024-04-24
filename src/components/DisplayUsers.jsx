import { useState, useEffect } from 'react';
import UsersValidationEntry from './UsersValidationEntry';

function DisplayUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('/api/getUsers', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const usersData = await response.json();
                    setUsers(usersData);
                } else {
                    console.error('Failed to fetch users:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching users:', error.message);
            }
        }

        fetchUsers();
    }, []);

    const fetchedUsers = Array.isArray(users.usersInfo) ? users.usersInfo : [];
    console.log(fetchedUsers);

    async function validateUser(id) {
        console.log("validate clicked");

        try {
           //not complete
           const response = await fetch(`/api/verifyUser/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            alert("El usuario se valido con exito");
            setUsers({
                ...users,
                usersInfo: fetchedUsers.filter(user => user.id !== id)
            });
        } else {
            console.error('No se pudo validar al usuario', response.statusText);
        }
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteUser(id) {
        console.log("del user clicked");
        try {
            const response = await fetch(`/api/verifyUser/deleteUser/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                alert("El usuario se rechazo con exito");
                setUsers({
                    ...users,
                    usersInfo: fetchedUsers.filter(user => user.id !== id)
                });
            } else {
                console.error('No se pudo eliminar al usuario', response.statusText);
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className='listContainer'>
            {fetchedUsers.map(usersItem => (
                <UsersValidationEntry
                    key={usersItem.id}
                    id={usersItem.id}
                    nombres={usersItem.nombres}
                    apellidos={usersItem.apellidos}
                    codigo={usersItem.codigo}
                    correo={usersItem.correo}
                    credencial={usersItem.credencial}
                    onDelete={deleteUser}
                    onClick={validateUser}
                />
            ))}
        </div>
    );
}

export default DisplayUsers;
