// Variables globales
let productos = [];
let productoEditando = null;
let productoAEliminar = null;

// Credenciales de acceso (en una implementación real, esto debería estar en el servidor)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "quecocino123";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está autenticado
    if (!estaAutenticado()) {
        mostrarLogin();
        return;
    }
    
    // Cargar productos
    cargarProductos();
    
    // Configurar event listeners
    configurarEventListeners();
});

// Función para verificar si el usuario está autenticado
function estaAutenticado() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Función para mostrar formulario de login
function mostrarLogin() {
    document.body.innerHTML = `
        <div class="login-container bg-gray-100">
            <div class="login-form bg-white rounded-lg shadow-lg p-8">
                <div class="text-center mb-6">
                    <img src="../assets/img/logo.png" alt="QueCocino.cl" class="h-16 w-16 rounded-full mx-auto mb-4">
                    <h1 class="text-2xl font-bold text-gray-800">Panel de Administración</h1>
                    <p class="text-gray-600">Inicia sesión para continuar</p>
                </div>
                <form id="login-form">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 mb-2">Usuario</label>
                        <input type="text" id="username" name="username" class="w-full border rounded px-3 py-2 form-input" required>
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 mb-2">Contraseña</label>
                        <input type="password" id="password" name="password" class="w-full border rounded px-3 py-2 form-input" required>
                    </div>
                    <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition">
                        Iniciar Sesión
                    </button>
                </form>
                <div id="login-error" class="mt-4 p-3 bg-red-100 text-red-700 rounded hidden">
                    Usuario o contraseña incorrectos
                </div>
            </div>
        </div>
    `;
    
    // Configurar event listener para el formulario de login
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            // Guardar estado de autenticación
            sessionStorage.setItem('adminAuthenticated', 'true');
            
            // Recargar la página
            location.reload();
        } else {
            // Mostrar error
            document.getElementById('login-error').classList.remove('hidden');
        }
    });
}

// Función para cargar productos
function cargarProductos() {
    // Obtener productos desde la "base de datos"
    productos = obtenerProductos();
    
    // Renderizar productos en la tabla
    renderizarTablaProductos();
}

// Función para renderizar la tabla de productos
function renderizarTablaProductos() {
    const tabla = document.getElementById('productos-table');
    tabla.innerHTML = '';
    
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.className = 'product-row border-b';
        
        // Agregar clase especial para productos sin stock
        if (producto.stock === 0) {
            fila.classList.add('bg-gray-100');
        }
        
        fila.innerHTML = `
            <td class="px-4 py-2">${producto.codigo}</td>
            <td class="px-4 py-2">${producto.nombre}</td>
            <td class="px-4 py-2">${producto.unidad}</td>
            <td class="px-4 py-2">${producto.categoria}</td>
            <td class="px-4 py-2 text-right">$${producto.precio.toLocaleString('es-CL')}</td>
            <td class="px-4 py-2 text-right">${producto.stock}</td>
            <td class="px-4 py-2 text-center">
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-1 edit-btn" data-id="${producto.codigo}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded delete-btn" data-id="${producto.codigo}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tabla.appendChild(fila);
    });
    
    // Agregar event listeners a los botones de editar y eliminar
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            editarProducto(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            confirmarEliminar(id);
        });
    });
}

// Función para editar un producto
function editarProducto(id) {
    // Buscar el producto
    productoEditando = productos.find(p => p.codigo === id);
    
    if (!productoEditando) return;
    
    // Llenar el formulario con los datos del producto
    document.getElementById('modal-titulo').textContent = 'Editar Producto';
    document.getElementById('codigo').value = productoEditando.codigo;
    document.getElementById('nombre').value = productoEditando.nombre;
    document.getElementById('unidad').value = productoEditando.unidad;
    document.getElementById('categoria').value = productoEditando.categoria;
    document.getElementById('precio').value = productoEditando.precio;
    document.getElementById('stock').value = productoEditando.stock;
    document.getElementById('imagen').value = productoEditando.imagen;
    
    // Deshabilitar el campo de código
    document.getElementById('codigo').disabled = true;
    
    // Mostrar el modal
    document.getElementById('producto-modal').classList.remove('hidden');
}

// Función para confirmar eliminación de un producto
function confirmarEliminar(id) {
    productoAEliminar = id;
    
    // Mostrar modal de confirmación
    document.getElementById('confirm-modal').classList.remove('hidden');
}

// Función para eliminar un producto
function eliminarProducto() {
    if (!productoAEliminar) return;
    
    // Eliminar el producto de la lista
    productos = productos.filter(p => p.codigo !== productoAEliminar);
    
    // Guardar cambios
    guardarProductos(productos);
    
    // Actualizar la tabla
    renderizarTablaProductos();
    
    // Cerrar modal
    document.getElementById('confirm-modal').classList.add('hidden');
    
    // Mostrar notificación
    mostrarNotificacion('Producto eliminado correctamente', 'success');
    
    // Limpiar variable
    productoAEliminar = null;
}

// Función para guardar un producto (nuevo o editado)
function guardarProducto(e) {
    e.preventDefault();
    
    // Obtener datos del formulario
    const codigo = document.getElementById('codigo').value;
    const nombre = document.getElementById('nombre').value;
    const unidad = document.getElementById('unidad').value;
    const categoria = document.getElementById('categoria').value;
    const precio = parseInt(document.getElementById('precio').value);
    const stock = parseInt(document.getElementById('stock').value);
    const imagen = document.getElementById('imagen').value;
    
    if (productoEditando) {
        // Actualizar producto existente
        const index = productos.findIndex(p => p.codigo === codigo);
        if (index !== -1) {
            productos[index] = {
                ...productos[index],
                nombre,
                unidad,
                categoria,
                precio,
                stock,
                imagen
            };
        }
        
        mostrarNotificacion('Producto actualizado correctamente', 'success');
    } else {
        // Verificar si el código ya existe
        if (productos.some(p => p.codigo === codigo)) {
            mostrarNotificacion('Ya existe un producto con ese código', 'error');
            return;
        }
        
        // Agregar nuevo producto
        productos.push({
            codigo,
            nombre,
            unidad,
            categoria,
            precio,
            stock,
            imagen
        });
        
        mostrarNotificacion('Producto agregado correctamente', 'success');
    }
    
    // Guardar cambios
    guardarProductos(productos);
    
    // Actualizar la tabla
    renderizarTablaProductos();
    
    // Cerrar modal
    document.getElementById('producto-modal').classList.add('hidden');
    
    // Limpiar formulario
    document.getElementById('producto-form').reset();
    document.getElementById('codigo').disabled = false;
    
    // Limpiar variable
    productoEditando = null;
}

// Función para importar productos desde CSV
function importarCSV() {
    const fileInput = document.getElementById('csv-file');
    const file = fileInput.files[0];
    
    if (!file) {
        mostrarNotificacion('Por favor, selecciona un archivo CSV', 'error');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            const csvData = e.target.result;
            
            // Importar productos desde CSV
            const productosImportados = importarDesdeCSV(csvData);
            
            if (productosImportados.length > 0) {
                // Actualizar la lista de productos
                productos = productosImportados;
                
                // Guardar cambios
                guardarProductos(productos);
                
                // Actualizar la tabla
                renderizarTablaProductos();
                
                // Mostrar mensaje de éxito
                const mensaje = document.getElementById('importar-mensaje');
                mensaje.className = 'p-3 rounded bg-green-100 text-green-700';
                mensaje.textContent = `Se importaron correctamente ${productosImportados.length} productos`;
                mensaje.classList.remove('hidden');
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    mensaje.classList.add('hidden');
                }, 5000);
            } else {
                // Mostrar mensaje de error
                const mensaje = document.getElementById('importar-mensaje');
                mensaje.className = 'p-3 rounded bg-red-100 text-red-700';
                mensaje.textContent = 'No se pudieron importar productos. Verifica el formato del archivo.';
                mensaje.classList.remove('hidden');
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    mensaje.classList.add('hidden');
                }, 5000);
            }
        } catch (error) {
            console.error('Error al procesar el archivo CSV:', error);
            
            // Mostrar mensaje de error
            const mensaje = document.getElementById('importar-mensaje');
            mensaje.className = 'p-3 rounded bg-red-100 text-red-700';
            mensaje.textContent = 'Error al procesar el archivo CSV. Verifica el formato.';
            mensaje.classList.remove('hidden');
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                mensaje.classList.add('hidden');
            }, 5000);
        }
    };
    
    reader.readAsText(file);
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notification ${tipo}`;
    notificacion.textContent = mensaje;
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Mostrar notificación
    setTimeout(() => {
        notificacion.classList.add('show');
    }, 100);
    
    // Ocultar y eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notificacion);
        }, 300);
    }, 3000);
}

// Función para cerrar sesión
function cerrarSesion() {
    sessionStorage.removeItem('adminAuthenticated');
    location.reload();
}

// Función para configurar event listeners
function configurarEventListeners() {
    // Botón de cerrar sesión
    document.getElementById('logout-btn').addEventListener('click', cerrarSesion);
    
    // Botón de importar CSV
    document.getElementById('importar-btn').addEventListener('click', importarCSV);
    
    // Botón de nuevo producto
    document.getElementById('nuevo-producto-btn').addEventListener('click', function() {
        // Limpiar formulario
        document.getElementById('producto-form').reset();
        document.getElementById('codigo').disabled = false;
        
        // Cambiar título del modal
        document.getElementById('modal-titulo').textContent = 'Nuevo Producto';
        
        // Limpiar variable
        productoEditando = null;
        
        // Mostrar modal
        document.getElementById('producto-modal').classList.remove('hidden');
    });
    
    // Formulario de producto
    document.getElementById('producto-form').addEventListener('submit', guardarProducto);
    
    // Botón de cancelar en el modal de producto
    document.getElementById('cancelar-btn').addEventListener('click', function() {
        document.getElementById('producto-modal').classList.add('hidden');
        document.getElementById('producto-form').reset();
        document.getElementById('codigo').disabled = false;
        productoEditando = null;
    });
    
    // Botón de cerrar en el modal de producto
    document.getElementById('cerrar-modal').addEventListener('click', function() {
        document.getElementById('producto-modal').classList.add('hidden');
        document.getElementById('producto-form').reset();
        document.getElementById('codigo').disabled = false;
        productoEditando = null;
    });
    
    // Botones de confirmación en el modal de confirmación
    document.getElementById('confirmar-cancelar').addEventListener('click', function() {
        document.getElementById('confirm-modal').classList.add('hidden');
        productoAEliminar = null;
    });
    
    document.getElementById('confirmar-eliminar').addEventListener('click', eliminarProducto);
    
    // Cerrar modales al hacer clic fuera
    document.getElementById('producto-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
            document.getElementById('producto-form').reset();
            document.getElementById('codigo').disabled = false;
            productoEditando = null;
        }
    });
    
    document.getElementById('confirm-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
            productoAEliminar = null;
        }
    });
}