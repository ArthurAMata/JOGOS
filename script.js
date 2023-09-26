const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const letraA = document.querySelector('.letras');
const lifes = document.querySelector('#vidaCount');
let isJumping = false;


const vowels = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'

const getRandomLetter = () => {
    const letter = Math.random() >= 0.5 ? vowels[parseInt(Math.random()*vowels.length)] :
    consonants[parseInt(Math.random()*consonants.length)]

    letraA.textContent = letter;
};

const moveLetter = () => {
    
    let randomHeight = parseInt(Math.random()*180);
    setInterval(() =>{
        randomHeight = parseInt(Math.random()*180);
        
        letraA.style.bottom = `${randomHeight}px`
    }, 2500)

    letraA.animate(
        [{ left: `70%` }, { left: `-40%` }],
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

moveLetter(); 
getRandomLetter();
document.addEventListener('keydown',pulando);
const loop = setInterval(() => {
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = parseInt(+window.getComputedStyle(mario).bottom.replace('px', '')) ;

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

setInterval(() =>{
    const marioPosicao = parseInt(+window.getComputedStyle(mario).bottom.replace('px', '')) ;
    const letraBottom = parseInt(+window.getComputedStyle(letraA).bottom.replace('px', ''));
    const letraLeft = letraA.offsetLeft;
    const difference = marioPosicao - letraBottom;

    if(letraLeft<=90 && letraLeft>0 && difference<=100 && difference>=-100){
    
        console.log('got');

        for(let k=0; k<vowels.length; k++){
            if(letraA.textContent==vowels[k]){
                lifes.textContent--;
            }
        }
        
    }
}, 300)