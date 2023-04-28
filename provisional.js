//hace falta el array de la API
let cartItems = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
//botón para agregar al carrito

function addToCart(event) {
    const productCard = event.target.parentElement.parentElement;
    const productImage = productCard.querySelector('img').src;
    const productName = productCard.querySelector('.product-name').textContent;
    const productBrand = productCard.querySelector('.product-brand').textContent;
    const productPrice = parseFloat(productCard.querySelector('.product-price').textContent);

    const product = {
        image: productImage,
        name: productName,
        brand: productBrand,
        price: productPrice,
        quantity: 1
    };

    const existingProductIndex = cartItems.findIndex(item => item.name === productName && item.brand === productBrand);

    if (existingProductIndex !== -1) {
        cartItems[existingProductIndex].quantity += 1;
    } else {
        cartItems.push(product);
    }

    displayCartItems();
    updateTotal();
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name;
        cartItem.appendChild(image);

        const info = document.createElement('div');
        info.classList.add('info');

        const name = document.createElement('p');
        name.textContent = item.name;
        name.classList.add('name');
        info.appendChild(name);

        const brand = document.createElement('p');
        brand.textContent = item.brand;
        brand.classList.add('brand');
        info.appendChild(brand);

        const price = document.createElement('p');
        price.textContent = `$${item.price.toFixed(2)}`;
        price.classList.add('price');
        info.appendChild(price);

        const quantity = document.createElement('div');
        quantity.classList.add('quantity');

        const minus = document.createElement('button');
        minus.textContent = '-';
        minus.classList.add('minus');
        minus.addEventListener('click', () => decreaseQuantity(item));
        quantity.appendChild(minus);

        const counter = document.createElement('span');
        counter.textContent = item.quantity;
        quantity.appendChild(counter);

        const plus = document.createElement('button');
        plus.textContent = '+';
        plus.classList.add('plus');

        //click al botón de "Agregar"
        plus.addEventListener('click', () => increaseQuantity(item));
        quantity.appendChild(plus);

        cartItem.appendChild(info);
        cartItem.appendChild(quantity);

        const remove = document.createElement('button');
        remove.innerHTML = '<i class="fas fa-times"></i>';
        remove.classList.add('remove');
        remove.addEventListener('click', () => removeItem(item));
        cartItem.appendChild(remove);

        cartItemsContainer.appendChild(cartItem);
    });
}

// Contador a negativo
function decreaseQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--;
        displayCartItems();
        updateTotal();
    }
}

// Contador a positivo
function increaseQuantity(item) {
    item.quantity++;
    displayCartItems();
    updateTotal();
}

// Eliminar producto
function removeItem(item) {
    const itemIndex = cartItems.indexOf(item);
    cartItems.splice(itemIndex, 1);
    displayCartItems();
    updateTotal();
}