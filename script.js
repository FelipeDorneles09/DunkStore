const myslide = document.querySelectorAll('.myslide'),
    dot = document.querySelectorAll('.dot');
let counter = 1;
slidefun(counter);

let timer = setInterval(autoSlide, 8000);
function autoSlide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoSlide, 8000);
}

function slidefun(n) {
    let i;
    for (i = 0; i < myslide.length; i++) {
        myslide[i].style.display = "none";
    }
    for (i = 0; i < dot.length; i++) {
        dot[i].className = dot[i].className.replace(' active', '');
    }
    if (n > myslide.length) {
        counter = 1;
    }
    if (n < 1) {
        counter = myslide.length;
    }
    myslide[counter - 1].style.display = "block";
    dot[counter - 1].className += " active";
}

function carregar() {
    fetch('produtos.json')
        .then(response => response.json())
        .then(produto => {
            renderProducts(produto);

            const searchBar = document.getElementById('search-bar');
            searchBar.addEventListener('input', () => filterProducts(produto));
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
}

function renderProducts(produtos) {
    const produtosContainer = document.getElementById('product');
    produtosContainer.innerHTML = '';

    produtos.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.id = product.id;
        card.dataset.nome = product.nome.toLowerCase();
        card.dataset.categoria = product.categoria.toLowerCase();

        const img = document.createElement("img");
        img.src = product.imagem;

        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        const h3 = document.createElement("h3");
        h3.textContent = product.nome;

        const desc = document.createElement("h5");
        desc.textContent = product.descrição;

        const preco = document.createElement("a");
        preco.textContent = "R$" + product.custo;

        const star = document.createElement("div")
        star.classList.add("star");


        for (let i = 0; i < 5; i++) {
            const stars = document.createElement("span");
            stars.className = "fa fa-star max";
            star.appendChild(stars); // Mover esta linha para dentro do loop
        }
        

        cardContent.appendChild(h3);
        cardContent.appendChild(star)
        cardContent.appendChild(desc);
        cardContent.appendChild(preco);

        card.appendChild(img);
        card.appendChild(cardContent);

        

        card.addEventListener('click', () => {
            window.location.href = `detalhes.html?id=${product.id}`;
        });

        produtosContainer.appendChild(card);
    });
}

function filterProducts(produtos) {
    const searchBar = document.getElementById('search-bar').value.toLowerCase();

    const filteredProducts = produtos.filter(product => {
        const matchesName = product.nome.toLowerCase().includes(searchBar);
        const matchesCategory = product.categoria.toLowerCase().includes(searchBar);

        return matchesName || matchesCategory;
    });

    renderProducts(filteredProducts);
}

const mainImage = document.getElementById('main-image');
    const variantImages = document.querySelectorAll('.destaque-variant img');

    variantImages.forEach(img => {
        img.addEventListener('click', () => {
            mainImage.src = img.src;
        });
    });

carregar();

