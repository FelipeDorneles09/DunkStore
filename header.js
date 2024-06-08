// Listener para rolar a página
window.addEventListener("scroll", function() {
    let header = document.querySelector('#header');
    let anyActive = document.querySelector('.content-header.activo');

    // Adicionar ou remover a classe 'roll' dependendo da posição de rolagem
    if (!anyActive) {
        header.classList.toggle('roll', window.scrollY > 0);
    }

    // Se a página estiver no topo e o menu estiver expandido, mantenha a classe 'roll'
    if (window.scrollY === 0 && menuExpandedAtTop) {
        header.classList.add('roll');
    }
});

const toggleButton = document.getElementsByClassName('navbar-toggle')[0];
const navbarLinks = document.getElementsByClassName('content-header');
let header = document.querySelector('#header');

// Variável para rastrear se o botão foi clicado na posição inicial
let menuExpandedAtTop = false;

toggleButton.addEventListener('click', function() {
    let anyActive = document.querySelector('.content-header.activo');

    for (let i = 0; i < navbarLinks.length; i++) {
        navbarLinks[i].classList.toggle('activo');
    }

    // Lógica para adicionar/remover a classe 'roll'
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
