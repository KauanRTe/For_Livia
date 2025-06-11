const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('score');
const conteudo = document.getElementById('conteudo')

let score = 0;
let basketX = window.innerWidth / 2;

function updateBasket() {
    const basketWidth = basket.offsetWidth;
    const maxX = window.innerWidth - basketWidth;
    basketX = Math.max(0, Math.min(basketX, maxX));
    basket.style.left = basketX + 'px';
}

// Movimento por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') basketX -= 20;
    if (e.key === 'ArrowRight') basketX += 20;
    updateBasket();
});

// Movimento por toque
document.getElementById('left-btn').addEventListener('touchstart', () => {
    basketX -= 20;
    updateBasket();
});
document.getElementById('right-btn').addEventListener('touchstart', () => {
    basketX += 20;
    updateBasket();
});

// Criar folhas
function createLeaf() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    gameArea.appendChild(leaf);

    let posY = -40;
    const interval = setInterval(() => {
        posY += 4;
        leaf.style.top = posY + 'px';

        const leafRect = leaf.getBoundingClientRect();
        const basketRect = basket.getBoundingClientRect();

        if (
            leafRect.bottom >= basketRect.top &&
            leafRect.left < basketRect.right &&
            leafRect.right > basketRect.left
        ) {
            gameArea.removeChild(leaf);
            clearInterval(interval);
            score++;
            scoreEl.textContent = 'Pontos: ' + score;

            if (score >= 20) {
                gameArea.classList.add('hide-animation');
                scoreEl.classList.add('hide-animation');
                clearInterval(leafInterval);
                setTimeout(() => {
                    gameArea.style.display = 'none';
                    scoreEl.style.display = 'none';
                    conteudo.style.display = 'flex';

                }, 800);
            }
        }

        if (posY > window.innerHeight) {
            gameArea.removeChild(leaf);
            clearInterval(interval);
        }
    }, 30);
}

const leafInterval = setInterval(createLeaf, 1200);