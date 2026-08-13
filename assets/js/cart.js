/* ==========================================
   GESTION DU PANIER & SYNCHRONISATION WHATSAPP
   ========================================== */
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('jardin_agro_cart')) || [];
    this.initEvents();
    this.updateCartUI();
  }

  initEvents() {
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.getElementById('closeCart');
    const whatsappOrderBtn = document.getElementById('whatsappOrderBtn');

    if (cartToggle) {
      cartToggle.addEventListener('click', () => this.toggleCartDrawer(true));
    }

    if (closeCart) {
      closeCart.addEventListener('click', () => this.toggleCartDrawer(false));
    }

    if (whatsappOrderBtn) {
      whatsappOrderBtn.addEventListener('click', () => this.sendWhatsAppOrder());
    }
  }

  toggleCartDrawer(open) {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
      if (open) drawer.classList.add('open');
      else drawer.classList.remove('open');
    }
  }

  addItem(product) {
    const existingIndex = this.cart.findIndex(item => item.id === product.id && item.size === product.size);
    if (existingIndex > -1) {
      this.cart[existingIndex].qty += product.qty;
    } else {
      this.cart.push(product);
    }
    this.saveCart();
    this.updateCartUI();
    this.toggleCartDrawer(true);
  }

  removeItem(index) {
    this.cart.splice(index, 1);
    this.saveCart();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem('jardin_agro_cart', JSON.stringify(this.cart));
  }

  updateCartUI() {
    const cartCountEl = document.getElementById('cartCount');
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');

    const totalQty = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCountEl) cartCountEl.textContent = totalQty;
    if (cartTotalEl) cartTotalEl.textContent = `${totalPrice} $`;

    if (cartItemsEl) {
      if (this.cart.length === 0) {
        cartItemsEl.innerHTML = `<p style="text-align:center; color:#888;">Votre panier est vide.</p>`;
      } else {
        cartItemsEl.innerHTML = this.cart.map((item, index) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
              <h4>${item.name}</h4>
              <p style="font-size:0.85rem; color:#666;">Taille: ${item.size || 'Standard'}</p>
              <p><strong>${item.qty} × ${item.price} $</strong></p>
            </div>
            <button onclick="cartManager.removeItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        `).join('');
      }
    }
  }

  sendWhatsAppOrder() {
    if (this.cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    let message = "Bonjour Jardin Agro 🌹\n\nJe souhaite commander :\n\n";
    this.cart.forEach(item => {
      message += `• ${item.qty} × ${item.name} (${item.size || 'Standard'})\n`;
    });

    const total = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    message += `\nTotal : ${total} $\n\nMerci.`;

    const phoneNumber = "243000000000"; // Remplacez par votre vrai numéro WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  }
}

const cartManager = new CartManager();

