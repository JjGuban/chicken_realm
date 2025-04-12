// Menu Data
const menu = [
  {
    id: 1,
    name: "Garlic Grenade",
    description: "Explosive flavor, boom!",
    price: 20,
    image: "https://cookswithsoul.com/wp-content/uploads/2023/12/boneless-garlic-parmesan-wings-4-1024x1536.jpg"
  },
  {
    id: 2,
    name: "Boss Fight BBQ",
    description: "A smoky, sweet challenge you’ll gladly take.",
    price: 15,
    image: "https://www.spoonfulofflavor.com/wp-content/uploads/2023/06/bbq-boneless-chicken-thighs.jpg"
  },
  {
    id: 3,
    name: "Crimson Clash (Yangnyeom Chicken)",
    description: "Bold, red, and spicy-sweet — like an ultimate skill.",
    price: 17,
    image: "https://chrisseenplace.com/wp-content/uploads/2021/04/yangnyeom-chicken-plate-flatlay-731x1024.jpg"
  },
  {
    id: 4,
    name: "Golden Harvest (Sweetcorn Chicken)",
    description: "Sweet and golden, like finding treasure in-game.",
    price: 10,
    image: "https://thedefineddish.com/wp-content/uploads/2024/06/Grilled-BBQ-Chicken-Bowls-1-1025x1536.jpg"
  },
  {
    id: 5,
    name: "Whiskey Blaze (Jack Daniels Chicken)",
    description: "Bold and fiery, hits like a critical strike.",
    price: 15,
    image: "https://nyssaskitchen.com/wp-content/uploads/2022/07/BBQ-Chicken-Thighs-in-the-Oven-18-1365x2048.jpg"
  },
  {
    id: 6,
    name: "Cheddar Overload",
    description: "Max level cheese, no nerfs needed.",
    price: 12,
    image: "https://spicysouthernkitchen.com/wp-content/uploads/cheesy-chicken-19.jpg"
  },
  {
    id: 7,
    name: "Epic Salted Strike (Salted Egg Chicken)",
    description: "Rich, creamy, and powerful like a well-timed ultimate.",
    price: 14,
    image: "https://tasteofnusa.com/wp-content/uploads/2024/05/creamy-salted-egg-yolk-chicken-2.jpg"
  },
  {
    id: 8,
    name: "Snowstorm Surprise (Snow Cheese Chicken)",
    description: "Fluffy, cheesy goodness — like a snowball fight, but better.",
    price: 10,
    image: "https://amiablefoods.com/wp-content/uploads/snowy-cheese-chicken-wings-hero1a-1152x1536.jpg"
  },
  {
    id: 9,
    name: "Potion of Chill (Coca-Cola)",
    description: "Like a health potion, but an ice-cold Coca-Cola drink!",
    price: 3,
    image: "https://images.stockcake.com/public/b/a/5/ba51f1c9-d63f-47b9-a3fd-25b49672129c_large/coca-cola-pouring-moment-stockcake.jpg"
  }
];

// Cart Data
let cart = [];

// Initialize menu
function initMenu() {
  const menuContainer = document.getElementById("menu-items");
  menu.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "menu-item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="150"/>
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
      <input type="number" id="qty-${item.id}" min="1" value="1" />
      <button onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuContainer.appendChild(itemDiv);
  });

}

// Add item to cart
function addToCart(itemId) {
  const qtyInput = document.getElementById(`qty-${itemId}`);
  const quantity = parseInt(qtyInput.value) || 1;

  const item = menu.find(m => m.id === itemId);
  const cartItem = cart.find(c => c.id === itemId);

  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }

  updateCart();
}

// Update Cart Display
function updateCart() {
  const cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <h4>${item.name} (x${item.quantity})</h4>
      <p>Price: $${item.price} | Subtotal: $${item.price * item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove One</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
  cartContainer.appendChild(totalDiv);
}

// Remove item from cart
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex(c => c.id === itemId);
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    updateCart();
  }
}

// Clear Cart
function clearCart() {
  cart = [];
  updateCart();
}

// Checkout
function checkout() {
  const userMoney = parseFloat(document.getElementById("user-money").value);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isNaN(userMoney) || userMoney < 0) {
    alert("Please enter a valid amount of money.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty. Add something first!");
    return;
  }

  if (userMoney >= total) {
    alert(`Transaction successful! Your change is $${(userMoney - total).toFixed(2)}`);
    clearCart();
  } else {
    alert("Transaction failed! Not enough money.");
  }
}

function logTransaction(message, success = true) {
  const historyContainer = document.getElementById("history-entries");
  const entry = document.createElement("div");
  entry.className = "history-entry " + (success ? "success" : "failure");
  entry.textContent = `${new Date().toLocaleString()} - ${message}`;
  historyContainer.prepend(entry); // adds newest on top
}

function checkout() {
  const moneyInput = document.getElementById("user-money");
  const userMoney = parseFloat(moneyInput.value);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (isNaN(userMoney)) {
    alert("Please enter your money.");
    return;
  }

  if (userMoney >= total) {
    alert("Transaction successful! ");
    logTransaction("Transaction successful. Paid $" +  total.toFixed(2) + ", had $" + userMoney.toFixed(2));
    cart = [];
    updateCart();
  } else {
    alert("Insufficient funds.");
    logTransaction("Transaction failed. Needed $" + total.toFixed(2) + ", had $" + userMoney.toFixed(2), false);
  }

  moneyInput.value = "";
}


// Initialize page
window.onload = initMenu;
