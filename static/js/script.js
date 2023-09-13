document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.querySelector('.cart-items');
    let cartTotal = 0;
    const cartData = {};
  
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const price = parseFloat(button.getAttribute('data-price'));
  
        // Check if the item is already in the cart
        if (cartData[product]) {
          cartData[product].quantity++;
          cartData[product].totalPrice += price;
        } else {
          cartData[product] = {
            quantity: 1,
            totalPrice: price
          };
        }
  
        // Update the cart items list and the total price
        updateCartItems();
        calculateTotalPrice();
      });
    });
  
    // Function to update the cart items list in the UI
    function updateCartItems() {
      cartItems.innerHTML = '';
      for (const product in cartData) {
        const { quantity, totalPrice } = cartData[product];
        cartItems.innerHTML += `
          <li>
            ${product} - Quantity: ${quantity} - Total Price: Rs.${totalPrice.toFixed(2)}
            <button class="delete-item btn btn-danger" style="font-size:1rem;" data-product="${product}">Delete</button>
            <button class="increase-quantity btn btn-success"style="font-size:1rem; data-product="${product}">+</button>
            <button class="decrease-quantity btn btn-warning"style="font-size:1rem; data-product="${product}">-</button>
          </li>
        `;
      }
    }
  
    // Function to calculate the total price of all items in the cart
    function calculateTotalPrice() {
      cartTotal = 0;
      for (const product in cartData) {
        cartTotal += cartData[product].totalPrice;
      }
      document.querySelector('.cart-total').textContent = `Rs.${cartTotal.toFixed(2)}`;
    }
  
    // Event delegation to handle delete, increase, and decrease quantity buttons
    cartItems.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('delete-item')) {
        const product = target.getAttribute('data-product');
        deleteCartItem(product);
      } else if (target.classList.contains('increase-quantity')) {
        const product = target.getAttribute('data-product');
        increaseCartItemQuantity(product);
      } else if (target.classList.contains('decrease-quantity')) {
        const product = target.getAttribute('data-product');
        decreaseCartItemQuantity(product);
      }
    });
  
    // Function to handle deleting an item from the cart
    function deleteCartItem(product) {
      if (cartData[product]) {
        cartTotal -= cartData[product].totalPrice;
        delete cartData[product];
        updateCartItems();
        calculateTotalPrice();
      }
    }
  
    // Function to handle increasing the quantity of an item in the cart
    function increaseCartItemQuantity(product) {
      if (cartData[product]) {
        const price = parseFloat(document.querySelector(`[data-product="${product}"]`).getAttribute('data-price'));
        cartData[product].quantity++;
        cartData[product].totalPrice += price;
        updateCartItems();
        calculateTotalPrice();
      }
    }
  
    // Function to handle decreasing the quantity of an item in the cart
    function decreaseCartItemQuantity(product) {
      if (cartData[product]) {
        const price = parseFloat(document.querySelector(`[data-product="${product}"]`).getAttribute('data-price'));
        if (cartData[product].quantity > 1) {
          cartData[product].quantity--;
          cartData[product].totalPrice -= price;
        } else {
          deleteCartItem(product);
        }
        updateCartItems();
        calculateTotalPrice();
      }
    }
  });
  
  
  
  
  