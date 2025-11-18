import React, { useState, useEffect } from 'react';

function GestionProductos() {
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState({
        name: '', category: '', price: 0, type: '', description: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchCode, setSearchCode] = useState('');
    const [mensaje, setMensaje] = useState('');

    const API_URL = 'https://api-mil-sabores-5.onrender.com/api/producto';

    // 1. LISTAR (GET /) - Carga inicial
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.status === 204) {
                setProductos([]); // No hay contenido
            } else if (response.ok) {
                const data = await response.json();
                setProductos(data);
            }
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    // Manejo de cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    // 2. AGREGAR (POST /)
    const handleAgregar = async (e) => {
        e.preventDefault();
        
        // 1. Crear objeto FormData
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('category', form.category);
        formData.append('price', form.price);
        formData.append('type', form.type);
        formData.append('description', form.description);
        // Solo agregamos el archivo si el usuario seleccionó uno
        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                // IMPORTANTE: NO agregar header 'Content-Type': 'application/json'
                // El navegador lo detectará automáticamente como multipart/form-data
                body: formData 
            });

            if (response.ok) {
                setMensaje('Producto e imagen agregados con éxito');
                setForm({ name: '', category: '', price: 0, type: '', description: '' });
                setSelectedFile(null); // Limpiar input de archivo
                // Opcional: resetear visualmente el input file si es necesario
                document.getElementById('fileInput').value = ""; 
                cargarProductos();
            } else {
                setMensaje('Error al agregar producto');
            }
        } catch (error) {
            setMensaje('Error de conexión al agregar');
        }
    };

    // 3. ELIMINAR (DELETE /{id})
    // Nota: Asumo que tu producto tiene un campo 'id' numérico autogenerado por JPA.
    // Si usas 'code' como ID, cambia 'id' por 'code' aquí y en tu backend.
    const handleEliminar = async (code) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            const response = await fetch(`${API_URL}/${code}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setMensaje('Producto eliminado');
                cargarProductos(); // Recargar lista
            } else {
                setMensaje('Error al eliminar. Verifica que el ID exista.');
            }
        } catch (error) {
            setMensaje('Error de conexión al eliminar');
        }
    };

    // 4. BUSCAR (GET /{id})
    const handleBuscar = async () => {
        if (!searchCode) {
            cargarProductos(); // Si está vacío, carga todos
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${searchCode}`);
            if (response.ok) {
                const data = await response.json();
                setProductos([data]); // Muestra solo el encontrado en la tabla
                setMensaje('Producto encontrado');
            } else {
                setProductos([]);
                setMensaje('Producto no encontrado con ese ID');
            }
        } catch (error) {
            setMensaje('Error al buscar');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Gestión de Productos</h2>
            {mensaje && <p style={{ color: 'blue' }}>{mensaje}</p>}

            {/* --- SECCIÓN DE BÚSQUEDA --- */}
            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Buscar por ID</h3>
                <input 
                    type="text" 
                    placeholder="ID del producto" 
                    value={searchCode} 
                    onChange={(e) => setSearchCode(e.target.value)} 
                    style={{ padding: '8px' }}
                />
                <button onClick={handleBuscar}>Buscar</button>
                <button onClick={() => { setSearchCode(''); cargarProductos(); }}>Ver Todos</button>
            </div>

            {/* --- FORMULARIO DE AGREGAR --- */}
            {/* FORMULARIO AGREGAR */}
            <form onSubmit={handleAgregar} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
                <h3>Agregar Nuevo Producto</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required style={{ padding: '8px' }} />
                    <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} required style={{ padding: '8px' }} />
                    <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleChange} required style={{ padding: '8px' }} />
                    <input name="type" placeholder="Tipo" value={form.type} onChange={handleChange} required style={{ padding: '8px' }} />
                    
                    {/* INPUT PARA ARCHIVO */}
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '0.8rem', marginBottom: '5px' }}>Imagen del producto:</label>
                        <input 
                            id="fileInput"
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            style={{ padding: '8px' }} 
                        />
                    </div>

                    <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} style={{ gridColumn: '1 / -1', padding: '8px', height: '60px' }} />
                </div>
                <button type="submit" style={{ marginTop: '15px', padding: '10px 25px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Guardar Producto
                </button>
            </form>

            {/* --- TABLA DE LISTADO --- */}
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2' }}>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.code} style={{ borderBottom: '1px solid #ddd' }}>
                            <td style={{ padding: '12px', fontWeight: 'bold' }}>{prod.code}</td>
                            <td style={{ padding: '12px' }}>{prod.name}</td>
                            <td style={{ padding: '12px' }}>${prod.price}</td>
                            <td style={{ padding: '12px' }}>{prod.category}</td>
                            <td style={{ padding: '12px' }}>
                                <button 
                                    onClick={() => handleEliminar(prod.code)}
                                    style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px' }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GestionProductos;