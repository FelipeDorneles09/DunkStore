let products = []; // Declaração da variável products como global

function getProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    console.log("Product ID from URL:", productId);

    fetch('produtos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            products = data; // Atribuir os produtos carregados à variável global
            console.log("Products loaded:", products);
            const product = products.find(p => p.id == productId);

            if (product) {
                document.getElementById('product-image').src = product.imagem;
                document.getElementById('product-var1').src = product.var1;
                document.getElementById('product-var2').src = product.var2;
                document.getElementById('product-var3').src = product.var3;
                document.getElementById('product-name').textContent = product.nome;
                document.getElementById('product-price').textContent = "R$" + product.custo;
                document.getElementById('product-description').textContent = product.descrição;

                loadRelatedProducts(products, product);
            } else {
                console.error('Produto não encontrado');
            }
        })
        .catch(error => console.error('Erro ao carregar os detalhes do produto:', error));
}

function loadRelatedProducts(products, currentProduct) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    const relatedProducts = products.filter(product => product.categoria === currentProduct.categoria && product.id != currentProduct.id);

    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';

        productCard.innerHTML = `
            <img src="${product.imagem}" alt="${product.nome}">
            <div class="card-content">
                <h3>${product.nome}</h3>
                <div class="star">
				    <span class="fa fa-star max"></span>
				    <span class="fa fa-star max"></span>
                    <span class="fa fa-star max"></span>
                    <span class="fa fa-star max"></span>
				    <span class="fa fa-star max"></span>
			    </div>
                <h5>${product.descrição}</h5>
                <a>R$${product.custo}</a>
            </div>
        `;

        productCard.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${product.id}`;
        });

        productsList.appendChild(productCard);
    });
}

function filterProducts() {
    const searchBar = document.getElementById('search-bar').value.toLowerCase();
    let filteredProducts = [];

    if (searchBar === '') {
        // Se a barra de pesquisa estiver vazia, exiba apenas os produtos da mesma categoria
        const productId = new URLSearchParams(window.location.search).get('id');
        const currentProduct = products.find(p => p.id == productId);
        filteredProducts = products.filter(product => product.categoria === currentProduct.categoria && product.id !== currentProduct.id);
    } else {
        // Se a barra de pesquisa não estiver vazia, filtre os produtos com base no texto digitado
        filteredProducts = products.filter(product => {
            const matchesName = product.nome.toLowerCase().includes(searchBar);
            const matchesCategory = product.categoria.toLowerCase().includes(searchBar);
            return matchesName || matchesCategory;
        });

        // Se a barra de pesquisa não estiver vazia, mas o produto da página atual
        // corresponder à pesquisa, não inclua esse produto nos resultados
        const productId = new URLSearchParams(window.location.search).get('id');
        const currentProduct = products.find(p => p.id == productId);
        if (currentProduct) {
            const matchesName = currentProduct.nome.toLowerCase().includes(searchBar);
            const matchesCategory = currentProduct.categoria.toLowerCase().includes(searchBar);
            if (matchesName || matchesCategory) {
                filteredProducts = filteredProducts.filter(product => product.id !== currentProduct.id);
            }
        }
    }

    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const productsList = document.getElementById('products-list');
    productsList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';

        productCard.innerHTML = `
            <img src="${product.imagem}" alt="${product.nome}">
            <div class="card-content">
                <h3>${product.nome}</h3>
                <div class="star">
				    <span class="fa fa-star max"></span>
				    <span class="fa fa-star max"></span>
                    <span class="fa fa-star max"></span>
                    <span class="fa fa-star max"></span>
				    <span class="fa fa-star max"></span>
			    </div>
                <h5>${product.descrição}</h5>
                <a>R$${product.custo}</a>
            </div>
        `;

        productCard.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${product.id}`;
        });

        productsList.appendChild(productCard);
    });
}

getProductDetails();

const searchBar = document.getElementById('search-bar');
searchBar.addEventListener('input', filterProducts);

document.getElementById('buy-button').addEventListener('click', function () {
    const productName = document.getElementById('product-name').innerText;
    const productPrice = parseFloat(document.getElementById('product-price').innerText.replace('R$', '').replace(',', '.'));
    const product = { name: productName, price: productPrice };

    // Chama a função global para adicionar o item ao carrinho
    addItemToCart(product);
});

// Adicione isso ao final do seu arquivo detalhes.js

// Adicione isso ao final do seu arquivo detalhes.js

// Função para trocar a foto principal e a imagem variante clicada
function swapImages(clickedImg) {
    // Obter o src da imagem principal
    const mainImgSrc = document.getElementById('product-image').src;
    
    // Trocar a imagem principal com a imagem variante clicada
    document.getElementById('product-image').src = clickedImg.src;
    
    // Trocar a imagem variante clicada com a imagem principal original
    clickedImg.src = mainImgSrc;
}

// Adicionar evento de clique para cada imagem variante
document.getElementById('product-var1').addEventListener('click', function() {
    swapImages(this);
});

document.getElementById('product-var2').addEventListener('click', function() {
    swapImages(this);
});

document.getElementById('product-var3').addEventListener('click', function() {
    swapImages(this);
});

