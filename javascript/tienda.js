document.addEventListener('DOMContentLoaded', function() {
    const cart = {
        items: [],
        total: 0,

        addItem(product) {
            const existingItem = this.items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
            this.calculateTotal();
            this.updateCartUI();
            this.animateCartIcon();

            const productCard = document.querySelector(`[data-product-id="${product.id}"]`);
            if (productCard) {
                productCard.classList.add('add-to-cart-effect');
                setTimeout(() => productCard.classList.remove('add-to-cart-effect'), 300);
            }
        },

        removeItem(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.calculateTotal();
            this.updateCartUI();
        },

        updateQuantity(productId, newQuantity) {
            const item = this.items.find(item => item.id === productId);
            if (item) {
                item.quantity = parseInt(newQuantity) || 1;
                this.calculateTotal();
                this.updateCartUI();
            }
        },

        calculateTotal() {
            this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        },

        updateCartUI() {
            const cartItemsContainer = document.getElementById('cartItems');
            const cartCounter = document.querySelector('.cart-counter');
            const totalAmount = document.querySelector('.total-amount');

            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCounter.textContent = totalItems;
            totalAmount.textContent = `$${this.total.toFixed(2)}`;

            if (this.items.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart-message">
                        <i class="fas fa-shopping-cart"></i>
                        <p>¡Vaya! Tu carrito está vacío</p>
                        <small>Agrega productos desde la tienda</small>
                    </div>
                `;
                return;
            }

            cartItemsContainer.innerHTML = '';
            this.items.forEach(item => {
                const el = document.createElement('div');
                el.className = 'cart-item';
                el.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <h3 class="cart-item-name">${item.name}</h3>
                        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                        <div class="cart-item-actions">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <button class="remove-item" data-id="${item.id}">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(el);
            });

            this.setupCartItemEvents();
        },

        setupCartItemEvents() {
            document.querySelectorAll('.quantity-btn').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    const input = document.querySelector(`.quantity-input[data-id="${productId}"]`);
                    let quantity = parseInt(input.value);
                    quantity += e.target.classList.contains('plus') ? 1 : (quantity > 1 ? -1 : 0);
                    input.value = quantity;
                    this.updateQuantity(productId, quantity);
                });
            });

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    this.updateQuantity(productId, e.target.value);
                });
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    this.removeItem(productId);
                });
            });
        },

        animateCartIcon() {
            const cartIcon = document.querySelector('.cart-icon-container');
            cartIcon.classList.add('bounce');
            setTimeout(() => cartIcon.classList.remove('bounce'), 800);
        },

        toggleCart() {
            const modal = document.getElementById('cartModal');
            const overlay = document.querySelector('.overlay');
            modal.classList.toggle('active');
            overlay.classList.toggle('active');

            if (modal.classList.contains('active')) this.updateCartUI();
        }
    };

    const tabs = document.querySelectorAll('.category-tab');
    const containers = document.querySelectorAll('.products-container');
    const featuredSection = document.querySelector('.featured-products');

    containers.forEach(c => c.style.display = 'none');
    featuredSection.style.display = 'block';

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-category');
            featuredSection.style.display = category === 'featured' ? 'block' : 'none';

            containers.forEach(container => {
                container.style.display = container.id === category ? 'block' : 'none';
            });
        });
    });

    const setupWishlistButtons = () => {
        document.querySelectorAll('.wishlist-button').forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                icon.classList.toggle('fas', this.classList.contains('active'));
                icon.classList.toggle('far', !this.classList.contains('active'));
            });
        });
    };

    function init() {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.setAttribute('data-product-id', `product-${index}`);
        });

        document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const product = {
            id: card.getAttribute('data-product-id'),
            name: card.querySelector('.product-name').textContent,
            price: parseFloat(card.querySelector('.product-price').textContent.replace('$', '')),
            image: card.querySelector('img').src
        };
        cart.addItem(product);
    });
});

        document.querySelector('.cart-icon-container').addEventListener('click', () => cart.toggleCart());
        document.querySelector('.close-cart').addEventListener('click', () => cart.toggleCart());
        document.querySelector('.overlay').addEventListener('click', () => cart.toggleCart());

        document.querySelector('.verificar-brecha').addEventListener('click', (e) => {
            e.preventDefault();
            cart.toggleCart();
        });
    }

    init();
});
