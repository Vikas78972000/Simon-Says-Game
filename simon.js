let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let h2 = document.querySelector('h2');
let btns = ['yellow','red','green','purple'];
let hsc = 0;
document.addEventListener('keypress',function(){
    if(started == false){
        console.log("game started");
        started=true;
        levelUp();
    }
})

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function (){
        btn.classList.remove('userflash');
    },250)
}

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function (){
        btn.classList.remove('flash');
    },250)
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText=`Level : ${level}`;

    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
     
    gameFlash(randbtn);

    gameSeq.push(randColor);

}

function btnPress(){
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id');
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtn = document.querySelectorAll('.btn');
for(btn of allBtn){
    btn.addEventListener('click',btnPress);
}

function checkAns(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
           setTimeout(levelUp,1000);
        }
    }else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br>Press any key to start.`;
        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = 'white';
        },150)
        if(hsc<level){
            highScore();
        }
        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highScore(){
    hsc=level;
    let h3 = document.querySelector('h3');
    h3.innerText = `Highest Score : ${hsc}`;
}
