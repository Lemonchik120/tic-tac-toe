let sNumber = Math.floor(Math.random()*100+1);
let attempts = 0;
const maxAttempts = 10;
const messageEl = document.getElementById("message");
const attemptEl = document.getElementById("attempt");
const guesInput = document.getElementById("gues");
function showMessage(text, type = "hint"){
    messageEl.textContent = text;
    messageEl.className = type;

}


function checkGues(){
    const gues = Number(guesInput.value);
    if (!gues ||gues < 1 ||gues > 100){
        showMessage("Некоректна відповідь", "error");
        return;
    }
    attempts++;
    attemptEl.textContent = `Спроб: ${attempts}`;
    if (gues == sNumber){
        showMessage(`Вітаю! Ти вгадав за ${attempts} спроб`, "success");
        guesInput.disabled = true;
    }
    else if(attempts >= maxAttempts){
        showMessage(`Спроби закінчились. Було загадано ${sNumber} `, "error");
        guesInput.disabled = true;
    }
    else if(gues > sNumber){
        showMessage(`Бери менше`, "hint")
    }
    else if(gues < sNumber){
        showMessage(`Бери більше`, "hint")
    }
    guesInput.value = "";
    guesInput.focus();

}

guesInput.addEventListener("keypress", e => {
    if(e.key == "Enter"){
        checkGues();   
    }
})


function newGame(){
    sNumber = Math.floor(Math.random()*100+1);
    attempts = 0;
    guesInput.disabled = false;
    guesInput.value = "";
    attemptEl.textContent = "Спроб 0";
    showMessage("Нова гра почалась", "hint") 
    guesInput.focus();
    
}


