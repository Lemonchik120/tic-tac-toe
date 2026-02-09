const board = document.getElementById("board");
const status = document.getElementById("status");
const resetBtn = document.getElementById("reset");
let currentPlayer = "X";
let gameActive = true;
let gameBoard = ["","","","","","","","",""];
const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
];
for (let i = 0; i < 9; i++){
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);


}
function handleClick(e){
    const index = e.target.dataset.index;
    console.log(gameBoard[index]);
    if(gameBoard[index] != '' || !gameActive) return;
    gameBoard[index] = currentPlayer;
    e.target.textContent = currentPlayer
    e.target.classList.add(currentPlayer.toLowerCase());


    if(checkWin()){
        status.textContent = `Переміг гравець ${currentPlayer}`;
        status.classList.add("winner");
        gameActive = false;
        hightlinerWinningline();
        return;
    }
    if(gameBoard.every(cell => cell !== "" )){
        status.textContent = `Нічия`;
        gameActive = false;
        return;
    }
    //if (status.textContent == ""){}
    currentPlayer = currentPlayer === "X"? "O": "X";
    status.textContent = `Хід гравця ${currentPlayer}`;
    

}


function hightlinerWinningline(){
    winningCombinations.forEach(comb => {
        const[a,b,c] = comb;
        if(gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]){
            document.querySelector(`[data-index = "${a}"]`).classList.add("winner");
            document.querySelector(`[data-index = "${b}"]`).classList.add("winner");
            document.querySelector(`[data-index = "${c}"]`).classList.add("winner");
        }

    });
}

function checkWin(){
    return winningCombinations.some(combination => {
        const[a,b,c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];

    });

}

function resetGame(){
    gameBoard = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Хід гравця X";
    status.classList.remove("winner");
    document.querySelectorAll('.cell').forEach(cell =>{
        cell.textContent = "";
        cell.classList.remove("x","o","winner");
    });
    
    
}


resetBtn.addEventListener("click", resetGame);
