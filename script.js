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

//test
const moveLetter = () => {
    
    let randomHeight = parseInt(Math.random()*180);
    let randomLeft = parseInt(Math.random()*94)

    setInterval(() =>{
        randomHeight = parseInt(Math.random()*180);
        randomLeft = parseInt(Math.random()*94)
        
        letraA.style.bottom = `${randomHeight}px`
        console.log(randomHeight);
        console.log(randomLeft);
    }, 2500)

    letraA.animate(
        [{ left: `${randomLeft}` }, { left: `-12%` }],
        { duration: 2500 ,iterations: Infinity},
        );
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
    if(letterPosition<=-2){
        getRandomLetter();
    }
    
    if(letraA.offsetLeft <= 1200 && letraA.offsetLeft>=60){
        letraA.style.opacity=1;
    } else{
        letraA.style.opacity=0;
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