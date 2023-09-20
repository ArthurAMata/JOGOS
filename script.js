const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const letraA = document.querySelector('.letras');
let isJumping = false;
const minDistance = 50;
let tubeSpeed = 2.5;


const vowels = ['A', 'E', 'I', 'O', 'U']; 
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z']; // Consoantes

const getRandomLetter = (letters) => {
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
};

const createLetter = () => {
    const letterType = Math.random() < 0.5 ? vowels : consonants;
    const letter = getRandomLetter(letterType);
    return letter;
};

const moveLetter = () => {
    const letter = createLetter();
    letraA.textContent = letter;
    letraA.style.left = '800px'; 

    const animation = letraA.animate(
        [{ left: '1300px' }, { left: '-50px' }],
        { duration: 3500 ,iterations: Infinity},
        
    );

    animation.onfinish = () => {
        if (lives > 0) {
            moveLetter(); 
        } else {
            alert('Game Over');
        }
    };
};


const pulando = () => {
    if (!isJumping) {
        isJumping = true;
        mario.classList.add('pulando');
        setTimeout(() => {
            mario.classList.remove('pulando');
            isJumping = false;
        }, 750);
    }
}



const letterLeft = parseInt(letraA.style.left);
        if (letterLeft >= 0 && letterLeft <= 50) {
            const letter = letraA.textContent.toUpperCase();
            if (vowels.includes(letter)) {
                points += 1;
            } else if (consonants.includes(letter)) {
                lives -= 1;
            }

            pontosCount.textContent = points;
            vidasCount.textContent = lives;

            moveLetter();
        }

moveLetter(); 

document.addEventListener('keydown',pulando);

const loop = setInterval(() => {
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (posicaotubo <= 90 && posicaotubo > 0 && marioPosicao < 80) {
        tubo.style.animation = 'none';
        tubo.style.left = `${posicaotubo}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = 'morte.png';
        mario.style.width = '150px';

        clearInterval(loop);
    }
}, 10);