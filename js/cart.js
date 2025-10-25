document.addEventListener('DOMContentLoaded' , () => {
let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.querySelector('.close-cart');
const clearCartButton = document.getElementById('clear-cart');

const cartIcon = document.querySelector('.cart-icon');



addToCartButtons.forEach(button => {
    button.addEventListener ('click', () => {
        const row = button.closest('tr');
        const name = row.getAttribute('data-name');
        const price = parseFloat(row.getAttribute('data-price'));

        const existingItem = cart.find(item => item.name ===name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push ({name, price, quantity:1 });
        }

        updateCart();
    });
    
}); 

function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement('li');

        li.innerHTML = `
        ${item.name} - $${item.price} x ${item.quantity}
        <button class="remove-item" data-name="${item.name}">Remove</button>`;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', () =>{
            const name = button.getAttribute('data-name');
            cart = cart.filter(item => item.name !== name);
            updateCart();
        });
    });

}

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
});
closeCart.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });
  
  window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });
  clearCartButton.addEventListener('click', () => {
    cart = [];
    updateCart(); 
});
});