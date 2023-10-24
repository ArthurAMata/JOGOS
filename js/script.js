const mario = document.querySelector('.mario');
const tubo = document.querySelector('.tubo');
const letraA = document.querySelector('.letras');
const lifes = document.querySelector('#vidaCount');
const points = document.querySelector('#pontosCount');
const body = document.querySelector('body');
const pointsGameover = document.querySelector('.gameover p span ');
const gameover = document.querySelector('.gameover');
const gameBase = document.querySelector('.base-jogo');
const restartButton = gameover.querySelector('button');
const nickSpan = document.querySelector('.gameover h2 span')
let isJumping = false;
if(!window.localStorage.getItem('Nickname'))
    window.location='index.html';

let animationDuration = 2500;
const resetGame = () =>{
    location.reload();
}

const vowels = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'

const getRandomLetter = () => {
    const letter = Math.random() >= 0.5 ? vowels[parseInt(Math.random()*vowels.length)] :
    consonants[parseInt(Math.random()*consonants.length)]

    letraA.textContent = letter;
};


const moveLetter = () => {
    
    const letterAnimation = setInterval(() =>{
        let randomHeight = Math.random()<0.5 ? parseInt(Math.random()*25) :
        parseInt(Math.random()*100 + 130);
        
        letraA.style.bottom = `${randomHeight}px`
    }, animationDuration)
};
    

    
const runThrowArray = (array, cont) =>{
        for(let k=0; k<array.length; k++){
            if(cont.textContent==array[k]){
                return true;
            }
        }
        return false;
    }

const pulando = () => {
    if (!isJumping) {
        isJumping = true;
        mario.classList.add('pulando');
        setTimeout(() => {
            mario.classList.remove('pulando');
            isJumping = false;
        }, 650);
    }
}
let alreadyCollision = false;
let paused = false;
moveLetter(); 
getRandomLetter();
document.addEventListener('keydown',pulando);
document.addEventListener('touchstart',pulando);
const loop = setInterval(() => {

    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = parseInt(+window.getComputedStyle(mario).bottom.replace('px', '')) ;
    const letraBottom = parseInt(+window.getComputedStyle(letraA).bottom.replace('px', ''));
    const letraLeft = letraA.offsetLeft;
    const difference = marioPosicao - letraBottom;
    const letterPosition = letraA.offsetLeft;

    if(paused){
         //game animations
         tubo.style.animation = 'none';
         tubo.style.left = `${posicaotubo}px`;
         
         mario.style.animation = 'none';
         mario.style.bottom = `${marioPosicao}px`;
         mario.style.width = '150px';
         
         letraA.style.animation='none'; 
         letraA.style.left=`${letterPosition}px`
         
         body.style.animation = 'none';
         return;
    } else{
        tubo.style.animation='';
        tubo.style.left='';

        mario.style.animation='';
        mario.style.bottom='';

        letraA.style.animation='';

        body.style.animation='';
    };


    if(letterPosition<=-2){
        getRandomLetter();
    }
    
    if(letraA.offsetLeft <= 1200 && letraA.offsetLeft>=60){
        letraA.style.opacity=1;
    } else{
        letraA.style.opacity=0;
    }

    if ((posicaotubo <= 90 && posicaotubo > 0 && marioPosicao < 80) || lifes.textContent==0) {
       paused=true;   

        //gameover
        mario.src = 'imgs/morte.png';
        pointsGameover.textContent = points.textContent;
        gameover.style.opacity = 1;
        restartButton.style.display='inline';
        nickSpan.textContent = window.localStorage.getItem('Nickname');
    }
    
        if(letraLeft<=90 && letraLeft>0 && difference<=110 && difference>=-110){
            if(!alreadyCollision){
            letraA.classList.add('effect');
            
            setTimeout(() =>{
                letraA.classList.remove('effect');
            }, 300)

            if(runThrowArray(consonants, letraA)){
                points.innerText++;
            }

            if(runThrowArray(vowels, letraA)){
                lifes.textContent--;
                alreadyCollision=true;
            }
        }
    } else{
        alreadyCollision = false;
    }

    if(points.textContent>100){
        gameBase.style.background='#691717';
    }

}, 10);

//working in pause button

// document.addEventListener('keydown', ({ key }) =>{
//     if(key==='r'){
//        paused = !paused;
//     } 
// })