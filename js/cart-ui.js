// Este archivo se encarga de inicializar la UI del carrito en páginas que no son la principal ni la del carrito.
// Su única función es cargar el carrito desde localStorage y actualizar el contador al cargar la página.

document.addEventListener('DOMContentLoaded', function() {
    // Cargar carrito desde localStorage
    const carritoGuardado = localStorage.getItem('quecocino_carrito');
    if (carritoGuardado) {
        const carrito = JSON.parse(carritoGuardado);
        
        // Actualizar contadores del carrito en el header
        const carritoCount = document.getElementById('carrito-count');
        const headerCarritoCount = document.getElementById('header-carrito-count');
        
        if (carritoCount || headerCarritoCount) {
            let itemCount = 0;
            carrito.forEach(item => {
                itemCount += item.cantidad;
            });
            
            if (carritoCount) carritoCount.textContent = itemCount;
            if (headerCarritoCount) headerCarritoCount.textContent = itemCount;
        }
    }
});