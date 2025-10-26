// Variables globales
let carrito = [];
let productos = [];
let total = 0;
let categoriaActiva = 'todos'; // Variable para rastrear la categoría activa

// Número de WhatsApp predefinido
const WHATSAPP_NUMBER = "+56997535584";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos desde la "base de datos"
    cargarProductos();
    
    // Configurar event listeners
    configurarEventListeners();
    
    // Animar elementos con GSAP
    animarElementos();
    
    // Cargar carrito desde localStorage
    cargarCarritoDesdeLocalStorage();
});

// Función para cargar productos
function cargarProductos() {
    // Simular carga de productos desde la base de datos
    productos = obtenerProductos();
    
    // Renderizar productos en el grid
    aplicarFiltros();
}

// Función para aplicar filtros (búsqueda y categoría)
function aplicarFiltros() {
    const terminoBusqueda = document.getElementById('buscador-productos').value.toLowerCase().trim();
    
    let productosFiltrados = productos;

    // 1. Filtrar por categoría si no es "todos"
    if (categoriaActiva !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => producto.categoria === categoriaActiva);
    }

    // 2. Filtrar por término de búsqueda si existe
    if (terminoBusqueda) {
        productosFiltrados = productosFiltrados.filter(producto => 
            producto.nombre.toLowerCase().includes(terminoBusqueda)
        );
    }
    
    // Renderizar los productos resultantes
    renderizarProductos(productosFiltrados);
}

// Función para renderizar productos
function renderizarProductos(productosParaMostrar) {
    const grid = document.getElementById('productos-grid');
    grid.innerHTML = '';
    
    // Filtrar productos con stock mayor a 0
    const productosConStock = productosParaMostrar.filter(producto => producto.stock > 0);
    
    if (productosConStock.length === 0) {
        grid.innerHTML = '<div class="col-span-full text-center text-gray-500 py-10"><i class="fas fa-search text-4xl mb-4"></i><p class="text-xl">No se encontraron productos que coincidan con tu búsqueda.</p></div>';
        return;
    }
    
    productosConStock.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden';
        card.dataset.category = producto.categoria;
        card.dataset.id = producto.codigo;
        
        card.innerHTML = `
            <div class="relative">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover">
                ${producto.stock < 10 ? `<span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">¡Últimas ${producto.stock} unidades!</span>` : ''}
            </div>
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-2">${producto.nombre}</h3>
                <p class="text-gray-600 text-sm mb-3">${producto.unidad}</p>
                <div class="flex justify-between items-center mb-3">
                    <span class="text-xl font-bold text-green-600">$${producto.precio.toLocaleString('es-CL')}</span>
                </div>
                <div class="flex items-center">
                    <button class="bg-gray-200 text-gray-700 rounded-l px-3 py-1 hover:bg-gray-300 transition quantity-btn minus" data-id="${producto.codigo}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input type="number" min="0" max="${producto.stock}" value="0" class="w-12 text-center border-t border-b border-gray-200 quantity-input" data-id="${producto.codigo}" data-precio="${producto.precio}" data-nombre="${producto.nombre}" data-unidad="${producto.unidad}">
                    <button class="bg-gray-200 text-gray-700 rounded-r px-3 py-1 hover:bg-gray-300 transition quantity-btn plus" data-id="${producto.codigo}">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="ml-auto bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition add-to-cart" data-id="${producto.codigo}">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    // Agregar event listeners a los botones de cantidad
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            const currentValue = parseInt(input.value);
            const maxValue = parseInt(input.max);
            
            if (this.classList.contains('plus') && currentValue < maxValue) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 0) {
                input.value = currentValue - 1;
            }
        });
    });
    
    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.id;
            const input = document.querySelector(`.quantity-input[data-id="${id}"]`);
            const cantidad = parseInt(input.value);
            
            if (cantidad > 0) {
                agregarAlCarrito(id, cantidad);
                input.value = 0;
            }
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id, cantidad) {
    const producto = productos.find(p => p.codigo === id);
    
    // Verificar si el producto ya está en el carrito
    const itemExistente = carrito.find(item => item.codigo === id);
    
    if (itemExistente) {
        // Actualizar cantidad si ya existe
        itemExistente.cantidad += cantidad;
    } else {
        // Agregar nuevo item al carrito
        carrito.push({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            unidad: producto.unidad,
            cantidad: cantidad
        });
    }
    
    // Actualizar vista del carrito
    actualizarContadorCarrito();
    
    // Guardar carrito en localStorage
    guardarCarritoEnLocalStorage();
    
    // Mostrar notificación
    mostrarNotificacion(`${cantidad} ${producto.nombre}(s) agregado(s) al carrito`);
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const carritoCount = document.getElementById('carrito-count');
    const headerCarritoCount = document.getElementById('header-carrito-count');
    
    // Calcular el número total de items
    let itemCount = 0;
    carrito.forEach(item => {
        itemCount += item.cantidad;
    });
    
    // Actualizar los contadores
    if (carritoCount) carritoCount.textContent = itemCount;
    if (headerCarritoCount) headerCarritoCount.textContent = itemCount;
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('quecocino_carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('quecocino_carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarContadorCarrito();
    }
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
    // Menú móvil
    document.getElementById('menu-movil').addEventListener('click', function() {
        document.getElementById('menu-movil-container').classList.toggle('hidden');
    });
    
    // Carrito - Redirigir a la página del carrito
    document.getElementById('carrito-btn').addEventListener('click', function() {
        window.location.href = 'carrito.html';
    });
    
    // BUSCADOR: Event listener para el input de búsqueda
    document.getElementById('buscador-productos').addEventListener('input', aplicarFiltros);
    
    // FILTROS: Event listeners para los botones de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            categoriaActiva = category; // Actualizar la categoría activa
            
            // Actualizar botones activos
            document.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('bg-green-600', 'text-white');
                b.classList.add('bg-gray-200', 'text-gray-700');
            });
            
            this.classList.remove('bg-gray-200', 'text-gray-700');
            this.classList.add('bg-green-600', 'text-white');
            
            // Aplicar filtros (que ahora incluye la búsqueda)
            aplicarFiltros();
        });
    });
}

// Función para animar elementos con GSAP
function animarElementos() {
    // Animar hero section
    gsap.from("#inicio h2", {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: "power2.out"
    });
    
    gsap.from("#inicio p", {
        duration: 1,
        y: -30,
        opacity: 0,
        delay: 0.3,
        ease: "power2.out"
    });
    
    gsap.from("#inicio a", {
        duration: 1,
        y: -30,
        opacity: 0,
        delay: 0.6,
        ease: "power2.out"
    });
    
    // Animar sección de productos al hacer scroll
    gsap.from("#productos h2", {
        scrollTrigger: "#productos",
        duration: 1,
        y: -30,
        opacity: 0,
        ease: "power2.out"
    });
}