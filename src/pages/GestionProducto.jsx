import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SidebarAdmin';
import '../gestionProductos.css';

function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        name: '', category: '', price: 0, type: '', description: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchCode, setSearchCode] = useState('');
    const [mensaje, setMensaje] = useState('');

    const API_URL = 'https://api-mil-sabores-5.onrender.com/api/producto';


    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.status === 204) {
                setProductos([]); 
            } else if (response.ok) {
                const data = await response.json();
                setProductos(data);
            }
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleAgregar = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (!token) {
        setMensaje('Error: No estás autenticado.');
        return;
        }

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('price', form.price);
        formData.append('type', form.type);
        formData.append('description', form.description);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${token}`
            },
                body: formData 
            });

            if (response.ok) {
                setMensaje('¡Producto creado con éxito!');
                setForm({ name: '', category: '', price: 0, type: '', description: '' });
                setSelectedFile(null);
                document.getElementById('fileInput').value = ""; 
                cargarProductos();
            } else {
                setMensaje('Error al agregar producto');
            }
        } catch (error) {
            setMensaje('Error de conexión al agregar');
        }
    };


    const handleEliminar = async (code) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`${API_URL}/${code}`, {
                method: 'DELETE',
                headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                setMensaje('Producto eliminado');
                cargarProductos(); 
            } else {
                setMensaje('Error al eliminar. Verifica que el ID exista.');
            }
        } catch (error) {
            setMensaje('Error de conexión al eliminar');
        }
    };

    const handleBuscar = async () => {
        if (!searchCode) {
            cargarProductos(); 
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${searchCode}`);
            if (response.ok) {
                const data = await response.json();
                setProductos([data]); 
                setMensaje('Producto encontrado');
            } else {
                setProductos([]);
                setMensaje('ID no encontrado.');
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

                    <div className="card-panel">
                        <h3 className="card-title">Buscar Producto</h3>
                        <div className="search-bar">
                            <div className="form-group" style={{flex: 2}}>
                                <label>Código del Producto (ID)</label>
                                <input 
                                    className="form-input"
                                    type="text" 
                                    placeholder="Ej. 15" 
                                    value={searchCode} 
                                    onChange={(e) => setSearchCode(e.target.value)} 
                                />
                            </div>

                            <div className="form-group">
                                <label>&nbsp;</label> 
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="btn btn-search" onClick={handleBuscar}>Buscar</button>
                                    <button className="btn btn-reset" onClick={() => { setSearchCode(''); cargarProductos(); }}>Ver Todos</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-panel">
                        <h3 className="card-title">Agregar Nuevo Producto</h3>
                        <form onSubmit={handleAgregar}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Nombre</label>
                                    <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Categoría</label>
                                    <input className="form-input" name="category" value={form.category} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Precio</label>
                                    <input className="form-input" type="number" name="price" value={form.price} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Tipo</label>
                                    <input className="form-input" name="type" value={form.type} onChange={handleChange} required />
                                </div>
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Imagen</label>
                                    <input id="fileInput" className="form-input" type="file" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Descripción</label>
                                    <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-save">Guardar Producto</button>
                        </form>
                    </div>

                    <div className="card-panel">
                        <h3 className="card-title">Inventario Actual</h3>
                        <div className="table-responsive">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Categoría</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((prod) => (
                                        <tr key={prod.code || prod.id}>
                                            <td>{prod.code || prod.id}</td>
                                            <td>
                                                {prod.image ? (
                                                    <img 
                                                        src={prod.image} 
                                                        alt={prod.name} 
                                                        className="img-thumbnail"
                                                    />
                                                ) : (
                                                    <div style={{width: '60px', height: '60px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontSize: '0.7rem'}}>
                                                        Sin Foto
                                                    </div>
                                                )}
                                            </td>
                                            <td>{prod.name}</td>
                                            <td>${prod.price}</td>
                                            <td>{prod.category}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-delete"
                                                    onClick={() => handleEliminar(prod.code || prod.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {productos.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{textAlign: 'center'}}>No hay productos registrados.</td>
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

export default GestionProductos;