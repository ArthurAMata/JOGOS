const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const letraA = document.querySelector('.letras');
let isJumping = false;
const minDistance = 50;
let tubeSpeed = 2.5;


const vowels = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'

const getRandomLetter = () => {
    const letter = Math.random() >= 0.5 ? vowels[parseInt(Math.random()*vowels.length)] :
    consonants[parseInt(Math.random()*consonants.length)]

    letraA.textContent = letter;
};

const moveLetter = () => {
    
    const animation = letraA.animate(
        [{ left: '100%' }, { left: '-2%' }],
        { duration: 2500 ,iterations: Infinity},
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
getRandomLetter();
document.addEventListener('keydown',pulando);
const loop = setInterval(() => {
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = +window.getComputedStyle(mario).bottom.replace('px', '');

    const letterPosition = letraA.offsetLeft;
    if(letterPosition<=5){
        getRandomLetter();
    }

    if (posicaotubo <= 90 && posicaotubo > 0 && marioPosicao < 80) {
        tubo.style.animation = 'none';
        tubo.style.left = `${posicaotubo}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = 'imgs/morte.png';
        mario.style.width = '150px';

        clearInterval(loop);
    }
}, 10);





const loopletter = setInterval(() => {
    const letterposicao = letter.offsetLeft;
    if(letterposicao === 0){
        
    }

    if (posicaotubo <= 90 && posicaotubo > 0 && marioPosicao < 80) {
        tubo.style.animation = 'none';
        tubo.style.left = `${posicaotubo}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosicao}px`;

        mario.src = 'imgs/morte.png';
        mario.style.width = '150px';

        clearInterval(loop);
    }zzzzz
}, 10);