// PRODUCTOS
const productos = [
    // King Kong
    {
        id: "kingkong-01",
        titulo: "King kong un sabor medio kilo",
        imagen: "./img/kingkong-manjar.jpeg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 20
    },
    {
        id: "kingkong-02",
        titulo: "King kong dos sabores",
        imagen: "./img/kingkong-dos.jpg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 23
    },
    {
        id: "kingkong-03",
        titulo: "King kong tres sabores",
        imagen: "./img/kingkong-tres.jpg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 25
    },
    {
        id: "kingkong-04",
        titulo: "King kong chirimolla de 280g",
        imagen: "./img/king-chirimolla.jpeg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 18
    },
    {
        id: "kingkong-05",
        titulo: "King kong maracuyá de 280g",
        imagen: "./img/king-maracuya.jpg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 18
    },
    {
        id: "kingkong-06",
        titulo: "King kong café de 280g",
        imagen: "./img/king-cafe.jpg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 18
    },
    {
        id: "kingkong-07",
        titulo: "King kong lúcuma de 280g",
        imagen: "./img/king-lucuma.jpg",
        categoria: {
            nombre: "Kingkong",
            id: "kingkong"
        },
        precio: 18
    },
    // Chifles
    {
        id: "chifles-01",
        titulo: "Chifles de medio kilo",
        imagen: "./img/chifles.jpeg",
        categoria: {
            nombre: "Chifles",
            id: "chifles"
        },
        precio: 15
    },
    
    // otros dulces
    {
        id: "otros-01",
        titulo: "Algorrobina de litro",
        imagen: "./img/algarrobina.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 30
    },
    {
        id: "otros-02",
        titulo: "Valde de manjar de medio kilo",
        imagen: "./img/manjar.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 15
    },
    {
        id: "otros-03",
        titulo: "Alfajores en taper",
        imagen: "./img/alfajor.jpg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 13
    },
    {
        id: "otros-04",
        titulo: "Rosquitas en bolsa",
        imagen: "./img/rosquitas.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 13
    },
    {
        id: "otros-05",
        titulo: "Machacado de membrillo",
        imagen: "./img/membrillo.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 6
    },
    {
        id: "otros-06",
        titulo: "Bolicoco",
        imagen: "./img/bolicoco.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 12
    },
    {
        id: "otros-07",
        titulo: "Chocoalfajor",
        imagen: "./img/chocoal.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 18
    },
    {
        id: "otros-08",
        titulo: "Pasas maní coco",
        imagen: "./img/pasmaco.jpeg",
        categoria: {
            nombre: "Otros",
            id: "otros"
        },
        precio: 13
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos")
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar = document.querySelectorAll(".producto-agregar")
const numerito = document.querySelector("#numerito")


function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">S/${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">Agregar</button>
        </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);


botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito(); 
} else {
    productosEnCarrito = []
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productosAgregados = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id ===idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productosAgregados.cantidad = 1;
        productosEnCarrito.push(productosAgregados);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito;
}