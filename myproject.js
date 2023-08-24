const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.gameInfo');
const newgamebnt=document.querySelector('.btn');

let CurrentPlayer;
let gamegrid;

const winningPositions= [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initGame(){
    CurrentPlayer= "X";
    gamegrid = ["","","","","","","","",""];
    // PAGE(UI) BHI EMPTY KAR LO BHAI
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        box.classList=`box box${index+1}`;
    });
    newgamebnt.classList.remove("active"); 
    gameInfo.innerText=`Current Player - ${CurrentPlayer}`;
}
initGame();

function swapTurn(){
    if(CurrentPlayer=="X"){
        CurrentPlayer="O";
    }
    else{
        CurrentPlayer="X";
    }
    //PAGE UPDATE
    gameInfo.innerText=`Current Player-${CurrentPlayer}`;

}

function checkGameOver(){
    let answer="";
    winningPositions.forEach((position)=>{
        if((gamegrid[position[0]]!=="" || gamegrid[position[1]]!=="" || gamegrid[position[2]!==""])
        && (gamegrid[position[0]]=== gamegrid[position[1]] && gamegrid[position[1]]===gamegrid[position[2]])){
                if(gamegrid[position[0]]==="X"){
                    answer="X";
                }
                else{
                    answer="O";
                }

                boxes.forEach((box)=>{
                    box.style.pointerEvents="none";
                })


                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });
    //It means We have a Winner
    if(answer!==""){
        gameInfo.innerText= `Winner Player - ${answer}`;
        newgamebnt.classList.add("active");
        return;
    }

    let fillcount=0;
    gamegrid.forEach((box)=>{
        if(box!==""){
            fillcount++;
        }
        // console.log("Prasas");
    });
    if(fillcount===9){
        gameInfo.textContent="Game Tied !";
        newgamebnt.classList.add("active");
    }

}


function handleClick(index){
    if(gamegrid[index]===""){
        boxes[index].textContent = CurrentPlayer;
        gamegrid[index]=CurrentPlayer;
        boxes[index].style.pointerEvents="none";
        //WE Have to swap the turns of players
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}




boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
         handleClick(index);
    })
});

newgamebnt.addEventListener("click",initGame);