function choose(option){
  console.log(`${option} option selected`);
  if(option === 'register'){
    document.getElementById('landing-form').classList.add('hidden');
    document.getElementById(`${option}-form`).classList.remove('hidden');
  }else if(option === 'login'){
    document.getElementById('landing-form').classList.add('hidden');
    document.getElementById(`${option}-form`).classList.remove('hidden');
  }
}
window.choose = choose;