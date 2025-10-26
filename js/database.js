// Base de datos de productos específicos de QueCocino.cl
const productosData = [
    {
        codigo: "PROD001",
        nombre: "Aceite de oliva",
        unidad: "Litro",
        precio: 10000,
        stock: 20,
        categoria: "condimentos",
        imagen: "assets/img/productos/1. Aceite 1lt.png"
    },
    {
        codigo: "PROD001.5",
        nombre: "Aceite de oliva",
        unidad: "500ml",
        precio: 6000,
        stock: 20,
        categoria: "condimentos",
        imagen: "assets/img/productos/2. Aceite 500ml.png"
    },
    {
        codigo: "PROD002",
        nombre: "Aceituna",
        unidad: "1/4 de kilo",
        precio: 2700,
        stock: 30,
        categoria: "condimentos",
        imagen: "assets/img/productos/3. Aceituna.jpg"
    },
    {
        codigo: "PROD003",
        nombre: "Acelga",
        unidad: "Paquete",
        precio: 1600,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/4. Acelga.jpg"
    },
    {
        codigo: "PROD004",
        nombre: "Agua Recarga",
        unidad: "20 Litros",
        precio: 1800,
        stock: 15,
        categoria: "otros",
        imagen: "assets/img/productos/5. Agua.png"
    },
    {
        codigo: "PROD005",
        nombre: "Aji amarillo",
        unidad: "Paquete (5)",
        precio: 1000,
        stock: 40,
        categoria: "condimentos",
        imagen: "assets/img/productos/6. Aji amarillo.jpg"
    },
    {
        codigo: "PROD006",
        nombre: "Ajo",
        unidad: "Unidad",
        precio: 300,
        stock: 100,
        categoria: "condimentos",
        imagen: "assets/img/productos/7. Ajo.jpg"
    },
    {
        codigo: "PROD007",
        nombre: "Ajo Chileno",
        unidad: "Unidad",
        precio: 500,
        stock: 50,
        categoria: "condimentos",
        imagen: "assets/img/productos/7.1 Ajo-Chileno.jpeg"
    },
    {
        codigo: "PROD008",
        nombre: "Albahaca",
        unidad: "100gr",
        precio: 2000,
        stock: 30,
        categoria: "condimentos",
        imagen: "assets/img/productos/8. Albahaca 100gr.jpeg"
    },
    {
        codigo: "PROD009",
        nombre: "Almendra",
        unidad: "1/4 de kilo",
        precio: 3800,
        stock: 25,
        categoria: "frutos_secos",
        imagen: "assets/img/productos/9. Almendras.jpg"
    },
    {
        codigo: "PROD010",
        nombre: "Apio Entero",
        unidad: "Unidad",
        precio: 2000,
        stock: 30,
        categoria: "verduras",
        imagen: "assets/img/productos/10. Apio entero.jpg"
    },
    {
        codigo: "PROD010.5",
        nombre: "Avena instantanea",
        unidad: "Paquete",
        precio: 2500,
        stock: 0,  // Nuevo producto sin stock
        categoria: "otros",
        imagen: "assets/img/productos/11. Avena instantanea.jpg"
    },
    {
        codigo: "PROD011",
        nombre: "Berenjenas",
        unidad: "Unidad",
        precio: 1000,
        stock: 0,  // Sin imagen
        categoria: "verduras",
        imagen: "assets/img/productos/berenjenas.jpg"
    },
    {
        codigo: "PROD012",
        nombre: "Betarraga",
        unidad: "5 unidades",
        precio: 1800,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/12. Betarraga.jpg"
    },
    {
        codigo: "PROD013",
        nombre: "Brócoli",
        unidad: "Unidad",
        precio: 1700,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/13. Brocoli.jpg"
    },
    {
        codigo: "PROD014",
        nombre: "Bruselas",
        unidad: "1/4 de kilo",
        precio: 1000,
        stock: 20,
        categoria: "verduras",
        imagen: "assets/img/productos/14. Bruselas.jpg"
    },
    {
        codigo: "PROD015",
        nombre: "Cebolla",
        unidad: "Paquete (5)",
        precio: 1100,
        stock: 50,
        categoria: "verduras",
        imagen: "assets/img/productos/15. Cebolla.jpg"
    },
    {
        codigo: "PROD016",
        nombre: "Cebolla Morada",
        unidad: "Unidad",
        precio: 500,
        stock: 60,
        categoria: "verduras",
        imagen: "assets/img/productos/16. Cebolla MOrada.jpg"
    },
    {
        codigo: "PROD017",
        nombre: "Cebollín",
        unidad: "Paquete (3 unidades)",
        precio: 1200,
        stock: 40,
        categoria: "verduras",
        imagen: "assets/img/productos/17. Cebollin.jpg"
    },
    {
        codigo: "PROD018",
        nombre: "Champiñones",
        unidad: "1/4 de kilo",
        precio: 3000,
        stock: 30,
        categoria: "verduras",
        imagen: "assets/img/productos/18. Champiñones.jpg"
    },
    {
        codigo: "PROD019",
        nombre: "Ciboulette",
        unidad: "Paquete",
        precio: 700,
        stock: 35,
        categoria: "condimentos",
        imagen: "assets/img/productos/19. Ciboulette.png"
    },
    {
        codigo: "PROD020",
        nombre: "Cilantro",
        unidad: "Paquete",
        precio: 700,
        stock: 40,
        categoria: "condimentos",
        imagen: "assets/img/productos/20. Cilantro.jpg"
    },
    {
        codigo: "PROD021",
        nombre: "Clementina",
        unidad: "Kilo",
        precio: 1300,
        stock: 30,
        categoria: "frutas",
        imagen: "assets/img/productos/21. cleme.jpg"
    },
    {
        codigo: "PROD022",
        nombre: "Coliflor",
        unidad: "Unidad",
        precio: 1700,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/22. COliflor.jpg"
    },
    {
        codigo: "PROD022.5",
        nombre: "COnfort 50M 4R",
        unidad: "Paquete",
        precio: 3500,
        stock: 0,  // Nuevo producto sin stock
        categoria: "otros",
        imagen: "assets/img/productos/23. COnfort 50M 4R.jpg"
    },
    {
        codigo: "PROD023",
        nombre: "Espinaca",
        unidad: "1/4 de kilo",
        precio: 800,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/25. Espinaca.jpg"
    },
    {
        codigo: "PROD024",
        nombre: "Frutillas",
        unidad: "Kilo",
        precio: 2000,
        stock: 0,  // Sin imagen
        categoria: "frutas",
        imagen: "assets/img/productos/26. Frutilla.jpg"
    },
    {
        codigo: "PROD025",
        nombre: "Haba",
        unidad: "Kilo",
        precio: 800,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/27. Haba.jpg"
    },
    {
        codigo: "PROD026",
        nombre: "Huevos (Super - Blanco)",
        unidad: "Bandeja (30)",
        precio: 8500,
        stock: 0,  // Sin imagen
        categoria: "otros",
        imagen: "assets/img/productos/huevos-super-blanco.jpg"
    },
    {
        codigo: "PROD027",
        nombre: "Kiwi",
        unidad: "Unidad",
        precio: 3000,
        stock: 20,
        categoria: "frutas",
        imagen: "assets/img/productos/28. Kiwi.jpg"
    },
    {
        codigo: "PROD028",
        nombre: "Lechuga (Costina)",
        unidad: "Unidad",
        precio: 1200,
        stock: 30,
        categoria: "verduras",
        imagen: "assets/img/productos/29. Lechuga Costina.jpg"
    },
    {
        codigo: "PROD029",
        nombre: "Lechuga (Escarola)",
        unidad: "Unidad",
        precio: 1500,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/24. Lechuga Escarola.jpg"
    },
    {
        codigo: "PROD030",
        nombre: "Lechuga (Marina)",
        unidad: "Unidad",
        precio: 1200,
        stock: 30,
        categoria: "verduras",
        imagen: "assets/img/productos/30. Lechuga Marina.jpeg"
    },
    {
        codigo: "PROD031",
        nombre: "Limón",
        unidad: "Kilo",
        precio: 700,
        stock: 40,
        categoria: "frutas",
        imagen: "assets/img/productos/31. Limon.jpg"
    },
    {
        codigo: "PROD032",
        nombre: "Limón Sutil",
        unidad: "Kilo",
        precio: 3000,
        stock: 20,
        categoria: "frutas",
        imagen: "assets/img/productos/31.1 Limon Sutil.jpg"
    },
    {
        codigo: "PROD033",
        nombre: "Mandarina",
        unidad: "Kilo",
        precio: 1300,
        stock: 30,
        categoria: "frutas",
        imagen: "assets/img/productos/32. mandarina.jpeg"
    },
    {
        codigo: "PROD034",
        nombre: "Mango",
        unidad: "Unidad",
        precio: 1500,
        stock: 0,  // Sin imagen
        categoria: "frutas",
        imagen: "assets/img/productos/mango.jpg"
    },
    {
        codigo: "PROD035",
        nombre: "Manzana Fuji",
        unidad: "Kilo",
        precio: 1600,
        stock: 35,
        categoria: "frutas",
        imagen: "assets/img/productos/33. Manzana Fuji.jpg"
    },
    {
        codigo: "PROD036",
        nombre: "Manzana Verde",
        unidad: "Kilo",
        precio: 1400,
        stock: 30,
        categoria: "frutas",
        imagen: "assets/img/productos/34. Manzana verde.jpg"
    },
    {
        codigo: "PROD037",
        nombre: "Naranja",
        unidad: "Kilo",
        precio: 1200,
        stock: 40,
        categoria: "frutas",
        imagen: "assets/img/productos/35. Naranja.jpg"
    },
    {
        codigo: "PROD038",
        nombre: "Palta Hass",
        unidad: "Kilo",
        precio: 5000,
        stock: 20,
        categoria: "frutas",
        imagen: "assets/img/productos/36. Palta Hass.jpg"
    },
    {
        codigo: "PROD039",
        nombre: "Papa",
        unidad: "Kilo",
        precio: 750,
        stock: 50,
        categoria: "verduras",
        imagen: "assets/img/productos/37. papa.jpg"
    },
    {
        codigo: "PROD040",
        nombre: "Pepino (verdura)",
        unidad: "Unidad",
        precio: 800,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/39. Pepino Verdura.jpg"
    },
    {
        codigo: "PROD040.5",
        nombre: "Pepino Fruta",
        unidad: "Unidad",
        precio: 800,
        stock: 0,  // Nuevo producto sin stock
        categoria: "frutas",
        imagen: "assets/img/productos/38. Pepino Fruta.jpg"
    },
    {
        codigo: "PROD041",
        nombre: "Pera",
        unidad: "Kilo",
        precio: 1300,
        stock: 30,
        categoria: "frutas",
        imagen: "assets/img/productos/40. Pera.jpeg"
    },
    {
        codigo: "PROD042",
        nombre: "Pimentón Amarillo",
        unidad: "Unidad",
        precio: 1300,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/41. Pimenton Amarillo.JPG"
    },
    {
        codigo: "PROD043",
        nombre: "Pimentón Rojo",
        unidad: "Unidad",
        precio: 1300,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/42. Pimenton Rojo.jpg"
    },
    {
        codigo: "PROD044",
        nombre: "Pimentón Verde",
        unidad: "Unidad",
        precio: 1300,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/43. Pimentón Verde.jpg"
    },
    {
        codigo: "PROD045",
        nombre: "Piña",
        unidad: "Unidad",
        precio: 3000,
        stock: 0,  // Sin imagen
        categoria: "frutas",
        imagen: "assets/img/productos/pina.jpg"
    },
    {
        codigo: "PROD046",
        nombre: "Plátano",
        unidad: "Kilo",
        precio: 1800,
        stock: 30,
        categoria: "frutas",
        imagen: "assets/img/productos/44. Platano.jpg"
    },
    {
        codigo: "PROD047",
        nombre: "Poroto Verde",
        unidad: "1/2 kilo",
        precio: 1800,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/45. Poroto Verde.jpg"
    },
    {
        codigo: "PROD048",
        nombre: "Rabanos (con/sin hoja)",
        unidad: "Paquete",
        precio: 1300,
        stock: 0,  // Sin imagen
        categoria: "verduras",
        imagen: "assets/img/productos/rabanos.jpg"
    },
    {
        codigo: "PROD049",
        nombre: "Repollo entero",
        unidad: "Unidad",
        precio: 1300,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/46. Repollo entero.jpg"
    },
    {
        codigo: "PROD050",
        nombre: "Tomate",
        unidad: "Kilo",
        precio: 1900,
        stock: 40,
        categoria: "verduras",
        imagen: "assets/img/productos/47. Tomate.jpg"
    },
    {
        codigo: "PROD051",
        nombre: "Tomate Cherry",
        unidad: "1/2 kilo",
        precio: 2700,
        stock: 25,
        categoria: "verduras",
        imagen: "assets/img/productos/48. Tomate Cherry.jpg"
    },
    {
        codigo: "PROD052",
        nombre: "Zapallo Italiano",
        unidad: "Unidad",
        precio: 800,
        stock: 35,
        categoria: "verduras",
        imagen: "assets/img/productos/49. Zapallo Italiano.jpg"
    },
    {
        codigo: "PROD053",
        nombre: "Zanahoria",
        unidad: "Kilo",
        precio: 1200,
        stock: 45,
        categoria: "verduras",
        imagen: "assets/img/productos/50. Zanahoria.jpg"
    },
    {
        codigo: "PROD054",
        nombre: "Zapallo",
        unidad: "Kilo",
        precio: 2400,
        stock: 20,
        categoria: "verduras",
        imagen: "assets/img/productos/51. Zapallo.jpg"
    }
];

// Función para obtener productos
function obtenerProductos() {
    // En una implementación real, esto haría una llamada a una API o base de datos
    // Por ahora, devolvemos los datos estáticos
    return productosData;
}

// Función para guardar productos (para el panel de administración)
function guardarProductos(productos) {
    // En una implementación real, esto guardaría los productos en una base de datos
    // Por ahora, solo mostramos un mensaje en la consola
    console.log("Productos guardados:", productos);
}

// Función para importar productos desde CSV
function importarDesdeCSV(csvData) {
    // En una implementación real, esto procesaría un archivo CSV
    // Por ahora, solo mostramos un mensaje en la consola
    console.log("Datos CSV importados:", csvData);
    
    // Simulación de procesamiento CSV
    const lineas = csvData.split('\n');
    const nuevosProductos = [];
    
    // Omitir la primera línea (encabezados)
    for (let i = 1; i < lineas.length; i++) {
        if (lineas[i].trim() === '') continue;
        
        const [codigo, precio, stock] = lineas[i].split(',');
        
        // Buscar el producto existente por código
        const productoExistente = productosData.find(p => p.codigo === codigo);
        
        if (productoExistente) {
            // Actualizar precio y stock del producto existente
            productoExistente.precio = parseInt(precio);
            productoExistente.stock = parseInt(stock);
            nuevosProductos.push(productoExistente);
        }
    }
    
    return nuevosProductos;
}