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
const pauseButton = gameBase.querySelector('button img');
const pauseScreen = document.querySelector('.pauseScreen');
const resumeButton = pauseScreen.querySelector('.guides button img')
let isJumping = false;

//getting the user's nickname
if(!window.localStorage.getItem('Nickname'))
    window.location='index.html';

let animationDuration = 2500;
//basic reset game funcion
const resetGame = () =>{
    location.reload();
}

//splitting the group of letters in vowels or consonants
const vowels = 'AEIOU';
const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'

//pick a random letter system
const getRandomLetter = () => {
    const letter = Math.random() >= 0.5 ? vowels[parseInt(Math.random()*vowels.length)] :
    consonants[parseInt(Math.random()*consonants.length)]

    letraA.textContent = letter;
};


    //pick a random height for letter
    const letterAnimation = setInterval(() =>{
        let randomHeight = Math.random()<0.5 ? parseInt(Math.random()*25) :
        parseInt(Math.random()*100 + 130);
        
        letraA.style.bottom = `${randomHeight}px`
    }, animationDuration);


const pulando = () => {
    if (!isJumping) {
        isJumping = true;
        mario.classList.add('pulando');
    }
}
let alreadyCollision = false;
let paused = false;
getRandomLetter();
let jumpC=0;
//main loop game
const loop = setInterval(() => {
    
    const posicaotubo = tubo.offsetLeft;
    const marioPosicao = parseInt(+window.getComputedStyle(mario).bottom.replace('px', '')) ;
    const letraBottom = parseInt(+window.getComputedStyle(letraA).bottom.replace('px', ''));
    const letraLeft = letraA.offsetLeft;
    const difference = marioPosicao - letraBottom;
    const letterPosition = letraA.offsetLeft;
    if(paused){
         //pause the entire game
         tubo.style.animationPlayState='paused';
         
         mario.style.animationPlayState='paused';
         mario.style.width = '150px';
         
         letraA.style.animationPlayState='paused'; 
         letraA.style.left=`${letterPosition}px`
         body.style.animationPlayState='paused';
         clearInterval(letterAnimation);
         return;
         
    } else{
        //resume the entire game
        tubo.style.animationPlayState='';
        tubo.style.left='';

        mario.style.animationPlayState='';
        // mario.style.bottom='';

        letraA.style.animation='';

        body.style.animation='';
    };

    if(marioPosicao>170){
        jumpC++;
    }

    if(jumpC>0 && marioPosicao<10){
        jumpC=0;
        mario.classList.remove('pulando');
        isJumping=false;
    }
    //letter animations
    if(letterPosition<=-2){
        getRandomLetter();
    }
    
    if(letraA.offsetLeft <= 1200 && letraA.offsetLeft>=60){
        letraA.style.opacity=1;
    } else{
        letraA.style.opacity=0;
    }

    if ((posicaotubo <= 90 && posicaotubo > 0 && marioPosicao < 80) || lifes.textContent==0) {
        //gameover
        paused=true;
        mario.src = 'imgs/morte.png';
        tubo.style.left=`${posicaotubo}px`
        mario.style.bottom=`${marioPosicao}px`
        body.style.animationPlayState='paused';
        pointsGameover.textContent = points.textContent;
        gameover.style.opacity = 1;
        gameover.style.zIndex='1000'
        restartButton.style.display='inline';
        nickSpan.textContent = window.localStorage.getItem('Nickname');
        clearInterval(loop);
    }
    //touching in a letter
        if(letraLeft<=90 && letraLeft>0 && difference<=110 && difference>=-110){
            if(!alreadyCollision){
            letraA.classList.add('effect');
            
            setTimeout(() =>{
                letraA.classList.remove('effect');
            }, 300)

            if(consonants[consonants.indexOf(letraA.textContent)]){
                points.innerText++;
            }

            if(vowels[vowels.indexOf(letraA.textContent)]){
                lifes.textContent--;
                alreadyCollision=true;
            }
        }
    } else{
        alreadyCollision = false;
    }
    //points counter
    if(points.textContent>100){
        gameBase.style.background='#691717';
    }

}, 10);

//press a key to jump (if pressed key is ESC, open the settings screen)
document.addEventListener('keydown', ({ key }) =>{
    if(key==='Escape'){
        paused = !paused;
        if(pauseScreen.style.display==='' || pauseScreen.style.display==='none'){
            pauseScreen.style.display='block';
        } else{
            pauseScreen.style.display='none'
        }
     } else if(gameover.style.opacity!=1){
        pulando();
     }

    
});

//open || close settings screen
function clickFunction(e){

    if(e.type==='touchstart') e.preventDefault();
    const { target } = e;
    console.log(target);
    if(target===pauseButton || target===resumeButton){
        paused=!paused;
        if(pauseScreen.style.display==='' || pauseScreen.style.display==='none'){
            pauseScreen.style.display='block';
        } else{
            pauseScreen.style.display='none'
        }
        return;
    };

    if(gameover.style.opacity!=1) pulando();
    
}

//click function
document.addEventListener('touchstart', clickFunction, { passive: false });
document.addEventListener('click', clickFunction, { passive: false });

//click to restart game
restartButton.addEventListener('click', resetGame);
restartButton.addEventListener('touchstart', resetGame);