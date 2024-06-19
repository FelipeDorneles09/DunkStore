document.addEventListener('DOMContentLoaded', function() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartCard = document.getElementById('cart-card');
    const closeCartButton = document.getElementById('close-cart');
    const totalPriceButton = document.getElementById('total-price');
    const cartName = document.querySelector('.card-name');

    let cartItems = [];

    // Função para carregar os itens do carrinho do armazenamento local
    function loadCartItemsFromLocalStorage() {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
            displayCartItems();
            updateTotalPrice();
        }
    }

    // Inicializar carrinho ao carregar a página
    loadCartItemsFromLocalStorage();
    
    // Função para salvar os itens do carrinho no armazenamento local
    function saveCartItemsToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    
    // Verifica se o elemento cartIcon foi encontrado
    if (cartIcon) {
        // Mostrar o card do carrinho ao clicar no ícone do carrinho
        cartIcon.addEventListener('click', () => {
            if (cartCard) {
                cartCard.style.display = 'block';
            }
        });
    }

    if (cartName) {
        // Mostrar o card do carrinho ao clicar no ícone do carrinho
        cartName.addEventListener('click', () => {
            if (cartCard) {
                cartCard.style.display = 'block';
                for (let i = 0; i < navbarLinks.length; i++) {
                    navbarLinks[i].classList.remove('activo');
    }
            }
        });
    }

    // Verifica se o botão de fechar o carrinho foi encontrado
    if (closeCartButton) {
        // Fechar o card do carrinho
        closeCartButton.addEventListener('click', () => {
            if (cartCard) {
                cartCard.style.display = 'none';
            }
            if (window.scrollY === 0) {
                if (menuExpandedAtTop || anyActive) {
                    header.classList.remove('roll');
                    menuExpandedAtTop = false;
                } else {
                    header.classList.add('roll');
                    menuExpandedAtTop = true;
                }
            } else {
                menuExpandedAtTop = false;
            }
        });
    }

    // Função para atualizar o preço total do carrinho
    function updateTotalPrice() {
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        if (totalPriceButton) {
            totalPriceButton.innerText = `Total: R$ ${totalPrice.toFixed(2)}`;
        }
    }

    // Função para adicionar item ao carrinho (chamada de outros scripts)
    function addItemToCart(item) {
        // Verifica se o item já está no carrinho
        const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
        if (existingItem) {
            // Se o item já estiver no carrinho, apenas atualize a quantidade
            existingItem.quantity++;
        } else {
            // Caso contrário, adicione o item ao carrinho
            item.quantity = 1;
            cartItems.push(item);
        }

        // Salvar os itens do carrinho no armazenamento local
        saveCartItemsToLocalStorage();

        // Atualiza a exibição do carrinho
        displayCartItems();
        updateTotalPrice();
    }

    function displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        const quantitySpan = document.querySelector('.quantity'); // Seleciona o elemento span de quantidade
    
        if (cartItemsContainer && quantitySpan) {
            // Limpa os itens anteriores do carrinho
            cartItemsContainer.innerHTML = '';
    
            // Atualiza a quantidade total de itens no carrinho
            let totalQuantity = 0;
            cartItems.forEach(item => {
                totalQuantity += item.quantity;
            });
            quantitySpan.innerText = totalQuantity; // Atualiza o conteúdo do elemento span
    
            // Adiciona os itens atualizados ao carrinho
            cartItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <div class="cart-item">
                        <span>${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}</span>
                        <div class="cart-item-buttons">
                            <button class="remove-quantity">-</button>
                            <button class="add-quantity">+</button>
                            
                        </div>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
    
                // Adiciona evento de clique aos botões
                const addQuantityButton = itemElement.querySelector('.add-quantity');
                const removeQuantityButton = itemElement.querySelector('.remove-quantity');
    
                addQuantityButton.addEventListener('click', () => {
                    item.quantity++;
                    saveCartItemsToLocalStorage();
                    displayCartItems();
                    updateTotalPrice();
                });
    
                removeQuantityButton.addEventListener('click', () => {
                    if (item.quantity > 1) {
                        item.quantity--;
                        saveCartItemsToLocalStorage();
                        displayCartItems();
                        updateTotalPrice();
                    } else {
                        // Remover item do carrinho se quantidade for 1
                        const index = cartItems.indexOf(item);
                        if (index !== -1) {
                            cartItems.splice(index, 1);
                            saveCartItemsToLocalStorage();
                            displayCartItems();
                            updateTotalPrice();
                        }
                    }
                });
            });
        }
    }
    

    // Exponha a função addItemToCart globalmente
    window.addItemToCart = addItemToCart;
});
