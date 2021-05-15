const gamestatus=document.querySelector('.Game_status');
let gameactive=true;
let currentplayer="X";
let gamestate=["","","","","","","","",""];
const winning_msg = () => `Player ${currentplayer} has won!!`;
const draw_msg = () => `Game ended in draw`;
const current_turn = () => `Its ${currentplayer}'s turn!!`;
gamestatus.innerHTML=current_turn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell,clickedCellIndex){
    gamestate[clickedCellIndex]=currentplayer;
    clickedCell.innerHTML=currentplayer;
}

function handlePlayerChange(){
    currentplayer=currentplayer==="X"?"O":"X";
    gamestatus.innerHTML=current_turn();
}

function handleResultValidation(){
    let roundWon=false;
    for(let i=0;i<=7;i++){
        const winningCon=winningConditions[i];
        let a=gamestate[winningCon[0]];
        let b=gamestate[winningCon[1]];
        let c=gamestate[winningCon[2]];
        if(a==="" || b==="" || c===""){
            continue;
        }
        if(a===b && b===c){
            roundWon=true;
            break;
            
        }
    }
    if(roundWon){
        gamestatus.innerHTML=winning_msg();
        gameactive=false;
        return;
    }
    let roundDraw=!gamestate.includes("");
    if(roundDraw){
        gamestatus.innerHTML=draw_msg();
        gameactive=false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(ClickedCellEvent){
    const clickedCell=ClickedCellEvent.target;
    const clickedCellIndex=parseInt(clickedCell.getAttribute('data-cell-index'));
    if(gamestate[clickedCellIndex]!=="" || !gameactive){
        return;
    }
    handleCellPlayed(clickedCell,clickedCellIndex);
    handleResultValidation();

}
function RestartGame(){
    gameactive=true;
    gamestate=["","","","","","","","",""];
    currentplayer="X";
    gamestatus.innerHTML=current_turn();
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML="");
}
document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',handleCellClick));
document.querySelector('.game_restart').addEventListener('click',RestartGame);
