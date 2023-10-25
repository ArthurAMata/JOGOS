const gameBase = document.querySelector('.base-jogo');
const gameover = document.querySelector('.gameover');
const mario = gameBase.querySelector('.mario');
const tubo = gameBase.querySelector('.tubo');
const letraA = gameBase.querySelector('.letras');
const lifes = gameBase.querySelector('#vidaCount');
const points = gameBase.querySelector('#pontosCount');
const body = document.querySelector('body');
const pointsGameover = gameover.querySelector('p span ');
const restartButton = gameover.querySelector('button');
const nickSpan = gameover.querySelector('h2 span')
const pauseButton = gameBase.querySelector('button i');
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


    
    const letterAnimation = setInterval(() =>{
        let randomHeight = Math.random()<0.5 ? parseInt(Math.random()*25) :
        parseInt(Math.random()*100 + 130);
        
        letraA.style.bottom = `${randomHeight}px`
    }, animationDuration);
    

    
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
getRandomLetter();
const loop = setInterval(() => {
    
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = parseInt(+window.getComputedStyle(mario).bottom.replace('px', '')) ;
    const letraBottom = parseInt(+window.getComputedStyle(letraA).bottom.replace('px', ''));
    const letraLeft = letraA.offsetLeft;
    const difference = marioPosicao - letraBottom;
    const letterPosition = letraA.offsetLeft;

    if(paused){
         //game animations
         tubo.style.animationPlayState='paused';
         
         mario.style.animationPlayState='paused';
         mario.style.bottom = `${marioPosicao}px`;
         mario.style.width = '150px';
         
         letraA.style.animationPlayState='paused'; 
         letraA.style.left=`${letterPosition}px`
         
         body.style.animationPlayState='paused';
         clearInterval(letterAnimation);
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
        gameover.style.zIndex='10000'
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

document.addEventListener('keydown', ({ key }) =>{
    if(key==='Escape'){
        paused = !paused;
     } else{
        pulando();
     }
});

document.addEventListener('touchstart', ({ target }) =>{
        console.log(target);
        if(target===pauseButton){
            paused=!paused;
            return;
        };
        pulando();
    
    });