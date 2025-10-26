// Variables globales
let carrito = [];
let total = 0;

// Número de WhatsApp predefinido
const WHATSAPP_NUMBER = "+56997535584";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    cargarCarritoDesdeLocalStorage();
    
    // Configurar event listeners
    configurarEventListeners();
});

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('quecocino_carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        renderizarCarrito();
    }
}

// Función para renderizar el carrito
function renderizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoVacio = document.getElementById('carrito-vacio');
    const carritoConProductos = document.getElementById('carrito-con-productos');
    const totalCarrito = document.getElementById('total-carrito');
    
    // Limpiar vista del carrito
    carritoItems.innerHTML = '';
    
    if (carrito.length === 0) {
        // Mostrar mensaje de carrito vacío
        carritoVacio.classList.remove('hidden');
        carritoConProductos.classList.add('hidden');
        return;
    }
    
    // Ocultar mensaje de carrito vacío y mostrar productos
    carritoVacio.classList.add('hidden');
    carritoConProductos.classList.remove('hidden');
    
    // Calcular total y renderizar items
    total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-4 pb-4 border-b';
        
        itemElement.innerHTML = `
            <div class="flex-1">
                <h4 class="font-semibold">${item.nombre}</h4>
                <div class="flex items-center mt-1">
                    <div class="flex items-center border border-gray-300 rounded-lg mr-4">
                        <button class="quantity-change-btn minus px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition" data-id="${item.codigo}">
                            <i class="fas fa-minus text-xs"></i>
                        </button>
                        <span class="px-3 py-1 bg-gray-50 text-center min-w-[3rem]">${item.cantidad}</span>
                        <button class="quantity-change-btn plus px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 transition" data-id="${item.codigo}">
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                    <span class="text-sm text-gray-600">${item.unidad} x $${item.precio.toLocaleString('es-CL')}</span>
                </div>
            </div>
            <div class="flex items-center">
                <span class="font-semibold mr-2">$${subtotal.toLocaleString('es-CL')}</span>
                <button class="text-red-500 hover:text-red-700 remove-item" data-id="${item.codigo}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        carritoItems.appendChild(itemElement);
    });
    
    // Actualizar total
    totalCarrito.textContent = `$${total.toLocaleString('es-CL')}`;
    
    // Agregar event listeners a los botones de cantidad y eliminar
    document.querySelectorAll('.quantity-change-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const isPlus = this.classList.contains('plus');
            const item = carrito.find(p => p.codigo === id);
            
            if (item) {
                if (isPlus) {
                    item.cantidad += 1;
                } else if (item.cantidad > 1) {
                    item.cantidad -= 1;
                }
                
                // Guardar cambios y recalcular
                guardarCarritoEnLocalStorage();
                renderizarCarrito();
            }
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            eliminarDelCarrito(id);
        });
    });
}

// Función para eliminar items del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.codigo !== id);
    
    // Guardar cambios en localStorage
    guardarCarritoEnLocalStorage();
    
    // Volver a renderizar el carrito
    renderizarCarrito();
    
    // Mostrar notificación
    mostrarNotificacion('Producto eliminado del carrito');
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('quecocino_carrito', JSON.stringify(carrito));
}

// Función para copiar la lista al portapapeles
function copiarLista() {
    if (carrito.length === 0) {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }
    
    let textoLista = "Mi pedido de QueCocino.cl:\n\n";
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        textoLista += `• ${item.nombre}: ${item.cantidad} ${item.unidad} x $${item.precio.toLocaleString('es-CL')} = $${subtotal.toLocaleString('es-CL')}\n`;
    });
    
    textoLista += `\nTotal: $${total.toLocaleString('es-CL')}`;
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(textoLista)
        .then(() => {
            mostrarNotificacion('Lista copiada al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar la lista: ', err);
            mostrarNotificacion('Error al copiar la lista', 'error');
        });
}

// Función para enviar por WhatsApp
function enviarPorWhatsApp() {
    if (carrito.length === 0) {
        mostrarNotificación('Tu carrito está vacío', 'error');
        return;
    }
    
    let mensaje = "Mi pedido de QueCocino.cl:%0A%0A";
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        mensaje += `• ${item.nombre}: ${item.cantidad} ${item.unidad} x $${item.precio.toLocaleString('es-CL')} = $${subtotal.toLocaleString('es-CL')}%0A`;
    });
    
    mensaje += `%0ATotal: $${total.toLocaleString('es-CL')}`;
    
    // Abrir WhatsApp con el mensaje predefinido
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace('+', '')}?text=${mensaje}`, '_blank');
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notification ${tipo === 'error' ? 'bg-red-500' : 'bg-green-500'}`;
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

// Función para configurar event listeners
function configurarEventListeners() {
    // Botón de copiar lista
    document.getElementById('copiar-lista').addEventListener('click', copiarLista);
    
    // Botón de enviar por WhatsApp
    document.getElementById('enviar-whatsapp').addEventListener('click', enviarPorWhatsApp);
}