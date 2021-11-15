import { useState, useEffect } from 'react';
import { getUsers } from '../../services/UsersService';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

export function UsersList() {
  const { user, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers();
  }, [])

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data.data);
  }

  return (
    isAuthenticated && (
      <div>
        <div className="container">
          <h5 className="card-header">Usuarios</h5>
          <table id="usuarios" className="table table-hover table-sm">
            <thead className="p-3 text-center">
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map(usuario => {
                  return (
                    <tr key={usuario._id}>
                      <td>{usuario._id}</td>
                      <td>{usuario.fullName}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.role}</td>
                      <td>{usuario.state}</td>
                      <td className="text-center">
                        <Link to={`/usuarios/editar/${usuario._id}`} className="link">
                          <button className="btn btn-success btn-sm" href="#!">Modificar</button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  );
};

export default UsersList;