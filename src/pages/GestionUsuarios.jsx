import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SidebarAdmin';
// Asegúrate de importar tus estilos globales si es necesario
import '../gestionProductos.css'; 

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        contraseña: '',
        fechaNacimiento: '',
        role: 'Usuario'
    });
    const [searchId, setSearchId] = useState('');
    const [mensaje, setMensaje] = useState('');

    const API_URL = 'https://api-mil-sabores-5.onrender.com/api/usuario';

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            } else {
                console.error("Error cargando usuarios:", response.status);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: getAuthHeaders(),
                body: JSON.stringify(form)
            });

            if (response.ok) {
                setMensaje('Usuario creado con éxito');
                setForm({ 
                    nombre: '', email: '', contraseña: '', 
                    fechaNacimiento: '', role: 'Usuario' 
                });
                cargarUsuarios();
            } else {
                setMensaje('Error al crear usuario');
            }
        } catch (error) {
            setMensaje('Error de conexión');
        }
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (response.ok) {
                setMensaje('Usuario eliminado');
                cargarUsuarios();
            } else {
                setMensaje('Error al eliminar usuario');
            }
        } catch (error) {
            setMensaje('Error de conexión');
        }
    };

    const handleBuscar = async () => {
        if (!searchId) {
            cargarUsuarios();
            return;
        }
        try {
            const response = await fetch(`${API_URL}/${searchId}`, {
                headers: getAuthHeaders()
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios([data]);
                setMensaje('Usuario encontrado');
            } else {
                setUsuarios([]);
                setMensaje('Usuario no encontrado');
            }
        } catch (error) {
            setMensaje('Error al buscar');
        }
    };

    return (
        <div className="main-content">
            <div className='sidebar'>
                <Sidebar />
            </div>

            <div className="content-wrapper">
                <div style={{ padding: '20px' }}>
                    
                    {mensaje && (
                        <div style={{ padding: '10px', backgroundColor: '#d1ecf1', color: '#0c5460', borderRadius: '5px', marginBottom: '20px' }}>
                            {mensaje}
                        </div>
                    )}

                    {/* PANEL DE BUSQUEDA */}
                    <div className="card-panel">
                        <h3 className="card-title">Buscar Usuario</h3>
                        <div className="search-bar">
                            <div className="form-group" style={{ flex: 2 }}>
                                <label>ID Usuario</label>
                                <input 
                                    className="form-input"
                                    type="text" 
                                    placeholder="Ej. 1" 
                                    value={searchId} 
                                    onChange={(e) => setSearchId(e.target.value)} 
                                />
                            </div>
                            <div className="form-group">
                                <label>&nbsp;</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn btn-search" onClick={handleBuscar}>Buscar</button>
                                    <button className="btn btn-reset" onClick={() => { setSearchId(''); cargarUsuarios(); }}>Ver Todos</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PANEL DE REGISTRO */}
                    <div className="card-panel">
                        <h3 className="card-title">Registrar Nuevo Usuario</h3>
                        <form onSubmit={handleAgregar}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre Completo</label>
                                    <input className="form-input" name="nombre" value={form.nombre} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Contraseña</label>
                                    <input className="form-input" type="password" name="contraseña" value={form.contraseña} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Fecha Nacimiento</label>
                                    <input className="form-input" type="date" name="fechaNacimiento" value={form.fechaNacimiento} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Rol</label>
                                    <select className="form-input" name="role" value={form.role} onChange={handleChange}>
                                        <option value="Usuario">Usuario</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-save" style={{marginTop: '15px'}}>Guardar Usuario</button>
                        </form>
                    </div>

                    {/* TABLA DE USUARIOS */}
                    <div className="card-panel">
                        <h3 className="card-title">Lista de Usuarios</h3>
                        <div className="table-responsive">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Rol</th>
                                        <th>Fecha Nac.</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.nombre}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span style={{ 
                                                    padding: '4px 8px', 
                                                    borderRadius: '4px',
                                                    backgroundColor: user.role === 'Admin' ? '#e2e3e5' : '#d4edda',
                                                    color: user.role === 'Admin' ? '#383d41' : '#155724',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.85rem'
                                                }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td>{user.fechaNacimiento}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-delete"
                                                    onClick={() => handleEliminar(user.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {usuarios.length === 0 && (
                                        <tr>
                                            <td colSpan="6" style={{textAlign: 'center'}}>No hay usuarios registrados.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GestionUsuarios;