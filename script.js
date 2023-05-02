const credentials = 'supermarketapi-a461aff94f2a06b2d87fa4fc2712b8e56357725864215968761:adp15V8KxQ78PyVHUZnHwqJaFDnZYRu0jrO0ALbK';
const encodedCredentials = btoa(credentials);
const giveMeAccessKey = async () => {
    const res = await fetch("https://api.kroger.com/v1/connect/oauth2/token", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + encodedCredentials
        },
        body: "grant_type=client_credentials&scope=product.compact",
    }).then((response) => response.json());
    console.log(res)
    return res.access_token;
};


// --------------------------ESTO SERÍA UNA FUNCIÓN? -----------------------------------------------------
let productosArray = [];

const giveMeProducts = async () => {
    /*esto es para que 
    let input = document.getElementById('searchBar').value; // .value recoge el valor del html supuestamente
    input.addEventListener('keyup' , (event) => {
    if (event.which === 13) {
        $("#submit").click();
    }
    })*/

    let input = 'meat';
    const productsUrl = `https://api.kroger.com/v1/products?filter.term=${input}&filter.locationId=01400943`; // cambiar el term "milk" por el producto deseado (variable?)
    const accessToken = await giveMeAccessKey();
    const productsResponse = fetch(productsUrl, {
        method: "GET",
        cache: "no-cache",
        headers: {
            Authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json; charset=utf-8",
        },
    })
        .then((response) => response.json())
        .then((dataApi) => {
            productosArray = dataApi.data;
            pintarCard(productosArray);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

giveMeProducts();

/*--------------PRUEBA DE PINTAR PRODUCTOS EN EL HTML------------------*/

const pintarCard = productosArray => {
    const sectionNews = document.getElementById('sectionNews')
    const h2News = document.createElement('h2')
    h2News.innerHTML = 'Novedades'
    let buttonAdd = document.getElementById('plusBasketButton')
    sectionNews.appendChild(h2News)
    let botonesAgregar = document.querySelectorAll('.plusBasketButton')

    console.log(productosArray)

    productosArray.forEach(product => {

        const cardProduct = document.createElement('div');
        cardProduct.classList.add('cardProduct')
        //console.log(product.productId)
        cardProduct.innerHTML = `
                    <img src="${product.images[0].sizes[1].url}" class="productImage">
                    <h3 class="productNaming">${product.brand}</h3>
                    <p class="productSpecification">${product.description}</p>
                    <p class="productPrice">${product.items[0].price.regular}</p>
                    <button class="plusBasketButton" id="${product.productId}">Añadir a la Cesta</button>` // este botón debería de ejecutar la función añadir a la cesta
        sectionNews.appendChild(cardProduct)
    });
    //console.log(setionNews)
    actualizarBotonesAgregar();
}




function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.plusBasketButton')

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    })
}

/* const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idButton = e.currentTarget.id
    //console.log(idButton)
    const productoAgregado = productosArray.find(productosArray => productosArray.productId === idButton);
    console.log(productoAgregado)
}

console.log(productosEnCarrito) */

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idButton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.productId === idButton);

    const productoEnCarrito = productosEnCarrito.find(producto => producto.productId === productoAgregado.productId);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        productosEnCarrito.push({ ...productoAgregado, cantidad: 1 });
    }

    console.log(productosEnCarrito);
}