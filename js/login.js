const form = document.querySelector('form');
const input = form.querySelector('input');
const button = form.querySelector('button');
form.addEventListener('submit', (e) =>{
  e.preventDefault();

  //send datas to a future api... (only possible ideas)
  console.log(input.value);
  window.location='game.html'
})

input.addEventListener('input', () =>{
  if(input.value.length>3 && input.value.length<10){
    button.removeAttribute('disabled');
  } else{
    button.setAttribute('disabled', '')
  }
})